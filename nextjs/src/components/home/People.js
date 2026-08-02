'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import CmsImage from '@/components/common/CmsImage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const fallbackData = {
  tag: 'Driven by People, Fueled by Purpose',
  heading: 'Our People',
  description:
    "Atlas Fuel's team is dedicated to delivering excellence, combining expertise with a deep understanding of the mining industry's needs. Our people prioritize reliability, safety, and customer satisfaction, ensuring seamless service at every step.",
  ctaText: 'Read More',
  ctaLink: '/careers',
  cardHeading: 'Work With Us',
  cardDescription:
    "50+ Talent Rising reflects Atlas Fuel's commitment to shaping future professionals. Each year, we proudly train 50+ members with the skills and confidence to build lasting careers in Australia's thriving fuel industry.",
  cardImageUrl: '/images/what-we-do-mining-civil.webp',
  cardCtaText: 'View Opportunities',
  cardCtaLink: '/careers',
  stats: [
    { value: '300+', label: 'Jobs' },
    { value: '50+', label: 'Trainees' },
    { value: '5+', label: 'Seniors' },
  ],
};

function UsersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

const statIcons = [UsersIcon, GraduationCapIcon, HeartIcon];

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

export default function People({ data }) {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const cardRef = useRef(null);

  const content = { ...fallbackData, ...data };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftContentRef.current) {
        gsap.from(leftContentRef.current, {
          opacity: 0,
          x: -80,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftContentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0,
          x: 80,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="people"
      ref={sectionRef}
className="py-16 lg:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div ref={leftContentRef} className="space-y-6">
            {content.tag && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]" style={getStyle(content, 'sectionTag')}>
                  {content.tag}
                </span>
              </div>
            )}
            {content.heading && (
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight" style={getStyle(content, 'heading')}>
                {content.heading}
              </h2>
            )}
            {content.description && (
              <p className={`${content.descriptionColor || "text-gray-600"} text-lg leading-relaxed max-w-xl`} style={getStyle(content, 'description')}>
                {content.description}
              </p>
            )}
            {content.ctaText && content.ctaLink && (
              <Link
                href={content.ctaLink}
                className={`${content.ctaTextColor || "text-primary"} inline-flex items-center gap-2 font-semibold hover:text-primary-dark transition-colors duration-200`} style={getStyle(content, 'ctaText')}
              >
                {content.ctaText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>

          {/* Right: Careers Card */}
          <div ref={cardRef}>
            <div className="bg-white shadow-lg overflow-hidden border border-gray-200">
              {/* Card Image */}
              <div className="relative h-64 overflow-hidden">
                <CmsImage
                  value={content.cardImage || content.cardImageUrl}
                  alt={content.cardImageAlt || content.cardHeading || 'Careers at Atlas Fuel'}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent" />
                {/* Careers Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 text-sm font-medium text-gray-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M8 12h8" />
                      <path d="M12 8v8" />
                    </svg>
                    {content.cardBadge || 'Careers'}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {content.cardHeading && (
                  <h3 className={`${content.cardHeadingColor || "text-gray-900"} text-2xl font-bold`} style={getStyle(content, 'cardHeading')}>
                    {content.cardHeading}
                  </h3>
                )}
                {content.cardDescription && (
                  <p className={`${content.cardDescriptionColor || "text-gray-600"} leading-relaxed`} style={getStyle(content, 'cardDescription')}>
                    {content.cardDescription}
                  </p>
                )}

                {/* Stats Grid */}
                {content.stats && content.stats.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    {content.stats.map((stat, index) => {
                      const IconComponent = statIcons[index % statIcons.length];
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100"
                        >
                          <div className="text-primary mb-2">
                            <IconComponent />
                          </div>
                          <span className={`${stat.valueColor || "text-gray-900"} text-xl font-bold`} style={getStyle(stat, 'value')}>
                            {stat.value}
                          </span>
                          <span className={`${stat.labelColor || "text-gray-500"} text-sm`} style={getStyle(stat, 'label')}>
                            {stat.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* CTA Button */}
                {content.cardCtaText && content.cardCtaLink && (
                  <Link
                    href={content.cardCtaLink}
                    className={`${content.cardCTAColor || ""} inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-white font-bold uppercase tracking-wider text-sm hover:bg-primary-dark transition-colors`} style={getStyle(content, 'cardCTAText')}
                  >
                    {content.cardCtaText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
