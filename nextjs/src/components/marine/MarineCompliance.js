'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cmsTextStyle } from '@/components/services/cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const defaultCertifications = [
  { name: 'ISO 9001', label: 'Quality Management System' },
  { name: 'ISO 14001', label: 'Environmental Management' },
  { name: 'ISO 45001', label: 'Occupational Health & Safety' },
  { name: 'NHVAS', label: 'National Heavy Vehicle Accreditation' },
  { name: '$50M', label: 'Insurance Coverage' },
  { name: 'CoR', label: 'Chain of Responsibility' },
  { name: 'IMO', label: 'IMO 2020 Compliant' },
  { name: 'AMSA', label: 'AMSA Certified' },
]

export default function MarineCompliance({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'Atlas Compliance'
  const content = data.content ?? 'Atlas Fuel stands proudly certified across ISO, NHVAS, and regulatory standards, proving our unwavering commitment to quality, safety, and responsible operations in the marine environment.'
  const certifications = Array.isArray(data.certifications) ? data.certifications : defaultCertifications
  const sectionTag = data.sectionTag ?? 'Certified Standards'
  const trustText = data.trustText ?? 'Trusted by Australia\'s leading marine operators'
  const trustBadges = Array.isArray(data.trustBadges)
    ? data.trustBadges
    : [
        { label: 'AMSA Approved', icon: 'shield' },
        { label: '24/7 Operations', icon: 'clock' },
        { label: 'Fast Response', icon: 'flash' },
      ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.marine-compliance-heading', {
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

      gsap.from('.marine-compliance-content', {
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

      gsap.from('.marine-compliance-item', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.08,
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
    <section ref={sectionRef} className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4" style={cmsTextStyle(data, 'sectionTag', '#2db234', '14px')}>
            {sectionTag}
          </span>
          <h2 className="marine-compliance-heading text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-8" style={cmsTextStyle(data, 'heading', '#111827', '48px')}>
            {heading}
          </h2>
          <p className="marine-compliance-content text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed" style={cmsTextStyle(data, 'content', '#4b5563', '20px')}>
            {content}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={cert._key || index}
              className="marine-compliance-item bg-white p-6 text-center border border-gray-100 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2" style={cmsTextStyle(cert, 'name', '#111827', '16px')}>{cert.name}</h3>
              <p className="text-gray-600 text-sm" style={cmsTextStyle(cert, 'label', '#4b5563', '14px')}>{cert.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
            {trustText}
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            {trustBadges.map((badge, index) => (
              <div key={badge._key || index} className="flex items-center gap-2">
                <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {badge.icon === 'clock'
                    ? <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>
                    : badge.icon === 'flash'
                      ? <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                      : <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
                </svg>
                <span className="text-gray-500 font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
