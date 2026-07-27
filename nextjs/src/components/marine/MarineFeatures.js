'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const serviceIcons = {
  vessel: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 20l1.5-1.5C3 17 3 14 5 12l3-3 3 3 5-5 5 5v6H2z"/>
      <path d="M12 3v6"/>
      <path d="M9 6l3-3 3 3"/>
    </svg>
  ),
  port: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      <path d="M12 2v20"/>
    </svg>
  ),
  fuel: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 11v6"/>
      <path d="M6 11v6"/>
      <path d="M22 16a4 4 0 01-4 4h-1v-4H7v4H6a4 4 0 01-4-4V8a2 2 0 012-2h14a2 2 0 012 2v8z"/>
      <path d="M6 6V4a2 2 0 012-2h8a2 2 0 012 2v2"/>
    </svg>
  ),
  fleet: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 002 12v4c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <circle cx="17" cy="17" r="2"/>
    </svg>
  ),
}

const defaultFeatures = [
  {
    id: 'vessel',
    title: 'Vessel Support',
    description: 'Atlas Fuel specializes in delivering premium marine fuel directly to vessels of all sizes, ensuring smooth operations at sea and in port. Our experienced team understands the critical timing and precision required in the marine industry.',
    icon: 'vessel',
    ctaText: 'Enquire Now',
    ctaLink: '/contact',
  },
  {
    id: 'port',
    title: 'Port Services',
    description: 'We provide comprehensive fueling solutions across key Australian ports, designed to streamline your vessel turnaround times. Atlas Fuel\'s efficient port services minimize downtime and maximize operational efficiency.',
    icon: 'port',
    ctaText: 'Enquire Now',
    ctaLink: '/contact',
  },
  {
    id: 'diesel',
    title: 'Diesel / Sulphur',
    description: 'We offer a range of premium marine diesel and low-sulphur fuel options to meet evolving environmental standards. Our fuels consistently meet strict IMO regulations, ensuring compliance without compromising power.',
    icon: 'fuel',
    ctaText: 'Enquire Now',
    ctaLink: '/contact',
  },
  {
    id: 'fleet',
    title: 'Fueling Fleet',
    description: 'Our fueling solutions are built to keep your marine fleet operating smoothly without delays. We tailor flexible supply schedules and fuel quantities to fit your fleet\'s exact requirements.',
    icon: 'fleet',
    ctaText: 'Enquire Now',
    ctaLink: '/contact',
  },
]

export default function MarineFeatures({ data = {} }) {
  const sectionRef = useRef(null)
  const features = data.features || defaultFeatures

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.marine-features-label', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.marine-features-heading', {
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

      gsap.from('.marine-feature-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
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
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="marine-features-label inline-block text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4">
            What We Offer
          </span>
          <h2 className="marine-features-heading text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 uppercase tracking-tight">
            Marine Services
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id || index}
              className="marine-feature-card group bg-cream border border-gray-100 p-8 lg:p-10 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {serviceIcons[feature.icon] || serviceIcons.vessel}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-heading font-bold text-gray-900 uppercase tracking-wide mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <a
                    href={feature.ctaLink || '/contact'}
                    className="inline-flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm hover:gap-3 transition-all duration-300"
                  >
                    {feature.ctaText || 'Enquire Now'}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
