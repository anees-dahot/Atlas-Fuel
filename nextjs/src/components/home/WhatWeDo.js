"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const sectorIcons = {
  stations: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  mining: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 20h20" />
      <path d="M5 20V8l7-5 7 5v12" />
      <path d="M9 20v-4h6v4" />
    </svg>
  ),
  logistics: (
    <svg
      className="w-5 h-5"
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
  onsite: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17" />
      <path d="M3 22h12" />
    </svg>
  ),
  marine: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 20l1.5-1.5C3 17 3 14 5 12l3-3 3 3 5-5 5 5v6H2z" />
      <path d="M12 3v6" />
      <path d="M9 6l3-3 3 3" />
    </svg>
  ),
  agriculture: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 22V8" />
      <path d="M5 12l7-8 7 8" />
      <path d="M3 22h18" />
      <path d="M7 16c0-2.76 2.24-5 5-5s5 2.24 5 5" />
    </svg>
  ),
};

function getIcon(slug) {
  return sectorIcons[slug] || sectorIcons.stations;
}

const defaultSectors = [
  {
    slug: "atlas-fuel-stations",
    href: "/fuel-stations",
    title: "Atlas Fuel Stations",
    description:
      "Atlas Fuel stations deliver more than fuel — we power communities with convenience, service, and reliability.",
    fullDescription:
      "Our fuel stations are designed for everyday Australians, offering world-class facilities, competitive pricing, and exceptional customer service.",
    imageUrl: "/images/fuel-stations.jpg",
    stats: [
      { value: "30+", label: "Locations" },
      { value: "50,000+", label: "Daily Customers" },
    ],
  },
  {
    slug: "mining-fuel",
    href: "/services/mining-fuel",
    title: "Mining & Civil",
    description:
      "From mining to marine, agriculture to civil works, Atlas Fuel proudly keeps every sector moving forward.",
    fullDescription:
      "We provide comprehensive fuel solutions to mining operations, civil construction projects, and heavy industry across Australia.",
    imageUrl: "/images/mining-and-civil.jpg",
    stats: [
      { value: "30+", label: "Clients" },
      { value: "200M+", label: "Litres Delivered Annually" },
    ],
  },
  {
    slug: "fuel-transportation",
    href: "/fuel-transportation",
    title: "Fuel Logistics",
    description:
      "With a modern fleet and precision planning, Atlas Fuel ensures your fuel arrives safely, on time, every time.",
    fullDescription:
      "Our state-of-the-art logistics network features GPS-tracked vehicles, real-time delivery updates, and 24/7 emergency response capabilities.",
    imageUrl: "/images/fuel-logistics.jpg",
    stats: [
      { value: "25+", label: "Fleet Size" },
      { value: "99.5%", label: "On Time" },
    ],
  },
  {
    slug: "onsite-bulk-diesel",
    href: "/services/onsite-bulk-diesel",
    title: "On-Site Diesel",
    description:
      "Atlas Fuel brings the pump to you — efficient onsite diesel solutions that keep your operations running nonstop.",
    fullDescription:
      "Our mobile refueling units and on-site tank installations eliminate downtime and improve operational efficiency.",
    imageUrl: "/images/onsite-diesel.jpg",
    stats: [
      { value: "200+", label: "Sites Serviced" },
      { value: "24/7", label: "Available to Deliver" },
    ],
  },
  {
    slug: "marine-fuel",
    href: "/services/marine-fuel",
    title: "Marine Bunkering",
    description:
      "Marine bunkering solutions ensuring your vessels stay fueled and operational across Australian waters.",
    fullDescription:
      "We provide comprehensive marine fuel services including bunker fuel delivery, lubricants, and vessel refueling at major Australian ports.",
    imageUrl: "/images/marine-bunkering.jpg",
    stats: [
      { value: "8+", label: "Ports Covered" },
      { value: "500+", label: "Vessels Served" },
    ],
  },
  {
    slug: "agriculture-fuel",
    href: "/services/agriculture-fuel",
    title: "Agriculture",
    description:
      "Farm fuel delivery keeping Australian agriculture running efficiently during critical seasons.",
    fullDescription:
      "We understand the unique demands of Australian agriculture. Our flexible delivery schedules, bulk storage solutions, and competitive pricing help farmers maximize efficiency.",
    imageUrl: "/images/agriculture.jpg",
    stats: [
      { value: "300+", label: "Farms Supplied" },
      { value: "WA Wide", label: "Coverage" },
    ],
  },
  {
    slug: "independent-fuel-stations",
    href: "/fuel-stations",
    title: "Independent Fuel Stations",
    description:
      "Atlas Fuel delivers competitive fuel prices without compromising quality, keeping you powered for less.",
    fullDescription:
      "Our direct supply agreements and efficient distribution network allow us to offer some of the most competitive fuel prices in Australia.",
    imageUrl: "/images/independent-fuel-stations.jpg",
    stats: [
      { value: "8+", label: "Distributors" },
      { value: "10%", label: "Savings" },
    ],
  },
  {
    slug: "local-fuel-distributors",
    href: "/services/local-fuel-distributors",
    title: "Local Fuel Distributors",
    description:
      "Atlas Fuel stands with the community, driving support, connection, and progress wherever we operate.",
    fullDescription:
      "We believe in giving back to the communities we serve. From sponsoring local sports teams to supporting charitable initiatives.",
    imageUrl: "/images/what-we-do-mining-civil.webp",
    stats: [
      { value: "300+", label: "Jobs Created" },
      { value: "25+", label: "Community Programs" },
    ],
  },
];

