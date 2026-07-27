'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function DieselHarvests({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Diesel That Drives Harvests'
  const content = data.content || `From tractors to tankers, we keep your farm moving without missing a beat. Our reliable diesel fuels every season, from planting to harvest with power you can count on. No delays, no downtime, just smooth, strong energy delivering results where it matters most.`

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.diesel-content', {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="diesel-content text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            {heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            {content}
          </p>
        </div>
      </div>
    </section>
  )
}
