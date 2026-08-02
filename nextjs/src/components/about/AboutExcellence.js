'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const sizeMap = {
  '1': '12px',
  '2': '16px',
  '3': '20px',
  '4': '24px',
  '5': '32px',
  '6': '48px',
  '7': '70px',
};

export default function AboutExcellence({ data = {} }) {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  const eyebrow = data.eyebrow ?? 'Our Philosophy'
  const heading = data.heading ?? 'We Deliver Excellence'
  const headingColor = data.headingColor ?? 'text-gray-900'
  const headingSize = data.headingSize ? { fontSize: sizeMap[data.headingSize] } : {}
  const headingBorderEnabled = data.headingBorderEnabled ?? false
  const headingBorderColor = data.headingBorderColor ?? 'var(--cms-text)'
  const headingBorderWidth = data.headingBorderWidth ?? '1px'
  const headingShadowColor = data.headingShadowColor ?? ''
  const headingStyle = {
    ...headingSize,
    ...(headingBorderEnabled && {
      WebkitTextStroke: `${headingBorderWidth} ${headingBorderColor}`,
      ...(headingShadowColor && { textShadow: `0 0 10px ${headingShadowColor}` }),
    }),
  }

  const content = data.content ?? "There's a moment when it all comes together. When a complicated challenge turns into a creative solution. When a problem turns into an opportunity. We live for those moments. Here at Atlas, creativity is what drives us forward. We are the outliers. The non-conformists. The game-changers. At Atlas Fuel Australia, we believe in more than just powering vehicles — we're here to empower your journeys and fuel the limitless possibilities of tomorrow."
  const contentColor = data.contentColor ?? 'text-gray-600'
  const contentSize = data.contentSize ? { fontSize: sizeMap[data.contentSize] } : {}
  const contentBorderEnabled = data.contentBorderEnabled ?? false
  const contentBorderColor = data.contentBorderColor ?? 'var(--cms-text)'
  const contentBorderWidth = data.contentBorderWidth ?? '1px'
  const contentShadowColor = data.contentShadowColor ?? ''
  const contentStyle = {
    ...contentSize,
    ...(contentBorderEnabled && {
      WebkitTextStroke: `${contentBorderWidth} ${contentBorderColor}`,
      ...(contentShadowColor && { textShadow: `0 0 10px ${contentShadowColor}` }),
    }),
  }

  const ctaText = data.ctaText ?? 'Contact Us'
  const ctaTextColor = data.ctaTextColor ?? 'text-white'
  const ctaTextSize = data.ctaTextSize ? { fontSize: sizeMap[data.ctaTextSize] } : {}
  const ctaTextBorderEnabled = data.ctaTextBorderEnabled ?? false
  const ctaTextBorderColor = data.ctaTextBorderColor ?? 'var(--cms-text)'
  const ctaTextBorderWidth = data.ctaTextBorderWidth ?? '1px'
  const ctaTextShadowColor = data.ctaTextShadowColor ?? ''
  const ctaTextStyle = {
    ...ctaTextSize,
    ...(ctaTextBorderEnabled && {
      WebkitTextStroke: `${ctaTextBorderWidth} ${ctaTextBorderColor}`,
      ...(ctaTextShadowColor && { textShadow: `0 0 10px ${ctaTextShadowColor}` }),
    }),
  }

  const ctaLink = data.ctaLink ?? '/contact'
  const secCtaText = data.secondaryCtaText ?? 'Our Services'
  const secCtaTextColor = data.secondaryCtaTextColor ?? 'text-gray-900'
  const secCtaTextSize = data.secondaryCtaTextSize ? { fontSize: sizeMap[data.secondaryCtaTextSize] } : {}
  const secCtaTextBorderEnabled = data.secondaryCtaTextBorderEnabled ?? false
  const secCtaTextBorderColor = data.secondaryCtaTextBorderColor ?? 'var(--cms-text)'
  const secCtaTextBorderWidth = data.secondaryCtaTextBorderWidth ?? '1px'
  const secCtaTextShadowColor = data.secondaryCtaTextShadowColor ?? ''
  const secCtaTextStyle = {
    ...secCtaTextSize,
    ...(secCtaTextBorderEnabled && {
      WebkitTextStroke: `${secCtaTextBorderWidth} ${secCtaTextBorderColor}`,
      ...(secCtaTextShadowColor && { textShadow: `0 0 10px ${secCtaTextShadowColor}` }),
    }),
  }

  const secCtaLink = data.secondaryCtaLink ?? '/services'
  const bgImage = data.excellenceBgUrl ?? '/images/what-we-offer.webp'

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax
      gsap.to(bgRef.current, {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      // Content entrance
      gsap.from('.aexc-content > *', { opacity: 0, y: 50, duration: 1, stagger: 0.15, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-48 bg-white overflow-hidden flex items-center justify-center text-center">
      {/* Parallax BG */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute -inset-y-[10%] inset-x-0 h-[120%]">
          <CmsImage
            value={data.excellenceBg ?? bgImage}
            alt={data.excellenceBgAlt ?? 'Excellence'}
            fill
            sizes="100vw"
            className="object-cover opacity-10"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/70" />
      </div>

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="aexc-content">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-8 h-0.5 bg-primary" />
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em]">{eyebrow}</span>
            <div className="w-8 h-0.5 bg-primary" />
          </div>

          {/* Heading */}
          <h2 className={`${headingColor} text-4xl md:text-5xl lg:text-7xl font-heading font-bold uppercase tracking-tight leading-none mb-10`} style={headingStyle}>
            {heading}
          </h2>

          {/* Quote */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <span className="absolute -top-6 -left-4 text-7xl text-gray-200 font-heading leading-none select-none">&ldquo;</span>
            <p className={`${contentColor} text-lg md:text-xl lg:text-2xl leading-relaxed font-light italic relative z-10`} style={contentStyle}>
              {content}
            </p>
            <span className="absolute -bottom-10 -right-4 text-7xl text-gray-200 font-heading leading-none select-none">&rdquo;</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14">
            {ctaText && ctaLink && <Link href={ctaLink}
              className={`group w-full sm:w-auto px-10 py-5 bg-primary font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 ${ctaTextColor}`} style={ctaTextStyle}>
              {ctaText}
              <svg className="inline ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>}
            {secCtaText && secCtaLink && <Link href={secCtaLink}
              className={`w-full sm:w-auto px-10 py-5 bg-transparent border border-gray-400 font-bold uppercase tracking-wider hover:bg-primary-dark hover:text-white hover:border-primary-dark transition-all duration-300 ${secCtaTextColor}`} style={secCtaTextStyle}>
              {secCtaText}
            </Link>}
          </div>
        </div>
      </div>
    </section>
  )
}
