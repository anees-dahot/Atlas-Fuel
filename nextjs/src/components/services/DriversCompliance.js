'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CmsImage from '@/components/common/CmsImage'
import { cmsTextStyle } from './cmsStyles'
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

  const heading = data.heading ?? 'Drivers Compliance'
  const content = data.content ?? 'Every Atlas Fuel driver meets the highest industry standards. Our rigorous training and certification programs ensure your fuel is transported by qualified professionals who prioritize safety above all else.'
  const sectionTag = data.sectionTag ?? 'Our Drivers'
  const requirements = Array.isArray(data.requirements) ? data.requirements : driverRequirements
  const imageAlt = data.imageAlt ?? data.imageUrlAlt ?? 'Atlas Fuel Professional Drivers'
  const stats = Array.isArray(data.stats)
    ? data.stats
    : [
        { value: '100%', label: 'Certified Drivers' },
        { value: '0', label: 'Safety Incidents' },
      ]
  const badgeTitle = data.badgeTitle ?? 'Professional'
  const badgeSubtitle = data.badgeSubtitle ?? 'Drivers Only'

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
                {sectionTag}
              </span>
              <h2
                className="font-bold mb-6"
                style={cmsTextStyle(data, 'heading', '#111827', '48px')}
              >
                {heading}
              </h2>
              <p
                style={cmsTextStyle(data, 'content', '#4b5563', '20px')}
              >
                {content}
              </p>
            </div>

            <div className="drivers-list space-y-4">
              {requirements.map((req, index) => (
                <div
                  key={req._key || index}
                  className="drivers-item group flex items-start gap-4 p-4 bg-cream hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900" style={cmsTextStyle(req, 'title', '#111827', '16px')}>{req.title}</h3>
                    <p className="text-primary text-sm font-medium" style={cmsTextStyle(req, 'subtitle', '#2db234', '14px')}>{req.subtitle}</p>
                    <p className="text-gray-600 text-sm mt-1" style={cmsTextStyle(req, 'description', '#4b5563', '14px')}>{req.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="drivers-image relative">
            <div className="relative overflow-hidden shadow-lg">
              <CmsImage
                value={data.imageImage ?? data.image ?? data.imageUrl}
                fallbackSrc="/images/truck-new.jpg"
                alt={imageAlt}
                width={720}
                height={500}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-[500px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
              
              {/* Stats overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className={`grid gap-4 ${stats.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {stats.map((stat, index) => (
                    <div key={stat._key || index} className="bg-white/10 p-4 border border-white/20">
                      <div className="text-3xl font-bold text-white" style={cmsTextStyle(stat, 'value', '#ffffff', '30px')}>{stat.value}</div>
                      <div className="text-white/80 text-sm" style={cmsTextStyle(stat, 'label', 'rgba(255,255,255,0.8)', '14px')}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-primary text-white px-6 py-3 shadow-lg">
              <div className="font-bold text-lg">{badgeTitle}</div>
              <div className="text-sm text-white/80">{badgeSubtitle}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
