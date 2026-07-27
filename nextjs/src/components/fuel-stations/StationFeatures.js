'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const featureIcons = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  dollar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
}

export default function StationFeatures({ data = {} }) {
  const sectionRef = useRef(null)

  const features = data.features || [
    { title: 'Reliability and performance', icon: 'shield' },
    { title: 'Quality Assurance', icon: 'star' },
    { title: 'Competitive Prices', icon: 'dollar' },
  ]
  const tagline = data.tagline || 'Why Choose Us'
  const heading = data.heading || 'The Atlas Fuel Difference'
  const ctaText = data.ctaText || 'NEW BULK FUEL ENQUIRY'
  const ctaLink = data.ctaLink || '/contact'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.station-features-header', {
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

      gsap.from('.station-feature-item', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.station-features-list',
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.station-features-cta', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.3,
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
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12 station-features-header">
          <div className="tag">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {tagline}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {heading}
          </h2>
        </div>

        <div className="station-features-list space-y-6 mb-12 max-w-2xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature._key || feature.title || index}
              className="station-feature-item flex items-center gap-4 p-4 bg-gray-50 hover:bg-primary/5 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 text-primary">
                  {featureIcons[feature.icon]}
                </div>
              </div>
              <span className="text-lg font-semibold text-gray-900">{feature.title}</span>
            </div>
          ))}
        </div>

        <div className="station-features-cta text-center">
          <Link
            href={ctaLink}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-all"
          >
            {ctaText}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
