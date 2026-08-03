import { getStoreLocatorPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import {loadPageMetadata} from '@/lib/metadata'
import CTABanner from '@/components/shared/CTABanner'
import LocatorHero from '@/components/store-locator/LocatorHero'
import LocationMap from '@/components/store-locator/LocationMap'
import LocationDetail from '@/components/store-locator/LocationDetail'
import ContactSection from '@/components/store-locator/ContactSection'

export function generateMetadata() {
  return loadPageMetadata({
    getPage: getStoreLocatorPage,
    getSiteSettings,
    path: '/store-locator',
    fallbackTitle: 'Store Locator | Atlas Fuel Australia',
    fallbackDescription: 'Find your nearest Atlas Fuel station across Australia. Visit our Kwinana Beach location for reliable fuel solutions.',
  })
}

const fallbackData = {
  heroSubtitle: 'Store Locator',
  heroTitle: 'Find Your Nearest Atlas Fuel Station',
  heroDescription: 'Atlas Fuel Australia delivers reliable, efficient fuel solutions nationwide. We cater to businesses of all sizes, ensuring quality and sustainability. Trust us to fuel your success.',
  heroImageUrl: '/images/store-locator.jpg',
  heroImageAlt: 'Atlas Fuel store location',
  mapSection: {
    eyebrow: 'Find Us',
    heading: 'Our Location',
    description: "Visit our Kwinana Beach location for all your fuel needs. We're conveniently located and ready to serve you.",
    defaultZoom: 15,
    mapAriaLabel: 'Interactive map showing Atlas Fuel store locations',
    markerHintText: 'Select a marker to view store details',
    mapLoadingText: 'Interactive map loading...',
    mapUnavailableText: 'No store coordinates are available yet.',
  },
  locationsSection: {
    eyebrow: 'Station Details',
    servicesEyebrow: 'Services',
    servicesHeading: 'Station Features',
    callButtonText: 'Make a Call',
    directionsHeading: 'Get Directions',
    directionsText: 'Need help finding us? Get turn-by-turn directions to our Kwinana Beach location.',
    directionsButtonText: 'Open in Google Maps',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    hoursLabel: 'Hours',
    dialogEyebrow: 'Atlas Fuel Station',
    closeDialogLabel: 'Close store details',
    locations: [{
      _key: 'kwinana-beach',
      name: 'Kwinana Beach',
      badge: 'Atlas Fuel Station',
      summary: 'Convenient fuel, fleet and commercial services at our Kwinana Beach location.',
      imageUrl: '/images/store-locator.jpg',
      address: '1 Mandurah Road, Kwinana WA 6167',
      latitude: -32.2358956,
      longitude: 115.7805562,
      showOnMap: true,
      phone: '+61-8-6377-7644',
      email: 'info@atlasfuel.com.au',
      hours: 'Mon-Fri: 8am - 7pm',
      mapLink: 'https://maps.google.com/?q=1+Mandurah+Road,+Kwinana+WA+6167',
      features: [
        { label: 'Fuel Types', value: 'Diesel, Premium Diesel, Unleaded' },
        { label: 'Services', value: 'On-site refueling, Bulk delivery' },
        { label: 'Payment', value: 'Card, Cash, Fleet cards' },
        { label: 'Facilities', value: '24/7 Access available' },
      ],
    }],
  },
  contactSection: {
    eyebrow: 'Headquarters',
    heading: 'Contact Us',
    description: 'Reach out to our team for any inquiries about fuel supply, franchising opportunities, or general questions.',
    offices: [
      {title: 'Corporate Office', address: '1 Mandurah Rd, Kwinana Beach WA 6167, Australia', phone: '+61 8 6377 7644', email: 'info@atlasfuel.com.au'},
      {title: 'Australia Office', address: '1 Mandurah Rd, Kwinana Beach WA 6167, Australia', phone: '+61 8 6377 7644', email: 'info@atlasfuel.com.au'},
    ],
  },
}

const fallbackSiteSettings = {
  ctaBannerHeading: 'Need Help Finding a Station?',
  ctaBannerText: 'Our team is here to help you find the nearest Atlas Fuel station or answer any questions about our services.',
  ctaBannerButtonText: 'Contact Us',
  ctaBannerButtonLink: '/contact',
}

export default async function StoreLocatorPage() {
  const [sanity, siteSettings] = await Promise.all([
    getStoreLocatorPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const data = mergeWithFallback(fallbackData, sanity)
  const settings = mapPageCta(sanity, siteSettings, fallbackSiteSettings)

  const heroData = {
    subtitle: data.heroSubtitle,
    title: data.heroTitle,
    description: data.heroDescription,
    heroImage: data.heroImage ?? data.heroImageUrl,
    heroImageAlt: data.heroImageAlt ?? data.heroImageUrlAlt ?? fallbackData.heroImageAlt,
  }

  return (
    <>
      
        <LocatorHero data={heroData} />
        <LocationMap data={data.mapSection} locationsData={data.locationsSection} />
        <LocationDetail data={data.locationsSection} />
        <ContactSection data={data.contactSection} />
        <CTABanner data={settings} />
      
    </>
  )
}
