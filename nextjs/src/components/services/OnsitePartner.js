'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import CmsImage from '@/components/common/CmsImage'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function OnsitePartner({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'Your Trusted Onsite Fuel Partner'
  const description = data.description ?? 'At Atlas Fuel, we\'re more than a supplier — we\'re your trusted onsite fuel partner, committed to keeping your business moving without interruption.'
  const ctaPrimary = data.ctaPrimary ?? 'Learn More'
  const ctaPrimaryLink = data.ctaPrimaryLink ?? '/fuel-prices'
  const ctaSecondary = data.ctaSecondary ?? 'Enquire Now'
  const ctaSecondaryLink = data.ctaSecondaryLink ?? '/contact'
  const sectionTag = data.sectionTag ?? 'Trusted Partner'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.partner-badge', {
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

      gsap.from('.partner-title', {
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

      gsap.from('.partner-description', {
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

      gsap.from('.partner-cta', {
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

      gsap.from('.partner-image', {
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
            <div className="partner-badge inline-flex items-center gap-2 px-4 py-2 bg-primary/10 mb-6">
              <span className="w-2 h-2 bg-primary" />
              <span className="text-primary text-sm font-bold tracking-wide uppercase">{sectionTag}</span>
            </div>

            <h2
              className="partner-title font-bold mb-8 leading-tight"
              style={cmsTextStyle(data, 'heading', '#111827', '48px')}
            >
              {heading}
            </h2>

            <p
              className="partner-description leading-relaxed mb-8"
              style={cmsTextStyle(data, 'description', '#4b5563', '18px')}
            >
              {description}
            </p>

            <div className="partner-cta flex flex-col sm:flex-row gap-4">
              <Link 
                href={ctaPrimaryLink} 
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold hover:bg-primary-dark transition-all duration-300"
              >
                {ctaPrimary}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link 
                href={ctaSecondaryLink} 
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold border border-gray-200 hover:bg-gray-50 hover:border-primary/30 transition-all duration-300"
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
            <div className="partner-image relative">
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <CmsImage
                  value={data.imageImage ?? data.image ?? data.imageUrl}
                  fallbackSrc="/images/onsite-diesel.jpg"
                  alt={data.imageAlt ?? data.imageUrlAlt ?? 'Onsite Fuel Partner'}
                  width={1200}
                  height={900}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
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
