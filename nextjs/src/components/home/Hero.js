"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

const defaultQuickLinks = [
  { name: "Atlas Fuel Prices", href: "/fuel-prices", icon: "dollar" },
  { name: "Contact Fuel Stations", href: "/store-locator", icon: "map" },
  { name: "Call Head Office", href: "tel:+61863777644", icon: "phone" },
  { name: "Need Diesel?", href: "/commercial-diesel", icon: "truck" },
  { name: "H/O Address", href: "#", icon: "building" },
  {
    name: "24/7 Emergency Response Only",
    href: "tel:+61863777644",
    icon: "alert",
    isEmergency: true,
  },
];

const icons = {
  fuel: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17" />
      <path d="M3 22h12" />
      <path d="M15 12l3-3 3 3-3 3" />
    </svg>
  ),
  phone: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6.87-6.87 19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.904.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  truck: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  dollar: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  map: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  briefcase: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="7" width="20" height="14" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  ),
  alert: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  building: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M8 10h.01" />
      <path d="M16 10h.01" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
    </svg>
  ),
};

function extractLines(title) {
  if (!title) return ["Welcome to", "ATLAS FUEL", "AUSTRALIA"];
  if (typeof title === "string") return title.split("\n").filter(Boolean);
  if (Array.isArray(title))
    return title
      .filter((b) => b.children?.[0]?.text)
      .map((b) => b.children[0].text);
  return ["Welcome to", "ATLAS FUEL", "AUSTRALIA"];
}

const sizeMap = { '1': '12px', '2': '16px', '3': '20px', '4': '24px', '5': '32px', '6': '48px', '7': '70px' };

