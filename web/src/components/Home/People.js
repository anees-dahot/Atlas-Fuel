import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import { cn } from '../../lib/utils'

export default function People() {
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

  return (
    <section ref={sectionRef} id="people" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={cn(
            'flex items-center gap-4 mb-4 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <span className="text-gray-500 text-sm font-medium uppercase tracking-widest">
            Driven by People, Fueled by Purpose
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div
            className={cn(
              'transform transition-all duration-700 delay-100',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-black mb-6 uppercase tracking-tight">
              Our People
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Atlas Fuel&apos;s team is dedicated to delivering excellence, combining expertise with a deep
              understanding of the mining industry&apos;s needs. Our people prioritize reliability, safety,
              and customer satisfaction, ensuring seamless service at every step. With a commitment to
              innovation and collaboration, our team helps mining operations achieve efficiency and success.
            </p>

            <Link
              to="/#careers"
              className="group inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:gap-4 transition-all duration-300"
            >
              Read More
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Right - Careers Card */}
          <div
            className={cn(
              'transform transition-all duration-700 delay-300',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            )}
          >
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/mining-site.jpg"
                  alt="Atlas Fuel Team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-bold uppercase tracking-wider rounded-full">
                    Careers
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-heading text-black mb-4 uppercase">
                  Work With Us
                </h3>
                <p className="text-gray-500 leading-relaxed mb-6">
                  50+ Talent Rising reflects Atlas Fuel&apos;s commitment to shaping future professionals.
                  Each year, we proudly train 50+ members with the skills and confidence to build
                  lasting careers in Australia&apos;s thriving fuel industry.
                </p>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <svg className="w-6 h-6 text-primary mx-auto mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <div className="text-lg font-heading font-bold text-black">300+</div>
                    <div className="text-xs text-gray-500">Jobs</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <svg className="w-6 h-6 text-primary mx-auto mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <div className="text-lg font-heading font-bold text-black">50+</div>
                    <div className="text-xs text-gray-500">Trainees</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <svg className="w-6 h-6 text-primary mx-auto mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <div className="text-lg font-heading font-bold text-black">5+</div>
                    <div className="text-xs text-gray-500">Seniors</div>
                  </div>
                </div>

                <Link
                  to="/#careers"
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold uppercase tracking-wide rounded-lg hover:bg-primary/90 transition-all duration-300"
                >
                  View Opportunities
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
