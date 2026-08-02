const DEFAULT_BASE_URL = 'https://atlasfuel.com.au'

const safeUrl = (value, fallback = DEFAULT_BASE_URL) => {
  try {
    return new URL(value || fallback, fallback)
  } catch {
    return new URL(fallback)
  }
}

const imageUrl = (value) =>
  typeof value === 'string'
    ? value
    : value?.image?.url ||
      value?.image?.asset?.url ||
      value?.imageUrl ||
      value?.url ||
      value?.asset?.url ||
      ''

export function buildPageMetadata({
  page,
  siteSettings,
  path = '/',
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
}) {
  const seo = page?.seo || {}
  const siteName =
    siteSettings?.siteTitle ||
    siteSettings?.siteName ||
    'Atlas Fuel Australia'
  const baseUrl = safeUrl(siteSettings?.baseUrl)
  const title = seo.title ?? fallbackTitle ?? siteName
  const description =
    seo.description ??
    fallbackDescription ??
    siteSettings?.siteDescription ??
    ''
  const canonical = safeUrl(seo.canonicalUrl, new URL(path, baseUrl).toString())
  const socialImage = imageUrl(seo.image) || imageUrl(fallbackImage)
  const socialAlt =
    seo.image?.alt || fallbackImage?.alt || fallbackTitle || siteName
  const noIndex = seo.indexMode === 'noindex'

  return {
    title,
    description,
    alternates: {canonical: canonical.toString()},
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      type: 'website',
      url: canonical.toString(),
      siteName,
      title,
      description,
      ...(socialImage
        ? {images: [{url: socialImage, alt: socialAlt}]}
        : {}),
    },
    twitter: {
      card: socialImage ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(socialImage ? {images: [socialImage]} : {}),
    },
  }
}

export async function loadPageMetadata({
  getPage,
  getSiteSettings,
  path,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
}) {
  const [page, siteSettings] = await Promise.all([
    getPage({stega: false}).catch(() => null),
    getSiteSettings({stega: false}).catch(() => null),
  ])

  return buildPageMetadata({
    page,
    siteSettings,
    path,
    fallbackTitle,
    fallbackDescription,
    fallbackImage,
  })
}
