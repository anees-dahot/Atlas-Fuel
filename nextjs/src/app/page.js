import { fetchSanity, getHomePage, getSiteSettings } from "@/lib/sanity";
import {loadPageMetadata} from "@/lib/metadata";
import { groq } from "next-sanity";
import About from "@/components/home/About";
import Certifications from "@/components/home/Certifications";
import Community from "@/components/home/Community";
import FeatureBoxes from "@/components/home/FeatureBoxes";
import Hero from "@/components/home/Hero";
import NewsSection from "@/components/home/NewsSection";
import People from "@/components/home/People";
import Vision from "@/components/home/Vision";
import WhatWeDo from "@/components/home/WhatWeDo";
import StatsTicker from "@/components/home/StatsTicker";
import CTABanner from "@/components/shared/CTABanner";
import {mapPageCta} from "@/lib/contentFallbacks";

export function generateMetadata() {
  return loadPageMetadata({
    getPage: getHomePage,
    getSiteSettings,
    path: "/",
    fallbackTitle: "Atlas Fuel Australia",
    fallbackDescription:
      "Reliable fuel solutions for mining, marine, agriculture, retail and distribution across Australia.",
    fallbackImage: {imageUrl: "/images/truck-new.jpg", alt: "Atlas Fuel Australia"},
  });
}

const fbHero = {
  eyebrow: "On-Site Fuel Solutions",
  title: [
    { _type: "block", children: [{ _type: "span", text: "Powering" }] },
    { _type: "block", children: [{ _type: "span", text: "Australia's" }] },
    { _type: "block", children: [{ _type: "span", text: "Future" }] },
  ],
  description:
    "Atlas Fuel Australia delivers reliable, efficient fuel solutions nationwide. We cater to businesses of all sizes, ensuring quality and sustainability.",
  ctaPrimary: "Contact Fuel Station",
  ctaPrimaryLink: "/contact",
  ctaSecondary: "New Bulk Fuel Enquiry",
  ctaSecondaryLink: "mailto:info@atlasfuel.com.au",
  heroImageUrl: "/images/truck-new.jpg",
};

const fbSectors = [
  {
    title: "Atlas Fuel Stations",
    slug: "atlas-fuel-stations",
    description:
      "Atlas Fuel stations deliver more than fuel — we power communities with convenience, service, and reliability.",
    fullDescription:
      "Our fuel stations are designed for everyday Australians, offering world-class facilities, competitive pricing, and exceptional customer service.",
    imageUrl: "/images/fuel-stations.jpg",
    stats: [
      { label: "Locations", value: "30+" },
      { label: "Daily Customers", value: "50,000+" },
    ],
  },
  {
    title: "Mining & Civil",
    slug: "mining-fuel",
    description:
      "From mining to marine, agriculture to civil works, Atlas Fuel proudly keeps every sector moving forward.",
    fullDescription:
      "We provide comprehensive fuel solutions to mining operations, civil construction projects, and heavy industry across Australia.",
    imageUrl: "/images/what-we-do-mining-civil.webp",
    stats: [
      { label: "Clients", value: "30+" },
      { label: "Litres Delivered Annually", value: "200M+" },
    ],
  },
  {
    title: "Fuel Logistics",
    slug: "fuel-transportation",
    description:
      "With a modern fleet and precision planning, Atlas Fuel ensures your fuel arrives safely, on time, every time.",
    fullDescription:
      "Our state-of-the-art logistics network features GPS-tracked vehicles, real-time delivery updates, and 24/7 emergency response capabilities.",
    imageUrl: "/images/fuel-logistics.jpg",
    stats: [
      { label: "Fleet Size", value: "25+" },
      { label: "On Time", value: "99.5%" },
    ],
  },
  {
    title: "On-Site Diesel",
    slug: "onsite-bulk-diesel",
    description:
      "Atlas Fuel brings the pump to you — efficient onsite diesel solutions that keep your operations running nonstop.",
    fullDescription:
      "Our mobile refueling units and on-site tank installations eliminate downtime and improve operational efficiency.",
    imageUrl: "/images/onsite-diesel.jpg",
    stats: [
      { label: "Sites Serviced", value: "200+" },
      { label: "Available to Deliver", value: "24/7" },
    ],
  },
  {
    title: "Marine Bunkering",
    slug: "marine-fuel",
    description:
      "Marine bunkering solutions ensuring your vessels stay fueled and operational across Australian waters.",
    fullDescription:
      "We provide comprehensive marine fuel services including bunker fuel delivery, lubricants, and vessel refueling at major Australian ports.",
    imageUrl: "/images/marine-bunkering.jpg",
    stats: [
      { label: "Ports Covered", value: "8+" },
      { label: "Vessels Served", value: "500+" },
    ],
  },
  {
    title: "Agriculture",
    slug: "agriculture-fuel",
    description:
      "Farm fuel delivery keeping Australian agriculture running efficiently during critical seasons.",
    fullDescription:
      "We understand the unique demands of Australian agriculture. Our flexible delivery schedules, bulk storage solutions, and competitive pricing help farmers maximize efficiency.",
    imageUrl: "/images/agriculture.jpg",
    stats: [
      { label: "Farms Supplied", value: "300+" },
      { label: "Coverage", value: "WA Wide" },
    ],
  },
  {
    title: "Independent Fuel Stations",
    slug: "independent-fuel-stations",
    description:
      "Atlas Fuel delivers competitive fuel prices without compromising quality, keeping you powered for less.",
    fullDescription:
      "Our direct supply agreements and efficient distribution network allow us to offer some of the most competitive fuel prices in Australia.",
    imageUrl: "/images/independent-fuel-stations.jpg",
    stats: [
      { label: "Distributors", value: "8+" },
      { label: "Savings", value: "10%" },
    ],
  },
  {
    title: "Local Fuel Distributors",
    slug: "local-fuel-distributors",
    description:
      "Atlas Fuel stands with the community, driving support, connection, and progress wherever we operate.",
    fullDescription:
      "We believe in giving back to the communities we serve. From sponsoring local sports teams to supporting charitable initiatives.",
    imageUrl: "/images/local-fuel-distributors.jpg",
    stats: [
      { label: "Jobs Created", value: "300+" },
      { label: "Community Programs", value: "25+" },
    ],
  },
];

const fbVision = {
  tag: "Vision & Purpose - 2030",
  quote:
    '"Our purpose is to provide reliable and affordable petroleum products to help create a better world for everyone."',
  quoteHighlight: "better world for everyone.",
  description:
    "Behind the scenes, discover the scale of our logistics operations in action and explore the community initiatives and charity events that make a real difference. You'll also witness how we're building world class fuel stations designed for everyday Australians, while following the remarkable journey of Atlas Fuel from a single site to a national network.",
  ctaText: "Read More",
  ctaLink: "/about",
  videoImageUrl: "/images/fuel-logistics.jpg",
  videoLabel: "Watch What We Do",
};

const fbCommunity = {
  tag: "Community & Supply Chain",
  heading: "We Are Committed to\nPartnering With Communities",
  description:
    "By listening to their needs and building meaningful relationships. Together, we strive to create sustainable solutions that bring long-term benefits.",
  stats: [
    {
      value: "300+",
      label: "Jobs Connected",
      description:
        "Across Australia, Atlas Fuel has generated over 300 direct and indirect jobs, empowering local communities.",
    },
    {
      value: "50+",
      label: "Talent Rising",
      description:
        "Each year, we proudly train 50+ members with skills and confidence to build lasting careers.",
    },
    {
      value: "5+",
      label: "Seniors at Work",
      description:
        "We proudly employ senior citizens, valuing the wisdom, reliability, and experience they bring.",
    },
  ],
  ctaText: "Learn More About Our Impact",
  ctaLink: "/about",
};

