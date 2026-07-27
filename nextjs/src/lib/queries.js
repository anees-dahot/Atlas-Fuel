import { groq } from 'next-sanity'
import { client } from '@/lib/sanity'

export const heroQuery = groq`*[_type == "hero"][0]{
  eyebrow, title, description, ctaPrimary, ctaPrimaryLink, ctaSecondary, ctaSecondaryLink,
  "heroImageUrl": heroImage.asset->url, videoUrl, videoTitle, videoSubtitle,
  "videoImageUrl": videoImage.asset->url,
  heroStats[]{ value, label }
}`

export const featureCardsQuery = groq`*[_type == "featureCard"] | order(order asc){
  title, eyebrow, subtitle, link, "imageUrl": image.asset->url
}`

export const sectorsQuery = groq`*[_type == "sector"] | order(order asc){
  title, "slug": slug.current, description, fullDescription, "imageUrl": image.asset->url, stats,
}`

export const visionQuery = groq`*[_type == "visionSection"][0]{
  tag, quote, quoteHighlight, description, ctaText, ctaLink,
  "videoImageUrl": videoImage.asset->url, videoUrl, videoLabel
}`

export const communityQuery = groq`*[_type == "communitySection"][0]{
  tag, heading, description, stats, ctaText, ctaLink
}`

export const aboutQuery = groq`*[_type == "aboutSection"][0]{
  tagline, heading, body, keyPoints,
  "image1Url": image1.asset->url, "image2Url": image2.asset->url,
  stat1Label, stat1Value, stat2Label, stat2Value,
}`

export const certificationsQuery = groq`*[_type == "certificationsSection"][0]{
  tag, heading, description, trustBadgeText, trustBadgeSubtext, certifications
}`

export const peopleQuery = groq`*[_type == "peopleSection"][0]{
  tag, heading, description, ctaText, ctaLink,
  cardHeading, cardDescription, "cardImageUrl": cardImageUrl.asset->url,
  cardBadge, cardStats[]{ icon, value, label },
  cardCtaText, cardCtaLink, stats
}`

export const newsQuery = groq`*[_type == "newsSection"][0]{
  tag, heading, "articles": articles[]{ title, date, author, excerpt, "imageUrl": image.asset->url, link }, viewMoreLink
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  phone, email, address,
  "logoUrl": logo.asset->url,
  footerDescription, facebookUrl, instagramUrl, linkedinUrl,
  ctaBannerHeading, ctaBannerText, ctaBannerButtonText, ctaBannerButtonLink,
  heroQuickLinks[]{ name, href, icon, isEmergency },
}`

