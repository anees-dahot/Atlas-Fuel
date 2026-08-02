'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function WhatWeOffer({ data = {} }) {
  const sectionRef = useRef(null)
  const tagline = data.tagline ?? 'Our Promise'
  const heading = data.heading ?? 'What We Offer?'
  const content = data.content ?? 'Atlas Fuel Australia stands out for its unwavering commitment to reliability, ensuring your business always has access to fuel when and where you need it most.'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.wo-content', { opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="wo-content max-w-4xl mx-auto text-center">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">{tagline}</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-tight text-gray-900 mb-8" style={cmsTextStyle(data, 'heading')}>{heading}</h2>
          <p className="text-2xl md:text-3xl text-gray-600 leading-relaxed font-light" style={cmsTextStyle(data, 'content')}>
            {content}
          </p>
        </div>
      </div>
    </section>
  )
}
