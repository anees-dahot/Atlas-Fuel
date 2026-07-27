'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const vmgItems = [
  {
    title: 'Our Vision',
    content: 'To emerge as a leading force in the fuel industry by delivering innovative and practical solutions. Introducing advanced fuel products efficiently and sustainably.',
    icon: 'eye'
  },
  {
    title: 'Our Mission',
    content: 'Redefining the fuel industry with excellence and innovation. We provide high-quality products while meeting evolving customer needs reliably.',
    icon: 'target'
  },
  {
    title: 'Our Goals',
    content: 'Turning challenges into opportunities through creativity, precision, and focus. Empowering emerging players and expanding reliable service coverage.',
    icon: 'flag'
  }
]

const icons = {
  eye: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  target: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  flag: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
}

export default function VisionMissionGoals() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.vmg-header', { opacity: 0, y: 60, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
      })
      gsap.from('.vmg-card', { opacity: 0, scale: 0.8, y: 80, duration: 1, stagger: 0.2, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.vmg-grid', start: 'top 85%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="vmg-header text-center mb-16">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">Our Direction</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-gray-900">We're Turning Passion Into Profits For Our Franchisees</h2>
        </div>

        <div className="vmg-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {vmgItems.map((item, index) => (
            <div key={index} className="vmg-card bg-white p-8 border border-sand hover:border-primary/40 transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {icons[item.icon]}
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wide text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
