'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function MarineIntro({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Trusted Marine Fuel Supply'
  const content = data.content || 'Atlas Fuel delivers premium marine fuel solutions designed for reliability across every tide and every port.'
  const imageUrl = data.imageUrl || '/images/marine-fuel.jpg'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.marine-intro-content', {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.from('.marine-intro-image', {
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
    <section ref={sectionRef} className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="marine-intro-content">
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
              Reliable Solutions
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-8 leading-tight">
              {heading}
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>{content}</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider hover:bg-primary-dark transition-all duration-300"
              >
                Get a Quote
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a
                href="/services/marine-fuel"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold uppercase tracking-wider border border-gray-200 hover:border-primary hover:text-primary transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="marine-intro-image relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={imageUrl}
                alt="Marine Fuel Operations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 lg:p-8 shadow-xl">
              <div className="text-4xl lg:text-5xl font-bold font-heading">15+</div>
              <div className="text-sm uppercase tracking-wider mt-1">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
