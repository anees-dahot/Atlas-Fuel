'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function ComplianceSection({ data = {} }) {
  const sectionRef = useRef(null)
  const [activeTab, setActiveTab] = useState(null)
  
  const complianceTabs = (data.certifications ?? [
    {
      name: 'Atlas Compliance',
      label: 'At Atlas Fuel, compliance is more than a requirement — it is the foundation of how we operate.',
    },
  ]).map((cert, index) => ({
    id: cert._key ?? index.toString(),
    title: cert.name,
    content: cert.description ?? cert.label,
    image: cert.image ?? cert.imageUrl,
    imageAlt: cert.imageAlt ?? cert.alt ?? cert.name,
  }))
  const activeId = complianceTabs.some((tab) => tab.id === activeTab)
    ? activeTab
    : complianceTabs[0]?.id
  
  const heading = data.heading ?? 'Atlas Compliance'
  const description = data.description ?? 'Atlas Fuel stands proudly certified across ISO, WAHVA, and regulatory standards, proving our unwavering commitment to quality, safety, and responsible operations.'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cs-header', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      })
      gsap.from('.cs-tabs', { opacity: 0, y: 50, duration: 1, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="cs-header text-center mb-12">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">{data.eyebrow ?? 'Standards & Safety'}</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-6" style={cmsTextStyle(data, 'heading')}>{heading}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto" style={cmsTextStyle(data, 'description')}>
            {description}
          </p>
        </div>

        <div className="cs-tabs">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {complianceTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-bold uppercase tracking-wide transition-all duration-300 ${
                  activeId === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 lg:p-12 border border-gray-100 shadow-sm">
            {complianceTabs.map((tab) => (
              <div
                key={tab.id}
                className={`transition-all duration-500 ${
                  activeId === tab.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-6">{tab.title}</h3>
                {tab.image && (
                  <div className="relative h-56 mb-6 overflow-hidden">
                    <CmsImage
                      value={tab.image}
                      alt={tab.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                )}
                <p className="text-lg text-gray-600 leading-relaxed">{tab.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
