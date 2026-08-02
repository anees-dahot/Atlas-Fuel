'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function ContactSection({data}) {
  const sectionRef = useRef(null)
  const offices = Array.isArray(data?.offices) ? data.offices : []

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cs-header', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      })
      gsap.from('.cs-card', { opacity: 0, y: 50, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.cs-grid', start: 'top 85%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="cs-header text-center mb-16">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">{data.eyebrow}</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-4">{data.heading}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{data.description}</p>
        </div>

        <div className="cs-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {offices.map((office, index) => (
            <div key={office._key || office.title || index} className="cs-card bg-gray-50 p-8 border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-6">{office.title}</h3>
              
              <div className="space-y-4">
                {office.address && <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="text-gray-600">{office.address}</p>
                </div>}
                
                {office.phone && <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6.87-6.87 19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.904.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <a href={`tel:${String(office.phone).replace(/\s/g, '')}`} className="text-gray-600 hover:text-primary transition-colors">
                    {office.phone}
                  </a>
                </div>}
                
                {office.email && <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 6L2 7" />
                  </svg>
                  <a href={`mailto:${office.email}`} className="text-gray-600 hover:text-primary transition-colors">
                    {office.email}
                  </a>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
