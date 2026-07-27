'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const sizeMap = {
  '1': '12px',
  '2': '16px',
  '3': '20px',
  '4': '24px',
  '5': '32px',
  '6': '48px',
  '7': '70px',
};

const certIcons = {
  WAHVA: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 104 0M15 17a2 2 0 104 0"/>
    </svg>
  ),
  'ISO 9001': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  'ISO 14001': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"/>
    </svg>
  ),
  'ISO 45001': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
}
const GenericIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const defaultCerts = [
  { name: 'WAHVA',    label: 'WA Heavy Vehicle Accreditation' },
  { name: 'ISO 9001', label: 'Quality Management'             },
  { name: 'ISO 14001',label: 'Environmental Management'       },
  { name: 'ISO 45001',label: 'Occupational Health & Safety'   },
]

export default function AboutSafety({ data = {} }) {
  const sectionRef = useRef(null)
  const imageRef   = useRef(null)

  const certs = data.certificationCards && data.certificationCards.length > 0 ? data.certificationCards : defaultCerts

  const heading = data.heading || 'Your Partner in Safety'
  const headingColor = data.headingColor || 'text-gray-900'
  const headingSize = data.headingSize ? { fontSize: sizeMap[data.headingSize] } : {}
  const headingBorderEnabled = data.headingBorderEnabled || false
  const headingBorderColor = data.headingBorderColor || '#000000'
  const headingBorderWidth = data.headingBorderWidth || '1px'
  const headingShadowColor = data.headingShadowColor || ''
  const headingStyle = {
    ...headingSize,
    ...(headingBorderEnabled && {
      WebkitTextStroke: `${headingBorderWidth} ${headingBorderColor}`,
      ...(headingShadowColor && { textShadow: `0 0 10px ${headingShadowColor}` }),
    }),
  }

  const content = data.content || "Atlas Fuel Australia places paramount importance on the safety of our employees and the communities we serve, particularly when handling dangerous goods such as petroleum products. Our commitment to safety is reflected in rigorous and comprehensive safe work procedures designed to mitigate risks and ensure the wellbeing of our workforce. Our teams undergo extensive training, equipping them with the knowledge and skills necessary to handle dangerous goods with precision and care. We adhere strictly to industry regulations and best practices, implementing robust safety protocols at every stage of the petroleum product supply chain."
  const contentColor = data.contentColor || 'text-gray-600'
  const contentSize = data.contentSize ? { fontSize: sizeMap[data.contentSize] } : {}
  const contentBorderEnabled = data.contentBorderEnabled || false
  const contentBorderColor = data.contentBorderColor || '#000000'
  const contentBorderWidth = data.contentBorderWidth || '1px'
  const contentShadowColor = data.contentShadowColor || ''
  const contentStyle = {
    ...contentSize,
    ...(contentBorderEnabled && {
      WebkitTextStroke: `${contentBorderWidth} ${contentBorderColor}`,
      ...(contentShadowColor && { textShadow: `0 0 10px ${contentShadowColor}` }),
    }),
  }

  const imageUrl = data.safetyImageUrl || '/images/partner-in-safety.webp'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.asaf-content', { opacity: 0, x: -60, duration: 1, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } })
      gsap.from('.asaf-cert', { opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)', immediateRender: false,
        scrollTrigger: { trigger: '.asaf-certs', start: 'top 80%', once: true } })
      gsap.from('.asaf-image', { opacity: 0, x: 60, scale: 0.95, duration: 1.1, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-gray-50 overflow-hidden text-gray-900">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="safegrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="black" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#safegrid)"/>
        </svg>
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — content */}
          <div className="asaf-content order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-primary" />
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Safety First</span>
            </div>
            <h2 className={`${headingColor} text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-tight leading-tight mb-8`} style={headingStyle}>
              {heading}
            </h2>
            <p className={`${contentColor} text-lg leading-relaxed mb-10 font-light`} style={contentStyle}>{content}</p>

            {/* Cert badges */}
            <div className="asaf-certs grid grid-cols-2 gap-4">
              {certs.map((cert, i) => (
                <div key={i} className="asaf-cert flex items-center gap-3 bg-white border border-gray-100 px-4 py-3 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
                  <div className="w-10 h-10 bg-primary/10 group-hover:bg-primary flex items-center justify-center flex-shrink-0 text-primary group-hover:text-white transition-all duration-300">
                    {certIcons[cert.name] || <GenericIcon />}
                  </div>
                  <div>
                    <div className="text-gray-900 text-sm font-bold">{cert.name}</div>
                    <div className="text-gray-500 text-xs font-light">{cert.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="asaf-image order-1 lg:order-2 relative h-[480px] lg:h-[600px] overflow-hidden group shadow-lg">
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10 group-hover:bg-transparent transition-all duration-700" />
            <img ref={imageRef} src={imageUrl} alt="Atlas Fuel Safety"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-[1500ms]" />
            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white/70 to-transparent z-20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary" />
                <span className="text-gray-900 text-sm font-semibold uppercase tracking-widest">ISO Certified Operations</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
