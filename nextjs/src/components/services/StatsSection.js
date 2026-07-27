'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function StatsSection({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Do You Know?'
  const content = data.content || 'Atlas Fuel is a trusted partner for over 200 commercial diesel clients and retail businesses across Australia, providing reliable fuel solutions tailored to their unique needs. Our extensive network and logistical expertise ensure seamless delivery of high-quality fuel, no matter where our clients are located. With a strong commitment to efficiency, competitive pricing, and customer satisfaction, Atlas Fuel has become a leading choice for businesses that depend on uninterrupted fuel supply. Whether powering fleets, machinery, or retail outlets, we consistently deliver success by combining superior service with nationwide coverage.'
  const stats = data.stats || [
    { value: '200+', label: 'Commercial Diesel Clients' },
    { value: 'Nationwide', label: 'Fuel Delivery Network' },
    { value: '24/7', label: 'Customer Support' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stats-heading', {
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

      gsap.from('.stats-content', {
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

      gsap.from('.stats-item', {
        opacity: 0,
        scale: 0.8,
        duration: 0.7,
        stagger: 0.15,
        ease: 'back.out(1.2)',
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
    <section ref={sectionRef} className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="stats-heading text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            {heading}
          </h2>
          <p className="stats-content text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {content}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="stats-item bg-cream p-8 text-center border border-gray-200">
              <div className="text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
