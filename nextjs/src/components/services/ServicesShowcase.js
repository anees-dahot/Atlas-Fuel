'use client'
import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { cmsTextStyle } from './cmsStyles'

const serviceIcons = {
  mining:       <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20h20"/><path d="M5 20V8l7-5 7 5v12"/><path d="M9 20v-4h6v4"/></svg>,
  marine:       <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20l1.5-1.5C3 17 3 14 5 12l3-3 3 3 5-5 5 5v6H2z"/><path d="M12 3v6"/><path d="M9 6l3-3 3 3"/></svg>,
  agriculture:  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22V8"/><path d="M5 12l7-8 7 8"/><path d="M3 22h18"/><path d="M7 16c0-2.76 2.24-5 5-5s5 2.24 5 5"/></svg>,
  retail:       <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/></svg>,
  transport:    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  distribution: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
}

function getIcon(id) {
  return serviceIcons[id] || serviceIcons.mining
}

const defaultServices = [
  {
    id: 'mining',
    title: 'Mining Fuel Supply',
    description: 'Atlas Fuel is the optimal choice for refueling mining machines due to its unparalleled reliability, efficiency, and safety features.',
    fullDescription: 'With a steadfast commitment to quality, Atlas Fuel ensures uninterrupted operations by delivering fuel on-site precisely when needed, eliminating costly downtime. Our rigorous adherence to industry standards guarantees the highest level of safety, crucial for the demanding environments of mining operations.',
    imageUrl: '/images/what-we-do-mining-civil.webp',
    link: '/services/mining-fuel',
    stats: [
      { value: '24/7', label: 'On-Site Delivery' },
      { value: '99.9%', label: 'Reliability' },
    ],
  },
  {
    id: 'marine',
    title: 'Marine Bunkering',
    description: 'Atlas Fuel stands out as the most effective supplier for bunker refueling due to its commitment to providing high-quality fuel, reliable services, and competitive pricing.',
    fullDescription: 'With years of experience in the industry, Atlas Fuel ensures efficient and timely delivery, even in the most challenging conditions, making it the preferred choice for clients worldwide. Their extensive network and customer-centric approach guarantee that clients receive the best refueling solutions for their vessels.',
    imageUrl: '/images/marine-fuel.jpg',
    link: '/services/marine-fuel',
    stats: [
      { value: 'Global', label: 'Coverage' },
      { value: 'Fast', label: 'Turnaround' },
    ],
  },
  {
    id: 'agriculture',
    title: 'Agriculture Fuel',
    description: 'Atlas Fuel Australia prides itself on delivering the best prices to its agriculture customers, ensuring competitive rates that help farmers manage their operational costs effectively.',
    fullDescription: 'Whether it\'s supplying diesel for machinery or other fuel needs essential to agriculture, Atlas Fuel Australia combines reliability with cost-efficiency. Our dedication to customer satisfaction and understanding of agricultural needs makes us a trusted partner in the industry.',
    imageUrl: '/images/agriculture.jpg',
    link: '/services/agriculture-fuel',
    stats: [
      { value: 'Best', label: 'Prices' },
      { value: 'Flexible', label: 'Delivery' },
    ],
  },
  {
    id: 'retail',
    title: 'Fuel Retailers',
    description: 'If you own a fuel station, Atlas Fuel can provide you with branding and services tailored to enhance your station\'s visibility and appeal.',
    fullDescription: 'Enquiring about Atlas Fuel branding can offer you a range of benefits, from distinctive branding that attracts more customers to operational support that helps streamline your business. Explore how Atlas Fuel branding can elevate your station\'s presence.',
    imageUrl: '/images/fuel-stations.jpg',
    link: '/services/fuel-retailers',
    stats: [
      { value: '200+', label: 'Partners' },
      { value: 'Full', label: 'Support' },
    ],
  },
  {
    id: 'transport',
    title: 'Transportation Fuel',
    description: 'Atlas Fuel Australia stands as a leading provider of competitive fuel prices for the transportation sector.',
    fullDescription: 'Recognizing the critical role that transportation plays in the movement of goods across the country, Atlas Fuel offers cost-effective solutions tailored to the needs of logistics and transport companies. We help businesses reduce operating costs and maximize efficiency.',
    imageUrl: '/images/fuel-logistics.jpg',
    link: '/fuel-transportation',
    stats: [
      { value: 'Cost', label: 'Effective' },
      { value: 'Quality', label: 'Assured' },
    ],
  },
  {
    id: 'distribution',
    title: 'Local Distribution',
    description: 'Atlas Fuel is a trusted partner for over 200 commercial diesel clients and retail businesses across Australia.',
    fullDescription: 'Our extensive network and logistical expertise ensure seamless delivery of high-quality fuel, no matter where our clients are located. With a strong commitment to efficiency, competitive pricing, and customer satisfaction, Atlas Fuel has become a leading choice.',
    imageUrl: '/images/local-fuel-distributors.jpg',
    link: '/services/local-fuel-distributors',
    stats: [
      { value: '200+', label: 'Clients' },
      { value: '24/7', label: 'Support' },
    ],
  },
]

