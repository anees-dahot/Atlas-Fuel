import { getAgricultureFuelPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import AgricultureFuelClient from './AgricultureFuelClient'

export default async function AgricultureFuelPage() {
  const [sanity, globalSettings] = await Promise.all([
    getAgricultureFuelPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const fallbackHero = {
    subtitle: 'Agriculture Sector',
    title: 'Fueling Your Fields for Peak Performance',
    description: 'At Atlas Fuel, we know that the heartbeat of your farm relies on dependable energy. Our high-quality fuel ensures your tractors, combines, and heavy machinery operate at maximum efficiency, minimizing downtime during crucial planting and harvest seasons.',
    heroImageUrl: '/images/agriculture.webp',
  }

  const fallbackAgricultureSection = {
    heading: 'Agriculture',
    content: 'Atlas Fuel Australia prides itself on delivering the best prices to its agriculture customers. With a commitment to supporting Australia\'s farming communities, Atlas Fuel ensures competitive rates that help farmers manage their operational costs effectively. Whether it\'s supplying diesel for machinery or other fuel needs essential to agriculture, Atlas Fuel Australia combines reliability with cost-efficiency, ensuring that farmers can focus on their crops and livestock without financial strain. Their dedication to customer satisfaction and understanding of agricultural needs makes them a trusted partner in the industry, fostering long-term relationships built on reliability and competitive pricing.',
  }

  const fallbackFeatures = {
    title: 'Comprehensive Agriculture Solutions',
    subtitle: 'Nationwide Fuel Solutions for Australian Agriculture',
    features: [
      {
        icon: 'remote',
        title: 'On-Demand Delivery',
        description: 'We bring fuel directly to your fields, so you never have to waste valuable time traveling to refuel. Our prompt, scheduled, and emergency delivery services are designed to keep your operations moving smoothly, no matter the workload. From remote rural locations to multi-site farms, Atlas guarantees a steady supply, exactly when and where you need it.',
      },
      {
        icon: 'bulk',
        title: 'Safe Storage Solutions',
        description: 'We provide reliable on-site tanks and monitoring systems that keep your fuel secure and compliant with safety regulations. Atlas Fuel supports you with professional installation and ongoing maintenance to prevent leaks or contamination. Rest easy knowing your valuable energy supply is well protected and always ready for use.',
      },
      {
        icon: 'onsite',
        title: 'Clean Energy Options',
        description: 'Choose from a selection of low-emission fuels designed to help your farm operate efficiently while caring for the environment. Our clean-burning products reduce harmful exhaust, contributing to healthier crops and communities. Partner with Atlas to advance your sustainability goals without sacrificing powerful performance.',
      },
      {
        icon: 'emergency',
        title: 'Expert Support',
        description: 'Our knowledgeable advisors are available around the clock to answer questions and troubleshoot challenges, big or small. Atlas Fuel offers guidance on maximizing efficiency, optimizing fuel blends, and adapting to evolving agricultural demands. Rely on our experience and commitment to ensure your peace of mind, every season.',
      },
    ],
  }

  const fallbackExcellence = {
    tagline: 'Unrivalled. Unmatched. Unstoppable.',
    content: 'These three words capture the spirit of Atlas Fuel and the people who drive it forward every day. We stand unrivalled in our commitment to quality, unmatched in our ability to deliver reliable fuel solutions nationwide, and unstoppable in our pursuit of growth, innovation, and excellence. From our performance fleet to our world-class service stations, every step we take reflects a relentless drive to set new standards in the fuel industry. For our customers, our partners, and our communities, Atlas Fuel is more than a brand — it is a promise of strength, progress, and a future powered without limits.',
    ctaText: 'Read More',
    ctaLink: '/about',
  }

  const fallbackSafety = {
    heading: 'YOUR PARTNER IN SAFETY',
    content: 'Atlas Fuel Australia places paramount importance on the safety of our employees and the communities we serve, particularly when handling dangerous goods such as petroleum products. Our commitment to safety is reflected in rigorous and comprehensive safe work procedures designed to mitigate risks and ensure the well-being of our workforce. Our teams undergo extensive training, equipping them with the knowledge and skills necessary to handle dangerous goods with precision and care.',
  }

  const fallbackCompliance = {
    heading: 'Atlas Compliance',
    content: 'Atlas Fuel stands proudly certified across ISO, NHVAS, and regulatory standards, proving our unwavering commitment to quality, safety, and responsible operations.',
    certifications: [
      { name: 'ISO 9001', label: 'Quality Management' },
      { name: 'ISO 14001', label: 'Environmental Management' },
      { name: 'ISO 45001', label: 'Occupational Health & Safety' },
      { name: 'NHVAS', label: 'National Heavy Vehicle Accreditation' },
      { name: '$50M Insurance', label: 'Full Coverage' },
      { name: 'CoR', label: 'Chain of Responsibility' },
      { name: 'AMSA', label: 'Maritime Safety' },
      { name: 'DG Cert', label: 'Dangerous Goods Certified' },
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

  const fallbackDieselHarvests = {
    heading: 'Diesel That Drives Harvests',
    content: `From tractors to tankers, we keep your farm moving without missing a beat. Our reliable diesel fuels every season, from planting to harvest with power you can count on. No delays, no downtime, just smooth, strong energy delivering results where it matters most.`,
  }

  const fallbackSustainableFueling = {
    heading: 'Sustainable Fueling for a Greener Future',
    content: `At Atlas Fuel, we are committed to supporting sustainable agriculture through eco-friendly fuel options and responsible delivery practices. Our low-emission fuels and efficient supply chains help you reduce your environmental footprint while maintaining high productivity on the farm. Partner with Atlas to not only power your fields today, but also protect the land for generations to come.`,
    ctaText: 'Read More →',
    ctaLink: '/about',
  }

  const fallbackEquipmentGrowth = {
    content: `Your equipment is the engine of your growth—and Atlas Fuel is the energy behind your success. From planting to harvest, our reliable fuel solutions help you scale up production and embrace new opportunities. With Atlas, you can focus on cultivating your future, confident that your energy needs are in expert hands.`,
  }

  const fallbackSiteSettings = {
    ctaBannerHeading: 'Ready to Fuel Your Farm?',
    ctaBannerText: 'Contact us today for a free agriculture fuel quote and let our team build a solution tailored to your farming needs.',
    ctaBannerButtonText: 'Enquire Now',
    ctaBannerButtonLink: '/contact',
  }

  const fallbackProcess = {
    heading: 'How We Work',
    subheading: 'A simple, reliable process built around your agricultural needs',
    steps: [
      { step: '01', title: 'Farm Assessment', description: 'We assess your farm\'s fuel requirements, equipment types, and seasonal demands to create a customized fuel delivery plan.', imageUrl: '/images/agriculture.jpg' },
      { step: '02', title: 'Delivery Scheduling', description: 'Our team coordinates delivery schedules that align with your planting and harvest seasons, ensuring fuel arrives when you need it most.', imageUrl: '/images/agriculture.webp' },
      { step: '03', title: 'On-Site Refueling', description: 'Our certified drivers deliver fuel directly to your farm tanks or equipment, minimizing downtime and keeping your operations running smoothly.', imageUrl: '/images/what-we-do-onsite-diesel.webp' },
      { step: '04', title: 'Ongoing Support', description: 'We provide continuous support and monitoring to ensure your fuel supply remains consistent throughout the season and beyond.', imageUrl: '/images/atlas-fuel-hero-1b.webp' },
    ],
  }

  // Merge Sanity data with fallbacks - include all styling fields
  const hero = mergeWithFallback(fallbackHero, sanity?.heroSection)
  const agricultureSection = mergeWithFallback(fallbackAgricultureSection, sanity?.agricultureSection)
  const features = mergeWithFallback(fallbackFeatures, sanity?.featuresSection)
  const process = mergeWithFallback(fallbackProcess, sanity?.processTimelineSection)
  const excellence = mergeWithFallback(fallbackExcellence, sanity?.excellenceSection)
  const equipmentGrowth = mergeWithFallback(fallbackEquipmentGrowth, sanity?.equipmentGrowthSection)
  const dieselHarvests = mergeWithFallback(fallbackDieselHarvests, sanity?.dieselHarvestsSection)
  const sustainableFueling = mergeWithFallback(fallbackSustainableFueling, sanity?.sustainableFuelingSection)
  const safety = mergeWithFallback(fallbackSafety, sanity?.safetySection)
  const compliance = mergeWithFallback(fallbackCompliance, sanity?.complianceSection)
  const fleet = mergeWithFallback(fallbackFleet, sanity?.fleetComplianceSection)
  const drivers = mergeWithFallback(fallbackDrivers, sanity?.driversComplianceSection)
  const siteSettings = mapPageCta(sanity, globalSettings, fallbackSiteSettings)

  return (
    <>
      <AgricultureFuelClient
        hero={hero}
        agricultureSection={agricultureSection}
        features={features}
        process={process}
        excellence={excellence}
        equipmentGrowth={equipmentGrowth}
        dieselHarvests={dieselHarvests}
        sustainableFueling={sustainableFueling}
        safety={safety}
        compliance={compliance}
        fleet={fleet}
        drivers={drivers}
        siteSettings={siteSettings}
      />
    </>
  )
}
