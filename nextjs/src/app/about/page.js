import AboutPageContent from "./AboutPageContent";
import { getAboutPage, getSiteSettings } from "@/lib/sanity";
import { mergeWithFallback } from "@/lib/fallback";
import { loadPageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return loadPageMetadata({
    getPage: getAboutPage,
    getSiteSettings,
    path: "/about",
    fallbackTitle: "About Atlas Fuel Australia",
    fallbackDescription:
      "Learn about Atlas Fuel Australia's people, values, safety commitment, and nationwide fuel operations.",
    fallbackImage: {
      imageUrl: "https://atlasfuel.com.au/images/about-us-hero.jpg",
      alt: "Atlas Fuel operations",
    },
  });
}

// Fallback data for individual sections
const fallbackHero = {
  subtitle: "About Us",
  title: "Powering Australia with Reliability, Integrity, and Innovation",
  description:
    "Atlas Fuel Australia has been proudly fuelling the nation since 2010. From a single independently operated service station to one of Australia's most trusted fuel companies — we power the industries that power this nation.",
  heroImageUrl: "/images/about-us-hero.jpg",
  heroImageAlt: "Atlas Fuel operations",
};

const fallbackIntroStrip = {
  quote:
    "Trusted by Australia's leading industries — from mining and agriculture to marine and construction.",
  counters: [
    { value: "100M+", label: "Litres Delivered" },
    { value: "300+", label: "Jobs Connected" },
    { value: "15+", label: "Years Experience" },
    { value: "99.5%", label: "On-Time Rate" },
  ],
};

const fallbackValues = {
  eyebrow: "What We Offer",
  heading: "Driven by Trust, Powered by Experience.",
  whatWeOffer:
    "At Atlas Fuel Australia, we power industries, businesses, and communities with reliable, high-quality fuel solutions tailored to every need. From mining and agriculture to transport, marine, retail, and construction, we proudly support the sectors that drive Australia forward.",
  ctaText: "Enquire Now",
  ctaLink: "/contact",
  imageUrl: "/images/partner-in-safety.webp",
  imageAlt: "Atlas Fuel operations",
  values: [
    {
      title: "Our Vision",
      content:
        "To emerge as a frontrunner in the fuel industry by creatively providing ideal resolutions to our clientele — introducing fuel products in the Australian market that present a more economically efficient option to the end consumer.",
    },
    {
      title: "Our Mission",
      content:
        "To redefine the landscape of the fuel industry by consistently delivering excellence and pioneering solutions. We strive to be a leader — not only in providing top-notch fuel products but also in innovatively addressing the evolving needs of our customers.",
    },
    {
      title: "Our Goals",
      content:
        "We turn challenges into solutions and problems into opportunities through creativity and focus. These are the moments where innovation starts and real progress is made — driving us to lead in fuel supply and service across Australia.",
    },
  ],
};

const fallbackSafety = {
  eyebrow: "Safety First",
  heading: "Your Partner in Safety",
  content:
    "Atlas Fuel Australia places paramount importance on the safety of our employees and the communities we serve, particularly when handling dangerous goods such as petroleum products. Our commitment to safety is reflected in rigorous and comprehensive safe work procedures designed to mitigate risks and ensure the wellbeing of our workforce. Our teams undergo extensive training, equipping them with the knowledge and skills necessary to handle dangerous goods with precision and care. We adhere strictly to industry regulations and best practices, implementing robust safety protocols at every stage of the petroleum product supply chain.",
  safetyImageUrl: "/images/partner-in-safety.webp",
  safetyImageAlt: "Atlas Fuel safety operations",
  imageOverlayLabel: "ISO Certified Operations",
};

