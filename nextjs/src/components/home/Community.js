'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const defaultData = {
  tag: 'Community & Supply Chain',
  heading: 'We Are Committed to Partnering With Communities',
  description:
    'By listening to their needs and building meaningful relationships. Together, we strive to create sustainable solutions that bring long-term benefits.',
  stats: [
    {
      value: '300+',
      label: 'Jobs Connected',
      description:
        'Across Australia, Atlas Fuel has generated over 300 direct and indirect jobs, empowering local communities.',
    },
    {
      value: '50+',
      label: 'Talent Rising',
      description:
        'Each year, we proudly train 50+ members with skills and confidence to build lasting careers.',
    },
    {
      value: '5+',
      label: 'Seniors at Work',
      description:
        'We proudly employ senior citizens, valuing the wisdom, reliability, and experience they bring.',
    },
  ],
  ctaText: 'Learn More About Our Impact',
  ctaLink: '/community',
};

function UsersIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
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

function GraduationCapIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

const icons = [UsersIcon, GraduationCapIcon, HeartIcon];

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              setCount(Math.round(this.targets()[0].val));
            },
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-4xl lg:text-5xl font-bold tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

function parseValue(value) {
  const match = value.match(/(\d+)/);
  const number = match ? parseInt(match[1], 10) : 0;
  const suffix = value.replace(/\d+/g, '');
  return { number, suffix };
}

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

export default function Community({ data }) {
  // Merge: defaultData provides baseline, Sanity data overrides
  const content = { ...defaultData, ...data };
  const sectionRef = useRef(null);
  const tagRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      if (tagRef.current) {
        tl.from(tagRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.9,
          duration: 0.8,
          ease: 'back.out(1.5)',
        });
      }

      if (headingRef.current) {
        tl.from(
          headingRef.current,
          {
            opacity: 0,
            y: 40,
            rotationX: 10,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.4'
        );
      }

      if (descRef.current) {
        tl.from(
          descRef.current,
          {
            opacity: 0,
            y: 30,
            filter: 'blur(8px)',
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        );
      }

      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.from(card, {
            opacity: 0,
            y: 80,
            rotationY: 15,
            duration: 0.9,
            delay: 0.4 + i * 0.12,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="community"
      ref={sectionRef}
className="py-16 lg:py-24 bg-cream"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div ref={tagRef} className="flex items-center gap-3 mb-4 justify-center">
            <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
            <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]" style={getStyle(content, 'sectionTag')}>
              {content.tag}
            </span>
          </div>

          <h2
            ref={headingRef}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6" style={getStyle(content, 'heading')}
          >
            {content.heading}
          </h2>

          <p
            ref={descRef}
            className={`${content.descriptionColor || "text-gray-600"} text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed`} style={getStyle(content, 'description')}
          >
            {content.description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {content.stats.map((stat, i) => {
            const { number, suffix } = parseValue(stat.value);
            const IconComponent = icons[i] || UsersIcon;

            return (
              <div
                key={stat.label}
                ref={(el) => (cardsRef.current[i] = el)}
                className={cn(
                  'bg-white p-8 text-center',
                  'transition-all duration-300',
                  'hover:bg-primary hover:text-white',
                  'group cursor-default border border-gray-200'
                )}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 text-primary mb-6 group-hover:bg-white group-hover:text-primary transition-all duration-300">
                  <IconComponent className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <div className="mb-3">
                  <span className={`${stat.valueColor || ""}`} style={getStyle(stat, 'value')}>
                    <Counter target={number} suffix={suffix} />
                  </span>
                </div>

                <h3 className={`${stat.labelColor || ""} text-xl font-semibold mb-3 group-hover:scale-105 origin-bottom transition-transform duration-300`} style={getStyle(stat, 'label')}>{stat.label}</h3>

                <p className={`${stat.descriptionColor || "text-gray-600"} group-hover:text-white/80 transition-colors duration-300 leading-relaxed`} style={getStyle(stat, 'description')}>
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href={content.ctaLink || '#'}
            className={cn(
              'group inline-flex items-center justify-center gap-3 px-8 py-4',
              'bg-primary text-white font-semibold',
              'hover:bg-primary-dark transition-all duration-300'
            )}
          >
            <span className={content.ctaTextColor || ""} style={getStyle(content, 'ctaText')}>{content.ctaText}</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
