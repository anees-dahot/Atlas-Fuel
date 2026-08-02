'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function TransportationSector({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'Transportation Sector'
  const content = data.content ?? 'Atlas Fuel Australia also stands as a leading provider of competitive fuel prices for the transportation sector. Recognizing the critical role that transportation plays in the movement of goods across the country, Atlas Fuel offers cost-effective solutions tailored to the needs of logistics and transport companies. By providing high-quality fuels at the best possible prices, Atlas Fuel helps businesses in the transportation industry reduce their operating costs and maximize efficiency. With a focus on reliability and customer service, Atlas Fuel Australia ensures that transport companies can keep their fleets running smoothly, while maintaining budget-conscious operations that support their bottom line.'
  const stats = Array.isArray(data.stats) ? data.stats : []

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.trans-heading', {
        opacity: 0,
        x: -60,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.trans-content', {
        opacity: 0,
        x: 60,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="trans-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {heading}
            </h2>
            <p className="trans-content text-xl text-gray-600 leading-relaxed mb-8">
              {content}
            </p>
            {stats.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative h-[400px] overflow-hidden shadow-xl">
            <CmsImage
              value={data.imageImage ?? data.image ?? data.imageUrl}
              fallbackSrc="/images/hero-trucks.jpg"
              alt={data.imageAlt ?? data.imageUrlAlt ?? 'Atlas Fuel Transportation'}
              width={1200}
              height={800}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
