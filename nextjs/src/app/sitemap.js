import {getNewsPosts, getSiteSettings} from '@/lib/sanity'

const routes = [
  '',
  '/about',
  '/atlas-car-racing',
  '/careers',
  '/commercial-diesel',
  '/community',
  '/contact',
  '/franchising',
  '/fuel-prices',
  '/fuel-station-enquiry',
  '/fuel-stations',
  '/fuel-transportation',
  '/news',
  '/products',
  '/services',
  '/services/agriculture-fuel',
  '/services/fuel-retailers',
  '/services/local-fuel-distributors',
  '/services/marine-fuel',
  '/services/mining-fuel',
  '/services/onsite-bulk-diesel',
  '/store-locator',
]

const baseUrl = (value) => {
  try {
    return new URL(value || 'https://atlasfuel.com.au').origin
  } catch {
    return 'https://atlasfuel.com.au'
  }
}

export default async function sitemap() {
  const [settings, posts] = await Promise.all([
    getSiteSettings({stega: false}).catch(() => null),
    getNewsPosts({stega: false}).catch(() => []),
  ])
  const origin = baseUrl(settings?.baseUrl)
  const pages = routes.map((route) => ({
    url: `${origin}${route}`,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
  const articles = posts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${origin}/news/${post.slug}`,
      ...(post.publishedAt ? {lastModified: new Date(post.publishedAt)} : {}),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  return [...pages, ...articles]
}
