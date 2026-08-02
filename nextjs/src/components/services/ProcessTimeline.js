'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const defaultSteps = [
  {
    number: '01',
    title: 'Contact Us',
    description: 'Reach out by phone, email, or our online form. Our team responds within 24 hours.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6.87-6.87 19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.904.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
  },
  {
    number: '02',
    title: 'Custom Solution',
    description: 'We analyze your needs and create a tailored fuel supply plan for your business.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>,
  },
  {
    number: '03',
    title: 'Schedule Delivery',
    description: 'Our logistics team coordinates your delivery schedule with GPS-tracked tankers.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  },
  {
    number: '04',
    title: 'On-Time Delivery',
    description: 'Certified drivers deliver your fuel safely and on schedule, every single time.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
]

export default function ProcessTimeline({ data = {} }) {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)

  const heading = data.heading ?? 'Our Simple Process'
  const subheading = data.subheading ?? 'Four easy steps to get reliable fuel delivery for your business'
  const steps = Array.isArray(data.steps) ? data.steps : defaultSteps
  const sectionTag = data.sectionTag ?? 'How It Works'

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from('.process-heading', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Line draw animation
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      // Steps animation
      gsap.from('.process-step', {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="tag" style={cmsTextStyle(data, 'sectionTag', '#2db234', '14px')}>
            {sectionTag}
          </span>
          <h2
            className="process-heading mb-4"
            style={cmsTextStyle(data, 'heading', '#111827', '48px')}
          >
            {heading}
          </h2>
          <p
            className="max-w-3xl mx-auto"
            style={cmsTextStyle(data, 'subheading', '#4b5563', '20px')}
          >
            {subheading}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gray-200">
            <div ref={lineRef} className="h-full bg-primary" />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={step._key || index} className="process-step relative">
                {(step.image ?? step.imageImage ?? step.imageUrl) && (
                  <div className="relative mb-5 aspect-[4/3] overflow-hidden bg-gray-100">
                    <CmsImage
                      value={step.image ?? step.imageImage ?? step.imageUrl}
                      alt={step.imageAlt ?? step.imageUrlAlt ?? step.title ?? `Process step ${index + 1}`}
                      width={800}
                      height={600}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                {/* Step Number & Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-20 h-20 bg-primary flex items-center justify-center mx-auto lg:mx-0">
                    <div className="w-10 h-10 text-white">
                      {step.icon || <span className="text-sm font-bold">{step.number || step.step || String(index + 1).padStart(2, '0')}</span>}
                    </div>
                  </div>
                  {/* Connector dot */}
                  <div className="hidden lg:block absolute top-8 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-primary" />
                </div>

                {/* Content */}
                <div className="text-center lg:text-left">
                  <div
                    className="text-primary font-bold text-lg mb-2"
                    style={cmsTextStyle(step, 'step', '#2db234', '18px')}
                  >
                    {step.number ?? step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3" style={cmsTextStyle(step, 'title', '#111827')}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={cmsTextStyle(step, 'description', '#4b5563')}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