const fbAbout = {
  tagline: "Unrivalled. Unmatched. Unstoppable.",
  heading: "About Us",
  body: "These three words capture the spirit of Atlas Fuel and the people who drive it forward every day. We stand unrivalled in our commitment to quality, unmatched in our ability to deliver reliable fuel solutions nationwide, and unstoppable in our pursuit of growth, innovation, and excellence. From our performance fleet to our world-class service stations, every step we take reflects a relentless drive to set new standards in the fuel industry. For our customers, our partners, and our communities, Atlas Fuel is more than a brand — it's a promise of strength, progress, and a future powered without limits.",
  keyPoints: [
    "100% Australian owned and operated",
    "Nationwide fuel delivery network",
    "World-class service stations",
    "Commitment to safety and sustainability",
  ],
  image1Url: "/images/about-us.jpg",
  image2Url: "/images/about-us.jpg",
  stat1Label: "Established",
  stat1Value: "2010",
  stat2Label: "Locations Delivered",
  stat2Value: "400+",
};

const fbCerts = {
  tag: "Our Certifications",
  heading: "Certified for Excellence, Driven by Compliance",
  description:
    "At Atlas Fuel, compliance is more than a standard — it's our foundation for trust and performance. Every operation, vehicle, and site meets rigorous national and international certifications. We don't just follow the rules — we set the benchmark for safety, quality, and reliability.",
  trustBadgeText: "100% Compliant",
  trustBadgeSubtext: "All operations certified",
  certifications: [
    {
      name: "WAHVA",
      title: "Western Australian Heavy Vehicle",
      description:
        "Accreditation ensuring every vehicle meets strict roadworthiness and safety benchmarks.",
      certificateImageUrl: "/images/certificates/wahva-placeholder.svg",
    },
    {
      name: "ISO 9001",
      title: "Quality Management Systems",
      description:
        "International standard for quality management ensuring consistent service delivery.",
      certificateImageUrl: "/images/certificates/iso9001-placeholder.svg",
    },
    {
      name: "ISO 14001",
      title: "Environmental Management Systems",
      description:
        "Environmental management certification demonstrating our commitment to sustainability.",
      certificateImageUrl: "/images/certificates/iso14001-placeholder.svg",
    },
    {
      name: "ISO 45001",
      title: "Occupational Health & Safety",
      description:
        "Workplace health and safety management ensuring employee and customer wellbeing.",
      certificateImageUrl: "/images/certificates/iso45001-placeholder.svg",
    },
  ],
};

const fbPeople = {
  tag: "Driven by People, Fueled by Purpose",
  heading: "Our People",
  description:
    "Atlas Fuel's team is dedicated to delivering excellence, combining expertise with a deep understanding of the mining industry's needs. Our people prioritize reliability, safety, and customer satisfaction, ensuring seamless service at every step. With a commitment to innovation and collaboration, our team helps mining operations achieve efficiency and success.",
  ctaText: "Read More",
  ctaLink: "/careers",
  cardHeading: "Work With Us",
  cardDescription:
    "50+ Talent Rising reflects Atlas Fuel's commitment to shaping future professionals. Each year, we proudly train 50+ members with the skills and confidence to build lasting careers in Australia's thriving fuel industry.",
  cardImageUrl: "/images/Our People - Our Team.jpg",
  cardBadge: "Careers",
  cardStats: [
    { icon: "users", value: "300+", label: "Jobs Created" },
    { icon: "graduation-cap", value: "50+", label: "Trainees Annually" },
    { icon: "heart", value: "100%", label: "Committed" },
  ],
  cardCtaText: "View Opportunities",
  cardCtaLink: "/careers",
  stats: [
    { value: "300+", label: "Jobs" },
    { value: "50+", label: "Trainees" },
    { value: "5+", label: "Seniors" },
  ],
};

const fbSettings = {
  phone: "+61 8 6377 7644",
  email: "info@atlasfuel.com.au",
  address: "1 Mandurah Rd, Kwinana WA 6167",
  ctaBannerHeading: "Work With Us",
  ctaBannerText:
    "Join Atlas Fuel and build a rewarding career powering growth across Australia.",
  ctaBannerButtonText: "Careers at Atlas Fuel",
  ctaBannerButtonLink: "/careers",
};

const fbNews = {
  tag: "News May Help You",
  heading: "Recent News",
  articles: [
    {
      title:
        "The Future of Fueling: How Technology is Transforming the Industry",
      date: "18 Aug 2025",
      author: "Admin",
      excerpt:
        "Modern innovation is driving advanced technology growth across industries worldwide today rapidly.",
      imageUrl: "/images/what-we-do-retail.webp",
      link: "/news/future-of-fueling",
    },
    {
      title: "10 Essential Tips for Choosing the Right Fueling Partner",
      date: "15 Sep 2025",
      author: "Admin",
      excerpt:
        "Discover ten key reasons for selecting the best fueling partner for success today.",
      imageUrl: "/images/truck-new.jpg",
      link: "/news/choosing-fueling-partner",
    },
    {
      title: "The Role of AI and Automation in Modern Fueling",
      date: "18 Dec 2025",
      author: "Admin",
      excerpt:
        "AI and automation are transforming modern fueling through smarter systems and efficiency.",
      imageUrl: "/images/what-we-do-mining-civil.webp",
      link: "/news/ai-automation-fueling",
    },
  ],
  viewMoreLink: "/news",
};

const fbFeatureCards = [
  { title: "Atlas Store Locator", eyebrow: "Services", subtitle: "Quickly find your nearest local Atlas Fuel station and experience world-class service wherever you are.", imageUrl: "/images/store-locator.jpg", link: "/store-locator" },
  { title: "Atlas Performance Fleet", eyebrow: "Services", subtitle: "Discover our high-performance fleet engineered for speed, strength, and reliable nationwide fuel delivery.", imageUrl: "/images/what-we-do-retail.webp", link: "/atlas-car-racing" },
  { title: "Work With Us", eyebrow: "Careers", subtitle: "Join Atlas Fuel and build a rewarding career powering growth across Australia every single day.", imageUrl: "/images/work-with-us.jpg", link: "/careers" },
];

const normalizeFeatureLink = (title, link, fallbackLink) => {
  const normalizedTitle = title?.trim().toLowerCase();
  if (normalizedTitle === "atlas store locator") return "/store-locator";
  if (normalizedTitle === "atlas performance fleet") return "/atlas-car-racing";
  return link ?? fallbackLink ?? "/";
};

