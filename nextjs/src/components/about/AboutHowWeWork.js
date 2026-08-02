'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
import { getCmsTextStyle } from '@/lib/cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function AboutHowWeWork({ data = {} }) {
  const sectionRef = useRef(null)

  const heading    = data.heading    ?? 'How We Work'
  const subheading = data.subheading ?? 'A simple, reliable process built around your needs.'
  const eyebrow    = data.eyebrow    ?? 'The Process'
  const steps      = data.steps      ?? [
    { step: '01', title: 'You Contact Us',          description: 'Reach out by phone, email or our online form. Our team responds within 24 hours to understand your exact fuel requirements.',     imageUrl: '/images/what-we-do-fuel-transportation.webp'  },
    { step: '02', title: 'We Plan the Delivery',    description: 'Our logistics team coordinates your order, schedules the tanker, and confirms delivery time — tracked live via GPS throughout.', imageUrl: '/images/hero-trucks.jpg'  },
    { step: '03', title: 'Fuel Delivered On Time',  description: 'Our certified driver delivers your fuel safely and on schedule, every time. Zero downtime. 99.5% on-time delivery rate.',         imageUrl: '/images/what-we-do-mining-civil.webp'  },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ahww-header', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } })
      gsap.from('.ahww-step', { opacity: 0, y: 80, duration: 0.9, stagger: 0.18, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: '.ahww-steps', start: 'top 80%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="ahww-header text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-primary" />
            <span className="text-primary text-sm font-bold uppercase tracking-widest" style={getCmsTextStyle(data, 'eyebrow')}>{eyebrow}</span>
            <div className="w-12 h-0.5 bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-black uppercase tracking-tight mb-4" style={getCmsTextStyle(data, 'heading')}>{heading}</h2>
          <p className="text-lg text-gray-600 font-light" style={getCmsTextStyle(data, 'subheading')}>{subheading}</p>
        </div>

        {/* Steps */}
        <div className="ahww-steps grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step._key ?? `${step.step}-${i}`} className="ahww-step group relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-[180px] left-[calc(100%+16px)] w-[calc(100%-32px)] h-0.5 bg-gray-200 z-10" style={{ width: '32px' }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-200 border-t-4 border-b-4 border-t-transparent border-b-transparent" />
                </div>
              )}

              {/* Image */}
              <div className="relative h-52 overflow-hidden mb-6 shadow-md group-hover:shadow-lg transition-all duration-300">
                <CmsImage
                  value={step.image ?? step.imageImage ?? step.imageUrl}
                  alt={step.imageAlt ?? step.alt ?? step.title ?? ''}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent" />

                {/* Step badge */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-primary flex items-center justify-center shadow-lg">
                  <span className="text-white font-heading font-bold text-sm" style={getCmsTextStyle(step, 'step')}>{step.step}</span>
                </div>
              </div>

              {/* Content */}
              <div className="relative px-1">
                {/* Progress bar */}
                <div className="w-full h-0.5 bg-gray-100 rounded mb-5 overflow-hidden">
                  <div className="h-full bg-primary rounded transition-all duration-700 group-hover:w-full" style={{ width: `${(i + 1) * 33.3}%` }} />
                </div>

                <h3 className="text-xl font-heading font-bold text-black uppercase tracking-wide mb-3 group-hover:text-primary transition-colors duration-300" style={getCmsTextStyle(step, 'title')}>
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-light" style={getCmsTextStyle(step, 'description')}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
