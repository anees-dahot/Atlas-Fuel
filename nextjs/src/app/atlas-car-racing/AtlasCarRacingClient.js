'use client'
import { useEffect, useRef } from 'react'
import { stegaClean } from '@sanity/client/stega'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTABanner from '@/components/shared/CTABanner'
import CmsImage from '@/components/common/CmsImage'
import Link from 'next/link'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const icons = {
  community: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  motorsport: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  partnership: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),
  charity: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  whatsapp: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 01-12.6 7.4L3 20l1.2-5.2A8.5 8.5 0 1121 11.5z"/>
      <path d="M8.5 8.5c.7 3.1 2 4.4 5 5"/>
    </svg>
  ),
  phone: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 01-2.2 2A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8 9.9a16 16 0 006.1 6.1l1.2-1.2a2 2 0 012.1-.5c.9.4 1.9.6 2.9.7a2 2 0 011.7 1.9z"/>
    </svg>
  ),
  email: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>
    </svg>
  ),
}

const colorMap = {
  'text-gray-900': 'rgb(var(--cms-gray-900-rgb))',
  'text-primary': 'var(--cms-primary)',
  'text-white': 'var(--cms-background)',
  'text-gray-600': 'rgb(var(--cms-gray-600-rgb))',
  '#111827': 'rgb(var(--cms-gray-900-rgb))',
  '#000000': 'var(--cms-text)',
  '#2db234': 'var(--cms-primary)',
  '#10b981': 'var(--cms-primary)',
  '#ffffff': 'var(--cms-background)',
  '#4b5563': 'rgb(var(--cms-gray-600-rgb))',
  '#374151': 'rgb(var(--cms-gray-700-rgb))',
  '#1e3a8a': 'var(--cms-text)',
}

const sizeMap = {
  '1': '12px',
  '2': '16px',
  '3': '20px',
  '4': '24px',
  '5': '32px',
  '6': '48px',
  '7': '70px',
}

const cleanValue = (value) =>
  typeof value === 'string' ? stegaClean(value) : value

const cleanLink = (value) => cleanValue(value) || ''

const textStyle = (data, field) => {
  const color = cleanValue(data?.[`${field}Color`])
  const size = cleanValue(data?.[`${field}Size`])

  return {
    ...(color ? {color: colorMap[color] ?? color} : {}),
    ...(size ? {fontSize: sizeMap[size] ?? size} : {}),
  }
}

