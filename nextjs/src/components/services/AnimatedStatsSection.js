'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 200, suffix: '+', label: 'Commercial Clients', description: 'Trust Atlas Fuel for their fuel needs' },
  { value: 100, suffix: 'M+', label: 'Litres Delivered', description: 'Fuel supplied annually' },
  { value: 24, suffix: '/7', label: 'Support Available', description: 'Round the clock customer service' },
  { value: 99, suffix: '.9%', label: 'Reliability Rate', description: 'On-time delivery guarantee' },
  { value: 50, suffix: '+', label: 'Fuel Stations', description: 'Across Australia' },
  { value: 300, suffix: '+', label: 'Jobs Created', description: 'Employment opportunities' },
  { value: 15, suffix: '+', label: 'Years Experience', description: 'In the fuel industry' },
  { value: 8, suffix: '+', label: 'Sectors Served', description: 'Diverse industries' },
]

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const counterRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const duration = 2000
          const increment = value / (duration / 16)
          
          const timer = setInterval(() => {
            start += increment
            if (start >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={counterRef} className="tabular-nums">
      {count}{suffix}
    </span>
  )
}

export default function AnimatedStatsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stats-section-heading', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.stat-item', {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.6,
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
        {/* Header */}
        <div className="text-center mb-16">
          <span className="tag">
            Our Impact
          </span>
          <h2 className="stats-section-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Numbers That Speak
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Atlas Fuel is a trusted partner for businesses across Australia
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
className="stat-item relative bg-cream p-6 text-center border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-base font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-gray-500 text-xs">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Join hundreds of businesses that trust Atlas Fuel for their energy needs
          </p>
          <a 
            href="/contact" 
className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider text-sm hover:bg-primary-dark transition-colors hover:shadow-lg"
          >
            Become a Partner
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
