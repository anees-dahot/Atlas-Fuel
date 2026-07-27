import { getFranchisingPage, getSiteSettings } from '@/lib/sanity'
import { mapPageCta } from '@/lib/contentFallbacks'
import { mergeWithFallback } from '@/lib/fallback'
import CTABanner from '@/components/shared/CTABanner'
import ServiceHero from '@/components/services/ServiceHero'
import FranchisingClient from '@/components/franchising/FranchisingClient'

export const metadata = {
  title: 'Franchising | Atlas Fuel Australia',
  description: 'Own your own Atlas Fuel station. Join a proven franchise model with comprehensive training and ongoing support.',
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
}

const fallbackFranchisingData = {
  intro: {
    eyebrow: 'Become Part of Our Growing Family',
    heading: 'Atlas Franchise',
    description: 'We are turning passion into profits for our franchisees. At Atlas Fuel, we believe in empowering entrepreneurs to build successful businesses while delivering quality fuel and service to their communities. Our franchise model is designed for success, combining industry expertise with personalized support.',
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
  cta: {
    heading: 'Start Your Franchise Journey Today',
    description: 'If you have any questions or need help, feel free to contact our team, or you can call us any time. We are here to help you succeed.',
    primaryCta: { text: 'Enquire Now', link: '/contact' },
    secondaryCta: { text: 'Learn More', link: '/about' },
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

  const hero = {
    subtitle: sanity?.heroSubtitle || fallbackHero.subtitle,
    title: sanity?.heroTitle || fallbackHero.title,
    description: sanity?.heroDescription || fallbackHero.description,
    heroImageUrl: sanity?.heroImageUrl || fallbackHero.heroImageUrl,
  }

  const franchisingData = {
    intro: mergeWithFallback({
      eyebrow: fallbackFranchisingData.intro.eyebrow,
      heading: sanity?.introHeading || fallbackFranchisingData.intro.heading,
      description: sanity?.introDescription || fallbackFranchisingData.intro.description,
      imageUrl: sanity?.introImageUrl || '/images/what-we-do-retail.webp',
    }, sanity?.introSection),
    benefitsHeading: sanity?.benefitsSection?.benefitsHeading || sanity?.benefitsHeading || fallbackFranchisingData.benefitsHeading,
    benefitsDescription: sanity?.benefitsSection?.description || fallbackFranchisingData.benefitsDescription,
    benefits: sanity?.benefitsSection?.benefits?.length ? sanity.benefitsSection.benefits : fallbackFranchisingData.benefits,
    journey: mergeWithFallback({
      heading: sanity?.journeyHeading || fallbackFranchisingData.journey.heading,
      description: fallbackFranchisingData.journey.description,
      steps: fallbackFranchisingData.journey.steps,
    }, sanity?.journeySection),
    training: mergeWithFallback({
      heading: sanity?.trainingHeading || fallbackFranchisingData.training.heading,
      description: sanity?.trainingDescription || fallbackFranchisingData.training.description,
      features: fallbackFranchisingData.training.features,
      imageUrl: sanity?.trainingImageUrl || '/images/atlas-fuel-hero-1b.webp',
    }, sanity?.trainingSection),
    investment: mergeWithFallback({
      heading: sanity?.investmentHeading || fallbackFranchisingData.investment.heading,
      description: fallbackFranchisingData.investment.description,
      points: fallbackFranchisingData.investment.points,
    }, sanity?.investmentSection),
    international: mergeWithFallback({
      heading: sanity?.internationalHeading || fallbackFranchisingData.international.heading,
      description: sanity?.internationalDescription || fallbackFranchisingData.international.description,
      whatsappNumber: fallbackFranchisingData.international.whatsappNumber,
      whatsappUrl: fallbackFranchisingData.international.whatsappUrl,
      eyebrow: fallbackFranchisingData.international.eyebrow,
      buttonText: fallbackFranchisingData.international.buttonText,
    }, sanity?.internationalSection),
  }

  const settings = mapPageCta(sanity, siteSettings, fallbackSiteSettings)

  return (
    <>
      
        <ServiceHero data={hero} />
        <FranchisingClient franchisingData={franchisingData} siteSettings={settings} />
      
    </>
  )
}
