#!/usr/bin/env node
import {createClient} from '@sanity/client'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {buildMigrationPlan} from './lib/migration-plan.mjs'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const defaultInput = resolve(
  scriptDirectory,
  '../../.sanity/backups/production-before-cms-v2-2026-07-29.tar.gz'
)

const hasFlag = (flag) => process.argv.includes(flag)
const valueAfter = (flag) => {
  const index = process.argv.indexOf(flag)
  return index >= 0 ? process.argv[index + 1] : undefined
}

const apply = hasFlag('--apply')
const input = valueAfter('--input') || defaultInput
const confirmedManifest = valueAfter('--confirm-manifest')
const validPhases = new Set(['canonical', 'news', 'cleanup'])
const phases = new Set(
  (valueAfter('--phases') || 'canonical,news')
    .split(',')
    .map((phase) => phase.trim())
    .filter(Boolean)
)
const projectId =
  valueAfter('--project') ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  'g84jdio4'
const dataset =
  valueAfter('--dataset') ||
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  'production'
const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN
const plan = await buildMigrationPlan(input)

const includeAction = (action) => {
  if (!phases.has(action.phase)) return false
  if (action.kind === 'deleteObsoleteDocument') {
    return hasFlag('--include-obsolete-documents')
  }
  if (action.kind === 'unsetPresentationPaths') {
    return hasFlag('--include-presentation-paths')
  }
  if (action.kind === 'unsetShadowedLegacyPaths') {
    return hasFlag('--include-shadowed-legacy-paths')
  }
  return true
}

const selectedActions = plan.actions.filter(includeAction)
const unknownPhases = [...phases].filter((phase) => !validPhases.has(phase))

if (unknownPhases.length) {
  throw new Error(`Unknown migration phase(s): ${unknownPhases.join(', ')}`)
}

if (!apply) {
  process.stdout.write(`${JSON.stringify({
    mode: 'dry-run',
    projectId,
    dataset,
    manifestHash: plan.manifestHash,
    selectedPhases: [...phases],
    selectedActions: selectedActions.map((action) => ({
      kind: action.kind,
      documentId: action.documentId || action.sourceId || action.targetId,
      documentType: action.documentType,
    })),
    safeguards: plan.safeguards,
  }, null, 2)}\n`)
  process.exit(0)
}

if (!token) {
  throw new Error('SANITY_TOKEN or SANITY_API_TOKEN is required with --apply')
}
if (confirmedManifest !== plan.manifestHash) {
  throw new Error(
    `Refusing apply: pass --confirm-manifest ${plan.manifestHash}`
  )
}
const cleanupFlags = [
  '--include-obsolete-documents',
  '--include-presentation-paths',
  '--include-shadowed-legacy-paths',
]
if (
  phases.has('cleanup') &&
  (
    !hasFlag('--acknowledge-destructive-cleanup') ||
    !cleanupFlags.some(hasFlag)
  )
) {
  throw new Error(
    'Cleanup requires --acknowledge-destructive-cleanup and at least one cleanup include flag'
  )
}
if (
  hasFlag('--include-presentation-paths') &&
  !hasFlag('--frontend-theme-cutover-complete')
) {
  throw new Error(
    'Presentation cleanup requires --frontend-theme-cutover-complete'
  )
}
if (!selectedActions.length) {
  throw new Error('Refusing apply: no migration actions were selected')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-07-01',
  useCdn: false,
  token,
})
const affectedIds = [
  ...new Set(
    selectedActions.flatMap((action) =>
      [action.documentId, action.sourceId, action.targetId].filter(Boolean)
    )
  ),
]
const liveDocuments = await client.fetch(
  '*[_id in $ids]{_id,_rev,_type}',
  {ids: affectedIds},
  {perspective: 'raw'}
)
const liveById = new Map(liveDocuments.map((document) => [document._id, document]))

for (const action of selectedActions) {
  if (action.kind === 'createMissingSingleton') {
    if (liveById.has(action.targetId)) {
      throw new Error(
        `Refusing singleton creation: target ${action.targetId} now exists`
      )
    }
    continue
  }

  const sourceId = action.documentId || action.sourceId
  const live = liveById.get(sourceId)
  if (!live || live._rev !== action.expectedRevision) {
    throw new Error(
      `Refusing apply: ${sourceId} changed or disappeared since the export`
    )
  }
  if (action.targetId && liveById.has(action.targetId)) {
    throw new Error(
      `Refusing singleton replacement: target ${action.targetId} already exists`
    )
  }
}

const patchesByDocument = new Map()
const transaction = client.transaction()
const removedDocumentIds = new Set(
  selectedActions.flatMap((action) => {
    if (action.kind === 'deleteObsoleteDocument') return [action.documentId]
    if (action.kind === 'replaceSingletonId') return [action.sourceId]
    return []
  })
)

const queuePatch = (documentId, revision, setIfMissing = {}, unset = []) => {
  const current = patchesByDocument.get(documentId) || {
    revision,
    setIfMissing: {},
    unset: new Set(),
  }
  if (current.revision !== revision) {
    throw new Error(`Conflicting revisions in manifest for ${documentId}`)
  }
  Object.assign(current.setIfMissing, setIfMissing)
  unset.forEach((path) => current.unset.add(path))
  patchesByDocument.set(documentId, current)
}

const queueRevisionLockedDelete = (documentId, revision) => {
  transaction.patch(documentId, (patch) =>
    patch
      .ifRevisionId(revision)
      .unset(['cmsMigrationRevisionGuard'])
  )
  transaction.delete(documentId)
}

for (const action of selectedActions) {
  if (action.kind === 'createMissingSingleton') {
    transaction.create(action.replacement)
    continue
  }

  if (action.kind === 'replaceSingletonId') {
    transaction.create(action.replacement)
    queueRevisionLockedDelete(action.sourceId, action.expectedRevision)
    continue
  }

  if (action.kind === 'canonicalizeProduct') {
    queuePatch(
      action.documentId,
      action.expectedRevision,
      action.setIfMissing,
      action.unset
    )
    continue
  }

  if (action.kind === 'backfillImageAlt') {
    queuePatch(action.documentId, action.expectedRevision, action.setIfMissing)
    continue
  }

  if (action.kind === 'patchNewsPost') {
    queuePatch(action.documentId, action.expectedRevision, action.setIfMissing)
    continue
  }

  if (action.kind === 'deleteObsoleteDocument') {
    queueRevisionLockedDelete(action.documentId, action.expectedRevision)
    continue
  }

  const paths = action.paths || []
  if (paths.length && !removedDocumentIds.has(action.documentId)) {
    queuePatch(action.documentId, action.expectedRevision, {}, paths)
  }
}

for (const [documentId, changes] of patchesByDocument) {
  transaction.patch(documentId, (patch) => {
    let next = patch.ifRevisionId(changes.revision)
    if (Object.keys(changes.setIfMissing).length) {
      next = next.setIfMissing(changes.setIfMissing)
    }
    if (changes.unset.size) {
      next = next.unset([...changes.unset].sort())
    }
    return next
  })
}

const result = await transaction.commit()
process.stdout.write(`${JSON.stringify({
  mode: 'apply',
  projectId,
  dataset,
  manifestHash: plan.manifestHash,
  mutations: result.results?.length || selectedActions.length,
}, null, 2)}\n`)
