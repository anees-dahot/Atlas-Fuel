'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function TransportationSector({ data = {} }) {
  const sectionRef = useRef(null)
  const tagline = data.tagline || 'Transport & Logistics'
  const heading = data.heading || 'Transportation Sector'
  const content = data.content || 'Atlas Fuel Australia also stands as a leading provider of competitive fuel prices for the transportation sector. Recognizing the critical role that transportation plays in the movement of goods across the country, Atlas Fuel offers cost-effective solutions tailored to the needs of logistics and transport companies.\n\nBy providing high-quality fuels at the best possible prices, Atlas Fuel helps businesses in the transportation industry reduce their operating costs and maximize efficiency. With a focus on reliability and customer service, Atlas Fuel Australia ensures that transport companies can keep their fleets running smoothly, while maintaining budget-conscious operations that support their bottom line.'
  const ctaHeading = data.ctaHeading || 'Fleet Solutions'
  const ctaDescription = data.ctaDescription || 'Get competitive pricing for your fleet. We understand the transportation industry\'s needs for reliable, cost-effective fuel supply.'
  const ctaLink = data.ctaLink || '/contact'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ts-content', { opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
      gsap.from('.ts-cta', { opacity: 0, y: 30, duration: 0.8, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 ts-content">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">{tagline}</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-8">{heading}</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {content}
              </p>
            </div>
          </div>

          <div className="ts-cta bg-gray-50 p-8 border border-gray-100">
            <div className="w-16 h-16 bg-primary flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-4">{ctaHeading}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {ctaDescription}
            </p>
            <Link href={ctaLink} 
                  className="group inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:text-primary-dark transition-colors">
              Get a Quote
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
