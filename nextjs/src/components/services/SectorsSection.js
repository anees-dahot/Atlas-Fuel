'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function SectorsSection({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Sectors We Cover'
  const content = data.content || 'ATLAS specializes in offering fuel supply and logistics services, catering to various sectors such as the Mining industry, local farmers, retail fuel stations, and independent fuel companies. Our organizational structure is distinctive yet straightforward, and we take pride in being accessible to a wide range of customers.'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sectors-heading', {
        opacity: 0,
        x: -60,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.sectors-content', {
        opacity: 0,
        x: 60,
        duration: 0.9,
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
    <section ref={sectionRef} className="py-28 lg:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="sectors-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {heading}
            </h2>
            <p className="sectors-content text-xl text-gray-600 leading-relaxed">
              {content}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900">Mining</h3>
            </div>
            <div className="bg-white p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900">Agriculture</h3>
            </div>
            <div className="bg-white p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h18v18H3zM3 9h18M9 21V9" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900">Retail</h3>
            </div>
            <div className="bg-white p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16.24 7.76l-2.12 2.12" />
                  <path d="M12 18h.01" />
                  <path d="M7.76 7.76l2.12 2.12" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900">Independent</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
