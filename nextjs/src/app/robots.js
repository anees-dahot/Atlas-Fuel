import {getSiteSettings} from '@/lib/sanity'

export default async function robots() {
  const settings = await getSiteSettings({stega: false}).catch(() => null)
  let origin = 'https://atlasfuel.com.au'

  try {
    origin = new URL(settings?.baseUrl || origin).origin
  } catch {}

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/studio/'],
    },
    sitemap: `${origin}/sitemap.xml`,
  }
}
