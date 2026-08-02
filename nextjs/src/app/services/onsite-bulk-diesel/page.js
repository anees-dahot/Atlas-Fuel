import { getOnsiteBulkDieselPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import {loadPageMetadata} from '@/lib/metadata'
import OnsiteBulkDieselClient from './OnsiteBulkDieselClient'

export function generateMetadata() {
  return loadPageMetadata({
    getPage: getOnsiteBulkDieselPage,
    getSiteSettings,
    path: '/services/onsite-bulk-diesel',
    fallbackTitle: 'Onsite Bulk Diesel | Atlas Fuel Australia',
    fallbackDescription: 'Fast, dependable bulk diesel delivered directly to worksites across Australia.',
  })
}

export default async function OnsiteBulkDieselPage() {
  const [sanity, globalSettings] = await Promise.all([
    getOnsiteBulkDieselPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const fallbackSiteSettings = {
    ctaBannerHeading: 'Need Diesel Delivered to Your Site?',
    ctaBannerText: 'Contact us today for a free onsite fuel quote and let our team build a delivery solution tailored to your operational needs.',
    ctaBannerButtonText: 'Enquire Now',
    ctaBannerButtonLink: '/contact',
  }

  const fallbackHero = {
    subtitle: 'Onsite Bulk Diesel',
    title: 'Fuel Where You Need It, When You Need It',
    description: 'No matter the location or the challenge, Atlas Fuel delivers high-quality diesel exactly where and when you need it. Our flexible onsite refueling solutions are designed to minimize downtime, boost productivity, and keep your operations moving without interruption. With fast dispatch, reliable service, and a commitment to excellence, we ensure your fuel is there before you even need to ask.',
    heroImageUrl: '/images/what-we-do-onsite-diesel.webp',
  }

  const fallbackOnsiteIntro = {
    heading: 'Rapid Response Diesel Delivery',
    description: 'When every second counts, Atlas Fuel\'s rapid response team delivers diesel exactly when your operations demand it. Our fleet is on standby 24/7, ready to mobilize at a moment\'s notice to keep your business powered and productive. Trust Atlas Fuel to deliver speed, reliability, and peace of mind with every drop.',
    ctaText: 'Enquire now',
    ctaLink: '/contact',
  }

  const fallbackFeatures = {
    title: 'Onsite Diesel Solutions',
    subtitle: 'Four Ways We Deliver Excellence',
    features: [
      {
        icon: 'bulk',
        title: 'Fast Delivery',
        description: 'Atlas Fuel delivers diesel swiftly to your site, minimizing costly downtime and keeping your operations running strong. Our fleet is ready to mobilize at a moment\'s notice, wherever you are across Australia.',
      },
      {
        icon: 'remote',
        title: 'Reliable Supply',
        description: 'We understand, consistency is key, and Atlas Fuel ensures your site always has the diesel it needs without delay. Trust our proven supply chain to fuel your business day after day without compromise.',
      },
      {
        icon: 'emergency',
        title: '24/7 Support',
        description: 'When you need us, Atlas Fuel is just a call away, delivering service and quality fuel around the clock. Our dedicated team is committed to keeping your operations powered every hour of every single day.',
      },
      {
        icon: 'onsite',
        title: 'Custom Request',
        description: 'We understand, every site is different, and Atlas Fuel tailors diesel delivery plans to match specific operational needs. We work closely with you to ensure the right fuel, at the right time, Every time',
      },
    ],
  }

  const fallbackExcellence = {
    tagline: 'Unrivalled. Unmatched. Unstoppable.',
    content: 'These three words capture the spirit of Atlas Fuel and the people who drive it forward every day. We stand unrivalled in our commitment to quality, unmatched in our ability to deliver reliable fuel solutions nationwide, and unstoppable in our pursuit of growth, innovation, and excellence. From our performance fleet to our world-class service stations, every step we take reflects a relentless drive to set new standards in the fuel industry. For our customers, our partners, and our communities, Atlas Fuel is more than a brand — it is a promise of strength, progress, and a future powered without limits.',
    ctaText: 'Read More',
    ctaLink: '/about',
  }

  const fallbackPartner = {
    heading: 'Your Trusted Onsite Fuel Partner',
    description: 'At Atlas Fuel, we\'re more than a supplier — we\'re your trusted onsite fuel partner, committed to keeping your business moving without interruption. With tailored solutions, round-the-clock support, and a reputation for reliability, we deliver confidence with every drop of diesel. Partner with Atlas Fuel and experience a new standard of service built on trust, performance, and dedication.',
    ctaPrimary: 'Learn More',
    ctaPrimaryLink: '/fuel-prices',
    ctaSecondary: 'Enquire Now',
    ctaSecondaryLink: '/contact',
    imageUrl: '/images/onsite-diesel.jpg',
  }

  const fallbackSafety = {
    heading: 'YOUR PARTNER IN SAFETY',
    content: 'Atlas Fuel Australia places paramount importance on the safety of our employees and the communities we serve, particularly when handling dangerous goods such as petroleum products. Our commitment to safety is reflected in rigorous and comprehensive safe work procedures designed to mitigate risks and ensure the well-being of our workforce. Our teams undergo extensive training, equipping them with the knowledge and skills necessary to handle dangerous goods with precision and care.',
  }

  const fallbackCompliance = {
    heading: 'Atlas Compliance',
    content: 'Atlas Fuel stands proudly certified across ISO, NHVAS, and regulatory standards, proving our unwavering commitment to quality, safety, and responsible operations.',
    certifications: [
      { name: 'ISO 9001', label: 'Quality Management System' },
      { name: 'ISO 14001', label: 'Environmental Management' },
      { name: 'ISO 45001', label: 'Occupational Health & Safety' },
      { name: 'NHVAS', label: 'National Heavy Vehicle Accreditation' },
      { name: '$50M Insurance', label: 'Full Coverage' },
      { name: 'CoR', label: 'Chain of Responsibility' },
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
    subheading: 'A streamlined process for reliable bulk diesel delivery.',
    steps: [
      {step: '01', title: 'Site Assessment', description: 'We assess your fuel demand, access requirements, storage and delivery schedule.', imageUrl: '/images/what-we-do-onsite-diesel.webp'},
      {step: '02', title: 'Delivery Planning', description: 'Our logistics team builds a safe, reliable delivery plan around your operating hours.', imageUrl: '/images/hero-trucks.jpg'},
      {step: '03', title: 'Onsite Delivery', description: 'Certified drivers deliver directly to your site, tanks or equipment on schedule.', imageUrl: '/images/onsite-diesel.jpg'},
      {step: '04', title: 'Ongoing Support', description: 'We monitor your requirements and remain available around the clock for urgent supply.', imageUrl: '/images/atlas-fuel-hero-1b.webp'},
    ],
  }

  const hero = mergeWithFallback(fallbackHero, sanity?.heroSection)
  const onsiteIntro = mergeWithFallback(fallbackOnsiteIntro, sanity?.onsiteIntroSection)
  const features = mergeWithFallback(fallbackFeatures, sanity?.featuresSection)
  const process = mergeWithFallback(fallbackProcess, sanity?.processTimelineSection)
  const excellence = mergeWithFallback(fallbackExcellence, sanity?.excellenceSection)
  const partner = mergeWithFallback(fallbackPartner, sanity?.partnerSection)
  const safety = mergeWithFallback(fallbackSafety, sanity?.safetySection)
  const compliance = mergeWithFallback(fallbackCompliance, sanity?.complianceSection)
  const fleet = mergeWithFallback(fallbackFleet, sanity?.fleetComplianceSection)
  const drivers = mergeWithFallback(fallbackDrivers, sanity?.driversComplianceSection)

  const enquire = {
    ...mergeWithFallback(fallbackEnquire, sanity?.enquireSection),
    primaryCta: { text: sanity?.enquireSection?.primaryCTAText ?? fallbackEnquire.primaryCta.text, link: sanity?.enquireSection?.primaryCTALink ?? fallbackEnquire.primaryCta.link },
    secondaryCta: { text: sanity?.enquireSection?.secondaryCTAText ?? fallbackEnquire.secondaryCta.text, link: sanity?.enquireSection?.secondaryCTALink ?? fallbackEnquire.secondaryCta.link },
  }
  const siteSettings = mapPageCta(sanity, globalSettings, fallbackSiteSettings)

  return (
    <>
      <OnsiteBulkDieselClient
        hero={hero}
        onsiteIntro={onsiteIntro}
        features={features}
        process={process}
        excellence={excellence}
        partner={partner}
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
