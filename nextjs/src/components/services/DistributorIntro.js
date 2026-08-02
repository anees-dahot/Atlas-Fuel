'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function DistributorIntro({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'Atlas - As your reliable partner'
  const content = data.content ?? `we proudly support independent local fuel distributors across the country by leveraging our strong, established relationships with all major national & international fuel suppliers. Our extensive network allows us to ensure reliable, timely, and cost-effective fuel supply to regional partners—empowering them to compete, grow, and serve their communities with confidence. No matter where you operate, Atlas Fuel stands ready to deliver the resources and support you need to thrive.`
  const ctaText = data.ctaText ?? 'Enquire now'
  const ctaLink = data.ctaLink ?? '/contact'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.distributor-intro-content', {
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

      gsap.from('.distributor-intro-cta', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.3,
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="distributor-intro-content">
          <h2
            className="font-bold mb-6"
            style={cmsTextStyle(data, 'heading', '#111827', '48px')}
          >
            {heading}
          </h2>
          <p
            className="leading-relaxed"
            style={cmsTextStyle(data, 'content', '#4b5563', '20px')}
          >
            {content}
          </p>
        </div>
        
        <div className="distributor-intro-cta mt-10">
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
