'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
import { cleanCmsValue, cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const icons = {
  pickaxe: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.5 9.5L21 3"/><path d="M14.5 3L21 9.5"/><path d="M2 22l4.5-4.5"/><path d="M11 13l-4 4"/></svg>,
  anchor: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="5" r="3"/><path d="M12 22V8"/><path d="M5 12H2a10 10 0 0020 0h-3"/></svg>,
  wheat: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 22l16-16"/><path d="M6 16l9-9"/><path d="M11 11l6-6"/><path d="M2 22l4-4"/></svg>,
  fuel: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17"/><path d="M3 22h12"/><path d="M15 12l3-3 3 3-3 3"/></svg>,
  truck: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
}

export default function IndustriesGrid({ data = {} }) {
  const industries = data.industries ?? [
    { title: 'Mining Fuel', description: 'We deliver high-quality fuel solutions to power industries, businesses, and communities across Australia.', icon: 'pickaxe' },
    { title: 'Marine Fuel', description: 'From mining and agriculture to transport and marine, our services are customized to meet every sector\'s needs.', icon: 'anchor' },
    { title: 'Agriculture', description: 'Our offerings include bulk fuel supply, on-site refueling, logistics, and retail solutions for seamless operations.', icon: 'wheat' },
    { title: 'Fuel Retailer', description: 'Wherever you operate, Atlas Fuel keeps you moving, growing, and succeeding with dependable service.', icon: 'fuel' },
    { title: 'Fuel Distributor', description: 'Wherever you operate, Atlas Fuel keeps you moving, growing, and succeeding with dependable service.', icon: 'truck' }
  ]
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ig-header', { opacity: 0, y: 60, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
      })
      gsap.from('.ig-card', { opacity: 0, y: 80, scale: 0.9, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.ig-grid', start: 'top 85%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 ig-header">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">{data.eyebrow ?? 'Our Expertise'}</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight" style={cmsTextStyle(data, 'heading')}>{data.heading ?? 'Industries We Serve'}</h2>
        </div>

        <div className="ig-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div key={industry._key || industry.title || index} className="ig-card group bg-white overflow-hidden border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              {(industry.image || industry.imageUrl) && (
                <div className="relative h-48 overflow-hidden">
                  <CmsImage
                    value={industry.image ?? industry.imageUrl}
                    alt={industry.imageAlt ?? industry.alt ?? industry.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-8">
                {cleanCmsValue(industry.icon) && (
                  <div className="w-16 h-16 bg-gray-50 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {icons[cleanCmsValue(industry.icon)] ?? icons.fuel}
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-3">{industry.title}</h3>
                <p className="text-gray-600 leading-relaxed">{industry.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
