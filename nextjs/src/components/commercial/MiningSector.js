'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function MiningSector({ data = {} }) {
  const sectionRef = useRef(null)
  const tagline = data.tagline || 'Industry Solutions'
  const heading = data.heading || 'Mining Sector'
  const content = data.content || 'Atlas Fuel is the optimal choice for refueling mining machines due to its unparalleled reliability, efficiency, and safety features. With a steadfast commitment to quality, Atlas Fuel ensures uninterrupted operations by delivering fuel on-site precisely when needed, eliminating costly downtime.\n\nTheir rigorous adherence to industry standards guarantees the highest level of safety, crucial for the demanding environments of mining operations. Moreover, Atlas Fuel\'s competitive pricing and flexible delivery options provide cost-effective solutions tailored to meet the unique demands of mining projects, making them the preferred partner for fueling efficiency and productivity in the mining sector.'
  const imageUrl = data.imageUrl || '/images/what-we-do-mining-civil.webp'
  const statValue = data.statValue || '24/7'
  const statLabel = data.statLabel || 'On-Site Delivery'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ms-content', { opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
      gsap.from('.ms-image', { opacity: 0, scale: 0.9, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="ms-content">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">{tagline}</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-8">{heading}</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {content}
              </p>
            </div>
          </div>

          <div className="ms-image relative">
            <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
              <img src={imageUrl} alt="Mining Operations" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 shadow-xl">
              <div className="text-3xl font-heading font-bold">{statValue}</div>
              <div className="text-sm uppercase tracking-wider text-white/80">{statLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
