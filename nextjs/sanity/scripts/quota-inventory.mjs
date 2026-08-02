#!/usr/bin/env node
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {
  readExportDocuments,
  sha256File,
  stableStringify,
} from './lib/dataset-export.mjs'
import {
  analyzeDataset,
  serializableInventory,
} from './lib/quota-analysis.mjs'

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
const {documents, sourcePath} = readExportDocuments(input)
const analysis = analyzeDataset(documents)
const inventory = {
  source: {
    path: sourcePath,
    sha256: await sha256File(sourcePath),
  },
  ...serializableInventory(analysis),
}

if (asJson) {
  process.stdout.write(`${stableStringify(inventory)}\n`)
} else {
  const {summary} = inventory
  process.stdout.write([
    `Source: ${inventory.source.path}`,
    `SHA-256: ${inventory.source.sha256}`,
    `Documents: ${summary.documents} (${summary.currentDocuments} current, ${summary.obsoleteDocuments} obsolete)`,
    `Document types: ${summary.currentTypes} current, ${summary.obsoleteTypes} obsolete`,
    `Estimated content attribute pairs: ${summary.estimatedAttributePairs}`,
    `Estimated current-model pairs: ${summary.currentAttributePairs}`,
    `Estimated obsolete-only reduction: ${summary.obsoleteOnlyAttributePairs}`,
    `Presentation attribute pairs: ${summary.presentationAttributePairs}`,
    `Estimated combined quota reduction: ${summary.estimatedCleanupAttributePairs}`,
    `Base content pairs after obsolete/presentation cleanup: ${summary.estimatedPostCleanupAttributePairs}`,
    `Singleton problems: ${summary.singletonProblems}`,
    `Product field mismatches: ${summary.productMismatches}`,
    `News posts missing body/image: ${summary.newsGaps}`,
    '',
    'Top document types by unique paths:',
    ...inventory.typeAttributeCounts
      .slice(0, 15)
      .map(({type, documents: count, attributes, registered}) =>
        `  ${type}: ${attributes} paths across ${count} document(s)${registered ? '' : ' [obsolete]'}`
      ),
    '',
  ].join('\n'))
}
