import CTABanner from '@/components/shared/CTABanner'
import CmsImage from '@/components/common/CmsImage'
import ServiceHero from '@/components/services/ServiceHero'
import ServicesShowcase from '@/components/services/ServicesShowcase'
import VisualIndustriesGrid from '@/components/services/VisualIndustriesGrid'
import AnimatedStatsSection from '@/components/services/AnimatedStatsSection'
import ProcessTimeline from '@/components/services/ProcessTimeline'
import { getServicesPage, getSiteSettings } from '@/lib/sanity'
import { mapPageCta } from '@/lib/contentFallbacks'
import {loadPageMetadata} from '@/lib/metadata'

export function generateMetadata() {
  return loadPageMetadata({
    getPage: getServicesPage,
    getSiteSettings,
    path: '/services',
    fallbackTitle: 'Services | Atlas Fuel Australia',
    fallbackDescription: 'Comprehensive fuel services across Australia - mining, marine, agriculture, transportation, and more.',
  })
}

const sizeMap = {
  '1': '12px',
  '2': '16px',
  '3': '20px',
  '4': '24px',
  '5': '32px',
  '6': '48px',
  '7': '70px',
}

const fallbackSiteSettings = {
  ctaBannerHeading: 'Ready to Power Your Business?',
  ctaBannerText: 'Contact us today for a free fuel quote and let our team build a solution tailored to your needs.',
  ctaBannerButtonText: 'Get a Free Quote',
  ctaBannerButtonLink: '/contact',
}

const fallbackHero = {
  subtitle: 'Our Services',
  title: 'Comprehensive Fuel Solutions for Every Industry',
  description: 'From mining to marine, agriculture to retail, Atlas Fuel delivers reliable, high-quality fuel solutions tailored to meet the unique needs of every industry we serve across Australia.',
  heroImageUrl: '/images/atlas-fuel-hero-1b.webp',
  heroImageAlt: 'Atlas Fuel trucks delivering fuel solutions',
}

const fallbackServices = {
  heading: 'What We Offer',
  subheading: 'Tailored fuel solutions for every sector',
  services: [
    {
      id: 'mining',
      title: 'Mining Fuel',
      description: 'Bulk diesel supply for mining operations with 24/7 delivery and on-site storage solutions.',
      link: '/services/mining-fuel',
      imageUrl: '/images/what-we-do-mining-civil.webp',
    },
    {
      id: 'marine',
      title: 'Marine Fuel',
      description: 'Bunkering services for ports and marine vessels nationwide with reliable delivery.',
      link: '/services/marine-fuel',
      imageUrl: '/images/marine-bunkering.jpg',
    },
    {
      id: 'agriculture',
      title: 'Agriculture Fuel',
      description: 'Supporting farmers with timely fuel delivery for seasonal demands and bulk storage.',
      link: '/services/agriculture-fuel',
      imageUrl: '/images/agriculture.webp',
    },
    {
      id: 'retail',
      title: 'Fuel Retailers',
      description: 'Partner with us to operate world-class fuel stations with comprehensive support.',
      link: '/services/fuel-retailers',
      imageUrl: '/images/what-we-do-retail.webp',
    },
    {
      id: 'transport',
      title: 'Onsite Bulk Diesel',
      description: 'Direct-to-site fuel delivery with secure storage solutions for industrial operations.',
      link: '/services/onsite-bulk-diesel',
      imageUrl: '/images/what-we-do-onsite-diesel.webp',
    },
    {
      id: 'distribution',
      title: 'Local Fuel Distributors',
      description: 'Join our network of trusted local fuel distributors across Australia.',
      link: '/services/local-fuel-distributors',
      imageUrl: '/images/local-fuel-distributors.jpg',
    },
  ],
}

const fallbackStats = {
  sectionTag: 'Our Impact',
  heading: 'Our Impact',
  displayHeading: 'Numbers That Speak',
  description: 'Atlas Fuel is a trusted partner for businesses across Australia',
  footerText: 'Join hundreds of businesses that trust Atlas Fuel for their energy needs',
  ctaText: 'Become a Partner',
  ctaLink: '/contact',
  stats: [
    { value: '100M+', label: 'Litres Delivered', description: 'Across Australia' },
    { value: '300+', label: 'Jobs Connected', description: 'In local communities' },
    { value: '99.5%', label: 'On-Time Rate', description: 'Delivery reliability' },
    { value: '24/7', label: 'Support', description: 'Always available' },
  ],
}

const fallbackTimeline = {
  sectionTag: 'How It Works',
  heading: 'How We Work',
  subheading: 'A simple, reliable process built around your needs',
  steps: [
    {
      step: '01',
      title: 'Consultation',
      description: 'We assess your fuel requirements and develop a tailored solution for your specific industry and operational needs.',
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Our logistics team creates a comprehensive delivery schedule with GPS tracking and real-time monitoring.',
    },
    {
      step: '03',
      title: 'Delivery',
      description: 'Our certified fleet delivers fuel safely and on time, every time, with zero downtime for your operations.',
    },
  ],
}

const fallbackCTA = {
  heading: 'Ready to Get Started?',
  description: 'Contact our team today to discuss your fuel requirements and discover how Atlas Fuel can power your operations.',
  buttonText: 'Contact Us',
  buttonLink: '/contact',
}

