'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import CmsImage from '@/components/common/CmsImage'
import { cleanCmsLink, cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function OwnStation({ data = {} }) {
  const sectionRef = useRef(null)
  const tagline = data.tagline ?? 'Franchise Opportunity'
  const heading = data.heading ?? 'Own a Fuel Station?'
  const content = data.content ?? 'If you own a fuel station, Atlas Fuel can provide you with Atlas Fuel branding, services tailored to enhance your station\'s visibility and appeal. Enquiring about Atlas Fuel branding can offer you a range of benefits, from distinctive branding that attracts more customers to operational support that helps streamline your business.\n\nExplore how Atlas Fuel branding can elevate your station\'s presence and customer satisfaction today by reaching out to inquire about their specialized services.'
  const ctaText = data.ctaText ?? 'Learn More'
  const ctaLink = cleanCmsLink(data.ctaLink ?? '/fuel-station-enquiry')
  const image = data.image ?? data.imageUrl ?? '/images/fuel-stations.jpg'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.os-content', { opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-sand">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="os-content">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">{tagline}</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-gray-900 mb-8" style={cmsTextStyle(data, 'heading')}>{heading}</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 whitespace-pre-line" style={cmsTextStyle(data, 'content')}>
              {content}
            </p>
            {ctaText && ctaLink && (
              <Link href={ctaLink}
                    className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105">
                {ctaText}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            )}
          </div>
          <div className="relative h-[400px] overflow-hidden shadow-xl">
            <CmsImage
              value={image}
              alt={data.imageAlt ?? heading}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
