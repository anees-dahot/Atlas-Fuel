'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function FuelStationEnquiry({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Own a Fuel Station?'
  const content = data.content || 'If you own a fuel station, Atlas Fuel can provide you with Atlas Fuel branding, services tailored to enhance your station\'s visibility and appeal. Enquiring about Atlas Fuel branding can offer you a range of benefits, from distinctive branding that attracts more customers to operational support that helps streamline your business. Explore how Atlas Fuel branding can elevate your station\'s presence and customer satisfaction today by reaching out to inquire about their specialized services.'
  const ctaText = data.ctaText || 'Enquire Now'
  const ctaLink = data.ctaLink || '/contact'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.station-heading', {
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

      gsap.from('.station-content', {
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

      gsap.from('.station-cta', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
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
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-primary/5 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="station-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {heading}
            </h2>
            <p className="station-content text-xl text-gray-600 leading-relaxed">
              {content}
            </p>
          </div>
          <div className="text-center">
            <Link href={ctaLink} className="station-cta inline-block px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider text-sm hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl">
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
