'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const iconSvgs = {
  mining: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 20h20" /><path d="M5 20V8l7-5 7 5v12" /><path d="M9 20v-4h6v4" /></svg>,
  marine: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 20l1.5-1.5C3 17 3 14 5 12l3-3 3 3 5-5 5 5v6H2z" /><path d="M12 3v6" /><path d="M9 6l3-3 3 3" /></svg>,
  agriculture: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22V8" /><path d="M5 12l7-8 7 8" /><path d="M3 22h18" /><path d="M7 16c0-2.76 2.24-5 5-5s5 2.24 5 5" /></svg>,
  transport: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  retail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h18v18H3z" /><path d="M3 9h18" /></svg>,
  distribution: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>,
}

const fallbackIndustries = [
  { id: 'mining',       title: 'Mining',        description: 'Reliable fuel supply for mining operations with 24/7 on-site delivery.',  link: '/services/mining-fuel' },
  { id: 'marine',       title: 'Marine',         description: 'Bunker refueling services for vessels worldwide.',                         link: '/services/marine-fuel' },
  { id: 'agriculture',  title: 'Agriculture',    description: 'Cost-effective fuel solutions for farming operations.',                    link: '/services/agriculture-fuel' },
  { id: 'transport',    title: 'Transportation', description: 'Fleet fueling solutions for logistics companies.',                         link: '/fuel-transportation' },
  { id: 'retail',       title: 'Fuel Retailers', description: 'Partnership opportunities for fuel station owners.',                       link: '/services/fuel-retailers' },
  { id: 'distribution', title: 'Distribution',   description: 'Nationwide fuel distribution network across Australia.',                   link: '/services/local-fuel-distributors' },
]

const sizeMap = { '1': '12px', '2': '16px', '3': '20px', '4': '24px', '5': '32px', '6': '48px', '7': '70px' }

export default function VisualIndustriesGrid({ data = {} }) {
  const sectionRef = useRef(null)

  const sectionTag  = data.sectionTag  || 'Industries'
  const heading     = data.heading     || 'Sectors We Serve'
  const description = data.description || 'Delivering reliable fuel solutions across diverse industries nationwide'
  const industries  = data.industries?.length ? data.industries : fallbackIndustries

  const headingStyle = {
    ...(data.headingSize && { fontSize: sizeMap[data.headingSize] }),
    ...(data.headingBorderEnabled && {
      WebkitTextStroke: `${data.headingBorderWidth} ${data.headingBorderColor}`,
      ...(data.headingShadowColor && { textShadow: `0 0 10px ${data.headingShadowColor}` }),
    }),
  }
  const descStyle = {
    ...(data.descriptionSize && { fontSize: sizeMap[data.descriptionSize] }),
    ...(data.descriptionBorderEnabled && {
      WebkitTextStroke: `${data.descriptionBorderWidth} ${data.descriptionBorderColor}`,
      ...(data.descriptionShadowColor && { textShadow: `0 0 10px ${data.descriptionShadowColor}` }),
    }),
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.industries-grid-heading', {
        opacity: 0, y: 50, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
      gsap.from('.industry-card', {
        opacity: 0, y: 60, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="tag">{sectionTag}</span>
          <h2
            className={`industries-grid-heading ${data.headingColor || 'text-gray-900'} font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight mb-4`}
            style={headingStyle}
          >
            {heading}
          </h2>
          <p
            className={`${data.descriptionColor || 'text-gray-600'} text-xl max-w-3xl mx-auto`}
            style={descStyle}
          >
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, i) => {
            const titleStyle = {
              ...(industry.titleSize && { fontSize: sizeMap[industry.titleSize] }),
              ...(industry.titleBorderEnabled && {
                WebkitTextStroke: `${industry.titleBorderWidth} ${industry.titleBorderColor}`,
                ...(industry.titleShadowColor && { textShadow: `0 0 10px ${industry.titleShadowColor}` }),
              }),
            }
            const industryDescStyle = {
              ...(industry.descriptionSize && { fontSize: sizeMap[industry.descriptionSize] }),
              ...(industry.descriptionBorderEnabled && {
                WebkitTextStroke: `${industry.descriptionBorderWidth} ${industry.descriptionBorderColor}`,
                ...(industry.descriptionShadowColor && { textShadow: `0 0 10px ${industry.descriptionShadowColor}` }),
              }),
            }
            return (
              <Link key={i} href={industry.link || '#'} className="industry-card group">
                <div className="h-full bg-white p-8 border border-gray-100 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gray-100 flex items-center justify-center text-gray-600 mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {iconSvgs[industry.id] || iconSvgs.distribution}
                  </div>
                  <h3
                    className={`${industry.titleColor || 'text-gray-900'} text-xl font-semibold mb-3`}
                    style={titleStyle}
                  >
                    {industry.title}
                  </h3>
                  <p
                    className={`${industry.descriptionColor || 'text-gray-600'} leading-relaxed mb-6`}
                    style={industryDescStyle}
                  >
                    {industry.description}
                  </p>
                  <div className="flex items-center text-gray-500 font-medium group-hover:text-primary transition-colors duration-300">
                    <span>Explore</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