const additionalSections = {
  doYouKnow: {
    heading: 'Do You Know?',
    content: 'Atlas Fuel is a trusted partner for over 200 commercial diesel clients and retail businesses across Australia, providing reliable fuel solutions tailored to their unique needs. Our extensive network and logistical expertise ensure seamless delivery of high-quality fuel, no matter where our clients are located. With a strong commitment to efficiency, competitive pricing, and customer satisfaction, Atlas Fuel has become a leading choice for businesses that depend on uninterrupted fuel supply. Whether powering fleets, machinery, or retail outlets, we consistently deliver success by combining superior service with nationwide coverage.',
  },
  bunkerRefueling: {
    heading: 'Bunker Refueling',
    content: 'Atlas Fuel stands out as the most effective supplier for bunker refueling due to its commitment to providing high-quality fuel, reliable services, and competitive pricing. With years of experience in the industry, Atlas Fuel ensures efficient and timely delivery, even in the most challenging conditions, making it the preferred choice for clients worldwide. Their extensive network and customer-centric approach guarantee that clients receive the best refueling solutions for their vessels. For international clients, Atlas Fuel offers seamless communication through WhatsApp or can be reached via email at info@atlasfuel.com.au to discuss their specific needs and receive prompt assistance.',
    imageUrl: '/images/marine-bunkering.jpg',
    imageAlt: 'Atlas Fuel marine bunker refueling',
    ctaText: 'Contact Us for Marine Fuel',
    ctaLink: '/contact',
  },
  ownStation: {
    heading: 'Own a Fuel Station?',
    content: 'If you own a fuel station, Atlas Fuel can provide you with Atlas Fuel branding, services tailored to enhance your station\'s visibility and appeal. Enquiring about Atlas Fuel branding can offer you a range of benefits, from distinctive branding that attracts more customers to operational support that helps streamline your business. Explore how Atlas Fuel branding can elevate your station\'s presence and customer satisfaction today by reaching out to inquire about their specialized services.',
    imageUrl: '/images/independent-fuel-stations.jpg',
    imageAlt: 'Atlas Fuel branded service station',
  },
  sectorsCover: {
    heading: 'Sectors We Cover',
    content: 'ATLAS specializes in offering fuel supply and logistics services, catering to various sectors such as the Mining industry, local farmers, retail fuel stations, and independent fuel companies. Our organizational structure is distinctive yet straightforward, and we take pride in being accessible to a wide range of customers.',
    sectors: [
      { name: 'Mining', description: 'Remote deliveries, bulk fueling, on-site refueling for mining operations', imageUrl: '/images/what-we-do-mining-civil.webp' },
      { name: 'Marine', description: 'Vessel support, port services, compliant marine diesel solutions', imageUrl: '/images/marine-fuel.jpg' },
      { name: 'Agriculture', description: 'On-demand delivery, safe storage, clean energy options for farms', imageUrl: '/images/agriculture.jpg' },
      { name: 'Transportation', description: 'GPS-tracked fleet, bulk transport, emergency fuel delivery', imageUrl: '/images/what-we-do-fuel-transportation.webp' },
      { name: 'Retail', description: 'Independent retailer support, flexible branding, growth solutions', imageUrl: '/images/what-we-do-retail.webp' },
      { name: 'Distribution', description: 'Local fuel distributor partnerships, fuel rescue, demand support', imageUrl: '/images/local-fuel-distributors.jpg' },
    ],
  },
}

