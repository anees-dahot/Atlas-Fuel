'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const fleetFeatures = [
  'Real-Time GPS & Cloud Tracking',
  'Automated Route Optimization',
  '24/7 Control Room Monitoring',
  'Onsite & In-Cab Driver Training',
  'Fatigue & Safety Monitoring Systems',
  'Emergency Response Preparedness',
  'Automated Compliance Reporting',
  'Customer Portal Access',
]

export default function MarineFleetCompliance({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Fleet Compliance'
  const content = data.content || 'Our fleet operates with the highest standards of safety and compliance, ensuring your marine fuel deliveries are tracked, monitored, and optimized at every step.'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fleet-heading', {
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

      gsap.from('.fleet-content', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from('.fleet-item', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Safety & Technology
            </span>
            <h2 className="fleet-heading text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-8">
              {heading}
            </h2>
            <p className="fleet-content text-lg text-gray-600 leading-relaxed mb-10">
              {content}
            </p>
            <div className="bg-primary/5 border-l-4 border-primary p-6">
              <p className="text-gray-700 italic">
                &ldquo;Every vessel in our fleet is equipped with state-of-the-art tracking and monitoring systems to ensure complete transparency and safety.&rdquo;
              </p>
            </div>
          </div>

          <div className="bg-cream p-8 lg:p-10 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Fleet Standards
            </h3>
            <ul className="space-y-4">
              {fleetFeatures.map((item, index) => (
                <li key={index} className="fleet-item flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
