'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
import { cmsTextStyle } from '@/components/services/cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function MarineCommercial({ data = {} }) {
  const sectionRef = useRef(null)

  const tagline = data.tagline ?? 'Commercial & Offshore'
  const heading = data.heading ?? 'Commercial and Offshore Operations'
  const description = data.description ?? 'Atlas Fuel Australia has built a reputation as the trusted partner for commercial and offshore marine operations across the country.'
  const ctaText = data.ctaText ?? 'Enquire Now'
  const ctaLink = data.ctaLink ?? '/contact'
  const secondaryDescription = data.secondaryDescription ?? ''

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.marine-commercial-tagline', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.marine-commercial-heading', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from('.marine-commercial-content', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      gsap.from('.marine-commercial-cta', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          once: true,
        },
      })

      gsap.from('.marine-commercial-image', {
        opacity: 0,
        scale: 0.95,
        duration: 1,
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
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="marine-commercial-image relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden">
              <CmsImage
                value={data.imageImage ?? data.image ?? data.imageUrl}
                fallbackSrc="/images/marine-bunkering.jpg"
                alt={data.imageAlt ?? data.imageUrlAlt ?? 'Commercial Marine Operations'}
                width={1200}
                height={900}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
            </div>
            <div className="absolute -top-6 -right-6 bg-primary-dark text-white p-6 shadow-xl">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="marine-commercial-tagline inline-block text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4" style={cmsTextStyle(data, 'tagline', '#2db234', '14px')}>
              {tagline}
            </span>
            <h2 className="marine-commercial-heading text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-8 leading-tight" style={cmsTextStyle(data, 'heading', '#111827', '48px')}>
              {heading}
            </h2>
            <div className="marine-commercial-content space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
              <p style={cmsTextStyle(data, 'description', '#4b5563', '18px')}>{description}</p>
              {secondaryDescription && <p style={cmsTextStyle(data, 'secondaryDescription', '#4b5563', '18px')}>{secondaryDescription}</p>}
            </div>
            <a
              href={ctaLink}
              className="marine-commercial-cta inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider hover:bg-primary-dark transition-all duration-300"
              style={cmsTextStyle(data, 'ctaText', '#ffffff', '14px')}
            >
              {ctaText}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
