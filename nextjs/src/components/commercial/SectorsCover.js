'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function SectorsCover({ data = {} }) {
  const sectionRef = useRef(null)
  const heading = data.heading ?? 'Sectors We Cover'
  const content = data.content ?? 'ATLAS specializes in offering fuel supply and logistics services, catering to various sectors such as the Mining industry, local farmers, retail fuel stations, and independent fuel companies. Our organizational structure is distinctive yet straightforward, and we take pride in being accessible to a wide range of customers.'
  const image = data.image ?? data.imageUrl ?? '/images/what-we-do-fuel-transportation.webp'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sc-content', { opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="sc-content">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">{data.eyebrow ?? 'Coverage'}</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-8" style={cmsTextStyle(data, 'heading')}>{heading}</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed" style={cmsTextStyle(data, 'content')}>
              {content}
            </p>
          </div>
          <div className="relative h-[400px] overflow-hidden shadow-xl">
            <CmsImage
              value={image}
              alt={data.imageAlt ?? heading}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
