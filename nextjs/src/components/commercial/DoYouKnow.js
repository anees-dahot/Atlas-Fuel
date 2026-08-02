'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function DoYouKnow({ data = {} }) {
  const sectionRef = useRef(null)
  const tagline = data.tagline ?? 'Did You Know?'
  const heading = data.heading ?? 'Our Impact'
  const content = data.content ?? 'Atlas Fuel is a trusted partner for over 200 commercial diesel clients and retail businesses across Australia, providing reliable fuel solutions tailored to their unique needs. Our extensive network and logistical expertise ensure seamless delivery of high-quality fuel, no matter where our clients are located.\n\nWith a strong commitment to efficiency, competitive pricing, and customer satisfaction, Atlas Fuel has become a leading choice for businesses that depend on uninterrupted fuel supply. Whether powering fleets, machinery, or retail outlets, we consistently deliver success by combining superior service with nationwide coverage.'
  const stats = data.stats ?? [
    { value: '200+', label: 'Commercial Clients' },
    { value: '100%', label: 'Australian Owned' },
    { value: '24/7', label: 'Support Available' },
    { value: '15+', label: 'Years Experience' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dyk-header', { opacity: 0, y: 60, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
      })
      gsap.from('.dyk-content', { opacity: 0, y: 80, duration: 1.2, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true }
      })
      gsap.from('.dyk-stat', { opacity: 0, scale: 0.7, y: 60, duration: 1, stagger: 0.2, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.dyk-stats', start: 'top 85%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="dyk-header mb-8">
              <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">{tagline}</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight" style={cmsTextStyle(data, 'heading')}>{heading}</h2>
            </div>
            <div className="dyk-content space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line" style={cmsTextStyle(data, 'content')}>
                {content}
              </p>
            </div>
          </div>

          <div className="dyk-stats grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={stat._key || stat.label || index} className={`dyk-stat p-8 text-center ${index === 2 ? 'bg-primary text-white' : index === 3 ? 'bg-primary-dark text-white' : 'bg-gray-50 border border-gray-100'}`}>
                <div className={`text-5xl md:text-6xl font-heading font-bold mb-2 ${index === 3 ? 'text-white' : ''}`}>{stat.value}</div>
                <div className={`uppercase tracking-wider text-sm ${index === 2 ? 'text-white/80' : index === 3 ? 'text-white/80' : 'text-gray-600'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
