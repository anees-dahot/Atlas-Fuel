"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Link from "next/link";
import CmsImage from "@/components/common/CmsImage";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Standardized Hero Component for All Pages
 *
 * Usage:
 * <PageHero
 *   eyebrow="About Us"
 *   title="Powering Australia with Reliability, Integrity, and Innovation"
 *   description="Atlas Fuel Australia has been proudly fuelling the nation since 2010."
 *   backgroundImage="/images/hero-trucks.jpg"
 *   stats={[{ value: "2010", label: "Established" }]}
 *   ctaButtons={[{ text: "Learn More", href: "/about" }]}
 * />
 */
export default function PageHero({
  eyebrow = "",
  title = "",
  description = "",
  backgroundImage = "/images/truck-new.jpg",
  backgroundAlt = "Atlas Fuel",
  stats = null,
  ctaButtons = null,
  eyebrowStyle = null,
  titleStyle = null,
  descriptionStyle = null,
  showOverlay = true
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline({
        delay: 0.15,
        defaults: { ease: "power3.out" },
      });

      tl.from(".hero-eyebrow", { opacity: 0, x: -40, duration: 0.8 })
        .from(".hero-title", { opacity: 0, y: 60, duration: 1.2 }, 0.2)
        .from(".hero-desc", { opacity: 0, y: 30, duration: 0.9 }, 0.45);

      if (stats?.length) {
        tl.from(".hero-stat", { opacity: 0, y: 40, duration: 0.7, stagger: 0.1 }, 0.65);
      }

      if (ctaButtons?.length) {
        tl.from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, stagger: 0.15 }, 0.7);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [stats, ctaButtons]);

  // Parse title into lines and words with alternating colors
  const parseTitle = (titleText) => {
    const words = titleText.split(' ');
    const lines = [];
    let currentLine = [];

    words.forEach((word, index) => {
      currentLine.push(word);
      // Break into new line every 2-3 words for better readability
      if (currentLine.length >= 2 || index === words.length - 1) {
        lines.push([...currentLine]);
        currentLine = [];
      }
    });

    return lines;
  };

  const titleLines = parseTitle(title);

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex items-start overflow-hidden h-[80svh] max-lg:min-h-[560px] lg:h-[clamp(560px,calc(100vw/2.222),80svh)]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <CmsImage
          value={backgroundImage}
          fallbackSrc="/images/truck-new.jpg"
          alt={backgroundAlt}
          width={2400}
          fit="min"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ objectPosition: '50% 80%' }}
        />
      </div>

      {/* Readability overlay */}
      {showOverlay && (
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/40 to-black/10 pointer-events-none" />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-12">
        {/* Eyebrow / Slug */}
        {eyebrow && (
          <div className="hero-eyebrow flex items-center gap-4 mb-4">
            <div
              className={eyebrowStyle?.color ? '' : 'w-14 h-0.5 bg-primary'}
              style={eyebrowStyle?.color ? { width: '3.5rem', height: '2px', backgroundColor: eyebrowStyle.color } : undefined}
            />
            <span
              className="text-white font-bold uppercase tracking-[0.2em] text-sm"
              style={{
                ...(eyebrowStyle || {}),
                textShadow: eyebrowStyle?.textShadow || undefined,
              }}
            >
              {eyebrow}
            </span>
          </div>
        )}

        {/* Title - Large, alternating black/white words when overlaid; solid white with a glow when the image shows through */}
        {title && (
          <h1 className="hero-title space-y-2 font-heading mb-6 max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
            {titleLines.map((line, lineIndex) => (
              <span key={lineIndex} className="block">
                {line.map((word, wordIndex) => {
                  const globalIndex = titleLines.slice(0, lineIndex).flat().length + wordIndex;
                  const isWhite = !showOverlay || globalIndex % 2 === 1;

                  return (
                    <span
                      key={wordIndex}
                      style={{
                        ...(titleStyle || {}),
                        textShadow:
                          titleStyle?.textShadow ||
                          (showOverlay ? '2px 2px 6px rgba(0,0,0,0.5)' : undefined),
                      }}
                      className={`inline-block font-bold leading-[0.9] uppercase tracking-tight mr-3 ${
                        isWhite ? 'text-white' : 'text-primary'
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
        )}

        {/* Description */}
        {description && (
          <p
            className="hero-desc text-white max-w-xl leading-relaxed mb-8 font-semibold text-base md:text-lg whitespace-pre-line"
            style={{
              ...(descriptionStyle || {}),
              textShadow:
                descriptionStyle?.textShadow ||
                (showOverlay ? '1px 1px 3px rgba(0,0,0,0.3)' : undefined),
            }}
          >
            {description}
          </p>
        )}

        {/* CTA Buttons */}
        {ctaButtons && ctaButtons.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-8">
            {ctaButtons.map((btn, i) => (
              <Link
                key={btn._key ?? `${btn.href}-${i}`}
                href={btn.href ?? '#'}
                style={btn.textStyle}
                className={`hero-cta inline-flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-200 ${
                  i === 0
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
                }`}
              >
                {btn.text ?? 'Learn More'}
              </Link>
            ))}
          </div>
        )}

        {/* Stats Row */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/30">
            {stats.map((stat, i) => (
              <div key={stat._key ?? `${stat.label}-${i}`} className="hero-stat group">
                <div
                  className="text-3xl md:text-4xl font-heading font-light text-white mb-2 tracking-tight group-hover:text-primary transition-colors duration-300"
                  style={{
                    textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                    ...stat.valueStyle,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-white/80 text-xs font-semibold uppercase tracking-widest"
                  style={{
                    textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                    ...stat.labelStyle,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
