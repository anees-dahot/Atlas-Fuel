'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const qualities = [
  {
    title: 'Leadership',
    description: 'The ideal franchisee should be proactive, innovative, and able to lead a motivated team. Strong leadership ensures growth and helps create a positive, high-performing work environment.',
    icon: 'crown'
  },
  {
    title: 'Values and Sustainability',
    description: 'A strong commitment to sustainability and community involvement is key. The franchisee should align with Atlas Fuel Australia\'s values and foster a responsible, positive impact in the local community.',
    icon: 'leaf'
  },
  {
    title: 'Business Expertise',
    description: 'Franchisees must possess solid financial acumen and business management skills. This ensures profitability and smooth operations, while the ability to problem-solve and communicate effectively is essential for success.',
    icon: 'briefcase'
  }
]

const icons = {
  crown: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>,
  leaf: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 22c1-1 3-5 8-5 5 0 8 4 8 4M2 22h20M12 2c0 0-8 5-8 12 0 5 5 8 5 8s-3-3-3-8c0-4 6-12 6-12s6 8 6 12c0 5-3 8-3 8s5-3 5-8c0-7-8-12-8-12z"/></svg>,
  briefcase: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
}

export default function BeYourOwnBoss() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.byob-header', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      })
      gsap.from('.byob-card', { opacity: 0, y: 50, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.byob-grid', start: 'top 80%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="byob-header text-center mb-16">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">The Opportunity</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight">Be Your Own Boss</h2>
        </div>

        <div className="byob-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {qualities.map((item, index) => (
            <div key={index} className="byob-card bg-white p-8 border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mb-6 text-gray-700 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {icons[item.icon]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
