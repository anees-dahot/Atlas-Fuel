"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

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

export default function VisionSection({ data = {} }) {
  const sectionRef = useRef(null);

  const tag = data?.tag || "Vision & Purpose - 2030";
  const quote =
    data?.quote ||
    '"Our purpose is to provide reliable and affordable petroleum products to help create a better world for everyone."';
  const quoteHighlight = data?.quoteHighlight || "better world for everyone.";
  const description =
    data?.description ||
    "Behind the scenes, discover the scale of our logistics operations in action and explore the community initiatives and charity events that make a real difference. You'll also witness how we're building world-class fuel stations designed for everyday Australians, while following the remarkable journey of Atlas Fuel from a single site to a national network.";
  const ctaText = data?.ctaText || "Read More";
  const ctaLink = data?.ctaLink || "/about";
  const videoImageUrl = data?.videoImageUrl || "/images/watch-our-videos.jpg";
  const videoLabel = data?.videoLabel || "Watch What We Do";

  const highlightIdx = quoteHighlight ? quote.indexOf(quoteHighlight) : -1;
  const quoteBefore = highlightIdx > -1 ? quote.slice(0, highlightIdx) : quote;
  const quoteAfter =
    highlightIdx > -1 ? quote.slice(highlightIdx + quoteHighlight.length) : "";

  useEffect(() => {
    let ctx;
    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      const el = sectionRef.current;
      if (!el) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
        tl.from(".vision-tag", {
          y: -30,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: "back.out(1.5)",
          clearProps: "all",
        })
          .from(
            ".vision-quote",
            {
              x: -60,
              opacity: 0,
              rotationY: 15,
              duration: 1.2,
              ease: "power3.out",
              clearProps: "all",
            },
            0.2,
          )
          .from(
            ".vision-desc",
            {
              x: -40,
              opacity: 0,
              filter: "blur(10px)",
              duration: 1,
              ease: "power3.out",
              clearProps: "all",
            },
            0.45,
          )
          .from(
            ".vision-cta",
            {
              x: -30,
              opacity: 0,
              scale: 0.9,
              duration: 0.8,
              ease: "back.out(1.2)",
              clearProps: "all",
            },
            0.6,
          )
          .from(
            ".vision-video",
            {
              x: 80,
              opacity: 0,
              scale: 0.85,
              rotationX: 10,
              duration: 1.3,
              ease: "back.out(1.3)",
              clearProps: "all",
            },
            0.3,
          );
      }, el);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-cream"
      id="vision"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Tag */}
        <div className="vision-tag flex items-center gap-4 mb-10">
          <div className="w-12 h-0.5 bg-primary" />
          <span className={`${data?.sectionTagColor || "text-primary"} text-sm font-bold uppercase tracking-widest`} style={getStyle(data, 'sectionTag')}>
            {tag}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Quote */}
          <div>
            <blockquote className={`${data?.quoteColor || "text-gray-900"} vision-quote text-2xl md:text-3xl lg:text-[2.15rem] font-medium leading-snug mb-8 font-heading`} style={getStyle(data, 'quote')}>
              {highlightIdx > -1 ? (
                <>
                  {quoteBefore}
                  <span className={`${data?.highlightedPhraseColor || "text-primary"}`} style={getStyle(data, 'highlightedPhrase')}>{quoteHighlight}</span>
                  {quoteAfter}
                </>
              ) : (
                quote
              )}
            </blockquote>

            <p className={`${data?.descriptionColor || "text-gray-600"} vision-desc text-lg leading-relaxed mb-8`} style={getStyle(data, 'description')}>
              {description}
            </p>

            <Link
              href={ctaLink || "#"}
              className={`${data?.ctaTextColor || "text-primary"} vision-cta group inline-flex items-center gap-2 font-bold uppercase tracking-wide hover:gap-4 transition-all duration-500`} style={getStyle(data, 'ctaText')}
            >
              {ctaText}
              <svg
                className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Right — Video Card */}
          <div className="vision-video">
            <div className="relative group cursor-pointer">
              <div className="relative aspect-video overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <img
                  src={videoImageUrl}
                  alt={data?.videoImageAlt || "Atlas Fuel Operations"}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700"
                />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
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
                  </div>
                </div>

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 text-white">
                    <span className={`${data?.videoLabelColor || ""} text-lg font-bold uppercase tracking-wide font-heading group-hover:translate-x-1 transition-transform duration-300`} style={getStyle(data, 'videoLabel')}>
                      {videoLabel}
                    </span>
                    {data?.videoDescription && (
                      <span className="text-sm text-gray-600">{data.videoDescription}</span>
                    )}
                    <svg
                      className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-300"
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

                {/* Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/50 px-3 py-1.5 group-hover:bg-white/70 transition-colors duration-300">
                  <div className="w-2 h-2 bg-red-500" />
                  <span className="text-gray-900 text-xs font-medium uppercase">
                    Video
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
