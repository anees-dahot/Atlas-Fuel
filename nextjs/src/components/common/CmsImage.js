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

function resolveSource(value, width, height, fit, quality, ratio) {
  if (!value) return ''
  if (validString(value)) return value

  if (value?.asset) {
    try {
      const source = fit === 'crop' ? value : value.asset
      let image = builder.image(source).auto('format').quality(quality)
      const hasCropBox = fit === 'crop' && width && height
      if (hasCropBox) {
        if (ratio) {
          const [rw, rh] = ratio.split('/').map(Number)
          if (rw && rh) image = image.width(width).height(Math.round((width * rh) / rw)).fit('crop')
          else image = image.width(width).height(height).fit('crop')
        } else {
          image = image.width(width).height(height).fit('crop')
        }
      } else {
        if (width) image = image.width(width)
        image = image.fit(width ? 'min' : fit)
      }
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
  quality = 75,
  fit = 'crop',
  ratio,
}) {
  const imageValue = value ?? src
  const resolvedSrc = imageValue == null
    ? fallbackSrc
    : resolveSource(imageValue, width, height, fit, quality, ratio)

  if (!resolvedSrc) return null

  const resolvedAlt =
    alt ??
    (typeof imageValue === 'object' ? imageValue?.alt : '') ??
    ''

  const blurDataURL =
    typeof imageValue === 'object'
      ? imageValue?.asset?.metadata?.lqip
      : null
  const resolvedStyle = fit === 'crop'
    ? style
    : {
        ...style,
        objectFit: style?.objectFit ?? (fill ? 'cover' : 'contain'),
        objectPosition: style?.objectPosition ?? 'center',
        transform: style?.transform ?? 'none',
      }

  return (
    <Image
      src={resolvedSrc}
      alt={resolvedAlt}
      {...(fill ? {fill: true} : {width, height})}
      sizes={sizes}
      className={className}
      style={resolvedStyle}
      priority={priority}
      quality={quality}
      unoptimized={resolvedSrc.startsWith('https://cdn.sanity.io/')}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL || undefined}
    />
  )
}
