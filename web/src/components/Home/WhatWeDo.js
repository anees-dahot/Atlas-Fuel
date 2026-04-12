import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import { cn } from '../../lib/utils'

const sectors = [
  { id: 'stations', title: 'Fuel Stations', description: 'Atlas Fuel stations deliver more than fuel — we power communities with convenience, service, and reliability.', fullDescription: 'Our fuel stations are designed for everyday Australians, offering world-class facilities, competitive pricing, and exceptional customer service. Each location features modern amenities, clean restrooms, and our signature Krunch & Munch Cafe.', image: '/images/fuel-depot.jpg', stats: [{ label: 'Locations', value: '15+' }, { label: 'Daily Customers', value: '5000+' }], icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
  { id: 'mining', title: 'Mining & Civil', description: 'From mining to marine, agriculture to civil works, Atlas Fuel proudly keeps every sector moving forward.', fullDescription: 'We provide comprehensive fuel solutions to mining operations, civil construction projects, and heavy industry across Australia.', image: '/images/mining-site.jpg', stats: [{ label: 'Mining Clients', value: '50+' }, { label: 'Litres Delivered', value: '100M+' }], icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20h20" /><path d="M5 20V8l7-5 7 5v12" /><path d="M9 20v-4h6v4" /></svg> },
  { id: 'logistics', title: 'Fuel Logistics', description: 'With a modern fleet and precision planning, Atlas Fuel ensures your fuel arrives safely, on time, every time.', fullDescription: 'Our state-of-the-art logistics network features GPS-tracked vehicles, real-time delivery updates, and 24/7 emergency response capabilities.', image: '/images/hero-trucks.jpg', stats: [{ label: 'Fleet Size', value: '30+' }, { label: 'On-Time Rate', value: '99.5%' }], icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg> },
  { id: 'onsite', title: 'On-Site Diesel', description: 'Atlas Fuel brings the pump to you — efficient onsite diesel solutions that keep your operations running nonstop.', fullDescription: 'Our mobile refueling units and on-site tank installations eliminate downtime and improve operational efficiency.', image: '/images/fuel-depot.jpg', stats: [{ label: 'Sites Serviced', value: '200+' }, { label: 'Uptime', value: '24/7' }], icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17" /><path d="M3 22h12" /></svg> },
  { id: 'marine', title: 'Marine Bunkering', description: 'Marine bunkering solutions ensuring your vessels stay fueled and operational across Australian waters.', fullDescription: 'We provide comprehensive marine fuel services including bunker fuel delivery, lubricants, and vessel refueling at major Australian ports.', image: '/images/marine-fuel.jpg', stats: [{ label: 'Ports Covered', value: '12+' }, { label: 'Vessels Served', value: '500+' }], icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20l1.5-1.5C3 17 3 14 5 12l3-3 3 3 5-5 5 5v6H2z" /><path d="M12 3v6" /><path d="M9 6l3-3 3 3" /></svg> },
  { id: 'agriculture', title: 'Agriculture', description: 'Farm fuel delivery keeping Australian agriculture running efficiently during critical seasons.', fullDescription: 'We understand the unique demands of Australian agriculture. Our flexible delivery schedules, bulk storage solutions, and competitive pricing help farmers maximize efficiency.', image: '/images/agriculture.jpg', stats: [{ label: 'Farms Supplied', value: '300+' }, { label: 'Coverage', value: 'WA Wide' }], icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22V8" /><path d="M5 12l7-8 7 8" /><path d="M3 22h18" /><path d="M7 16c0-2.76 2.24-5 5-5s5 2.24 5 5" /></svg> },
  { id: 'pricing', title: 'Fuel Prices', description: 'Atlas Fuel delivers competitive fuel prices without compromising quality, keeping you powered for less.', fullDescription: 'Our direct supply agreements and efficient distribution network allow us to offer some of the most competitive fuel prices in Australia.', image: '/images/hero-trucks.jpg', stats: [{ label: 'Price Match', value: 'Guaranteed' }, { label: 'Savings', value: 'Up to 15%' }], icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg> },
  { id: 'community', title: 'Community', description: 'Atlas Fuel stands with the community, driving support, connection, and progress wherever we operate.', fullDescription: 'We believe in giving back to the communities we serve. From sponsoring local sports teams to supporting charitable initiatives.', image: '/images/mining-site.jpg', stats: [{ label: 'Jobs Created', value: '300+' }, { label: 'Community Programs', value: '25+' }], icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg> },
]

export default function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const tabRefs = useRef([])
  const timerRef = useRef(null)

  // IntersectionObserver for initial reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Scroll-based tab activation (no pinning, just natural scroll)
  useEffect(() => {
    if (!isInView) return
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = window.innerHeight * 0.3 // trigger when 30% from top
      const scrollProgress = Math.max(0, Math.min(1, (sectionTop - rect.top) / (rect.height - sectionTop)))
      const idx = Math.min(sectors.length - 1, Math.floor(scrollProgress * sectors.length))
      setActiveIndex(idx)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isInView])

  // GSAP content transition on active change
  useEffect(() => {
    if (!contentRef.current || !isInView) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      const { gsap } = await import('gsap')
      const card = contentRef.current
      gsap.to(card, {
        opacity: 0, y: 15, duration: 0.15, ease: 'power2.in',
        onComplete: () => {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
        }
      })
    }, 50)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeIndex, isInView])

  const sector = sectors[activeIndex]

  return (
    <section ref={sectionRef} className="relative bg-gray-50 overflow-hidden" id="sectors">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        {/* Tag */}
        <div className={cn('transition-all duration-700 mb-10', isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}>
          <span className="text-gray-500 text-sm font-medium uppercase tracking-widest">Sectors We Cover</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Heading + Tabs */}
          <div>
            <h2
              className={cn(
                'font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight mb-10 transition-all duration-700 delay-100',
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
            >
              What We Do
            </h2>

            {/* Tabs */}
            <div className="space-y-1">
              {sectors.map((s, i) => (
                <button
                  key={s.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    'group w-full flex items-center justify-between px-6 py-4 rounded-lg text-left transition-all duration-500',
                    activeIndex === i
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-white hover:bg-primary/5 text-black'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300', activeIndex === i ? 'bg-white/20' : 'bg-primary/10')}>
                      <span className={cn('transition-colors duration-300', activeIndex === i ? 'text-white' : 'text-primary')}>{s.icon}</span>
                    </div>
                    <span className="font-semibold">{s.title}</span>
                  </div>
                  <svg className={cn('w-5 h-5 transition-all duration-300', activeIndex === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Content Card */}
          <div ref={contentRef} className="lg:sticky lg:top-28">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/5">
              {/* Image */}
              <div className="relative h-72 md:h-80 overflow-hidden">
                <img src={sector.image} alt={sector.title} className="w-full h-full object-cover" key={sector.id} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Stats */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-8">
                  {sector.stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-3xl md:text-4xl font-bold text-white font-heading">{stat.value}</div>
                      <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-black uppercase font-heading mb-4">{sector.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-6">{sector.fullDescription}</p>
                <Link to={`#${sector.id}`} className="read-more group">
                  Learn More
                  <svg className="group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -z-10 -top-8 -right-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
