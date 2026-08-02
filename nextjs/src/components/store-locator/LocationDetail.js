'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const phoneHref = (phone) => `tel:${String(phone ?? '').replace(/\s/g, '')}`

export default function LocationDetail({data}) {
  const sectionRef = useRef(null)
  const locations = Array.isArray(data?.locations) ? data.locations : []

  useEffect(() => {
    if (!locations.length) return undefined

    const ctx = gsap.context(() => {
      gsap.from('.ld-header', {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {trigger: sectionRef.current, start: 'top 85%', once: true},
      })
      gsap.from('.ld-card', {
        opacity: 0,
        y: 80,
        scale: 0.95,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {trigger: sectionRef.current, start: 'top 85%', once: true},
      })
      gsap.from('.ld-feature', {
        opacity: 0,
        x: 50,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {trigger: sectionRef.current, start: 'top 85%', once: true},
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [locations.length])

  if (!locations.length) return null

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {locations.map((location, locationIndex) => {
          const features = Array.isArray(location.features) ? location.features : []

          return (
            <article
              key={location._key ?? location.name ?? locationIndex}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            >
              <div className="ld-card bg-white p-10 border border-gray-100 shadow-sm">
                <div className="ld-header mb-8">
                  {data.eyebrow && (
                    <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                      {data.eyebrow}
                    </span>
                  )}
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 uppercase tracking-tight">
                    {location.name}
                  </h2>
                </div>

                <div className="space-y-6">
                  {location.address && (
                    <DetailRow icon="location" label={data.addressLabel} value={location.address} />
                  )}
                  {location.phone && (
                    <DetailRow
                      icon="phone"
                      label={data.phoneLabel}
                      value={location.phone}
                      href={phoneHref(location.phone)}
                    />
                  )}
                  {location.email && (
                    <DetailRow
                      icon="email"
                      label={data.emailLabel}
                      value={location.email}
                      href={`mailto:${location.email}`}
                    />
                  )}
                  {location.hours && (
                    <DetailRow icon="hours" label={data.hoursLabel} value={location.hours} />
                  )}
                </div>

                {location.phone && data.callButtonText && (
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <a
                      href={phoneHref(location.phone)}
                      className="group inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-all duration-300 hover:scale-[1.02]"
                    >
                      <PhoneIcon className="w-6 h-6" />
                      {data.callButtonText}
                    </a>
                  </div>
                )}
              </div>

              <div className="ld-features space-y-4">
                {(data.servicesEyebrow || data.servicesHeading) && (
                  <div className="mb-8">
                    {data.servicesEyebrow && (
                      <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                        {data.servicesEyebrow}
                      </span>
                    )}
                    {data.servicesHeading && (
                      <h3 className="text-2xl font-heading font-bold text-gray-900 uppercase tracking-tight">
                        {data.servicesHeading}
                      </h3>
                    )}
                  </div>
                )}

                {features.map((feature, featureIndex) => (
                  <div
                    key={feature._key ?? feature.label ?? featureIndex}
                    className="ld-feature bg-white p-6 border-l-4 border-primary shadow-sm"
                  >
                    <h4 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">
                      {feature.label}
                    </h4>
                    <p className="text-gray-600">{feature.value}</p>
                  </div>
                ))}

                {location.mapLink && (
                  <div className="ld-feature bg-primary-dark text-white p-6 mt-8">
                    <h4 className="font-bold uppercase tracking-wide text-sm mb-4 text-white/60">
                      {data.directionsHeading}
                    </h4>
                    <p className="text-white/80 mb-4">{data.directionsText}</p>
                    <a
                      href={location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wide hover:text-white/80 transition-colors group"
                    >
                      {data.directionsButtonText}
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function DetailRow({icon, label, value, href}) {
  const content = href ? (
    <a href={href} className="text-gray-600 text-lg hover:text-primary transition-colors">
      {value}
    </a>
  ) : (
    <p className="text-gray-600 text-lg">{value}</p>
  )

  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0">
        {icon === 'location' && <LocationIcon />}
        {icon === 'phone' && <PhoneIcon />}
        {icon === 'email' && <EmailIcon />}
        {icon === 'hours' && <HoursIcon />}
      </div>
      <div>
        {label && <h3 className="font-bold text-gray-900 uppercase tracking-wide text-sm mb-1">{label}</h3>}
        {content}
      </div>
    </div>
  )
}

const iconClass = 'w-6 h-6 text-primary'

function LocationIcon() {
  return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
}

function PhoneIcon({className = iconClass}) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6.87-6.87 19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.904.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
}

function EmailIcon() {
  return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" /></svg>
}

function HoursIcon() {
  return <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
}
