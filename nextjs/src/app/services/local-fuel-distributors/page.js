import { getLocalFuelDistributorsPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import LocalFuelDistributorsClient from './LocalFuelDistributorsClient'

export default async function LocalFuelDistributorsPage() {
  const [sanity, globalSettings] = await Promise.all([
    getLocalFuelDistributorsPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const fallbackHero = {
    subtitle: 'Local Fuel Distributors',
    title: 'Your Trusted Partner in Fuel Distribution',
    description: 'Atlas Fuel builds smart, strategic partnerships that connect local distributors with the strength of a national supply chain. By tapping into our established relationships with Australia\'s leading fuel providers, we offer streamlined access, stable pricing, and reliable product availability.',
    heroImageUrl: '/images/local-fuel-distributors.jpg',
  }

  const fallbackIntro = {
    heading: 'Atlas - As your reliable partner',
    content: `we proudly support independent local fuel distributors across the country by leveraging our strong, established relationships with all major national & international fuel suppliers. Our extensive network allows us to ensure reliable, timely, and cost-effective fuel supply to regional partners—empowering them to compete, grow, and serve their communities with confidence. No matter where you operate, Atlas Fuel stands ready to deliver the resources and support you need to thrive.`,
    ctaText: 'Enquire now',
    ctaLink: '/contact',
  }

  const fallbackService = {
    heading: 'Servicing Local distributors across Australia',
    content: `Atlas Fuel is reshaping how local distributors access and deliver fuel by combining national reach with local focus. Through a smart supply network and strong industry alliances, we empower independent distributors with seamless logistics, real-time support, and scalable fuel solutions. From coast to outback, we're not just delivering fuel — we're building the backbone of Australia's local energy economy.`,
  }

  const fallbackFeatures = {
    features: [
    {
      icon: 'rescue',
      title: 'Fuel Rescue',
      description: 'When supply chains break down, Atlas Fuel steps in with fast, reliable fuel delivery. We mobilise our national network to support local distributors facing unexpected shortages, helping avoid downtime and reputational risk. Our team is built for urgency—getting fuel to you when no one else can.',
      ctaText: 'Enquire Now',
      ctaLink: '/contact',
    },
    {
      icon: 'support',
      title: 'Demand Support',
      description: 'Atlas Fuel empowers local distributors during peak seasons by offering flexible volume options and scalable delivery schedules. Whether it\'s harvest time, mining ramp-ups, or regional events, we ensure you meet every litre of demand without delays or compromise in service quality or supply integrity.',
      ctaText: 'Enquire Now',
      ctaLink: '/contact',
    },
    {
      icon: 'backup',
      title: 'Supplier Backup',
      description: 'If your existing supplier refuses to meet your needs, Atlas Fuel provides immediate backup support to protect your business. We understand the pressures local distributors face and respond quickly with a tailored solution—ensuring supply continuity and restoring your confidence',
      ctaText: 'Enquire Now',
      ctaLink: '/contact',
    },
    {
      icon: 'crisis',
      title: 'Crisis Coverage',
      description: 'In times of disruption—natural disasters, logistic failures, or market volatility—Atlas Fuel offers responsive coverage that keeps your operations stable. We\'re more than a supplier; we\'re your contingency partner, delivering peace of mind and uninterrupted fuel access exactly when your business needs it most.',
      ctaText: 'Enquire Now',
      ctaLink: '/contact',
    },
  ],
  }

  const fallbackPartnership = {
    content: `Atlas Fuel builds smart, strategic partnerships that connect local distributors with the strength of a national supply chain. By tapping into our established relationships with Australia's leading fuel providers, we offer streamlined access, stable pricing, and reliable product availability—enabling our partners to operate with confidence and consistency, no matter the market conditions.`,
    tagline: 'ATLAS FUEL IS YOUR MOST RELIABLE PARTNER',
  }

  const fallbackBusyTimes = {
    heading: 'In Busy & Hard times',
    content: `When local distributors are unable to meet rising demand or are left unsupported by their existing suppliers, Atlas Fuel steps in with immediate, practical solutions. Leveraging our national network and real-time logistics, we offer rapid-response fuel supply, short-term bridging agreements, and flexible delivery schedules to keep your operations running. Whether it's unexpected growth, peak seasonal demand, or supply chain disruptions, we provide the backup you need—fast, reliable, and without red tape. At Atlas, we don't just supply fuel—we protect your ability to serve your customers when it matters most.`,
    primaryCta: { text: 'Learn More', link: '/fuel-prices' },
    secondaryCta: { text: 'Enquire Now', link: '/contact' },
  }

  const fallbackSiteSettings = {
    ctaBannerHeading: 'Ready to Partner with Atlas Fuel?',
    ctaBannerText: 'Contact us today to discuss how we can support your fuel distribution business with reliable supply and flexible solutions.',
    ctaBannerButtonText: 'Enquire Now',
    ctaBannerButtonLink: '/contact',
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

  const fallbackProcess = {
    heading: 'How We Work',
    subheading: 'A streamlined process for local fuel distribution.',
    steps: [
      {step: '01', title: 'Tell Us Your Demand', description: 'Share your locations, volumes and delivery requirements with our supply team.', imageUrl: '/images/local-fuel-distributors.jpg'},
      {step: '02', title: 'We Secure Supply', description: 'We coordinate product, pricing and logistics through our national supplier network.', imageUrl: '/images/hero-trucks.jpg'},
      {step: '03', title: 'Reliable Delivery', description: 'Fuel is dispatched safely and delivered to your operation on the agreed schedule.', imageUrl: '/images/what-we-do-fuel-transportation.webp'},
      {step: '04', title: 'Ongoing Backup', description: 'Our team remains available for peak demand, shortages and urgent supply support.', imageUrl: '/images/what-we-do-retail.webp'},
    ],
  }

  const hero = mergeWithFallback(fallbackHero, sanity?.heroSection)
  const intro = mergeWithFallback(fallbackIntro, sanity?.introSection || sanity?.distributorSection)
  const service = mergeWithFallback(fallbackService, sanity?.serviceSection || sanity?.distributorSection)
  const features = mergeWithFallback(fallbackFeatures, sanity?.featuresSection)
  const process = mergeWithFallback(fallbackProcess, sanity?.processTimelineSection)
  const partnership = mergeWithFallback(fallbackPartnership, sanity?.partnershipSection)
  const busyTimes = mergeWithFallback(fallbackBusyTimes, sanity?.busyTimesSection)
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
      <LocalFuelDistributorsClient
        hero={hero}
        intro={intro}
        service={service}
        features={features}
        process={process}
        partnership={partnership}
        busyTimes={busyTimes}
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
