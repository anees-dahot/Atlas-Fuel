import Image from 'next/image'
import createImageUrlBuilder from '@sanity/image-url'

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
})

const validString = (value) =>
  typeof value === 'string' &&
  value.length > 0 &&
  value !== '[object Object]'

function resolveSource(value, width, height, fit) {
  if (!value) return ''
  if (validString(value)) return value

  if (value?.asset) {
    try {
      let image = builder.image(value).auto('format')
      if (width) image = image.width(width)
      if (height) image = image.height(height).fit(fit)
      return image.url()
    } catch {
      return validString(value?.url) ? value.url : ''
    }
  }

  return validString(value?.url)
    ? value.url
    : validString(value?.imageUrl)
      ? value.imageUrl
      : ''
}

export default function CmsImage({
  value,
  src,
  fallbackSrc,
  alt,
  width = 1200,
  height = 800,
  fill = false,
  sizes,
  className,
  style,
  priority = false,
  quality = 85,
  fit = 'crop',
}) {
  const imageValue = value ?? src
  const resolvedSrc = imageValue == null
    ? fallbackSrc
    : resolveSource(imageValue, width, height, fit)

  if (!resolvedSrc) return null

  const resolvedAlt =
    alt ??
    (typeof imageValue === 'object' ? imageValue?.alt : '') ??
    ''

  return (
    <Image
      src={resolvedSrc}
      alt={resolvedAlt}
      {...(fill ? {fill: true} : {width, height})}
      sizes={sizes}
      className={className}
      style={style}
      priority={priority}
      quality={quality}
    />
  )
}