const homeQuery = groq`*[_id == "homePage"][0]{
  heroSection {
    eyebrow, eyebrowColor, eyebrowSize, eyebrowBorderEnabled, eyebrowBorderColor, eyebrowBorderWidth, eyebrowShadowColor,
    titleLine1, titleLine1Color, titleLine1Size, titleLine1BorderEnabled, titleLine1BorderColor, titleLine1BorderWidth, titleLine1ShadowColor,
    titleLine2, titleLine2Color, titleLine2Size, titleLine2BorderEnabled, titleLine2BorderColor, titleLine2BorderWidth, titleLine2ShadowColor,
    titleLine3, titleLine3Color, titleLine3Size, titleLine3BorderEnabled, titleLine3BorderColor, titleLine3BorderWidth, titleLine3ShadowColor,
    description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
    primaryCTAText, primaryCTAColor, primaryCTASize, primaryCTABorderEnabled, primaryCTABorderColor, primaryCTABorderWidth, primaryCTAShadowColor, primaryCTALink,
    secondaryCTAText, secondaryCTAColor, secondaryCTASize, secondaryCTABorderEnabled, secondaryCTABorderColor, secondaryCTABorderWidth, secondaryCTAShadowColor, secondaryCTALink,
    videoUrl, videoTitle, videoSubtitle, quickLinksLabel,
    video{
      ...,
      "uploadUrl": file.asset->url,
      file{..., asset->{_id, url, mimeType, originalFilename}},
      poster{..., image{..., asset->{_id, url, metadata{lqip, dimensions}}, hotspot, crop}}
    },
    backgroundImage{..., asset->{_id, url, metadata{lqip, dimensions}}, alt, hotspot, crop},
    "heroImageUrl": backgroundImage.asset->url, "heroImageAlt": backgroundImage.alt,
    quickLinks[]{ _key, label, href, icon, isEmergency },
    heroStats[]{ _key, value, label }
  },
  featureBoxesSection {
    cards[]{
      _key,
      title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      eyebrow, eyebrowColor, eyebrowSize, eyebrowBorderEnabled, eyebrowBorderColor, eyebrowBorderWidth, eyebrowShadowColor,
      subtitle, subtitleColor, subtitleSize, subtitleBorderEnabled, subtitleBorderColor, subtitleBorderWidth, subtitleShadowColor,
      link, ctaText, image{..., asset->{_id, url, metadata{lqip, dimensions}}, alt, hotspot, crop},
      "imageUrl": coalesce(image.asset->url, imageUrl), "imageAlt": image.alt
    }
  },
  whatWeDoSection {
    sectionTag, sectionTagColor, sectionTagSize, sectionTagBorderEnabled, sectionTagBorderColor, sectionTagBorderWidth, sectionTagShadowColor,
    sectionHeading, sectionHeadingColor, sectionHeadingSize, sectionHeadingBorderEnabled, sectionHeadingBorderColor, sectionHeadingBorderWidth, sectionHeadingShadowColor,
    scrollHintText,
    sectors[]{
      _key, slug, title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      fullDescription, image{..., asset->{_id, url, metadata{lqip, dimensions}}, alt, hotspot, crop},
      "imageUrl": image.asset->url, "imageAlt": image.alt, href, ctaText,
      stats[]{ _key, value, valueColor, valueSize, valueBorderEnabled, valueBorderColor, valueBorderWidth, valueShadowColor, label, labelColor, labelSize, labelBorderEnabled, labelBorderColor, labelBorderWidth, labelShadowColor }
    }
  },
  visionSection {
    sectionTag, sectionTagColor, sectionTagSize, sectionTagBorderEnabled, sectionTagBorderColor, sectionTagBorderWidth, sectionTagShadowColor,
    quote, quoteColor, quoteSize, quoteBorderEnabled, quoteBorderColor, quoteBorderWidth, quoteShadowColor,
    highlightedPhrase, highlightedPhraseColor, highlightedPhraseSize, highlightedPhraseBorderEnabled, highlightedPhraseBorderColor, highlightedPhraseBorderWidth, highlightedPhraseShadowColor,
    description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
    ctaText, ctaTextColor, ctaTextSize, ctaTextBorderEnabled, ctaTextBorderColor, ctaTextBorderWidth, ctaTextShadowColor, ctaLink,
    videoImage{..., asset->{_id, url, metadata{lqip, dimensions}}, alt, hotspot, crop},
    video{
      ...,
      "uploadUrl": file.asset->url,
      file{..., asset->{_id, url, mimeType, originalFilename}},
      poster{..., image{..., asset->{_id, url, metadata{lqip, dimensions}}, hotspot, crop}}
    },
    "videoImageUrl": videoImage.asset->url, "videoImageAlt": videoImage.alt, videoUrl, videoLabel, videoBadgeLabel, videoLabelColor, videoLabelSize, videoLabelBorderEnabled, videoLabelBorderColor, videoLabelBorderWidth, videoLabelShadowColor, videoDescription
  },
  communitySection {
    sectionTag, sectionTagColor, sectionTagSize, sectionTagBorderEnabled, sectionTagBorderColor, sectionTagBorderWidth, sectionTagShadowColor,
    heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
    description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
    ctaText, ctaTextColor, ctaTextSize, ctaTextBorderEnabled, ctaTextBorderColor, ctaTextBorderWidth, ctaTextShadowColor, ctaLink,
    stats[]{ _key, value, valueColor, valueSize, valueBorderEnabled, valueBorderColor, valueBorderWidth, valueShadowColor, label, labelColor, labelSize, labelBorderEnabled, labelBorderColor, labelBorderWidth, labelShadowColor, description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor }
  },
  aboutSection {
    tagline, taglineColor, taglineSize, taglineBorderEnabled, taglineBorderColor, taglineBorderWidth, taglineShadowColor,
    heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
    body, bodyColor, bodySize, bodyBorderEnabled, bodyBorderColor, bodyBorderWidth, bodyShadowColor,
    keyPoints,
    imageLeft{..., asset->{_id, url, metadata{lqip, dimensions}}, alt, hotspot, crop},
    "imageLeftUrl": imageLeft.asset->url, "imageLeftAlt": imageLeft.alt,
    imageRight{..., asset->{_id, url, metadata{lqip, dimensions}}, alt, hotspot, crop},
    "imageRightUrl": imageRight.asset->url, "imageRightAlt": imageRight.alt,
    ctaText, ctaTextColor, ctaTextSize, ctaTextBorderEnabled, ctaTextBorderColor, ctaTextBorderWidth, ctaTextShadowColor, ctaLink,
    stats[]{ _key, value, valueColor, valueSize, valueBorderEnabled, valueBorderColor, valueBorderWidth, valueShadowColor, label, labelColor, labelSize, labelBorderEnabled, labelBorderColor, labelBorderWidth, labelShadowColor }
  },
  certificationsSection {
    sectionTag, sectionTagColor, sectionTagSize, sectionTagBorderEnabled, sectionTagBorderColor, sectionTagBorderWidth, sectionTagShadowColor,
    heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
    description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
    trustBadgeText, trustBadgeTextColor, trustBadgeTextSize, trustBadgeTextBorderEnabled, trustBadgeTextBorderColor, trustBadgeTextBorderWidth, trustBadgeTextShadowColor,
    trustBadgeSubtext, trustBadgeSubtextColor, trustBadgeSubtextSize, trustBadgeSubtextBorderEnabled, trustBadgeSubtextBorderColor, trustBadgeSubtextBorderWidth, trustBadgeSubtextShadowColor,
    certificateImages[]{ ..., asset->{_id, url, metadata{lqip, dimensions}}, alt, hotspot, crop, "url": asset->url },
    certifications[]{ _key, type, icon, title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor, description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor, certificateImage{..., asset->{_id, url, metadata{lqip, dimensions}}, alt, hotspot, crop}, "certificateImageUrl": certificateImage.asset->url, "certificateImageAlt": certificateImage.alt }
  },
  peopleSection {
    sectionTag, sectionTagColor, sectionTagSize, sectionTagBorderEnabled, sectionTagBorderColor, sectionTagBorderWidth, sectionTagShadowColor,
    heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
    description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
    ctaText, ctaTextColor, ctaTextSize, ctaTextBorderEnabled, ctaTextBorderColor, ctaTextBorderWidth, ctaTextShadowColor, ctaLink,
    cardHeading, cardHeadingColor, cardHeadingSize, cardHeadingBorderEnabled, cardHeadingBorderColor, cardHeadingBorderWidth, cardHeadingShadowColor,
    cardDescription, cardDescriptionColor, cardDescriptionSize, cardDescriptionBorderEnabled, cardDescriptionBorderColor, cardDescriptionBorderWidth, cardDescriptionShadowColor,
    "cardImage": cardImageUrl{..., asset->{_id, url, metadata{lqip, dimensions}}, alt, hotspot, crop},
    "cardImageUrl": cardImageUrl.asset->url, "cardImageAlt": cardImageUrl.alt,
    cardBadge,
    cardStats[]{ _key, icon, value, label },
    cardCTAText, cardCTAColor, cardCTASize, cardCTABorderEnabled, cardCTABorderColor, cardCTABorderWidth, cardCTAShadowColor, cardCTALink,
    stats[]{ _key, value, valueColor, valueSize, valueBorderEnabled, valueBorderColor, valueBorderWidth, valueShadowColor, label, labelColor, labelSize, labelBorderEnabled, labelBorderColor, labelBorderWidth, labelShadowColor }
  },
  newsSectionMeta {
    sectionTag, sectionTagColor, sectionTagSize, sectionTagBorderEnabled, sectionTagBorderColor, sectionTagBorderWidth, sectionTagShadowColor,
    heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
    viewMoreText, viewMoreTextColor, viewMoreTextSize, viewMoreTextBorderEnabled, viewMoreTextBorderColor, viewMoreTextBorderWidth, viewMoreTextShadowColor, viewMoreLink,
    bylineLabel, readMoreText
  },
  statsTicker {
    stats[]{ _key, value, label }
  },
  ctaBanner {
    heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
    text, textColor, textSize, textBorderEnabled, textBorderColor, textBorderWidth, textShadowColor,
    buttonText, buttonTextColor, buttonTextSize, buttonTextBorderEnabled, buttonTextBorderColor, buttonTextBorderWidth, buttonTextShadowColor, buttonLink,
    phone, phoneColor, phoneSize, phoneBorderEnabled, phoneBorderColor, phoneBorderWidth, phoneShadowColor,
    email, emailColor, emailSize, emailBorderEnabled, emailBorderColor, emailBorderWidth, emailShadowColor,
    address, addressColor, addressSize, addressBorderEnabled, addressBorderColor, addressBorderWidth, addressShadowColor,
    stylePreset, backgroundColor, buttonBackgroundColor, overlayOpacity,
    backgroundImage{..., asset->{_id, url, metadata{lqip, dimensions}}, alt, hotspot, crop}
  }
}`;

