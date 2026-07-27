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

export default function AboutCulture({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Our People'
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

  const description = data.description || "Atlas Fuel Australia is powered by a team of highly skilled professionals dedicated to excellence in every aspect of our operations. We prioritize attracting, retaining, and nurturing top talent, creating an environment where skills are honed and expertise is valued."
  const descriptionColor = data.descriptionColor || 'text-gray-600'
  const descriptionSize = data.descriptionSize ? { fontSize: sizeMap[data.descriptionSize] } : {}
  const descriptionBorderEnabled = data.descriptionBorderEnabled || false
  const descriptionBorderColor = data.descriptionBorderColor || '#000000'
  const descriptionBorderWidth = data.descriptionBorderWidth || '1px'
  const descriptionShadowColor = data.descriptionShadowColor || ''
  const descriptionStyle = {
    ...descriptionSize,
    ...(descriptionBorderEnabled && {
      WebkitTextStroke: `${descriptionBorderWidth} ${descriptionBorderColor}`,
      ...(descriptionShadowColor && { textShadow: `0 0 10px ${descriptionShadowColor}` }),
    }),
  }

  const imageUrl = data.imageUrl || '/images/work-with-us.jpg'
  const items = data.cultureItems || [
    { title: 'Our Culture',   content: 'We excel in delivering both the product and the concept — streamlining operations in a rapid, agile, and collaborative execution. Our teams work tirelessly to improve logistics for our clients.',       ctaText: 'Enquire Now', ctaLink: '/contact', imageUrl: '/images/work-with-us.webp' },
    { title: 'Our Operators', content: 'At Atlas Fuel Australia, our work culture emphasises a commitment to excellence, continuous learning, and a supportive environment ensuring both personal and professional growth.',                        ctaText: 'Enquire Now', ctaLink: '/contact', imageUrl: '/images/work-with-us.jpg' },
    { title: 'Our Team',      content: 'Our team collaborates across departments to deliver reliable fuel solutions. We focus on innovation, efficiency, and maintaining the highest service standards for our customers.',                          ctaText: 'Enquire Now', ctaLink: '/contact', imageUrl: '/images/work-with-us.webp' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.acul-left', { opacity: 0, x: -60, duration: 1, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } })

      // Cards - enhanced staggered reveal with rotation
      gsap.from('.acul-item', {
        opacity: 0,
        y: 80,
        rotateX: 15,
        duration: 1,
        stagger: {
          each: 0.18,
          from: 'start',
          ease: 'power2.out'
        },
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: '.acul-list', start: 'top 80%', once: true }
      })

      // Number animation
      gsap.from('.acul-number', {
        scale: 0.3,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: '.acul-list', start: 'top 75%', once: true }
      })

      // Content fade in after card appears
      gsap.from('.acul-content', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.acul-list', start: 'top 75%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left */}
          <div className="acul-left lg:col-span-4 lg:sticky lg:top-32 self-start">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-primary" />
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Team</span>
            </div>
            <h2 className={`${headingColor} text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-tight leading-tight mb-6`} style={headingStyle}>
              {heading}
            </h2>
            <p className={`${descriptionColor} text-lg leading-relaxed font-light mb-8`} style={descriptionStyle}>{description}</p>
            <div className="relative h-[250px] overflow-hidden shadow-xl">
              <img
                src={imageUrl}
                alt="Our Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
            </div>
          </div>

          {/* Right — culture cards */}
          <div className="acul-list lg:col-span-8 flex flex-col gap-0 border border-gray-200 overflow-hidden divide-y divide-gray-200">
            {items.map((item, i) => {
              const titleColor = item.titleColor || 'text-black'
              const titleSize = item.titleSize ? { fontSize: sizeMap[item.titleSize] } : {}
              const titleBorderEnabled = item.titleBorderEnabled || false
              const titleBorderColor = item.titleBorderColor || '#000000'
              const titleBorderWidth = item.titleBorderWidth || '1px'
              const titleShadowColor = item.titleShadowColor || ''
              const titleStyle = {
                ...titleSize,
                ...(titleBorderEnabled && {
                  WebkitTextStroke: `${titleBorderWidth} ${titleBorderColor}`,
                  ...(titleShadowColor && { textShadow: `0 0 10px ${titleShadowColor}` }),
                }),
              }

              const contentColor = item.contentColor || 'text-gray-600'
              const contentSize = item.contentSize ? { fontSize: sizeMap[item.contentSize] } : {}
              const contentBorderEnabled = item.contentBorderEnabled || false
              const contentBorderColor = item.contentBorderColor || '#000000'
              const contentBorderWidth = item.contentBorderWidth || '1px'
              const contentShadowColor = item.contentShadowColor || ''
              const contentStyle = {
                ...contentSize,
                ...(contentBorderEnabled && {
                  WebkitTextStroke: `${contentBorderWidth} ${contentBorderColor}`,
                  ...(contentShadowColor && { textShadow: `0 0 10px ${contentShadowColor}` }),
                }),
              }

              const ctaTextColor = item.ctaTextColor || 'text-primary'
              const ctaTextSize = item.ctaTextSize ? { fontSize: sizeMap[item.ctaTextSize] } : {}
              const ctaTextBorderEnabled = item.ctaTextBorderEnabled || false
              const ctaTextBorderColor = item.ctaTextBorderColor || '#000000'
              const ctaTextBorderWidth = item.ctaTextBorderWidth || '1px'
              const ctaTextShadowColor = item.ctaTextShadowColor || ''
              const ctaTextStyle = {
                ...ctaTextSize,
                ...(ctaTextBorderEnabled && {
                  WebkitTextStroke: `${ctaTextBorderWidth} ${ctaTextBorderColor}`,
                  ...(ctaTextShadowColor && { textShadow: `0 0 10px ${ctaTextShadowColor}` }),
                }),
              }

              return (
                <div key={i} className="acul-item group relative bg-white hover:bg-gray-50 transition-colors duration-500 p-8 md:p-10" style={{ perspective: '1000px' }}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className={`acul-content ${titleColor} text-xl md:text-2xl font-heading font-bold uppercase tracking-wide group-hover:text-primary transition-colors duration-300`} style={titleStyle}>
                      {item.title}
                    </h3>
                    <span className="acul-number text-4xl font-heading font-light text-gray-200 group-hover:text-primary transition-colors duration-500 leading-none ml-4 select-none">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <p className={`acul-content ${contentColor} leading-relaxed text-base md:text-lg mb-6 font-light max-w-2xl`} style={contentStyle}>
                        {item.content}
                      </p>
                      {item.ctaText && item.ctaLink && (
                        <Link href={item.ctaLink || '#'}
                          className={`group/link inline-flex items-center gap-3 font-bold uppercase tracking-widest text-sm hover:gap-5 transition-all duration-300 ${ctaTextColor}`} style={ctaTextStyle}>
                          {item.ctaText}
                          <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                          </svg>
                        </Link>
                      )}
                    </div>
                    {item.imageUrl && (
                      <div className="hidden sm:block w-48 h-32 flex-shrink-0 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
