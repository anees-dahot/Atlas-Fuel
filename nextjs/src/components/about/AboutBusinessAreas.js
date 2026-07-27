'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from '@/components/shared/TiltCard'
import { getCmsTextStyle } from '@/lib/cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const icons = {
  fuel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17"/><path d="M3 22h12"/>
      <path d="M15 12l3-3 3 3-3 3"/><path d="M18 9v8"/>
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  transport: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m-1 11h1a2 2 0 002-2v-5l-3-3H14a2 2 0 00-2 2v6a2 2 0 002 2h1"/>
      <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
    </svg>
  ),
  hardhat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M2 20h20"/><path d="M5 20v-4a7 7 0 0114 0v4"/>
      <path d="M12 7V4"/><path d="M8 9.5a5 5 0 018 0"/>
    </svg>
  ),
  ship: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2c1.3 0 1.9.5 2.5 1"/>
      <path d="M19.38 20A11.6 11.6 0 0012 12 11.6 11.6 0 004.62 20"/>
      <path d="M12 4a3 3 0 00-3 3v4h6V7a3 3 0 00-3-3z"/>
    </svg>
  ),
  agriculture: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/><path d="M12 2a14.5 14.5 0 010 20 14.5 14.5 0 010-20"/>
      <path d="M2 12h20"/>
    </svg>
  ),
  mining: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <path d="M5 3l14 7-14 7V3z"/><path d="M19 12v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7"/>
    </svg>
  ),
}
const defaultIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
  </svg>
)

export default function AboutBusinessAreas({ data = {} }) {
  const sectionRef = useRef(null)

  const heading    = data.heading    || 'What We Do'
  const subheading = data.subheading || 'Comprehensive fuel solutions across every sector of Australian industry.'
  const eyebrow    = data.eyebrow    || 'Our Business Areas'
  const linkLabel  = data.linkLabel  || 'Learn More'
  const areas      = data.areas      || [
    { title: 'Fuel Stations',       description: 'World-class retail fuel stations delivering quality, convenience and competitive pricing for everyday Australians.', icon: 'fuel',      link: '/fuel-stations',   imageUrl: '/images/what-we-do-retail.webp' },
    { title: 'Bulk Diesel Supply',  description: 'Large-scale bulk fuel delivery for mining, agriculture, construction and industrial operations across Australia.',   icon: 'truck',     link: '/fuel-transportation', imageUrl: '/images/what-we-do-mining-civil.webp' },
    { title: 'Fuel Transportation', description: 'GPS-tracked road tanker fleet providing safe, on-time fuel logistics across Western Australia and beyond.',          icon: 'transport', link: '/fuel-transportation', imageUrl: '/images/what-we-do-fuel-transportation.webp' },
    { title: 'Construction & Civil',description: 'On-site fuel management and delivery for civil works, road projects and remote construction sites.',                 icon: 'hardhat',   link: '/services/mining-fuel', imageUrl: '/images/what-we-do-onsite-diesel.webp' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.aba-header', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } })
      gsap.from('.aba-card', { opacity: 0, y: 60, duration: 0.8, stagger: 0.12, ease: 'back.out(1.2)', immediateRender: false,
        scrollTrigger: { trigger: '.aba-grid', start: 'top 80%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="aba-header text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-primary" />
            <span className="text-primary text-sm font-bold uppercase tracking-widest" style={getCmsTextStyle(data, 'eyebrow')}>{eyebrow}</span>
            <div className="w-12 h-0.5 bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-black uppercase tracking-tight mb-4" style={getCmsTextStyle(data, 'heading')}>{heading}</h2>
          <p className="text-lg text-gray-600 font-light" style={getCmsTextStyle(data, 'subheading')}>{subheading}</p>
        </div>

        {/* Cards */}
        <div className="aba-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, i) => (
            <TiltCard key={area._key || `${area.title}-${i}`} tiltAmount={8} className="aba-card">
            <Link href={area.link || '#'}
              className="group relative block bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full border border-gray-200">
              {/* Image */}
              {area.imageUrl && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={area.imageUrl}
                    alt={area.alt || area.imageAlt || area.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="p-6">
                {/* Hover bg */}
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />

                {/* Icon */}
                <div className="relative z-10 w-12 h-12 bg-primary/10 group-hover:bg-white/20 flex items-center justify-center mb-4 transition-colors duration-300 text-primary group-hover:text-white">
                  {icons[area.icon] || defaultIcon}
                </div>

                {/* Number badge */}
                <div className="relative z-10 text-4xl font-heading font-light text-gray-100 group-hover:text-white/20 mb-2 transition-colors duration-300 leading-none absolute top-4 right-4">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <h3 className="relative z-10 text-lg font-heading font-bold text-black group-hover:text-white uppercase tracking-wide mb-2 transition-colors duration-300" style={getCmsTextStyle(area, 'title')}>
                  {area.title}
                </h3>
                <p className="relative z-10 text-gray-600 group-hover:text-white/80 text-xs leading-relaxed transition-colors duration-300 font-light mb-4" style={getCmsTextStyle(area, 'description')}>
                  {area.description}
                </p>

                {/* Arrow */}
                <div className="relative z-10 flex items-center gap-2 text-primary group-hover:text-white font-bold text-xs uppercase tracking-wide transition-colors duration-300">
                  <span style={getCmsTextStyle(data, 'linkLabel')}>{linkLabel}</span>
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </div>
            </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