const fallbackCoreValues = {
  eyebrow: "Core Values",
  heading: "Our Core Values",
  subheading: "The principles that guide every decision we make.",
  imageUrl: "/images/what-we-do-onsite-diesel.webp",
  imageAlt: "Atlas Fuel core values in action",
  values: [
    {
      title: "Safety",
      description:
        "We place the safety of our people and communities above all else — it is non-negotiable in everything we do.",
      icon: "shield",
    },
    {
      title: "Respect",
      description:
        "We treat every customer, partner, and community with the highest level of respect, fairness, and integrity.",
      icon: "users",
    },
    {
      title: "Quality",
      description:
        "We deliver premium fuel products and services, meeting the highest international standards every time.",
      icon: "star",
    },
    {
      title: "Innovation",
      description:
        "We continuously invest in smarter systems, better processes, and new technologies to lead the industry forward.",
      icon: "zap",
    },
  ],
};

const fallbackCulture = {
  eyebrow: "Our Team",
  heading: "Our People",
  description:
    "Atlas Fuel Australia is powered by a team of highly skilled professionals dedicated to excellence in every aspect of our operations. We prioritize attracting, retaining, and nurturing top talent, creating an environment where skills are honed and expertise is valued.",
  imageUrl: "/images/work-with-us.jpg",
  imageAlt: "Atlas Fuel team",
  cultureItems: [
    {
      title: "Our Culture",
      content:
        "We excel in delivering both the product and the concept — streamlining operations in a rapid, agile, and collaborative execution. Our teams work tirelessly to improve logistics for our clients.",
      ctaText: "Enquire Now",
      ctaLink: "/contact",
      imageUrl: "/images/work-with-us.webp",
      imageAlt: "Atlas Fuel team collaborating",
    },
    {
      title: "Our Operators",
      content:
        "At Atlas Fuel Australia, our work culture emphasises a commitment to excellence, continuous learning, and a supportive environment ensuring both personal and professional growth.",
      ctaText: "Enquire Now",
      ctaLink: "/contact",
      imageUrl: "/images/work-with-us.jpg",
      imageAlt: "Atlas Fuel operators",
    },
    {
      title: "Our Team",
      content:
        "Our team collaborates across departments to deliver reliable fuel solutions. We focus on innovation, efficiency, and maintaining the highest service standards for our customers.",
      ctaText: "Enquire Now",
      ctaLink: "/contact",
      imageUrl: "/images/work-with-us.webp",
      imageAlt: "Atlas Fuel team",
    },
  ],
};

const fallbackStory = {
  tagline: "Unrivalled. Unmatched. Unstoppable.",
  heading: "Our Story",
  body: "Atlas Fuel has been proudly serving Australia since 2010. From a single independently operated service station, we've grown into one of Australia's most trusted fuel companies. Our commitment to quality, reliability, and customer service has driven our expansion across the nation.",
  keyPoints: [
    "100% Australian owned and operated",
    "Nationwide fuel delivery network",
    "World-class service stations",
    "Commitment to safety and sustainability",
  ],
  image1Url: "/images/about-us.jpg",
  image1Alt: "Atlas Fuel operations",
  image2Url: "/images/our-story.webp",
  image2Alt: "Atlas Fuel fleet",
  stat1Value: "2010",
  stat1Label: "Established",
  stat2Value: "100M+",
  stat2Label: "Litres Delivered",
};

const fallbackHowWeWork = {
  heading: "How We Work",
  subheading: "A simple, reliable process built around your needs.",
  steps: [
    { step: "01", title: "You Contact Us", description: "Reach out by phone, email or our online form. Our team responds within 24 hours to understand your exact fuel requirements.", imageUrl: "/images/what-we-do-fuel-transportation.webp", imageAlt: "Atlas Fuel customer enquiry" },
    { step: "02", title: "We Plan the Delivery", description: "Our logistics team coordinates your order, schedules the tanker, and confirms delivery time — tracked live via GPS throughout.", imageUrl: "/images/hero-trucks.jpg", imageAlt: "Atlas Fuel delivery planning" },
    { step: "03", title: "Fuel Delivered On Time", description: "Our certified driver delivers your fuel safely and on schedule, every time. Zero downtime. 99.5% on-time delivery rate.", imageUrl: "/images/what-we-do-mining-civil.webp", imageAlt: "Atlas Fuel delivery" },
  ],
};

