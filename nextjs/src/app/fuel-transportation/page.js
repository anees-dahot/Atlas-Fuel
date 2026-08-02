import { getFuelTransportationPage, getSiteSettings } from '@/lib/sanity'
import { hasContent, mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import { loadPageMetadata } from '@/lib/metadata'
import FuelTransportationClient from './FuelTransportationClient'

const fallbackSiteSettings = {
  ctaBannerHeading: 'Ready to Optimize Your Fuel Logistics?',
  ctaBannerText: 'Contact us today for a free transportation quote and let our team build a logistics solution tailored to your operational needs.',
  ctaBannerButtonText: 'Get a Free Quote',
  ctaBannerButtonLink: '/contact',
}

const fallbackData = {
  heroSubtitle: 'Fuel Transportation',
  heroSubtitleColor: 'var(--cms-primary)',
  heroSubtitleSize: '14px',
  heroSubtitleBorderEnabled: false,
  heroSubtitleBorderColor: 'var(--cms-text)',
  heroSubtitleBorderWidth: '1px',
  heroSubtitleShadowColor: '',
  heroTitle: 'Reliable Logistics Australia',
  heroTitleColor: 'var(--cms-background)',
  heroTitleSize: '72px',
  heroTitleBorderEnabled: false,
  heroTitleBorderColor: 'var(--cms-background)',
  heroTitleBorderWidth: '1px',
  heroTitleShadowColor: '',
  heroDescription: 'Atlas Fuel operates a modern, GPS-tracked fleet delivering fuel safely and efficiently to any location across Australia. Our state-of-the-art logistics network ensures on-time delivery every time.',
  heroDescriptionColor: 'var(--cms-background)',
  heroDescriptionSize: '18px',
  heroDescriptionBorderEnabled: false,
  heroDescriptionBorderColor: 'var(--cms-background)',
  heroDescriptionBorderWidth: '1px',
  heroDescriptionShadowColor: '',
  heroImageUrl: '/images/what-we-do-fuel-transportation.webp',
  heroImageAlt: 'Atlas Fuel transportation fleet',
  heroCtaText: 'Get a Quote',
  heroCtaLink: '/contact',
  heroSecondaryCtaText: 'View Our Fleet',
  heroSecondaryCtaLink: '#fleet',
  heroStats: [
    { _key: 'fleet-vehicles', value: '30+', label: 'Fleet Vehicles' },
    { _key: 'on-time-rate', value: '99.5%', label: 'On-Time Rate' },
    { _key: 'operations', value: '24/7', label: 'Operations' },
    { _key: 'litres-delivered', value: '100M+', label: 'Litres Delivered' },
  ],
  fleetSectionLabel: 'Our Fleet',
  fleetHeading: 'Modern Fleet, Reliable Service',
  fleetHeadingColor: 'var(--cms-text)',
  fleetHeadingSize: '48px',
  fleetHeadingBorderEnabled: false,
  fleetHeadingBorderColor: 'var(--cms-text)',
  fleetHeadingBorderWidth: '1px',
  fleetHeadingShadowColor: '',
  fleetDescription: 'Our fleet of certified tankers is equipped with the latest technology for safe, efficient fuel delivery across Australia.',
  fleetDescriptionColor: 'var(--cms-text)',
  fleetDescriptionSize: '18px',
  fleetDescriptionBorderEnabled: false,
  fleetDescriptionBorderColor: 'var(--cms-text)',
  fleetDescriptionBorderWidth: '1px',
  fleetDescriptionShadowColor: '',
  fleetItems: [
    { _key: 'road-tankers', imageUrl: '/images/what-we-do-fuel-transportation.webp', alt: 'Road tankers', title: 'Road Tankers', subtitle: 'Bulk fuel delivery' },
    { _key: 'delivery-trucks', imageUrl: '/images/truck-new.jpg', alt: 'Delivery trucks', title: 'Delivery Trucks', subtitle: 'Local distribution' },
    { _key: 'distribution-centers', imageUrl: '/images/what-we-do-fuel-transportation.webp', alt: 'Distribution centers', title: 'Distribution Centers', subtitle: 'Strategic locations' },
    { _key: 'mining-operations', imageUrl: '/images/what-we-do-mining-civil.webp', alt: 'Mining operations', title: 'Mining Operations', subtitle: 'Remote site delivery' },
    { _key: 'farm-deliveries', imageUrl: '/images/agriculture.webp', alt: 'Farm deliveries', title: 'Farm Deliveries', subtitle: 'Agricultural support' },
    { _key: 'marine-fleet', imageUrl: '/images/marine-fuel.jpg', alt: 'Marine fleet', title: 'Marine Fleet', subtitle: 'Coastal operations' },
  ],
  servicesSectionLabel: 'Our Services',
  servicesHeading: 'Transportation Services',
  servicesHeadingColor: 'var(--cms-text)',
  servicesHeadingSize: '48px',
  servicesHeadingBorderEnabled: false,
  servicesHeadingBorderColor: 'var(--cms-text)',
  servicesHeadingBorderWidth: '1px',
  servicesHeadingShadowColor: '',
  servicesItems: [
    { _key: 'gps-tracked', imageUrl: '/images/what-we-do-fuel-transportation.webp', alt: 'GPS-tracked fleet', title: 'GPS-Tracked Fleet', description: 'Every delivery is tracked in real-time using advanced GPS technology, providing complete visibility of your fuel\'s location and estimated arrival time.' },
    { _key: 'bulk-transport', imageUrl: '/images/what-we-do-mining-civil.webp', alt: 'Bulk fuel transport', title: 'Bulk Transport', description: 'Large-scale bulk fuel transport for industrial and commercial clients. Our road trains deliver massive volumes to mining sites and remote operations.' },
    { _key: 'emergency-delivery', imageUrl: '/images/what-we-do-onsite-diesel.webp', alt: 'Emergency fuel delivery', title: 'Emergency Delivery', description: '24/7 emergency fuel supply when you need it most. Our rapid response team is always ready to deliver fuel in critical situations.' },
    { _key: 'fleet-operations', imageUrl: '/images/what-we-do-fuel-transportation.webp', alt: 'Fleet operations', title: 'Fleet Operations', description: 'State-of-the-art logistics ensuring on-time delivery every time. Our operations center manages every aspect of your fuel supply chain.' },
  ],
  coverageSectionLabel: 'Where We Operate',
  coverageHeading: 'Coverage Areas',
  coverageHeadingColor: 'var(--cms-text)',
  coverageHeadingSize: '48px',
  coverageHeadingBorderEnabled: false,
  coverageHeadingBorderColor: 'var(--cms-text)',
  coverageHeadingBorderWidth: '1px',
  coverageHeadingShadowColor: '',
  coverageDescription: 'From urban centers to remote mine sites, our fleet delivers across Australia\'s most challenging terrains.',
  coverageDescriptionColor: 'var(--cms-text)',
  coverageDescriptionSize: '18px',
  coverageDescriptionBorderEnabled: false,
  coverageDescriptionBorderColor: 'var(--cms-text)',
  coverageDescriptionBorderWidth: '1px',
  coverageDescriptionShadowColor: '',
  coverageAreas: [
    { _key: 'wa', imageUrl: '/images/what-we-do-mining-civil.webp', alt: 'Western Australia fuel delivery', region: 'Western Australia', description: 'Complete coverage across WA including remote mine sites, Pilbara, Goldfields, and Perth metro.', locations: ['Perth Metropolitan', 'Pilbara Region', 'Goldfields-Esperance', 'Kimberley'] },
    { _key: 'nt', imageUrl: '/images/what-we-do-mining-civil.webp', alt: 'Northern Territory fuel delivery', region: 'Northern Territory', description: 'Reliable fuel delivery to NT mining operations, pastoral stations, and remote communities.', locations: ['Darwin Region', 'Katherine', 'Alice Springs', 'Remote Communities'] },
    { _key: 'sa', imageUrl: '/images/what-we-do-onsite-diesel.webp', alt: 'South Australia fuel delivery', region: 'South Australia', description: 'Efficient logistics network across SA serving agricultural, mining, and industrial clients.', locations: ['Adelaide Metro', 'Eyre Peninsula', 'Murray Mallee', 'Outback SA'] },
  ],
  teamSectionLabel: 'Our Team',
  teamHeading: 'Professional Drivers, Exceptional Service',
  teamHeadingColor: 'var(--cms-text)',
  teamHeadingSize: '48px',
  teamHeadingBorderEnabled: false,
  teamHeadingBorderColor: 'var(--cms-text)',
  teamHeadingBorderWidth: '1px',
  teamHeadingShadowColor: '',
  teamDescription: 'Every Atlas Fuel driver is fully licensed, certified, and trained to the highest industry standards. Our team takes pride in delivering fuel safely and on time, every time.',
  teamDescriptionColor: 'var(--cms-text)',
  teamDescriptionSize: '18px',
  teamDescriptionBorderEnabled: false,
  teamDescriptionBorderColor: 'var(--cms-text)',
  teamDescriptionBorderWidth: '1px',
  teamDescriptionShadowColor: '',
  teamStats: [
    { _key: 'certified', value: '100%', label: 'Certified Drivers' },
    { _key: 'experience', value: '15+ Years', label: 'Average Experience' },
    { _key: 'incidents', value: 'Zero', label: 'Safety Incidents' },
    { _key: 'support', value: '24/7', label: 'Support Available' },
  ],
  teamQualifications: [
    'Licensed and certified dangerous goods handlers',
    'Regular safety training and assessments',
    'Drug and alcohol testing compliance',
    'Comprehensive background checks',
  ],
  teamImages: [
    { _key: 'drivers', imageUrl: '/images/truck-new.jpg', alt: 'Driver Team' },
    { _key: 'operations', imageUrl: '/images/local-fuel-distributors.jpg', alt: 'Operations Team' },
    { _key: 'field', imageUrl: '/images/atlas-fuel-hero-1b.webp', alt: 'Field Team' },
    { _key: 'support', imageUrl: '/images/what-we-do-onsite-diesel.webp', alt: 'Support Team' },
  ],
  processSectionLabel: 'Our Process',
  processHeading: 'How We Work',
  processHeadingColor: 'var(--cms-text)',
  processHeadingSize: '48px',
  processHeadingBorderEnabled: false,
  processHeadingBorderColor: 'var(--cms-text)',
  processHeadingBorderWidth: '1px',
  processHeadingShadowColor: '',
  processSteps: [
    { _key: 'order', step: '01', imageUrl: '/images/what-we-do-fuel-transportation.webp', alt: 'Order placement', title: 'Order Placement', description: 'Submit your fuel delivery request with volume requirements, delivery location, and schedule preferences. Our team responds within hours to confirm your order.', reverse: false },
    { _key: 'route', step: '02', imageUrl: '/images/what-we-do-fuel-transportation.webp', alt: 'Route planning', title: 'Route Planning', description: 'Our logistics team plans optimal routes using advanced mapping software, considering terrain, weather, and delivery windows to ensure efficient delivery.', reverse: true },
    { _key: 'delivery', step: '03', imageUrl: '/images/what-we-do-fuel-transportation.webp', alt: 'Real-time delivery', title: 'Real-Time Delivery', description: 'Track your delivery in real-time as our GPS-equipped tanker navigates to your location. Receive updates and accurate ETAs throughout the journey.', reverse: false },
    { _key: 'offloading', step: '04', imageUrl: '/images/truck-new.jpg', alt: 'Safe fuel offloading', title: 'Safe Offloading', description: 'Our certified drivers safely offload fuel using proper equipment and procedures, following strict safety protocols to protect your site and personnel.', reverse: true },
  ],
  safetySectionLabel: 'Safety & Compliance',
  safetyHeading: 'Your Partner in Safety',
  safetyHeadingColor: 'var(--cms-text)',
  safetyHeadingSize: '48px',
  safetyHeadingBorderEnabled: false,
  safetyHeadingBorderColor: 'var(--cms-text)',
  safetyHeadingBorderWidth: '1px',
  safetyHeadingShadowColor: '',
  safetyDescription: 'Atlas Fuel Australia places paramount importance on the safety of our employees and the communities we serve. Our commitment to safety is reflected in rigorous procedures designed to mitigate risks at every stage.',
  safetyDescriptionColor: 'var(--cms-text)',
  safetyDescriptionSize: '18px',
  safetyDescriptionBorderEnabled: false,
  safetyDescriptionBorderColor: 'var(--cms-text)',
  safetyDescriptionBorderWidth: '1px',
  safetyDescriptionShadowColor: '',
  safetyImageUrl: '/images/partner-in-safety.webp',
  safetyImageAlt: 'Safety first',
  safetyStatisticValue: 'Zero',
  safetyStatisticTitle: 'Safety Incidents',
  safetyStatisticText: 'Maintaining the highest safety standards across all operations',
  safetyCertifications: [
    { _key: 'iso-45001', name: 'ISO 45001', label: 'Occupational Health & Safety' },
    { _key: 'iso-9001', name: 'ISO 9001', label: 'Quality Management' },
    { _key: 'iso-14001', name: 'ISO 14001', label: 'Environmental Management' },
    { _key: 'nhvas', name: 'NHVAS', label: 'Heavy Vehicle Accreditation' },
  ],
  fleetGallerySectionLabel: 'Fleet Compliance',
  fleetGalleryHeading: 'Excellence in Every Detail',
  fleetGalleryHeadingColor: 'var(--cms-text)',
  fleetGalleryHeadingSize: '48px',
  fleetGalleryHeadingBorderEnabled: false,
  fleetGalleryHeadingBorderColor: 'var(--cms-text)',
  fleetGalleryHeadingBorderWidth: '1px',
  fleetGalleryHeadingShadowColor: '',
  fleetGalleryImages: [
    { _key: 'fleet-1', imageUrl: '/images/what-we-do-fuel-transportation.webp', alt: 'Atlas fuel tanker fleet' },
    { _key: 'fleet-2', imageUrl: '/images/what-we-do-fuel-transportation.webp', alt: 'Atlas fuel transport operations' },
    { _key: 'fleet-3', imageUrl: '/images/what-we-do-mining-civil.webp', alt: 'Mining fuel transport' },
    { _key: 'fleet-4', imageUrl: '/images/agriculture.webp', alt: 'Agriculture fuel transport' },
    { _key: 'fleet-5', imageUrl: '/images/marine-fuel.jpg', alt: 'Marine fuel transport' },
    { _key: 'fleet-6', imageUrl: '/images/atlas-fuel-hero-2.webp', alt: 'Atlas fuel fleet vehicle' },
    { _key: 'fleet-7', imageUrl: '/images/hero-truck.jpg', alt: 'Atlas fuel delivery truck' },
    { _key: 'fleet-8', imageUrl: '/images/truck-new.jpg', alt: 'Atlas fuel tanker truck' },
  ],
  excellenceSectionLabel: 'Our Philosophy',
  excellenceTagline: 'Unrivalled. Unmatched. Unstoppable.',
  excellenceTaglineColor: 'var(--cms-text)',
  excellenceTaglineSize: '24px',
  excellenceTaglineBorderEnabled: false,
  excellenceTaglineBorderColor: 'var(--cms-text)',
  excellenceTaglineBorderWidth: '1px',
  excellenceTaglineShadowColor: '',
  excellenceContent: 'These three words capture the spirit of Atlas Fuel and the people who drive it forward every day. We stand unrivalled in our commitment to quality, unmatched in our ability to deliver reliable fuel solutions nationwide, and unstoppable in our pursuit of growth, innovation, and excellence.',
  excellenceContentColor: 'var(--cms-text)',
  excellenceContentSize: '18px',
  excellenceContentBorderEnabled: false,
  excellenceContentBorderColor: 'var(--cms-text)',
  excellenceContentBorderWidth: '1px',
  excellenceContentShadowColor: '',
  excellenceCtaText: 'Read More',
  excellenceCtaLink: '/about',
}

export function generateMetadata() {
  return loadPageMetadata({
    getPage: getFuelTransportationPage,
    getSiteSettings,
    path: '/fuel-transportation',
    fallbackTitle: 'Fuel Transportation | Atlas Fuel Australia',
    fallbackDescription:
      'Reliable GPS-tracked bulk fuel transportation and logistics across Australia.',
    fallbackImage: {
      imageUrl:
        'https://atlasfuel.com.au/images/what-we-do-fuel-transportation.webp',
      alt: 'Atlas Fuel transportation fleet',
    },
  })
}

export default async function FuelTransportationPage() {
  const [sanity, globalSettings] = await Promise.all([
    getFuelTransportationPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const sections = [
    ['fleetGallery', 'fleetGallerySection'],
    ['excellence', 'excellenceSection'],
    ['services', 'servicesSection'],
    ['coverage', 'coverageSection'],
    ['process', 'processSection'],
    ['safety', 'safetySection'],
    ['fleet', 'fleetSection'],
    ['team', 'teamSection'],
    ['hero', 'heroSection'],
  ]

  const mappedData = Object.fromEntries(
    Object.entries(fallbackData).map(([field, fallback]) => {
      const match = sections.find(([prefix]) => field.startsWith(prefix))
      if (!match) return [field, mergeWithFallback(fallback, sanity?.[field])]

      const [prefix, sectionName] = match
      const suffix = field.slice(prefix.length)
      const sectionField = `${suffix.charAt(0).toLowerCase()}${suffix.slice(1)}`
      const nestedValue = sectionField === 'imageAlt'
        ? sanity?.[sectionName]?.imageUrlAlt ?? sanity?.[sectionName]?.imageAlt
        : sanity?.[sectionName]?.[sectionField]
      const legacyValue = sanity?.[field]

      return [
        field,
        mergeWithFallback(
          fallback,
          hasContent(nestedValue) ? nestedValue : legacyValue
        ),
      ]
    })
  )
  const data = {
    ...mappedData,
    heroImage:
      sanity?.heroSection?.imageImage ??
      sanity?.heroImage ??
      mappedData.heroImageUrl,
    safetyImage:
      sanity?.safetySection?.image ??
      sanity?.safetyImage ??
      mappedData.safetyImageUrl,
  }

  const siteSettings = mapPageCta(sanity, globalSettings, fallbackSiteSettings)

  return (
    <>
      <FuelTransportationClient data={data} siteSettings={siteSettings} />
    </>
  )
}
