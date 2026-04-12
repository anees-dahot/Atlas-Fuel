import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import { cn } from '../../lib/utils'

const quickLinks = [
  { name: 'New Bulk Enquiry', href: '/#contact', icon: 'fuel' },
  { name: 'Call Head Office', href: 'tel:+61863777644', icon: 'phone' },
  { name: 'Fuel Transportation', href: '/#transport', icon: 'truck' },
  { name: 'Atlas Fuel Pricing', href: '/#pricing', icon: 'dollar' },
  { name: 'Fuel Station Enquiry', href: '/#stores', icon: 'map' },
  { name: 'Work With Us', href: '/#careers', icon: 'briefcase' },
]

const icons = {
  fuel: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17" /><path d="M3 22h12" /><path d="M15 12l3-3 3 3-3 3" /></svg>,
  phone: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6.87-6.87 19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.904.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
  truck: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  dollar: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>,
  map: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  briefcase: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>,
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const headingRef = useRef(null)

  useEffect(() => { setIsVisible(true) }, [])

  useEffect(() => {
    const interval = setInterval(() => setActiveSlide(p => (p + 1) % quickLinks.length), 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const animate = async () => {
      const { gsap } = await import('gsap')
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      const lines = headingRef.current?.querySelectorAll('.hero-line') || []
      lines.forEach((line, i) => {
        const inner = line.querySelector('.hero-line-inner')
        if (inner) {
          tl.fromTo(inner,
            { y: '105%', opacity: 0 },
            { y: '0%', opacity: 1, duration: i === 1 ? 1.4 : 1.2 },
            0.3 + i * 0.2
          )
        }
      })

      const desc = headingRef.current?.querySelector('.hero-desc')
      const btns = headingRef.current?.querySelector('.hero-btns')
      const links = headingRef.current?.querySelector('.hero-links')
      const eyebrow = headingRef.current?.querySelector('.hero-eyebrow')

      if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8 }, 0.2)
      if (desc) tl.fromTo(desc, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 1.0)
      if (btns) tl.fromTo(btns, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 1.2)
      if (links) tl.fromTo(links, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 1.4)
    }
    const t = setTimeout(animate, 200)
    return () => clearTimeout(t)
  }, [isVisible])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG Image */}
      <div className="absolute inset-0">
        <img src="/images/hero-trucks.jpg" alt="Atlas Fuel" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${2 + Math.random() * 2}s` }}
          />
        ))}
      </div>

      {/* Content */}
      <div ref={headingRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-64">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="hero-eyebrow flex items-center gap-4 mb-8">
            <div className="relative h-0.5 w-16 bg-primary overflow-hidden">
              <div className="absolute inset-0 animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }} />
            </div>
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em]">On-Site Fuel Solutions</span>
          </div>

          {/* Heading */}
          <h1 className="mt-4 space-y-1 md:space-y-2 font-heading">
            {['Powering', "Australia's", 'Future'].map((word, i) => (
              <div key={word} className="hero-line overflow-hidden">
                <span className={cn(
                  'hero-line-inner block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] uppercase tracking-tight',
                  i === 1 ? 'text-primary' : 'text-white'
                )}>
                  {word}
                </span>
              </div>
            ))}
          </h1>

          {/* Desc */}
          <p className="hero-desc mt-6 md:mt-8 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed">
            Atlas Fuel Australia delivers reliable, efficient fuel solutions nationwide.
            We cater to businesses of all sizes, ensuring quality and sustainability.
          </p>

          {/* Buttons */}
          <div className="hero-btns mt-8 md:mt-10 flex flex-wrap gap-4">
            <Link to="/#contact" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105">
              <span className="relative z-10">Contact Fuel Station</span>
              <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Link>
            <a href="mailto:info@atlasfuel.com.au" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold uppercase tracking-wide rounded-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" /></svg>
              New Bulk Fuel Enquiry
            </a>
          </div>

          {/* Video */}
          <div className="hero-links mt-8">
            <button className="group flex items-center gap-4 text-white/80 hover:text-white transition-colors">
              <span className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                <span className="absolute inset-0 rounded-full border-2 border-white/30" style={{ animation: 'pulse-ring 1.5s infinite' }} />
              </span>
              <div className="text-left">
                <span className="block text-sm font-semibold uppercase tracking-wider">Watch our video</span>
                <span className="block text-xs text-white/60">Learn about Atlas Fuel Australia</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-6 pb-6 pt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickLinks.map((link, i) => (
              <a key={link.name} href={link.href}
                className={cn(
                  'group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                  activeSlide === i
                    ? 'bg-primary text-white'
                    : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:border-white text-white hover:text-black'
                )}
              >
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300', activeSlide === i ? 'bg-white/20' : 'bg-primary/20 group-hover:bg-primary')}>
                  <span className={cn('transition-colors', activeSlide === i ? 'text-white' : 'text-primary group-hover:text-white')}>{icons[link.icon]}</span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide leading-tight">{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Scroll bar */}
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-4 h-4 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
                <span className="text-sm font-medium">Sectors We Cover</span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                {[{ v: '300+', l: 'Jobs Connected' }, { v: '50+', l: 'Talent Rising' }, { v: '100%', l: 'Australian Owned' }].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-primary rounded-full" />
                    <div>
                      <div className="text-lg font-bold font-heading">{s.v}</div>
                      <div className="text-xs text-gray-500">{s.l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