export const blogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc)[0...6]{
  title, "slug": slug.current, category, publishedAt, excerpt, "imageUrl": featuredImage.asset->url,
}`

export const teamMembersQuery = groq`*[_type == "teamMember"] | order(order asc){
  name, role, bio, "imageUrl": image.asset->url,
}`

// About Page - individual section queries
export const aboutHeroQuery = groq`*[_type == "aboutHero"][0]{
  subtitle, title, description, "heroImageUrl": heroImage.asset->url
}`

export const aboutIntroStripQuery = groq`*[_type == "aboutIntroStrip"][0]{
  quote, counters
}`

export const aboutValuesQuery = groq`*[_type == "aboutValues"][0]{
  heading, whatWeOffer, ctaText, ctaLink, values
}`

export const aboutBusinessAreasQuery = groq`*[_type == "aboutBusinessAreas"][0]{
  heading, subheading, areas
}`

export const aboutSafetyQuery = groq`*[_type == "aboutSafety"][0]{
  heading, content, "safetyImageUrl": image.asset->url
}`

export const aboutCoreValuesQuery = groq`*[_type == "aboutCoreValues"][0]{
  heading, subheading, values
}`

export const aboutCultureQuery = groq`*[_type == "aboutCulture"][0]{
  heading, description, cultureItems
}`

export const aboutHowWeWorkQuery = groq`*[_type == "aboutHowWeWork"][0]{
  heading, subheading, steps[]{ step, title, description, "imageUrl": image.asset->url }
}`

export const aboutStoryQuery = groq`*[_type == "aboutStory"][0]{
  tagline, heading, body, keyPoints,
  "image1Url": image1.asset->url,
  "image2Url": image2.asset->url,
  stat1Value, stat1Label, stat2Value, stat2Label
}`

export const aboutExcellenceQuery = groq`*[_type == "aboutExcellence"][0]{
  heading, content, ctaText, ctaLink, secondaryCtaText, secondaryCtaLink,
  "excellenceBgUrl": backgroundImage.asset->url
}`

// Mining Fuel Page Queries
export const miningHeroQuery = groq`*[_type == "miningHero"][0]{
  subtitle, title, description, "heroImageUrl": heroImage.asset->url
}`

export const miningFeaturesQuery = groq`*[_type == "miningFeatures"][0]{
  title, subtitle, features[]{ icon, title, description }
}`

export const miningSafetyQuery = groq`*[_type == "miningSafety"][0]{
  heading, content
}`

export const miningComplianceQuery = groq`*[_type == "miningCompliance"][0]{
  heading, content, certifications[]{ name, label }
}`

// Services Main Page Query
export const servicesMainPageQuery = groq`*[_type == "servicesMainPage"][0]{
  heroSubtitle, heroTitle, heroDescription,
  "heroImageUrl": heroImage.asset->url,
  servicesGridHeading, servicesGridSubheading,
  statsHeading, stats,
  processHeading, processSubheading, processSteps,
  doYouKnowHeading, doYouKnowContent,
  sectorsCoverHeading, sectorsCoverContent,
  bunkerHeading, bunkerContent,
  "bunkerImageUrl": bunkerImage.asset->url,
  ownStationHeading, ownStationContent,
  "ownStationImageUrl": ownStationImage.asset->url,
  ctaHeading, ctaDescription, ctaButtonText, ctaButtonLink
}`

// Service Template Query (for individual service pages)
export const serviceTemplateQuery = groq`*[_type == "serviceTemplate" && pageSlug == $slug][0]{
  pageSlug, heroSubtitle, heroTitle, heroDescription,
  "heroImageUrl": heroImage.asset->url,
  introHeading, introContent,
  featuresTitle, featuresSubtitle, features,
  stats,
  processHeading, processSubheading,
  processSteps[]{ step, title, description, "imageUrl": image.asset->url },
  ctaHeading, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink
}`

// Fuel Stations Page Query
export const fuelStationsPageQuery = groq`*[_type == "fuelStationsPage"][0]{
  heroSubtitle, heroTitle, heroDescription,
  "heroImageUrl": heroImage.asset->url,
  featuresHeading, features,
  mapHeading,
  ctaHeading, ctaDescription, ctaButtonText, ctaButtonLink
}`

// Fuel Stations List Query
export const fuelStationsListQuery = groq`*[_type == "fuelStation" && isActive == true] | order(order asc){
  name, "slug": slug.current, address, phone, hours, services,
  latitude, longitude,
  "featuredImageUrl": featuredImage.asset->url
}`

// Fuel Stations Section Queries
export const fuelStationsHeroQuery = groq`*[_type == "fuelStationsHero"][0]{
  subtitle, title, description,
  "heroImageUrl": image.asset->url
}`

export const fuelStationsRetailIntroQuery = groq`*[_type == "fuelStationsRetailIntro"][0]{
  subtitle, title, description, ctaText, ctaLink, secondParagraph,
  "imageUrl": image.asset->url
}`

export const fuelStationsPremiumIntroQuery = groq`*[_type == "fuelStationsPremiumIntro"][0]{
  tagline, content, ctaText, ctaLink
}`

export const fuelStationsIndependentDealersQuery = groq`*[_type == "fuelStationsIndependentDealers"][0]{
  heading, description, ctaText, ctaLink,
  "imageUrl": image.asset->url
}`

export const fuelStationsImageGalleryQuery = groq`*[_type == "fuelStationsImageGallery"][0]{
  heading,
  "images": images[].asset->url
}`

export const fuelStationsStationServiceQuery = groq`*[_type == "fuelStationsStationService"][0]{
  heading, content, question,
  "imageUrl": image.asset->url
}`

export const fuelStationsFuelTypesQuery = groq`*[_type == "fuelStationsFuelTypes"][0]{
  heading, fuelTypes[]{ octane, name, subtitle, description, "imageUrl": image.asset->url }
}`

export const fuelStationsDieselSectionQuery = groq`*[_type == "fuelStationsDieselSection"][0]{
  heading, description, ctaText, ctaLink,
  "imageUrl": image.asset->url
}`

export const fuelStationsStatsQuery = groq`*[_type == "fuelStationsStats"][0]{
  statValue, statLabel
}`

export const fuelStationsFeaturesQuery = groq`*[_type == "fuelStationsFeatures"][0]{
  heading, features
}`

export const fuelStationsExcellenceQuery = groq`*[_type == "fuelStationsExcellence"][0]{
  tagline, content, ctaText, ctaLink
}`

// Fuel Transportation Page Query
export const fuelTransportationPageQuery = groq`*[_type == "fuelTransportationPage"][0]{
  heroSubtitle, heroTitle, heroDescription,
  "heroImageUrl": heroImage.asset->url,
  fleetHeading, fleetDescription, fleetStats,
  coverageHeading, coverageAreas,
  featuresHeading, features,
  safetyHeading, safetyContent, certifications,
  processHeading, processSubheading,
  processSteps[]{ step, title, description, "imageUrl": image.asset->url },
  ctaHeading, ctaDescription, ctaButtonText, ctaButtonLink
}`

// Fuel Transportation Section Queries
export const fuelTransportHeroQuery = groq`*[_type == "fuelTransportHero"][0]{
  subtitle, title, description,
  "heroImageUrl": image.asset->url
}`

export const fuelTransportFleetQuery = groq`*[_type == "fuelTransportFleet"][0]{
  heading, description, stats
}`

export const fuelTransportCoverageQuery = groq`*[_type == "fuelTransportCoverage"][0]{
  heading, areas
}`

export const fuelTransportFeaturesQuery = groq`*[_type == "fuelTransportFeatures"][0]{
  heading, features
}`

export const fuelTransportSafetyQuery = groq`*[_type == "fuelTransportSafety"][0]{
  heading, description,
  "imageUrl": image.asset->url
}`

export const fuelTransportProcessQuery = groq`*[_type == "fuelTransportProcess"][0]{
  heading, subheading, processSteps
}`

export const fuelTransportExcellenceQuery = groq`*[_type == "fuelTransportExcellence"][0]{
  tagline, content, ctaText, ctaLink
}`

export const fuelTransportComplianceQuery = groq`*[_type == "fuelTransportCompliance"][0]{
  heading, description,
  "imageUrl": image.asset->url
}`

export const fuelTransportFleetComplianceQuery = groq`*[_type == "fuelTransportFleetCompliance"][0]{
  heading, description, features
}`

export const fuelTransportDriversComplianceQuery = groq`*[_type == "fuelTransportDriversCompliance"][0]{
  heading, description, features
}`

// Community Page Section Queries
export const communityHeroQuery = groq`*[_type == "communityHero"][0]{
  subtitle, title, description,
  "heroImageUrl": image.asset->url
}`

export const communityInitiativesQuery = groq`*[_type == "communityInitiatives"][0]{
  heading, initiatives
}`

export const communityImpactQuery = groq`*[_type == "communityImpact"][0]{
  heading, stats
}`

export const communityStoryQuery = groq`*[_type == "communityStory"][0]{
  heading, content,
  "imageUrl": image.asset->url
}`

// Commercial Diesel Page Section Queries
export const commercialDieselHeroQuery = groq`*[_type == "commercialDieselHero"][0]{
  subtitle, title, description,
  "heroImageUrl": image.asset->url
}`

export const commercialDieselIndustriesQuery = groq`*[_type == "commercialDieselIndustries"][0]{
  heading, industries
}`

export const commercialDieselSectorsQuery = groq`*[_type == "commercialDieselSectors"][0]{
  heading, content
}`

export const commercialDieselBunkerQuery = groq`*[_type == "commercialDieselBunker"][0]{
  heading, content, ctaHeading, ctaDescription, whatsapp
}`

export const commercialDieselOwnStationQuery = groq`*[_type == "commercialDieselOwnStation"][0]{
  tagline, heading, content, ctaText, ctaLink
}`

export const commercialDieselDoYouKnowQuery = groq`*[_type == "commercialDieselDoYouKnow"][0]{
  tagline, heading, content, stats
}`

export const commercialDieselMiningQuery = groq`*[_type == "commercialDieselMining"][0]{
  tagline, heading, content,
  "imageUrl": image.asset->url,
  statValue, statLabel
}`

export const commercialDieselAgricultureQuery = groq`*[_type == "commercialDieselAgriculture"][0]{
  tagline, heading, content, features
}`

export const commercialDieselWhatWeOfferQuery = groq`*[_type == "commercialDieselWhatWeOffer"][0]{
  tagline, heading, content
}`

export const commercialDieselTransportationQuery = groq`*[_type == "commercialDieselTransportation"][0]{
  tagline, heading, content, ctaHeading, ctaDescription, ctaLink
}`

export const commercialDieselComplianceQuery = groq`*[_type == "commercialDieselCompliance"][0]{
  heading, content, certifications
}`

// Contact Page Query
export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  heroTitle, heroDescription,
  "heroImageUrl": heroImage.asset->url,
  address, phone, email,
  weekdaysHours, saturdayHours, sundayHours, emergencySupport,
  formHeading, submitButtonText, successMessage,
  mapEmbedUrl
}`

