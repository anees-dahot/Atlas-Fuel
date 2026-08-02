import { getFranchisingPage, getSiteSettings } from '@/lib/sanity'
import { arrayOrFallback, mapPageCta, valueOrFallback } from '@/lib/contentFallbacks'
import {loadPageMetadata} from '@/lib/metadata'
import CTABanner from '@/components/shared/CTABanner'
import ServiceHero from '@/components/services/ServiceHero'
import FranchisingClient from '@/components/franchising/FranchisingClient'

export function generateMetadata() {
  return loadPageMetadata({
    getPage: getFranchisingPage,
    getSiteSettings,
    path: '/franchising',
    fallbackTitle: 'Franchising | Atlas Fuel Australia',
    fallbackDescription: 'Own your own Atlas Fuel station. Join a proven franchise model with comprehensive training and ongoing support.',
  })
}

const fallbackSiteSettings = {
  ctaBannerHeading: 'Ready to Start Your Franchise Journey?',
  ctaBannerText: 'Contact us today to learn more about Atlas Fuel franchise opportunities and take the first step toward owning your own business.',
  ctaBannerButtonText: 'Enquire Now',
  ctaBannerButtonLink: '/contact',
}

const fallbackHero = {
  subtitle: 'Franchising',
  title: 'Be Your Own Boss with Atlas Fuel',
  description: 'Join a growing network of successful fuel station owners. Atlas Fuel offers a proven franchise model with comprehensive training, ongoing support, and the backing of a trusted Australian brand.',
  heroImageUrl: '/images/independent-fuel-stations.jpg',
  heroImageAlt: 'Atlas Fuel station franchise',
}

const fallbackFranchisingData = {
  intro: {
    eyebrow: 'Become Part of Our Growing Family',
    heading: 'Atlas Franchise',
    description: 'We are turning passion into profits for our franchisees. At Atlas Fuel, we believe in empowering entrepreneurs to build successful businesses while delivering quality fuel and service to their communities. Our franchise model is designed for success, combining industry expertise with personalized support.',
    image: '/images/what-we-do-retail.webp',
    imageAlt: 'Atlas Fuel franchise station',
  },
  benefitsHeading: 'Why Choose Atlas Fuel?',
  benefitsDescription: 'We provide everything you need to build a successful fuel station business',
  benefits: [
    {
      title: 'Proven Business Model',
      description: 'Benefit from our established systems, processes, and brand recognition built over years of successful operations across Australia.',
      icon: 'chart',
    },
    {
      title: 'Comprehensive Training',
      description: 'Receive extensive training covering operations, safety, customer service, and business management to ensure your success.',
      icon: 'graduation',
    },
    {
      title: 'Ongoing Support',
      description: 'Our dedicated franchise support team is always available to help with marketing, operations, and any challenges you face.',
      icon: 'support',
    },
    {
      title: 'Marketing Assistance',
      description: 'Leverage our national marketing campaigns and receive local marketing support to drive customers to your station.',
      icon: 'megaphone',
    },
    {
      title: 'Supply Chain Excellence',
      description: 'Enjoy reliable fuel supply through our established relationships with major fuel producers and efficient logistics network.',
      icon: 'truck',
    },
    {
      title: 'Site Selection Help',
      description: 'Our experts assist with site selection, design, and setup to maximize your location potential and customer traffic.',
      icon: 'map',
    },
  ],
  journey: {
    heading: 'Your Success Journey',
    description: 'Your path to franchise success',
    steps: [
      {
        step: '01',
        title: 'Initial Enquiry',
        description: 'Contact us to express your interest. We will discuss your goals, experience, and available opportunities in your preferred location.',
      },
      {
        step: '02',
        title: 'Application & Assessment',
        description: 'Complete our franchise application. We assess your suitability, financial capacity, and commitment to the Atlas Fuel brand values.',
      },
      {
        step: '03',
        title: 'Site Selection',
        description: 'Work with our team to identify and secure the perfect location for your fuel station, considering traffic, demographics, and growth potential.',
      },
      {
        step: '04',
        title: 'Training Program',
        description: 'Undertake comprehensive training covering all aspects of fuel station operations, safety protocols, and business management.',
      },
      {
        step: '05',
        title: 'Station Setup',
        description: 'We guide you through site construction, equipment installation, branding, and pre-launch preparations to ensure a smooth opening.',
      },
      {
        step: '06',
        title: 'Grand Opening',
        description: 'Launch your Atlas Fuel station with our support. We help with marketing, promotions, and ongoing operational guidance.',
      },
    ],
  },
  training: {
    heading: 'Training and Support',
    description: 'We believe in fostering a culture of collaboration and teamwork among our franchisees. Our comprehensive training program ensures you have the knowledge and skills to run a successful fuel station business.',
    features: [
      'Operational training for fuel handling and safety',
      'Customer service excellence programs',
      'Inventory and supply chain management',
      'Marketing and promotional strategies',
      'Financial management and reporting',
      'Health, safety, and compliance certification',
    ],
    image: '/images/atlas-fuel-hero-1b.webp',
    imageAlt: 'Atlas Fuel franchise training and support',
  },
  investment: {
    heading: 'Investment Overview',
    description: 'Transparent investment structure with no hidden costs',
    points: [
      { label: 'Franchise Fee', value: 'Competitive rates' },
      { label: 'Initial Investment', value: 'Site dependent' },
      { label: 'Ongoing Royalty', value: 'Industry standard' },
      { label: 'Marketing Fund', value: 'Shared cost' },
      { label: 'Training', value: 'Included' },
      { label: 'Support', value: '24/7 Available' },
    ],
  },
  international: {
    eyebrow: 'International Enquiries',
    heading: 'Available 24/7 for International Clients',
    description: 'We are available around the clock to look after our international clients. Please don\'t hesitate to contact us via WhatsApp at any time.',
    whatsappNumber: '+61 428 935 216',
    whatsappUrl: 'https://wa.me/61428935216',
    buttonText: 'WhatsApp Us',
  },
}

