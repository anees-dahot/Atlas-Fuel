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
  try {
    const { isValidSignature, body } = await parseBody(
      request,
      process.env.SANITY_REVALIDATE_SECRET,
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
      return NextResponse.json({ revalidated: ['all routes'] })
    }

    if (body._type === 'newsPost') {
      const paths = ['/', '/news']
      if (body.slug?.current) paths.push(`/news/${body.slug.current}`)
      paths.forEach((path) => revalidatePath(path))
      return NextResponse.json({ revalidated: paths })
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
    return NextResponse.json(
      { message: 'Error revalidating', error: error.message },
      { status: 500 }
    )
  }
}
