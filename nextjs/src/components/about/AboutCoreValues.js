'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from '@/components/shared/TiltCard'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const sizeMap = {
  '1': '12px',
  '2': '16px',
  '3': '20px',
  '4': '24px',
  '5': '32px',
  '6': '48px',
  '7': '70px',
};

const valueIcons = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  zap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  ),
}
const DefaultIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
  </svg>
)

export default function AboutCoreValues({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Our Core Values'
  const headingColor = data.headingColor || 'text-black'
  const headingSize = data.headingSize ? { fontSize: sizeMap[data.headingSize] } : {}
  const headingBorderEnabled = data.headingBorderEnabled || false
  const headingBorderColor = data.headingBorderColor || '#000000'
  const headingBorderWidth = data.headingBorderWidth || '1px'
  const headingShadowColor = data.headingShadowColor || ''
  const headingStyle = {
    ...headingSize,
    ...(headingBorderEnabled && {
      WebkitTextStroke: `${headingBorderWidth} ${headingBorderColor}`,
      ...(headingShadowColor && { textShadow: `0 0 10px ${headingShadowColor}` }),
    }),
  }

  const subheading = data.subheading || 'The principles that guide every decision we make.'
  const subheadingColor = data.subheadingColor || 'text-gray-600'
  const subheadingSize = data.subheadingSize ? { fontSize: sizeMap[data.subheadingSize] } : {}
  const subheadingBorderEnabled = data.subheadingBorderEnabled || false
  const subheadingBorderColor = data.subheadingBorderColor || '#000000'
  const subheadingBorderWidth = data.subheadingBorderWidth || '1px'
  const subheadingShadowColor = data.subheadingShadowColor || ''
  const subheadingStyle = {
    ...subheadingSize,
    ...(subheadingBorderEnabled && {
      WebkitTextStroke: `${subheadingBorderWidth} ${subheadingBorderColor}`,
      ...(subheadingShadowColor && { textShadow: `0 0 10px ${subheadingShadowColor}` }),
    }),
  }

  const imageUrl = data.imageUrl || '/images/what-we-do-onsite-diesel.webp'
  const values = data.values || [
    { title: 'Safety',     description: 'We place the safety of our people and communities above all else — it is non-negotiable in everything we do.',                       icon: 'shield' },
    { title: 'Respect',    description: 'We treat every customer, partner, and community with the highest level of respect, fairness, and integrity.',                       icon: 'users'  },
    { title: 'Quality',    description: 'We deliver premium fuel products and services, meeting the highest international standards every single time.',                      icon: 'star'   },
    { title: 'Innovation', description: 'We continuously invest in smarter systems, better processes, and new technologies to lead the fuel industry forward.',              icon: 'zap'    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.acv-header', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } })
      gsap.from('.acv-card', { opacity: 0, y: 60, scale: 0.95, duration: 0.8, stagger: 0.12, ease: 'back.out(1.2)', immediateRender: false,
        scrollTrigger: { trigger: '.acv-grid', start: 'top 80%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="acv-header text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-primary" />
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Core Values</span>
            <div className="w-12 h-0.5 bg-primary" />
          </div>
          <h2 className={`${headingColor} text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-tight mb-4`} style={headingStyle}>{heading}</h2>
          <p className={`${subheadingColor} text-lg font-light`} style={subheadingStyle}>{subheading}</p>
        </div>

        {/* Image */}
        <div className="relative h-[300px] overflow-hidden shadow-xl mb-16">
          <img
            src={imageUrl}
            alt="Our Core Values"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
        </div>

        {/* Cards */}
        <div className="acv-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const titleColor = v.titleColor || 'text-black'
            const titleSize = v.titleSize ? { fontSize: sizeMap[v.titleSize] } : {}
            const titleBorderEnabled = v.titleBorderEnabled || false
            const titleBorderColor = v.titleBorderColor || '#000000'
            const titleBorderWidth = v.titleBorderWidth || '1px'
            const titleShadowColor = v.titleShadowColor || ''
            const titleStyle = {
              ...titleSize,
              ...(titleBorderEnabled && {
                WebkitTextStroke: `${titleBorderWidth} ${titleBorderColor}`,
                ...(titleShadowColor && { textShadow: `0 0 10px ${titleShadowColor}` }),
              }),
            }

            const descriptionColor = v.descriptionColor || 'text-gray-600'
            const descriptionSize = v.descriptionSize ? { fontSize: sizeMap[v.descriptionSize] } : {}
            const descriptionBorderEnabled = v.descriptionBorderEnabled || false
            const descriptionBorderColor = v.descriptionBorderColor || '#000000'
            const descriptionBorderWidth = v.descriptionBorderWidth || '1px'
            const descriptionShadowColor = v.descriptionShadowColor || ''
            const descriptionStyle = {
              ...descriptionSize,
              ...(descriptionBorderEnabled && {
                WebkitTextStroke: `${descriptionBorderWidth} ${descriptionBorderColor}`,
                ...(descriptionShadowColor && { textShadow: `0 0 10px ${descriptionShadowColor}` }),
              }),
            }

            return (
              <TiltCard key={i} tiltAmount={6} className="acv-card">
              <div className="group relative bg-gray-50 p-8 hover:bg-primary transition-all duration-300 hover:shadow-lg overflow-hidden h-full border border-gray-200">
                {/* Background number */}
                <div className="absolute -top-2 -right-2 text-8xl font-heading font-light text-black/5 group-hover:text-white/10 transition-colors duration-500 leading-none select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className="relative w-14 h-14 bg-primary/10 group-hover:bg-white/20 flex items-center justify-center mb-6 text-primary group-hover:text-white transition-all duration-300">
                  {valueIcons[v.icon] || <DefaultIcon />}
                </div>

                {/* Content */}
                <h3 className={`relative ${titleColor} text-xl font-heading font-bold uppercase tracking-wide mb-3 group-hover:text-white transition-colors duration-300`} style={titleStyle}>
                  {v.title}
                </h3>
                <p className={`relative ${descriptionColor} text-sm leading-relaxed font-light group-hover:text-white/80 transition-colors duration-300`} style={descriptionStyle}>
                  {v.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </div>
              </TiltCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