const sizeMap = { '1': '12px', '2': '16px', '3': '20px', '4': '24px', '5': '32px', '6': '48px', '7': '70px' };

const getStyle = (obj, field) => {
  const style = {};
  if (obj[`${field}Size`]) {
    style.fontSize = sizeMap[obj[`${field}Size`]];
  }
  if (obj[`${field}BorderEnabled`]) {
    style.WebkitTextStroke = `${obj[`${field}BorderWidth`]} ${obj[`${field}BorderColor`]}`;
    if (obj[`${field}ShadowColor`]) {
      style.textShadow = `0 0 10px ${obj[`${field}ShadowColor`]}`;
    }
  }
  return style;
};

export default function WhatWeDo({ data }) {
  const content = Array.isArray(data) ? { sectors: data } : data || {};
  const sectors = content.sectors?.length
    ? content.sectors.filter((s) => s.slug !== "community")
    : defaultSectors;
  const sectionTag = content.sectionTag || "Sectors We Cover";
  const sectionHeading = content.sectionHeading || "What We Do";
  const scrollHintText = content.scrollHintText || "Scroll to explore";

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const stRef = useRef(null); // ScrollTrigger instance
  const currentIdx = useRef(0); // track index without re-render

  // ── Scroll reveal trigger ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Scroll-driven sector cycling (pinned) ──
  useLayoutEffect(() => {
    if (!isVisible || sectors.length === 0) return;

    let killed = false;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (killed || !sectionRef.current) return;

      const scrollPerSector = Math.min(window.innerHeight * 0.25, 220);
      const totalScroll = scrollPerSector * (sectors.length - 1);

      stRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalScroll}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        snap: {
          snapTo: sectors.length > 1 ? 1 / (sectors.length - 1) : 1,
          duration: { min: 0.3, max: 0.5 },
          ease: "power2.inOut",
          delay: 0.05,
        },
        onUpdate: (self) => {
          const idx = Math.min(
            sectors.length - 1,
            Math.floor(self.progress * sectors.length),
          );
          if (idx !== currentIdx.current) {
            currentIdx.current = idx;
            setActiveIndex(idx);
          }
        },
      });
    };

    init();

    return () => {
      killed = true;
      if (stRef.current) {
        stRef.current.kill();
        stRef.current = null;
      }
    };
  }, [isVisible, sectors.length]);

  // ── Animate card on index change ──
  const animateCard = useCallback(async () => {
    if (!contentRef.current) return;
    const { default: gsap } = await import("gsap");
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    if (isVisible) animateCard();
  }, [activeIndex, isVisible, animateCard]);

  // ── Tab click: jump to sector + update scroll position ──
  const handleTabClick = useCallback(
    (i) => {
      if (i === activeIndex) return;
      currentIdx.current = i;
      setActiveIndex(i);

      // Scroll to the matching pinned position
      if (stRef.current && sectors.length > 1) {
        const progress = i / (sectors.length - 1);
        const target =
          stRef.current.start +
          (stRef.current.end - stRef.current.start) * progress;
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    },
    [activeIndex, sectors.length],
  );

  const sector = sectors[activeIndex] || sectors[0] || {};

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      id="sectors"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        {/* Label */}
        <div
          className={cn(
            "transition-all duration-700 mb-4",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          <span
            className={`${content.sectionTagColor || ""} section-label`}
            style={getStyle(content, "sectionTag")}
          >
            {sectionTag}
          </span>
        </div>

        {/* Heading */}
        <h2
          className={cn(
            `${content.sectionHeadingColor || "text-black"} font-heading text-4xl md:text-5xl lg:text-6xl font-semibold uppercase tracking-wide mb-12 transition-all duration-700 delay-100`,
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
          style={getStyle(content, "sectionHeading")}
        >
          {sectionHeading}
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Tabs */}
          <div
            className={cn(
              "divide-y divide-gray-100 transition-all duration-700 delay-200",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            {sectors.map((s, i) => (
              <button
                key={s.slug || i}
                onClick={() => handleTabClick(i)}
                className={cn(
                  "group w-full text-left px-5 py-4 transition-all duration-300 flex items-center gap-4",
                  activeIndex === i
                    ? "bg-primary text-white"
                    : "bg-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <span
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300",
                    activeIndex === i
                      ? "bg-white/20 text-white"
                      : "bg-primary/10 text-primary group-hover:bg-primary/15",
                  )}
                >
                  {getIcon(s.slug)}
                </span>
                <span className={`${activeIndex === i ? "text-white" : (s.titleColor || "")} font-semibold uppercase tracking-wider text-sm`} style={getStyle(s, 'title')}>
                  {s.title}
                </span>
                {activeIndex === i && (
                  <svg
                    className="w-4 h-4 ml-auto text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
              </button>
            ))}

            {/* Scroll hint */}
            {isVisible && (
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-6 flex items-center gap-2">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
                {scrollHintText}
              </p>
            )}
          </div>

          {/* Right: Content card */}
          <div
            ref={contentRef}
            className={cn(
              "transition-all duration-700 delay-300",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6",
            )}
          >
            <div className="bg-white border border-gray-100 shadow-lg overflow-hidden">
              {/* Image */}
              <div className="relative h-72 overflow-hidden bg-gray-100">
                <img
                  key={sector.slug}
                  src={sector.imageUrl || "/images/hero-trucks.jpg"}
                  alt={sector.imageAlt || sector.title || ""}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {sector.stats?.length > 0 && (
                  <div className="absolute bottom-6 left-6 right-6 flex gap-8">
                    {sector.stats.map((stat, i) => (
                      <div key={i}>
                        <div className={`${stat.valueColor || "text-white"} text-3xl font-bold font-heading leading-none`} style={getStyle(stat, 'value')}>
                          {stat.value}
                        </div>
                        <div className={`${stat.labelColor || "text-white/80"} text-xs mt-1 uppercase tracking-wide`} style={getStyle(stat, 'label')}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="p-8">
                <h3 className={`${sector.titleColor || "text-black"} font-heading text-2xl font-semibold uppercase tracking-wide mb-3`} style={getStyle(sector, 'title')}>
                  {sector.title}
                </h3>
                <p className={`${sector.descriptionColor || "text-gray-500"} leading-relaxed text-sm mb-6`} style={getStyle(sector, 'description')}>
                  {sector.fullDescription || sector.description}
                </p>
                <Link
                  href={sector.href || `/${sector.slug || ""}`}
                  className="read-more group"
                >
                  Learn More
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Sector progress dots */}
            <div className="flex items-center gap-2 mt-4">
              {sectors.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleTabClick(i)}
                  className={cn(
                    "transition-all duration-300 rounded-full",
                    activeIndex === i
                      ? "w-6 h-1.5 bg-primary"
                      : "w-1.5 h-1.5 bg-gray-200 hover:bg-gray-400",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
