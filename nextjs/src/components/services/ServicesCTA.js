'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function ServicesCTA({data = {}}) {
  const sectionRef = useRef(null)
  const heading = data.heading ?? 'Ready to Fuel Your Business?'
  const text = data.text ?? 'Join hundreds of businesses across Australia that trust Atlas Fuel for reliable, cost-effective fuel solutions. Get in touch today for a customized quote.'
  const primaryText = data.primaryText ?? 'Get a Free Quote'
  const primaryLink = data.primaryLink ?? '/contact'
  const phoneText = data.phoneText ?? 'Call +61 8 6377 7644'
  const phoneLink = data.phoneLink ?? 'tel:+61863777644'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.cta-buttons', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out',
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
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <CmsImage
          value={data.backgroundImage}
          fallbackSrc="/images/hero-trucks.jpg"
          alt={data.backgroundImageAlt ?? ''}
          width={1920}
          height={700}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="cta-content">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {heading}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            {text}
          </p>
        </div>

        <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryLink}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold hover:bg-gray-100 transition-all duration-300"
          >
            {primaryText}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link
            href={phoneLink}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6.87-6.87 19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.904.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            {phoneText}
          </Link>
        </div>
      </div>

    </section>
  )
}
