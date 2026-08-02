'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function EnquireSection({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'Enquire now for your fueling Needs'
  const primaryCta = data.primaryCta ?? {
    text: data.primaryCTAText ?? 'Enquire Now',
    link: data.primaryCTALink ?? '/contact',
  }
  const secondaryCta = data.secondaryCta ?? {
    text: data.secondaryCTAText ?? 'Learn More',
    link: data.secondaryCTALink ?? '/fuel-prices',
  }

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
          style={cmsTextStyle(data, 'heading', '#111827', '48px')}
        >
          {heading}
        </h2>

        <div className="enquire-cta flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryCta.link ?? '#'}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary border-2 border-primary hover:bg-primary-dark transition-all duration-300 font-bold uppercase tracking-[0.1em]"
            style={cmsTextStyle(data, 'primaryCTA', '#ffffff', '13px')}
          >
            {primaryCta.text}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <Link
            href={secondaryCta.link ?? '#'}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-gray-300 hover:border-primary hover:text-primary transition-all duration-300 font-bold uppercase tracking-[0.1em]"
            style={cmsTextStyle(data, 'secondaryCTA', '#111827', '13px')}
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
