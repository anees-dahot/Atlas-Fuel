import { getFuelStationsPage, getSiteSettings } from '@/lib/sanity'
import { mapPageCta } from '@/lib/contentFallbacks'
import { loadPageMetadata } from '@/lib/metadata'
import FuelStationsClient from './FuelStationsClient'

export function generateMetadata() {
  return loadPageMetadata({
    getPage: getFuelStationsPage,
    getSiteSettings,
    path: '/fuel-stations',
    fallbackTitle: 'Atlas Fuel Stations',
    fallbackDescription:
      'Find premium Atlas Fuel products, independent dealers, and customer-focused retail fuel stations.',
    fallbackImage: {
      imageUrl: 'https://atlasfuel.com.au/images/what-we-do-retail.webp',
      alt: 'Atlas Fuel retail station',
    },
  })
}

export default async function FuelStationsPage() {
  const [sanity, globalSettings] = await Promise.all([
    getFuelStationsPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const fallbackSiteSettings = {
    ctaBannerHeading: 'Ready to Power Your Journey?',
    ctaBannerText: 'Contact us today for a free fuel quote and let our team build a solution tailored to your needs.',
    ctaBannerButtonText: 'Get a Free Quote',
    ctaBannerButtonLink: '/contact',
  }

  const fallbackHero = {
    subtitle: 'Our Retail Outlets',
    subtitleColor: 'var(--cms-text)',
    subtitleSize: '14px',
    subtitleBorderEnabled: false,
    subtitleBorderColor: 'var(--cms-text)',
    subtitleBorderWidth: '1px',
    subtitleShadowColor: '',
    title: 'Quality Fuel for Every Journey',
    titleColor: 'var(--cms-text)',
    titleSize: '72px',
    titleBorderEnabled: false,
    titleBorderColor: 'var(--cms-text)',
    titleBorderWidth: '1px',
    titleShadowColor: '',
    description: 'Our service stations cater to thousands of satisfied customers daily, offering a range of high-quality petroleum products, oils, lubricants, and automotive goods. In addition, our convenience stores stock confectionery, beverages, and groceries for both home and on-the-go needs.',
    descriptionColor: 'var(--cms-text)',
    descriptionSize: '18px',
    descriptionBorderEnabled: false,
    descriptionBorderColor: 'var(--cms-text)',
    descriptionBorderWidth: '1px',
    descriptionShadowColor: '',
    heroImageUrl: '/images/what-we-do-retail.webp',
    heroImageAlt: 'Atlas Fuel retail station',
    ctaText: 'Find a Station',
    ctaLink: '/store-locator',
  }

  const fallbackRetailIntro = {
    subtitle: 'Our Retail Outlets',
    subtitleColor: 'var(--cms-text)',
    subtitleSize: '14px',
    subtitleBorderEnabled: false,
    subtitleBorderColor: 'var(--cms-text)',
    subtitleBorderWidth: '1px',
    subtitleShadowColor: '',
    title: 'Serving Australian Motorists',
    titleColor: 'var(--cms-text)',
    titleSize: '56px',
    titleBorderEnabled: false,
    titleBorderColor: 'var(--cms-text)',
    titleBorderWidth: '1px',
    titleShadowColor: '',
    description: 'Our service stations cater to thousands of satisfied customers daily, offering a range of high-quality petroleum products, oils, lubricants, and automotive goods. In addition, our convenience stores stock confectionery, beverages, and groceries for both home and on-the-go needs.',
    descriptionColor: 'var(--cms-text)',
    descriptionSize: '18px',
    descriptionBorderEnabled: false,
    descriptionBorderColor: 'var(--cms-text)',
    descriptionBorderWidth: '1px',
    descriptionShadowColor: '',
    secondParagraph: "With a widespread network, it's highly likely that if you're a motorist, you've already benefited from our facilities.",
    ctaText: 'Enquire now',
    ctaLink: '/store-locator',
    imageUrl: '/images/what-we-do-retail.webp',
    imageAlt: 'Atlas Fuel retail station',
    statValue: '24/7',
    statLabel: 'Service',
  }

  const fallbackPremiumIntro = {
    tagline: 'Premium Quality',
    taglineColor: 'var(--cms-text)',
    taglineSize: '24px',
    taglineBorderEnabled: false,
    taglineBorderColor: 'var(--cms-text)',
    taglineBorderWidth: '1px',
    taglineShadowColor: '',
    content: 'Atlas Fuel Australia takes pride in offering a range of premium fuel products designed to meet the diverse needs of Australian drivers. Whether you\'re running a family car, a high-performance vehicle, or a commercial fleet, our fuels are formulated to ensure optimal performance, efficiency, and engine care. Coupled with state-of-the-art retail facilities, we provide an unparalleled refueling experience for our customers.',
    contentColor: 'var(--cms-text)',
    contentSize: '18px',
    contentBorderEnabled: false,
    contentBorderColor: 'var(--cms-text)',
    contentBorderWidth: '1px',
    contentShadowColor: '',
    ctaText: 'Enquire Now',
    ctaLink: '/contact',
  }

  const fallbackIndependentDealers = {
    heading: 'Independent Dealers',
    headingColor: 'var(--cms-text)',
    headingSize: '48px',
    headingBorderEnabled: false,
    headingBorderColor: 'var(--cms-text)',
    headingBorderWidth: '1px',
    headingShadowColor: '',
    description: 'Partner with Atlas Fuel and become part of our growing network of independent fuel retailers. We provide the support, products, and expertise you need to succeed in the competitive fuel retail market. Join our network and benefit from our established brand, quality fuel products, and comprehensive support systems.',
    descriptionColor: 'var(--cms-text)',
    descriptionSize: '18px',
    descriptionBorderEnabled: false,
    descriptionBorderColor: 'var(--cms-text)',
    descriptionBorderWidth: '1px',
    descriptionShadowColor: '',
    ctaText: 'Learn More',
    ctaLink: '/contact',
    imageUrl: '/images/independent-fuel-stations.jpg',
    imageAlt: 'Independent Atlas Fuel dealer',
  }

  const fallbackImageGallery = {
    heading: 'Our Stations',
    headingColor: 'var(--cms-text)',
    headingSize: '48px',
    headingBorderEnabled: false,
    headingBorderColor: 'var(--cms-text)',
    headingBorderWidth: '1px',
    headingShadowColor: '',
    images: [
      { imageUrl: '/images/fuel-stations.jpg', alt: 'Atlas Fuel station' },
      { imageUrl: '/images/what-we-do-retail.webp', alt: 'Atlas Fuel retail outlet' },
      { imageUrl: '/images/independent-fuel-stations.jpg', alt: 'Independent Atlas Fuel station' },
      { imageUrl: '/images/what-we-do-retail.webp', alt: 'Atlas Fuel forecourt' },
      { imageUrl: '/images/local-fuel-distributors.jpg', alt: 'Atlas Fuel distributor' },
      { imageUrl: '/images/hero-truck.jpg', alt: 'Atlas Fuel delivery truck' },
    ],
  }

  const fallbackStationService = {
    heading: 'At Atlas Fuel, customer service is our highest priority.',
    headingColor: 'var(--cms-text)',
    headingSize: '36px',
    headingBorderEnabled: false,
    headingBorderColor: 'var(--cms-text)',
    headingBorderWidth: '1px',
    headingShadowColor: '',
    content: 'We are dedicated to delivering exceptional experiences by ensuring every customer interaction is marked by professionalism, responsiveness, and personalized care. Our team understands the importance of reliable fuel delivery and support, striving to meet and exceed customer expectations at every turn. From timely service to transparent communication, we are committed to building lasting relationships based on trust and satisfaction. At Atlas Fuel, we don\'t just provide fuel; we power peace of mind by putting our customers first.',
    contentColor: 'var(--cms-text)',
    contentSize: '18px',
    contentBorderEnabled: false,
    contentBorderColor: 'var(--cms-text)',
    contentBorderWidth: '1px',
    contentShadowColor: '',
    question: 'How can we meet the growing demand for fuel needs while protecting our climate & make planet a better place?',
    questionColor: 'var(--cms-text)',
    questionSize: '18px',
    questionBorderEnabled: false,
    questionBorderColor: 'var(--cms-text)',
    questionBorderWidth: '1px',
    questionShadowColor: '',
    imageUrl: '/images/independent-fuel-stations.jpg',
    imageAlt: 'Atlas Fuel customer service',
    statValue: '99.5%',
    statLabel: 'Customer Satisfaction',
  }

  const fallbackFuelTypes = {
    heading: 'Our Fuel Products',
    headingColor: 'var(--cms-text)',
    headingSize: '48px',
    headingBorderEnabled: false,
    headingBorderColor: 'var(--cms-text)',
    headingBorderWidth: '1px',
    headingShadowColor: '',
    fuelTypes: [
      {
        octane: '91',
        name: 'Unleaded 91',
        subtitle: 'Standard Performance',
        description: 'A staple fuel option carefully refined to ensure reliable performance and efficient combustion. An excellent choice for vehicles requiring standard octane levels.',
        imageUrl: '/images/fuel-stations.jpg',
        imageAlt: 'Unleaded 91 fuel',
      },
      {
        octane: '95',
        name: 'Premium 95',
        subtitle: 'Enhanced Performance',
        description: 'Provides a noticeable boost in efficiency and power. Formulated to prevent engine knocking, ensuring a smoother and more responsive drive.',
        imageUrl: '/images/what-we-do-retail.webp',
        imageAlt: 'Premium 95 fuel',
      },
      {
        octane: '98',
        name: 'Premium 98',
        subtitle: 'Maximum Performance',
        description: 'The ultimate solution for high-performance engines. Delivers precise and efficient combustion, unlocking the full potential of powerful vehicles.',
        imageUrl: '/images/what-we-do-retail.webp',
        imageAlt: 'Premium 98 fuel',
      },
    ],
    primaryCtaText: 'Order Bulk',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'Enquire',
    secondaryCtaLink: '/contact',
  }

  const fallbackStats = {
    statValue: '35,224',
    statValueColor: 'var(--cms-text)',
    statValueSize: '64px',
    statValueBorderEnabled: false,
    statValueBorderColor: 'var(--cms-text)',
    statValueBorderWidth: '1px',
    statValueShadowColor: '',
    statLabel: 'Happy Customers Every Day',
    statLabelColor: 'var(--cms-text)',
    statLabelSize: '18px',
    statLabelBorderEnabled: false,
    statLabelBorderColor: 'var(--cms-text)',
    statLabelBorderWidth: '1px',
    statLabelShadowColor: '',
  }

  const fallbackDieselSection = {
    heading: 'Diesel Fuel',
    headingColor: 'var(--cms-text)',
    headingSize: '48px',
    headingBorderEnabled: false,
    headingBorderColor: 'var(--cms-text)',
    headingBorderWidth: '1px',
    headingShadowColor: '',
    description: 'Our high-quality diesel fuel is formulated to deliver optimal performance for diesel engines. Whether you\'re operating commercial vehicles, heavy machinery, or agricultural equipment, Atlas Fuel diesel provides the power and efficiency you need. Our diesel meets all Australian standards and is available at all our retail locations.',
    descriptionColor: 'var(--cms-text)',
    descriptionSize: '18px',
    descriptionBorderEnabled: false,
    descriptionBorderColor: 'var(--cms-text)',
    descriptionBorderWidth: '1px',
    descriptionShadowColor: '',
    ctaText: 'Learn More',
    ctaLink: '/contact',
    imageUrl: '/images/onsite-diesel.jpg',
    imageAlt: 'Atlas Fuel diesel delivery',
  }

  const fallbackStationFeatures = {
    tagline: 'Why Choose Us',
    heading: 'The Atlas Fuel Difference',
    features: [
      { title: 'Reliability and performance', icon: 'shield' },
      { title: 'Quality Assurance', icon: 'star' },
      { title: 'Competitive Prices', icon: 'dollar' },
    ],
    ctaText: 'NEW BULK FUEL ENQUIRY',
    ctaLink: '/contact',
  }

  const fallbackExcellence = {
    sectionTag: 'Our Philosophy',
    tagline: 'Unrivalled. Unmatched. Unstoppable.',
    taglineColor: 'var(--cms-text)',
    taglineSize: '24px',
    taglineBorderEnabled: false,
    taglineBorderColor: 'var(--cms-text)',
    taglineBorderWidth: '1px',
    taglineShadowColor: '',
    content: 'These three words capture the spirit of Atlas Fuel and the people who drive it forward every day. We stand unrivalled in our commitment to quality, unmatched in our ability to deliver reliable fuel solutions nationwide, and unstoppable in our pursuit of growth, innovation, and excellence. From our performance fleet to our world-class service stations, every step we take reflects a relentless drive to set new standards in the fuel industry.',
    contentColor: 'var(--cms-text)',
    contentSize: '18px',
    contentBorderEnabled: false,
    contentBorderColor: 'var(--cms-text)',
    contentBorderWidth: '1px',
    contentShadowColor: '',
    ctaText: 'Read More',
    ctaLink: '/about',
  }

  const hasValue = (value) =>
    value !== undefined &&
    value !== null

  const mapFields = (fallback, mapping, section = {}) => ({
    ...fallback,
    ...Object.fromEntries(
      Object.entries(mapping).map(([property, sanityField]) => {
        const sectionField =
          typeof sanityField === 'object' ? sanityField.section : property
        const legacyField =
          typeof sanityField === 'object' ? sanityField.legacy : sanityField

        return [
          property,
          hasValue(section?.[sectionField])
            ? section[sectionField]
            : hasValue(sanity?.[legacyField])
              ? sanity[legacyField]
              : fallback[property],
        ]
      })
    ),
  })

  const mapPrefixedFields = (
    fallback,
    sectionName,
    prefix,
    overrides = {}
  ) =>
    mapFields(
      fallback,
      Object.fromEntries(
        Object.keys(fallback).map((property) => [
          property,
          {
            section: overrides[property]?.section || property,
            legacy:
              overrides[property]?.legacy ||
              `${prefix}${property.charAt(0).toUpperCase()}${property.slice(1)}`,
          },
        ])
      ),
      sanity?.[sectionName]
    )

  const heroData = mapPrefixedFields(fallbackHero, 'heroSection', 'hero', {
    heroImageUrl: { section: 'imageUrl', legacy: 'heroImageUrl' },
    heroImageAlt: { section: 'imageAlt', legacy: 'heroAlt' },
  })
  const hero = {
    ...heroData,
    heroImage:
      sanity?.heroSection?.imageImage ??
      sanity?.heroImage ??
      heroData.heroImageUrl,
  }
  const retailIntroData = mapPrefixedFields(
    fallbackRetailIntro,
    'retailIntroSection',
    'retailIntro',
    {
      imageUrl: { section: 'imageUrl', legacy: 'retailIntroImageUrl' },
      imageAlt: { section: 'imageAlt', legacy: 'retailIntroAlt' },
    }
  )
  const retailIntro = {
    ...retailIntroData,
    image:
      sanity?.retailIntroSection?.imageImage ??
      sanity?.retailIntroImage ??
      retailIntroData.imageUrl,
  }
  const premiumIntro = mapPrefixedFields(
    fallbackPremiumIntro,
    'premiumProductsSection',
    'premium'
  )
  const independentDealersData = mapPrefixedFields(
    fallbackIndependentDealers,
    'independentDealersSection',
    'independent',
    {
      imageUrl: { section: 'imageUrl', legacy: 'independentImageUrl' },
      imageAlt: { section: 'imageAlt', legacy: 'independentAlt' },
    }
  )
  const independentDealers = {
    ...independentDealersData,
    image:
      sanity?.independentDealersSection?.imageImage ??
      sanity?.independentImage ??
      independentDealersData.imageUrl,
  }
  const imageGallery = mapPrefixedFields(
    fallbackImageGallery,
    'gallerySection',
    'gallery'
  )
  const stationServiceData = mapPrefixedFields(
    fallbackStationService,
    'customerServiceSection',
    'service',
    {
      imageUrl: { section: 'imageUrl', legacy: 'serviceImageUrl' },
      imageAlt: { section: 'imageAlt', legacy: 'serviceAlt' },
    }
  )
  const stationService = {
    ...stationServiceData,
    image:
      sanity?.customerServiceSection?.imageImage ??
      sanity?.serviceImage ??
      stationServiceData.imageUrl,
  }
  const fuelTypes = mapPrefixedFields(
    fallbackFuelTypes,
    'fuelProductsSection',
    'fuelTypes',
    {
      fuelTypes: { section: 'fuelTypes', legacy: 'fuelTypes' },
    }
  )
  const stats = mapFields(
    fallbackStats,
    Object.fromEntries(
      Object.keys(fallbackStats).map((property) => [
        property,
        {
          section: property.replace(/^stat/, '').replace(/^./, (letter) => letter.toLowerCase()),
          legacy: property.replace(/^stat/, 'stats'),
        },
      ])
    ),
    sanity?.statisticsSection
  )
  const dieselSectionData = mapPrefixedFields(
    fallbackDieselSection,
    'dieselSection',
    'diesel',
    {
      imageUrl: { section: 'imageUrl', legacy: 'dieselImageUrl' },
      imageAlt: { section: 'imageAlt', legacy: 'dieselAlt' },
    }
  )
  const dieselSection = {
    ...dieselSectionData,
    image:
      sanity?.dieselSection?.imageImage ??
      sanity?.dieselImage ??
      dieselSectionData.imageUrl,
  }
  const stationFeatures = mapPrefixedFields(
    fallbackStationFeatures,
    'featuresSection',
    'features',
    { features: { section: 'features', legacy: 'features' } }
  )
  const excellence = mapPrefixedFields(
    fallbackExcellence,
    'excellenceSection',
    'excellence'
  )
  const siteSettings = mapPageCta(sanity, globalSettings, fallbackSiteSettings)

  return (
    <>
      <FuelStationsClient
        hero={hero}
        retailIntro={retailIntro}
        premiumIntro={premiumIntro}
        independentDealers={independentDealers}
        imageGallery={imageGallery}
        stationService={stationService}
        fuelTypes={fuelTypes}
        stats={stats}
        dieselSection={dieselSection}
        stationFeatures={stationFeatures}
        excellence={excellence}
        siteSettings={siteSettings}
      />
    </>
  )
}
