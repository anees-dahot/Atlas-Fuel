'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function StationsStats({ data = {} }) {
  const sectionRef = useRef(null)

  const statValue = data.statValue ?? '35,224'
  const statValueColor = data.statValueColor ?? 'var(--cms-text)'
  const statValueSize = data.statValueSize ?? '64px'
  const statValueBorderEnabled = data.statValueBorderEnabled ?? false
  const statValueBorderColor = data.statValueBorderColor ?? 'var(--cms-text)'
  const statValueBorderWidth = data.statValueBorderWidth ?? '1px'
  const statValueShadowColor = data.statValueShadowColor ?? ''

  const statLabel = data.statLabel ?? 'Happy Customers Every Day'
  const statLabelColor = data.statLabelColor ?? 'var(--cms-text)'
  const statLabelSize = data.statLabelSize ?? '18px'
  const statLabelBorderEnabled = data.statLabelBorderEnabled ?? false
  const statLabelBorderColor = data.statLabelBorderColor ?? 'var(--cms-text)'
  const statLabelBorderWidth = data.statLabelBorderWidth ?? '1px'
  const statLabelShadowColor = data.statLabelShadowColor ?? ''

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stats-number', {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.stats-label', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-cream relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div
          className="stats-number font-bold leading-none mb-4"
          style={{
            color: statValueColor,
            fontSize: statValueSize,
            border: statValueBorderEnabled ? `${statValueBorderWidth} solid ${statValueBorderColor}` : 'none',
            textShadow: statValueShadowColor ? `0 2px 4px ${statValueShadowColor}` : 'none',
          }}
        >
          {statValue}
        </div>
        <div
          className="stats-label uppercase tracking-wide"
          style={{
            color: statLabelColor,
            fontSize: statLabelSize,
            border: statLabelBorderEnabled ? `${statLabelBorderWidth} solid ${statLabelBorderColor}` : 'none',
            textShadow: statLabelShadowColor ? `0 2px 4px ${statLabelShadowColor}` : 'none',
          }}
        >
          {statLabel}
        </div>
      </div>
    </section>
  )
}
