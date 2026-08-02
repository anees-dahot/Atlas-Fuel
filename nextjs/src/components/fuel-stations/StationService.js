'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function StationService({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'At Atlas Fuel, customer service is our highest priority.'
  const headingColor = data.headingColor ?? 'var(--cms-text)'
  const headingSize = data.headingSize ?? '36px'
  const headingBorderEnabled = data.headingBorderEnabled ?? false
  const headingBorderColor = data.headingBorderColor ?? 'var(--cms-text)'
  const headingBorderWidth = data.headingBorderWidth ?? '1px'
  const headingShadowColor = data.headingShadowColor ?? ''

  const content = data.content ?? `We are dedicated to delivering exceptional experiences by ensuring every customer interaction is marked by professionalism, responsiveness, and personalized care. Our team understands the importance of reliable fuel delivery and support, striving to meet and exceed customer expectations at every turn. From timely service to transparent communication, we are committed to building lasting relationships based on trust and satisfaction. At Atlas Fuel, we don't just provide fuel; we power peace of mind by putting our customers first.`
  const contentColor = data.contentColor ?? 'var(--cms-text)'
  const contentSize = data.contentSize ?? '18px'
  const contentBorderEnabled = data.contentBorderEnabled ?? false
  const contentBorderColor = data.contentBorderColor ?? 'var(--cms-text)'
  const contentBorderWidth = data.contentBorderWidth ?? '1px'
  const contentShadowColor = data.contentShadowColor ?? ''

  const question = data.question ?? 'How can we meet the growing demand for fuel needs while protecting our climate & make planet a better place?'
  const questionColor = data.questionColor ?? 'var(--cms-text)'
  const questionSize = data.questionSize ?? '18px'
  const questionBorderEnabled = data.questionBorderEnabled ?? false
  const questionBorderColor = data.questionBorderColor ?? 'var(--cms-text)'
  const questionBorderWidth = data.questionBorderWidth ?? '1px'
  const questionShadowColor = data.questionShadowColor ?? ''

  const imageUrl = data.imageUrl ?? '/images/agriculture.jpg'
  const statValue = data.statValue ?? '99.5%'
  const statLabel = data.statLabel ?? 'Customer Satisfaction'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-heading', {
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

      gsap.from('.service-content', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.2,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from('.service-question', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      gsap.from('.service-image', {
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
          <div>
            <h2
              className="service-heading font-bold mb-8 leading-tight"
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
              className="service-content leading-relaxed mb-8"
              style={{
                color: contentColor,
                fontSize: contentSize,
                border: contentBorderEnabled ? `${contentBorderWidth} solid ${contentBorderColor}` : 'none',
                textShadow: contentShadowColor ? `0 2px 4px ${contentShadowColor}` : 'none',
              }}
            >
              {content}
            </p>

            <div className="service-question p-6 bg-primary/5 border-l-4 border-primary">
              <p
                className="italic"
                style={{
                  color: questionColor,
                  fontSize: questionSize,
                  border: questionBorderEnabled ? `${questionBorderWidth} solid ${questionBorderColor}` : 'none',
                  textShadow: questionShadowColor ? `0 2px 4px ${questionShadowColor}` : 'none',
                }}
              >
                {question}
              </p>
            </div>
          </div>

          <div className="service-image relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <CmsImage
                value={data.image ?? imageUrl}
                alt={data.imageAlt ?? 'Atlas Fuel Service'}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 shadow-xl border border-gray-100">
              <div className="text-4xl font-bold text-primary mb-1">{statValue}</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">{statLabel}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