export default function AtlasCarRacingClient({ data, siteSettings }) {
  const meetImages = data.meetGtrImages ?? []
  const gallery = data.galleryImages ?? []
  const pagePillars = (data.pillars ?? []).map((pillar) => {
    const iconName = cleanValue(pillar.icon)
    return {
      ...pillar,
      desc: pillar.description ?? pillar.desc,
      icon: iconName ? icons[iconName] ?? icons.community : null,
    }
  })

  const heroRef      = useRef(null)
  const statsRef     = useRef(null)
  const meetRef      = useRef(null)
  const galleryRef   = useRef(null)
  const pillarsRef   = useRef(null)
  const sponsRef     = useRef(null)
  const contactRef   = useRef(null)
  const hasAnimated  = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true
    let ctx
    ;(async () => {
      const { default: gsap } = await import('gsap')
      const { ScrollTrigger }  = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Hero
        gsap.from('.hero-tag',  { y: -30, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.2, immediateRender: false })
        gsap.from('.hero-h1',   { y: 60,  opacity: 0, duration: 1,   ease: 'power3.out', delay: 0.4, immediateRender: false })
        gsap.from('.hero-sub',  { y: 40,  opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.65, immediateRender: false })
        gsap.from('.hero-plate',{ y: 30,  opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.85, immediateRender: false })

        // Specs strip
        gsap.from('.spec-item', {
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
          y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        })

        // Meet the GTR
        gsap.from('.meet-text', {
          scrollTrigger: { trigger: meetRef.current, start: 'top 80%', once: true },
          x: -50, opacity: 0, duration: 1, ease: 'power3.out',
        })
        gsap.from('.meet-img', {
          scrollTrigger: { trigger: meetRef.current, start: 'top 80%', once: true },
          x: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.15,
        })

        // Gallery items
        gsap.from('.gal-item', {
          scrollTrigger: { trigger: galleryRef.current, start: 'top 80%', once: true },
          y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        })

        // Pillars
        gsap.from('.pillar-card', {
          scrollTrigger: { trigger: pillarsRef.current, start: 'top 80%', once: true },
          y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
        })

        // Sponsorship
        gsap.from('.spons-block', {
          scrollTrigger: { trigger: sponsRef.current, start: 'top 80%', once: true },
          y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        })

        // Contact cards
        gsap.from('.contact-card', {
          scrollTrigger: { trigger: contactRef.current, start: 'top 85%', once: true },
          y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        })
      })
    })()
    return () => ctx?.revert()
  }, [])

  return (
    <>
      <main>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative flex items-end overflow-hidden" style={{ minHeight: '80svh' }}>
          <CmsImage
            value={data.heroImage ?? data.heroImageUrl}
            alt={data.heroImageAlt ?? data.heroImageUrlAlt ?? data.heroTitle}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* gradient — bottom heavy so car stays visible */}

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 lg:px-12 pb-20 lg:pb-28">
            <div className="hero-tag inline-flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-primary" />
              <span className="text-primary text-xs sm:text-sm font-bold uppercase tracking-[0.2em]" style={textStyle(data, 'heroTag')}>{data.heroTag}</span>
            </div>
            <h1 className="hero-h1 font-heading font-bold uppercase text-gray-900 leading-none mb-6" style={textStyle(data, 'heroTitle')}>
              {data.heroTitle}
            </h1>
            <p className="hero-sub text-gray-700 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-8 font-semibold" style={{ ...textStyle(data, 'heroSubtitle'), textShadow: '1px 1px 3px rgba(255,255,255,0.8), 0.5px 0.5px 1px rgba(255,255,255,0.6)' }}>
              {data.heroSubtitle}
            </p>
            {(data.heroPlateLabel || data.heroPlate) && (
              <div className="hero-plate inline-flex items-center gap-3 bg-white/90 border border-gray-200 px-5 py-3 backdrop-blur-sm shadow-lg">
                <span className="text-gray-600 text-xs uppercase tracking-widest font-semibold">{data.heroPlateLabel}</span>
                <span className="text-gray-900 font-heading font-bold text-xl tracking-widest">{data.heroPlate}</span>
              </div>
            )}
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
            <span className="text-gray-500 text-xs uppercase tracking-widest">{data.heroScrollLabel}</span>
            <div className="w-px h-10 bg-gradient-to-b from-gray-500 to-transparent animate-pulse" />
          </div>
        </section>

        {/* ── SPECS STRIP ──────────────────────────────────────── */}
        <section ref={statsRef} className="bg-primary-dark py-8">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-white/20">
              {(data.specs ?? []).map((s, i) => (
                <div key={s._key || s.label || i} className="spec-item px-6 py-4 text-center first:pl-0 last:pr-0">
                  <div className="text-white/50 text-[10px] uppercase tracking-[0.2em] mb-1">{s.label}</div>
                  <div className="text-white font-heading font-bold text-lg tracking-wide">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MEET THE GTR ─────────────────────────────────────── */}
        <section ref={meetRef} className="py-24 lg:py-32 bg-white">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <div className="meet-text">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-primary text-sm font-bold uppercase tracking-[0.2em]">{data.meetGtrEyebrow}</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary-dark uppercase tracking-tight mb-6" style={textStyle(data, 'meetGtrHeading')}>
                  {data.meetGtrHeading}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6" style={textStyle(data, 'meetGtrDescription')}>
                  {data.meetGtrDescription}
                </p>
                {data.meetGtrCtaText && cleanLink(data.meetGtrCtaLink) && (
                  <Link
                    href={cleanLink(data.meetGtrCtaLink)}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider hover:bg-primary-dark transition-all duration-300 group"
                  >
                    {data.meetGtrCtaText}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>
                )}
              </div>

              <div className="meet-img grid grid-cols-2 gap-4">
                {meetImages.map((item, index) => (
                  <div key={item._key || item.imageUrl || index} className={`relative overflow-hidden shadow-lg ${index === 0 ? 'aspect-[4/5] col-span-2' : 'aspect-square'}`}>
                    <CmsImage
                      value={item.image ?? item.imageUrl}
                      alt={item.alt ?? item.imageAlt ?? data.meetGtrHeading}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── GALLERY ──────────────────────────────────────────── */}
        <section ref={galleryRef} className="py-24 lg:py-32 bg-cream">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary text-sm font-bold uppercase tracking-[0.2em]">{data.galleryEyebrow}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary-dark uppercase tracking-tight mb-12" style={textStyle(data, 'galleryHeading')}>
              {data.galleryHeading}
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((item, index) => (
                <div key={item._key || item.imageUrl || index} className={`gal-item relative overflow-hidden shadow-lg group ${(item.featured ?? (index === 0)) ? 'col-span-2 row-span-2 aspect-[16/9] lg:min-h-[480px]' : 'aspect-video'}`}>
                  <CmsImage
                    value={item.image ?? item.imageUrl}
                    alt={item.alt ?? item.imageAlt ?? item.caption ?? data.galleryHeading}
                    fill
                    sizes={(item.featured ?? (index === 0)) ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, 50vw'}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {item.caption && <span className="text-white font-bold uppercase tracking-wide text-xs">{item.caption}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PURPOSE PILLARS ───────────────────────────────────── */}
        <section ref={pillarsRef} className="py-24 lg:py-32 bg-white">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary text-sm font-bold uppercase tracking-[0.2em]">{data.pillarsEyebrow}</span>
                <div className="h-px w-12 bg-primary" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary-dark uppercase tracking-tight" style={textStyle(data, 'pillarsHeading')}>
                {data.pillarsHeading}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pagePillars.map((p, i) => (
                <div key={p._key || p.title || i} className="pillar-card bg-cream border border-sand p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group">
                  {p.icon && (
                    <div className="w-14 h-14 bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {p.icon}
                    </div>
                  )}
                  <h3 className="text-lg font-heading font-bold text-primary-dark uppercase tracking-wide mb-3">{p.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SPONSORSHIP & DIESEL TESTING ─────────────────────── */}
        <section ref={sponsRef} className="py-24 lg:py-32 bg-sand">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* GTR Sponsorship */}
              <div className="spons-block">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-primary text-sm font-bold uppercase tracking-[0.2em]">{data.sponsorshipEyebrow}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-dark uppercase tracking-tight mb-6" style={textStyle(data, 'sponsorshipHeading')}>
                  {data.sponsorshipHeading}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6" style={textStyle(data, 'sponsorshipDescription')}>
                  {data.sponsorshipDescription}
                </p>
                <div className="space-y-3 mb-8">
                  {(data.sponsorshipBenefits ?? []).map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                {data.sponsorshipCtaText && cleanLink(data.sponsorshipCtaLink) && (
                  <Link
                    href={cleanLink(data.sponsorshipCtaLink)}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wider hover:bg-primary-dark transition-all duration-300 group"
                  >
                    {data.sponsorshipCtaText}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>
                )}
              </div>

              {/* Prado Diesel Testing */}
              <div className="spons-block">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-px w-12 bg-primary" />
                  <span className="text-primary text-sm font-bold uppercase tracking-[0.2em]">{data.pradoEyebrow}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-primary-dark uppercase tracking-tight mb-6" style={textStyle(data, 'pradoHeading')}>
                  {data.pradoHeading}
                </h2>
                <div className="relative aspect-video overflow-hidden shadow-lg mb-6">
                  <CmsImage
                    value={data.pradoImage ?? data.pradoImageUrl}
                    alt={data.pradoImageAlt ?? data.pradoImageUrlAlt ?? data.pradoHeading}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-gray-600 leading-relaxed mb-4" style={textStyle(data, 'pradoDescription')}>
                  {data.pradoDescription}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── GET INVOLVED / CONTACT ────────────────────────────── */}
        <section ref={contactRef} className="py-24 lg:py-32 bg-cream">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary text-sm font-bold uppercase tracking-[0.2em]">{data.contactEyebrow}</span>
                <div className="h-px w-12 bg-primary" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary-dark uppercase tracking-tight mb-4" style={textStyle(data, 'contactHeading')}>
                {data.contactHeading}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto" style={textStyle(data, 'contactDescription')}>
                {data.contactDescription}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {(data.contactMethods ?? []).map((c, i) => {
                const href = cleanLink(c.href)
                const isExternal = /^https?:\/\//i.test(href)
                const iconName = cleanValue(c.icon)
                const content = (
                  <>
                  {iconName && (
                    <div className="w-14 h-14 bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {icons[iconName] ?? icons.community}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-2">{c.label}</div>
                  <div className="text-gray-900 font-bold text-sm group-hover:text-primary transition-colors">{c.value}</div>
                  </>
                )

                return href ? (
                  <a
                    key={c._key || c.label || i}
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="contact-card bg-white border border-sand p-8 text-center hover:border-primary/40 hover:shadow-lg transition-all duration-300 group block"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={c._key || c.label || i}
                    className="contact-card bg-white border border-sand p-8 text-center"
                  >
                    {content}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <CTABanner data={siteSettings} />
      </main>
    </>
  )
}
