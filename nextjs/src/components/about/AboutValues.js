'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

export default function AboutValues({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Driven by Trust, Powered by Experience.'
  const headingColor = data.headingColor || 'text-black'
  const headingSize = data.headingSize ? { fontSize: sizeMap[data.headingSize] } : {}
  const headingBorderEnabled = data.headingBorderEnabled || false
  const headingBorderColor = data.headingBorderColor || '#000000'
  const headingBorderWidth = data.headingBorderWidth || '1px'
  const headingShadowColor = data.headingShadowColor || ''
  const headingStyle = {
    ...headingSize,
    ...(headingBorderEnabled && {
      WebkitTextStroke: `${headingBorderWidth} ${headingBorderColor}`,
      ...(headingShadowColor && { textShadow: `0 0 10px ${headingShadowColor}` }),
    }),
  }

  const body = data.whatWeOffer || "At Atlas Fuel Australia, we power industries, businesses, and communities with reliable, high-quality fuel solutions tailored to every need. From mining and agriculture to transport, marine, retail, and construction — we support the sectors that drive Australia forward."
  const bodyColor = data.whatWeOfferColor || 'text-gray-600'
  const bodySize = data.whatWeOfferSize ? { fontSize: sizeMap[data.whatWeOfferSize] } : {}
  const bodyBorderEnabled = data.whatWeOfferBorderEnabled || false
  const bodyBorderColor = data.whatWeOfferBorderColor || '#000000'
  const bodyBorderWidth = data.whatWeOfferBorderWidth || '1px'
  const bodyShadowColor = data.whatWeOfferShadowColor || ''
  const bodyStyle = {
    ...bodySize,
    ...(bodyBorderEnabled && {
      WebkitTextStroke: `${bodyBorderWidth} ${bodyBorderColor}`,
      ...(bodyShadowColor && { textShadow: `0 0 10px ${bodyShadowColor}` }),
    }),
  }

  const ctaText = data.ctaText || 'Enquire Now'
  const ctaTextColor = data.ctaTextColor || 'text-black'
  const ctaTextSize = data.ctaTextSize ? { fontSize: sizeMap[data.ctaTextSize] } : {}
  const ctaTextBorderEnabled = data.ctaTextBorderEnabled || false
  const ctaTextBorderColor = data.ctaTextBorderColor || '#000000'
  const ctaTextBorderWidth = data.ctaTextBorderWidth || '1px'
  const ctaTextShadowColor = data.ctaTextShadowColor || ''
  const ctaTextStyle = {
    ...ctaTextSize,
    ...(ctaTextBorderEnabled && {
      WebkitTextStroke: `${ctaTextBorderWidth} ${ctaTextBorderColor}`,
      ...(ctaTextShadowColor && { textShadow: `0 0 10px ${ctaTextShadowColor}` }),
    }),
  }

  const ctaLink = data.ctaLink || '/contact'
  const imageUrl = data.imageUrl || '/images/partner-in-safety.webp'
  const values = data.values || [
    { title: 'Our Vision',  content: 'To emerge as a frontrunner in the fuel industry by creatively providing ideal resolutions to our clientele — introducing fuel products in the Australian market that present a more economically efficient option to the end consumer.' },
    { title: 'Our Mission', content: 'To redefine the landscape of the fuel industry by consistently delivering excellence and pioneering solutions. We strive to lead — not only in providing top-notch fuel products but also in innovatively addressing the evolving needs of our customers.' },
    { title: 'Our Goals',   content: 'We turn challenges into solutions and problems into opportunities through creativity and focus. These are the moments where innovation starts and real progress is made — driving us to lead in fuel supply and service across Australia.' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.aval-left', { opacity: 0, x: -60, duration: 1, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } })

      // List items - enhanced staggered reveal
      gsap.from('.aval-item', {
        opacity: 0,
        y: 60,
        x: 30,
        duration: 0.9,
        stagger: {
          each: 0.2,
          from: 'start',
          ease: 'power2.out'
        },
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.aval-list', start: 'top 80%', once: true }
      })

      // Number counter animation
      gsap.from('.aval-number', {
        scale: 0.5,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.aval-list', start: 'top 75%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left */}
          <div className="aval-left lg:col-span-5 lg:sticky lg:top-32 self-start">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-primary" />
              <span className="text-primary text-sm font-bold uppercase tracking-widest">What We Offer</span>
            </div>
            <h2 className={`${headingColor} text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-tight leading-tight mb-6`} style={headingStyle}>
              {heading}
            </h2>
            <p className={`${bodyColor} text-lg leading-relaxed mb-10 font-light`} style={bodyStyle}>{body}</p>
            <div className="relative h-[250px] overflow-hidden shadow-xl mb-10">
              <img
                src={imageUrl}
                alt="What We Offer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
            </div>
            <Link href={ctaLink || '#'}
              className="group inline-flex items-center gap-4 font-bold uppercase tracking-widest hover:text-primary transition-colors duration-300">
              <span className={`relative ${ctaTextColor} after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-100 after:origin-left after:transition-transform after:duration-300`} style={ctaTextStyle}>
                {ctaText}
              </span>
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Right — accordion-style list */}
          <div className="aval-list lg:col-span-7 border-t border-gray-200">
            {values.map((v, i) => {
              const titleColor = v.titleColor || 'text-black'
              const titleSize = v.titleSize ? { fontSize: sizeMap[v.titleSize] } : {}
              const titleBorderEnabled = v.titleBorderEnabled || false
              const titleBorderColor = v.titleBorderColor || '#000000'
              const titleBorderWidth = v.titleBorderWidth || '1px'
              const titleShadowColor = v.titleShadowColor || ''
              const titleStyle = {
                ...titleSize,
                ...(titleBorderEnabled && {
                  WebkitTextStroke: `${titleBorderWidth} ${titleBorderColor}`,
                  ...(titleShadowColor && { textShadow: `0 0 10px ${titleShadowColor}` }),
                }),
              }

              const contentColor = v.contentColor || 'text-gray-600'
              const contentSize = v.contentSize ? { fontSize: sizeMap[v.contentSize] } : {}
              const contentBorderEnabled = v.contentBorderEnabled || false
              const contentBorderColor = v.contentBorderColor || '#000000'
              const contentBorderWidth = v.contentBorderWidth || '1px'
              const contentShadowColor = v.contentShadowColor || ''
              const contentStyle = {
                ...contentSize,
                ...(contentBorderEnabled && {
                  WebkitTextStroke: `${contentBorderWidth} ${contentBorderColor}`,
                  ...(contentShadowColor && { textShadow: `0 0 10px ${contentShadowColor}` }),
                }),
              }

              return (
                <div key={i} className="aval-item group relative flex gap-8 py-10 border-b border-gray-200 hover:border-primary/30 transition-colors duration-500 overflow-hidden">
                  {/* Number */}
                  <span className="aval-number flex-none text-5xl md:text-6xl font-heading font-light text-gray-200 group-hover:text-primary transition-colors duration-500 leading-none select-none">
                    0{i + 1}
                  </span>
                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className={`${titleColor} text-xl md:text-2xl font-heading font-bold uppercase tracking-wide mb-3`} style={titleStyle}>
                      {v.title}
                    </h3>
                    <p className={`${contentColor} text-base md:text-lg leading-relaxed font-light group-hover:text-gray-800 transition-colors duration-300`} style={contentStyle}>
                      {v.content}
                    </p>
                  </div>
                  {/* Hover accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