export default function ServicesShowcase({ data = {} }) {
  const displayServices = data.services?.length ? data.services : defaultServices
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible]     = useState(false)

  const sectionRef  = useRef(null)
  const contentRef  = useRef(null)
  const stRef       = useRef(null)
  const currentIdx  = useRef(0)

  // ── Scroll reveal trigger ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // ── Scroll-driven service cycling (pinned) ──
  useLayoutEffect(() => {
    if (!isVisible || displayServices.length === 0) return

    let killed = false

    const init = async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger }  = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (killed || !sectionRef.current) return

      const scrollPerService = window.innerHeight * 0.55
      const totalScroll      = scrollPerService * (displayServices.length - 1)

      stRef.current = ScrollTrigger.create({
        trigger:      sectionRef.current,
        start:        'top top',
        end:          `+=${totalScroll}`,
        pin:          true,
        pinSpacing:   true,
        anticipatePin: 1,
        snap: {
          snapTo:   displayServices.length > 1 ? 1 / (displayServices.length - 1) : 1,
          duration: { min: 0.3, max: 0.5 },
          ease:     'power2.inOut',
          delay:    0.05,
        },
        onUpdate: (self) => {
          const idx = Math.min(
            displayServices.length - 1,
            Math.floor(self.progress * displayServices.length)
          )
          if (idx !== currentIdx.current) {
            currentIdx.current = idx
            setActiveIndex(idx)
          }
        },
      })
    }

    init()

    return () => {
      killed = true
      if (stRef.current) {
        stRef.current.kill()
        stRef.current = null
      }
    }
  }, [isVisible, displayServices.length])

  // ── Animate card on index change ──
  const animateCard = useCallback(async () => {
    if (!contentRef.current) return
    const { default: gsap } = await import('gsap')
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
    )
  }, [])

  useEffect(() => {
    if (isVisible) animateCard()
  }, [activeIndex, isVisible, animateCard])

  // ── Tab click: jump to service + update scroll position ──
  const handleTabClick = useCallback((i) => {
    if (i === activeIndex) return
    currentIdx.current = i
    setActiveIndex(i)

    if (stRef.current && displayServices.length > 1) {
      const progress = i / (displayServices.length - 1)
      const target   = stRef.current.start + (stRef.current.end - stRef.current.start) * progress
      window.scrollTo({ top: target, behavior: 'smooth' })
    }
  }, [activeIndex, displayServices.length])

  const service = displayServices[activeIndex] || displayServices[0] || {}

  return (
    <section ref={sectionRef} className="relative bg-white overflow-hidden" id="services-showcase">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">

        {/* Label */}
        <div className={cn('transition-all duration-700 mb-4', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
          <span className="section-label" style={cmsTextStyle(data, 'subheading')}>
            {data.subheading || 'Tailored fuel solutions for every sector'}
          </span>
        </div>

        {/* Heading */}
        <h2 className={cn(
          'font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-black uppercase tracking-wide mb-12 transition-all duration-700 delay-100',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )} style={cmsTextStyle(data, 'heading')}>
          {data.heading || 'What We Offer'}
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Tabs */}
          <div className={cn('divide-y divide-gray-100 transition-all duration-700 delay-200', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}>
            {displayServices.map((s, i) => (
              <button
                key={s._key || s.id || i}
                onClick={() => handleTabClick(i)}
                className={cn(
                  'group w-full text-left px-5 py-4 transition-all duration-300 flex items-center gap-4',
                  activeIndex === i
                    ? 'bg-primary text-white'
                    : 'bg-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <span className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300',
                  activeIndex === i ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary group-hover:bg-primary/15'
                )}>
                  {getIcon(s.id)}
                </span>
                <span className="font-semibold uppercase tracking-wider text-sm">{s.title}</span>
                {activeIndex === i && (
                  <svg className="w-4 h-4 ml-auto text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                )}
              </button>
            ))}

            {/* Scroll hint */}
            {isVisible && (
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-6 flex items-center gap-2">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
                </svg>
                Scroll to explore
              </p>
            )}
          </div>

          {/* Right: Content card */}
          <div
            ref={contentRef}
            className={cn('transition-all duration-700 delay-300', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}
          >
            <div className="bg-white border border-gray-100 shadow-lg overflow-hidden">
              {/* Image */}
              <div className="relative h-72 overflow-hidden bg-gray-100">
                <img
                  key={service.id}
                  src={service.imageUrl || '/images/hero-trucks.jpg'}
                  alt={service.imageAlt || service.title || ''}
                  className="w-full h-full object-cover"
                />
                {service.stats?.length > 0 && (
                  <div className="absolute bottom-6 left-6 right-6 flex gap-8">
                    {service.stats.map((stat, i) => (
                      <div key={i}>
                        <div className="text-3xl font-bold text-white font-heading leading-none">{stat.value}</div>
                        <div className="text-xs text-white/80 mt-1 uppercase tracking-wide">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="p-8">
                <h3
                  className="font-heading text-2xl font-semibold text-black uppercase tracking-wide mb-3"
                  style={cmsTextStyle(service, 'title')}
                >
                  {service.title}
                </h3>
                <p
                  className="text-gray-500 leading-relaxed text-sm mb-6"
                  style={cmsTextStyle(service, 'description')}
                >
                  {service.fullDescription || service.description}
                </p>
                <Link href={service.link || '/services'} className="read-more group">
                  Learn More
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-200">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2 mt-4">
              {displayServices.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleTabClick(i)}
                  className={cn(
                    'transition-all duration-300 rounded-full',
                    activeIndex === i
                      ? 'w-6 h-1.5 bg-primary'
                      : 'w-1.5 h-1.5 bg-gray-200 hover:bg-gray-400'
                  )}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
