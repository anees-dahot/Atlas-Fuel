'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const journeyItems = [
  {
    title: 'Proven Success and Expansion',
    description: 'Atlas Fuel Australia has led the fuel retailing industry for over two decades, with a strong foundation of service, reliability, and community engagement. We\'re constantly expanding our network to serve more customers across various regions.',
  },
  {
    title: 'Supportive Franchise Partnership',
    description: 'Investing in an Atlas Fuel Australia franchise means entering a smooth, rewarding journey. We\'re dedicated to helping you succeed and grow your business while fostering a bright future together.',
  },
  {
    title: 'Training and Brand Recognition',
    description: 'Atlas Fuel provides thorough training and ongoing support to ensure franchisee success. With strong brand recognition and a respected reputation, franchisees can leverage this trust to build their own thriving businesses.',
  },
  {
    title: 'Exclusive Products and Innovation',
    description: 'Franchisees gain access to exclusive products, services, and cutting-edge technology, keeping them ahead of industry trends. Our focus on innovation and customer service helps franchisees stay competitive in the fuel market.',
  }
]

export default function SuccessJourney() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sj-header', { opacity: 0, y: 60, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
      })
      gsap.from('.sj-card', { opacity: 0, x: -60, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.sj-grid', start: 'top 85%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="sj-header text-center mb-16">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Your Path Forward</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight">Success Journey</h2>
        </div>

        <div className="sj-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {journeyItems.map((item, index) => (
            <div key={index} className="sj-card bg-gray-50 p-8 border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide pt-2">{item.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 pl-16">{item.description}</p>
              <Link href="/contact" 
                    className="inline-flex items-center gap-2 pl-16 px-6 py-3 bg-primary text-white font-bold uppercase tracking-wider text-sm hover:bg-primary-dark transition-colors">
                Enquire Now
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
