import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()

    // Verify secret token for security
    const secret = request.headers.get('x-sanity-webhook-secret')
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Get the document type from Sanity webhook
    const documentType = body._type

    console.log('🔄 Revalidating:', documentType, body.slug?.current || body._id)

    // Revalidate based on document type
    switch (documentType) {
      case 'homePage':
        revalidatePath('/')
        break

      case 'aboutPage':
        revalidatePath('/about')
        break

      case 'servicesPage':
        revalidatePath('/services')
        break

      case 'miningFuelPage':
        revalidatePath('/services/mining-fuel')
        break

      case 'marineFuelPage':
        revalidatePath('/services/marine-fuel')
        break

      case 'agricultureFuelPage':
        revalidatePath('/services/agriculture-fuel')
        break

      case 'fuelRetailersPage':
        revalidatePath('/services/fuel-retailers')
        break

      case 'onsiteBulkDieselPage':
        revalidatePath('/services/onsite-bulk-diesel')
        break

      case 'localFuelDistributorsPage':
        revalidatePath('/services/local-fuel-distributors')
        break

      case 'fuelStationsPage':
        revalidatePath('/fuel-stations')
        break

      case 'fuelTransportationPage':
        revalidatePath('/fuel-transportation')
        break

      case 'careersPage':
        revalidatePath('/careers')
        break

      case 'communityPage':
        revalidatePath('/community')
        break

      case 'contactPage':
        revalidatePath('/contact')
        break

      case 'commercialDieselPage':
        revalidatePath('/commercial-diesel')
        break

      case 'franchisingPage':
        revalidatePath('/franchising')
        break

      case 'storeLocatorPage':
        revalidatePath('/store-locator')
        break

      case 'newsListingPage':
        revalidatePath('/news')
        break

      case 'newsPost':
        // Revalidate news listing page
        revalidatePath('/news')
        // Revalidate specific news post if slug exists
        if (body.slug?.current) {
          revalidatePath(`/news/${body.slug.current}`)
        }
        break

      case 'siteSettings':
      case 'megaMenu':
      case 'footerNavigation':
        // Revalidate all pages since these affect header/footer globally
        revalidatePath('/', 'layout')
        break

      default:
        // If unknown type, revalidate homepage just to be safe
        revalidatePath('/')
    }

    return NextResponse.json({
      revalidated: true,
      type: documentType,
      now: Date.now()
    })
  } catch (error) {
    console.error('❌ Revalidation error:', error)
    return NextResponse.json({
      message: 'Error revalidating',
      error: error.message
    }, { status: 500 })
  }
}
