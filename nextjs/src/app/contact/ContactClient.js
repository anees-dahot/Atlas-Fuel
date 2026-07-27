'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTABanner from '@/components/shared/CTABanner'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function ContactClient({ data, siteSettings }) {
  const pageRef = useRef(null)

  // Dynamic styling props
  const heroTitleColor = data.heroTitleColor || '#000000'
  const heroTitleSize = data.heroTitleSize || '72px'
  const heroTitleBorderEnabled = data.heroTitleBorderEnabled || false
  const heroTitleBorderColor = data.heroTitleBorderColor || '#000000'
  const heroTitleBorderWidth = data.heroTitleBorderWidth || '1px'
  const heroTitleShadowColor = data.heroTitleShadowColor || ''

  const heroDescriptionColor = data.heroDescriptionColor || '#000000'
  const heroDescriptionSize = data.heroDescriptionSize || '18px'
  const heroDescriptionBorderEnabled = data.heroDescriptionBorderEnabled || false
  const heroDescriptionBorderColor = data.heroDescriptionBorderColor || '#000000'
  const heroDescriptionBorderWidth = data.heroDescriptionBorderWidth || '1px'
  const heroDescriptionShadowColor = data.heroDescriptionShadowColor || ''

  const formHeadingColor = data.formHeadingColor || '#000000'
  const formHeadingSize = data.formHeadingSize || '30px'
  const formHeadingBorderEnabled = data.formHeadingBorderEnabled || false
  const formHeadingBorderColor = data.formHeadingBorderColor || '#000000'
  const formHeadingBorderWidth = data.formHeadingBorderWidth || '1px'
  const formHeadingShadowColor = data.formHeadingShadowColor || ''

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section headings fade-in
      gsap.utils.toArray('.section-heading').forEach((heading) => {
        gsap.from(heading, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            once: true,
          },
        })
      })

      // Content blocks slide-up
      gsap.utils.toArray('.content-block').forEach((block) => {
        gsap.from(block, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: block,
            start: 'top 85%',
            once: true,
          },
        })
      })

      // Image galleries stagger
      gsap.utils.toArray('.gallery-item').forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            once: true,
          },
        })
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <main ref={pageRef}>
        {/* Hero Section */}
        <section className="section-heading relative flex items-start overflow-hidden" style={{ minHeight: '80svh' }}>
          <div className="absolute inset-0">
            <img
              src={data.heroImageUrl}
              alt="Atlas Fuel"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-0.5 w-16 bg-primary" />
                <span className="text-primary text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
                  Contact Us
                </span>
              </div>
              <h1
                className="font-bold mb-6"
                style={{
                  color: heroTitleColor,
                  fontSize: heroTitleSize,
                  border: heroTitleBorderEnabled ? `${heroTitleBorderWidth} solid ${heroTitleBorderColor}` : 'none',
                  textShadow: heroTitleShadowColor ? `0 2px 4px ${heroTitleShadowColor}` : 'none',
                }}
              >
                {data.heroTitle}
              </h1>
              <p
                className="max-w-xl leading-relaxed mb-8 font-semibold"
                style={{
                  color: heroDescriptionColor,
                  fontSize: heroDescriptionSize,
                  border: heroDescriptionBorderEnabled ? `${heroDescriptionBorderWidth} solid ${heroDescriptionBorderColor}` : 'none',
                  textShadow: heroDescriptionShadowColor ? `0 2px 4px ${heroDescriptionShadowColor}` : 'none',
                }}
              >
                {data.heroDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="content-block">
                <h2
                  className="font-bold mb-6"
                  style={{
                    color: formHeadingColor,
                    fontSize: formHeadingSize,
                    border: formHeadingBorderEnabled ? `${formHeadingBorderWidth} solid ${formHeadingBorderColor}` : 'none',
                    textShadow: formHeadingShadowColor ? `0 2px 4px ${formHeadingShadowColor}` : 'none',
                  }}
                >
                  {data.formHeading}
                </h2>
                <form className="space-y-6">
                  {data.fields.map((field, index) => (
                    <div key={field._key || field.name || index}>
                      <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea id={field.name} name={field.name} rows="5" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder={field.placeholder} required={field.required} />
                      ) : field.type === 'select' ? (
                        <select id={field.name} name={field.name} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" required={field.required}>
                          <option value="">{field.placeholder}</option>
                          {(field.options || []).map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                      ) : (
                        <input id={field.name} name={field.name} type={field.type || 'text'} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder={field.placeholder} required={field.required} />
                      )}
                    </div>
                  ))}
                  
                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-primary text-white text-sm font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
                  >
                    {data.submitButtonText}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="content-block space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{data.infoHeading}</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{data.addressLabel}</h3>
                        <p className="text-gray-600">{data.address}</p>
                        <p className="text-gray-600">{data.country}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6.87-6.87 19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.904.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{data.phoneLabel}</h3>
                        <a href={`tel:${data.phone}`} className="text-primary hover:underline">{data.phone}</a>
                        <p className="text-gray-600 text-sm mt-1">{data.phoneNote}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="4" width="20" height="16" rx="2"/>
                          <path d="M22 7l-10 6L2 7"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{data.emailLabel}</h3>
                        <a href={`mailto:${data.email}`} className="text-primary hover:underline">{data.email}</a>
                        <p className="text-gray-600 text-sm mt-1">{data.emailNote}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-gray-50 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">{data.hoursHeading}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{data.weekdaysLabel}</span>
                      <span className="text-gray-900">{data.weekdaysHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{data.saturdayLabel}</span>
                      <span className="text-gray-900">{data.saturdayHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{data.sundayLabel}</span>
                      <span className="text-gray-900">{data.sundayHours}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200">
                      <span className="text-gray-600">{data.emergencyLabel}</span>
                      <span className="text-gray-900 ml-2">{data.emergencySupport}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <a
                    href={`tel:${data.phone}`}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary text-white text-sm font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6.87-6.87 19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.904.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    {data.callButtonText}
                  </a>
                  <a 
                    href={data.stationButtonLink}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-primary text-primary text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {data.stationButtonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-gray-100">
          <div className="w-full h-[500px]">
            <iframe
              src={data.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12 py-8">
            <div className="bg-white p-6 shadow-lg max-w-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{data.mapHeading}</h3>
              <p className="text-gray-600 mb-4">{data.address}</p>
              <a
                href={data.directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {data.directionsButtonText}
              </a>
            </div>
          </div>
        </section>
        <CTABanner data={siteSettings} />
      </main>
    </>
  )
}
