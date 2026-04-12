import React, { useEffect, useRef, useState } from 'react'
import { cn } from '../../lib/utils'

const certifications = [
  {
    name: 'WAHVA',
    title: 'Western Australian Heavy Vehicle',
    description:
      'Accreditation ensuring every vehicle meets strict roadworthiness and safety benchmarks.',
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M5 17h14M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-3h8l2 3h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0" />
      </svg>
    ),
  },
  {
    name: 'ISO 9001',
    title: 'Quality Management Systems',
    description: 'International standard for quality management ensuring consistent service delivery.',
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    name: 'ISO 14001',
    title: 'Environmental Management Systems',
    description: 'Environmental management certification demonstrating our commitment to sustainability.',
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" />
      </svg>
    ),
  },
  {
    name: 'ISO 45001',
    title: 'Occupational Health & Safety',
    description:
      'Workplace health and safety management ensuring employee and customer wellbeing.',
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M3 22V9a9 9 0 0 1 18 0v13" />
        <path d="M9 22h6" />
        <path d="M12 2v4" />
        <path d="M8 6h8" />
      </svg>
    ),
  },
]

function ShieldIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

export default function Certifications() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gray-50"
      id="certifications"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div>
            <div
              className={cn(
                'flex items-center gap-4 mb-6 transition-all duration-700',
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              )}
            >
              <div className="w-12 h-0.5 bg-primary" />
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                Our Certifications
              </span>
            </div>

            <h2
              className={cn(
                'text-3xl md:text-4xl lg:text-5xl font-bold text-black uppercase tracking-tight mb-6 transition-all duration-700 delay-100',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              Certified for Excellence, Driven by Compliance
            </h2>

            <p
              className={cn(
                'text-lg text-gray-600 leading-relaxed mb-8 transition-all duration-700 delay-200',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              At Atlas Fuel, compliance is more than a standard — it&apos;s our foundation for trust
              and performance. Every operation, vehicle, and site meets rigorous national and
              international certifications. We don&apos;t just follow the rules — we set the benchmark
              for safety, quality, and reliability.
            </p>

            {/* Trust badge */}
            <div
              className={cn(
                'inline-flex items-center gap-3 px-6 py-3 bg-amber-50 rounded-xl transition-all duration-700 delay-300',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              <ShieldIcon className="w-8 h-8 text-primary" />
              <div>
                <div className="font-bold text-black">100% Compliant</div>
                <div className="text-sm text-gray-600">All operations certified</div>
              </div>
            </div>
          </div>

          {/* Right - Certification Cards */}
          <div className="grid grid-cols-2 gap-4">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon
              return (
                <div
                  key={cert.name}
                  className={cn(
                    'bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 group',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>

                  {/* Name badge */}
                  <div className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3">
                    {cert.name}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-black mb-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
