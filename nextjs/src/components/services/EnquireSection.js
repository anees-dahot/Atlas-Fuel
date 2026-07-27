'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function EnquireSection({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Enquire now for your fueling Needs'
  const primaryCta = data.primaryCta || { text: 'Enquire Now', link: '/contact' }
  const secondaryCta = data.secondaryCta || { text: 'Learn More', link: '/fuel-prices' }

  // Dynamic styling props
  const headingColor = data.headingColor || '#111827'
  const headingSize = data.headingSize || '48px'
  const headingBorderEnabled = data.headingBorderEnabled || false
  const headingBorderColor = data.headingBorderColor || '#111827'
  const headingBorderWidth = data.headingBorderWidth || '1px'
  const headingShadowColor = data.headingShadowColor || 'rgba(0,0,0,0.3)'

  const primaryCTAColor = data.primaryCTAColor || '#ffffff'
  const primaryCTASize = data.primaryCTASize || '13px'
  const primaryCTABorderEnabled = data.primaryCTABorderEnabled || false
  const primaryCTABorderColor = data.primaryCTABorderColor || '#ffffff'
  const primaryCTABorderWidth = data.primaryCTABorderWidth || '1px'
  const primaryCTAShadowColor = data.primaryCTAShadowColor || 'rgba(0,0,0,0.3)'

  const secondaryCTAColor = data.secondaryCTAColor || '#111827'
  const secondaryCTASize = data.secondaryCTASize || '13px'
  const secondaryCTABorderEnabled = data.secondaryCTABorderEnabled || false
  const secondaryCTABorderColor = data.secondaryCTABorderColor || '#111827'
  const secondaryCTABorderWidth = data.secondaryCTABorderWidth || '1px'
  const secondaryCTAShadowColor = data.secondaryCTAShadowColor || 'rgba(0,0,0,0.3)'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.enquire-heading', {
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

      gsap.from('.enquire-cta', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.2,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-cream relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2
          className="enquire-heading font-heading font-bold uppercase tracking-wide leading-tight mb-8"
          style={{
            color: headingColor,
            fontSize: headingSize,
            border: headingBorderEnabled ? `${headingBorderWidth} solid ${headingBorderColor}` : 'none',
            textShadow: headingShadowColor ? `0 2px 4px ${headingShadowColor}` : 'none',
          }}
        >
          {heading}
        </h2>

        <div className="enquire-cta flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryCta.link || '#'}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary border-2 border-primary hover:bg-primary-dark transition-all duration-300 font-bold uppercase tracking-[0.1em]"
            style={{
              color: primaryCTAColor,
              fontSize: primaryCTASize,
              border: primaryCTABorderEnabled ? `${primaryCTABorderWidth} solid ${primaryCTABorderColor}` : 'none',
              textShadow: primaryCTAShadowColor ? `0 2px 4px ${primaryCTAShadowColor}` : 'none',
            }}
          >
            {primaryCta.text}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <Link
            href={secondaryCta.link || '#'}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-gray-300 hover:border-primary hover:text-primary transition-all duration-300 font-bold uppercase tracking-[0.1em]"
            style={{
              color: secondaryCTAColor,
              fontSize: secondaryCTASize,
              border: secondaryCTABorderEnabled ? `${secondaryCTABorderWidth} solid ${secondaryCTABorderColor}` : 'none',
              textShadow: secondaryCTAShadowColor ? `0 2px 4px ${secondaryCTAShadowColor}` : 'none',
            }}
          >
            {secondaryCta.text}
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
