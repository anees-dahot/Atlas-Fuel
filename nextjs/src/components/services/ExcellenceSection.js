'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function ExcellenceSection({ data = {} }) {
  const sectionRef = useRef(null)

  const sectionTag = data.sectionTag || 'Our Philosophy'
  const tagline = data.tagline || 'Unrivalled. Unmatched. Unstoppable.'
  const content = data.content || `These three words capture the spirit of Atlas Fuel and the people who drive it forward every day. We stand unrivalled in our commitment to quality, unmatched in our ability to deliver reliable fuel solutions nationwide, and unstoppable in our pursuit of growth, innovation, and excellence. From our performance fleet to our world-class service stations, every step we take reflects a relentless drive to set new standards in the fuel industry. For our customers, our partners, and our communities, Atlas Fuel is more than a brand — it's a promise of strength, progress, and a future powered without limits.`
  const ctaText = data.ctaText || 'Read More'
  const ctaLink = data.ctaLink || '/about'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.excellence-tagline', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.excellence-content', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from('.excellence-cta', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.4,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-cream relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center gap-3 mb-4 justify-center">
          <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
          <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">
            {sectionTag}
          </span>
        </div>
        
        <h2
          className="excellence-tagline font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-8"
          style={{
            color: data.taglineColor || undefined,
            fontSize: data.taglineSize || undefined,
            WebkitTextStroke: data.taglineBorderEnabled
              ? `${data.taglineBorderWidth || '1px'} ${data.taglineBorderColor || 'currentColor'}`
              : undefined,
            textShadow: data.taglineShadowColor
              ? `0 2px 4px ${data.taglineShadowColor}`
              : undefined,
          }}
        >
          {tagline}
        </h2>
        
        <p
          className="excellence-content text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-10"
          style={{
            color: data.contentColor || undefined,
            fontSize: data.contentSize || undefined,
            WebkitTextStroke: data.contentBorderEnabled
              ? `${data.contentBorderWidth || '1px'} ${data.contentBorderColor || 'currentColor'}`
              : undefined,
            textShadow: data.contentShadowColor
              ? `0 2px 4px ${data.contentShadowColor}`
              : undefined,
          }}
        >
          {content}
        </p>

        <div className="excellence-cta">
          <Link
            href={ctaLink}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold text-[13px] uppercase tracking-[0.1em] border-2 border-primary hover:bg-primary-dark transition-all duration-300"
          >
            {ctaText}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
