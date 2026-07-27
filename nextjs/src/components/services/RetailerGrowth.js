'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function RetailerGrowth({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Growth Solutions'
  const title = data.title || 'Join forces with a brand that understands independence.'
  const description = data.description || 'Atlas Fuel offers flexible branding options, co-branded site support, and marketing tools that elevate your station\'s visibility while preserving your identity.'
  const ctaPrimary = data.ctaPrimary || 'Learn More'
  const ctaPrimaryLink = data.ctaPrimaryLink || '/fuel-prices'
  const ctaSecondary = data.ctaSecondary || 'Enquire Now'
  const ctaSecondaryLink = data.ctaSecondaryLink || '/contact'
  const imageUrl = data.imageUrl || '/images/fuel-stations.jpg'

  // Dynamic styling props
  const headingColor = data.headingColor || '#2563eb'
  const headingSize = data.headingSize || '14px'
  const headingBorderEnabled = data.headingBorderEnabled || false
  const headingBorderColor = data.headingBorderColor || '#2563eb'
  const headingBorderWidth = data.headingBorderWidth || '1px'
  const headingShadowColor = data.headingShadowColor || 'rgba(0,0,0,0.3)'

  const titleColor = data.titleColor || '#111827'
  const titleSize = data.titleSize || '48px'
  const titleBorderEnabled = data.titleBorderEnabled || false
  const titleBorderColor = data.titleBorderColor || '#111827'
  const titleBorderWidth = data.titleBorderWidth || '1px'
  const titleShadowColor = data.titleShadowColor || 'rgba(0,0,0,0.3)'

  const contentColor = data.contentColor || '#4b5563'
  const contentSize = data.contentSize || '18px'
  const contentBorderEnabled = data.contentBorderEnabled || false
  const contentBorderColor = data.contentBorderColor || '#4b5563'
  const contentBorderWidth = data.contentBorderWidth || '1px'
  const contentShadowColor = data.contentShadowColor || 'rgba(0,0,0,0.3)'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.growth-badge', {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'back.out(1.7)',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.growth-title', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from('.growth-description', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      gsap.from('.growth-cta', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
      })

      gsap.from('.growth-image', {
        opacity: 0,
        x: 50,
        duration: 0.9,
        delay: 0.2,
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
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="order-2 lg:order-1">
            <div className="growth-badge inline-flex items-center gap-2 px-4 py-2 bg-primary/10 mb-6">
              <span className="w-2 h-2 bg-primary" />
              <span
                className="font-bold tracking-wide uppercase"
                style={{
                  color: headingColor,
                  fontSize: headingSize,
                  border: headingBorderEnabled ? `${headingBorderWidth} solid ${headingBorderColor}` : 'none',
                  textShadow: headingShadowColor ? `0 2px 4px ${headingShadowColor}` : 'none',
                }}
              >
                {heading}
              </span>
            </div>

            <h2
              className="growth-title font-bold mb-8 leading-tight"
              style={{
                color: titleColor,
                fontSize: titleSize,
                border: titleBorderEnabled ? `${titleBorderWidth} solid ${titleBorderColor}` : 'none',
                textShadow: titleShadowColor ? `0 2px 4px ${titleShadowColor}` : 'none',
              }}
            >
              {title}
            </h2>

            <p
              className="growth-description leading-relaxed mb-8"
              style={{
                color: contentColor,
                fontSize: contentSize,
                border: contentBorderEnabled ? `${contentBorderWidth} solid ${contentBorderColor}` : 'none',
                textShadow: contentShadowColor ? `0 2px 4px ${contentShadowColor}` : 'none',
              }}
            >
              {description}
            </p>

            <div className="growth-cta flex flex-col sm:flex-row gap-4">
              <Link 
                href={ctaPrimaryLink} 
className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider text-sm hover:bg-primary-dark transition-colors"
              >
                {ctaPrimary}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link 
                href={ctaSecondaryLink} 
className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold border-2 border-gray-200 hover:bg-gray-50 hover:border-primary/30 transition-colors uppercase tracking-wider text-sm"
              >
                {ctaSecondary}
                <svg className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right - Image */}
          <div className="order-1 lg:order-2">
            <div className="growth-image relative">
              <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt="Fuel Station Growth" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 -z-10" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/5 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
