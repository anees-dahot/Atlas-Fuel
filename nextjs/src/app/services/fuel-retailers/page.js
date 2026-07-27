import { getFuelRetailersPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import FuelRetailersClient from './FuelRetailersClient'

export default async function FuelRetailersPage() {
  const [sanity, globalSettings] = await Promise.all([
    getFuelRetailersPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const fallbackSiteSettings = {
    ctaBannerHeading: 'Ready to Grow Your Fuel Retail Business?',
    ctaBannerText: 'Partner with Atlas Fuel for reliable supply, flexible branding, and expert support. Contact us today to discuss your retail fuel needs.',
    ctaBannerButtonText: 'Enquire Now',
    ctaBannerButtonLink: '/contact',
  }

  const fallbackRetailerHero = {
    subtitle: 'Fuel Retailers',
    title: 'Servicing Local Retailers across Australia',
    description: 'Atlas Fuel proudly partners with local fuel retailers across the nation, delivering tailored supply solutions, operational support, and brand flexibility that help them thrive in a competitive market. With a deep understanding of regional challenges and a commitment to reliability, we empower independents to stay strong, profitable, and locally focused — no matter where they operate.',
    heroImageUrl: '/images/what-we-do-retail.webp',
  }

  const fallbackFeatures = {
    title: 'Comprehensive Support for Retailers',
    subtitle: 'Four Ways We Protect Your Business',
    features: [
      {
        icon: 'emergency',
        title: 'Fuel Rescue',
        description: 'When supply chains break down, Atlas Fuel steps in with fast, reliable fuel delivery. We mobilise our national network to support local distributors facing unexpected shortages, helping avoid downtime and reputational risk. Our team is built for urgency—getting fuel to you when no one else can.',
      },
      {
        icon: 'bulk',
        title: 'Demand Support',
        description: 'Atlas Fuel empowers local distributors during peak seasons by offering flexible volume options and scalable delivery schedules. Whether it\'s harvest time, mining ramp-ups, or regional events, we ensure you meet every litre of demand without delays or compromise in service quality or supply integrity.',
      },
      {
        icon: 'remote',
        title: 'Supplier Backup',
        description: 'If your existing supplier refuses to meet your needs, Atlas Fuel provides immediate backup support to protect your business. We understand the pressures local distributors face and respond quickly with a tailored solution—ensuring supply continuity and restoring your confidence.',
      },
      {
        icon: 'onsite',
        title: 'Crisis Coverage',
        description: 'In times of disruption—natural disasters, logistic failures, or market volatility—Atlas Fuel offers responsive coverage that keeps your operations stable. We\'re more than a supplier; we\'re your contingency partner, delivering peace of mind and uninterrupted fuel access exactly when your business needs it most.',
      },
    ],
  }

  const fallbackGrowth = {
    heading: 'Growth Solutions',
    title: 'Join forces with a brand that understands independence.',
    description: 'Atlas Fuel offers flexible branding options, co-branded site support, and marketing tools that elevate your station\'s visibility while preserving your identity. From site upgrades to data-driven forecasting and supply planning, we help you scale sustainably. Atlas Fuel works with you to increase volumes, attract more customers, and future-proof your retail business.',
    ctaPrimary: 'Learn More',
    ctaPrimaryLink: '/fuel-prices',
    ctaSecondary: 'Enquire Now',
    ctaSecondaryLink: '/contact',
    imageUrl: '/images/independent-fuel-stations.jpg',
  }

  const fallbackSupport = {
    heading: 'We support Independent Fuel Retailers',
    description: 'Reliable supply when you need it most. Atlas Fuel ensures consistent, on-time fuel deliveries to independent retailers, no matter the location or volume. Our national logistics network and strong supplier relationships guarantee you never run dry, even during peak demand or market disruptions.',
    ctaText: 'Enquire now',
    ctaLink: '/contact',
  }

  const fallbackSafety = {
    heading: 'YOUR PARTNER IN SAFETY',
    content: 'Atlas Fuel Australia places paramount importance on the safety of our employees and the communities we serve, particularly when handling dangerous goods such as petroleum products. Our commitment to safety is reflected in rigorous and comprehensive safe work procedures designed to mitigate risks and ensure the well-being of our workforce. Our teams undergo extensive training, equipping them with the knowledge and skills necessary to handle dangerous goods with precision and care.',
  }

  const fallbackCompliance = {
    heading: 'Atlas Compliance',
    content: 'Atlas Fuel stands proudly certified across ISO, WAHVA, and regulatory standards, proving our unwavering commitment to quality, safety, and responsible operations.',
    certifications: [
      { name: 'ISO 9001', label: 'Quality Management System' },
      { name: 'ISO 14001', label: 'Environmental Management' },
      { name: 'ISO 45001', label: 'Occupational Health & Safety' },
      { name: 'NHVAS', label: 'National Heavy Vehicle Accreditation' },
      { name: '$50M Insurance', label: 'Full Coverage' },
      { name: 'Chain of Responsibility', label: 'CoR Compliant' },
      { name: 'Asset Maintenance', label: 'Registered & Audited' },
      { name: 'Industry Training', label: 'Certified Personnel' },
    ],
  }

  const fallbackFleet = {
    heading: 'Fleet Compliance',
    content: 'Our fleet operates with the highest standards of safety and compliance, ensuring your fuel deliveries are handled by certified professionals using state-of-the-art equipment.',
  }

  const fallbackDrivers = {
    heading: 'Drivers Compliance',
    content: 'Every Atlas Fuel driver meets the highest industry standards. Our rigorous training and certification programs ensure your fuel is transported by qualified professionals who prioritize safety above all else.',
  }

  const fallbackEnquire = {
    heading: 'Enquire now for your fueling Needs',
    primaryCta: { text: 'Enquire Now', link: '/contact' },
    secondaryCta: { text: 'Learn More', link: '/fuel-prices' },
  }

  // Merge Sanity data with fallbacks - include all styling fields
  const retailerHero = mergeWithFallback(fallbackRetailerHero, sanity?.retailerHeroSection)
  const support = mergeWithFallback(fallbackSupport, sanity?.supportSection)
  const features = mergeWithFallback(fallbackFeatures, sanity?.featuresSection)
  const growth = mergeWithFallback(fallbackGrowth, sanity?.growthSection)
  const safety = mergeWithFallback(fallbackSafety, sanity?.safetySection)
  const compliance = mergeWithFallback(fallbackCompliance, sanity?.complianceSection)
  const fleet = mergeWithFallback(fallbackFleet, sanity?.fleetComplianceSection)
  const drivers = mergeWithFallback(fallbackDrivers, sanity?.driversComplianceSection)

  const enquire = {
    ...mergeWithFallback(fallbackEnquire, sanity?.enquireSection),
    primaryCta: { text: sanity?.enquireSection?.primaryCTAText || fallbackEnquire.primaryCta.text, link: sanity?.enquireSection?.primaryCTALink || fallbackEnquire.primaryCta.link },
    secondaryCta: { text: sanity?.enquireSection?.secondaryCTAText || fallbackEnquire.secondaryCta.text, link: sanity?.enquireSection?.secondaryCTALink || fallbackEnquire.secondaryCta.link },
  }
  const siteSettings = mapPageCta(sanity, globalSettings, fallbackSiteSettings)

  return (
    <>
      <FuelRetailersClient
        retailerHero={retailerHero}
        support={support}
        features={features}
        growth={growth}
        safety={safety}
        compliance={compliance}
        fleet={fleet}
        drivers={drivers}
        enquire={enquire}
        siteSettings={siteSettings}
      />
    </>
  )
}