export default function Hero({ data, siteSettings }) {
  const lines = extractLines(data?.title);
  const imageUrl = data?.heroImageUrl || "/images/hero-trucks.jpg";
  const eyebrow = data?.eyebrow || "On-Site Fuel Solutions";
  const desc =
    data?.description ||
    "Atlas Fuel Australia delivers reliable, efficient fuel solutions nationwide. We cater to businesses of all sizes, ensuring quality and sustainability.";
  const ctaPrimary = data?.ctaPrimary || "Contact Fuel Station";
  const ctaPrimaryLink = data?.ctaPrimaryLink || "/contact";
  const ctaSecondary = data?.ctaSecondary || "New Bulk Fuel Enquiry";
  const ctaSecondaryLink =
    data?.ctaSecondaryLink || "mailto:info@atlasfuel.com.au";
  const videoTitle = data?.videoTitle || "Watch our video";
  const videoSubtitle =
    data?.videoSubtitle || "Learn about Atlas Fuel Australia";

  // Use quickLinks from siteSettings or fall back to defaults
  const sourceQuickLinks = siteSettings?.heroQuickLinks?.length > 0
    ? siteSettings.heroQuickLinks
    : data?.quickLinks?.length > 0
    ? data.quickLinks
    : defaultQuickLinks;
  const quickLinks = sourceQuickLinks.map((link) => {
    const name = link.name || link.label || "";
    return {
      ...link,
      name,
      href:
        name.toLowerCase() === "contact fuel stations"
          ? "/store-locator"
          : link.href,
    };
  });

  // Use heroStats from data (query now fetches this)
  const heroStats = data?.heroStats || [];

  const eyebrowStyle = {
    ...(data?.eyebrowSize && { fontSize: sizeMap[data.eyebrowSize] }),
    ...(data?.eyebrowBorderEnabled && {
      WebkitTextStroke: `${data.eyebrowBorderWidth} ${data.eyebrowBorderColor}`,
      ...(data?.eyebrowShadowColor && { textShadow: `0 0 10px ${data.eyebrowShadowColor}` }),
    }),
  };

  const titleLine1Style = {
    ...(data?.titleLine1Size && { fontSize: sizeMap[data.titleLine1Size] }),
    ...(data?.titleLine1BorderEnabled && {
      WebkitTextStroke: `${data.titleLine1BorderWidth} ${data.titleLine1BorderColor}`,
      ...(data?.titleLine1ShadowColor && { textShadow: `0 0 10px ${data.titleLine1ShadowColor}` }),
    }),
  };

  const titleLine2Style = {
    ...(data?.titleLine2Size && { fontSize: sizeMap[data.titleLine2Size] }),
    ...(data?.titleLine2BorderEnabled && {
      WebkitTextStroke: `${data.titleLine2BorderWidth} ${data.titleLine2BorderColor}`,
      ...(data?.titleLine2ShadowColor && { textShadow: `0 0 10px ${data.titleLine2ShadowColor}` }),
    }),
  };

  const titleLine3Style = {
    ...(data?.titleLine3Size && { fontSize: sizeMap[data.titleLine3Size] }),
    ...(data?.titleLine3BorderEnabled && {
      WebkitTextStroke: `${data.titleLine3BorderWidth} ${data.titleLine3BorderColor}`,
      ...(data?.titleLine3ShadowColor && { textShadow: `0 0 10px ${data.titleLine3ShadowColor}` }),
    }),
  };

  const descriptionStyle = {
    ...(data?.descriptionSize && { fontSize: sizeMap[data.descriptionSize] }),
    ...(data?.descriptionBorderEnabled && {
      WebkitTextStroke: `${data.descriptionBorderWidth} ${data.descriptionBorderColor}`,
      ...(data?.descriptionShadowColor && { textShadow: `0 0 10px ${data.descriptionShadowColor}` }),
    }),
  };

  const primaryCTAStyle = {
    ...(data?.ctaPrimarySize && { fontSize: sizeMap[data.ctaPrimarySize] }),
    ...(data?.ctaPrimaryBorderEnabled && {
      WebkitTextStroke: `${data.ctaPrimaryBorderWidth} ${data.ctaPrimaryBorderColor}`,
      ...(data?.ctaPrimaryShadowColor && { textShadow: `0 0 10px ${data.ctaPrimaryShadowColor}` }),
    }),
  };

  const secondaryCTAStyle = {
    ...(data?.ctaSecondarySize && { fontSize: sizeMap[data.ctaSecondarySize] }),
    ...(data?.ctaSecondaryBorderEnabled && {
      WebkitTextStroke: `${data.ctaSecondaryBorderWidth} ${data.ctaSecondaryBorderColor}`,
      ...(data?.ctaSecondaryShadowColor && { textShadow: `0 0 10px ${data.ctaSecondaryShadowColor}` }),
    }),
  };

  return (
    <section className="relative flex items-start" style={{ minHeight: '80svh' }}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={imageUrl}
          alt={data?.heroImageAlt || "Atlas Fuel"}
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 85%' }}
        />
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-56">
        <div className="max-w-2xl lg:max-w-3xl">
          <div className="flex items-center gap-3 sm:gap-4 mb-2">
            <div className="h-0.5 w-12 sm:w-16 bg-primary" />
            <span className={`${data?.eyebrowColor || "text-primary"} text-xs sm:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]`} style={eyebrowStyle}>
              {eyebrow}
            </span>
          </div>
          <h1 className="mt-0 space-y-1 sm:space-y-0 font-heading">
            {lines.map((word, i) => {
              const titleStyle = i === 0 ? titleLine1Style : i === 1 ? titleLine2Style : titleLine3Style;
              const titleColor = i === 0 ? data?.titleLine1Color : i === 1 ? data?.titleLine2Color : data?.titleLine3Color;
              return (
                <span
                  key={i}
                  className={cn(
                    "block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[1.1] sm:leading-[0.9] uppercase tracking-tight",
                    titleColor || (i === 1 ? "text-primary" : "text-gray-900"),
                  )}
                  style={titleStyle}
                >
                  {word}
                </span>
              );
            })}
          </h1>
          <p
            className={`${data?.descriptionColor || "text-white/80"} mt-2 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed`}
            style={descriptionStyle}
          >
            {desc}
          </p>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-wrap sm:flex-row gap-3 sm:gap-4">
            <Link
              href={ctaPrimaryLink || "#"}
              className="group inline-flex items-center justify-center gap-3 px-5 sm:px-6 py-3 bg-primary text-white font-bold uppercase tracking-wide transition-all duration-300 hover:bg-primary-dark text-sm sm:text-base"
            >
              <span className={data?.ctaPrimaryColor || ""} style={primaryCTAStyle}>{ctaPrimary}</span>
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a
              href={ctaSecondaryLink || "#"}
              className="group inline-flex items-center justify-center gap-3 px-5 sm:px-6 py-3 bg-gray-100 border border-gray-300 text-gray-900 font-bold uppercase tracking-wide transition-all duration-300 hover:bg-gray-200 hover:border-gray-400 text-sm sm:text-base"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="4" width="20" height="16" />
                <path d="M22 7l-10 6L2 7" />
              </svg>
              <span className={data?.ctaSecondaryColor || ""} style={secondaryCTAStyle}>{ctaSecondary}</span>
            </a>
          </div>
          <div className="mt-4 sm:mt-6">
            <button className="group flex items-center gap-4 text-white/80 hover:text-white transition-colors duration-300">
              <span className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 shrink-0">
                <svg
                  className="w-5 h-5 text-white ml-0.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-pulse-ring" />
              </span>
              <div className="text-left">
                <span className="block text-sm font-semibold uppercase tracking-wider">
                  {videoTitle}
                </span>
                <span className="block text-xs text-white/60">
                  {videoSubtitle}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* Quick links + Sectors — anchored at very bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Glassmorphism grid boxes */}
        <div className="max-w-7xl mx-auto px-6 pb-6 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.href || "#"}
                className={cn(
                  "group flex items-center gap-3 px-4 py-3 transition-all duration-300",
                  link.isEmergency
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:border-white text-white hover:text-black",
                )}
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                    link.isEmergency
                      ? "bg-white/20"
                      : "bg-primary/20 group-hover:bg-primary",
                  )}
                >
                  <span
                    className={cn(
                      "transition-colors duration-200",
                      link.isEmergency
                        ? "text-white"
                        : "text-primary group-hover:text-white",
                    )}
                  >
                    {icons[link.icon]}
                  </span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide leading-tight">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>
        {/* Sectors We Cover white bar */}
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-4 h-4 animate-bounce"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
                <span className="text-sm font-medium">Sectors We Cover</span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                {heroStats.length > 0 ? (
                  heroStats.map((stat, idx) => (
                    <div key={idx} className="group flex items-center gap-3 hover:gap-4 transition-all duration-300 cursor-default">
                      <div className="w-1 h-8 bg-primary rounded-full group-hover:h-10 group-hover:bg-primary-dark transition-all duration-300"></div>
                      <div>
                        <div className="text-lg font-bold font-heading group-hover:text-primary transition-colors duration-300">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="group flex items-center gap-3 hover:gap-4 transition-all duration-300 cursor-default">
                      <div className="w-1 h-8 bg-primary rounded-full group-hover:h-10 group-hover:bg-primary-dark transition-all duration-300"></div>
                      <div>
                        <div className="text-lg font-bold font-heading group-hover:text-primary transition-colors duration-300">300+</div>
                        <div className="text-xs text-gray-500">Jobs Connected</div>
                      </div>
                    </div>
                    <div className="group flex items-center gap-3 hover:gap-4 transition-all duration-300 cursor-default">
                      <div className="w-1 h-8 bg-primary rounded-full group-hover:h-10 group-hover:bg-primary-dark transition-all duration-300"></div>
                      <div>
                        <div className="text-lg font-bold font-heading group-hover:text-primary transition-colors duration-300">8+</div>
                        <div className="text-xs text-gray-500">Sectors Servicing</div>
                      </div>
                    </div>
                    <div className="group flex items-center gap-3 hover:gap-4 transition-all duration-300 cursor-default">
                      <div className="w-1 h-8 bg-primary rounded-full group-hover:h-10 group-hover:bg-primary-dark transition-all duration-300"></div>
                      <div>
                        <div className="text-lg font-bold font-heading group-hover:text-primary transition-colors duration-300">100%</div>
                        <div className="text-xs text-gray-500">Australian Owned</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
    </section>
  );
}
