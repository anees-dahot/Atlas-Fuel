'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function CollaborationCulture() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cc-content', { opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="cc-content max-w-4xl mx-auto">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Community</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-8">Sustainable, Reliable & Affordable Fuel Company</h2>
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              We provide opportunities for franchisees to connect and share best practices, enabling them to learn from each other and grow their businesses together.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              If you are interested in becoming an Atlas Fuel franchisee, we encourage you to reach out to us using the form on our franchising opportunities page. We are always looking for motivated individuals who are passionate about customer service and eager to run their own successful businesses.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
