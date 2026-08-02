'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function SafetySection({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'YOUR PARTNER IN SAFETY'
  const content = data.content ?? `Atlas Fuel Australia places paramount importance on the safety of our employees and the communities we serve, particularly when handling dangerous goods such as petroleum products. Our commitment to safety is reflected in rigorous and comprehensive safe work procedures designed to mitigate risks and ensure the well-being of our workforce. Our teams undergo extensive training, equipping them with the knowledge and skills necessary to handle dangerous goods with precision and care. We adhere strictly to industry regulations and best practices, implementing robust safety protocols at every stage of the petroleum product supply chain. By prioritizing safety in the handling of dangerous goods, Atlas Fuel Australia strives to set a benchmark for responsible and secure operations in the energy sector.`
  const sectionTag = data.sectionTag ?? 'Safety First'
  const ctaText = data.ctaText ?? 'Learn about our safety standards'
  const ctaLink = data.ctaLink ?? '/about'
  const cards = Array.isArray(data.cards)
    ? data.cards
    : [
        { label: 'ISO 9001', sublabel: 'Quality Management', icon: 'M' },
        { label: 'ISO 14001', sublabel: 'Environmental', icon: 'E' },
        { label: 'ISO 45001', sublabel: 'Occupational Safety', icon: 'S' },
        { label: '$50M Insurance', sublabel: 'Full Coverage', icon: '$' },
      ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.safety-heading', {
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

      gsap.from('.safety-content', {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/30" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="text-center lg:text-left">
            <div className="tag">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {sectionTag}
            </div>

            <h2
              className="safety-heading font-bold mb-6 leading-tight"
              style={cmsTextStyle(data, 'heading', '#111827', '48px')}
            >
              {heading}
            </h2>

            <p
              className="safety-content leading-relaxed mb-8"
              style={cmsTextStyle(data, 'content', '#4b5563', '18px')}
            >
              {content}
            </p>
            
            <Link href={ctaLink} className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              {ctaText}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Right - Certifications Grid */}
          <div className="safety-content grid grid-cols-2 gap-4">
            {cards.map((item, index) => (
              <div key={item._key || index} className="group bg-white p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">{item.icon}</span>
                </div>
                <div
                  className="text-gray-900 font-bold text-lg mb-1"
                  style={cmsTextStyle(item, 'label', '#111827', '18px')}
                >
                  {item.label}
                </div>
                <div
                  className="text-gray-500 text-sm"
                  style={cmsTextStyle(item, 'sublabel', '#6b7280', '14px')}
                >
                  {item.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
