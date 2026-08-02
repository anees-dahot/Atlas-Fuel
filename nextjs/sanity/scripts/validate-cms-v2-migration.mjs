#!/usr/bin/env node
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {schemaTypes} from '../schemaTypes/index.js'
import {SINGLETON_ITEMS} from '../schemaTypes/singletons.js'
import {
  CANONICAL_DOCUMENT_TYPES,
  PRESERVED_PRESENTATION_FIELD_NAMES,
  SINGLETON_IDS,
} from './cms-v2-config.mjs'
import {readExportDocuments} from './lib/dataset-export.mjs'
import {buildMigrationPlan} from './lib/migration-plan.mjs'
import {analyzeDataset} from './lib/quota-analysis.mjs'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const defaultInput = resolve(
  scriptDirectory,
  '../../.sanity/backups/production-before-cms-v2-2026-07-29.tar.gz'
)
const valueAfter = (flag) => {
  const index = process.argv.indexOf(flag)
  return index >= 0 ? process.argv[index + 1] : undefined
}
const input = valueAfter('--input') || defaultInput
const errors = []
const fail = (message) => errors.push(message)
const same = (left, right) => JSON.stringify(left) === JSON.stringify(right)
const sortedEntries = (value) => Object.entries(value).sort(([left], [right]) =>
  left.localeCompare(right)
)

const {documents} = readExportDocuments(input)
const analysis = analyzeDataset(documents)
const firstPlan = await buildMigrationPlan(input)
const secondPlan = await buildMigrationPlan(input)
const byId = new Map(documents.map((document) => [document._id, document]))
const setIfMissingByDocument = new Map()

if (firstPlan.manifestHash !== secondPlan.manifestHash) {
  fail('Manifest generation is not deterministic')
}

const schemaDocumentTypes = schemaTypes
  .filter((schema) => schema.type === 'document')
  .map((schema) => schema.name)
  .sort()
const canonicalTypes = [...CANONICAL_DOCUMENT_TYPES].sort()
if (!same(schemaDocumentTypes, canonicalTypes)) {
  fail('Canonical document types do not match deployed document schemas')
}

const studioSingletonIds = Object.fromEntries(
  SINGLETON_ITEMS.map(({type, id}) => [type, id])
)
if (!same(sortedEntries(studioSingletonIds), sortedEntries(SINGLETON_IDS))) {
  fail('Migration singleton IDs do not match Studio singleton IDs')
}

for (const action of firstPlan.actions) {
  if (action.kind === 'createMissingSingleton') {
    if (byId.has(action.targetId)) {
      fail(`Singleton creation target already exists in export: ${action.targetId}`)
    }
    continue
  }

  const sourceId = action.documentId || action.sourceId
  const source = byId.get(sourceId)
  if (!source) {
    fail(`Migration source is missing from export: ${sourceId}`)
    continue
  }
  if (!action.expectedRevision) {
    fail(`Migration action lacks revision guard: ${action.kind} ${sourceId}`)
  } else if (source._rev !== action.expectedRevision) {
    fail(`Migration action has stale revision: ${action.kind} ${sourceId}`)
  }

  if (action.targetId && byId.has(action.targetId)) {
    fail(`Singleton replacement target already exists: ${action.targetId}`)
  }

  if (action.kind === 'unsetShadowedLegacyPaths') {
    for (const {path, matches} of action.matchedSections) {
      const exactMatch = matches.some((sectionName) =>
        same(source[path], source[sectionName]?.[path])
      )
      if (!exactMatch) {
        fail(`Legacy cleanup is not an exact nested match: ${sourceId}.${path}`)
      }
    }
  }

  if (action.kind === 'unsetPresentationPaths') {
    for (const path of action.paths) {
      const field = path.split('.').at(-1)?.replace(/\[[^\]]+\]/g, '')
      if (PRESERVED_PRESENTATION_FIELD_NAMES.has(field)) {
        fail(`Editable semantic color scheduled for cleanup: ${sourceId}.${path}`)
      }
    }
  }

  if (action.setIfMissing) {
    const paths = setIfMissingByDocument.get(sourceId) || new Map()
    for (const [path, value] of Object.entries(action.setIfMissing)) {
      if (paths.has(path) && !same(paths.get(path), value)) {
        fail(`Conflicting backfill values: ${sourceId}.${path}`)
      }
      paths.set(path, value)
    }
    setIfMissingByDocument.set(sourceId, paths)
  }
}

const obsoleteIds = new Set(
  firstPlan.actions
    .filter((action) => action.kind === 'deleteObsoleteDocument')
    .map((action) => action.documentId)
)
const replacementSourceIds = new Set(
  firstPlan.actions
    .filter((action) => action.kind === 'replaceSingletonId')
    .map((action) => action.sourceId)
)
const removedIds = new Set([...obsoleteIds, ...replacementSourceIds])
const walkReferences = (value, owner) => {
  if (!value || typeof value !== 'object') return
  if (Array.isArray(value)) {
    value.forEach((item) => walkReferences(item, owner))
    return
  }
  if (removedIds.has(value._ref) && !removedIds.has(owner._id)) {
    fail(`Retained document ${owner._id} references removed document ${value._ref}`)
  }
  Object.values(value).forEach((child) => walkReferences(child, owner))
}
documents.forEach((document) => walkReferences(document, document))

const noncanonicalProblems = analysis.singletonStatus.filter(
  ({status}) => status !== 'canonical'
)
const singletonActions = firstPlan.actions.filter((action) =>
  ['createMissingSingleton', 'replaceSingletonId'].includes(action.kind)
)
if (noncanonicalProblems.length !== singletonActions.length) {
  fail('Not every singleton problem has exactly one canonicalization action')
}

if (errors.length) {
  process.stderr.write(`${errors.join('\n')}\n`)
  process.exit(1)
}

process.stdout.write([
  `Backup SHA-256: ${firstPlan.source.sha256}`,
  `Manifest SHA-256: ${firstPlan.manifestHash}`,
  `Deterministic actions: ${firstPlan.actions.length}`,
  `Revision-guarded actions: ${firstPlan.actions.length - firstPlan.summary.singletonCreates}`,
  `Canonical singleton IDs: ${Object.keys(SINGLETON_IDS).length}`,
  `Removed-document inbound references: 0`,
  `Exact nested-wins legacy cleanups: ${firstPlan.summary.shadowedLegacyDocuments} document(s)`,
  `Conservative projected content pairs: ${firstPlan.summary.conservativeProjectedContentAttributePairs}`,
  'CMS v2 migration readiness validation passed.',
  '',
].join('\n'))
