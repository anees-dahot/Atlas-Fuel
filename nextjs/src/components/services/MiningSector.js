'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const defaultFeatures = [
  {
    icon: 'shield',
    title: 'Safety First',
    description: 'ISO certified operations with zero incident policy',
  },
  {
    icon: 'clock',
    title: 'On-Time Delivery',
    description: '99.9% reliability with GPS-tracked deliveries',
  },
  {
    icon: 'tag',
    title: 'Competitive Pricing',
    description: 'Best rates guaranteed with volume discounts',
  },
  {
    icon: 'check',
    title: 'Quality Assured',
    description: 'Premium fuel meeting all industry standards',
  },
]

const iconSvgs = {
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  tag: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
}

export default function MiningSector({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'Mining Sector Excellence'
  const content = data.content ?? 'Atlas Fuel delivers premium fuel solutions to Australia\'s largest mining operations. Our specialized fleet and trained personnel ensure uninterrupted fuel supply to even the most remote sites, keeping your operations running 24/7.'
  const sectionTag = data.sectionTag ?? 'Trusted Partner'
  const features = Array.isArray(data.features) ? data.features : defaultFeatures
  const primaryCtaText = data.primaryCtaText ?? data.primaryCTAText ?? data.ctaText ?? 'Explore Services'
  const primaryCtaLink = data.primaryCtaLink ?? data.primaryCTALink ?? data.ctaLink ?? '/services'
  const secondaryCtaText = data.secondaryCtaText ?? data.secondaryCTAText ?? 'Get Quote'
  const secondaryCtaLink = data.secondaryCtaLink ?? data.secondaryCTALink ?? '/contact'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mining-badge', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.mining-heading', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from('.mining-content', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      gsap.from('.mining-feature-card', {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.mining-features-grid',
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              <span
                className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]"
                style={cmsTextStyle(data, 'sectionTag', '#2db234', '11px')}
              >
                {sectionTag}
              </span>
            </div>
            
            <h2
              className="mining-heading font-heading text-4xl md:text-5xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6"
              style={cmsTextStyle(data, 'heading', '#111827', '48px')}
            >
              {heading}
            </h2>
            <p
              className="mining-content text-lg md:text-xl text-gray-600 leading-relaxed mb-8"
              style={cmsTextStyle(data, 'content', '#4b5563', '20px')}
            >
              {content}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href={primaryCtaLink} className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold text-[13px] uppercase tracking-[0.1em] border-2 border-primary transition-all duration-300 hover:bg-primary-dark hover:border-primary-dark">
                {primaryCtaText}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href={secondaryCtaLink} className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent text-gray-900 font-bold text-[13px] uppercase tracking-[0.1em] border-2 border-gray-300 transition-all duration-300 hover:border-primary hover:text-primary">
                {secondaryCtaText}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right - Feature Cards */}
          <div className="mining-features-grid grid grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature._key || index}
                className="mining-feature-card group bg-white p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
                  <div className="w-6 h-6 text-primary">
                    {iconSvgs[feature.icon] ?? iconSvgs.shield}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2" style={cmsTextStyle(feature, 'title', '#111827', '16px')}>{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed" style={cmsTextStyle(feature, 'description', '#6b7280', '14px')}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
