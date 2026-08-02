'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function ComplianceSection({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'Atlas Compliance'
  const content = data.content ?? 'Atlas Fuel stands proudly certified across ISO, WAHVA, and regulatory standards, proving our unwavering commitment to quality, safety, and responsible operations.'
  const certifications = Array.isArray(data.certifications) ? data.certifications : [
    { name: 'ISO 9001', label: 'Quality Management' },
    { name: 'ISO 14001', label: 'Environmental Management' },
    { name: 'ISO 45001', label: 'Occupational Health & Safety' },
    { name: 'WAHVA', label: 'WA Heavy Vehicle Accreditation' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.compliance-heading', {
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

      gsap.from('.compliance-content', {
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

      gsap.from('.compliance-item', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: 'back.out(1.2)',
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
    <section ref={sectionRef} className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="compliance-heading mb-8"
            style={cmsTextStyle(data, 'heading', '#111827', '48px')}
          >
            {heading}
          </h2>
          <p
            className="compliance-content max-w-4xl mx-auto leading-relaxed"
            style={cmsTextStyle(data, 'content', '#4b5563', '20px')}
          >
            {content}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <div key={cert._key || index} className="compliance-item bg-cream p-6 text-center border border-gray-100 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3
                className="font-bold text-gray-900 mb-2"
                style={cmsTextStyle(cert, 'name', '#111827', '16px')}
              >
                {cert.name}
              </h3>
              <p
                className="text-gray-600 text-sm"
                style={cmsTextStyle(cert, 'label', '#4b5563', '14px')}
              >
                {cert.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
