'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function TrainingSupport() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ts-content', { opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
      gsap.from('.ts-cta', { opacity: 0, x: 50, duration: 0.8, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="ts-content">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Comprehensive Support</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-8">Training and Support</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                In addition to the training and support that we provide, Atlas Fuel franchisees also benefit from our strong brand recognition and reputation in the fuel industry. Our brand is well-known and respected throughout Australia, and our franchisees have the opportunity to leverage that brand recognition to build their own successful businesses.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We also offer exclusive products and services to our franchisees, providing them with access to cutting-edge technology and innovative fuel solutions. Our commitment to innovation and customer service sets us apart from other fuel providers and ensures that our franchisees are always at the forefront of the industry.
              </p>
            </div>
          </div>

          <div className="ts-cta bg-primary-dark text-white p-10">
            <h3 className="text-2xl font-bold uppercase tracking-wide mb-6">Start Your Journey</h3>
            <p className="text-white/80 mb-8 leading-relaxed">
              Ready to take the next step? Register now to learn more about franchise opportunities with Atlas Fuel Australia.
            </p>
            <Link href="/contact" 
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold uppercase tracking-wide hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 w-full justify-center">
              Register Now
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
