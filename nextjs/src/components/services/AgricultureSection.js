'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function AgricultureSection({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'Agriculture'
  const content = data.content ?? 'Atlas Fuel Australia prides itself on delivering the best prices to its agriculture customers. With a commitment to supporting Australia\'s farming communities, Atlas Fuel ensures competitive rates that help farmers manage their operational costs effectively. Whether it\'s supplying diesel for machinery or other fuel needs essential to agriculture, Atlas Fuel Australia combines reliability with cost-efficiency, ensuring that farmers can focus on their crops and livestock without financial strain. Their dedication to customer satisfaction and understanding of agricultural needs makes them a trusted partner in the industry, fostering long-term relationships built on reliability and competitive pricing.'
  const stats = Array.isArray(data.stats)
    ? data.stats
    : [
        { value: 'Best Prices', label: 'For agriculture customers' },
        { value: 'Reliable', label: 'Fuel supply when needed' },
        { value: 'Flexible', label: 'Delivery options' },
        { value: 'Trusted', label: 'Partner for farmers' },
      ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.agri-heading', {
        opacity: 0,
        x: 60,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.agri-content', {
        opacity: 0,
        x: -60,
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
    <section ref={sectionRef} className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={stat._key || index} className="bg-white p-6 shadow-sm border border-gray-100">
                    <div className="text-3xl font-bold text-primary mb-2" style={cmsTextStyle(stat, 'value', '#2db234', '30px')}>{stat.value}</div>
                    <div className="text-gray-600 text-sm" style={cmsTextStyle(stat, 'label', '#4b5563', '14px')}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2
              className="agri-heading font-bold mb-6"
              style={cmsTextStyle(data, 'heading', '#111827', '48px')}
            >
              {heading}
            </h2>
            <p
              className="agri-content leading-relaxed"
              style={cmsTextStyle(data, 'content', '#4b5563', '20px')}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
