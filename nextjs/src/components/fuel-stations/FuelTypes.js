'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function FuelTypes({ data = {}, products }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'Our Fuel Products'
  const headingColor = data.headingColor ?? 'var(--cms-text)'
  const headingSize = data.headingSize ?? '48px'
  const headingBorderEnabled = data.headingBorderEnabled ?? false
  const headingBorderColor = data.headingBorderColor ?? 'var(--cms-text)'
  const headingBorderWidth = data.headingBorderWidth ?? '1px'
  const headingShadowColor = data.headingShadowColor ?? ''

  const displayProducts = products ?? data.fuelTypes ?? []
  const primaryCtaText = data.primaryCtaText ?? 'Order Bulk'
  const primaryCtaLink = data.primaryCtaLink ?? '/contact'
  const secondaryCtaText = data.secondaryCtaText ?? 'Enquire'
  const secondaryCtaLink = data.secondaryCtaLink ?? '/contact'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fuel-types-header', {
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

      gsap.from('.fuel-type-card', {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.fuel-types-grid',
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 fuel-types-header">
          <h2
            className="font-bold"
            style={{
              color: headingColor,
              fontSize: headingSize,
              border: headingBorderEnabled ? `${headingBorderWidth} solid ${headingBorderColor}` : 'none',
              textShadow: headingShadowColor ? `0 2px 4px ${headingShadowColor}` : 'none',
            }}
          >
            {heading}
          </h2>
        </div>

        <div className="fuel-types-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProducts.map((product, i) => (
            <div
              key={product._key ?? product.id ?? product.name ?? product.title ?? i}
              className="fuel-type-card group bg-white border border-gray-100 hover:border-primary/30 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <CmsImage
                  value={product.image ?? product.imageImage ?? product.imageUrl}
                  alt={product.imageAlt ?? product.alt ?? product.name ?? product.title ?? ''}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 w-16 h-16 bg-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{product.octane}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {product.name ?? product.title}
                </h3>
                <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  {product.subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  {product.description}
                </p>
                
                <div className="flex gap-3">
                  {primaryCtaText && primaryCtaLink && <Link
                    href={primaryCtaLink}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-primary text-white font-bold text-sm uppercase hover:bg-primary-dark transition-all"
                  >
                    {primaryCtaText}
                  </Link>}
                  {secondaryCtaText && secondaryCtaLink && <Link
                    href={secondaryCtaLink}
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 border border-gray-200 text-gray-700 font-bold text-sm uppercase hover:border-primary hover:text-primary transition-all"
                  >
                    {secondaryCtaText}
                  </Link>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
