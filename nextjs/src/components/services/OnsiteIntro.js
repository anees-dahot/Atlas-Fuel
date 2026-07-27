'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function OnsiteIntro({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Rapid Response Diesel Delivery'
  const description = data.description || 'When every second counts, Atlas Fuel\'s rapid response team delivers diesel exactly when your operations demand it.'
  const ctaText = data.ctaText || 'Enquire now'
  const ctaLink = data.ctaLink || '/contact'

  // Dynamic styling props
  const headingColor = data.headingColor || '#111827'
  const headingSize = data.headingSize || '48px'
  const headingBorderEnabled = data.headingBorderEnabled || false
  const headingBorderColor = data.headingBorderColor || '#111827'
  const headingBorderWidth = data.headingBorderWidth || '1px'
  const headingShadowColor = data.headingShadowColor || 'rgba(0,0,0,0.3)'

  const contentColor = data.contentColor || '#4b5563'
  const contentSize = data.contentSize || '18px'
  const contentBorderEnabled = data.contentBorderEnabled || false
  const contentBorderColor = data.contentBorderColor || '#4b5563'
  const contentBorderWidth = data.contentBorderWidth || '1px'
  const contentShadowColor = data.contentShadowColor || 'rgba(0,0,0,0.3)'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.onsite-intro-heading', {
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

      gsap.from('.onsite-intro-content', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from('.onsite-intro-cta', {
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
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="text-center lg:text-left">
            <div className="onsite-intro-heading">
              <div className="tag mb-4">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Rapid Response
              </div>
              <h2
                className="font-bold mb-8 leading-tight"
                style={{
                  color: headingColor,
                  fontSize: headingSize,
                  border: headingBorderEnabled ? `${headingBorderWidth} solid ${headingBorderColor}` : 'none',
                  textShadow: headingShadowColor ? `0 2px 4px ${headingShadowColor}` : 'none',
                }}
              >
                {heading}
              </h2>
            </div>

            <p
              className="onsite-intro-content leading-relaxed mb-8"
              style={{
                color: contentColor,
                fontSize: contentSize,
                border: contentBorderEnabled ? `${contentBorderWidth} solid ${contentBorderColor}` : 'none',
                textShadow: contentShadowColor ? `0 2px 4px ${contentShadowColor}` : 'none',
              }}
            >
              {description}
            </p>
            
            <div className="onsite-intro-cta">
              <Link href={ctaLink} className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider text-sm hover:bg-primary-dark transition-colors">
                {ctaText}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right - Stats Grid */}
          <div className="onsite-intro-content relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gray-100 aspect-square overflow-hidden">
                  <img 
                    src="/images/onsite-diesel.jpg" 
                    alt="Fuel Delivery Truck" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-primary/10 p-6 flex flex-col justify-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-gray-600 text-sm">Emergency Dispatch</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-primary/10 p-6 flex flex-col justify-center">
                  <div className="text-3xl font-bold text-primary mb-2">Fast</div>
                  <div className="text-gray-600 text-sm">Site Delivery</div>
                </div>
                <div className="bg-gray-100 aspect-square overflow-hidden">
                  <img 
                    src="/images/truck-new.jpg" 
                    alt="Atlas Fuel Truck" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
