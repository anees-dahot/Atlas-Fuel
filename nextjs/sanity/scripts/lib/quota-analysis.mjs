import {
  CANONICAL_DOCUMENT_TYPES,
  PRESENTATION_FIELD_SUFFIX,
  PRESERVED_PRESENTATION_FIELD_NAMES,
  PRODUCT_FIELD_MIGRATIONS,
  SINGLETON_IDS,
  SYSTEM_FIELDS,
} from '../cms-v2-config.mjs'

const valueType = (value) => {
  if (Array.isArray(value)) return 'array'
  if (value === null) return 'null'
  return typeof value === 'object' ? 'object' : typeof value
}

const attributeKey = (path, type) => `${path}\u0000${type}`

function recordValue(value, path, document, attributes, pathsByDocument) {
  if (value === undefined || value === null) return

  const type = valueType(value)
  const key = attributeKey(path, type)
  const entry = attributes.get(key) || {
    path,
    type,
    documentIds: new Set(),
    documentTypes: new Set(),
    occurrences: 0,
  }

  entry.documentIds.add(document._id)
  entry.documentTypes.add(document._type)
  entry.occurrences += 1
  attributes.set(key, entry)
  pathsByDocument.get(document._id).add(key)

  if (Array.isArray(value)) {
    for (const item of value) {
      if (item === undefined || item === null) continue
      recordValue(item, `${path}[]`, document, attributes, pathsByDocument)
    }
    return
  }

  if (typeof value !== 'object') return

  for (const [field, child] of Object.entries(value)) {
    if (SYSTEM_FIELDS.has(field)) continue
    recordValue(child, `${path}.${field}`, document, attributes, pathsByDocument)
  }
}

const collectAttributes = (documents) => {
  const attributes = new Map()
  const pathsByDocument = new Map(
    documents.map((document) => [document._id, new Set()])
  )

  for (const document of documents) {
    for (const [field, value] of Object.entries(document)) {
      if (SYSTEM_FIELDS.has(field)) continue
      recordValue(value, field, document, attributes, pathsByDocument)
    }
  }

  return {attributes, pathsByDocument}
}

const pairSetForDocuments = (documents, pathsByDocument) => {
  const pairs = new Set()
  for (const document of documents) {
    for (const key of pathsByDocument.get(document._id) || []) pairs.add(key)
  }
  return pairs
}

const deepEqual = (left, right) => JSON.stringify(left) === JSON.stringify(right)

const findShadowedLegacyPaths = (document) => {
  const sections = Object.entries(document).filter(
    ([name, value]) =>
      name.endsWith('Section') &&
      value &&
      typeof value === 'object' &&
      !Array.isArray(value)
  )

  return Object.entries(document)
    .filter(([name]) => !SYSTEM_FIELDS.has(name) && !name.endsWith('Section'))
    .flatMap(([name, value]) => {
      const matches = sections
        .filter(([, section]) =>
          Object.prototype.hasOwnProperty.call(section, name) &&
          deepEqual(section[name], value)
        )
        .map(([sectionName]) => sectionName)
      return matches.length ? [{path: name, matches}] : []
    })
}

const collectLeafPaths = (value, path = '', result = []) => {
  if (value === undefined || value === null) return result

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const selector =
        item && typeof item === 'object' && item._key
          ? `[_key=="${String(item._key).replaceAll('"', '\\"')}"]`
          : `[${index}]`
      collectLeafPaths(item, `${path}${selector}`, result)
    })
    return result
  }

  if (typeof value === 'object') {
    for (const [field, child] of Object.entries(value)) {
      if (SYSTEM_FIELDS.has(field)) continue
      collectLeafPaths(child, path ? `${path}.${field}` : field, result)
    }
    return result
  }

  result.push(path)
  return result
}

