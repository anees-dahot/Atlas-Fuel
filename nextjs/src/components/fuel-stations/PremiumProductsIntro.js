'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function PremiumProductsIntro({ data = {} }) {
  const sectionRef = useRef(null)

  const tagline = data.tagline ?? 'Premium Quality'
  const taglineColor = data.taglineColor ?? 'var(--cms-text)'
  const taglineSize = data.taglineSize ?? '24px'
  const taglineBorderEnabled = data.taglineBorderEnabled ?? false
  const taglineBorderColor = data.taglineBorderColor ?? 'var(--cms-text)'
  const taglineBorderWidth = data.taglineBorderWidth ?? '1px'
  const taglineShadowColor = data.taglineShadowColor ?? ''

  const content = data.content ?? `Atlas Fuel Australia takes pride in offering a range of premium fuel products designed to meet the diverse needs of Australian drivers. Whether you're running a family car, a high-performance vehicle, or a commercial fleet, our fuels are formulated to ensure optimal performance, efficiency, and engine care. Coupled with state-of-the-art retail facilities, we provide an unparalleled refueling experience for our customers.`
  const contentColor = data.contentColor ?? 'var(--cms-text)'
  const contentSize = data.contentSize ?? '18px'
  const contentBorderEnabled = data.contentBorderEnabled ?? false
  const contentBorderColor = data.contentBorderColor ?? 'var(--cms-text)'
  const contentBorderWidth = data.contentBorderWidth ?? '1px'
  const contentShadowColor = data.contentShadowColor ?? ''

  const ctaText = data.ctaText ?? 'Enquire Now'
  const ctaLink = data.ctaLink ?? '/contact'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.premium-intro-content', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.premium-intro-cta', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.2,
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
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="premium-intro-content">
          <div
            className="tag"
            style={{
              color: taglineColor,
              fontSize: taglineSize,
              border: taglineBorderEnabled ? `${taglineBorderWidth} solid ${taglineBorderColor}` : 'none',
              textShadow: taglineShadowColor ? `0 2px 4px ${taglineShadowColor}` : 'none',
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {tagline}
          </div>
          <p
            className="leading-relaxed max-w-4xl mx-auto"
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
        
        {ctaText && ctaLink && <div className="premium-intro-cta mt-10">
          <Link
            href={ctaLink}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-all"
          >
            {ctaText}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>}
      </div>
    </section>
  )
}
