import { getMarineFuelPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import MarineFuelClient from './MarineFuelClient'

export default async function MarineFuelPage() {
  const [sanity, globalSettings] = await Promise.all([
    getMarineFuelPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const fallbackSiteSettings = {
    ctaBannerHeading: 'Ready to Power Your Fleet?',
    ctaBannerText: 'Contact us today for a free marine fuel quote and let our team build a solution tailored to your vessel needs.',
    ctaBannerButtonText: 'Get a Free Quote',
    ctaBannerButtonLink: '/contact',
  }

  const fallbackHero = {
    subtitle: 'Marine Fuel Solutions',
    title: 'Powering Vessels Across Every Tide',
    description: 'Atlas Fuel delivers premium marine fuel solutions designed for reliability across every tide and every port. Through our seamless logistics network, we ensure vessels are fueled on time, every time — keeping your operations moving without delay.',
    heroImageUrl: '/images/marine-fuel.jpg',
    stats: [
      { value: '24/7', label: 'Vessel Support' },
      { value: '100%', label: 'IMO Compliant' },
      { value: 'Fast', label: 'Turnaround' },
      { value: 'All', label: 'Ports' },
    ],
  }

  const fallbackFeatures = {
    features: [
      {
        id: 'vessel',
        title: 'Vessel Support',
        description: 'Atlas Fuel specializes in delivering premium marine fuel directly to vessels of all sizes, ensuring smooth operations at sea and in port. Our experienced team understands the critical timing and precision required in the marine industry. With dependable service and 24/7 support, we keep your fleet fueled and ready for any journey.',
        icon: 'vessel',
        ctaText: 'Enquire Now',
        ctaLink: '/contact',
      },
      {
        id: 'port',
        title: 'Port Services',
        description: 'We provide comprehensive fueling solutions across key Australian ports, designed to streamline your vessel turnaround times. Atlas Fuel\'s efficient port services minimize downtime and maximize operational efficiency. From small refueling needs to bulk deliveries, we have the capability and flexibility to deliver when and where you need it most.',
        icon: 'port',
        ctaText: 'Enquire Now',
        ctaLink: '/contact',
      },
      {
        id: 'diesel',
        title: 'Diesel / Sulphur',
        description: 'We offer a range of premium marine diesel and low-sulphur fuel options to meet evolving environmental standards and operational demands. We guarantee clean, quality-assured fuels that protect your vessels\' engines and maximize overall performance. Our fuels consistently meet strict IMO regulations, ensuring compliance without ever compromising power.',
        icon: 'fuel',
        ctaText: 'Enquire Now',
        ctaLink: '/contact',
      },
      {
        id: 'fleet',
        title: 'Fueling Fleet',
        description: 'Our fueling solutions are built to keep your marine fleet operating smoothly without delays, whether you manage fishing boats, ferries, workboats, or cargo ships. We tailor flexible supply schedules and fuel quantities to fit your fleet\'s exact requirements. With us, you gain a trusted, reliable fuel partner who grows and moves with your business.',
        icon: 'fleet',
        ctaText: 'Enquire Now',
        ctaLink: '/contact',
      },
    ],
  }

  const fallbackIntro = {
    heading: 'Trusted Marine Fuel Supply',
    content: 'Atlas Fuel delivers premium marine fuel solutions designed for reliability across every tide and every port. Through our seamless logistics network, we ensure vessels are fueled on time, every time — keeping your operations moving without delay. Our transparent, competitive pricing safeguards your bottom line while maintaining world-class quality standards. With a strong focus on compliance, safety, and environmental responsibility, we protect both your fleet and the oceans you navigate. Backed by local expertise and national scale, Atlas Fuel is the trusted partner powering Australia\'s marine industry forward.',
    imageUrl: '/images/marine-bunkering.jpg',
  }

  const fallbackCommercial = {
    tagline: 'Commercial & Offshore',
    heading: 'Commercial and Offshore Operations',
    description: 'Atlas Fuel Australia has built a reputation as the trusted partner for commercial and offshore marine operations across the country. Our advanced logistics network, premium products, and round-the-clock service ensure your vessels are always ready to perform. We don\'t just deliver fuel — we deliver reliability, peace of mind, and a partnership that grows with your business.',
    ctaText: 'Enquire Now',
    ctaLink: '/contact',
    imageUrl: '/images/marine-bunkering.jpg',
  }

  const fallbackCompliance = {
    heading: 'Atlas Compliance',
    content: 'Atlas Fuel stands proudly certified across ISO, NHVAS, and regulatory standards, proving our unwavering commitment to quality, safety, and responsible operations in the marine environment.',
    certifications: [
      { name: 'ISO 9001', label: 'Quality Management System' },
      { name: 'ISO 14001', label: 'Environmental Management' },
      { name: 'ISO 45001', label: 'Occupational Health & Safety' },
      { name: 'NHVAS', label: 'National Heavy Vehicle Accreditation' },
      { name: '$50M', label: 'Insurance Coverage' },
      { name: 'CoR', label: 'Chain of Responsibility' },
      { name: 'IMO', label: 'IMO 2020 Compliant' },
      { name: 'AMSA', label: 'AMSA Certified' },
    ],
  }

  const fallbackProcess = {
    heading: 'How We Work',
    subheading: 'A streamlined marine fueling process',
    steps: [
      { step: '01', title: 'Vessel Assessment', description: 'We assess your vessel\'s fuel requirements, delivery schedules, and port-specific needs to create a customized bunkering solution.', imageUrl: '/images/marine-fuel.jpg' },
      { step: '02', title: 'Port Coordination', description: 'Our team coordinates with port authorities and your crew to schedule refueling during optimal windows, minimizing vessel downtime.', imageUrl: '/images/marine-bunkering.jpg' },
      { step: '03', title: 'Safe Refueling', description: 'Our certified marine fueling team delivers fuel safely and efficiently, following strict safety protocols and environmental regulations.', imageUrl: '/images/marine-fuel.jpg' },
      { step: '04', title: 'Documentation & Support', description: 'Complete fuel delivery documentation provided, with 24/7 support available for any post-delivery needs or questions.', imageUrl: '/images/atlas-fuel-hero-1c.webp' },
    ],
  }

  const fallbackEnquire = {
    heading: 'Enquire now for your fueling Needs',
    primaryCta: { text: 'Enquire Now', link: '/contact' },
    secondaryCta: { text: 'Learn More', link: '/fuel-prices' },
  }

  // Merge Sanity data with fallbacks - include all styling fields
  const hero = mergeWithFallback(fallbackHero, sanity?.heroSection)
  const features = mergeWithFallback(fallbackFeatures, sanity?.featuresSection)
  const intro = mergeWithFallback(fallbackIntro, sanity?.introSection)
  const commercial = mergeWithFallback(fallbackCommercial, sanity?.commercialSection)
  const compliance = mergeWithFallback(fallbackCompliance, sanity?.complianceSection)
  const process = mergeWithFallback(fallbackProcess, sanity?.processTimelineSection)

  const enquire = {
    ...mergeWithFallback(fallbackEnquire, sanity?.enquireSection),
    primaryCta: { text: sanity?.enquireSection?.primaryCTAText || fallbackEnquire.primaryCta.text, link: sanity?.enquireSection?.primaryCTALink || fallbackEnquire.primaryCta.link },
    secondaryCta: { text: sanity?.enquireSection?.secondaryCTAText || fallbackEnquire.secondaryCta.text, link: sanity?.enquireSection?.secondaryCTALink || fallbackEnquire.secondaryCta.link },
  }

  const fleet = mergeWithFallback({
    heading: 'Fleet Compliance',
    content: 'Our fleet operates with the highest standards of safety and compliance, ensuring your fuel deliveries are handled by certified professionals using state-of-the-art equipment.',
  }, sanity?.fleetComplianceSection)

  const drivers = mergeWithFallback({
    heading: 'Drivers Compliance',
    content: 'Every Atlas Fuel driver meets the highest industry standards. Our rigorous training and certification programs ensure your fuel is transported by qualified professionals who prioritize safety above all else.',
  }, sanity?.driversComplianceSection)
  const siteSettings = mapPageCta(sanity, globalSettings, fallbackSiteSettings)

  return (
    <>
      <MarineFuelClient
        hero={hero}
        features={features}
        intro={intro}
        commercial={commercial}
        compliance={compliance}
        process={process}
        enquire={enquire}
        fleet={fleet}
        drivers={drivers}
        siteSettings={siteSettings}
      />
    </>
  )
}
