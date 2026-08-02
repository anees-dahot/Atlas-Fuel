'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function DistributorService({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading ?? 'Servicing Local distributors across Australia'
  const content = data.content ?? `Atlas Fuel is reshaping how local distributors access and deliver fuel by combining national reach with local focus. Through a smart supply network and strong industry alliances, we empower independent distributors with seamless logistics, real-time support, and scalable fuel solutions. From coast to outback, we're not just delivering fuel — we're building the backbone of Australia's local energy economy.`

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.distributor-service-content', {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="distributor-service-content text-center">
          <h2
            className="font-bold mb-8 leading-tight"
            style={cmsTextStyle(data, 'heading', '#111827', '48px')}
          >
            {heading}
          </h2>
          <p
            className="leading-relaxed max-w-4xl mx-auto"
            style={cmsTextStyle(data, 'content', '#4b5563', '20px')}
          >
            {content}
          </p>
        </div>
      </div>
    </section>
  )
}
