'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function Agriculture({ data = {} }) {
  const sectionRef = useRef(null)
  const tagline = data.tagline ?? 'Supporting Farmers'
  const heading = data.heading ?? 'Agriculture'
  const content = data.content ?? 'Atlas Fuel Australia prides itself on delivering the best prices to its agriculture customers. With a commitment to supporting Australia\'s farming communities, Atlas Fuel ensures competitive rates that help farmers manage their operational costs effectively.\n\nWhether it\'s supplying diesel for machinery or other fuel needs essential to agriculture, Atlas Fuel Australia combines reliability with cost-efficiency, ensuring that farmers can focus on their crops and livestock without financial strain. Their dedication to customer satisfaction and understanding of agricultural needs makes them a trusted partner in the industry, fostering long-term relationships built on reliability and competitive pricing.'
  const features = data.features ?? [
    { title: 'Best Prices', description: 'Competitive rates for farming communities' },
    { title: 'Reliable', description: 'On-time delivery during harvest seasons' },
    { title: 'Quality', description: 'Premium diesel for all machinery' },
    { title: 'Local', description: 'Supporting Australian farmers' },
  ]
  const image = data.image ?? data.imageUrl ?? '/images/agriculture.jpg'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ag-content', { opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
      gsap.from('.ag-features', { opacity: 0, x: 50, duration: 1, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="ag-content order-1 lg:order-1">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">{tagline}</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-8" style={cmsTextStyle(data, 'heading')}>{heading}</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line" style={cmsTextStyle(data, 'content')}>
                {content}
              </p>
            </div>
            <div className="relative h-[300px] overflow-hidden shadow-xl mt-8">
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

          <div className="ag-features order-2 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={feature._key || feature.title || index} className={`bg-gray-50 p-6 border-l-4 ${index % 2 === 0 ? 'border-primary' : 'border-gray-900'}`}>
                  <div className={`text-3xl font-heading font-bold mb-2 ${index % 2 === 0 ? 'text-primary' : 'text-gray-900'}`}>{feature.title}</div>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
