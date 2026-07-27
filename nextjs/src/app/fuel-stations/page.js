import { getFuelStationsPage, getSiteSettings } from '@/lib/sanity'
import { mapPageCta } from '@/lib/contentFallbacks'
import FuelStationsClient from './FuelStationsClient'

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
    subtitleColor: '#000000',
    subtitleSize: '14px',
    subtitleBorderEnabled: false,
    subtitleBorderColor: '#000000',
    subtitleBorderWidth: '1px',
    subtitleShadowColor: '',
    title: 'Quality Fuel for Every Journey',
    titleColor: '#000000',
    titleSize: '72px',
    titleBorderEnabled: false,
    titleBorderColor: '#000000',
    titleBorderWidth: '1px',
    titleShadowColor: '',
    description: 'Our service stations cater to thousands of satisfied customers daily, offering a range of high-quality petroleum products, oils, lubricants, and automotive goods. In addition, our convenience stores stock confectionery, beverages, and groceries for both home and on-the-go needs.',
    descriptionColor: '#000000',
    descriptionSize: '18px',
    descriptionBorderEnabled: false,
    descriptionBorderColor: '#000000',
    descriptionBorderWidth: '1px',
    descriptionShadowColor: '',
    heroImageUrl: '/images/what-we-do-retail.webp',
    ctaText: 'Find a Station',
    ctaLink: '/store-locator',
  }

  const fallbackRetailIntro = {
    subtitle: 'Our Retail Outlets',
    subtitleColor: '#000000',
    subtitleSize: '14px',
    subtitleBorderEnabled: false,
    subtitleBorderColor: '#000000',
    subtitleBorderWidth: '1px',
    subtitleShadowColor: '',
    title: 'Serving Australian Motorists',
    titleColor: '#000000',
    titleSize: '56px',
    titleBorderEnabled: false,
    titleBorderColor: '#000000',
    titleBorderWidth: '1px',
    titleShadowColor: '',
    description: 'Our service stations cater to thousands of satisfied customers daily, offering a range of high-quality petroleum products, oils, lubricants, and automotive goods. In addition, our convenience stores stock confectionery, beverages, and groceries for both home and on-the-go needs.',
    descriptionColor: '#000000',
    descriptionSize: '18px',
    descriptionBorderEnabled: false,
    descriptionBorderColor: '#000000',
    descriptionBorderWidth: '1px',
    descriptionShadowColor: '',
    secondParagraph: "With a widespread network, it's highly likely that if you're a motorist, you've already benefited from our facilities.",
    ctaText: 'Enquire now',
    ctaLink: '/store-locator',
    imageUrl: '/images/what-we-do-retail.webp',
    statValue: '24/7',
    statLabel: 'Service',
  }

  const fallbackPremiumIntro = {
    tagline: 'Premium Quality',
    taglineColor: '#000000',
    taglineSize: '24px',
    taglineBorderEnabled: false,
    taglineBorderColor: '#000000',
    taglineBorderWidth: '1px',
    taglineShadowColor: '',
    content: 'Atlas Fuel Australia takes pride in offering a range of premium fuel products designed to meet the diverse needs of Australian drivers. Whether you\'re running a family car, a high-performance vehicle, or a commercial fleet, our fuels are formulated to ensure optimal performance, efficiency, and engine care. Coupled with state-of-the-art retail facilities, we provide an unparalleled refueling experience for our customers.',
    contentColor: '#000000',
    contentSize: '18px',
    contentBorderEnabled: false,
    contentBorderColor: '#000000',
    contentBorderWidth: '1px',
    contentShadowColor: '',
    ctaText: 'Enquire Now',
    ctaLink: '/contact',
  }

  const fallbackIndependentDealers = {
    heading: 'Independent Dealers',
    headingColor: '#000000',
    headingSize: '48px',
    headingBorderEnabled: false,
    headingBorderColor: '#000000',
    headingBorderWidth: '1px',
    headingShadowColor: '',
    description: 'Partner with Atlas Fuel and become part of our growing network of independent fuel retailers. We provide the support, products, and expertise you need to succeed in the competitive fuel retail market. Join our network and benefit from our established brand, quality fuel products, and comprehensive support systems.',
    descriptionColor: '#000000',
    descriptionSize: '18px',
    descriptionBorderEnabled: false,
    descriptionBorderColor: '#000000',
    descriptionBorderWidth: '1px',
    descriptionShadowColor: '',
    ctaText: 'Learn More',
    ctaLink: '/contact',
    imageUrl: '/images/independent-fuel-stations.jpg',
  }

  const fallbackImageGallery = {
    heading: 'Our Stations',
    headingColor: '#000000',
    headingSize: '48px',
    headingBorderEnabled: false,
    headingBorderColor: '#000000',
    headingBorderWidth: '1px',
    headingShadowColor: '',
    images: [
      '/images/fuel-stations.jpg',
      '/images/what-we-do-retail.webp',
      '/images/independent-fuel-stations.jpg',
      '/images/what-we-do-retail.webp',
      '/images/local-fuel-distributors.jpg',
      '/images/hero-truck.jpg',
    ],
  }

  const fallbackStationService = {
    heading: 'At Atlas Fuel, customer service is our highest priority.',
    headingColor: '#000000',
    headingSize: '36px',
    headingBorderEnabled: false,
    headingBorderColor: '#000000',
    headingBorderWidth: '1px',
    headingShadowColor: '',
    content: 'We are dedicated to delivering exceptional experiences by ensuring every customer interaction is marked by professionalism, responsiveness, and personalized care. Our team understands the importance of reliable fuel delivery and support, striving to meet and exceed customer expectations at every turn. From timely service to transparent communication, we are committed to building lasting relationships based on trust and satisfaction. At Atlas Fuel, we don\'t just provide fuel; we power peace of mind by putting our customers first.',
    contentColor: '#000000',
    contentSize: '18px',
    contentBorderEnabled: false,
    contentBorderColor: '#000000',
    contentBorderWidth: '1px',
    contentShadowColor: '',
    question: 'How can we meet the growing demand for fuel needs while protecting our climate & make planet a better place?',
    questionColor: '#000000',
    questionSize: '18px',
    questionBorderEnabled: false,
    questionBorderColor: '#000000',
    questionBorderWidth: '1px',
    questionShadowColor: '',
    imageUrl: '/images/independent-fuel-stations.jpg',
    statValue: '99.5%',
    statLabel: 'Customer Satisfaction',
  }

  const fallbackFuelTypes = {
    heading: 'Our Fuel Products',
    headingColor: '#000000',
    headingSize: '48px',
    headingBorderEnabled: false,
    headingBorderColor: '#000000',
    headingBorderWidth: '1px',
    headingShadowColor: '',
    fuelTypes: [
      {
        octane: '91',
        name: 'Unleaded 91',
        subtitle: 'Standard Performance',
        description: 'A staple fuel option carefully refined to ensure reliable performance and efficient combustion. An excellent choice for vehicles requiring standard octane levels.',
        imageUrl: '/images/fuel-stations.jpg',
      },
      {
        octane: '95',
        name: 'Premium 95',
        subtitle: 'Enhanced Performance',
        description: 'Provides a noticeable boost in efficiency and power. Formulated to prevent engine knocking, ensuring a smoother and more responsive drive.',
        imageUrl: '/images/what-we-do-retail.webp',
      },
      {
        octane: '98',
        name: 'Premium 98',
        subtitle: 'Maximum Performance',
        description: 'The ultimate solution for high-performance engines. Delivers precise and efficient combustion, unlocking the full potential of powerful vehicles.',
        imageUrl: '/images/what-we-do-retail.webp',
      },
    ],
    primaryCtaText: 'Order Bulk',
    primaryCtaLink: '/contact',
    secondaryCtaText: 'Enquire',
    secondaryCtaLink: '/contact',
  }

  const fallbackStats = {
    statValue: '35,224',
    statValueColor: '#000000',
    statValueSize: '64px',
    statValueBorderEnabled: false,
    statValueBorderColor: '#000000',
    statValueBorderWidth: '1px',
    statValueShadowColor: '',
    statLabel: 'Happy Customers Every Day',
    statLabelColor: '#000000',
    statLabelSize: '18px',
    statLabelBorderEnabled: false,
    statLabelBorderColor: '#000000',
    statLabelBorderWidth: '1px',
    statLabelShadowColor: '',
  }

  const fallbackDieselSection = {
    heading: 'Diesel Fuel',
    headingColor: '#000000',
    headingSize: '48px',
    headingBorderEnabled: false,
    headingBorderColor: '#000000',
    headingBorderWidth: '1px',
    headingShadowColor: '',
    description: 'Our high-quality diesel fuel is formulated to deliver optimal performance for diesel engines. Whether you\'re operating commercial vehicles, heavy machinery, or agricultural equipment, Atlas Fuel diesel provides the power and efficiency you need. Our diesel meets all Australian standards and is available at all our retail locations.',
    descriptionColor: '#000000',
    descriptionSize: '18px',
    descriptionBorderEnabled: false,
    descriptionBorderColor: '#000000',
    descriptionBorderWidth: '1px',
    descriptionShadowColor: '',
    ctaText: 'Learn More',
    ctaLink: '/contact',
    imageUrl: '/images/onsite-diesel.jpg',
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
    taglineColor: '#000000',
    taglineSize: '24px',
    taglineBorderEnabled: false,
    taglineBorderColor: '#000000',
    taglineBorderWidth: '1px',
    taglineShadowColor: '',
    content: 'These three words capture the spirit of Atlas Fuel and the people who drive it forward every day. We stand unrivalled in our commitment to quality, unmatched in our ability to deliver reliable fuel solutions nationwide, and unstoppable in our pursuit of growth, innovation, and excellence. From our performance fleet to our world-class service stations, every step we take reflects a relentless drive to set new standards in the fuel industry.',
    contentColor: '#000000',
    contentSize: '18px',
    contentBorderEnabled: false,
    contentBorderColor: '#000000',
    contentBorderWidth: '1px',
    contentShadowColor: '',
    ctaText: 'Read More',
    ctaLink: '/about',
  }

  const hasValue = (value) =>
    value !== undefined &&
    value !== null &&
    value !== '' &&
    (!Array.isArray(value) || value.length > 0)

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

  const hero = mapPrefixedFields(fallbackHero, 'heroSection', 'hero', {
    heroImageUrl: { section: 'imageUrl', legacy: 'heroImageUrl' },
  })
  const retailIntro = mapPrefixedFields(
    fallbackRetailIntro,
    'retailIntroSection',
    'retailIntro',
    {
      imageUrl: { section: 'imageUrl', legacy: 'retailIntroImageUrl' },
    }
  )
  const premiumIntro = mapPrefixedFields(
    fallbackPremiumIntro,
    'premiumProductsSection',
    'premium'
  )
  const independentDealers = mapPrefixedFields(
    fallbackIndependentDealers,
    'independentDealersSection',
    'independent',
    { imageUrl: { section: 'imageUrl', legacy: 'independentImageUrl' } }
  )
  const imageGallery = mapPrefixedFields(
    fallbackImageGallery,
    'gallerySection',
    'gallery'
  )
  const stationService = mapPrefixedFields(
    fallbackStationService,
    'customerServiceSection',
    'service',
    {
      imageUrl: { section: 'imageUrl', legacy: 'serviceImageUrl' },
    }
  )
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
  const dieselSection = mapPrefixedFields(
    fallbackDieselSection,
    'dieselSection',
    'diesel',
    {
      imageUrl: { section: 'imageUrl', legacy: 'dieselImageUrl' },
    }
  )
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
