'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { cmsTextStyle } from './cmsStyles'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const featureIcons = {
  bulk: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  remote: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  emergency: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  onsite: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
}

export default function OnsiteFeatures({ data = {} }) {
  const sectionRef = useRef(null)

  const title = data.title ?? 'Onsite Diesel Solutions'
  const subtitle = data.subtitle ?? 'Four Ways We Deliver Excellence'

  const features = Array.isArray(data.features) ? data.features : [
    {
      icon: 'bulk',
      title: 'Fast Delivery',
      description: 'Atlas Fuel delivers diesel swiftly to your site, minimizing costly downtime and keeping your operations running strong.',
    },
    {
      icon: 'remote',
      title: 'Reliable Supply',
      description: 'We understand, consistency is key, and Atlas Fuel ensures your site always has the diesel it needs without delay.',
    },
    {
      icon: 'emergency',
      title: '24/7 Support',
      description: 'When you need us, Atlas Fuel is just a call away, delivering service and quality fuel around the clock.',
    },
    {
      icon: 'onsite',
      title: 'Custom Request',
      description: 'We understand, every site is different, and Atlas Fuel tailors diesel delivery plans to match specific operational needs.',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.onsite-features-header', {
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

      gsap.from('.onsite-feature-card', {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.onsite-features-grid',
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 onsite-features-header">
          <div
            className="tag mb-4"
            style={cmsTextStyle(data, 'subtitle', '#4b5563', '14px')}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {subtitle}
          </div>
          <h2
            className="font-bold"
            style={cmsTextStyle(data, 'title', '#111827', '48px')}
          >
            {title}
          </h2>
        </div>

        <div className="onsite-features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature._key || index}
              className="onsite-feature-card group relative bg-white overflow-hidden border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 p-8"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-16 h-16 bg-primary/10 flex items-center justify-center">
                  <div className="w-8 h-8 text-primary">
                    {featureIcons[feature.icon] ?? featureIcons.bulk}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors" style={cmsTextStyle(feature, 'title', '#111827', '20px')}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4" style={cmsTextStyle(feature, 'description', '#4b5563', '14px')}>
                    {feature.description}
                  </p>
                  <Link 
                    href={feature.ctaLink ?? data.cardCtaLink ?? '/contact'}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                  >
                    {feature.ctaText ?? data.cardCtaText ?? 'Enquire Now'}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
