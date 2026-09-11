"use client";
import Link from "next/link";
import CmsImage from "@/components/common/CmsImage";

const defaultCards = [
  {
    title: "Atlas Store Locator",
    eyebrow: "Services",
    subtitle:
      "Quickly find your nearest local Atlas Fuel station and experience world-class service wherever you are.",
    imageUrl: "/images/store-locator.jpg",
    link: "/store-locator",
    ctaText: "Read More",
  },
  {
    title: "Atlas Performance Fleet",
    eyebrow: "Services",
    subtitle:
      "Discover our high-performance fleet engineered for speed, strength, and reliable nationwide fuel delivery.",
    imageUrl: "/images/what-we-do-retail.webp",
    link: "/atlas-car-racing",
    ctaText: "Read More",
  },
  {
    title: "Work With Us",
    eyebrow: "Careers",
    subtitle:
      "Join Atlas Fuel and build a rewarding career powering growth across Australia every single day.",
    imageUrl: "/images/work-with-us.jpg",
    link: "/careers",
    ctaText: "Read More",
  },
];

const sizeMap = { '1': '12px', '2': '16px', '3': '20px', '4': '24px', '5': '32px', '6': '48px', '7': '70px' };

export default function FeatureBoxes({ data }) {
  const cards = data && data.length ? data : defaultCards;

  const getCardStyle = (card, field) => {
    const style = {};
    if (card[`${field}Size`]) {
      style.fontSize = sizeMap[card[`${field}Size`]];
    }
    if (card[`${field}BorderEnabled`]) {
      style.WebkitTextStroke = `${card[`${field}BorderWidth`]} ${card[`${field}BorderColor`]}`;
      if (card[`${field}ShadowColor`]) {
        style.textShadow = `0 0 10px ${card[`${field}ShadowColor`]}`;
      }
    }
    return style;
  };

  return (
    <section className="py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* 3 Boxes Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              key={card._id || index}
              href={card.link || "/fuel-stations"}
              className="group relative block overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-200 hover:border-primary/40"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden">
                <CmsImage
                  value={card.image || card.imageUrl}
                  fallbackSrc="/images/what-we-do-fuel-transportation.webp"
                  alt={card.imageAlt || card.title || "Feature"}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  ratio="16/9"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className={`${card.titleColor || "text-black"} text-lg font-bold mb-2 uppercase tracking-wide`} style={getCardStyle(card, 'title')}>
                  {card.title || "Untitled"}
                </h3>
                <p className={`${card.subtitleColor || "text-gray-500"} text-sm leading-relaxed mb-4`} style={getCardStyle(card, 'subtitle')}>
                  {card.subtitle || ""}
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider group-hover:gap-3 transition-all">
                  {card.ctaText || "Read More"}
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
