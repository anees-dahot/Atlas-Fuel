'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const featureIcons = {
  remote: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  bulk: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  onsite: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  emergency: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
}

const featureImages = {
  remote: '/images/hero-truck.jpg',
  bulk: '/images/hero-truck.jpg',
  onsite: '/images/fuel-stations.jpg',
  emergency: '/images/hero-truck.jpg',
}

export default function ServiceFeatures({ data = {} }) {
  const sectionRef = useRef(null)

  const title = data.title || 'One Stop Shop for Miners'
  const subtitle = data.subtitle || 'Comprehensive fuel solutions tailored for mining operations'

  // Dynamic styling props
  const titleColor = data.titleColor || '#111827'
  const titleSize = data.titleSize || '48px'
  const titleBorderEnabled = data.titleBorderEnabled || false
  const titleBorderColor = data.titleBorderColor || '#111827'
  const titleBorderWidth = data.titleBorderWidth || '1px'
  const titleShadowColor = data.titleShadowColor || 'rgba(0,0,0,0.3)'

  const subtitleColor = data.subtitleColor || '#4b5563'
  const subtitleSize = data.subtitleSize || '14px'
  const subtitleBorderEnabled = data.subtitleBorderEnabled || false
  const subtitleBorderColor = data.subtitleBorderColor || '#4b5563'
  const subtitleBorderWidth = data.subtitleBorderWidth || '1px'
  const subtitleShadowColor = data.subtitleShadowColor || 'rgba(0,0,0,0.3)'

  const features = data.features || [
    {
      icon: 'remote',
      title: 'Remote Deliveries',
      description: 'Atlas specializes in delivering fuel to the most isolated mining sites in Australia, ensuring operations stay powered no matter the distance. Our advanced logistics network guarantees timely and reliable supply even in the harshest terrains.',
    },
    {
      icon: 'bulk',
      title: 'Bulk Fueling with Road Trains',
      description: 'We provide high-volume bulk fueling solutions tailored to meet the heavy demands of mining operations. With precision scheduling and dependable service, Atlas Fuel keeps your fleets and machinery running at full capacity.',
    },
    {
      icon: 'onsite',
      title: 'On-Site Refueling',
      description: 'Our on-site refueling services maximize operational uptime by eliminating the need for equipment downtime and off-site fueling trips. Atlas Fuel brings the energy directly to your machines, boosting productivity and reducing delays.',
    },
    {
      icon: 'emergency',
      title: 'Emergency Support',
      description: 'When emergencies strike, Atlas Fuel responds with rapid, reliable, and efficient fuel delivery to keep your mining operations secure, productive, and operational. Our 24/7 expert support teams are ready to mobilize when you need us most.',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.features-header', {
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

      gsap.from('.feature-card', {
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 features-header">
          <div
            className="tag"
            style={{
              color: subtitleColor,
              fontSize: subtitleSize,
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {subtitle}
          </div>
          <h2
            className="font-heading font-bold uppercase tracking-wide leading-tight"
            style={{
              color: titleColor,
              fontSize: titleSize,
              border: titleBorderEnabled ? `${titleBorderWidth} solid ${titleBorderColor}` : 'none',
              textShadow: titleShadowColor ? `0 2px 4px ${titleShadowColor}` : 'none',
            }}
          >
            {title}
          </h2>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
className="feature-card group relative bg-white overflow-hidden border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Image background with overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={featureImages[feature.icon] || '/images/hero-truck.jpg'}
                  alt={feature.title}
                  className="w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                />
              </div>
              
              <div className="relative z-10 p-8">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 flex items-center justify-center">
                    <div className="w-8 h-8 text-primary">
                      {featureIcons[feature.icon]}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                {/* Bottom link indicator */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                  </span>
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
