import { getCommercialDieselPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import { loadPageMetadata } from '@/lib/metadata'
import CTABanner from '@/components/shared/CTABanner'
import CommercialHero from '@/components/commercial/CommercialHero'
import IndustriesGrid from '@/components/commercial/IndustriesGrid'
import SectorsCover from '@/components/commercial/SectorsCover'
import BunkerRefuelingSection from '@/components/commercial/BunkerRefuelingSection'
import OwnStation from '@/components/commercial/OwnStation'
import DoYouKnow from '@/components/commercial/DoYouKnow'
import MiningSector from '@/components/commercial/MiningSector'
import Agriculture from '@/components/commercial/Agriculture'
import WhatWeOffer from '@/components/commercial/WhatWeOffer'
import TransportationSector from '@/components/commercial/TransportationSector'
import ComplianceSection from '@/components/commercial/ComplianceSection'

export function generateMetadata() {
  return loadPageMetadata({
    getPage: getCommercialDieselPage,
    getSiteSettings,
    path: '/commercial-diesel',
    fallbackTitle: 'Commercial Diesel | Atlas Fuel Australia',
    fallbackDescription: 'Bulk diesel delivery for commercial operations across Australia. Reliable fuel solutions for mining, agriculture, transport, marine, and retail sectors.',
  })
}

const fallbackData = {
  heroSubtitle: 'Commercial Diesel',
  heroSubtitleColor: 'var(--cms-primary)',
  heroSubtitleSize: '14px',
  heroTitle: 'Powering Your Business with Reliable Fuel Solutions',
  heroTitleColor: 'var(--cms-text)',
  heroTitleSize: '72px',
  heroDescription: 'Atlas Fuel Australia delivers high-quality diesel and fuel solutions to power industries, businesses, and communities across Australia. From mining and agriculture to transport and marine, our services are customized to meet every sector\'s needs.',
  heroDescriptionColor: 'var(--cms-muted)',
  heroDescriptionSize: '18px',
  heroImageUrl: '/images/atlas-fuel-hero-1c.webp',
  heroImageAlt: 'Atlas Fuel commercial diesel delivery',
  industriesHeading: 'Industries We Serve',
  industriesHeadingColor: 'var(--cms-text)',
  industriesHeadingSize: '48px',
  industriesEyebrow: 'Our Expertise',
  sectorsHeading: 'Sectors We Cover',
  sectorsHeadingColor: 'var(--cms-text)',
  sectorsHeadingSize: '48px',
  sectorsContent: 'ATLAS specializes in offering fuel supply and logistics services, catering to various sectors such as the Mining industry, local farmers, retail fuel stations, and independent fuel companies. Our organizational structure is distinctive yet straightforward, and we take pride in being accessible to a wide range of customers.',
  sectorsContentColor: 'var(--cms-muted)',
  sectorsContentSize: '18px',
  sectorsImageUrl: '/images/local-fuel-distributors.jpg',
  sectorsEyebrow: 'Coverage',
  sectorsImageAlt: 'Sectors We Cover',
  bunkerHeading: 'Bunker Refueling',
  bunkerHeadingColor: 'var(--cms-text)',
  bunkerHeadingSize: '48px',
  bunkerContent: 'Atlas Fuel stands out as the most effective supplier for bunker refueling due to its commitment to providing high-quality fuel, reliable services, and competitive pricing. With years of experience in the industry, Atlas Fuel ensures efficient and timely delivery, even in the most challenging conditions, making it the preferred choice for clients worldwide.\n\nFor international clients, Atlas Fuel offers seamless communication through WhatsApp or can be reached via email at info@atlasfuel.com.au to discuss their specific needs and receive prompt assistance.',
  bunkerContentColor: 'var(--cms-muted)',
  bunkerContentSize: '18px',
  bunkerImageUrl: '/images/marine-bunkering.jpg',
  bunkerEyebrow: 'Marine Services',
  bunkerImageAlt: 'Marine Refueling',
  ownStationTagline: 'Franchise Opportunity',
  ownStationHeading: 'Own a Fuel Station?',
  ownStationHeadingColor: 'var(--cms-text)',
  ownStationHeadingSize: '48px',
  ownStationContent: 'If you own a fuel station, Atlas Fuel can provide you with Atlas Fuel branding, services tailored to enhance your station\'s visibility and appeal. Enquiring about Atlas Fuel branding can offer you a range of benefits, from distinctive branding that attracts more customers to operational support that helps streamline your business.\n\nExplore how Atlas Fuel branding can elevate your station\'s presence and customer satisfaction today by reaching out to inquire about their specialized services.',
  ownStationContentColor: 'var(--cms-muted)',
  ownStationContentSize: '18px',
  ownStationImageUrl: '/images/fuel-stations.jpg',
  ownStationImageAlt: 'Atlas Fuel service station',
  doYouKnowTagline: 'Did You Know?',
  doYouKnowHeading: 'Our Impact',
  doYouKnowHeadingColor: 'var(--cms-text)',
  doYouKnowHeadingSize: '48px',
  doYouKnowContent: 'Atlas Fuel is a trusted partner for over 200 commercial diesel clients and retail businesses across Australia, providing reliable fuel solutions tailored to their unique needs. Our extensive network and logistical expertise ensure seamless delivery of high-quality fuel, no matter where our clients are located.\n\nWith a strong commitment to efficiency, competitive pricing, and customer satisfaction, Atlas Fuel has become a leading choice for businesses that depend on uninterrupted fuel supply.',
  doYouKnowContentColor: 'var(--cms-muted)',
  doYouKnowContentSize: '18px',
  miningTagline: 'Industry Solutions',
  miningHeading: 'Mining Sector',
  miningHeadingColor: 'var(--cms-text)',
  miningHeadingSize: '48px',
  miningContent: 'Atlas Fuel is the optimal choice for refueling mining machines due to its unparalleled reliability, efficiency, and safety features. With a steadfast commitment to quality, Atlas Fuel ensures uninterrupted operations by delivering fuel on-site precisely when needed, eliminating costly downtime.\n\nTheir rigorous adherence to industry standards guarantees the highest level of safety, crucial for the demanding environments of mining operations. Moreover, Atlas Fuel\'s competitive pricing and flexible delivery options provide cost-effective solutions tailored to meet the unique demands of mining projects.',
  miningContentColor: 'var(--cms-muted)',
  miningContentSize: '18px',
  miningImageUrl: '/images/what-we-do-mining-civil.webp',
  miningImageAlt: 'Atlas Fuel supporting mining operations',
  agricultureTagline: 'Supporting Farmers',
  agricultureHeading: 'Agriculture',
  agricultureHeadingColor: 'var(--cms-text)',
  agricultureHeadingSize: '48px',
  agricultureContent: 'Atlas Fuel Australia prides itself on delivering the best prices to its agriculture customers. With a commitment to supporting Australia\'s farming communities, Atlas Fuel ensures competitive rates that help farmers manage their operational costs effectively.\n\nWhether it\'s supplying diesel for machinery or other fuel needs essential to agriculture, Atlas Fuel Australia combines reliability with cost-efficiency, ensuring that farmers can focus on their crops and livestock without financial strain.',
  agricultureContentColor: 'var(--cms-muted)',
  agricultureContentSize: '18px',
  agricultureImageUrl: '/images/agriculture.webp',
  agricultureImageAlt: 'Atlas Fuel supporting Australian agriculture',
  whatWeOfferTagline: 'Our Promise',
  whatWeOfferHeading: 'What We Offer?',
  whatWeOfferHeadingColor: 'var(--cms-text)',
  whatWeOfferHeadingSize: '48px',
  whatWeOfferContent: 'Atlas Fuel Australia stands out for its unwavering commitment to reliability, ensuring your business always has access to fuel when and where you need it most.',
  whatWeOfferContentColor: 'var(--cms-muted)',
  whatWeOfferContentSize: '18px',
  transportationTagline: 'Transport & Logistics',
  transportationHeading: 'Transportation Sector',
  transportationHeadingColor: 'var(--cms-text)',
  transportationHeadingSize: '48px',
  transportationContent: 'Atlas Fuel Australia also stands as a leading provider of competitive fuel prices for the transportation sector. Recognizing the critical role that transportation plays in the movement of goods across the country, Atlas Fuel offers cost-effective solutions tailored to the needs of logistics and transport companies.\n\nBy providing high-quality fuels at the best possible prices, Atlas Fuel helps businesses in the transportation industry reduce their operating costs and maximize efficiency.',
  transportationContentColor: 'var(--cms-muted)',
  transportationContentSize: '18px',
  complianceHeading: 'Atlas Compliance',
  complianceHeadingColor: 'var(--cms-text)',
  complianceHeadingSize: '48px',
  complianceContent: 'Atlas Fuel stands proudly certified across ISO, WAHVA, and regulatory standards, proving our unwavering commitment to quality, safety, and responsible operations.',
  complianceContentColor: 'var(--cms-muted)',
  complianceContentSize: '18px',
}

const fallbackIndustries = {
  heading: 'Industries We Serve',
  industries: [
    { title: 'Mining Fuel', description: 'We deliver high-quality fuel solutions to power industries, businesses, and communities across Australia.', icon: 'pickaxe', imageUrl: '/images/what-we-do-mining-civil.webp', imageAlt: 'Atlas Fuel mining delivery' },
    { title: 'Marine Fuel', description: 'From mining and agriculture to transport and marine, our services are customized to meet every sector\'s needs.', icon: 'anchor', imageUrl: '/images/marine-bunkering.jpg', imageAlt: 'Atlas Fuel marine bunkering' },
    { title: 'Agriculture', description: 'Our offerings include bulk fuel supply, on-site refueling, logistics, and retail solutions for seamless operations.', icon: 'wheat', imageUrl: '/images/agriculture.webp', imageAlt: 'Atlas Fuel agriculture delivery' },
    { title: 'Fuel Retailer', description: 'Wherever you operate, Atlas Fuel keeps you moving, growing, and succeeding with dependable service.', icon: 'fuel', imageUrl: '/images/what-we-do-retail.webp', imageAlt: 'Atlas Fuel retail service station' },
    { title: 'Fuel Distributor', description: 'Wherever you operate, Atlas Fuel keeps you moving, growing, and succeeding with dependable service.', icon: 'truck', imageUrl: '/images/local-fuel-distributors.jpg', imageAlt: 'Atlas Fuel local distribution' }
  ],
}

const fallbackBunker = {
  ctaHeading: 'International Enquiries',
  ctaDescription: 'We are available 24/7 to look after our international clients. Contact us through WhatsApp for immediate assistance.',
  whatsapp: '+61 428 935 216',
  whatsappButtonText: 'WhatsApp',
}

const fallbackOwnStation = {
  ctaText: 'Learn More',
  ctaLink: '/fuel-station-enquiry',
}

const fallbackDoYouKnow = {
  stats: [
    { value: '200+', label: 'Commercial Clients' },
    { value: '100%', label: 'Australian Owned' },
    { value: '24/7', label: 'Support Available' },
    { value: '15+', label: 'Years Experience' },
  ],
}

const fallbackMining = {
  statValue: '24/7',
  statLabel: 'On-Site Delivery',
}

const fallbackAgriculture = {
  features: [
    { title: 'Best Prices', description: 'Competitive rates for farming communities' },
    { title: 'Reliable', description: 'On-time delivery during harvest seasons' },
    { title: 'Quality', description: 'Premium diesel for all machinery' },
    { title: 'Local', description: 'Supporting Australian farmers' },
  ],
}

const fallbackTransportation = {
  ctaHeading: 'Fleet Solutions',
  ctaDescription: 'Get competitive pricing for your fleet. We understand the transportation industry\'s needs for reliable, cost-effective fuel supply.',
  ctaText: 'Get a Quote',
  ctaLink: '/contact',
}

const fallbackCompliance = {
  certifications: [
    { name: 'ISO 9001', label: 'Quality Management' },
    { name: 'ISO 14001', label: 'Environmental Management' },
    { name: 'ISO 45001', label: 'Health & Safety' },
  ],
}

const fallbackSiteSettings = {
  ctaBannerHeading: 'Ready to Power Your Business?',
  ctaBannerText: 'Contact us today for a free fuel quote and let our team build a solution tailored to your needs.',
  ctaBannerButtonText: 'Get a Free Quote',
  ctaBannerButtonLink: '/contact',
}

export default async function CommercialDieselPage() {
  const [sanity, siteSettings] = await Promise.all([
    getCommercialDieselPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const data = mergeWithFallback(fallbackData, sanity)
  const settings = mapPageCta(sanity, siteSettings, fallbackSiteSettings)

  const hero = {
    subtitle: data.heroSubtitle,
    subtitleColor: data.heroSubtitleColor,
    subtitleSize: data.heroSubtitleSize,
    title: data.heroTitle,
    titleColor: data.heroTitleColor,
    titleSize: data.heroTitleSize,
    description: data.heroDescription,
    descriptionColor: data.heroDescriptionColor,
    descriptionSize: data.heroDescriptionSize,
    heroImage: data.heroImage ?? data.heroImageUrl,
    heroImageUrl: data.heroImageUrl,
    heroImageAlt:
      data.heroImageAlt ?? data.heroImageUrlAlt ?? data.heroTitle,
  }

  const industries = {
    heading: data.industriesHeading,
    headingColor: data.industriesHeadingColor,
    headingSize: data.industriesHeadingSize,
    eyebrow: data.industriesEyebrow,
    industries: data.industries ?? fallbackIndustries.industries,
  }

  const sectors = {
    heading: data.sectorsHeading,
    headingColor: data.sectorsHeadingColor,
    headingSize: data.sectorsHeadingSize,
    eyebrow: data.sectorsEyebrow,
    content: data.sectorsContent,
    contentColor: data.sectorsContentColor,
    contentSize: data.sectorsContentSize,
    image: data.sectorsImage ?? data.sectorsImageUrl,
    imageUrl: data.sectorsImageUrl,
    imageAlt:
      data.sectorsImageAlt ??
      data.sectorsImageUrlAlt ??
      data.sectorsHeading,
  }

  const bunker = {
    heading: data.bunkerHeading,
    headingColor: data.bunkerHeadingColor,
    headingSize: data.bunkerHeadingSize,
    eyebrow: data.bunkerEyebrow,
    content: data.bunkerContent,
    contentColor: data.bunkerContentColor,
    contentSize: data.bunkerContentSize,
    ...mergeWithFallback(fallbackBunker, sanity?.bunkerSection),
    image: data.bunkerImage ?? data.bunkerImageUrl,
    imageUrl: data.bunkerImageUrl,
    imageAlt:
      data.bunkerImageAlt ??
      data.bunkerImageUrlAlt ??
      data.bunkerHeading,
  }

  const ownStation = {
    tagline: data.ownStationTagline,
    heading: data.ownStationHeading,
    headingColor: data.ownStationHeadingColor,
    headingSize: data.ownStationHeadingSize,
    content: data.ownStationContent,
    contentColor: data.ownStationContentColor,
    contentSize: data.ownStationContentSize,
    ...mergeWithFallback(fallbackOwnStation, sanity?.ownStationSection),
    image: data.ownStationImage ?? data.ownStationImageUrl,
    imageUrl: data.ownStationImageUrl,
    imageAlt:
      data.ownStationImageAlt ??
      data.ownStationImageUrlAlt ??
      data.ownStationHeading,
  }

  const doYouKnow = {
    tagline: data.doYouKnowTagline,
    heading: data.doYouKnowHeading,
    headingColor: data.doYouKnowHeadingColor,
    headingSize: data.doYouKnowHeadingSize,
    content: data.doYouKnowContent,
    contentColor: data.doYouKnowContentColor,
    contentSize: data.doYouKnowContentSize,
    ...mergeWithFallback(fallbackDoYouKnow, sanity?.doYouKnowSection),
  }

  const mining = {
    tagline: data.miningTagline,
    heading: data.miningHeading,
    headingColor: data.miningHeadingColor,
    headingSize: data.miningHeadingSize,
    content: data.miningContent,
    contentColor: data.miningContentColor,
    contentSize: data.miningContentSize,
    ...mergeWithFallback(fallbackMining, sanity?.miningSection),
    image: data.miningImage ?? data.miningImageUrl,
    imageUrl: data.miningImageUrl,
    imageAlt:
      data.miningImageAlt ??
      data.miningImageUrlAlt ??
      data.miningHeading,
  }

  const agriculture = {
    tagline: data.agricultureTagline,
    heading: data.agricultureHeading,
    headingColor: data.agricultureHeadingColor,
    headingSize: data.agricultureHeadingSize,
    content: data.agricultureContent,
    contentColor: data.agricultureContentColor,
    contentSize: data.agricultureContentSize,
    ...mergeWithFallback(fallbackAgriculture, sanity?.agricultureSection),
    image: data.agricultureImage ?? data.agricultureImageUrl,
    imageUrl: data.agricultureImageUrl,
    imageAlt:
      data.agricultureImageAlt ??
      data.agricultureImageUrlAlt ??
      data.agricultureHeading,
  }

  const whatWeOffer = {
    tagline: data.whatWeOfferTagline,
    heading: data.whatWeOfferHeading,
    headingColor: data.whatWeOfferHeadingColor,
    headingSize: data.whatWeOfferHeadingSize,
    content: data.whatWeOfferContent,
    contentColor: data.whatWeOfferContentColor,
    contentSize: data.whatWeOfferContentSize,
  }

  const transportation = {
    tagline: data.transportationTagline,
    heading: data.transportationHeading,
    headingColor: data.transportationHeadingColor,
    headingSize: data.transportationHeadingSize,
    content: data.transportationContent,
    contentColor: data.transportationContentColor,
    contentSize: data.transportationContentSize,
    ...mergeWithFallback(fallbackTransportation, sanity?.transportationSection),
  }

  const compliance = {
    heading: data.complianceHeading,
    headingColor: data.complianceHeadingColor,
    headingSize: data.complianceHeadingSize,
    description: data.complianceContent,
    descriptionColor: data.complianceContentColor,
    descriptionSize: data.complianceContentSize,
    eyebrow: data.complianceEyebrow ?? 'Standards & Safety',
    ...mergeWithFallback(fallbackCompliance, sanity?.complianceSection),
  }

  return (
    <>
      
        <CommercialHero data={hero} />
        <IndustriesGrid data={industries} />
        <SectorsCover data={sectors} />
        <BunkerRefuelingSection data={bunker} />
        <OwnStation data={ownStation} />
        <DoYouKnow data={doYouKnow} />
        <MiningSector data={mining} />
        <Agriculture data={agriculture} />
        <WhatWeOffer data={whatWeOffer} />
        <TransportationSector data={transportation} />
        <ComplianceSection data={compliance} />
        <CTABanner data={settings} />
      
    </>
  )
}
