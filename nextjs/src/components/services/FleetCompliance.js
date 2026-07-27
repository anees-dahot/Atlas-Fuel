'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const fleetFeatures = [
  { icon: 'gps', title: 'Real-Time GPS & Cloud Tracking', description: 'Complete visibility of your fuel delivery with live tracking' },
  { icon: 'route', title: 'Automated Route Optimization', description: 'AI-powered routing for maximum efficiency' },
  { icon: 'monitor', title: '24/7 Control Room Monitoring', description: 'Dedicated team watching every delivery' },
  { icon: 'training', title: 'Onsite & In-Cab Driver Training', description: 'Certified professionals handling your fuel' },
  { icon: 'fatigue', title: 'Fatigue & Safety Monitoring', description: 'Systems ensuring driver alertness and safety' },
  { icon: 'emergency', title: 'Emergency Response Preparedness', description: 'Rapid response protocols for any situation' },
  { icon: 'reporting', title: 'Automated Compliance Reporting', description: 'Detailed reports for your records' },
  { icon: 'portal', title: 'Customer Portal Access', description: 'Real-time order tracking and history' },
]

const iconSvgs = {
  gps: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>,
  route: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M12 2v20" /></svg>,
  monitor: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
  training: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>,
  fatigue: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  emergency: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
  reporting: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
  portal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
}

export default function FleetCompliance({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Fleet Compliance'
  const content = data.content || 'Our fleet operates with the highest standards of safety and compliance, ensuring your fuel deliveries are handled by certified professionals using state-of-the-art equipment.'

  // Dynamic styling props
  const headingColor = data.headingColor || '#111827'
  const headingSize = data.headingSize || '48px'
  const headingBorderEnabled = data.headingBorderEnabled || false
  const headingBorderColor = data.headingBorderColor || '#111827'
  const headingBorderWidth = data.headingBorderWidth || '1px'
  const headingShadowColor = data.headingShadowColor || 'rgba(0,0,0,0.3)'

  const contentColor = data.contentColor || '#4b5563'
  const contentSize = data.contentSize || '20px'
  const contentBorderEnabled = data.contentBorderEnabled || false
  const contentBorderColor = data.contentBorderColor || '#4b5563'
  const contentBorderWidth = data.contentBorderWidth || '1px'
  const contentShadowColor = data.contentShadowColor || 'rgba(0,0,0,0.3)'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fleet-header', {
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

      gsap.from('.fleet-card', {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.fleet-grid',
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fleet-header">
          <span className="tag">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
            </svg>
            Our Fleet
          </span>
          <h2
            className="mb-6"
            style={{
              color: headingColor,
              fontSize: headingSize,
              border: headingBorderEnabled ? `${headingBorderWidth} solid ${headingBorderColor}` : 'none',
              textShadow: headingShadowColor ? `0 2px 4px ${headingShadowColor}` : 'none',
            }}
          >
            {heading}
          </h2>
          <p
            className="max-w-3xl mx-auto"
            style={{
              color: contentColor,
              fontSize: contentSize,
              border: contentBorderEnabled ? `${contentBorderWidth} solid ${contentBorderColor}` : 'none',
              textShadow: contentShadowColor ? `0 2px 4px ${contentShadowColor}` : 'none',
            }}
          >
            {content}
          </p>
        </div>

        <div className="fleet-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleetFeatures.map((feature, index) => (
            <div
              key={index}
              className="fleet-card group bg-white p-6 border border-gray-100 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                <div className="w-6 h-6 text-primary">
                  {iconSvgs[feature.icon]}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
