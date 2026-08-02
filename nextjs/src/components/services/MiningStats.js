'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 50, suffix: 'M+', prefix: '', label: 'Litres Delivered to Mines', icon: 'drop' },
  { value: 99, suffix: '.9%', prefix: '', label: 'On-Time Delivery Rate', icon: 'clock' },
  { value: 24, suffix: '/7', prefix: '', label: 'Emergency Support', icon: 'support' },
  { value: 15, suffix: '+', prefix: '', label: 'Years Mining Experience', icon: 'mine' },
]

const iconSvgs = {
  drop: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  support: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>,
  mine: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 20h20" /><path d="M5 20V8l7-5 7 5v12" /><path d="M9 20v-4h6v4" /></svg>,
}

function AnimatedCounter({ value, suffix, prefix, duration = 2 }) {
  const numericValue = Number(value)
  const isNumeric = Number.isFinite(numericValue)
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (!isNumeric) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const end = numericValue
          const increment = end / (duration * 60)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [numericValue, duration, isNumeric])

  return (
    <span ref={ref}>
      {isNumeric ? `${prefix || ''}${count}${suffix || ''}` : value}
    </span>
  )
}

export default function MiningStats({ data = {} }) {
  const sectionRef = useRef(null)
  const statsData = Array.isArray(data.stats) ? data.stats : stats
  const sectionTag = data.sectionTag ?? 'Proven Track Record'
  const heading = data.displayHeading ?? data.heading ?? 'Trusted by Mining Operations Nationwide'
  const description = data.description ?? 'Our numbers speak for themselves. We have been powering Australia\'s mining industry with reliable fuel solutions.'
  const footerText = data.footerText ?? ''
  const ctaText = data.ctaText ?? ''
  const ctaLink = data.ctaLink ?? ''

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stats-header', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.stat-card', {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.12,
        ease: 'back.out(1.2)',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-cream relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 stats-header">
          <span className="tag">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {sectionTag}
          </span>
          <h2 className="sec-title mb-4" style={cmsTextStyle(data, 'heading', '#111827', '48px')}>
            {heading}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={cmsTextStyle(data, 'description', '#4b5563', '20px')}>
            {description}
          </p>
        </div>

        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <div
              key={stat._key || index}
              className="stat-card bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 text-center group"
            >
              <div className="w-14 h-14 bg-gray-100 flex items-center justify-center">
                <div className="w-7 h-7 text-primary">
                  {iconSvgs[stat.icon] || iconSvgs.drop}
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2" style={cmsTextStyle(stat, 'value', '#111827', '48px')}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="text-gray-500" style={cmsTextStyle(stat, 'label', '#6b7280', '16px')}>{stat.label}</div>
            </div>
          ))}
        </div>
        {(footerText || (ctaText && ctaLink)) && (
          <div className="mt-10 flex flex-col items-center justify-center gap-5 text-center sm:flex-row">
            {footerText && <p className="text-gray-600">{footerText}</p>}
            {ctaText && ctaLink && (
              <Link href={ctaLink} className="btn-primary">
                {ctaText}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