export default async function ServicesPage() {
  const [sanity, globalSettings] = await Promise.all([
    getServicesPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const hero = {
    ...fallbackHero,
    subtitle: sanity?.heroSection?.subtitle ?? fallbackHero.subtitle,
    title: sanity?.heroSection?.title ?? fallbackHero.title,
    description: sanity?.heroSection?.description ?? fallbackHero.description,
    heroImageUrl: sanity?.heroSection?.heroImageUrl ?? fallbackHero.heroImageUrl,
    heroImageImage: sanity?.heroSection?.heroImageImage,
    heroImageAlt: sanity?.heroSection?.heroImageAlt ?? sanity?.heroSection?.heroImageUrlAlt ?? fallbackHero.heroImageAlt,
    subtitleColor: sanity?.heroSection?.subtitleColor ?? 'text-primary',
    subtitleSize: sanity?.heroSection?.subtitleSize ?? null,
    subtitleBorderEnabled: sanity?.heroSection?.subtitleBorderEnabled ?? false,
    subtitleBorderColor: sanity?.heroSection?.subtitleBorderColor ?? '#000000',
    subtitleBorderWidth: sanity?.heroSection?.subtitleBorderWidth ?? '1px',
    subtitleShadowColor: sanity?.heroSection?.subtitleShadowColor ?? '',
    titleColor: sanity?.heroSection?.titleColor ?? 'text-gray-900',
    titleSize: sanity?.heroSection?.titleSize ?? null,
    titleBorderEnabled: sanity?.heroSection?.titleBorderEnabled ?? false,
    titleBorderColor: sanity?.heroSection?.titleBorderColor ?? '#000000',
    titleBorderWidth: sanity?.heroSection?.titleBorderWidth ?? '1px',
    titleShadowColor: sanity?.heroSection?.titleShadowColor ?? '',
    descriptionColor: sanity?.heroSection?.descriptionColor ?? 'text-gray-600',
    descriptionSize: sanity?.heroSection?.descriptionSize ?? null,
    descriptionBorderEnabled: sanity?.heroSection?.descriptionBorderEnabled ?? false,
    descriptionBorderColor: sanity?.heroSection?.descriptionBorderColor ?? '#000000',
    descriptionBorderWidth: sanity?.heroSection?.descriptionBorderWidth ?? '1px',
    descriptionShadowColor: sanity?.heroSection?.descriptionShadowColor ?? '',
  }

  const services = {
    ...fallbackServices,
    heading: sanity?.servicesSection?.heading ?? fallbackServices.heading,
    subheading: sanity?.servicesSection?.subheading ?? fallbackServices.subheading,
    headingColor: sanity?.servicesSection?.headingColor ?? 'text-gray-900',
    headingSize: sanity?.servicesSection?.headingSize ?? null,
    headingBorderEnabled: sanity?.servicesSection?.headingBorderEnabled ?? false,
    headingBorderColor: sanity?.servicesSection?.headingBorderColor ?? '#000000',
    headingBorderWidth: sanity?.servicesSection?.headingBorderWidth ?? '1px',
    headingShadowColor: sanity?.servicesSection?.headingShadowColor ?? '',
    subheadingColor: sanity?.servicesSection?.subheadingColor ?? 'text-gray-600',
    subheadingSize: sanity?.servicesSection?.subheadingSize ?? null,
    subheadingBorderEnabled: sanity?.servicesSection?.subheadingBorderEnabled ?? false,
    subheadingBorderColor: sanity?.servicesSection?.subheadingBorderColor ?? '#000000',
    subheadingBorderWidth: sanity?.servicesSection?.subheadingBorderWidth ?? '1px',
    subheadingShadowColor: sanity?.servicesSection?.subheadingShadowColor ?? '',
    scrollHint: sanity?.servicesSection?.scrollHint ?? 'Scroll to explore',
    ctaLabel: sanity?.servicesSection?.ctaLabel ?? 'Learn More',
    services: Array.isArray(sanity?.servicesSection?.services) ? sanity.servicesSection.services.map((s, i) => ({
      _key: s._key,
      id: s.id ?? fallbackServices.services[i]?.id ?? '',
      title: s.title ?? fallbackServices.services[i]?.title ?? '',
      titleColor: s.titleColor ?? 'text-gray-900',
      titleSize: s.titleSize ?? null,
      titleBorderEnabled: s.titleBorderEnabled ?? false,
      titleBorderColor: s.titleBorderColor ?? '#000000',
      titleBorderWidth: s.titleBorderWidth ?? '1px',
      titleShadowColor: s.titleShadowColor ?? '',
      description: s.description ?? fallbackServices.services[i]?.description ?? '',
      descriptionColor: s.descriptionColor ?? 'text-gray-600',
      descriptionSize: s.descriptionSize ?? null,
      descriptionBorderEnabled: s.descriptionBorderEnabled ?? false,
      descriptionBorderColor: s.descriptionBorderColor ?? '#000000',
      descriptionBorderWidth: s.descriptionBorderWidth ?? '1px',
      descriptionShadowColor: s.descriptionShadowColor ?? '',
      fullDescription: s.fullDescription ?? s.description ?? fallbackServices.services[i]?.description ?? '',
      stats: Array.isArray(s.stats) ? s.stats : (fallbackServices.services[i]?.stats ?? []),
      ctaText: s.ctaText ?? '',
      link: s.link ?? fallbackServices.services[i]?.link ?? '',
      imageUrl: s.imageUrl ?? fallbackServices.services[i]?.imageUrl ?? '',
      imageImage: s.imageImage,
      imageAlt: s.imageAlt ?? s.imageUrlAlt ?? s.title ?? fallbackServices.services[i]?.title ?? '',
    })) : fallbackServices.services,
  }

  const stats = {
    ...fallbackStats,
    sectionTag: sanity?.statsSection?.sectionTag ?? fallbackStats.sectionTag,
    heading: sanity?.statsSection?.heading ?? fallbackStats.heading,
    displayHeading: sanity?.statsSection?.displayHeading ?? sanity?.statsSection?.heading ?? fallbackStats.displayHeading,
    description: sanity?.statsSection?.description ?? fallbackStats.description,
    footerText: sanity?.statsSection?.footerText ?? fallbackStats.footerText,
    ctaText: sanity?.statsSection?.ctaText ?? fallbackStats.ctaText,
    ctaLink: sanity?.statsSection?.ctaLink ?? fallbackStats.ctaLink,
    headingColor: sanity?.statsSection?.headingColor ?? 'text-gray-900',
    headingSize: sanity?.statsSection?.headingSize ?? null,
    headingBorderEnabled: sanity?.statsSection?.headingBorderEnabled ?? false,
    headingBorderColor: sanity?.statsSection?.headingBorderColor ?? '#000000',
    headingBorderWidth: sanity?.statsSection?.headingBorderWidth ?? '1px',
    headingShadowColor: sanity?.statsSection?.headingShadowColor ?? '',
    stats: Array.isArray(sanity?.statsSection?.stats) ? sanity.statsSection.stats.map((s, i) => ({
      value: s.value ?? fallbackStats.stats[i]?.value ?? '',
      prefix: s.prefix ?? '',
      suffix: s.suffix ?? '',
      valueColor: s.valueColor ?? 'text-gray-900',
      valueSize: s.valueSize ?? null,
      valueBorderEnabled: s.valueBorderEnabled ?? false,
      valueBorderColor: s.valueBorderColor ?? '#000000',
      valueBorderWidth: s.valueBorderWidth ?? '1px',
      valueShadowColor: s.valueShadowColor ?? '',
      label: s.label ?? fallbackStats.stats[i]?.label ?? '',
      labelColor: s.labelColor ?? 'text-gray-600',
      labelSize: s.labelSize ?? null,
      labelBorderEnabled: s.labelBorderEnabled ?? false,
      labelBorderColor: s.labelBorderColor ?? '#000000',
      labelBorderWidth: s.labelBorderWidth ?? '1px',
      labelShadowColor: s.labelShadowColor ?? '',
      description: s.description ?? fallbackStats.stats[i]?.description ?? '',
      descriptionColor: s.descriptionColor ?? 'text-gray-600',
      descriptionSize: s.descriptionSize ?? null,
      descriptionBorderEnabled: s.descriptionBorderEnabled ?? false,
      descriptionBorderColor: s.descriptionBorderColor ?? '#000000',
      descriptionBorderWidth: s.descriptionBorderWidth ?? '1px',
      descriptionShadowColor: s.descriptionShadowColor ?? '',
    })) : fallbackStats.stats,
  }

  const timeline = {
    ...fallbackTimeline,
    sectionTag: sanity?.timelineSection?.sectionTag ?? fallbackTimeline.sectionTag,
    heading: sanity?.timelineSection?.heading ?? fallbackTimeline.heading,
    subheading: sanity?.timelineSection?.subheading ?? fallbackTimeline.subheading,
    headingColor: sanity?.timelineSection?.headingColor ?? 'text-gray-900',
    headingSize: sanity?.timelineSection?.headingSize ?? null,
    headingBorderEnabled: sanity?.timelineSection?.headingBorderEnabled ?? false,
    headingBorderColor: sanity?.timelineSection?.headingBorderColor ?? '#000000',
    headingBorderWidth: sanity?.timelineSection?.headingBorderWidth ?? '1px',
    headingShadowColor: sanity?.timelineSection?.headingShadowColor ?? '',
    subheadingColor: sanity?.timelineSection?.subheadingColor ?? 'text-gray-600',
    subheadingSize: sanity?.timelineSection?.subheadingSize ?? null,
    subheadingBorderEnabled: sanity?.timelineSection?.subheadingBorderEnabled ?? false,
    subheadingBorderColor: sanity?.timelineSection?.subheadingBorderColor ?? '#000000',
    subheadingBorderWidth: sanity?.timelineSection?.subheadingBorderWidth ?? '1px',
    subheadingShadowColor: sanity?.timelineSection?.subheadingShadowColor ?? '',
    steps: Array.isArray(sanity?.timelineSection?.steps) ? sanity.timelineSection.steps.map((s, i) => ({
      step: s.step ?? fallbackTimeline.steps[i]?.step ?? '',
      title: s.title ?? fallbackTimeline.steps[i]?.title ?? '',
      titleColor: s.titleColor ?? 'text-gray-900',
      titleSize: s.titleSize ?? null,
      titleBorderEnabled: s.titleBorderEnabled ?? false,
      titleBorderColor: s.titleBorderColor ?? '#000000',
      titleBorderWidth: s.titleBorderWidth ?? '1px',
      titleShadowColor: s.titleShadowColor ?? '',
      description: s.description ?? fallbackTimeline.steps[i]?.description ?? '',
      descriptionColor: s.descriptionColor ?? 'text-gray-600',
      descriptionSize: s.descriptionSize ?? null,
      descriptionBorderEnabled: s.descriptionBorderEnabled ?? false,
      descriptionBorderColor: s.descriptionBorderColor ?? '#000000',
      descriptionBorderWidth: s.descriptionBorderWidth ?? '1px',
      descriptionShadowColor: s.descriptionShadowColor ?? '',
      image: s.image,
      imageUrl: s.imageUrl ?? fallbackTimeline.steps[i]?.imageUrl ?? '',
      imageAlt: s.imageAlt ?? s.imageUrlAlt ?? s.title ?? fallbackTimeline.steps[i]?.title ?? '',
    })) : fallbackTimeline.steps,
  }

  const additionalSectionsData = {
    doYouKnow: {
      ...additionalSections.doYouKnow,
      heading: sanity?.doYouKnowSection?.heading ?? additionalSections.doYouKnow.heading,
      headingColor: sanity?.doYouKnowSection?.headingColor ?? 'text-gray-900',
      headingSize: sanity?.doYouKnowSection?.headingSize ?? null,
      headingBorderEnabled: sanity?.doYouKnowSection?.headingBorderEnabled ?? false,
      headingBorderColor: sanity?.doYouKnowSection?.headingBorderColor ?? '#000000',
      headingBorderWidth: sanity?.doYouKnowSection?.headingBorderWidth ?? '1px',
      headingShadowColor: sanity?.doYouKnowSection?.headingShadowColor ?? '',
      content: sanity?.doYouKnowSection?.content ?? additionalSections.doYouKnow.content,
      contentColor: sanity?.doYouKnowSection?.contentColor ?? 'text-white',
      contentSize: sanity?.doYouKnowSection?.contentSize ?? null,
      contentBorderEnabled: sanity?.doYouKnowSection?.contentBorderEnabled ?? false,
      contentBorderColor: sanity?.doYouKnowSection?.contentBorderColor ?? '#000000',
      contentBorderWidth: sanity?.doYouKnowSection?.contentBorderWidth ?? '1px',
      contentShadowColor: sanity?.doYouKnowSection?.contentShadowColor ?? '',
    },
    bunkerRefueling: {
      ...additionalSections.bunkerRefueling,
      heading: sanity?.bunkerRefuelingSection?.heading ?? additionalSections.bunkerRefueling.heading,
      headingColor: sanity?.bunkerRefuelingSection?.headingColor ?? 'text-gray-900',
      headingSize: sanity?.bunkerRefuelingSection?.headingSize ?? null,
      headingBorderEnabled: sanity?.bunkerRefuelingSection?.headingBorderEnabled ?? false,
      headingBorderColor: sanity?.bunkerRefuelingSection?.headingBorderColor ?? '#000000',
      headingBorderWidth: sanity?.bunkerRefuelingSection?.headingBorderWidth ?? '1px',
      headingShadowColor: sanity?.bunkerRefuelingSection?.headingShadowColor ?? '',
      content: sanity?.bunkerRefuelingSection?.content ?? additionalSections.bunkerRefueling.content,
      contentColor: sanity?.bunkerRefuelingSection?.contentColor ?? 'text-gray-600',
      contentSize: sanity?.bunkerRefuelingSection?.contentSize ?? null,
      contentBorderEnabled: sanity?.bunkerRefuelingSection?.contentBorderEnabled ?? false,
      contentBorderColor: sanity?.bunkerRefuelingSection?.contentBorderColor ?? '#000000',
      contentBorderWidth: sanity?.bunkerRefuelingSection?.contentBorderWidth ?? '1px',
      contentShadowColor: sanity?.bunkerRefuelingSection?.contentShadowColor ?? '',
      ctaText: sanity?.bunkerRefuelingSection?.ctaText ?? additionalSections.bunkerRefueling.ctaText,
      ctaLink: sanity?.bunkerRefuelingSection?.ctaLink ?? additionalSections.bunkerRefueling.ctaLink,
      ctaTextColor: sanity?.bunkerRefuelingSection?.ctaTextColor ?? 'text-primary',
      ctaTextSize: sanity?.bunkerRefuelingSection?.ctaTextSize ?? null,
      ctaTextBorderEnabled: sanity?.bunkerRefuelingSection?.ctaTextBorderEnabled ?? false,
      ctaTextBorderColor: sanity?.bunkerRefuelingSection?.ctaTextBorderColor ?? '#000000',
      ctaTextBorderWidth: sanity?.bunkerRefuelingSection?.ctaTextBorderWidth ?? '1px',
      ctaTextShadowColor: sanity?.bunkerRefuelingSection?.ctaTextShadowColor ?? '',
      imageUrl: sanity?.bunkerRefuelingSection?.imageUrl ?? additionalSections.bunkerRefueling.imageUrl,
      imageImage: sanity?.bunkerRefuelingSection?.imageImage,
      imageAlt: sanity?.bunkerRefuelingSection?.imageAlt ?? sanity?.bunkerRefuelingSection?.imageUrlAlt ?? additionalSections.bunkerRefueling.imageAlt,
    },
    ownStation: {
      ...additionalSections.ownStation,
      heading: sanity?.ownStationSection?.heading ?? additionalSections.ownStation.heading,
      headingColor: sanity?.ownStationSection?.headingColor ?? 'text-gray-900',
      headingSize: sanity?.ownStationSection?.headingSize ?? null,
      headingBorderEnabled: sanity?.ownStationSection?.headingBorderEnabled ?? false,
      headingBorderColor: sanity?.ownStationSection?.headingBorderColor ?? '#000000',
      headingBorderWidth: sanity?.ownStationSection?.headingBorderWidth ?? '1px',
      headingShadowColor: sanity?.ownStationSection?.headingShadowColor ?? '',
      content: sanity?.ownStationSection?.content ?? additionalSections.ownStation.content,
      contentColor: sanity?.ownStationSection?.contentColor ?? 'text-gray-600',
      contentSize: sanity?.ownStationSection?.contentSize ?? null,
      contentBorderEnabled: sanity?.ownStationSection?.contentBorderEnabled ?? false,
      contentBorderColor: sanity?.ownStationSection?.contentBorderColor ?? '#000000',
      contentBorderWidth: sanity?.ownStationSection?.contentBorderWidth ?? '1px',
      contentShadowColor: sanity?.ownStationSection?.contentShadowColor ?? '',
      primaryCTAText: sanity?.ownStationSection?.primaryCTAText ?? 'Learn More',
      primaryCTAColor: sanity?.ownStationSection?.primaryCTAColor ?? 'text-white',
      primaryCTASize: sanity?.ownStationSection?.primaryCTASize ?? null,
      primaryCTABorderEnabled: sanity?.ownStationSection?.primaryCTABorderEnabled ?? false,
      primaryCTABorderColor: sanity?.ownStationSection?.primaryCTABorderColor ?? '#000000',
      primaryCTABorderWidth: sanity?.ownStationSection?.primaryCTABorderWidth ?? '1px',
      primaryCTAShadowColor: sanity?.ownStationSection?.primaryCTAShadowColor ?? '',
      primaryCTALink: sanity?.ownStationSection?.primaryCTALink ?? '/franchising',
      secondaryCTAText: sanity?.ownStationSection?.secondaryCTAText ?? 'Enquire Now',
      secondaryCTAColor: sanity?.ownStationSection?.secondaryCTAColor ?? 'text-primary',
      secondaryCTASize: sanity?.ownStationSection?.secondaryCTASize ?? null,
      secondaryCTABorderEnabled: sanity?.ownStationSection?.secondaryCTABorderEnabled ?? false,
      secondaryCTABorderColor: sanity?.ownStationSection?.secondaryCTABorderColor ?? '#000000',
      secondaryCTABorderWidth: sanity?.ownStationSection?.secondaryCTABorderWidth ?? '1px',
      secondaryCTAShadowColor: sanity?.ownStationSection?.secondaryCTAShadowColor ?? '',
      secondaryCTALink: sanity?.ownStationSection?.secondaryCTALink ?? '/contact',
      imageUrl: sanity?.ownStationSection?.imageUrl ?? additionalSections.ownStation.imageUrl,
      imageImage: sanity?.ownStationSection?.imageImage,
      imageAlt: sanity?.ownStationSection?.imageAlt ?? sanity?.ownStationSection?.imageUrlAlt ?? additionalSections.ownStation.imageAlt,
    },
    sectorsCover: {
      ...additionalSections.sectorsCover,
      heading: sanity?.sectorsCoverSection?.heading ?? additionalSections.sectorsCover.heading,
      headingColor: sanity?.sectorsCoverSection?.headingColor ?? 'text-gray-900',
      headingSize: sanity?.sectorsCoverSection?.headingSize ?? null,
      headingBorderEnabled: sanity?.sectorsCoverSection?.headingBorderEnabled ?? false,
      headingBorderColor: sanity?.sectorsCoverSection?.headingBorderColor ?? '#000000',
      headingBorderWidth: sanity?.sectorsCoverSection?.headingBorderWidth ?? '1px',
      headingShadowColor: sanity?.sectorsCoverSection?.headingShadowColor ?? '',
      content: sanity?.sectorsCoverSection?.content ?? additionalSections.sectorsCover.content,
      contentColor: sanity?.sectorsCoverSection?.contentColor ?? 'text-gray-600',
      contentSize: sanity?.sectorsCoverSection?.contentSize ?? null,
      contentBorderEnabled: sanity?.sectorsCoverSection?.contentBorderEnabled ?? false,
      contentBorderColor: sanity?.sectorsCoverSection?.contentBorderColor ?? '#000000',
      contentBorderWidth: sanity?.sectorsCoverSection?.contentBorderWidth ?? '1px',
      contentShadowColor: sanity?.sectorsCoverSection?.contentShadowColor ?? '',
      sectors: Array.isArray(sanity?.sectorsCoverSection?.sectors) ? sanity.sectorsCoverSection.sectors.map((s, i) => ({
        _key: s._key,
        name: s.name ?? additionalSections.sectorsCover.sectors[i]?.name ?? '',
        nameColor: s.nameColor ?? 'text-gray-900',
        nameSize: s.nameSize ?? null,
        nameBorderEnabled: s.nameBorderEnabled ?? false,
        nameBorderColor: s.nameBorderColor ?? '#000000',
        nameBorderWidth: s.nameBorderWidth ?? '1px',
        nameShadowColor: s.nameShadowColor ?? '',
        description: s.description ?? additionalSections.sectorsCover.sectors[i]?.description ?? '',
        descriptionColor: s.descriptionColor ?? 'text-gray-600',
        descriptionSize: s.descriptionSize ?? null,
        descriptionBorderEnabled: s.descriptionBorderEnabled ?? false,
        descriptionBorderColor: s.descriptionBorderColor ?? '#000000',
        descriptionBorderWidth: s.descriptionBorderWidth ?? '1px',
        descriptionShadowColor: s.descriptionShadowColor ?? '',
        imageUrl: s.imageUrl ?? additionalSections.sectorsCover.sectors[i]?.imageUrl ?? '',
        imageImage: s.imageImage,
        imageAlt: s.imageAlt ?? s.imageUrlAlt ?? s.name ?? additionalSections.sectorsCover.sectors[i]?.name ?? '',
      })) : additionalSections.sectorsCover.sectors,
    },
  }

  const industriesGrid = {
    sectionTag: sanity?.industriesGridSection?.sectionTag ?? 'Industries',
    sectionTagColor: sanity?.industriesGridSection?.sectionTagColor ?? 'text-primary',
    sectionTagSize: sanity?.industriesGridSection?.sectionTagSize ?? null,
    sectionTagBorderEnabled: sanity?.industriesGridSection?.sectionTagBorderEnabled ?? false,
    sectionTagBorderColor: sanity?.industriesGridSection?.sectionTagBorderColor ?? '#000000',
    sectionTagBorderWidth: sanity?.industriesGridSection?.sectionTagBorderWidth ?? '1px',
    sectionTagShadowColor: sanity?.industriesGridSection?.sectionTagShadowColor ?? '',
    ctaLabel: sanity?.industriesGridSection?.ctaLabel ?? 'Explore',
    heading: sanity?.industriesGridSection?.heading ?? 'Sectors We Serve',
    headingColor: sanity?.industriesGridSection?.headingColor ?? 'text-gray-900',
    headingSize: sanity?.industriesGridSection?.headingSize ?? null,
    headingBorderEnabled: sanity?.industriesGridSection?.headingBorderEnabled ?? false,
    headingBorderColor: sanity?.industriesGridSection?.headingBorderColor ?? '#000000',
    headingBorderWidth: sanity?.industriesGridSection?.headingBorderWidth ?? '1px',
    headingShadowColor: sanity?.industriesGridSection?.headingShadowColor ?? '',
    description: sanity?.industriesGridSection?.description ?? 'Delivering reliable fuel solutions across diverse industries nationwide',
    descriptionColor: sanity?.industriesGridSection?.descriptionColor ?? 'text-gray-600',
    descriptionSize: sanity?.industriesGridSection?.descriptionSize ?? null,
    descriptionBorderEnabled: sanity?.industriesGridSection?.descriptionBorderEnabled ?? false,
    descriptionBorderColor: sanity?.industriesGridSection?.descriptionBorderColor ?? '#000000',
    descriptionBorderWidth: sanity?.industriesGridSection?.descriptionBorderWidth ?? '1px',
    descriptionShadowColor: sanity?.industriesGridSection?.descriptionShadowColor ?? '',
    industries: Array.isArray(sanity?.industriesGridSection?.industries)
      ? sanity.industriesGridSection.industries.map(ind => ({
          _key: ind._key,
          id: ind.id ?? 'distribution',
          title: ind.title ?? '',
          titleColor: ind.titleColor ?? 'text-gray-900',
          titleSize: ind.titleSize ?? null,
          titleBorderEnabled: ind.titleBorderEnabled ?? false,
          titleBorderColor: ind.titleBorderColor ?? '#000000',
          titleBorderWidth: ind.titleBorderWidth ?? '1px',
          titleShadowColor: ind.titleShadowColor ?? '',
          description: ind.description ?? '',
          descriptionColor: ind.descriptionColor ?? 'text-gray-600',
          descriptionSize: ind.descriptionSize ?? null,
          descriptionBorderEnabled: ind.descriptionBorderEnabled ?? false,
          descriptionBorderColor: ind.descriptionBorderColor ?? '#000000',
          descriptionBorderWidth: ind.descriptionBorderWidth ?? '1px',
          descriptionShadowColor: ind.descriptionShadowColor ?? '',
          link: ind.link ?? '#',
          ctaText: ind.ctaText ?? '',
        }))
      : null,
  }

  const siteSettings = mapPageCta(sanity, globalSettings, fallbackSiteSettings)

  // Create style objects for inline sections
  const doYouKnowHeadingStyle = {
    ...(additionalSectionsData.doYouKnow.headingSize && { fontSize: sizeMap[additionalSectionsData.doYouKnow.headingSize] }),
    ...(additionalSectionsData.doYouKnow.headingBorderEnabled && {
      WebkitTextStroke: `${additionalSectionsData.doYouKnow.headingBorderWidth} ${additionalSectionsData.doYouKnow.headingBorderColor}`,
      ...(additionalSectionsData.doYouKnow.headingShadowColor && { textShadow: `0 0 10px ${additionalSectionsData.doYouKnow.headingShadowColor}` }),
    }),
  }
  const doYouKnowContentStyle = {
    ...(additionalSectionsData.doYouKnow.contentSize && { fontSize: sizeMap[additionalSectionsData.doYouKnow.contentSize] }),
    ...(additionalSectionsData.doYouKnow.contentBorderEnabled && {
      WebkitTextStroke: `${additionalSectionsData.doYouKnow.contentBorderWidth} ${additionalSectionsData.doYouKnow.contentBorderColor}`,
      ...(additionalSectionsData.doYouKnow.contentShadowColor && { textShadow: `0 0 10px ${additionalSectionsData.doYouKnow.contentShadowColor}` }),
    }),
  }

  const bunkerRefuelingHeadingStyle = {
    ...(additionalSectionsData.bunkerRefueling.headingSize && { fontSize: sizeMap[additionalSectionsData.bunkerRefueling.headingSize] }),
    ...(additionalSectionsData.bunkerRefueling.headingBorderEnabled && {
      WebkitTextStroke: `${additionalSectionsData.bunkerRefueling.headingBorderWidth} ${additionalSectionsData.bunkerRefueling.headingBorderColor}`,
      ...(additionalSectionsData.bunkerRefueling.headingShadowColor && { textShadow: `0 0 10px ${additionalSectionsData.bunkerRefueling.headingShadowColor}` }),
    }),
  }
  const bunkerRefuelingContentStyle = {
    ...(additionalSectionsData.bunkerRefueling.contentSize && { fontSize: sizeMap[additionalSectionsData.bunkerRefueling.contentSize] }),
    ...(additionalSectionsData.bunkerRefueling.contentBorderEnabled && {
      WebkitTextStroke: `${additionalSectionsData.bunkerRefueling.contentBorderWidth} ${additionalSectionsData.bunkerRefueling.contentBorderColor}`,
      ...(additionalSectionsData.bunkerRefueling.contentShadowColor && { textShadow: `0 0 10px ${additionalSectionsData.bunkerRefueling.contentShadowColor}` }),
    }),
  }
  const bunkerRefuelingCTAStyle = {
    ...(additionalSectionsData.bunkerRefueling.ctaTextSize && { fontSize: sizeMap[additionalSectionsData.bunkerRefueling.ctaTextSize] }),
    ...(additionalSectionsData.bunkerRefueling.ctaTextBorderEnabled && {
      WebkitTextStroke: `${additionalSectionsData.bunkerRefueling.ctaTextBorderWidth} ${additionalSectionsData.bunkerRefueling.ctaTextBorderColor}`,
      ...(additionalSectionsData.bunkerRefueling.ctaTextShadowColor && { textShadow: `0 0 10px ${additionalSectionsData.bunkerRefueling.ctaTextShadowColor}` }),
    }),
  }

  const ownStationHeadingStyle = {
    ...(additionalSectionsData.ownStation.headingSize && { fontSize: sizeMap[additionalSectionsData.ownStation.headingSize] }),
    ...(additionalSectionsData.ownStation.headingBorderEnabled && {
      WebkitTextStroke: `${additionalSectionsData.ownStation.headingBorderWidth} ${additionalSectionsData.ownStation.headingBorderColor}`,
      ...(additionalSectionsData.ownStation.headingShadowColor && { textShadow: `0 0 10px ${additionalSectionsData.ownStation.headingShadowColor}` }),
    }),
  }
  const ownStationContentStyle = {
    ...(additionalSectionsData.ownStation.contentSize && { fontSize: sizeMap[additionalSectionsData.ownStation.contentSize] }),
    ...(additionalSectionsData.ownStation.contentBorderEnabled && {
      WebkitTextStroke: `${additionalSectionsData.ownStation.contentBorderWidth} ${additionalSectionsData.ownStation.contentBorderColor}`,
      ...(additionalSectionsData.ownStation.contentShadowColor && { textShadow: `0 0 10px ${additionalSectionsData.ownStation.contentShadowColor}` }),
    }),
  }
  const ownStationPrimaryCTAStyle = {
    ...(additionalSectionsData.ownStation.primaryCTASize && { fontSize: sizeMap[additionalSectionsData.ownStation.primaryCTASize] }),
    ...(additionalSectionsData.ownStation.primaryCTABorderEnabled && {
      WebkitTextStroke: `${additionalSectionsData.ownStation.primaryCTABorderWidth} ${additionalSectionsData.ownStation.primaryCTABorderColor}`,
      ...(additionalSectionsData.ownStation.primaryCTAShadowColor && { textShadow: `0 0 10px ${additionalSectionsData.ownStation.primaryCTAShadowColor}` }),
    }),
  }
  const ownStationSecondaryCTAStyle = {
    ...(additionalSectionsData.ownStation.secondaryCTASize && { fontSize: sizeMap[additionalSectionsData.ownStation.secondaryCTASize] }),
    ...(additionalSectionsData.ownStation.secondaryCTABorderEnabled && {
      WebkitTextStroke: `${additionalSectionsData.ownStation.secondaryCTABorderWidth} ${additionalSectionsData.ownStation.secondaryCTABorderColor}`,
      ...(additionalSectionsData.ownStation.secondaryCTAShadowColor && { textShadow: `0 0 10px ${additionalSectionsData.ownStation.secondaryCTAShadowColor}` }),
    }),
  }

  const sectorsCoverHeadingStyle = {
    ...(additionalSectionsData.sectorsCover.headingSize && { fontSize: sizeMap[additionalSectionsData.sectorsCover.headingSize] }),
    ...(additionalSectionsData.sectorsCover.headingBorderEnabled && {
      WebkitTextStroke: `${additionalSectionsData.sectorsCover.headingBorderWidth} ${additionalSectionsData.sectorsCover.headingBorderColor}`,
      ...(additionalSectionsData.sectorsCover.headingShadowColor && { textShadow: `0 0 10px ${additionalSectionsData.sectorsCover.headingShadowColor}` }),
    }),
  }
  const sectorsCoverContentStyle = {
    ...(additionalSectionsData.sectorsCover.contentSize && { fontSize: sizeMap[additionalSectionsData.sectorsCover.contentSize] }),
    ...(additionalSectionsData.sectorsCover.contentBorderEnabled && {
      WebkitTextStroke: `${additionalSectionsData.sectorsCover.contentBorderWidth} ${additionalSectionsData.sectorsCover.contentBorderColor}`,
      ...(additionalSectionsData.sectorsCover.contentShadowColor && { textShadow: `0 0 10px ${additionalSectionsData.sectorsCover.contentShadowColor}` }),
    }),
  }

  return (
    <>
      <ServiceHero data={hero} />
        <ServicesShowcase data={services} />
        <VisualIndustriesGrid data={industriesGrid} />
        <AnimatedStatsSection data={stats} />
        
        {/* Do You Know Section */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="max-w-3xl">
              <h2 className={`${additionalSectionsData.doYouKnow.headingColor} text-3xl lg:text-4xl font-bold mb-6`} style={doYouKnowHeadingStyle}>{additionalSectionsData.doYouKnow.heading}</h2>
              <p className={`${additionalSectionsData.doYouKnow.contentColor} text-lg text-white/90 leading-relaxed`} style={doYouKnowContentStyle}>{additionalSectionsData.doYouKnow.content}</p>
            </div>
          </div>
        </section>

        {/* Sectors We Cover Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className={`${additionalSectionsData.sectorsCover.headingColor} text-3xl lg:text-4xl font-bold text-gray-900 mb-6`} style={sectorsCoverHeadingStyle}>{additionalSectionsData.sectorsCover.heading}</h2>
              <p className={`${additionalSectionsData.sectorsCover.contentColor} text-lg text-gray-600 leading-relaxed`} style={sectorsCoverContentStyle}>{additionalSectionsData.sectorsCover.content}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalSectionsData.sectorsCover.sectors.map((sector, index) => {
                const sectorNameStyle = {
                  ...(sector.nameSize && { fontSize: sizeMap[sector.nameSize] }),
                  ...(sector.nameBorderEnabled && {
                    WebkitTextStroke: `${sector.nameBorderWidth} ${sector.nameBorderColor}`,
                    ...(sector.nameShadowColor && { textShadow: `0 0 10px ${sector.nameShadowColor}` }),
                  }),
                }
                const sectorDescStyle = {
                  ...(sector.descriptionSize && { fontSize: sizeMap[sector.descriptionSize] }),
                  ...(sector.descriptionBorderEnabled && {
                    WebkitTextStroke: `${sector.descriptionBorderWidth} ${sector.descriptionBorderColor}`,
                    ...(sector.descriptionShadowColor && { textShadow: `0 0 10px ${sector.descriptionShadowColor}` }),
                  }),
                }
                return (
                  <div key={index} className="bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <CmsImage
                        value={sector.imageImage ?? sector.image ?? sector.imageUrl}
                        alt={sector.imageAlt ?? sector.name ?? ''}
                        width={800}
                        height={600}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className={`${sector.nameColor} text-xl font-bold text-gray-900 mb-2`} style={sectorNameStyle}>{sector.name}</h3>
                      <p className={`${sector.descriptionColor} text-gray-600 text-sm`} style={sectorDescStyle}>{sector.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Bunker Refueling Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className={`${additionalSectionsData.bunkerRefueling.headingColor} text-3xl lg:text-4xl font-bold text-gray-900 mb-6`} style={bunkerRefuelingHeadingStyle}>{additionalSectionsData.bunkerRefueling.heading}</h2>
                <p className={`${additionalSectionsData.bunkerRefueling.contentColor} text-lg text-gray-600 leading-relaxed mb-6`} style={bunkerRefuelingContentStyle}>{additionalSectionsData.bunkerRefueling.content}</p>
                <a href={additionalSectionsData.bunkerRefueling.ctaLink} className={`inline-flex items-center gap-2 ${additionalSectionsData.bunkerRefueling.ctaTextColor} font-semibold hover:underline`} style={bunkerRefuelingCTAStyle}>
                  {additionalSectionsData.bunkerRefueling.ctaText}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
              <div className="relative h-[400px] overflow-hidden">
                <CmsImage
                  value={additionalSectionsData.bunkerRefueling.imageImage ?? additionalSectionsData.bunkerRefueling.imageUrl}
                  alt={additionalSectionsData.bunkerRefueling.imageAlt ?? ''}
                  width={1200}
                  height={900}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Own a Fuel Station Section */}
        <section className="py-16 lg:py-24 bg-sand">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] overflow-hidden lg:order-1">
                <CmsImage
                  value={additionalSectionsData.ownStation.imageImage ?? additionalSectionsData.ownStation.imageUrl}
                  alt={additionalSectionsData.ownStation.imageAlt ?? ''}
                  width={1200}
                  height={900}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="lg:order-2">
                <h2 className={`${additionalSectionsData.ownStation.headingColor} text-3xl lg:text-4xl font-bold text-gray-900 mb-6`} style={ownStationHeadingStyle}>{additionalSectionsData.ownStation.heading}</h2>
                <p className={`${additionalSectionsData.ownStation.contentColor} text-lg text-gray-600 leading-relaxed mb-6`} style={ownStationContentStyle}>{additionalSectionsData.ownStation.content}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={additionalSectionsData.ownStation.primaryCTALink} className={`px-6 py-3 bg-primary ${additionalSectionsData.ownStation.primaryCTAColor} font-semibold uppercase tracking-wider hover:bg-primary-dark transition-colors text-center`} style={ownStationPrimaryCTAStyle}>
                    {additionalSectionsData.ownStation.primaryCTAText}
                  </a>
                  <a href={additionalSectionsData.ownStation.secondaryCTALink} className={`px-6 py-3 border-2 border-primary ${additionalSectionsData.ownStation.secondaryCTAColor} font-semibold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors text-center`} style={ownStationSecondaryCTAStyle}>
                    {additionalSectionsData.ownStation.secondaryCTAText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      <ProcessTimeline data={timeline} />
      <CTABanner data={siteSettings} />
    </>
  )
}
