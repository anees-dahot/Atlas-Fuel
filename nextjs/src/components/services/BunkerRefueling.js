'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function BunkerRefueling({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Bunker Refueling'
  const content = data.content || 'Atlas Fuel stands out as the most effective supplier for bunker refueling due to its commitment to providing high-quality fuel, reliable services, and competitive pricing. With years of experience in the industry, Atlas Fuel ensures efficient and timely delivery, even in the most challenging conditions, making it the preferred choice for clients worldwide. Their extensive network and customer-centric approach guarantee that clients receive the best refueling solutions for their vessels. For international clients, Atlas Fuel offers seamless communication through WhatsApp or can be reached via email at info@atlasfuel.com.au to discuss their specific needs and receive prompt assistance.'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bunker-heading', {
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

      gsap.from('.bunker-content', {
        opacity: 0,
        y: 40,
        duration: 0.9,
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
    <section ref={sectionRef} className="py-28 lg:py-36 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="bunker-heading text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          {heading}
        </h2>
        <p className="bunker-content text-xl text-gray-600 leading-relaxed">
          {content}
        </p>
      </div>
    </section>
  )
}
