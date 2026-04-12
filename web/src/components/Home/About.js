import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import { cn } from '../../lib/utils'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const points = [
    '100% Australian owned and operated',
    'Nationwide fuel delivery network',
    'World-class service stations',
    'Commitment to safety and sustainability',
  ]

  return (
    <section ref={sectionRef} id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={cn(
            'text-center mb-16 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <span className="text-primary text-sm font-bold uppercase tracking-[0.3em]">
            Unrivalled. Unmatched. Unstoppable.
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div
            className={cn(
              'transform transition-all duration-1000',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-black mb-6 leading-tight uppercase tracking-tight">
              About Us
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              <strong className="text-black">Unrivalled. Unmatched. Unstoppable.</strong>{' '}
              These three words capture the spirit of Atlas Fuel and the people who drive it
              forward every day. We stand unrivalled in our commitment to quality, unmatched
              in our ability to deliver reliable fuel solutions nationwide, and unstoppable
              in our pursuit of growth, innovation, and excellence.
            </p>

            <p className="text-gray-500 leading-relaxed mb-8">
              From our performance fleet to our world-class service stations, every step we
              take reflects a relentless drive to set new standards in the fuel industry.
              For our customers, our partners, and our communities, Atlas Fuel is more than
              a brand — it&apos;s a promise of strength, progress, and a future powered without limits.
            </p>

            <div className="space-y-3 mb-8">
              {points.map((point, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-center gap-3 transition-all duration-500',
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  )}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <svg className="w-5 h-5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="text-black">{point}</span>
                </div>
              ))}
            </div>

            <Link
              to="/#story"
              className="group inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:gap-4 transition-all"
            >
              Read More
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Image Grid */}
          <div
            className={cn(
              'relative transform transition-all duration-1000 delay-300',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            )}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/fuel-depot.jpg"
                    alt="Atlas Fuel depot"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="bg-primary text-white p-6 rounded-2xl">
                  <div className="text-4xl font-heading font-bold mb-1">2015</div>
                  <div className="text-sm text-white/80">Established</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gray-900 text-white p-6 rounded-2xl">
                  <div className="text-4xl font-heading font-bold mb-1">100M+</div>
                  <div className="text-sm text-white/70">Litres Delivered</div>
                </div>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/images/hero-trucks.jpg"
                    alt="Atlas Fuel Fleet"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
