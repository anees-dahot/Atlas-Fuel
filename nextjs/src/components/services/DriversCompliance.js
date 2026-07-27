'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const driverRequirements = [
  { title: "Heavy Vehicle Driver's Licence", subtitle: "MC/HC Class", description: "Fully licensed for multi-combination and heavy combination vehicles" },
  { title: 'Dangerous Goods Licence', subtitle: 'DG Certified', description: 'Licensed to transport hazardous materials safely' },
  { title: 'Safe Load Programme', subtitle: 'SLP Accredited', description: 'Trained in proper load securing and weight distribution' },
  { title: 'Fatigue Management', subtitle: 'Accredited', description: 'Certified in fatigue management protocols for long-haul operations' },
  { title: 'First Aid & Emergency', subtitle: 'Response Trained', description: 'Equipped to handle emergencies in remote locations' },
]

export default function DriversCompliance({ data = {} }) {
  const sectionRef = useRef(null)

  const heading = data.heading || 'Drivers Compliance'
  const content = data.content || 'Every Atlas Fuel driver meets the highest industry standards. Our rigorous training and certification programs ensure your fuel is transported by qualified professionals who prioritize safety above all else.'

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
      gsap.from('.drivers-header', {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.drivers-item', {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: '.drivers-list',
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.drivers-image', {
        opacity: 0,
        x: 40,
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
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="drivers-header mb-12">
              <span className="tag">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Our Drivers
              </span>
              <h2
                className="font-bold mb-6"
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

            <div className="drivers-list space-y-4">
              {driverRequirements.map((req, index) => (
                <div
                  key={index}
                  className="drivers-item group flex items-start gap-4 p-4 bg-cream hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{req.title}</h3>
                    <p className="text-primary text-sm font-medium">{req.subtitle}</p>
                    <p className="text-gray-600 text-sm mt-1">{req.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="drivers-image relative">
            <div className="relative overflow-hidden shadow-lg">
              <img
                src="/images/truck-new.jpg"
                alt="Atlas Fuel Professional Drivers"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 border border-white/20">
                    <div className="text-3xl font-bold text-white">100%</div>
                    <div className="text-white/80 text-sm">Certified Drivers</div>
                  </div>
                  <div className="bg-white/10 p-4 border border-white/20">
                    <div className="text-3xl font-bold text-white">0</div>
                    <div className="text-white/80 text-sm">Safety Incidents</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-primary text-white px-6 py-3 shadow-lg">
              <div className="font-bold text-lg">Professional</div>
              <div className="text-sm text-white/80">Drivers Only</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
