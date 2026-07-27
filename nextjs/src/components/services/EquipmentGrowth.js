'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function EquipmentGrowth({ data = {} }) {
  const sectionRef = useRef(null)

  const content = data.content || `Your equipment is the engine of your growth—and Atlas Fuel is the energy behind your success. From planting to harvest, our reliable fuel solutions help you scale up production and embrace new opportunities. With Atlas, you can focus on cultivating your future, confident that your energy needs are in expert hands.`

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.equipment-content', {
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
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="equipment-content text-center">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            {content}
          </p>
        </div>
      </div>
    </section>
  )
}
