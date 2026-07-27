'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const sizeMap = { '1': '12px', '2': '16px', '3': '20px', '4': '24px', '5': '32px', '6': '48px', '7': '70px' }

const getStyle = (obj, field) => {
  const style = {}
  if (obj[`${field}Size`]) {
    style.fontSize = sizeMap[obj[`${field}Size`]]
  }
  if (obj[`${field}BorderEnabled`]) {
    style.WebkitTextStroke = `${obj[`${field}BorderWidth`]} ${obj[`${field}BorderColor`]}`
    if (obj[`${field}ShadowColor`]) {
      style.textShadow = `0 0 10px ${obj[`${field}ShadowColor`]}`
    }
  }
  return style
}

export default function CTABanner({
  data = {},
  heading: headingProp,
  text: textProp,
  buttonText: buttonTextProp,
  buttonLink: buttonLinkProp,
}) {
  const sectionRef = useRef(null)

  const heading    = headingProp || data.heading || data.ctaBannerHeading || 'Ready to Power Your Business?'
  const text       = textProp || data.text || data.ctaBannerText || 'Contact us today for a free fuel quote and let our team build a solution tailored to your needs.'
  const buttonText = buttonTextProp || data.buttonText || data.ctaBannerButtonText || 'Get a Free Quote'
  const buttonLink = buttonLinkProp ?? data.buttonLink ?? data.ctaBannerButtonLink ?? '/contact'
  const phone      = data.phone || ''
  const email      = data.email || ''
  const address    = data.address || ''

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ctab-inner > *', { opacity: 0, y: 30, duration: 0.8, stagger: 0.12, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-primary py-20 lg:py-24 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
      />
      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-white/20 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="ctab-inner">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white uppercase tracking-[0.03em] mb-4" style={getStyle(data, 'heading')}>
            {heading}
          </h2>
          <p className={`${data.textColor || "text-white/80"} text-lg md:text-xl font-light max-w-2xl mx-auto mb-10`} style={getStyle(data, 'text')}>
            {text}
          </p>
          {(phone || email || address) && (
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              {phone && (
                <a href={`tel:${phone}`} className={`${data.phoneColor || "text-white/80"} text-sm flex items-center gap-2 hover:text-white transition-colors`} style={getStyle(data, 'phone')}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {phone}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className={`${data.emailColor || "text-white/80"} text-sm flex items-center gap-2 hover:text-white transition-colors`} style={getStyle(data, 'email')}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  {email}
                </a>
              )}
              {address && (
                <span className={`${data.addressColor || "text-white/80"} text-sm flex items-center gap-2`} style={getStyle(data, 'address')}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {address}
                </span>
              )}
            </div>
          )}
          <Link href={buttonLink}
            className={`${data.buttonTextColor || ""} group inline-flex items-center gap-3 px-10 py-5 bg-white text-primary font-bold uppercase tracking-wider hover:bg-primary-dark hover:text-white transition-all duration-300 hover:scale-105 shadow-xl shadow-black/20`} style={getStyle(data, 'buttonText')}>
            {buttonText}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
