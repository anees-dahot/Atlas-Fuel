import {createHash} from 'node:crypto'
import {basename, dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {
  MISSING_SINGLETON_DEFAULTS,
  PRESENTATION_FIELD_SUFFIX,
  PRESERVED_PRESENTATION_FIELD_NAMES,
  PRODUCT_FIELD_MIGRATIONS,
  SINGLETON_IDS,
  SYSTEM_FIELDS,
} from '../cms-v2-config.mjs'
import {
  readExportAssets,
  readExportDocuments,
  sha256File,
  stableStringify,
} from './dataset-export.mjs'
import {buildNewsBackfills} from './news-backfill.mjs'
import {buildImageAltBackfills} from './image-alt-backfill.mjs'
import {analyzeDataset} from './quota-analysis.mjs'

const moduleDirectory = dirname(fileURLToPath(import.meta.url))
const nextjsDirectory = resolve(moduleDirectory, '../../..')

const withoutSystemFields = (document, id) =>
  Object.fromEntries([
    ['_id', id],
    ...Object.entries(document).filter(
      ([field]) =>
        !['_id', '_rev', '_createdAt', '_updatedAt'].includes(field)
    ),
  ])

const buildSingletonActions = (analysis) =>
  analysis.singletonStatus.flatMap(({type, canonicalId, ids, status}) => {
    if (status === 'missing' && MISSING_SINGLETON_DEFAULTS[type]) {
      return [{
        kind: 'createMissingSingleton',
        phase: 'canonical',
        documentType: type,
        targetId: canonicalId,
        replacement: {
          _id: canonicalId,
          _type: type,
          ...MISSING_SINGLETON_DEFAULTS[type],
        },
      }]
    }
    if (status !== 'noncanonical' || ids.length !== 1) return []
    const source = analysis.contentDocuments.find((document) => document._id === ids[0])
    if (!source) return []

    return [{
      kind: 'replaceSingletonId',
      phase: 'canonical',
      documentType: type,
      sourceId: source._id,
      targetId: canonicalId,
      expectedRevision: source._rev,
      replacement: withoutSystemFields(source, canonicalId),
    }]
  })

const buildProductActions = (analysis) =>
  analysis.contentDocuments
    .filter((document) => PRODUCT_FIELD_MIGRATIONS[document._type])
    .flatMap((document) => {
      const setIfMissing = {}
      const unset = []

      for (const {from, to} of PRODUCT_FIELD_MIGRATIONS[document._type]) {
        if (document[from] === undefined) continue
        if (document[to] === undefined) setIfMissing[to] = document[from]
        unset.push(from)
      }

      if (!Object.keys(setIfMissing).length && !unset.length) return []
      return [{
        kind: 'canonicalizeProduct',
        phase: 'canonical',
        documentId: document._id,
        documentType: document._type,
        expectedRevision: document._rev,
        setIfMissing,
        unset: unset.sort(),
      }]
    })
    .sort((left, right) => left.documentId.localeCompare(right.documentId))

const buildCleanupActions = (analysis) => {
  const obsoleteDocuments = analysis.obsoleteDocuments
    .map((document) => ({
      kind: 'deleteObsoleteDocument',
      phase: 'cleanup',
      documentId: document._id,
      documentType: document._type,
      expectedRevision: document._rev,
      destructive: true,
      requiresFlag: '--include-obsolete-documents',
    }))
    .sort((left, right) =>
      left.documentType.localeCompare(right.documentType) ||
      left.documentId.localeCompare(right.documentId)
    )

  const presentationPaths = analysis.presentationPathsByDocument.map((item) => ({
    kind: 'unsetPresentationPaths',
    phase: 'cleanup',
    documentId: item.documentId,
    documentType: item.documentType,
    expectedRevision: item.revision,
    paths: item.paths,
    destructive: true,
    deferredUntilFrontendThemeCutover: true,
    requiresFlag: '--include-presentation-paths',
  }))

  const shadowedLegacyPaths = analysis.shadowedLegacyPathsByDocument.map((item) => ({
    kind: 'unsetShadowedLegacyPaths',
    phase: 'cleanup',
    documentId: item.documentId,
    documentType: item.documentType,
    expectedRevision: item.revision,
    paths: item.paths.map(({path}) => path).sort(),
    matchedSections: item.paths,
    destructive: true,
    requiresFlag: '--include-shadowed-legacy-paths',
  }))

  return {obsoleteDocuments, presentationPaths, shadowedLegacyPaths}
}

const valueType = (value) => {
  if (Array.isArray(value)) return 'array'
  if (value === null) return 'null'
  return typeof value === 'object' ? 'object' : typeof value
}

const normalizeMutationPath = (path) =>
  path.replace(/\[_key=="[^"]*"\]|\[\d+\]/g, '[]')

const recordAttributePairs = (value, path, pairs) => {
  if (value === undefined || value === null) return

  pairs.add(`${path}\u0000${valueType(value)}`)

  if (Array.isArray(value)) {
    for (const item of value) recordAttributePairs(item, `${path}[]`, pairs)
    return
  }

  if (typeof value !== 'object') return

  for (const [field, child] of Object.entries(value)) {
    if (SYSTEM_FIELDS.has(field)) continue
    recordAttributePairs(child, `${path}.${field}`, pairs)
  }
}

const conservativeProjection = (analysis, actions) => {
  const remainingPairs = new Set()

  for (const document of analysis.currentDocuments) {
    for (const pair of analysis.pathsByDocument.get(document._id) || []) {
      const path = pair.split('\u0000')[0]
      const field = path.split('.').at(-1)?.replace(/\[\]$/, '')
      if (
        !PRESENTATION_FIELD_SUFFIX.test(field || '') ||
        PRESERVED_PRESENTATION_FIELD_NAMES.has(field)
      ) {
        remainingPairs.add(pair)
      }
    }
  }

  const potentialAdditions = new Set()
  for (const action of actions) {
    if (action.kind === 'createMissingSingleton') {
      for (const [field, value] of Object.entries(action.replacement)) {
        if (SYSTEM_FIELDS.has(field)) continue
        recordAttributePairs(value, field, potentialAdditions)
      }
    }

    for (const [path, value] of Object.entries(action.setIfMissing || {})) {
      recordAttributePairs(
        value,
        normalizeMutationPath(path),
        potentialAdditions
      )
    }
  }

  const newPairs = [...potentialAdditions].filter(
    (pair) => !remainingPairs.has(pair)
  )

  return {
    basePairsAfterObsoleteAndPresentationCleanup: remainingPairs.size,
    potentialNewAttributePairs: newPairs.length,
    conservativeProjectedContentAttributePairs:
      remainingPairs.size + newPairs.length,
  }
}

export async function buildMigrationPlan(input) {
  const {documents, sourcePath} = readExportDocuments(input)
  const {assets, imageMembers} = readExportAssets(input)
  const analysis = analyzeDataset(documents)
  const sourceHash = await sha256File(sourcePath)
  const cleanup = buildCleanupActions(analysis)
  const actions = [
    ...buildSingletonActions(analysis),
    ...buildProductActions(analysis),
    ...buildImageAltBackfills(analysis),
    ...buildNewsBackfills({
      documents,
      sourceFile: resolve(nextjsDirectory, 'src/app/news/[slug]/page.js'),
      publicImagesDirectory: resolve(nextjsDirectory, 'public/images'),
      assets,
      imageMembers,
    }),
    ...cleanup.obsoleteDocuments,
    ...cleanup.presentationPaths,
    ...cleanup.shadowedLegacyPaths,
  ]
  const projection = conservativeProjection(analysis, actions)

  const plan = {
    version: 1,
    source: {
      file: basename(sourcePath),
      sha256: sourceHash,
      documents: analysis.summary.documents,
    },
    safeguards: {
      defaultMode: 'dry-run',
      applyRequiresManifestHash: true,
      revisionsMustMatchExport: true,
      deletionsRevisionLockedInTransaction: true,
      canonicalTargetsRequireCreate: true,
      destructiveCleanupRequiresSeparateFlags: true,
      productionMutationPerformedByGenerator: false,
    },
    summary: {
      estimatedAttributePairs: analysis.summary.estimatedAttributePairs,
      obsoleteOnlyAttributePairs: analysis.summary.obsoleteOnlyAttributePairs,
      presentationAttributePairs: analysis.summary.presentationAttributePairs,
      estimatedCleanupAttributePairs: analysis.summary.estimatedCleanupAttributePairs,
      estimatedPostCleanupAttributePairs: analysis.summary.estimatedPostCleanupAttributePairs,
      ...projection,
      conservativeNetAttributeReduction:
        analysis.summary.estimatedAttributePairs -
        projection.conservativeProjectedContentAttributePairs,
      singletonCreates: actions.filter((action) => action.kind === 'createMissingSingleton').length,
      singletonReplacements: actions.filter((action) => action.kind === 'replaceSingletonId').length,
      productCanonicalizations: actions.filter((action) => action.kind === 'canonicalizeProduct').length,
      imageAltDocuments: actions.filter((action) => action.kind === 'backfillImageAlt').length,
      imageAltValues: actions
        .filter((action) => action.kind === 'backfillImageAlt')
        .reduce((total, action) => total + action.imageCount, 0),
      newsBackfills: actions.filter((action) => action.kind === 'patchNewsPost').length,
      obsoleteDocumentDeletes: cleanup.obsoleteDocuments.length,
      presentationDocuments: cleanup.presentationPaths.length,
      shadowedLegacyDocuments: cleanup.shadowedLegacyPaths.length,
    },
    actions,
  }

  const manifestHash = createHash('sha256')
    .update(stableStringify(plan, 0))
    .digest('hex')

  return {...plan, manifestHash}
}