// Careers Page Query
export const careersPageQuery = groq`*[_type == "careersPage"][0]{
  heroSubtitle, heroTitle, heroDescription,
  "heroImageUrl": heroImage.asset->url,
  openingsHeading,
  benefitsHeading, benefits,
  cultureHeading, cultureDescription, cultureValues,
  "cultureImageUrl": cultureImage.asset->url
}`

// Job Openings Query
export const jobOpeningsQuery = groq`*[_type == "jobOpening" && isActive == true] | order(order asc){
  title, "slug": slug.current, location, type, description,
  "fullDescription": fullDescription,
  requirements
}`

// Franchising Page Query
export const franchisingPageQuery = groq`*[_type == "franchisingPage"][0]{
  heroSubtitle, heroTitle, heroDescription,
  "heroImageUrl": heroImage.asset->url,
  introHeading, introDescription,
  "introImageUrl": introImage.asset->url,
  benefitsHeading, benefits,
  journeyHeading, journeySteps,
  trainingHeading, trainingDescription, trainingFeatures,
  "trainingImageUrl": trainingImage.asset->url,
  investmentHeading, investmentPoints,
  ctaHeading, ctaDescription,
  primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink
}`

// Simple Page Query (for atlas-car-racing, atlas-fuel-pricing, etc.)
export const simplePageQuery = groq`*[_type == "simplePage" && pageSlug == $slug][0]{
  pageSlug, heroSubtitle, heroTitle, heroDescription,
  "heroImageUrl": heroImage.asset->url,
  contentSections[]{
    sectionType, heading,
    content,
    "imageUrl": image.asset->url,
    buttonText, buttonLink
  }
}`

