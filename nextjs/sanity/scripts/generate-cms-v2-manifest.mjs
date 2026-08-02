#!/usr/bin/env node
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {stableStringify} from './lib/dataset-export.mjs'
import {buildMigrationPlan} from './lib/migration-plan.mjs'

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
const asJson = process.argv.includes('--json')
const plan = await buildMigrationPlan(input)

if (asJson) {
  process.stdout.write(`${stableStringify(plan)}\n`)
} else {
  process.stdout.write([
    'Mode: dry-run',
    `Backup SHA-256: ${plan.source.sha256}`,
    `Manifest SHA-256: ${plan.manifestHash}`,
    `Missing singleton creations: ${plan.summary.singletonCreates}`,
    `Canonical singleton replacements: ${plan.summary.singletonReplacements}`,
    `Product documents to canonicalize: ${plan.summary.productCanonicalizations}`,
    `Image alt documents to backfill: ${plan.summary.imageAltDocuments}`,
    `Image alt values to backfill: ${plan.summary.imageAltValues}`,
    `News posts to backfill: ${plan.summary.newsBackfills}`,
    `Obsolete documents requiring approval: ${plan.summary.obsoleteDocumentDeletes}`,
    `Documents with deferred presentation cleanup: ${plan.summary.presentationDocuments}`,
    `Documents with identical shadowed legacy fields: ${plan.summary.shadowedLegacyDocuments}`,
    `Estimated combined quota reduction: ${plan.summary.estimatedCleanupAttributePairs}`,
    `Base content pairs after obsolete/presentation cleanup: ${plan.summary.estimatedPostCleanupAttributePairs}`,
    `Potential new pairs from canonical backfills: ${plan.summary.potentialNewAttributePairs}`,
    `Conservative projected content pairs: ${plan.summary.conservativeProjectedContentAttributePairs}`,
    `Conservative net content-pair reduction: ${plan.summary.conservativeNetAttributeReduction}`,
    '',
    'No dataset writes were performed.',
    '',
  ].join('\n'))
}
