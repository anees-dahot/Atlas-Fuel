"use client";
import Image from "next/image";
import Link from "next/link";

const defaultCards = [
  {
    title: "Atlas Store Locator",
    eyebrow: "Services",
    subtitle:
      "Quickly find your nearest local Atlas Fuel station and experience world-class service wherever you are.",
    imageUrl: "/images/store-locator.jpg",
    link: "/store-locator",
  },
  {
    title: "Atlas Performance Fleet",
    eyebrow: "Services",
    subtitle:
      "Discover our high-performance fleet engineered for speed, strength, and reliable nationwide fuel delivery.",
    imageUrl: "/images/what-we-do-retail.webp",
    link: "/atlas-car-racing",
  },
  {
    title: "Work With Us",
    eyebrow: "Careers",
    subtitle:
      "Join Atlas Fuel and build a rewarding career powering growth across Australia every single day.",
    imageUrl: "/images/work-with-us.jpg",
    link: "/careers",
  },
];

function CardIcon({ title }) {
  if (title?.includes("Locator"))
    return (
      <svg
        className="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    );
  if (title?.includes("Fleet"))
    return (
      <svg
        className="w-6 h-6"
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
    );
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}

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
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={
                    card.imageUrl ||
                    card.image?.asset?.url ||
                    "/images/what-we-do-fuel-transportation.webp"
                  }
                  alt={card.imageAlt || card.title || "Feature"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Green Label */}
                <div className="absolute top-4 left-4">
                  <span className={`${card.eyebrowColor || "text-white"} inline-block px-3 py-1.5 bg-primary text-xs font-bold uppercase tracking-wider`} style={getCardStyle(card, 'eyebrow')}>
                    {card.eyebrow || "Services"}
                  </span>
                </div>
                {/* Icon Circle */}
                <div className="absolute bottom-4 left-4 w-10 h-10 bg-primary flex items-center justify-center text-white">
                  <CardIcon title={card.title} />
                </div>
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
                  Read More
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
