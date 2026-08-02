import {createHash} from 'node:crypto'
import {readFileSync} from 'node:fs'
import {extname} from 'node:path'

export const NEWS_FALLBACKS = Object.freeze([
  {
    documentId: 'news-post-1',
    slug: 'future-of-fueling',
    imagePath: 'what-we-do-fuel-transportation.webp',
  },
  {
    documentId: 'news-post-2',
    slug: 'choosing-fueling-partner',
    imagePath: 'hero-trucks.jpg',
  },
  {
    documentId: 'news-post-3',
    slug: 'ai-automation-fueling',
    imagePath: 'what-we-do-mining-civil.webp',
  },
])

const decodeHtml = (text) =>
  text
    .replaceAll('&amp;', '&')
    .replaceAll('&apos;', "'")
    .replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replace(/<[^>]+>/g, '')
    .trim()

const portableTextBlock = ({key, style = 'normal', text, listItem}) => ({
  _key: key,
  _type: 'block',
  style,
  markDefs: [],
  children: [{
    _key: `${key}-span`,
    _type: 'span',
    marks: [],
    text,
  }],
  ...(listItem ? {level: 1, listItem} : {}),
})

export function fallbackHtmlToPortableText(html, slug) {
  const blocks = []
  const pattern = /<(p|h2|li)>([\s\S]*?)<\/\1>/g
  let match

  while ((match = pattern.exec(html))) {
    const tag = match[1]
    const text = decodeHtml(match[2])
    if (!text) continue
    const index = blocks.length + 1
    blocks.push(
      portableTextBlock({
        key: `${slug}-${index}`,
        style: tag === 'h2' ? 'h2' : 'normal',
        text,
        listItem: tag === 'li' ? 'bullet' : undefined,
      })
    )
  }

  return blocks
}

function extractFallbackEntry(source, slug) {
  const entryStart = source.indexOf(`'${slug}': {`)
  if (entryStart < 0) throw new Error(`Fallback news entry not found: ${slug}`)

  const nextEntry = source.indexOf('\n  },', entryStart)
  if (nextEntry < 0) throw new Error(`Fallback news entry is incomplete: ${slug}`)
  const entry = source.slice(entryStart, nextEntry)
  const title = entry.match(/\n\s+title:\s+'([^']+)'/)?.[1]
  const contentStart = entry.indexOf('content: `')
  const contentEnd = entry.lastIndexOf('`')

  if (!title || contentStart < 0 || contentEnd <= contentStart) {
    throw new Error(`Fallback news entry cannot be parsed: ${slug}`)
  }

  return {
    title,
    body: fallbackHtmlToPortableText(
      entry.slice(contentStart + 'content: `'.length, contentEnd),
      slug
    ),
  }
}

function exportedImageRef(imagePath, publicImagesDirectory, assets, imageMembers) {
  const bytes = readFileSync(`${publicImagesDirectory}/${imagePath}`)
  const sha1 = createHash('sha1').update(bytes).digest('hex')
  const asset = assets[`image-${sha1}`]
  const member = imageMembers.find((item) => item.includes(`/images/${sha1}-`))

  if (!asset || !member) {
    throw new Error(
      `Fallback image ${imagePath} is not present in the dataset export (${sha1})`
    )
  }

  const dimensions = asset.metadata?.dimensions
  const extension = extname(member).slice(1).toLowerCase().replace('jpeg', 'jpg')
  if (!dimensions?.width || !dimensions?.height || !extension) {
    throw new Error(`Incomplete exported asset metadata for ${imagePath}`)
  }

  return `image-${sha1}-${dimensions.width}x${dimensions.height}-${extension}`
}

export function buildNewsBackfills({
  documents,
  sourceFile,
  publicImagesDirectory,
  assets,
  imageMembers,
}) {
  const source = readFileSync(sourceFile, 'utf8')
  const byId = new Map(documents.map((document) => [document._id, document]))

  return NEWS_FALLBACKS.flatMap(({documentId, slug, imagePath}) => {
    const document = byId.get(documentId)
    if (!document) return []

    const missingBody = !Array.isArray(document.body) || document.body.length === 0
    const missingMainImage = !(
      document.mainImage?.asset?._ref || document.mainImage?._sanityAsset
    )
    if (!missingBody && !missingMainImage) return []

    const fallback = extractFallbackEntry(source, slug)
    const setIfMissing = {}
    if (missingBody) setIfMissing.body = fallback.body
    if (missingMainImage) {
      setIfMissing.mainImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: exportedImageRef(
            imagePath,
            publicImagesDirectory,
            assets,
            imageMembers
          ),
        },
        alt: fallback.title,
      }
    }

    return [{
      kind: 'patchNewsPost',
      phase: 'news',
      documentId,
      documentType: 'newsPost',
      expectedRevision: document._rev,
      sourceSlug: slug,
      sourceImage: imagePath,
      setIfMissing,
    }]
  })
}
