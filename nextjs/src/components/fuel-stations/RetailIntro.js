'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function RetailIntro({ data = {} }) {
  const sectionRef = useRef(null)

  const subtitle = data.subtitle ?? 'Our Retail Outlets'
  const subtitleColor = data.subtitleColor ?? 'var(--cms-text)'
  const subtitleSize = data.subtitleSize ?? '14px'
  const subtitleBorderEnabled = data.subtitleBorderEnabled ?? false
  const subtitleBorderColor = data.subtitleBorderColor ?? 'var(--cms-text)'
  const subtitleBorderWidth = data.subtitleBorderWidth ?? '1px'
  const subtitleShadowColor = data.subtitleShadowColor ?? ''

  const title = data.title ?? 'Serving Australian Motorists'
  const titleColor = data.titleColor ?? 'var(--cms-text)'
  const titleSize = data.titleSize ?? '56px'
  const titleBorderEnabled = data.titleBorderEnabled ?? false
  const titleBorderColor = data.titleBorderColor ?? 'var(--cms-text)'
  const titleBorderWidth = data.titleBorderWidth ?? '1px'
  const titleShadowColor = data.titleShadowColor ?? ''

  const description = data.description ?? 'Our service stations cater to thousands of satisfied customers daily, offering a range of high-quality petroleum products, oils, lubricants, and automotive goods. In addition, our convenience stores stock confectionery, beverages, and groceries for both home and on-the-go needs.'
  const descriptionColor = data.descriptionColor ?? 'var(--cms-text)'
  const descriptionSize = data.descriptionSize ?? '18px'
  const descriptionBorderEnabled = data.descriptionBorderEnabled ?? false
  const descriptionBorderColor = data.descriptionBorderColor ?? 'var(--cms-text)'
  const descriptionBorderWidth = data.descriptionBorderWidth ?? '1px'
  const descriptionShadowColor = data.descriptionShadowColor ?? ''

  const ctaText = data.ctaText ?? 'Enquire now'
  const ctaLink = data.ctaLink ?? '/store-locator'
  const imageUrl = data.imageUrl ?? '/images/what-we-do-fuel-transportation.webp'
  const statValue = data.statValue ?? '24/7'
  const statLabel = data.statLabel ?? 'Service'

  const secondParagraph = data.secondParagraph ?? 'With a widespread network, it\'s highly likely that if you\'re a motorist, you\'ve already benefited from our facilities.'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.retail-intro-content', {
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

      gsap.from('.retail-intro-image', {
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="retail-intro-content">
            <span
              className="inline-block font-bold uppercase tracking-[0.2em] mb-4"
              style={{
                color: subtitleColor,
                fontSize: subtitleSize,
                border: subtitleBorderEnabled ? `${subtitleBorderWidth} solid ${subtitleBorderColor}` : 'none',
                textShadow: subtitleShadowColor ? `0 2px 4px ${subtitleShadowColor}` : 'none',
              }}
            >
              {subtitle}
            </span>
            <h2
              className="font-bold uppercase tracking-[0.03em] mb-8 leading-tight"
              style={{
                color: titleColor,
                fontSize: titleSize,
                border: titleBorderEnabled ? `${titleBorderWidth} solid ${titleBorderColor}` : 'none',
                textShadow: titleShadowColor ? `0 2px 4px ${titleShadowColor}` : 'none',
              }}
            >
              {title}
            </h2>
            <div className="space-y-6 leading-relaxed">
              <p
                style={{
                  color: descriptionColor,
                  fontSize: descriptionSize,
                  border: descriptionBorderEnabled ? `${descriptionBorderWidth} solid ${descriptionBorderColor}` : 'none',
                  textShadow: descriptionShadowColor ? `0 2px 4px ${descriptionShadowColor}` : 'none',
                }}
              >
                {description}
              </p>
              {secondParagraph && <p>{secondParagraph}</p>}
            </div>
            {ctaText && ctaLink && <div className="mt-10">
              <Link
                href={ctaLink}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider hover:bg-primary-dark transition-all duration-300"
              >
                {ctaText}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>}
          </div>

          <div className="retail-intro-image relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <CmsImage
                value={data.image ?? imageUrl}
                alt={data.imageAlt ?? 'Atlas Fuel Retail Station'}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 lg:p-8 shadow-xl">
              <div className="text-4xl lg:text-5xl font-bold">{statValue}</div>
              <div className="text-sm uppercase tracking-wider mt-1">{statLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
