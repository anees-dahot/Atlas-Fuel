'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CmsImage from '@/components/common/CmsImage';

gsap.registerPlugin(ScrollTrigger);

const defaultData = {
  tag: 'Our Certifications',
  heading: 'Certified for Excellence, Driven by Compliance',
  description:
    "At Atlas Fuel, compliance is more than a standard — it's our foundation for trust and performance. Every operation, vehicle, and site meets rigorous national and international certifications.",
  trustBadgeText: '100% Compliant',
  trustBadgeSubtext: 'All operations certified',
  certifications: [
    {
      type: 'wahva',
      title: 'WAHVA / Western Australian Heavy Vehicle',
      description:
        'Accreditation ensuring every vehicle meets strict roadworthiness and safety benchmarks.',
    },
    {
      type: 'iso9001',
      title: 'ISO 9001',
      description:
        'Quality Management Systems — International standard for quality management ensuring consistent service delivery.',
    },
    {
      type: 'iso14001',
      title: 'ISO 14001',
      description:
        'Environmental Management Systems — Environmental management certification demonstrating our commitment to sustainability.',
    },
    {
      type: 'iso45001',
      title: 'ISO 45001',
      description:
        'Occupational Health & Safety — Workplace health and safety management ensuring employee and customer wellbeing.',
    },
  ],
};

function TruckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
      />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 0 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 0 1-3.54 1.122 6.003 6.003 0 0 1-3.54-1.122m0 0A5.973 5.973 0 0 1 12 9.75c1.236 0 2.397-.387 3.372-1.044"
      />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.75 3.03v.568c0 .334.148.65.405.864l1.149.958a5.37 5.37 0 0 1 1.281 1.957c.316.745.464 1.555.464 2.377 0 3.853-3.127 6.982-6.982 6.982a6.965 6.965 0 0 1-2.377-.464 5.37 5.37 0 0 1-1.957-1.281l-.958-1.149a1.125 1.125 0 0 0-.864-.405H3.03c-.621 0-1.125-.504-1.125-1.125V3.03c0-.621.504-1.125 1.125-1.125h8.625c.621 0 1.125.504 1.125 1.125ZM15 20.25a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
      />
    </svg>
  );
}

const iconMap = {
  wahva: <TruckIcon />,
  iso9001: <AwardIcon />,
  iso14001: <LeafIcon />,
  iso45001: <ShieldIcon />,
};

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

export default function Certifications({ data }) {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const cardRefs = useRef([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Merge: defaultData provides baseline, Sanity data overrides
  const content = { ...defaultData, ...data };
  const certifications = content.certifications || defaultData.certifications;
  const certificateImages = (content.certificateImages || []).filter(Boolean);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        leftContentRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      );

      cardRefs.current.forEach((card, i) => {
        if (card) {
          tl.fromTo(
            card,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
            i * 0.15
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!selectedCertificate) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedCertificate(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedCertificate]);

  return (
    <>
      <section
        id="certifications"
        ref={sectionRef}
        className="py-16 lg:py-24 bg-cream"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div ref={leftContentRef}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]" style={getStyle(content, 'sectionTag')}>
                {content.tag}
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-8" style={getStyle(content, 'heading')}>
              {content.heading}
            </h2>
            <p className={`${content.descriptionColor || "text-gray-600"} text-lg leading-relaxed mb-8`} style={getStyle(content, 'description')}>
              {content.description}
            </p>
            {(content.trustBadgeText || content.trustBadgeSubtext) && (
              <div className="mb-8 inline-flex items-center gap-4 border-l-4 border-primary bg-white px-5 py-4 shadow-sm">
                <ShieldIcon />
                <div>
                  {content.trustBadgeText && (
                    <div className={`${content.trustBadgeTextColor || "text-gray-900"} font-bold`} style={getStyle(content, 'trustBadgeText')}>
                      {content.trustBadgeText}
                    </div>
                  )}
                  {content.trustBadgeSubtext && (
                    <div className={`${content.trustBadgeSubtextColor || "text-gray-600"} text-sm`} style={getStyle(content, 'trustBadgeSubtext')}>
                      {content.trustBadgeSubtext}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Certificate Images Row */}
            {certificateImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {certificateImages.map((image, index) => {
                  const imageAlt = typeof image === 'string'
                    ? `Certificate ${index + 1}`
                    : image.alt || `Certificate ${index + 1}`;
                  return (
                  <button
                    type="button"
                    key={index}
                    onClick={() => setSelectedCertificate({ image, imageAlt, index })}
                    className="relative bg-white border-2 border-primary shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-shadow duration-300 overflow-hidden h-32 cursor-zoom-in"
                    aria-label={`View certificate ${index + 1}`}
                  >
                    <CmsImage
                      value={image}
                      alt={imageAlt}
                      fill
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="object-contain p-3"
                      fit="max"
                    />
                  </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right - Certification Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-6">
                  <div className="bg-gray-100 text-primary w-14 h-14 flex items-center justify-center mb-4">
                    {iconMap[(cert.icon || cert.type || cert.name || '').toLowerCase().replace(/[\s./-]/g, '')] || <AwardIcon />}
                  </div>
                  <h3 className={`${cert.titleColor || "text-gray-900"} text-lg font-semibold mb-2`} style={getStyle(cert, 'title')}>
                    {cert.title}
                  </h3>
                  <p className={`${cert.descriptionColor || "text-gray-600"} text-sm leading-relaxed`} style={getStyle(cert, 'description')}>
                    {cert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {selectedCertificate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate ${selectedCertificate.index + 1}`}
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative w-full max-w-5xl h-[85vh] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <CmsImage
              value={selectedCertificate.image}
              alt={selectedCertificate.imageAlt}
              fill
              sizes="100vw"
              className="object-contain p-4 sm:p-8"
              fit="max"
              priority
            />
            <button
              type="button"
              onClick={() => setSelectedCertificate(null)}
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-2xl leading-none text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close certificate"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
