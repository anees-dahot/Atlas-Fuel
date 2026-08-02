'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function LocationMap({data}) {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lm-content', { opacity: 0, y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="lm-content">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">{data.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-4">{data.heading}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{data.description}</p>
          </div>

          {/* Map Container */}
          <div className="relative aspect-[16/9] lg:aspect-[21/9] bg-gray-100 overflow-hidden border border-gray-200">
            {data.mapEmbedUrl ? (
              <iframe src={data.mapEmbedUrl} title={data.locationName} className="absolute inset-0 w-full h-full border-0" loading="lazy" allowFullScreen />
            ) : <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{data.locationName}</h3>
                <p className="text-gray-600">{data.address}</p>
                <p className="text-gray-500 text-sm mt-2">{data.mapLoadingText}</p>
              </div>
            </div>}
            
            {!data.mapEmbedUrl && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10">
              <div className="relative">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17" />
                    <path d="M3 22h12" />
                  </svg>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary"></div>
              </div>
            </div>}
          </div>

          {data.mapLink && data.mapLinkLabel && (
            <div className="mt-6 text-center">
              <a
                href={data.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors"
              >
                {data.mapLinkLabel}
              </a>
            </div>
          )}

          {/* Quick Info Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {data.phone && <div className="bg-gray-50 p-6 border-l-4 border-primary">
              <div className="text-2xl font-heading font-bold text-gray-900">{data.phone}</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">{data.phoneLabel}</div>
            </div>}
            {data.email && <div className="bg-gray-50 p-6 border-l-4 border-primary">
              <div className="text-2xl font-heading font-bold text-gray-900">{data.email}</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">{data.emailLabel}</div>
            </div>}
            {data.hours && <div className="bg-gray-50 p-6 border-l-4 border-primary">
              <div className="text-2xl font-heading font-bold text-gray-900">{data.hours}</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">{data.hoursLabel}</div>
            </div>}
          </div>
        </div>
      </div>
    </section>
  )
}