export default async function FranchisingPage() {
  const [sanity, siteSettings] = await Promise.all([
    getFranchisingPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const intro = sanity?.introSection
  const benefits = sanity?.benefitsSection
  const journey = sanity?.journeySection
  const training = sanity?.trainingSection
  const investment = sanity?.investmentSection
  const international = sanity?.internationalSection

  const hero = {
    subtitle: valueOrFallback(sanity?.heroSubtitle, fallbackHero.subtitle),
    title: valueOrFallback(sanity?.heroTitle, fallbackHero.title),
    description: valueOrFallback(sanity?.heroDescription, fallbackHero.description),
    heroImage: sanity?.heroImage ?? sanity?.heroImageUrl ?? fallbackHero.heroImageUrl,
    heroImageAlt: valueOrFallback(
      sanity?.heroImageAlt ?? sanity?.heroImageUrlAlt,
      fallbackHero.heroImageAlt
    ),
  }

  const franchisingData = {
    intro: {
      eyebrow: valueOrFallback(intro?.eyebrow, fallbackFranchisingData.intro.eyebrow),
      heading: valueOrFallback(intro?.introHeading ?? sanity?.introHeading, fallbackFranchisingData.intro.heading),
      description: valueOrFallback(intro?.introDescription ?? sanity?.introDescription, fallbackFranchisingData.intro.description),
      image: intro?.introImage ?? sanity?.introImage ?? intro?.introImageUrl ?? sanity?.introImageUrl ?? fallbackFranchisingData.intro.image,
      imageAlt: valueOrFallback(
        intro?.introImageAlt ?? sanity?.introImageAlt ?? intro?.introImageUrlAlt ?? sanity?.introImageUrlAlt,
        fallbackFranchisingData.intro.imageAlt
      ),
    },
    benefitsHeading: valueOrFallback(
      benefits?.benefitsHeading ?? sanity?.benefitsHeading,
      fallbackFranchisingData.benefitsHeading
    ),
    benefitsDescription: valueOrFallback(benefits?.description, fallbackFranchisingData.benefitsDescription),
    benefits: arrayOrFallback(benefits?.benefits, fallbackFranchisingData.benefits),
    journey: {
      heading: valueOrFallback(journey?.journeyHeading ?? sanity?.journeyHeading, fallbackFranchisingData.journey.heading),
      description: valueOrFallback(journey?.description, fallbackFranchisingData.journey.description),
      steps: arrayOrFallback(journey?.steps, fallbackFranchisingData.journey.steps),
    },
    training: {
      heading: valueOrFallback(training?.trainingHeading ?? sanity?.trainingHeading, fallbackFranchisingData.training.heading),
      description: valueOrFallback(training?.trainingDescription ?? sanity?.trainingDescription, fallbackFranchisingData.training.description),
      features: arrayOrFallback(training?.features, fallbackFranchisingData.training.features),
      image: training?.trainingImage ?? sanity?.trainingImage ?? training?.trainingImageUrl ?? sanity?.trainingImageUrl ?? fallbackFranchisingData.training.image,
      imageAlt: valueOrFallback(
        training?.trainingImageAlt ?? sanity?.trainingImageAlt ?? training?.trainingImageUrlAlt ?? sanity?.trainingImageUrlAlt,
        fallbackFranchisingData.training.imageAlt
      ),
    },
    investment: {
      heading: valueOrFallback(investment?.investmentHeading ?? sanity?.investmentHeading, fallbackFranchisingData.investment.heading),
      description: valueOrFallback(investment?.description, fallbackFranchisingData.investment.description),
      points: arrayOrFallback(investment?.points, fallbackFranchisingData.investment.points),
    },
    international: {
      eyebrow: valueOrFallback(international?.eyebrow, fallbackFranchisingData.international.eyebrow),
      heading: valueOrFallback(international?.internationalHeading ?? sanity?.internationalHeading, fallbackFranchisingData.international.heading),
      description: valueOrFallback(international?.internationalDescription ?? sanity?.internationalDescription, fallbackFranchisingData.international.description),
      whatsappNumber: valueOrFallback(international?.whatsappNumber, fallbackFranchisingData.international.whatsappNumber),
      whatsappUrl: valueOrFallback(international?.whatsappUrl, fallbackFranchisingData.international.whatsappUrl),
      buttonText: valueOrFallback(international?.buttonText, fallbackFranchisingData.international.buttonText),
    },
  }

  const settings = mapPageCta(sanity, siteSettings, fallbackSiteSettings)

  return (
    <>
      
        <ServiceHero data={hero} />
        <FranchisingClient franchisingData={franchisingData} siteSettings={settings} />
      
    </>
  )
}
