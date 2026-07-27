'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function FranchiseIntro() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fi-content', { opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="franchise-info" className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="fi-content max-w-4xl mx-auto">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Franchise</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-[0.03em] mb-8">Atlas Franchise</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Atlas Fuel Australia offers a unique franchise opportunity with a proven business model and comprehensive support. Our focus on innovation, sustainability, and customer satisfaction ensures franchisees thrive in a competitive market. Partnering with Atlas Fuel means joining a trusted brand that values community and excellence, making it an ideal choice for a rewarding business venture.
          </p>
          <Link href="/about" 
                className="group inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:text-primary-dark transition-colors">
            Read More About Us
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