const fallbackBusinessAreas = {
  heading: "What We Do",
  subheading: "Comprehensive fuel solutions across every sector of Australian industry.",
  areas: [
    { title: "Fuel Stations", description: "World-class retail fuel stations delivering quality, convenience and competitive pricing for everyday Australians.", icon: "fuel", link: "/fuel-stations", imageUrl: "/images/what-we-do-retail.webp", imageAlt: "Atlas Fuel retail station" },
    { title: "Bulk Diesel Supply", description: "Large-scale bulk fuel delivery for mining, agriculture, construction and industrial operations across Australia.", icon: "truck", link: "/fuel-transportation", imageUrl: "/images/what-we-do-mining-civil.webp", imageAlt: "Atlas Fuel bulk diesel delivery" },
    { title: "Fuel Transportation", description: "GPS-tracked road tanker fleet providing safe, on-time fuel logistics across Western Australia and beyond.", icon: "transport", link: "/fuel-transportation", imageUrl: "/images/what-we-do-fuel-transportation.webp", imageAlt: "Atlas Fuel transportation fleet" },
    { title: "Construction & Civil", description: "On-site fuel management and delivery for civil works, road projects and remote construction sites.", icon: "hardhat", link: "/services/mining-fuel", imageUrl: "/images/what-we-do-onsite-diesel.webp", imageAlt: "Atlas Fuel construction delivery" },
  ],
};

const fallbackExcellence = {
  eyebrow: "Our Philosophy",
  heading: "We Deliver Excellence",
  content:
    "There's a moment when it all comes together. When a complicated challenge turns into a creative solution. When a problem turns into an opportunity. We live for those moments. Here at Atlas, creativity is what drives us forward. We are the outliers. The non-conformists. The game-changers. At Atlas Fuel Australia, we believe in more than just powering vehicles — we're here to empower your journeys and fuel the limitless possibilities of tomorrow.",
  ctaText: "Contact Us",
  ctaLink: "/contact",
  secondaryCtaText: "Our Services",
  secondaryCtaLink: "/services",
  excellenceBgUrl: "/images/what-we-offer.webp",
  excellenceBgAlt: "Atlas Fuel excellence",
};

const fallbackSiteSettings = {
  ctaBannerHeading: "Ready to Power Your Business?",
  ctaBannerText:
    "Contact us today for a free fuel quote and let our team build a solution tailored to your needs.",
  ctaBannerButtonText: "Get a Free Quote",
  ctaBannerButtonLink: "/contact",
};

export default async function AboutPage() {
  let aboutData = null;
  try {
    aboutData = await getAboutPage();
  } catch (error) {
    console.error("Failed to fetch About page data from Sanity:", error);
  }

  const hero = mergeWithFallback(fallbackHero, aboutData?.heroSection);
  const introStrip = mergeWithFallback(fallbackIntroStrip, aboutData?.introStripSection);
  const values = mergeWithFallback(fallbackValues, aboutData?.valuesSection);
  const safety = mergeWithFallback(fallbackSafety, aboutData?.safetySection);
  const coreValues = mergeWithFallback(fallbackCoreValues, aboutData?.coreValuesSection);
  const culture = mergeWithFallback(fallbackCulture, aboutData?.cultureSection);
  const story = mergeWithFallback(fallbackStory, aboutData?.storySection);
  const excellence = mergeWithFallback(fallbackExcellence, aboutData?.excellenceSection);
  const howWeWork = mergeWithFallback(fallbackHowWeWork, aboutData?.howWeWorkSection);
  const businessAreas = mergeWithFallback(fallbackBusinessAreas, aboutData?.businessAreasSection);
  const siteSettings = mergeWithFallback(fallbackSiteSettings, aboutData?.ctaBanner);

  return (
    <AboutPageContent
      hero={hero}
      introStrip={introStrip}
      values={values}
      safety={safety}
      coreValues={coreValues}
      culture={culture}
      story={story}
      howWeWork={howWeWork}
      businessAreas={businessAreas}
      excellence={excellence}
      siteSettings={siteSettings}
    />
  );
}
