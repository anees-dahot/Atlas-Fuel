'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function PartnershipSection({ data = {} }) {
  const sectionRef = useRef(null)

  const content = data.content || `Atlas Fuel builds smart, strategic partnerships that connect local distributors with the strength of a national supply chain. By tapping into our established relationships with Australia's leading fuel providers, we offer streamlined access, stable pricing, and reliable product availability—enabling our partners to operate with confidence and consistency, no matter the market conditions.`
  const tagline = data.tagline || 'ATLAS FUEL IS YOUR MOST RELIABLE PARTNER'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.partnership-content', {
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

      gsap.from('.partnership-tagline', {
        opacity: 0,
        y: 30,
        duration: 0.8,
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="partnership-content">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
            {content}
          </p>
        </div>
        
        <h2 className="partnership-tagline text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
          {tagline}
        </h2>
      </div>
    </section>
  )
}
