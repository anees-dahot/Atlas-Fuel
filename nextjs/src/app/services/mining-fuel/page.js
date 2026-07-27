import { getMiningFuelPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import MiningFuelClient from './MiningFuelClient'

export default async function MiningFuelPage() {
  const [sanity, globalSettings] = await Promise.all([
    getMiningFuelPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const fallbackHero = {
    subtitle: 'Mining Sector',
    title: 'Atlas Fuel Delivers Where It Matters',
    description: 'At Atlas Fuel Australia, we understand the critical demands of mining operations. We supply premium fuels and energy solutions to some of the largest mining projects across Australia, ensuring seamless operations even in the most remote and challenging environments. With a proven track record of reliability, we deliver more than just fuel — we deliver confidence and continuity to power Australia\'s mining success.',
    heroImageUrl: '/images/what-we-do-mining-civil.webp',
  }

  const fallbackFeatures = {
    title: 'One Stop Shop for Miners',
    subtitle: 'Nationwide Fuel Solutions for Australia\'s Mining Industry',
    features: [
      {
        icon: 'remote',
        title: 'Remote Deliveries',
        description: 'Atlas specializes in delivering fuel to the most isolated mining sites in Australia, ensuring operations stay powered no matter the distance. Our advanced logistics network guarantees timely and reliable supply even in the harshest terrains.',
      },
      {
        icon: 'bulk',
        title: 'Bulk Fueling with Road Trains',
        description: 'We provide high-volume bulk fueling solutions tailored to meet the heavy demands of mining operations. With precision scheduling and dependable service, Atlas Fuel keeps your fleets and machinery running at full capacity.',
      },
      {
        icon: 'onsite',
        title: 'On-Site Refueling',
        description: 'Our on-site refueling services maximize operational uptime by eliminating the need for equipment downtime and off-site fueling trips. Atlas Fuel brings the energy directly to your machines, boosting productivity and reducing delays.',
      },
      {
        icon: 'emergency',
        title: 'Emergency Support',
        description: 'When emergencies strike, Atlas Fuel responds with rapid, reliable, and efficient fuel delivery to keep your mining operations secure, productive, and operational. Our 24/7 expert support teams are ready to mobilize when you need us most.',
      },
    ],
  }

  const fallbackMiningSector = {
    heading: 'Mining Sector',
    content: 'Atlas Fuel is the optimal choice for refueling mining machines due to its unparalleled reliability, efficiency, and safety features. With a steadfast commitment to quality, Atlas Fuel ensures uninterrupted operations by delivering fuel on-site precisely when needed, eliminating costly downtime. Their rigorous adherence to industry standards guarantees the highest level of safety, crucial for the demanding environments of mining operations. Moreover, Atlas Fuel\'s competitive pricing and flexible delivery options provide cost-effective solutions tailored to meet the unique demands of mining projects, making them the preferred partner for fueling efficiency and productivity in the mining sector.',
  }

  const fallbackStats = {
    stats: [
      { value: 50, suffix: 'M+', prefix: '', label: 'Litres Delivered to Mines', icon: 'drop' },
      { value: 99, suffix: '.9%', prefix: '', label: 'On-Time Delivery Rate', icon: 'clock' },
      { value: 24, suffix: '/7', prefix: '', label: 'Emergency Support', icon: 'support' },
      { value: 15, suffix: '+', prefix: '', label: 'Years Mining Experience', icon: 'mine' },
    ],
  }

  const fallbackSafety = {
    heading: 'YOUR PARTNER IN SAFETY',
    content: 'Atlas Fuel Australia places paramount importance on the safety of our employees and the communities we serve, particularly when handling dangerous goods such as petroleum products. Our commitment to safety is reflected in rigorous and comprehensive safe work procedures designed to mitigate risks and ensure the well-being of our workforce. Our teams undergo extensive training, equipping them with the knowledge and skills necessary to handle dangerous goods with precision and care. We adhere strictly to industry regulations and best practices, implementing robust safety protocols at every stage of the petroleum product supply chain. By prioritizing safety in the handling of dangerous goods, Atlas Fuel Australia strives to set a benchmark for responsible and secure operations in the energy sector.',
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

  const fallbackProcess = {
    heading: 'How We Work',
    subheading: 'A simple, reliable process built around your mining needs.',
    steps: [
      { step: '01', title: 'Initial Consultation', description: 'We assess your mining operation\'s fuel requirements, delivery schedules, and site-specific needs to create a customized fuel solution.', imageUrl: '/images/what-we-do-fuel-transportation.webp' },
      { step: '02', title: 'Site Assessment & Planning', description: 'Our team conducts a thorough site assessment to ensure safe delivery access and designs an optimal fuel management plan.', imageUrl: '/images/what-we-do-mining-civil.webp' },
      { step: '03', title: 'Scheduled Deliveries', description: 'We establish a regular delivery schedule with GPS-tracked tankers, ensuring consistent fuel supply to keep your operations running.', imageUrl: '/images/what-we-do-mining-civil.webp' },
      { step: '04', title: '24/7 Support & Monitoring', description: 'Our control room monitors every delivery in real-time. Emergency support is always available to handle any unexpected situations.', imageUrl: '/images/atlas-fuel-hero-2.webp' },
    ],
  }

  const fallbackSiteSettings = {
    ctaBannerHeading: 'Ready to Power Your Mining Operation?',
    ctaBannerText: 'Contact us today for a free fuel quote and let our team build a solution tailored to your mining needs.',
    ctaBannerButtonText: 'Enquire Now',
    ctaBannerButtonLink: '/contact',
  }

  const fallbackEnquire = {
    heading: 'Enquire now for your fueling Needs',
    primaryCta: { text: 'Enquire Now', link: '/contact' },
    secondaryCta: { text: 'Learn More', link: '/fuel-prices' },
  }

  // Merge Sanity data with fallbacks - include all styling fields
  const hero = mergeWithFallback(fallbackHero, sanity?.heroSection)
  const features = mergeWithFallback(fallbackFeatures, sanity?.featuresSection)
  const miningSector = mergeWithFallback(fallbackMiningSector, sanity?.miningSectorSection)
  const stats = mergeWithFallback(fallbackStats, sanity?.statsSection)
  const safety = mergeWithFallback(fallbackSafety, sanity?.safetySection)
  const compliance = mergeWithFallback(fallbackCompliance, sanity?.complianceSection)
  const process = mergeWithFallback(fallbackProcess, sanity?.processTimelineSection)
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
      <MiningFuelClient
        hero={hero}
        features={features}
        miningSector={miningSector}
        stats={stats}
        safety={safety}
        compliance={compliance}
        process={process}
        fleet={fleet}
        drivers={drivers}
        enquire={enquire}
        siteSettings={siteSettings}
      />
    </>
  )
}
