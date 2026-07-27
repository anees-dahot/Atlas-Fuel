import { getAtlasCarRacingPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import AtlasCarRacingClient from './AtlasCarRacingClient'

export const metadata = {
  title: 'Atlas Performance Fleet | Atlas Fuel Australia',
  description: 'The Atlas Fuel custom-built Nissan GTR — a symbol of speed, engineering excellence, and community commitment across Western Australia.',
}

const fallbackData = {
  heroTag: 'Atlas Performance Fleet',
  heroTagColor: '#10b981',
  heroTagSize: '14px',
  heroTitle: 'Power. Precision. Community.',
  heroTitleColor: '#000000',
  heroTitleSize: '72px',
  heroSubtitle: 'The Atlas Fuel custom-built Nissan GTR — a symbol of speed, engineering excellence, and our commitment to the communities we serve across Western Australia.',
  heroSubtitleColor: '#374151',
  heroSubtitleSize: '18px',
  heroPlate: '1FAS659',
  heroImageUrl: '/images/truck-new.jpg',
  heroImageAlt: 'Atlas Fuel Nissan GTR Performance Fleet',
  heroPlateLabel: 'Plate',
  heroScrollLabel: 'Scroll',
  specs: [
    {label: 'Base Model', value: 'Nissan GTR R35'},
    {label: 'Body Kit', value: 'Liberty Walk Widebody'},
    {label: 'Livery', value: 'Custom Atlas Fuel'},
    {label: 'Plate', value: '1FAS659'},
    {label: 'Purpose', value: 'Community & Brand'},
    {label: 'Coverage', value: 'Western Australia'},
  ],
  meetGtrHeading: 'Meet the Atlas GTR',
  meetGtrHeadingColor: '#1e3a8a',
  meetGtrHeadingSize: '48px',
  meetGtrDescription: 'The Atlas Fuel custom-built Nissan GTR R35 is more than a high-performance machine — it\'s our statement of passion, precision, and community commitment. Purpose-built for promotional impact, the GTR plays a central role in strengthening strong Western Australian local brand partnerships, supporting charity organisations, and showcasing Atlas Fuel at premier racing events across WA. From charity fundraisers to motorsport showcases, the GTR connects our brand with the community, drives awareness, and fuels excitement wherever it goes. It\'s not just about racing — it\'s about creating lasting relationships, bringing people together, and making an impact that lasts.',
  meetGtrDescriptionColor: '#4b5563',
  meetGtrDescriptionSize: '18px',
  meetGtrCtaText: 'Sponsorship Enquiry',
  meetGtrCtaLink: '/contact',
  meetGtrEyebrow: 'The Machine',
  meetGtrImages: [
    {imageUrl: '/images/atlas-fuel-hero-2.webp', alt: 'Atlas GTR front detail'},
    {imageUrl: '/images/hero-trucks.jpg', alt: 'Atlas GTR rear spoiler'},
    {imageUrl: '/images/fuel-stations.jpg', alt: 'Atlas GTR at city event'},
  ],
  galleryHeading: 'The GTR In Action',
  galleryHeadingColor: '#1e3a8a',
  galleryHeadingSize: '48px',
  galleryEyebrow: 'Performance Gallery',
  galleryImages: [
    {imageUrl: '/images/what-we-do-retail.webp', alt: 'Atlas GTR at speed on track', caption: 'On Track — Atlas GTR R35', featured: true},
    {imageUrl: '/images/fuel-stations.jpg', alt: 'Atlas GTR at Atlas Fuel station', caption: 'At the Station'},
    {imageUrl: '/images/what-we-do-retail.webp', alt: 'Atlas GTR front 3/4 on track', caption: 'Full Speed'},
    {imageUrl: '/images/atlas-fuel-hero-1b.webp', alt: 'Atlas GTR rear with spoiler', caption: 'Liberty Walk Widebody'},
    {imageUrl: '/images/atlas-fuel-hero-1c.webp', alt: 'Atlas GTR Australia Day 2025', caption: 'Australia Day 2025'},
  ],
  pillarsHeading: 'Purpose of the Fleet',
  pillarsHeadingColor: '#1e3a8a',
  pillarsHeadingSize: '48px',
  pillarsEyebrow: 'More Than Racing',
  pillars: [
    {icon: 'community', title: 'Community Events', description: 'The GTR attends fundraisers, charity drives, and community gatherings across Western Australia — bringing people together and putting Atlas Fuel front and centre.'},
    {icon: 'motorsport', title: 'Motorsport Showcases', description: "Displayed at premier motorsport events throughout WA, the GTR represents Atlas Fuel's passion for performance and engineering excellence on and off the track."},
    {icon: 'partnership', title: 'Brand Partnerships', description: 'We actively collaborate with like-minded Western Australian brands, showcasing partnership liveries and sponsorship opportunities that align with our values.'},
    {icon: 'charity', title: 'Charity & Fundraising', description: 'The Atlas GTR has been central to fundraising initiatives, supporting local charities and organisations that make a real difference in Australian communities.'},
  ],
  sponsorshipHeading: 'GTR Sponsorship Opportunities',
  sponsorshipHeadingColor: '#1e3a8a',
  sponsorshipHeadingSize: '48px',
  sponsorshipDescription: 'As a passionate fuel supplier, Atlas takes great pride in performance vehicles. Our initiative to create the custom Nissan GTR is driven by our love for car enthusiasts and our passion for high-performance petroleum products. We are open to collaborating with other like-minded brands. GTR sponsorship opportunities are available now — get in touch to discuss livery placement, event appearances, and co-branded activations.',
  sponsorshipDescriptionColor: '#4b5563',
  sponsorshipDescriptionSize: '18px',
  sponsorshipCtaText: 'Enquire About Sponsorship',
  sponsorshipCtaLink: '/contact',
  sponsorshipEyebrow: 'Partnership',
  sponsorshipBenefits: ['Livery placement & co-branding', 'Event appearances across WA', 'Social media feature content', 'Charity event participation'],
  pradoHeading: 'Atlas Prado — Diesel Test Vehicle',
  pradoHeadingColor: '#1e3a8a',
  pradoHeadingSize: '48px',
  pradoDescription: 'The Atlas Fuel Prado is our benchmark vehicle for premium diesel testing, engineered to showcase the superior performance, efficiency, and reliability of our fuel through real-world trials. The Prado demonstrates how Atlas Premium Diesel delivers cleaner combustion, smoother acceleration, and longer engine life — meaning lower running costs and exceptional value with every litre.',
  pradoDescriptionColor: '#4b5563',
  pradoDescriptionSize: '18px',
  pradoImageUrl: '/images/what-we-do-fuel-transportation.webp',
  pradoImageAlt: 'Atlas Fuel at the station',
  pradoEyebrow: 'Premium Diesel',
  contactHeading: 'Talk to Our Team',
  contactHeadingColor: '#1e3a8a',
  contactHeadingSize: '48px',
  contactDescription: 'Interested in sponsorship, event bookings, or international partnerships? We\'re available 24/7 to discuss opportunities.',
  contactDescriptionColor: '#4b5563',
  contactDescriptionSize: '18px',
  contactEyebrow: 'Get Involved',
  contactMethods: [
    {label: 'WhatsApp', value: '+61 428 935 216', href: 'https://wa.me/61428935216', icon: 'whatsapp'},
    {label: 'Phone', value: '+61 8 6377 7644', href: 'tel:+61863777644', icon: 'phone'},
    {label: 'Email', value: 'info@atlasfuel.com.au', href: 'mailto:info@atlasfuel.com.au', icon: 'email'},
  ],
}

const fallbackSiteSettings = {
  ctaBannerHeading: 'Interested in Sponsorship?',
  ctaBannerText: 'Partner with the Atlas Performance Fleet. Contact our team to explore sponsorship opportunities for the GTR and motorsport events across Western Australia.',
  ctaBannerButtonText: 'Get in Touch',
  ctaBannerButtonLink: '/contact',
}

export default async function AtlasCarRacingPage() {
  const [sanity, siteSettings] = await Promise.all([
    getAtlasCarRacingPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const data = mergeWithFallback(fallbackData, {
    ...sanity,
    specs: sanity?.heroSection?.specs,
    meetGtrImages: sanity?.meetGtrSection?.images,
    galleryImages: sanity?.gallerySection?.images,
    pillars: sanity?.pillarsSection?.pillars,
    sponsorshipBenefits: sanity?.sponsorshipSection?.benefits,
    contactMethods: sanity?.contactSection?.methods,
  })
  const settings = mapPageCta(sanity, siteSettings, fallbackSiteSettings)

  return (
    <>
      <AtlasCarRacingClient data={data} siteSettings={settings} />
    </>
  )
}
