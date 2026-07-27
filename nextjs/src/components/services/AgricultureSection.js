'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function AgricultureSection({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Agriculture'
  const content = data.content || 'Atlas Fuel Australia prides itself on delivering the best prices to its agriculture customers. With a commitment to supporting Australia\'s farming communities, Atlas Fuel ensures competitive rates that help farmers manage their operational costs effectively. Whether it\'s supplying diesel for machinery or other fuel needs essential to agriculture, Atlas Fuel Australia combines reliability with cost-efficiency, ensuring that farmers can focus on their crops and livestock without financial strain. Their dedication to customer satisfaction and understanding of agricultural needs makes them a trusted partner in the industry, fostering long-term relationships built on reliability and competitive pricing.'

  // Dynamic styling props
  const headingColor = data.headingColor || '#111827'
  const headingSize = data.headingSize || '48px'
  const headingBorderEnabled = data.headingBorderEnabled || false
  const headingBorderColor = data.headingBorderColor || '#111827'
  const headingBorderWidth = data.headingBorderWidth || '1px'
  const headingShadowColor = data.headingShadowColor || 'rgba(0,0,0,0.3)'

  const contentColor = data.contentColor || '#4b5563'
  const contentSize = data.contentSize || '20px'
  const contentBorderEnabled = data.contentBorderEnabled || false
  const contentBorderColor = data.contentBorderColor || '#4b5563'
  const contentBorderWidth = data.contentBorderWidth || '1px'
  const contentShadowColor = data.contentShadowColor || 'rgba(0,0,0,0.3)'

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
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-primary mb-2">Best Prices</div>
                  <div className="text-gray-600 text-sm">For agriculture customers</div>
                </div>
                <div className="bg-white p-6 shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-primary mb-2">Reliable</div>
                  <div className="text-gray-600 text-sm">Fuel supply when needed</div>
                </div>
                <div className="bg-white p-6 shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-primary mb-2">Flexible</div>
                  <div className="text-gray-600 text-sm">Delivery options</div>
                </div>
                <div className="bg-white p-6 shadow-sm border border-gray-100">
                  <div className="text-3xl font-bold text-primary mb-2">Trusted</div>
                  <div className="text-gray-600 text-sm">Partner for farmers</div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2
              className="agri-heading font-bold mb-6"
              style={{
                color: headingColor,
                fontSize: headingSize,
                border: headingBorderEnabled ? `${headingBorderWidth} solid ${headingBorderColor}` : 'none',
                textShadow: headingShadowColor ? `0 2px 4px ${headingShadowColor}` : 'none',
              }}
            >
              {heading}
            </h2>
            <p
              className="agri-content leading-relaxed"
              style={{
                color: contentColor,
                fontSize: contentSize,
                border: contentBorderEnabled ? `${contentBorderWidth} solid ${contentBorderColor}` : 'none',
                textShadow: contentShadowColor ? `0 2px 4px ${contentShadowColor}` : 'none',
              }}
            >
              {content}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
