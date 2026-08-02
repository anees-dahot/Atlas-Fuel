'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import CmsImage from '@/components/common/CmsImage'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function OnsiteIntro({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'Rapid Response Diesel Delivery'
  const description = data.description ?? 'When every second counts, Atlas Fuel\'s rapid response team delivers diesel exactly when your operations demand it.'
  const ctaText = data.ctaText ?? 'Enquire now'
  const ctaLink = data.ctaLink ?? '/contact'
  const sectionTag = data.sectionTag ?? 'Rapid Response'
  const images = Array.isArray(data.images)
    ? data.images
    : [
        { imageUrl: '/images/onsite-diesel.jpg', imageAlt: 'Fuel Delivery Truck' },
        { imageUrl: '/images/truck-new.jpg', imageAlt: 'Atlas Fuel Truck' },
      ]
  const stats = Array.isArray(data.stats)
    ? data.stats
    : [
        { value: '24/7', label: 'Emergency Dispatch' },
        { value: 'Fast', label: 'Site Delivery' },
      ]

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
                {sectionTag}
              </div>
              <h2
                className="font-bold mb-8 leading-tight"
                style={cmsTextStyle(data, 'heading', '#111827', '48px')}
              >
                {heading}
              </h2>
            </div>

            <p
              className="onsite-intro-content leading-relaxed mb-8"
              style={cmsTextStyle(data, 'description', '#4b5563', '18px')}
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
                <div className="relative bg-gray-100 aspect-square overflow-hidden">
                  <CmsImage
                    value={images[0]?.image ?? images[0]?.imageImage ?? images[0]?.imageUrl}
                    fallbackSrc="/images/onsite-diesel.jpg"
                    alt={images[0]?.imageAlt ?? images[0]?.imageUrlAlt ?? 'Fuel Delivery Truck'}
                    width={800}
                    height={800}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="bg-primary/10 p-6 flex flex-col justify-center">
                  <div className="text-3xl font-bold text-primary mb-2" style={cmsTextStyle(stats[0], 'value', '#2db234', '30px')}>{stats[0]?.value}</div>
                  <div className="text-gray-600 text-sm" style={cmsTextStyle(stats[0], 'label', '#4b5563', '14px')}>{stats[0]?.label}</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-primary/10 p-6 flex flex-col justify-center">
                  <div className="text-3xl font-bold text-primary mb-2" style={cmsTextStyle(stats[1], 'value', '#2db234', '30px')}>{stats[1]?.value}</div>
                  <div className="text-gray-600 text-sm" style={cmsTextStyle(stats[1], 'label', '#4b5563', '14px')}>{stats[1]?.label}</div>
                </div>
                <div className="relative bg-gray-100 aspect-square overflow-hidden">
                  <CmsImage
                    value={images[1]?.image ?? images[1]?.imageImage ?? images[1]?.imageUrl ?? images[0]?.image ?? images[0]?.imageImage ?? images[0]?.imageUrl}
                    fallbackSrc="/images/truck-new.jpg"
                    alt={images[1]?.imageAlt ?? images[1]?.imageUrlAlt ?? 'Atlas Fuel Truck'}
                    width={800}
                    height={800}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
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
