import { getFuelStationEnquiryPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { arrayOrFallback, mapPageCta, valueOrFallback } from '@/lib/contentFallbacks'
import {loadPageMetadata} from '@/lib/metadata'
import FranchisingHero from '@/components/franchising/FranchisingHero'
import FranchisingClient from '@/components/franchising/FranchisingClient'

export function generateMetadata() {
  return loadPageMetadata({
    getPage: getFuelStationEnquiryPage,
    getSiteSettings,
    path: '/fuel-station-enquiry',
    fallbackTitle: 'Fuel Station Enquiry | Atlas Fuel Australia',
    fallbackDescription: 'Enquire about fuel station franchising opportunities with Atlas Fuel. Join a trusted brand with proven business model and comprehensive support.',
  })
}

const fallbackData = {
  heroSubtitle: 'Fuel Station Enquiry',
  heroTitle: 'Own Your Own Atlas Fuel Station',
  heroDescription: 'Atlas Fuel Australia offers a unique franchise opportunity with a proven business model and comprehensive support. Partnering with Atlas Fuel means joining a trusted brand that values community and excellence.',
  heroImageUrl: '/images/independent-fuel-stations.jpg',
  heroImageAlt: 'Atlas Fuel independent fuel station',
  ctaButtons: [
    {text: 'Enquire Now', href: '/contact'},
    {text: 'View Benefits', href: '#benefits'},
  ],
}

const fallbackSiteSettings = {
  ctaBannerHeading: 'Ready to Start Your Journey?',
  ctaBannerText: 'Contact us today to learn more about franchise opportunities and take the first step toward owning your own fuel station.',
  ctaBannerButtonText: 'Enquire Now',
  ctaBannerButtonLink: '/contact',
}

const fallbackSections = {
  intro: {
    eyebrow: 'Franchise',
    heading: 'Atlas Franchise',
    description: 'Atlas Fuel Australia offers a unique franchise opportunity with a proven business model and comprehensive support. Our focus on innovation, sustainability, and customer satisfaction ensures franchisees thrive in a competitive market.',
    image: '/images/what-we-do-retail.webp',
    imageAlt: 'Atlas Fuel franchise station',
  },
  benefitsHeading: 'Why Choose Atlas Fuel?',
  benefitsDescription: 'We provide everything you need to build a successful fuel station business.',
  benefits: [
    {title: 'Leadership', description: 'Build and lead a motivated team with the backing of an established Australian fuel brand.', icon: 'chart'},
    {title: 'Values and Sustainability', description: 'Join a responsible network committed to communities, safety, and sustainable growth.', icon: 'support'},
    {title: 'Business Expertise', description: 'Use proven systems, training, marketing, and supply-chain support to operate confidently.', icon: 'graduation'},
  ],
  journey: {
    heading: 'Success Journey',
    description: 'Your path to franchise success',
    steps: [
      {step: '01', title: 'Initial Enquiry', description: 'Contact our team to discuss your goals, experience, and preferred location.'},
      {step: '02', title: 'Application and Assessment', description: 'Complete the franchise application and suitability assessment.'},
      {step: '03', title: 'Site and Training', description: 'Select the right site and complete comprehensive operational training.'},
      {step: '04', title: 'Launch and Support', description: 'Open your Atlas Fuel station with ongoing marketing and operational support.'},
    ],
  },
  training: {
    heading: 'Training and Support',
    description: 'Our comprehensive program covers operations, safety, customer service, inventory, marketing, and financial management.',
    features: ['Fuel handling and safety', 'Customer service excellence', 'Inventory and supply management', 'Marketing support', 'Financial reporting', 'Compliance certification'],
    image: '/images/atlas-fuel-hero-1b.webp',
    imageAlt: 'Atlas Fuel franchise training',
  },
  investment: {
    heading: 'Investment Overview',
    description: 'A transparent structure tailored to the site and opportunity.',
    points: [
      {label: 'Franchise Fee', value: 'Competitive rates'},
      {label: 'Initial Investment', value: 'Site dependent'},
      {label: 'Training', value: 'Included'},
      {label: 'Support', value: '24/7 Available'},
    ],
  },
  international: {
    eyebrow: 'International Enquiries',
    heading: 'Available 24/7 for International Clients',
    description: 'We are available around the clock to look after international clients. Contact us through WhatsApp at any time.',
    whatsappNumber: '+61 428 935 216',
    whatsappUrl: 'https://wa.me/61428935216',
    buttonText: 'WhatsApp Us',
  },
}

export default async function FuelStationEnquiryPage() {
  const [sanity, siteSettings] = await Promise.all([
    getFuelStationEnquiryPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const data = mergeWithFallback(fallbackData, sanity)
  const settings = mapPageCta(sanity, siteSettings, fallbackSiteSettings)

  const heroData = {
    subtitle: data.heroSubtitle,
    title: data.heroTitle,
    description: data.heroDescription,
    heroImage: data.heroImage ?? data.heroImageUrl,
    heroImageAlt: data.heroImageAlt ?? data.heroImageUrlAlt ?? fallbackData.heroImageAlt,
    ctaButtons: arrayOrFallback(
      sanity?.heroSection?.ctaButtons ?? sanity?.ctaButtons,
      fallbackData.ctaButtons
    ),
  }
  const franchisingData = {
    intro: mergeWithFallback(fallbackSections.intro, sanity?.introSection),
    benefitsHeading: valueOrFallback(sanity?.benefitsSection?.heading, fallbackSections.benefitsHeading),
    benefitsDescription: valueOrFallback(sanity?.benefitsSection?.description, fallbackSections.benefitsDescription),
    benefits: arrayOrFallback(sanity?.benefitsSection?.benefits, fallbackSections.benefits),
    journey: mergeWithFallback(fallbackSections.journey, sanity?.journeySection),
    training: mergeWithFallback(fallbackSections.training, sanity?.trainingSection),
    investment: mergeWithFallback(fallbackSections.investment, sanity?.investmentSection),
    international: mergeWithFallback(fallbackSections.international, sanity?.internationalSection),
  }

  return (
    <>
      
        <FranchisingHero data={heroData} />
        <FranchisingClient franchisingData={franchisingData} siteSettings={settings} />
      
    </>
  )
}
