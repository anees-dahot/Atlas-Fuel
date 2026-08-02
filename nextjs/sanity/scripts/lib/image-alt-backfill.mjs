const isImage = (value) =>
  value &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  (
    value._type === 'image' ||
    value.asset?._ref ||
    String(value._sanityAsset || '').startsWith('image@')
  )

const selectorFor = (item, index) =>
  item && typeof item === 'object' && item._key
    ? `[_key=="${String(item._key).replaceAll('"', '\\"')}"]`
    : `[${index}]`

const humanize = (value) =>
  value
    .replace(/\[_key=="[^"]*"\]|\[\d+\]/g, '')
    .replace(/\bSection\b/g, '')
    .replace(/ImageUrl|Image|Url/g, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

const altFor = (path, ancestors) => {
  for (const object of [...ancestors].reverse()) {
    for (const field of ['title', 'label', 'name', 'heading', 'subtitle']) {
      const value = object?.[field]
      if (typeof value === 'string' && value.trim() && value.trim().length <= 120) {
        return value.trim()
      }
    }
  }

  const segments = path.split('.').slice(-2).join(' ')
  const label = humanize(segments) || 'Image'
  return label.toLowerCase().includes('atlas fuel') ? label : `Atlas Fuel ${label}`
}

function collectMissingImageAlts(value, path, ancestors, result) {
  if (!value || typeof value !== 'object') return

  if (isImage(value)) {
    if (!String(value.alt || '').trim()) {
      result.push({path: `${path}.alt`, value: altFor(path, ancestors)})
    }
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      collectMissingImageAlts(
        item,
        `${path}${selectorFor(item, index)}`,
        ancestors,
        result
      )
    )
    return
  }

  for (const [field, child] of Object.entries(value)) {
    if (field.startsWith('_')) continue
    collectMissingImageAlts(
      child,
      path ? `${path}.${field}` : field,
      [...ancestors, value],
      result
    )
  }
}

export function buildImageAltBackfills(analysis) {
  const shadowedByDocument = new Map(
    analysis.shadowedLegacyPathsByDocument.map((item) => [
      item.documentId,
      new Set(item.paths.map(({path}) => path)),
    ])
  )

  return analysis.currentDocuments
    .flatMap((document) => {
      const missing = []
      collectMissingImageAlts(document, '', [], missing)
      const shadowed = shadowedByDocument.get(document._id) || new Set()
      const canonical = missing.filter(({path}) => {
        const root = path.split('.')[0]
        return !shadowed.has(root)
      })
      if (!canonical.length) return []

      return [{
        kind: 'backfillImageAlt',
        phase: 'canonical',
        documentId: document._id,
        documentType: document._type,
        expectedRevision: document._rev,
        imageCount: canonical.length,
        setIfMissing: Object.fromEntries(
          canonical
            .sort((left, right) => left.path.localeCompare(right.path))
            .map(({path, value}) => [path, value])
        ),
      }]
    })
    .sort((left, right) => left.documentId.localeCompare(right.documentId))
}