// Enhanced Blog/News Queries
export const blogPostsEnhancedQuery = groq`*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc){
  title, "slug": slug.current,
  "category": category->{name, "slug": slug.current, color},
  "author": author->{name, "avatar": avatar.asset->url},
  publishedAt, excerpt, readTime, featured,
  "imageUrl": featuredImage.asset->url,
  "tags": tags[]->{name, "slug": slug.current}
}`

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  title, "slug": slug.current,
  "category": category->{name, "slug": slug.current, description, color},
  "author": author->{name, role, bio, "avatar": avatar.asset->url, socialLinks},
  publishedAt, excerpt, body, readTime, metaDescription,
  "imageUrl": featuredImage.asset->url,
  "tags": tags[]->{name, "slug": slug.current},
  "related": relatedPosts[]->{title, "slug": slug.current, excerpt, "imageUrl": featuredImage.asset->url, publishedAt}
}`

// Categories, Authors, Tags Queries
export const categoriesQuery = groq`*[_type == "category"] | order(name asc){
  name, "slug": slug.current, description, color
}`

export const authorsQuery = groq`*[_type == "author"] | order(name asc){
  name, "slug": slug.current, role, bio, "avatarUrl": avatar.asset->url, socialLinks
}`

export const tagsQuery = groq`*[_type == "tag"] | order(name asc){
  name, "slug": slug.current
}`

export async function getSanityData(query, fallback) {
  try {
    const data = await client.fetch(query)
    return data || fallback
  } catch {
    return fallback
  }
}

// Helper for parameterized queries
// Mega Menu Navigation Query
export const megaMenuQuery = groq`*[_type == "megaMenu"][0]{
  navItems[]{
    id,
    label,
    href,
    calloutHeading,
    calloutCta,
    description,
    groups[]{
      heading,
      links[]{
        label,
        excerpt,
        href,
        "imageUrl": image.asset->url
      }
    },
    featured{
      label,
      href,
      "imageUrl": image.asset->url
    }
  }
}`

export async function getSanityDataWithParams(query, params, fallback) {
  try {
    const data = await client.fetch(query, params)
    return data || fallback
  } catch {
    return fallback
  }
}
