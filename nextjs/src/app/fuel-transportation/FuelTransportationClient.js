'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTABanner from '@/components/shared/CTABanner'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function FuelTransportationClient({ data, siteSettings }) {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.to('.hero-image', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <main ref={pageRef}>
        {/* Hero Section */}
        <section className="hero-section relative flex items-center overflow-hidden" style={{ minHeight: '80svh' }}>
          <div className="absolute inset-0 -z-10">
            <img
              src={data.heroImageUrl}
              alt={data.heroImageAlt}
              className="hero-image w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-12 pb-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span
                  className="font-bold uppercase tracking-[0.2em]"
                  style={{
                    color: data.heroSubtitleColor,
                    fontSize: data.heroSubtitleSize,
                    border: data.heroSubtitleBorderEnabled ? `${data.heroSubtitleBorderWidth} solid ${data.heroSubtitleBorderColor}` : 'none',
                    textShadow: data.heroSubtitleShadowColor ? `0 2px 4px ${data.heroSubtitleShadowColor}` : 'none',
                  }}
                >
                  {data.heroSubtitle}
                </span>
              </div>
              <h1
                className="font-heading font-bold uppercase tracking-wide leading-tight mb-6"
                style={{
                  color: data.heroTitleColor,
                  fontSize: data.heroTitleSize,
                  border: data.heroTitleBorderEnabled ? `${data.heroTitleBorderWidth} solid ${data.heroTitleBorderColor}` : 'none',
                  textShadow: data.heroTitleShadowColor ? `0 2px 4px ${data.heroTitleShadowColor}` : 'none',
                }}
              >
                {data.heroTitle}
              </h1>
              <p
                className="leading-relaxed mb-8 max-w-xl"
                style={{
                  color: data.heroDescriptionColor,
                  fontSize: data.heroDescriptionSize,
                  border: data.heroDescriptionBorderEnabled ? `${data.heroDescriptionBorderWidth} solid ${data.heroDescriptionBorderColor}` : 'none',
                  textShadow: data.heroDescriptionShadowColor ? `0 2px 4px ${data.heroDescriptionShadowColor}` : 'none',
                }}
              >
                {data.heroDescription}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href={data.heroCtaLink} className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold text-[13px] uppercase tracking-[0.1em] border-2 border-primary hover:bg-primary-dark transition-all duration-300">
                  <span>{data.heroCtaText}</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <a href={data.heroSecondaryCtaLink} className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-bold text-[13px] uppercase tracking-[0.1em] border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300">
                  <span>{data.heroSecondaryCtaText}</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.heroStats.map((stat) => (
                  <div key={stat._key || stat.label} className="flex flex-col items-center gap-1 px-4 py-3 bg-white border border-gray-100">
                    <div className="text-2xl font-heading font-bold text-primary">{stat.value}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fleet Overview */}
        <section id="fleet" className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 section-heading">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.fleetSectionLabel}</span>
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              </div>
              <h2
                className="font-heading font-bold text-gray-900 uppercase tracking-wide leading-tight"
                style={{
                  color: data.fleetHeadingColor,
                  fontSize: data.fleetHeadingSize,
                  border: data.fleetHeadingBorderEnabled ? `${data.fleetHeadingBorderWidth} solid ${data.fleetHeadingBorderColor}` : 'none',
                  textShadow: data.fleetHeadingShadowColor ? `0 2px 4px ${data.fleetHeadingShadowColor}` : 'none',
                }}
              >
                {data.fleetHeading}
              </h2>
              <p
                className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                style={{
                  color: data.fleetDescriptionColor,
                  fontSize: data.fleetDescriptionSize,
                  border: data.fleetDescriptionBorderEnabled ? `${data.fleetDescriptionBorderWidth} solid ${data.fleetDescriptionBorderColor}` : 'none',
                  textShadow: data.fleetDescriptionShadowColor ? `0 2px 4px ${data.fleetDescriptionShadowColor}` : 'none',
                }}
              >
                {data.fleetDescription}
              </p>
            </div>

            {/* Fleet Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.fleetItems.map((item) => (
                <div key={item._key || item.title} className="gallery-item relative aspect-[4/3] overflow-hidden shadow-lg group">
                  <img src={item.imageUrl} alt={item.alt || item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-heading font-bold text-white uppercase">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Transportation Services */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-4 section-heading">
              <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.servicesSectionLabel}</span>
            </div>
            <h2
              className="font-heading font-bold text-gray-900 uppercase tracking-wide leading-tight mb-12"
              style={{
                color: data.servicesHeadingColor,
                fontSize: data.servicesHeadingSize,
                border: data.servicesHeadingBorderEnabled ? `${data.servicesHeadingBorderWidth} solid ${data.servicesHeadingBorderColor}` : 'none',
                textShadow: data.servicesHeadingShadowColor ? `0 2px 4px ${data.servicesHeadingShadowColor}` : 'none',
              }}
            >
              {data.servicesHeading}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.servicesItems.map((service) => (
                <div key={service._key || service.title} className="content-block group">
                  <div className="relative aspect-video overflow-hidden shadow-lg mb-6">
                    <img src={service.imageUrl} alt={service.alt || service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 uppercase mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Areas */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 section-heading">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.coverageSectionLabel}</span>
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              </div>
              <h2
                className="font-heading font-bold text-gray-900 uppercase tracking-wide leading-tight"
                style={{
                  color: data.coverageHeadingColor,
                  fontSize: data.coverageHeadingSize,
                  border: data.coverageHeadingBorderEnabled ? `${data.coverageHeadingBorderWidth} solid ${data.coverageHeadingBorderColor}` : 'none',
                  textShadow: data.coverageHeadingShadowColor ? `0 2px 4px ${data.coverageHeadingShadowColor}` : 'none',
                }}
              >
                {data.coverageHeading}
              </h2>
              <p
                className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                style={{
                  color: data.coverageDescriptionColor,
                  fontSize: data.coverageDescriptionSize,
                  border: data.coverageDescriptionBorderEnabled ? `${data.coverageDescriptionBorderWidth} solid ${data.coverageDescriptionBorderColor}` : 'none',
                  textShadow: data.coverageDescriptionShadowColor ? `0 2px 4px ${data.coverageDescriptionShadowColor}` : 'none',
                }}
              >
                {data.coverageDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {data.coverageAreas.map((area) => (
                <div key={area._key || area.region} className="content-block bg-white overflow-hidden shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={area.imageUrl} alt={area.alt || area.region} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-heading font-bold text-gray-900 uppercase mb-3">{area.region}</h3>
                    <p className="text-gray-600 mb-4">{area.description}</p>
                    <ul className="space-y-2">
                      {area.locations.map((loc) => (
                        <li key={loc} className="flex items-center gap-2 text-sm text-gray-700">
                          <svg className="w-4 h-4 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          {loc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="section-heading">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                  <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.teamSectionLabel}</span>
                </div>
                <h2
                  className="font-heading font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6"
                  style={{
                    color: data.teamHeadingColor,
                    fontSize: data.teamHeadingSize,
                    border: data.teamHeadingBorderEnabled ? `${data.teamHeadingBorderWidth} solid ${data.teamHeadingBorderColor}` : 'none',
                    textShadow: data.teamHeadingShadowColor ? `0 2px 4px ${data.teamHeadingShadowColor}` : 'none',
                  }}
                >
                  {data.teamHeading}
                </h2>
                <p
                  className="text-gray-600 text-lg leading-relaxed mb-8"
                  style={{
                    color: data.teamDescriptionColor,
                    fontSize: data.teamDescriptionSize,
                    border: data.teamDescriptionBorderEnabled ? `${data.teamDescriptionBorderWidth} solid ${data.teamDescriptionBorderColor}` : 'none',
                    textShadow: data.teamDescriptionShadowColor ? `0 2px 4px ${data.teamDescriptionShadowColor}` : 'none',
                  }}
                >
                  {data.teamDescription}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {data.teamStats.map((stat) => (
                    <div key={stat._key || stat.label} className="bg-white border border-gray-100 p-6">
                      <div className="text-2xl font-heading font-bold text-primary mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <ul className="space-y-3">
                  {data.teamQualifications.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-600">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[data.teamImages.slice(0, 2), data.teamImages.slice(2, 4)].map((column, columnIndex) => (
                  <div key={columnIndex} className={`space-y-4 ${columnIndex === 1 ? 'pt-8' : ''}`}>
                    {column.map((item, itemIndex) => (
                      <div key={item._key || item.alt} className={`gallery-item ${itemIndex === columnIndex ? 'aspect-[4/3]' : 'aspect-[4/5]'} overflow-hidden shadow-lg`}>
                        <img src={item.imageUrl} alt={item.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 section-heading">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.processSectionLabel}</span>
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              </div>
              <h2
                className="font-heading font-bold text-gray-900 uppercase tracking-wide leading-tight"
                style={{
                  color: data.processHeadingColor,
                  fontSize: data.processHeadingSize,
                  border: data.processHeadingBorderEnabled ? `${data.processHeadingBorderWidth} solid ${data.processHeadingBorderColor}` : 'none',
                  textShadow: data.processHeadingShadowColor ? `0 2px 4px ${data.processHeadingShadowColor}` : 'none',
                }}
              >
                {data.processHeading}
              </h2>
            </div>

            <div className="space-y-16">
              {data.processSteps.map((item) => (
                <div key={item._key || item.step} className={`content-block grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${item.reverse ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={item.reverse ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-14 h-14 bg-primary text-white flex items-center justify-center text-xl font-heading font-bold">{item.step}</span>
                      <h3 className="text-2xl font-heading font-bold text-gray-900 uppercase">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed pl-[4.5rem]">{item.description}</p>
                  </div>
                  <div className={`gallery-item relative aspect-video overflow-hidden shadow-lg ${item.reverse ? 'lg:order-1' : ''}`}>
                    <img src={item.imageUrl} alt={item.alt || item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety & Compliance */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="content-block relative">
                <div className="gallery-item relative aspect-[4/5] overflow-hidden shadow-lg">
                  <img src={data.safetyImageUrl} alt={data.safetyImageAlt} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 shadow-xl max-w-xs">
                  <div className="text-4xl font-heading font-bold mb-1">{data.safetyStatisticValue}</div>
                  <div className="text-lg font-semibold">{data.safetyStatisticTitle}</div>
                  <div className="text-sm text-white/80 mt-2">{data.safetyStatisticText}</div>
                </div>
              </div>

              <div className="section-heading">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                  <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.safetySectionLabel}</span>
                </div>
                <h2
                  className="font-heading font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6"
                  style={{
                    color: data.safetyHeadingColor,
                    fontSize: data.safetyHeadingSize,
                    border: data.safetyHeadingBorderEnabled ? `${data.safetyHeadingBorderWidth} solid ${data.safetyHeadingBorderColor}` : 'none',
                    textShadow: data.safetyHeadingShadowColor ? `0 2px 4px ${data.safetyHeadingShadowColor}` : 'none',
                  }}
                >
                  {data.safetyHeading}
                </h2>
                <p
                  className="text-gray-600 text-lg leading-relaxed mb-8"
                  style={{
                    color: data.safetyDescriptionColor,
                    fontSize: data.safetyDescriptionSize,
                    border: data.safetyDescriptionBorderEnabled ? `${data.safetyDescriptionBorderWidth} solid ${data.safetyDescriptionBorderColor}` : 'none',
                    textShadow: data.safetyDescriptionShadowColor ? `0 2px 4px ${data.safetyDescriptionShadowColor}` : 'none',
                  }}
                >
                  {data.safetyDescription}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {data.safetyCertifications.map((cert) => (
                    <div key={cert._key || cert.name} className="bg-cream p-6">
                      <h4 className="font-heading font-bold text-gray-900 mb-1">{cert.name}</h4>
                      <p className="text-sm text-gray-600">{cert.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fleet Gallery */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 section-heading">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.fleetGallerySectionLabel}</span>
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              </div>
              <h2
                className="font-heading font-bold text-gray-900 uppercase tracking-wide leading-tight"
                style={{
                  color: data.fleetGalleryHeadingColor,
                  fontSize: data.fleetGalleryHeadingSize,
                  border: data.fleetGalleryHeadingBorderEnabled ? `${data.fleetGalleryHeadingBorderWidth} solid ${data.fleetGalleryHeadingBorderColor}` : 'none',
                  textShadow: data.fleetGalleryHeadingShadowColor ? `0 2px 4px ${data.fleetGalleryHeadingShadowColor}` : 'none',
                }}
              >
                {data.fleetGalleryHeading}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((columnIndex) => (
                <div key={columnIndex} className={`space-y-4 ${columnIndex === 1 ? 'pt-8' : columnIndex === 3 ? 'pt-6' : ''}`}>
                  {data.fleetGalleryImages.slice(columnIndex * 2, columnIndex * 2 + 2).map((item, itemIndex) => {
                    const aspectClasses = [
                      ['aspect-[4/3]', 'aspect-[3/4]'],
                      ['aspect-[3/4]', 'aspect-[4/3]'],
                      ['aspect-square', 'aspect-square'],
                      ['aspect-[3/4]', 'aspect-[4/3]'],
                    ]
                    return (
                      <div key={item._key || item.alt} className={`gallery-item ${aspectClasses[columnIndex][itemIndex]} overflow-hidden shadow-lg`}>
                        <img src={item.imageUrl} alt={item.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Excellence Banner */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center section-heading">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.excellenceSectionLabel}</span>
            </div>
            <h2
              className="font-heading font-bold text-gray-900 uppercase tracking-wide leading-tight mb-8"
              style={{
                color: data.excellenceTaglineColor,
                fontSize: data.excellenceTaglineSize,
                border: data.excellenceTaglineBorderEnabled ? `${data.excellenceTaglineBorderWidth} solid ${data.excellenceTaglineBorderColor}` : 'none',
                textShadow: data.excellenceTaglineShadowColor ? `0 2px 4px ${data.excellenceTaglineShadowColor}` : 'none',
              }}
            >
              {data.excellenceTagline}
            </h2>
            <p
              className="mt-8 text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              style={{
                color: data.excellenceContentColor,
                fontSize: data.excellenceContentSize,
                border: data.excellenceContentBorderEnabled ? `${data.excellenceContentBorderWidth} solid ${data.excellenceContentBorderColor}` : 'none',
                textShadow: data.excellenceContentShadowColor ? `0 2px 4px ${data.excellenceContentShadowColor}` : 'none',
              }}
            >
              {data.excellenceContent}
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <a href={data.excellenceCtaLink} className="group inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:gap-4 transition-all">
                {data.excellenceCtaText}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        <CTABanner data={siteSettings} />
      </main>
    </>
  )
}
