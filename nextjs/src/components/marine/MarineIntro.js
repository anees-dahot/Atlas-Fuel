'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
import { cmsTextStyle } from '@/components/services/cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function MarineIntro({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'Trusted Marine Fuel Supply'
  const content = data.content ?? 'Atlas Fuel delivers premium marine fuel solutions designed for reliability across every tide and every port.'
  const sectionTag = data.sectionTag ?? 'Reliable Solutions'
  const primaryCtaText = data.primaryCtaText ?? data.primaryCTAText ?? 'Get a Quote'
  const primaryCtaLink = data.primaryCtaLink ?? data.primaryCTALink ?? '/contact'
  const secondaryCtaText = data.secondaryCtaText ?? data.secondaryCTAText ?? 'Learn More'
  const secondaryCtaLink = data.secondaryCtaLink ?? data.secondaryCTALink ?? '/services/marine-fuel'
  const statValue = data.statValue ?? '15+'
  const statLabel = data.statLabel ?? 'Years Experience'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.marine-intro-content', {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from('.marine-intro-image', {
        opacity: 0,
        x: 50,
        duration: 1,
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
    <section ref={sectionRef} className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="marine-intro-content">
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4" style={cmsTextStyle(data, 'sectionTag', '#2db234', '14px')}>
              {sectionTag}
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-8 leading-tight" style={cmsTextStyle(data, 'heading', '#111827', '48px')}>
              {heading}
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p style={cmsTextStyle(data, 'content', '#4b5563', '18px')}>{content}</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={primaryCtaLink}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider hover:bg-primary-dark transition-all duration-300"
              >
                {primaryCtaText}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a
                href={secondaryCtaLink}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold uppercase tracking-wider border border-gray-200 hover:border-primary hover:text-primary transition-all duration-300"
              >
                {secondaryCtaText}
              </a>
            </div>
          </div>

          <div className="marine-intro-image relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <CmsImage
                value={data.imageImage ?? data.image ?? data.imageUrl}
                fallbackSrc="/images/marine-fuel.jpg"
                alt={data.imageAlt ?? data.imageUrlAlt ?? 'Marine Fuel Operations'}
                width={1200}
                height={900}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 lg:p-8 shadow-xl">
              <div className="text-4xl lg:text-5xl font-bold font-heading">{statValue}</div>
              <div className="text-sm uppercase tracking-wider mt-1">{statLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
