import { getCommunityPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import { loadPageMetadata } from '@/lib/metadata'
import CommunityClient from './CommunityClient'

export function generateMetadata() {
  return loadPageMetadata({
    getPage: getCommunityPage,
    getSiteSettings,
    path: '/community',
    fallbackTitle: 'Community | Atlas Fuel Australia',
    fallbackDescription: 'Atlas Fuel community initiatives, charity events, and partnerships. Giving back to the communities we serve across Australia.',
  })
}

const fallbackData = {
  heroSubtitle: 'Community',
  heroSubtitleColor: 'var(--cms-primary)',
  heroSubtitleSize: '14px',
  heroSubtitleBorderEnabled: false,
  heroSubtitleBorderColor: 'var(--cms-text)',
  heroSubtitleBorderWidth: '1px',
  heroSubtitleShadowColor: '',
  heroTitle: 'Giving Back to Our Communities',
  heroTitleColor: 'var(--cms-background)',
  heroTitleSize: '72px',
  heroTitleBorderEnabled: false,
  heroTitleBorderColor: 'var(--cms-background)',
  heroTitleBorderWidth: '1px',
  heroTitleShadowColor: '',
  heroDescription: 'Atlas Fuel is committed to making a positive impact in the communities we serve. Through charity events, partnerships, and local initiatives, we\'re building stronger communities across Australia.',
  heroDescriptionColor: 'var(--cms-background)',
  heroDescriptionSize: '18px',
  heroDescriptionBorderEnabled: false,
  heroDescriptionBorderColor: 'var(--cms-background)',
  heroDescriptionBorderWidth: '1px',
  heroDescriptionShadowColor: '',
  heroImageUrl: '/images/what-we-do-retail.webp',
  heroImageAlt: 'Atlas Fuel supporting local communities',
  initiativesHeading: 'Our Community Initiatives',
  initiativesHeadingColor: 'var(--cms-text)',
  initiativesHeadingSize: '48px',
  initiativesHeadingBorderEnabled: false,
  initiativesHeadingBorderColor: 'var(--cms-text)',
  initiativesHeadingBorderWidth: '1px',
  initiativesHeadingShadowColor: '',
  initiativesEyebrow: 'What We Do',
  initiatives: [
    {title: 'Charity Events', description: 'Our Performance Fleet proudly attends charity events, community fundraisers, hospital visits, and local showcases. Every appearance is paired with Atlas Fuel goodies, creating unforgettable moments for kids, especially those battling illness.', icon: 'heart'},
    {title: 'Local Partnerships', description: 'We partner with local sports teams, schools, and community organizations to support their programs and events. Our sponsorship helps fund equipment, facilities, and programs that benefit local communities.', icon: 'handshake'},
    {title: 'Community Support', description: 'We provide fuel support during emergencies and natural disasters, ensuring critical services and emergency responders have the fuel they need when it matters most.', icon: 'support'},
    {title: 'Youth Programs', description: 'Our 50+ Talent Rising program trains and employs young people, giving them valuable skills and experience to build lasting careers in the fuel industry.', icon: 'graduation'},
  ],
  genderEqualityHeading: 'Gender Equality',
  genderEqualityHeadingColor: 'var(--cms-text)',
  genderEqualityHeadingSize: '48px',
  genderEqualityHeadingBorderEnabled: false,
  genderEqualityHeadingBorderColor: 'var(--cms-text)',
  genderEqualityHeadingBorderWidth: '1px',
  genderEqualityHeadingShadowColor: '',
  genderEqualityDescription: 'At Atlas Fuel, we are committed to fostering gender equality and inclusivity across all levels of our organisation. We promote equal opportunities regardless of gender, with policies supporting fair treatment, equal pay, and career advancement for all. Our vision is to emerge as a frontrunner in the fuel industry by creatively providing ideal resolutions while introducing economically efficient fuel products to Australian consumers — and we achieve this with a team that reflects the full diversity of Australia.',
  genderEqualityDescriptionColor: 'var(--cms-text)',
  genderEqualityDescriptionSize: '18px',
  genderEqualityDescriptionBorderEnabled: false,
  genderEqualityDescriptionBorderColor: 'var(--cms-text)',
  genderEqualityDescriptionBorderWidth: '1px',
  genderEqualityDescriptionShadowColor: '',
  genderEqualityImageUrl: '/images/work-with-us.jpg',
  genderEqualityImageAlt: 'Gender equality at Atlas Fuel',
  genderEqualityEyebrow: 'Empowering Equality',
  impactHeading: 'Our Impact',
  impactHeadingColor: 'var(--cms-background)',
  impactHeadingSize: '48px',
  impactHeadingBorderEnabled: false,
  impactHeadingBorderColor: 'var(--cms-background)',
  impactHeadingBorderWidth: '1px',
  impactHeadingShadowColor: '',
  stats: [
    {value: '300+', label: 'Jobs Created', description: 'Across Australia'},
    {value: '50+', label: 'Community Partners', description: 'Organizations supported'},
    {value: '25+', label: 'Events Sponsored', description: 'Per year'},
    {value: '50+', label: 'Talent Rising', description: 'Youth trained annually'},
  ],
  supportingLocalsHeading: 'Supporting Locals',
  supportingLocalsHeadingColor: 'var(--cms-text)',
  supportingLocalsHeadingSize: '48px',
  supportingLocalsHeadingBorderEnabled: false,
  supportingLocalsHeadingBorderColor: 'var(--cms-text)',
  supportingLocalsHeadingBorderWidth: '1px',
  supportingLocalsHeadingShadowColor: '',
  supportingLocalsDescription: 'Atlas Fuel helps local customers save money through competitive pricing on petroleum and diesel. We are committed to affordability without compromising quality, with transparent pricing at our strategically located outlets across Australia.',
  supportingLocalsDescriptionColor: 'var(--cms-text)',
  supportingLocalsDescriptionSize: '18px',
  supportingLocalsDescriptionBorderEnabled: false,
  supportingLocalsDescriptionBorderColor: 'var(--cms-text)',
  supportingLocalsDescriptionBorderWidth: '1px',
  supportingLocalsDescriptionShadowColor: '',
  supportingLocalsImageUrl: '/images/what-we-do-retail.webp',
  supportingLocalsImageAlt: 'Atlas Fuel supporting local communities',
  supportingLocalsCtaText: 'Enquire Now',
  supportingLocalsCtaLink: '/contact',
  supportingLocalsEyebrow: 'Fuel Your Savings',
  regionalHeading: 'Supporting Regional Communities',
  regionalHeadingColor: 'var(--cms-text)',
  regionalHeadingSize: '48px',
  regionalHeadingBorderEnabled: false,
  regionalHeadingBorderColor: 'var(--cms-text)',
  regionalHeadingBorderWidth: '1px',
  regionalHeadingShadowColor: '',
  regionalDescription: 'Atlas Fuel is committed to remote communities and businesses across Western Australia, delivering fuel in the harshest environments — including arid outback regions and flood-affected areas. Our resilience and dedication to sustainability ensures regional Australia is never left without reliable energy supply.',
  regionalDescriptionColor: 'var(--cms-text)',
  regionalDescriptionSize: '18px',
  regionalDescriptionBorderEnabled: false,
  regionalDescriptionBorderColor: 'var(--cms-text)',
  regionalDescriptionBorderWidth: '1px',
  regionalDescriptionShadowColor: '',
  regionalEyebrow: 'Powering Regional Australia',
  regionalSubtitle: 'Powering Regional Communities: Atlas Fuel Australia, Driving Growth Beyond the Cities!',
  regionalImages: [
    {imageUrl: '/images/what-we-do-mining-civil.webp', alt: 'Remote delivery'},
    {imageUrl: '/images/what-we-do-fuel-transportation.webp', alt: 'Regional transport'},
    {imageUrl: '/images/agriculture.webp', alt: 'Agricultural communities'},
  ],
  storyHeading: 'Our Community Story',
  storyHeadingColor: 'var(--cms-text)',
  storyHeadingSize: '48px',
  storyHeadingBorderEnabled: false,
  storyHeadingBorderColor: 'var(--cms-text)',
  storyHeadingBorderWidth: '1px',
  storyHeadingShadowColor: '',
  storyContent: 'At Atlas Fuel, we believe that business success and community support go hand in hand. Since our founding, we\'ve been dedicated to giving back to the communities that have supported our growth. From sponsoring local sports teams to visiting children in hospitals, from supporting emergency services to training the next generation of fuel industry professionals, our community initiatives reflect our core values of respect, integrity, and care for others.',
  storyContentColor: 'var(--cms-text)',
  storyContentSize: '18px',
  storyContentBorderEnabled: false,
  storyContentBorderColor: 'var(--cms-text)',
  storyContentBorderWidth: '1px',
  storyContentShadowColor: '',
  storyImageUrl: '/images/work-with-us.jpg',
  storyImageAlt: 'Atlas Fuel community team',
}

const fallbackSiteSettings = {
  ctaBannerHeading: 'Partner With Us',
  ctaBannerText: 'Interested in community partnership or sponsorship opportunities? Contact us to discuss how we can work together.',
  ctaBannerButtonText: 'Contact Us',
  ctaBannerButtonLink: '/contact',
}

export default async function CommunityPage() {
  const [sanity, siteSettings] = await Promise.all([
    getCommunityPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const data = mergeWithFallback(fallbackData, {
    ...sanity,
    initiatives:
      sanity?.initiativesSection?.initiatives ?? sanity?.initiatives,
    stats: sanity?.impactSection?.stats ?? sanity?.stats,
    regionalImages:
      sanity?.regionalSection?.regionalImages ?? sanity?.regionalImages,
  })
  const settings = mapPageCta(sanity, siteSettings, fallbackSiteSettings)

  return (
    <>
      <CommunityClient data={data} siteSettings={settings} />
    </>
  )
}