export function analyzeDataset(documents) {
  const contentDocuments = documents.filter(
    (document) =>
      !document._type?.startsWith('sanity.') &&
      !document._type?.startsWith('system.')
  )
  const currentDocuments = contentDocuments.filter((document) =>
    CANONICAL_DOCUMENT_TYPES.has(document._type)
  )
  const obsoleteDocuments = contentDocuments.filter(
    (document) => !CANONICAL_DOCUMENT_TYPES.has(document._type)
  )
  const {attributes, pathsByDocument} = collectAttributes(contentDocuments)
  const allPairs = pairSetForDocuments(contentDocuments, pathsByDocument)
  const currentPairs = pairSetForDocuments(currentDocuments, pathsByDocument)
  const obsoletePairs = pairSetForDocuments(obsoleteDocuments, pathsByDocument)
  const obsoleteOnlyPairs = new Set(
    [...obsoletePairs].filter((pair) => !currentPairs.has(pair))
  )
  const presentationPairs = new Set(
    [...allPairs].filter((pair) => {
      const path = pair.split('\u0000')[0]
      const field = path.split('.').at(-1)?.replace(/\[\]$/, '')
      return (
        PRESENTATION_FIELD_SUFFIX.test(field || '') &&
        !PRESERVED_PRESENTATION_FIELD_NAMES.has(field)
      )
    })
  )
  const quotaCleanupPairs = new Set([
    ...obsoleteOnlyPairs,
    ...presentationPairs,
  ])

  const typeCounts = new Map()
  for (const document of contentDocuments) {
    typeCounts.set(document._type, (typeCounts.get(document._type) || 0) + 1)
  }

  const typeAttributeCounts = [...typeCounts.keys()]
    .map((type) => {
      const typeDocuments = contentDocuments.filter((document) => document._type === type)
      return {
        type,
        documents: typeDocuments.length,
        attributes: pairSetForDocuments(typeDocuments, pathsByDocument).size,
        registered: CANONICAL_DOCUMENT_TYPES.has(type),
      }
    })
    .sort((left, right) =>
      right.attributes - left.attributes || left.type.localeCompare(right.type)
    )

  const singletonStatus = Object.entries(SINGLETON_IDS)
    .map(([type, canonicalId]) => {
      const matches = contentDocuments
        .filter(
          (document) =>
            document._type === type && !document._id.startsWith('drafts.')
        )
        .map((document) => document._id)
        .sort()
      return {
        type,
        canonicalId,
        ids: matches,
        status:
          matches.length === 0
            ? 'missing'
            : matches.length === 1 && matches[0] === canonicalId
              ? 'canonical'
              : matches.includes(canonicalId)
                ? 'duplicates'
                : 'noncanonical',
      }
    })
    .sort((left, right) => left.type.localeCompare(right.type))

  const productMismatches = contentDocuments
    .filter((document) => PRODUCT_FIELD_MIGRATIONS[document._type])
    .flatMap((document) =>
      PRODUCT_FIELD_MIGRATIONS[document._type].flatMap(({from, to}) =>
        document[from] !== undefined && document[to] === undefined
          ? [{
              documentId: document._id,
              documentType: document._type,
              from,
              to,
            }]
          : []
      )
    )
    .sort((left, right) =>
      left.documentId.localeCompare(right.documentId) ||
      left.from.localeCompare(right.from)
    )

  const newsGaps = contentDocuments
    .filter((document) => document._type === 'newsPost')
    .map((document) => ({
      documentId: document._id,
      slug: document.slug?.current,
      missingBody: !Array.isArray(document.body) || document.body.length === 0,
      missingMainImage: !(
        document.mainImage?.asset?._ref || document.mainImage?._sanityAsset
      ),
    }))
    .filter((item) => item.missingBody || item.missingMainImage)
    .sort((left, right) => left.documentId.localeCompare(right.documentId))

  const presentationPathsByDocument = contentDocuments
    .map((document) => ({
      documentId: document._id,
      documentType: document._type,
      revision: document._rev,
      paths: collectLeafPaths(document)
        .filter((path) => {
          const field = path.split('.').at(-1)?.replace(/\[[^\]]+\]/g, '')
          return (
            PRESENTATION_FIELD_SUFFIX.test(field || '') &&
            !PRESERVED_PRESENTATION_FIELD_NAMES.has(field)
          )
        })
        .sort(),
    }))
    .filter((item) => item.paths.length > 0)

  const shadowedLegacyPathsByDocument = contentDocuments
    .map((document) => ({
      documentId: document._id,
      documentType: document._type,
      revision: document._rev,
      paths: findShadowedLegacyPaths(document),
    }))
    .filter((item) => item.paths.length > 0)

  return {
    contentDocuments,
    currentDocuments,
    obsoleteDocuments,
    attributes,
    pathsByDocument,
    summary: {
      documents: contentDocuments.length,
      currentDocuments: currentDocuments.length,
      obsoleteDocuments: obsoleteDocuments.length,
      currentTypes: new Set(currentDocuments.map((document) => document._type)).size,
      obsoleteTypes: new Set(obsoleteDocuments.map((document) => document._type)).size,
      estimatedAttributePairs: allPairs.size,
      currentAttributePairs: currentPairs.size,
      obsoleteAttributePairs: obsoletePairs.size,
      obsoleteOnlyAttributePairs: obsoleteOnlyPairs.size,
      presentationAttributePairs: presentationPairs.size,
      estimatedCleanupAttributePairs: quotaCleanupPairs.size,
      estimatedPostCleanupAttributePairs: allPairs.size - quotaCleanupPairs.size,
      singletonProblems: singletonStatus.filter((item) => item.status !== 'canonical').length,
      productMismatches: productMismatches.length,
      newsGaps: newsGaps.length,
    },
    typeAttributeCounts,
    singletonStatus,
    productMismatches,
    newsGaps,
    presentationPathsByDocument,
    shadowedLegacyPathsByDocument,
    obsoleteOnlyPaths: [...obsoleteOnlyPairs]
      .map((pair) => {
        const [path, type] = pair.split('\u0000')
        return {path, type}
      })
      .sort((left, right) =>
        left.path.localeCompare(right.path) || left.type.localeCompare(right.type)
      ),
  }
}

export function serializableInventory(analysis) {
  return {
    summary: analysis.summary,
    typeAttributeCounts: analysis.typeAttributeCounts,
    singletonStatus: analysis.singletonStatus,
    productMismatches: analysis.productMismatches,
    newsGaps: analysis.newsGaps,
    obsoleteDocuments: analysis.obsoleteDocuments
      .map((document) => ({
        id: document._id,
        type: document._type,
        revision: document._rev,
      }))
      .sort((left, right) =>
        left.type.localeCompare(right.type) || left.id.localeCompare(right.id)
      ),
    obsoleteOnlyPaths: analysis.obsoleteOnlyPaths,
    presentationPathsByDocument: analysis.presentationPathsByDocument,
    shadowedLegacyPathsByDocument: analysis.shadowedLegacyPathsByDocument,
  }
}
