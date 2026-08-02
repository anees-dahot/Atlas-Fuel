'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const featureIcons = {
  rescue: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  backup: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  crisis: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
}

export default function DistributorFeatures({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? data.title ?? 'Partner Support Solutions'
  const subtitle = data.subtitle ?? 'Our Services'

  const features = Array.isArray(data.features) ? data.features : [
    {
      icon: 'rescue',
      title: 'Fuel Rescue',
      description: 'When supply chains break down, Atlas Fuel steps in with fast, reliable fuel delivery. We mobilise our national network to support local distributors facing unexpected shortages, helping avoid downtime and reputational risk. Our team is built for urgency—getting fuel to you when no one else can.',
      ctaText: 'Enquire Now',
      ctaLink: '/contact',
    },
    {
      icon: 'support',
      title: 'Demand Support',
      description: 'Atlas Fuel empowers local distributors during peak seasons by offering flexible volume options and scalable delivery schedules. Whether it\'s harvest time, mining ramp-ups, or regional events, we ensure you meet every litre of demand without delays or compromise in service quality or supply integrity.',
      ctaText: 'Enquire Now',
      ctaLink: '/contact',
    },
    {
      icon: 'backup',
      title: 'Supplier Backup',
      description: 'If your existing supplier refuses to meet your needs, Atlas Fuel provides immediate backup support to protect your business. We understand the pressures local distributors face and respond quickly with a tailored solution—ensuring supply continuity and restoring your confidence',
      ctaText: 'Enquire Now',
      ctaLink: '/contact',
    },
    {
      icon: 'crisis',
      title: 'Crisis Coverage',
      description: 'In times of disruption—natural disasters, logistic failures, or market volatility—Atlas Fuel offers responsive coverage that keeps your operations stable. We\'re more than a supplier; we\'re your contingency partner, delivering peace of mind and uninterrupted fuel access exactly when your business needs it most.',
      ctaText: 'Enquire Now',
      ctaLink: '/contact',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.distributor-header', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.distributor-card', {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.distributor-grid',
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 distributor-header">
          <div
            className="tag"
            style={cmsTextStyle(data, 'subtitle', '#4b5563', '14px')}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {subtitle}
          </div>
          <h2
            className="font-bold"
            style={cmsTextStyle(data, data.heading ? 'heading' : 'title', '#111827', '48px')}
          >
            {heading}
          </h2>
        </div>

        <div className="distributor-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature._key || index}
              className="distributor-card group relative bg-white overflow-hidden border border-gray-100 hover:border-primary/30 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative z-10 p-8">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <div className="w-8 h-8 text-primary">
                      {featureIcons[feature.icon] || featureIcons.rescue}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors" style={cmsTextStyle(feature, 'title', '#111827', '20px')}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm mb-4" style={cmsTextStyle(feature, 'description', '#4b5563', '14px')}>
                      {feature.description}
                    </p>
                    <Link
                      href={feature.ctaLink ?? data.cardCtaLink ?? '/contact'}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                    >
                      {feature.ctaText ?? data.cardCtaText ?? 'Enquire Now'}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
