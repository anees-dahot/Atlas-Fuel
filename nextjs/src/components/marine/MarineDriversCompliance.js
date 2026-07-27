'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const driverRequirements = [
  'Heavy Vehicle Driver\'s Licence (MC/HC)',
  'Dangerous Goods (DG) Licence',
  'Safe Load Programme (SLP)',
  'Fatigue Management Accreditation',
  'First Aid & Emergency Response Training',
]

export default function MarineDriversCompliance({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Drivers Compliance'
  const content = data.content || 'Our drivers are fully certified and trained to handle marine fuel deliveries with the highest safety standards and regulatory compliance.'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.drivers-heading', {
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

      gsap.from('.drivers-content', {
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

      gsap.from('.drivers-item', {
        opacity: 0,
        x: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      gsap.from('.drivers-image', {
        opacity: 0,
        scale: 0.95,
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
          <div className="order-2 lg:order-1 bg-white p-8 lg:p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Driver Certifications
            </h3>
            <ul className="space-y-4">
              {driverRequirements.map((item, index) => (
                <li key={index} className="drivers-item flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                All drivers undergo regular training and certification updates to maintain compliance with Australian regulations.
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Professional Standards
            </span>
            <h2 className="drivers-heading text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-8">
              {heading}
            </h2>
            <p className="drivers-content text-lg text-gray-600 leading-relaxed mb-8">
              {content}
            </p>
            <div className="drivers-image relative aspect-video overflow-hidden">
              <img
                src="/images/marine-bunkering.jpg"
                alt="Atlas Fuel Drivers"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-4 text-gray-900">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">100% Certified</div>
                    <div className="text-sm text-gray-700">All drivers fully accredited</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
