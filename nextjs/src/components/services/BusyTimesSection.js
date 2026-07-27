'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function BusyTimesSection({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'In Busy & Hard times'
  const content = data.content || `When local distributors are unable to meet rising demand or are left unsupported by their existing suppliers, Atlas Fuel steps in with immediate, practical solutions. Leveraging our national network and real-time logistics, we offer rapid-response fuel supply, short-term bridging agreements, and flexible delivery schedules to keep your operations running. Whether it's unexpected growth, peak seasonal demand, or supply chain disruptions, we provide the backup you need—fast, reliable, and without red tape. At Atlas, we don't just supply fuel—we protect your ability to serve your customers when it matters most.`
  const primaryCta = data.primaryCta || { text: 'Learn More', link: '/fuel-prices' }
  const secondaryCta = data.secondaryCta || { text: 'Enquire Now', link: '/contact' }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.busytimes-heading', {
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

      gsap.from('.busytimes-content', {
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

      gsap.from('.busytimes-cta', {
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
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="busytimes-heading text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            {heading}
          </h2>
          
          <p className="busytimes-content text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            {content}
          </p>
        </div>

        <div className="busytimes-cta flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryCta.link || '#'}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold border-2 border-gray-200 hover:bg-cream hover:border-primary/30 transition-all duration-300"
          >
            {primaryCta.text}
            <svg className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          
          <Link
            href={secondaryCta.link || '#'}
className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider text-sm hover:bg-primary-dark transition-colors"
          >
            {secondaryCta.text}
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
