'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function IndustriesSection({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Industries We Serve'
  const industries = data.industries || [
    { title: 'Mining Fuel', description: 'We deliver high-quality fuel solutions to power industries, businesses, and communities across Australia.', link: '/services/mining-fuel' },
    { title: 'Marine Fuel', description: 'From mining and agriculture to transport and marine, our services are customized to meet every sector\'s needs.', link: '/services/marine-fuel' },
    { title: 'Agriculture', description: 'Our offerings include bulk fuel supply, on-site refueling, logistics, and retail solutions for seamless operations.', link: '/services/agriculture-fuel' },
    { title: 'Fuel Retailer', description: 'Wherever you operate, Atlas Fuel keeps you moving, growing, and succeeding with dependable service.', link: '/services/fuel-retailers' },
    { title: 'Fuel Distributor', description: 'Wherever you operate, Atlas Fuel keeps you moving, growing, and succeeding with dependable service.', link: '/services/local-fuel-distributors' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.industries-heading', {
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

      gsap.from('.industries-card', {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)',
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
    <section ref={sectionRef} className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="industries-heading sec-title text-center mb-16">
          {heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <Link key={index} href={industry.link || '#'} className="industries-card group">
              <div className="h-full bg-cream p-8 border border-gray-100 hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {industry.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {industry.description}
                </p>
                <div className="mt-4 flex items-center text-primary font-semibold">
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
