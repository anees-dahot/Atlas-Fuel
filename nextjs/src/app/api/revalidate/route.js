import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

const routeByType = {
  homePage: '/',
  aboutPage: '/about',
  servicesPage: '/services',
  miningFuelPage: '/services/mining-fuel',
  marineFuelPage: '/services/marine-fuel',
  agricultureFuelPage: '/services/agriculture-fuel',
  fuelRetailersPage: '/services/fuel-retailers',
  onsiteBulkDieselPage: '/services/onsite-bulk-diesel',
  localFuelDistributorsPage: '/services/local-fuel-distributors',
  fuelStationsPage: '/fuel-stations',
  fuelTransportationPage: '/fuel-transportation',
  careersPage: '/careers',
  communityPage: '/community',
  contactPage: '/contact',
  commercialDieselPage: '/commercial-diesel',
  fuelStationEnquiryPage: '/fuel-station-enquiry',
  productsPage: '/products',
  storeLocatorPage: '/store-locator',
  franchisingPage: '/franchising',
  fuelPricesPage: '/fuel-prices',
  atlasCarRacingPage: '/atlas-car-racing',
  newsListingPage: '/news',
}

const globalTypes = new Set([
  'siteSettings',
  'themeSettings',
  'megaMenu',
  'footerNavigation',
  'errorPages',
])

const productTypes = new Set([
  'fuelProduct',
  'additionalProduct',
  'unleaded91',
  'premium95',
  'premium98',
  'diesel',
])

export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json(
      {message: 'Revalidation webhook is not configured.'},
      {status: 503}
    )
  }

  try {
    const { isValidSignature, body } = await parseBody(
      request,
      secret,
      true
    )

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }

    if (!body?._type) {
      return NextResponse.json({ message: 'Missing document type' }, { status: 400 })
    }

    revalidateTag(body._type)

    if (globalTypes.has(body._type)) {
      revalidatePath('/', 'layout')
      if (body._type === 'errorPages') {
        revalidatePath('/_not-found')
        revalidatePath('/route-that-does-not-exist-cms-roundtrip')
      }
      revalidatePath('/sitemap.xml')
      revalidatePath('/robots.txt')
      return NextResponse.json({revalidated: ['all routes', '/sitemap.xml', '/robots.txt']})
    }

    if (body._type === 'newsPost') {
      const paths = ['/', '/news']
      const slug = body.slug?.current || body.slug
      const previousSlug = body.previousSlug?.current || body.previousSlug
      if (slug) paths.push(`/news/${slug}`)
      if (previousSlug && previousSlug !== slug) paths.push(`/news/${previousSlug}`)
      paths.forEach((path) => revalidatePath(path))
      return NextResponse.json({revalidated: [...new Set(paths)]})
    }

    if (productTypes.has(body._type)) {
      revalidateTag('legacyFuelProduct')
      revalidatePath('/products')
      return NextResponse.json({ revalidated: ['/products'] })
    }

    const path = routeByType[body._type]
    if (!path) {
      return NextResponse.json(
        { message: `No route configured for ${body._type}` },
        { status: 202 }
      )
    }

    revalidatePath(path)
    return NextResponse.json({ revalidated: [path] })
  } catch (error) {
    console.error('[Sanity webhook] Revalidation failed:', error)
    return NextResponse.json(
      {message: 'Error revalidating'},
      { status: 500 }
    )
  }
}