const newsQuery = groq`*[_type == "newsPost"] | order(publishedAt desc)[0...3]{ title, "slug": slug.current, publishedAt, author, category, excerpt, mainImage{..., asset->{_id, url, metadata{lqip, dimensions}}, alt, hotspot, crop}, "imageUrl": mainImage.asset->url, "imageAlt": mainImage.alt }`;

const sizeMap = { '1': '12px', '2': '16px', '3': '20px', '4': '24px', '5': '32px', '6': '48px', '7': '70px' };

export default async function Home() {
  const [sanity, newsPosts, globalSettings] = await Promise.all([
    fetchSanity({query: homeQuery, tags: ["homePage"]}).catch((err) => { console.error("[Sanity] homeQuery failed:", err.message); return null; }),
    fetchSanity({query: newsQuery, tags: ["newsPost"]}).catch((err) => { console.error("[Sanity] newsQuery failed:", err.message); return null; }),
    getSiteSettings().catch((err) => { console.error("[Sanity] getSiteSettings failed:", err.message); return null; }),
  ]);
  if (!sanity) console.warn("[Sanity] No homePage document found — using fallback data");
  else console.log("[Sanity] homePage loaded, sections:", Object.keys(sanity).join(", "));
  const s = sanity;

  const hero = { ...fbHero,
    eyebrow:          s?.heroSection?.eyebrow          ?? fbHero.eyebrow,
    eyebrowColor:      s?.heroSection?.eyebrowColor      ?? fbHero.eyebrowColor,
    eyebrowSize:       s?.heroSection?.eyebrowSize       ?? fbHero.eyebrowSize,
    eyebrowBorderEnabled: s?.heroSection?.eyebrowBorderEnabled ?? fbHero.eyebrowBorderEnabled,
    eyebrowBorderColor: s?.heroSection?.eyebrowBorderColor ?? fbHero.eyebrowBorderColor,
    eyebrowBorderWidth:  s?.heroSection?.eyebrowBorderWidth  ?? fbHero.eyebrowBorderWidth,
    eyebrowShadowColor:  s?.heroSection?.eyebrowShadowColor  ?? fbHero.eyebrowShadowColor,
    title: s?.heroSection?.titleLine1 !== null && s?.heroSection?.titleLine1 !== undefined ? [
      { _type:"block", children:[{ _type:"span", text: s.heroSection.titleLine1 }] },
      { _type:"block", children:[{ _type:"span", text: s.heroSection.titleLine2 ?? "" }] },
      { _type:"block", children:[{ _type:"span", text: s.heroSection.titleLine3 ?? "" }] },
    ] : fbHero.title,
    titleLine1Color:      s?.heroSection?.titleLine1Color      ?? fbHero.titleLine1Color,
    titleLine1Size:       s?.heroSection?.titleLine1Size       ?? fbHero.titleLine1Size,
    titleLine1BorderEnabled: s?.heroSection?.titleLine1BorderEnabled ?? fbHero.titleLine1BorderEnabled,
    titleLine1BorderColor: s?.heroSection?.titleLine1BorderColor ?? fbHero.titleLine1BorderColor,
    titleLine1BorderWidth:  s?.heroSection?.titleLine1BorderWidth  ?? fbHero.titleLine1BorderWidth,
    titleLine1ShadowColor:  s?.heroSection?.titleLine1ShadowColor  ?? fbHero.titleLine1ShadowColor,
    titleLine2Color:      s?.heroSection?.titleLine2Color      ?? fbHero.titleLine2Color,
    titleLine2Size:       s?.heroSection?.titleLine2Size       ?? fbHero.titleLine2Size,
    titleLine2BorderEnabled: s?.heroSection?.titleLine2BorderEnabled ?? fbHero.titleLine2BorderEnabled,
    titleLine2BorderColor: s?.heroSection?.titleLine2BorderColor ?? fbHero.titleLine2BorderColor,
    titleLine2BorderWidth:  s?.heroSection?.titleLine2BorderWidth  ?? fbHero.titleLine2BorderWidth,
    titleLine2ShadowColor:  s?.heroSection?.titleLine2ShadowColor  ?? fbHero.titleLine2ShadowColor,
    titleLine3Color:      s?.heroSection?.titleLine3Color      ?? fbHero.titleLine3Color,
    titleLine3Size:       s?.heroSection?.titleLine3Size       ?? fbHero.titleLine3Size,
    titleLine3BorderEnabled: s?.heroSection?.titleLine3BorderEnabled ?? fbHero.titleLine3BorderEnabled,
    titleLine3BorderColor: s?.heroSection?.titleLine3BorderColor ?? fbHero.titleLine3BorderColor,
    titleLine3BorderWidth:  s?.heroSection?.titleLine3BorderWidth  ?? fbHero.titleLine3BorderWidth,
    titleLine3ShadowColor:  s?.heroSection?.titleLine3ShadowColor  ?? fbHero.titleLine3ShadowColor,
    description:      s?.heroSection?.description      ?? fbHero.description,
    descriptionColor:  s?.heroSection?.descriptionColor  ?? fbHero.descriptionColor,
    descriptionSize:   s?.heroSection?.descriptionSize   ?? fbHero.descriptionSize,
    descriptionBorderEnabled: s?.heroSection?.descriptionBorderEnabled ?? fbHero.descriptionBorderEnabled,
    descriptionBorderColor: s?.heroSection?.descriptionBorderColor ?? fbHero.descriptionBorderColor,
    descriptionBorderWidth:  s?.heroSection?.descriptionBorderWidth  ?? fbHero.descriptionBorderWidth,
    descriptionShadowColor:  s?.heroSection?.descriptionShadowColor  ?? fbHero.descriptionShadowColor,
    ctaPrimary:       s?.heroSection?.primaryCTAText   ?? fbHero.ctaPrimary,
    ctaPrimaryColor:  s?.heroSection?.primaryCTAColor  ?? fbHero.ctaPrimaryColor,
    ctaPrimarySize:   s?.heroSection?.primaryCTASize   ?? fbHero.ctaPrimarySize,
    ctaPrimaryBorderEnabled: s?.heroSection?.primaryCTABorderEnabled ?? fbHero.ctaPrimaryBorderEnabled,
    ctaPrimaryBorderColor: s?.heroSection?.primaryCTABorderColor ?? fbHero.ctaPrimaryBorderColor,
    ctaPrimaryBorderWidth:  s?.heroSection?.primaryCTABorderWidth  ?? fbHero.ctaPrimaryBorderWidth,
    ctaPrimaryShadowColor:  s?.heroSection?.primaryCTAShadowColor  ?? fbHero.ctaPrimaryShadowColor,
    ctaPrimaryLink:   s?.heroSection?.primaryCTALink   ?? fbHero.ctaPrimaryLink,
    ctaSecondary:     s?.heroSection?.secondaryCTAText ?? fbHero.ctaSecondary,
    ctaSecondaryColor:  s?.heroSection?.secondaryCTAColor  ?? fbHero.ctaSecondaryColor,
    ctaSecondarySize:   s?.heroSection?.secondaryCTASize   ?? fbHero.ctaSecondarySize,
    ctaSecondaryBorderEnabled: s?.heroSection?.secondaryCTABorderEnabled ?? fbHero.ctaSecondaryBorderEnabled,
    ctaSecondaryBorderColor: s?.heroSection?.secondaryCTABorderColor ?? fbHero.ctaSecondaryBorderColor,
    ctaSecondaryBorderWidth:  s?.heroSection?.secondaryCTABorderWidth  ?? fbHero.ctaSecondaryBorderWidth,
    ctaSecondaryShadowColor:  s?.heroSection?.secondaryCTAShadowColor  ?? fbHero.ctaSecondaryShadowColor,
    ctaSecondaryLink: s?.heroSection?.secondaryCTALink ?? fbHero.ctaSecondaryLink,
    heroImageUrl:     s?.heroSection?.heroImageUrl     ?? fbHero.heroImageUrl,
    heroImage:        s?.heroSection?.backgroundImage,
    heroImageAlt:     s?.heroSection?.heroImageAlt     ?? "Atlas Fuel",
    videoUrl:         s?.heroSection?.videoUrl         ?? fbHero.videoUrl,
    video:            s?.heroSection?.video,
    videoTitle:       s?.heroSection?.videoTitle       ?? fbHero.videoTitle,
    videoSubtitle:    s?.heroSection?.videoSubtitle    ?? fbHero.videoSubtitle,
    quickLinksLabel:  s?.heroSection?.quickLinksLabel  ?? fbHero.quickLinksLabel,
    quickLinks: Array.isArray(s?.heroSection?.quickLinks)
      ? s.heroSection.quickLinks.map((link) => ({
          ...link,
          name: link.label ?? link.name,
          href:
            (link.label ?? link.name)?.toLowerCase() === "contact fuel stations"
              ? "/store-locator"
              : link.href,
        }))
      : fbHero.quickLinks,
    heroStats: Array.isArray(s?.heroSection?.heroStats)
      ? s.heroSection.heroStats
      : fbHero.heroStats,
  };

  const featureCards = Array.isArray(s?.featureBoxesSection?.cards)
    ? s.featureBoxesSection.cards.map((c,i) => ({ 
        title: c.title??fbFeatureCards[i]?.title??"",
        titleColor: c.titleColor??fbFeatureCards[i]?.titleColor??"",
        titleSize: c.titleSize??fbFeatureCards[i]?.titleSize??"",
        titleBorderEnabled: c.titleBorderEnabled??fbFeatureCards[i]?.titleBorderEnabled??false,
        titleBorderColor: c.titleBorderColor??fbFeatureCards[i]?.titleBorderColor??"",
        titleBorderWidth: c.titleBorderWidth??fbFeatureCards[i]?.titleBorderWidth??"",
        titleShadowColor: c.titleShadowColor??fbFeatureCards[i]?.titleShadowColor??"",
        eyebrow: c.eyebrow??fbFeatureCards[i]?.eyebrow??"Services",
        eyebrowColor: c.eyebrowColor??fbFeatureCards[i]?.eyebrowColor??"",
        eyebrowSize: c.eyebrowSize??fbFeatureCards[i]?.eyebrowSize??"",
        eyebrowBorderEnabled: c.eyebrowBorderEnabled??fbFeatureCards[i]?.eyebrowBorderEnabled??false,
        eyebrowBorderColor: c.eyebrowBorderColor??fbFeatureCards[i]?.eyebrowBorderColor??"",
        eyebrowBorderWidth: c.eyebrowBorderWidth??fbFeatureCards[i]?.eyebrowBorderWidth??"",
        eyebrowShadowColor: c.eyebrowShadowColor??fbFeatureCards[i]?.eyebrowShadowColor??"",
        subtitle: c.subtitle??fbFeatureCards[i]?.subtitle??"",
        subtitleColor: c.subtitleColor??fbFeatureCards[i]?.subtitleColor??"",
        subtitleSize: c.subtitleSize??fbFeatureCards[i]?.subtitleSize??"",
        subtitleBorderEnabled: c.subtitleBorderEnabled??fbFeatureCards[i]?.subtitleBorderEnabled??false,
        subtitleBorderColor: c.subtitleBorderColor??fbFeatureCards[i]?.subtitleBorderColor??"",
        subtitleBorderWidth: c.subtitleBorderWidth??fbFeatureCards[i]?.subtitleBorderWidth??"",
        subtitleShadowColor: c.subtitleShadowColor??fbFeatureCards[i]?.subtitleShadowColor??"",
        image: c.image,
        imageUrl: c.imageUrl??fbFeatureCards[i]?.imageUrl??"",
        imageAlt: c.imageAlt??c.title??fbFeatureCards[i]?.title??"Feature",
        link: normalizeFeatureLink(c.title, c.link, fbFeatureCards[i]?.link),
        ctaText: c.ctaText??fbFeatureCards[i]?.ctaText??"Read More"
      }))
    : fbFeatureCards;

  const sectors = Array.isArray(s?.whatWeDoSection?.sectors)
    ? s.whatWeDoSection.sectors.map((sec,i) => ({ 
        ...fbSectors[i], 
        ...sec, 
        imageUrl: sec.imageUrl??fbSectors[i]?.imageUrl??"",
        imageAlt: sec.imageAlt??sec.title??fbSectors[i]?.title??"",
        titleColor: sec.titleColor??fbSectors[i]?.titleColor??"",
        titleSize: sec.titleSize??fbSectors[i]?.titleSize??"",
        titleBorderEnabled: sec.titleBorderEnabled??fbSectors[i]?.titleBorderEnabled??false,
        titleBorderColor: sec.titleBorderColor??fbSectors[i]?.titleBorderColor??"",
        titleBorderWidth: sec.titleBorderWidth??fbSectors[i]?.titleBorderWidth??"",
        titleShadowColor: sec.titleShadowColor??fbSectors[i]?.titleShadowColor??"",
        descriptionColor: sec.descriptionColor??fbSectors[i]?.descriptionColor??"",
        descriptionSize: sec.descriptionSize??fbSectors[i]?.descriptionSize??"",
        descriptionBorderEnabled: sec.descriptionBorderEnabled??fbSectors[i]?.descriptionBorderEnabled??false,
        descriptionBorderColor: sec.descriptionBorderColor??fbSectors[i]?.descriptionBorderColor??"",
        descriptionBorderWidth: sec.descriptionBorderWidth??fbSectors[i]?.descriptionBorderWidth??"",
        descriptionShadowColor: sec.descriptionShadowColor??fbSectors[i]?.descriptionShadowColor??"",
        stats: Array.isArray(sec.stats) ? sec.stats : fbSectors[i]?.stats??[]
      }))
    : fbSectors;
  const whatWeDo = {
    sectionTag: s?.whatWeDoSection?.sectionTag ?? "Sectors We Cover",
    sectionTagColor: s?.whatWeDoSection?.sectionTagColor ?? "",
    sectionTagSize: s?.whatWeDoSection?.sectionTagSize ?? "",
    sectionTagBorderEnabled: s?.whatWeDoSection?.sectionTagBorderEnabled ?? false,
    sectionTagBorderColor: s?.whatWeDoSection?.sectionTagBorderColor ?? "",
    sectionTagBorderWidth: s?.whatWeDoSection?.sectionTagBorderWidth ?? "",
    sectionTagShadowColor: s?.whatWeDoSection?.sectionTagShadowColor ?? "",
    sectionHeading: s?.whatWeDoSection?.sectionHeading ?? "What We Do",
    sectionHeadingColor: s?.whatWeDoSection?.sectionHeadingColor ?? "",
    sectionHeadingSize: s?.whatWeDoSection?.sectionHeadingSize ?? "",
    sectionHeadingBorderEnabled: s?.whatWeDoSection?.sectionHeadingBorderEnabled ?? false,
    sectionHeadingBorderColor: s?.whatWeDoSection?.sectionHeadingBorderColor ?? "",
    sectionHeadingBorderWidth: s?.whatWeDoSection?.sectionHeadingBorderWidth ?? "",
    sectionHeadingShadowColor: s?.whatWeDoSection?.sectionHeadingShadowColor ?? "",
    scrollHintText: s?.whatWeDoSection?.scrollHintText ?? "Scroll to explore",
    sectors,
  };

  const vision      = { ...fbVision,      tag: s?.visionSection?.sectionTag??fbVision.tag, sectionTagColor: s?.visionSection?.sectionTagColor??"", sectionTagSize: s?.visionSection?.sectionTagSize??"", sectionTagBorderEnabled: s?.visionSection?.sectionTagBorderEnabled??false, sectionTagBorderColor: s?.visionSection?.sectionTagBorderColor??"", sectionTagBorderWidth: s?.visionSection?.sectionTagBorderWidth??"", sectionTagShadowColor: s?.visionSection?.sectionTagShadowColor??"", quote: s?.visionSection?.quote??fbVision.quote, quoteColor: s?.visionSection?.quoteColor??"", quoteSize: s?.visionSection?.quoteSize??"", quoteBorderEnabled: s?.visionSection?.quoteBorderEnabled??false, quoteBorderColor: s?.visionSection?.quoteBorderColor??"", quoteBorderWidth: s?.visionSection?.quoteBorderWidth??"", quoteShadowColor: s?.visionSection?.quoteShadowColor??"", quoteHighlight: s?.visionSection?.highlightedPhrase??fbVision.quoteHighlight, highlightedPhraseColor: s?.visionSection?.highlightedPhraseColor??"", highlightedPhraseSize: s?.visionSection?.highlightedPhraseSize??"", highlightedPhraseBorderEnabled: s?.visionSection?.highlightedPhraseBorderEnabled??false, highlightedPhraseBorderColor: s?.visionSection?.highlightedPhraseBorderColor??"", highlightedPhraseBorderWidth: s?.visionSection?.highlightedPhraseBorderWidth??"", highlightedPhraseShadowColor: s?.visionSection?.highlightedPhraseShadowColor??"", description: s?.visionSection?.description??fbVision.description, descriptionColor: s?.visionSection?.descriptionColor??"", descriptionSize: s?.visionSection?.descriptionSize??"", descriptionBorderEnabled: s?.visionSection?.descriptionBorderEnabled??false, descriptionBorderColor: s?.visionSection?.descriptionBorderColor??"", descriptionBorderWidth: s?.visionSection?.descriptionBorderWidth??"", descriptionShadowColor: s?.visionSection?.descriptionShadowColor??"", ctaText: s?.visionSection?.ctaText??fbVision.ctaText, ctaTextColor: s?.visionSection?.ctaTextColor??"", ctaTextSize: s?.visionSection?.ctaTextSize??"", ctaTextBorderEnabled: s?.visionSection?.ctaTextBorderEnabled??false, ctaTextBorderColor: s?.visionSection?.ctaTextBorderColor??"", ctaTextBorderWidth: s?.visionSection?.ctaTextBorderWidth??"", ctaTextShadowColor: s?.visionSection?.ctaTextShadowColor??"", ctaLink: s?.visionSection?.ctaLink??fbVision.ctaLink, video: s?.visionSection?.video, videoUrl: s?.visionSection?.videoUrl??fbVision.videoUrl, videoImage: s?.visionSection?.videoImage, videoImageUrl: s?.visionSection?.videoImageUrl??fbVision.videoImageUrl, videoImageAlt: s?.visionSection?.videoImageAlt??"Atlas Fuel Operations", videoLabel: s?.visionSection?.videoLabel??fbVision.videoLabel, videoBadgeLabel: s?.visionSection?.videoBadgeLabel??"Video", videoDescription: s?.visionSection?.videoDescription??"", videoLabelColor: s?.visionSection?.videoLabelColor??"", videoLabelSize: s?.visionSection?.videoLabelSize??"", videoLabelBorderEnabled: s?.visionSection?.videoLabelBorderEnabled??false, videoLabelBorderColor: s?.visionSection?.videoLabelBorderColor??"", videoLabelBorderWidth: s?.visionSection?.videoLabelBorderWidth??"", videoLabelShadowColor: s?.visionSection?.videoLabelShadowColor??"" };
  const community   = { ...fbCommunity,   tag: s?.communitySection?.sectionTag??fbCommunity.tag, sectionTagColor: s?.communitySection?.sectionTagColor??"", sectionTagSize: s?.communitySection?.sectionTagSize??"", sectionTagBorderEnabled: s?.communitySection?.sectionTagBorderEnabled??false, sectionTagBorderColor: s?.communitySection?.sectionTagBorderColor??"", sectionTagBorderWidth: s?.communitySection?.sectionTagBorderWidth??"", sectionTagShadowColor: s?.communitySection?.sectionTagShadowColor??"", heading: s?.communitySection?.heading??fbCommunity.heading, headingColor: s?.communitySection?.headingColor??"", headingSize: s?.communitySection?.headingSize??"", headingBorderEnabled: s?.communitySection?.headingBorderEnabled??false, headingBorderColor: s?.communitySection?.headingBorderColor??"", headingBorderWidth: s?.communitySection?.headingBorderWidth??"", headingShadowColor: s?.communitySection?.headingShadowColor??"", description: s?.communitySection?.description??fbCommunity.description, descriptionColor: s?.communitySection?.descriptionColor??"", descriptionSize: s?.communitySection?.descriptionSize??"", descriptionBorderEnabled: s?.communitySection?.descriptionBorderEnabled??false, descriptionBorderColor: s?.communitySection?.descriptionBorderColor??"", descriptionBorderWidth: s?.communitySection?.descriptionBorderWidth??"", descriptionShadowColor: s?.communitySection?.descriptionShadowColor??"", stats: Array.isArray(s?.communitySection?.stats) ? s.communitySection.stats : fbCommunity.stats, ctaText: s?.communitySection?.ctaText??fbCommunity.ctaText, ctaTextColor: s?.communitySection?.ctaTextColor??"", ctaTextSize: s?.communitySection?.ctaTextSize??"", ctaTextBorderEnabled: s?.communitySection?.ctaTextBorderEnabled??false, ctaTextBorderColor: s?.communitySection?.ctaTextBorderColor??"", ctaTextBorderWidth: s?.communitySection?.ctaTextBorderWidth??"", ctaTextShadowColor: s?.communitySection?.ctaTextShadowColor??"", ctaLink: s?.communitySection?.ctaLink??fbCommunity.ctaLink };
  const about       = { ...fbAbout,       tagline: s?.aboutSection?.tagline??fbAbout.tagline, taglineColor: s?.aboutSection?.taglineColor??"", taglineSize: s?.aboutSection?.taglineSize??"", taglineBorderEnabled: s?.aboutSection?.taglineBorderEnabled??false, taglineBorderColor: s?.aboutSection?.taglineBorderColor??"", taglineBorderWidth: s?.aboutSection?.taglineBorderWidth??"", taglineShadowColor: s?.aboutSection?.taglineShadowColor??"", heading: s?.aboutSection?.heading??fbAbout.heading, headingColor: s?.aboutSection?.headingColor??"", headingSize: s?.aboutSection?.headingSize??"", headingBorderEnabled: s?.aboutSection?.headingBorderEnabled??false, headingBorderColor: s?.aboutSection?.headingBorderColor??"", headingBorderWidth: s?.aboutSection?.headingBorderWidth??"", headingShadowColor: s?.aboutSection?.headingShadowColor??"", body: s?.aboutSection?.body??fbAbout.body, bodyColor: s?.aboutSection?.bodyColor??"", bodySize: s?.aboutSection?.bodySize??"", bodyBorderEnabled: s?.aboutSection?.bodyBorderEnabled??false, bodyBorderColor: s?.aboutSection?.bodyBorderColor??"", bodyBorderWidth: s?.aboutSection?.bodyBorderWidth??"", bodyShadowColor: s?.aboutSection?.bodyShadowColor??"", keyPoints: Array.isArray(s?.aboutSection?.keyPoints) ? s.aboutSection.keyPoints : fbAbout.keyPoints, image1: s?.aboutSection?.imageLeft, image1Url: s?.aboutSection?.imageLeftUrl??fbAbout.image1Url, image1Alt: s?.aboutSection?.imageLeftAlt??"Atlas Fuel depot", image2: s?.aboutSection?.imageRight, image2Url: s?.aboutSection?.imageRightUrl??fbAbout.image2Url, image2Alt: s?.aboutSection?.imageRightAlt??"Atlas Fuel fleet", ctaText: s?.aboutSection?.ctaText??fbAbout.ctaText, ctaTextColor: s?.aboutSection?.ctaTextColor??"", ctaTextSize: s?.aboutSection?.ctaTextSize??"", ctaTextBorderEnabled: s?.aboutSection?.ctaTextBorderEnabled??false, ctaTextBorderColor: s?.aboutSection?.ctaTextBorderColor??"", ctaTextBorderWidth: s?.aboutSection?.ctaTextBorderWidth??"", ctaTextShadowColor: s?.aboutSection?.ctaTextShadowColor??"", ctaLink: s?.aboutSection?.ctaLink??fbAbout.ctaLink, stat1Value: s?.aboutSection?.stats?.[0]?.value??fbAbout.stat1Value, stat1Label: s?.aboutSection?.stats?.[0]?.label??fbAbout.stat1Label, stat2Value: s?.aboutSection?.stats?.[1]?.value??fbAbout.stat2Value, stat2Label: s?.aboutSection?.stats?.[1]?.label??fbAbout.stat2Label };
  const fallbackCertificateImages = fbCerts.certifications
    .map((cert) => cert.certificateImageUrl)
    .filter(Boolean);
  const certificateImages = Array.isArray(s?.certificationsSection?.certificateImages)
    ? s.certificationsSection.certificateImages.filter(Boolean)
    : Array.isArray(s?.certificationsSection?.certifications)
      ? s.certificationsSection.certifications
          .map((cert) => cert.certificateImage ?? cert.certificateImageUrl)
          .filter(Boolean)
      : fallbackCertificateImages;
  const certifications = { ...fbCerts,   tag: s?.certificationsSection?.sectionTag??fbCerts.tag, sectionTagColor: s?.certificationsSection?.sectionTagColor??"", sectionTagSize: s?.certificationsSection?.sectionTagSize??"", sectionTagBorderEnabled: s?.certificationsSection?.sectionTagBorderEnabled??false, sectionTagBorderColor: s?.certificationsSection?.sectionTagBorderColor??"", sectionTagBorderWidth: s?.certificationsSection?.sectionTagBorderWidth??"", sectionTagShadowColor: s?.certificationsSection?.sectionTagShadowColor??"", heading: s?.certificationsSection?.heading??fbCerts.heading, headingColor: s?.certificationsSection?.headingColor??"", headingSize: s?.certificationsSection?.headingSize??"", headingBorderEnabled: s?.certificationsSection?.headingBorderEnabled??false, headingBorderColor: s?.certificationsSection?.headingBorderColor??"", headingBorderWidth: s?.certificationsSection?.headingBorderWidth??"", headingShadowColor: s?.certificationsSection?.headingShadowColor??"", description: s?.certificationsSection?.description??fbCerts.description, descriptionColor: s?.certificationsSection?.descriptionColor??"", descriptionSize: s?.certificationsSection?.descriptionSize??"", descriptionBorderEnabled: s?.certificationsSection?.descriptionBorderEnabled??false, descriptionBorderColor: s?.certificationsSection?.descriptionBorderColor??"", descriptionBorderWidth: s?.certificationsSection?.descriptionBorderWidth??"", descriptionShadowColor: s?.certificationsSection?.descriptionShadowColor??"", certificateImages, trustBadgeText: s?.certificationsSection?.trustBadgeText??fbCerts.trustBadgeText, trustBadgeTextColor: s?.certificationsSection?.trustBadgeTextColor??"", trustBadgeTextSize: s?.certificationsSection?.trustBadgeTextSize??"", trustBadgeTextBorderEnabled: s?.certificationsSection?.trustBadgeTextBorderEnabled??false, trustBadgeTextBorderColor: s?.certificationsSection?.trustBadgeTextBorderColor??"", trustBadgeTextBorderWidth: s?.certificationsSection?.trustBadgeTextBorderWidth??"", trustBadgeTextShadowColor: s?.certificationsSection?.trustBadgeTextShadowColor??"", trustBadgeSubtext: s?.certificationsSection?.trustBadgeSubtext??fbCerts.trustBadgeSubtext, trustBadgeSubtextColor: s?.certificationsSection?.trustBadgeSubtextColor??"", trustBadgeSubtextSize: s?.certificationsSection?.trustBadgeSubtextSize??"", trustBadgeSubtextBorderEnabled: s?.certificationsSection?.trustBadgeSubtextBorderEnabled??false, trustBadgeSubtextBorderColor: s?.certificationsSection?.trustBadgeSubtextBorderColor??"", trustBadgeSubtextBorderWidth: s?.certificationsSection?.trustBadgeSubtextBorderWidth??"", trustBadgeSubtextShadowColor: s?.certificationsSection?.trustBadgeSubtextShadowColor??"", certifications: Array.isArray(s?.certificationsSection?.certifications) ? s.certificationsSection.certifications.map((c)=>({ name: c.type??c.name, icon: c.icon, title: c.title, titleColor: c.titleColor??"", titleSize: c.titleSize??"", titleBorderEnabled: c.titleBorderEnabled??false, titleBorderColor: c.titleBorderColor??"", titleBorderWidth: c.titleBorderWidth??"", titleShadowColor: c.titleShadowColor??"", description: c.description, descriptionColor: c.descriptionColor??"", descriptionSize: c.descriptionSize??"", descriptionBorderEnabled: c.descriptionBorderEnabled??false, descriptionBorderColor: c.descriptionBorderColor??"", descriptionBorderWidth: c.descriptionBorderWidth??"", descriptionShadowColor: c.descriptionShadowColor??"", certificateImage: c.certificateImage ?? c.certificateImageUrl, certificateImageUrl: c.certificateImageUrl??"", certificateImageAlt: c.certificateImageAlt??c.title??"Certificate" })) : fbCerts.certifications };
  const people      = { ...fbPeople,     tag: s?.peopleSection?.sectionTag??fbPeople.tag, sectionTagColor: s?.peopleSection?.sectionTagColor??"", sectionTagSize: s?.peopleSection?.sectionTagSize??"", sectionTagBorderEnabled: s?.peopleSection?.sectionTagBorderEnabled??false, sectionTagBorderColor: s?.peopleSection?.sectionTagBorderColor??"", sectionTagBorderWidth: s?.peopleSection?.sectionTagBorderWidth??"", sectionTagShadowColor: s?.peopleSection?.sectionTagShadowColor??"", heading: s?.peopleSection?.heading??fbPeople.heading, headingColor: s?.peopleSection?.headingColor??"", headingSize: s?.peopleSection?.headingSize??"", headingBorderEnabled: s?.peopleSection?.headingBorderEnabled??false, headingBorderColor: s?.peopleSection?.headingBorderColor??"", headingBorderWidth: s?.peopleSection?.headingBorderWidth??"", headingShadowColor: s?.peopleSection?.headingShadowColor??"", description: s?.peopleSection?.description??fbPeople.description, descriptionColor: s?.peopleSection?.descriptionColor??"", descriptionSize: s?.peopleSection?.descriptionSize??"", descriptionBorderEnabled: s?.peopleSection?.descriptionBorderEnabled??false, descriptionBorderColor: s?.peopleSection?.descriptionBorderColor??"", descriptionBorderWidth: s?.peopleSection?.descriptionBorderWidth??"", descriptionShadowColor: s?.peopleSection?.descriptionShadowColor??"", ctaText: s?.peopleSection?.ctaText??fbPeople.ctaText, ctaTextColor: s?.peopleSection?.ctaTextColor??"", ctaTextSize: s?.peopleSection?.ctaTextSize??"", ctaTextBorderEnabled: s?.peopleSection?.ctaTextBorderEnabled??false, ctaTextBorderColor: s?.peopleSection?.ctaTextBorderColor??"", ctaTextBorderWidth: s?.peopleSection?.ctaTextBorderWidth??"", ctaTextShadowColor: s?.peopleSection?.ctaTextShadowColor??"", ctaLink: s?.peopleSection?.ctaLink??fbPeople.ctaLink, cardHeading: s?.peopleSection?.cardHeading??fbPeople.cardHeading, cardHeadingColor: s?.peopleSection?.cardHeadingColor??"", cardHeadingSize: s?.peopleSection?.cardHeadingSize??"", cardHeadingBorderEnabled: s?.peopleSection?.cardHeadingBorderEnabled??false, cardHeadingBorderColor: s?.peopleSection?.cardHeadingBorderColor??"", cardHeadingBorderWidth: s?.peopleSection?.cardHeadingBorderWidth??"", cardHeadingShadowColor: s?.peopleSection?.cardHeadingShadowColor??"", cardDescription: s?.peopleSection?.cardDescription??fbPeople.cardDescription, cardDescriptionColor: s?.peopleSection?.cardDescriptionColor??"", cardDescriptionSize: s?.peopleSection?.cardDescriptionSize??"", cardDescriptionBorderEnabled: s?.peopleSection?.cardDescriptionBorderEnabled??false, cardDescriptionBorderColor: s?.peopleSection?.cardDescriptionBorderColor??"", cardDescriptionBorderWidth: s?.peopleSection?.cardDescriptionBorderWidth??"", cardDescriptionShadowColor: s?.peopleSection?.cardDescriptionShadowColor??"", cardImage: s?.peopleSection?.cardImage, cardImageUrl: s?.peopleSection?.cardImageUrl??fbPeople.cardImageUrl, cardImageAlt: s?.peopleSection?.cardImageAlt??s?.peopleSection?.cardHeading??fbPeople.cardHeading, cardCtaText: s?.peopleSection?.cardCTAText??fbPeople.cardCtaText, cardCTAColor: s?.peopleSection?.cardCTAColor??"", cardCTASize: s?.peopleSection?.cardCTASize??"", cardCTABorderEnabled: s?.peopleSection?.cardCTABorderEnabled??false, cardCTABorderColor: s?.peopleSection?.cardCTABorderColor??"", cardCTABorderWidth: s?.peopleSection?.cardCTABorderWidth??"", cardCTAShadowColor: s?.peopleSection?.cardCTAShadowColor??"", cardCtaLink: s?.peopleSection?.cardCTALink??fbPeople.cardCtaLink };
  people.cardBadge = s?.peopleSection?.cardBadge ?? fbPeople.cardBadge;
  people.stats = Array.isArray(s?.peopleSection?.stats)
    ? s.peopleSection.stats
    : Array.isArray(s?.peopleSection?.cardStats)
      ? s.peopleSection.cardStats
      : fbPeople.stats;
  const news        = { tag: s?.newsSectionMeta?.sectionTag??fbNews.tag, sectionTagColor: s?.newsSectionMeta?.sectionTagColor??"", sectionTagSize: s?.newsSectionMeta?.sectionTagSize??"", sectionTagBorderEnabled: s?.newsSectionMeta?.sectionTagBorderEnabled??false, sectionTagBorderColor: s?.newsSectionMeta?.sectionTagBorderColor??"", sectionTagBorderWidth: s?.newsSectionMeta?.sectionTagBorderWidth??"", sectionTagShadowColor: s?.newsSectionMeta?.sectionTagShadowColor??"", heading: s?.newsSectionMeta?.heading??fbNews.heading, headingColor: s?.newsSectionMeta?.headingColor??"", headingSize: s?.newsSectionMeta?.headingSize??"", headingBorderEnabled: s?.newsSectionMeta?.headingBorderEnabled??false, headingBorderColor: s?.newsSectionMeta?.headingBorderColor??"", headingBorderWidth: s?.newsSectionMeta?.headingBorderWidth??"", headingShadowColor: s?.newsSectionMeta?.headingShadowColor??"", viewMoreLink: s?.newsSectionMeta?.viewMoreLink??fbNews.viewMoreLink, viewMoreText: s?.newsSectionMeta?.viewMoreText??fbNews.viewMoreText, viewMoreTextColor: s?.newsSectionMeta?.viewMoreTextColor??"", viewMoreTextSize: s?.newsSectionMeta?.viewMoreTextSize??"", viewMoreTextBorderEnabled: s?.newsSectionMeta?.viewMoreTextBorderEnabled??false, viewMoreTextBorderColor: s?.newsSectionMeta?.viewMoreTextBorderColor??"", viewMoreTextBorderWidth: s?.newsSectionMeta?.viewMoreTextBorderWidth??"", viewMoreTextShadowColor: s?.newsSectionMeta?.viewMoreTextShadowColor??"", bylineLabel: s?.newsSectionMeta?.bylineLabel??"By:", readMoreText: s?.newsSectionMeta?.readMoreText??"Read More", articles: Array.isArray(newsPosts) ? newsPosts.map(p=>({ title:p.title, date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"}) : "", author:p.author??"Admin", category:p.category??"", excerpt:p.excerpt??"", image:p.mainImage, imageUrl:p.imageUrl??"/images/what-we-do-retail.webp", imageAlt:p.imageAlt??p.title??"", link:`/news/${p.slug}` })) : fbNews.articles };
  const siteSettings = mapPageCta(s, globalSettings, fbSettings);
  const statsTicker = {
    stats: Array.isArray(s?.statsTicker?.stats) ? s.statsTicker.stats : undefined,
  };

  return (
    <>
      <Hero data={hero} siteSettings={globalSettings} />
      <FeatureBoxes data={featureCards} />
      <WhatWeDo data={whatWeDo} />
      <Vision data={vision} />
      <Community data={community} />
      <About data={about} />
      <Certifications data={certifications} />
      <People data={people} />
      <NewsSection data={news} />
      <StatsTicker data={statsTicker} />
      <CTABanner data={siteSettings} />
    </>
  );
}
