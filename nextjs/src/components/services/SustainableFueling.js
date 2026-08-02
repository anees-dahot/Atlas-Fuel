'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function SustainableFueling({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'Sustainable Fueling for a Greener Future'
  const content = data.content ?? `At Atlas Fuel, we are committed to supporting sustainable agriculture through eco-friendly fuel options and responsible delivery practices. Our low-emission fuels and efficient supply chains help you reduce your environmental footprint while maintaining high productivity on the farm. Partner with Atlas to not only power your fields today, but also protect the land for generations to come.`
  const ctaText = data.ctaText ?? 'Read More'
  const ctaLink = data.ctaLink ?? '/about'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sustainable-content', {
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

      gsap.from('.sustainable-cta', {
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
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="sustainable-content text-center">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight"
            style={cmsTextStyle(data, 'heading', '#111827', '48px')}
          >
            {heading}
          </h2>
          <p
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-10"
            style={cmsTextStyle(data, 'content', '#4b5563', '20px')}
          >
            {content}
          </p>
        </div>
        
        <div className="sustainable-cta text-center">
          <Link
            href={ctaLink}
className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider text-sm hover:bg-primary-dark transition-colors"
            style={cmsTextStyle(data, 'ctaText', '#ffffff', '14px')}
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
