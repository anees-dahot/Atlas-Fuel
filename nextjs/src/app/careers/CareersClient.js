'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTABanner from '@/components/shared/CTABanner'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const fallbackSiteSettings = {
  ctaBannerHeading: 'Ready to Join Our Team?',
  ctaBannerText: 'Explore our current openings and discover how you can build a rewarding career with Atlas Fuel.',
  ctaBannerButtonText: 'View Openings',
  ctaBannerButtonLink: '#openings',
}

export default function CareersClient({ data, siteSettings }) {
  const pageRef = useRef(null)
  const titleWords = data.heroTitle.trim().split(/\s+/)
  const titleAccent = titleWords.pop()
  const titleLead = titleWords.join(' ')

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

      // Hero parallax effect
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

  const applyStyle = (styleObj, enabled) => {
    if (!enabled || !styleObj) return {}
    return styleObj
  }

  const getBorderStyle = (enabled, color, width, shadow) => {
    if (!enabled) return {}
    return {
      border: `${width} solid ${color}`,
      boxShadow: shadow ? `0 0 10px ${shadow}` : 'none',
    }
  }

  return (
    <>
      <main ref={pageRef}>
        {/* Hero Section */}
        <section className="hero-section relative flex items-center overflow-hidden" style={{ minHeight: '80svh' }}>
          <div className="absolute inset-0 -z-10">
            <img
              src={data.heroImageUrl || '/images/work-with-us.jpg'}
              alt="Atlas Fuel Careers"
              className="hero-image w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-12 pb-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span 
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    color: data.heroSubtitleColor,
                    fontSize: data.heroSubtitleSize,
                    ...getBorderStyle(data.heroSubtitleBorderEnabled, data.heroSubtitleBorderColor, data.heroSubtitleBorderWidth, data.heroSubtitleShadowColor),
                  }}
                >
                  {data.heroSubtitle}
                </span>
              </div>
              <h1 className="font-heading space-y-0">
                <span 
                  className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.9] uppercase tracking-wide leading-tight text-white"
                  style={{
                    color: data.heroTitleColor,
                    fontSize: data.heroTitleSize,
                    ...getBorderStyle(data.heroTitleBorderEnabled, data.heroTitleBorderColor, data.heroTitleBorderWidth, data.heroTitleShadowColor),
                  }}
                >
                  {titleLead}
                </span>
                <span 
                  className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.9] uppercase tracking-wide leading-tight text-primary"
                  style={{
                    color: data.heroTitleColor,
                    fontSize: data.heroTitleSize,
                    ...getBorderStyle(data.heroTitleBorderEnabled, data.heroTitleBorderColor, data.heroTitleBorderWidth, data.heroTitleShadowColor),
                  }}
                >
                  {titleAccent}
                </span>
              </h1>
              <p 
                className="mt-4 text-white/90 text-lg leading-relaxed max-w-xl mb-8"
                style={{
                  color: data.heroDescriptionColor,
                  fontSize: data.heroDescriptionSize,
                  ...getBorderStyle(data.heroDescriptionBorderEnabled, data.heroDescriptionBorderColor, data.heroDescriptionBorderWidth, data.heroDescriptionShadowColor),
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
                <a href={data.secondaryCtaLink} className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-bold text-[13px] uppercase tracking-[0.1em] border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300">
                  {data.secondaryCtaText}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.stats.map((stat) => (
                  <div key={stat._key || stat.label} className="flex flex-col items-center gap-1 px-4 py-3 bg-white border border-gray-100">
                    <div className="text-2xl font-heading font-bold text-primary">{stat.value}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-600">{stat.label || stat.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 section-heading">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.whyWorkEyebrow}</span>
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              </div>
              <h2 
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight"
                style={{
                  color: data.whyWorkHeadingColor,
                  fontSize: data.whyWorkHeadingSize,
                  ...getBorderStyle(data.whyWorkHeadingBorderEnabled, data.whyWorkHeadingBorderColor, data.whyWorkHeadingBorderWidth, data.whyWorkHeadingShadowColor),
                }}
              >
                {data.whyWorkHeading}
              </h2>
              <p 
                className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                style={{
                  color: data.whyWorkDescriptionColor,
                  fontSize: data.whyWorkDescriptionSize,
                  ...getBorderStyle(data.whyWorkDescriptionBorderEnabled, data.whyWorkDescriptionBorderColor, data.whyWorkDescriptionBorderWidth, data.whyWorkDescriptionShadowColor),
                }}
              >
                {data.whyWorkDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(data.whyWorkCards?.length > 0 ? data.whyWorkCards : [
                { imageUrl: '/images/work-with-us.jpg', title: 'Competitive Pay', description: 'Industry-leading salaries with regular performance reviews and bonus opportunities.' },
                { imageUrl: '/images/work-with-us.webp', title: 'Training & Development', description: 'Comprehensive onboarding and ongoing training programs to help you grow your skills.' },
                { imageUrl: '/images/work-with-us.webp', title: 'Career Growth', description: 'Clear pathways for advancement within our growing company.' },
                { imageUrl: '/images/work-with-us.webp', title: 'Work-Life Balance', description: 'Flexible scheduling and supportive work environment.' },
                { imageUrl: '/images/partner-in-safety.webp', title: 'Health & Safety', description: 'Committed to maintaining the highest safety standards for all employees.' },
                { imageUrl: '/images/work-with-us.jpg', title: 'Team Culture', description: 'Join a collaborative, supportive team that values every contribution.' },
              ]).map((benefit, idx) => (
                <div key={idx} className="content-block bg-white overflow-hidden shadow-lg group">
                  <div className="gallery-item relative aspect-video overflow-hidden">
                    <img src={benefit.imageUrl} alt={benefit.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 uppercase mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Culture Section */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="section-heading">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                  <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.cultureEyebrow}</span>
                </div>
                <h2 
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6"
                  style={{
                    color: data.cultureHeadingColor,
                    fontSize: data.cultureHeadingSize,
                    ...getBorderStyle(data.cultureHeadingBorderEnabled, data.cultureHeadingBorderColor, data.cultureHeadingBorderWidth, data.cultureHeadingShadowColor),
                  }}
                >
                  {data.cultureHeading}
                </h2>
                <p 
                  className="text-gray-600 text-lg leading-relaxed mb-8"
                  style={{
                    color: data.cultureDescriptionColor,
                    fontSize: data.cultureDescriptionSize,
                    ...getBorderStyle(data.cultureDescriptionBorderEnabled, data.cultureDescriptionBorderColor, data.cultureDescriptionBorderWidth, data.cultureDescriptionShadowColor),
                  }}
                >
                  {data.cultureDescription}
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {data.values.map((value, idx) => (
                    <span key={idx} className="px-4 py-2 bg-primary/10 text-primary font-semibold text-sm uppercase tracking-wide">
                      {value}
                    </span>
                  ))}
                </div>

                <a href={data.cultureCtaLink} className="group inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:gap-4 transition-all">
                  {data.cultureCtaText}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>

              {/* Culture Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="gallery-item aspect-[4/3] overflow-hidden shadow-lg">
                    <img src={data.cultureImages?.[0]?.imageUrl || "/images/work-with-us.webp"} alt="Team Culture" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="gallery-item aspect-[4/5] overflow-hidden shadow-lg">
                    <img src={data.cultureImages?.[1]?.imageUrl || "/images/work-with-us.jpg"} alt="Work Environment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="gallery-item aspect-[4/5] overflow-hidden shadow-lg">
                    <img src={data.cultureImages?.[2]?.imageUrl || "/images/work-with-us.webp"} alt="Training" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="gallery-item aspect-[4/3] overflow-hidden shadow-lg">
                    <img src={data.cultureImages?.[3]?.imageUrl || "/images/work-with-us.jpg"} alt="Team Events" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section id="openings" className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-4 section-heading">
              <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.openingsEyebrow}</span>
            </div>
            <h2 
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-12"
              style={{
                color: data.openingsHeadingColor,
                fontSize: data.openingsHeadingSize,
                ...getBorderStyle(data.openingsHeadingBorderEnabled, data.openingsHeadingBorderColor, data.openingsHeadingBorderWidth, data.openingsHeadingShadowColor),
              }}
            >
              {data.openingsHeading}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(data.jobOpenings?.length > 0 ? data.jobOpenings : [
                { imageUrl: '/images/truck-new.jpg', title: 'Fuel Tanker Driver', location: 'Kwinana, WA', type: 'Full Time', description: 'Join our fleet as a certified tanker driver. Competitive salary, comprehensive training, and career growth opportunities.' },
                { imageUrl: '/images/fuel-stations.jpg', title: 'Station Manager', location: 'Perth, WA', type: 'Full Time', description: 'Lead operations at one of our modern fuel stations. Manage team, customer service, and daily operations.' },
                { imageUrl: '/images/what-we-do-fuel-transportation.webp', title: 'Logistics Coordinator', location: 'Kwinana, WA', type: 'Full Time', description: 'Coordinate fuel deliveries and fleet operations. Strong organizational skills and attention to detail required.' },
                { imageUrl: '/images/what-we-do-retail.webp', title: 'Customer Service Representative', location: 'Multiple Locations', type: 'Part Time / Full Time', description: 'Provide exceptional service at our fuel stations. No experience required - full training provided.' },
              ]).map((job, idx) => (
                <div key={idx} className="content-block bg-white border border-gray-100 overflow-hidden hover:border-primary/30 transition-colors shadow-sm hover:shadow-xl group">
                  <div className="gallery-item relative aspect-video overflow-hidden">
                    <img src={job.imageUrl} alt={job.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wide">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-bold text-gray-900 uppercase mb-2">{job.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {job.location}
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <a href={data.jobCtaLink} className="group/link inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide text-sm hover:gap-3 transition-all">
                      {data.jobCtaText}
                      <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Talent Rising Program */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="content-block relative">
                <div className="gallery-item relative aspect-[4/5] overflow-hidden shadow-lg">
                  <img src={data.talentRisingImageUrl || "/images/what-we-do-mining-civil.webp"} alt="Talent Rising" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-8 shadow-xl max-w-xs">
                  <div className="text-4xl font-heading font-bold mb-1">{data.talentStatValue}</div>
                  <div className="text-lg font-semibold">{data.talentStatLabel}</div>
                  <div className="text-sm text-white/80 mt-2">{data.talentStatDescription}</div>
                </div>
              </div>

              <div className="section-heading">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                  <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.talentEyebrow}</span>
                </div>
                <h2 
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6"
                  style={{
                    color: data.talentHeadingColor,
                    fontSize: data.talentHeadingSize,
                    ...getBorderStyle(data.talentHeadingBorderEnabled, data.talentHeadingBorderColor, data.talentHeadingBorderWidth, data.talentHeadingShadowColor),
                  }}
                >
                  {data.talentHeading}
                </h2>
                <p 
                  className="text-gray-600 text-lg leading-relaxed mb-8"
                  style={{
                    color: data.talentDescriptionColor,
                    fontSize: data.talentDescriptionSize,
                    ...getBorderStyle(data.talentDescriptionBorderEnabled, data.talentDescriptionBorderColor, data.talentDescriptionBorderWidth, data.talentDescriptionShadowColor),
                  }}
                >
                  {data.talentDescription}
                </p>

                <ul className="space-y-4 mb-8">
                  {data.talentFeatures.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <a href={data.talentCtaLink} className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold text-[13px] uppercase tracking-[0.1em] border-2 border-primary hover:bg-primary-dark transition-all duration-300">
                  <span>{data.talentCtaText}</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Team Gallery */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 section-heading">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.teamGalleryEyebrow}</span>
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              </div>
              <h2 
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight"
                style={{
                  color: data.teamGalleryHeadingColor,
                  fontSize: data.teamGalleryHeadingSize,
                  ...getBorderStyle(data.teamGalleryHeadingBorderEnabled, data.teamGalleryHeadingBorderColor, data.teamGalleryHeadingBorderWidth, data.teamGalleryHeadingShadowColor),
                }}
              >
                {data.teamGalleryHeading}
              </h2>
            </div>

            {/* Masonry Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-4">
                <div className="gallery-item aspect-[4/3] overflow-hidden shadow-lg"><img src={data.teamGalleryImages?.[0]?.imageUrl || "/images/work-with-us.webp"} alt="Team 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                <div className="gallery-item aspect-[3/4] overflow-hidden shadow-lg"><img src={data.teamGalleryImages?.[1]?.imageUrl || "/images/work-with-us.jpg"} alt="Team 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="gallery-item aspect-[3/4] overflow-hidden shadow-lg"><img src={data.teamGalleryImages?.[2]?.imageUrl || "/images/work-with-us.webp"} alt="Team 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                <div className="gallery-item aspect-[4/3] overflow-hidden shadow-lg"><img src={data.teamGalleryImages?.[3]?.imageUrl || "/images/work-with-us.webp"} alt="Team 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              </div>
              <div className="space-y-4">
                <div className="gallery-item aspect-square overflow-hidden shadow-lg"><img src={data.teamGalleryImages?.[4]?.imageUrl || "/images/work-with-us.jpg"} alt="Team 5" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                <div className="gallery-item aspect-square overflow-hidden shadow-lg"><img src={data.teamGalleryImages?.[5]?.imageUrl || "/images/truck-new.jpg"} alt="Team 6" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="gallery-item aspect-[3/4] overflow-hidden shadow-lg"><img src={data.teamGalleryImages?.[6]?.imageUrl || "/images/hero-truck.jpg"} alt="Team 7" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
                <div className="gallery-item aspect-[4/3] overflow-hidden shadow-lg"><img src={data.teamGalleryImages?.[7]?.imageUrl || "/images/fuel-stations.jpg"} alt="Team 8" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Environment */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 section-heading">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.officeEyebrow}</span>
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              </div>
              <h2 
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight"
                style={{
                  color: data.officeHeadingColor,
                  fontSize: data.officeHeadingSize,
                  ...getBorderStyle(data.officeHeadingBorderEnabled, data.officeHeadingBorderColor, data.officeHeadingBorderWidth, data.officeHeadingShadowColor),
                }}
              >
                {data.officeHeading}
              </h2>
              <p 
                className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                style={{
                  color: data.officeDescriptionColor,
                  fontSize: data.officeDescriptionSize,
                  ...getBorderStyle(data.officeDescriptionBorderEnabled, data.officeDescriptionBorderColor, data.officeDescriptionBorderWidth, data.officeDescriptionShadowColor),
                }}
              >
                {data.officeDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data.officeLocations?.length > 0 ? data.officeLocations : [
                { imageUrl: '/images/work-with-us.webp', title: 'Headquarters', subtitle: 'Kwinana, WA' },
                { imageUrl: '/images/work-with-us.jpg', title: 'Operations Center', subtitle: 'Perth Metro' },
                { imageUrl: '/images/what-we-do-mining-civil.webp', title: 'Regional Office', subtitle: 'Pilbara Region' },
                { imageUrl: '/images/work-with-us.webp', title: 'Training Facility', subtitle: 'Kwinana Beach' },
                { imageUrl: '/images/marine-bunkering.jpg', title: 'Port Office', subtitle: 'Fremantle' },
                { imageUrl: '/images/fuel-stations.jpg', title: 'Depot Office', subtitle: 'Multiple Locations' },
              ]).map((item, idx) => (
                <div key={idx} className="gallery-item relative aspect-[4/3] overflow-hidden shadow-lg group">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-heading font-bold text-white uppercase">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Training & Development */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 section-heading">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.trainingEyebrow}</span>
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              </div>
              <h2 
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight"
                style={{
                  color: data.trainingHeadingColor,
                  fontSize: data.trainingHeadingSize,
                  ...getBorderStyle(data.trainingHeadingBorderEnabled, data.trainingHeadingBorderColor, data.trainingHeadingBorderWidth, data.trainingHeadingShadowColor),
                }}
              >
                {data.trainingHeading}
              </h2>
              <p 
                className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                style={{
                  color: data.trainingDescriptionColor,
                  fontSize: data.trainingDescriptionSize,
                  ...getBorderStyle(data.trainingDescriptionBorderEnabled, data.trainingDescriptionBorderColor, data.trainingDescriptionBorderWidth, data.trainingDescriptionShadowColor),
                }}
              >
                {data.trainingDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="gallery-item aspect-square overflow-hidden shadow-lg"><img src={data.trainingImages?.[0]?.imageUrl || "/images/truck-new.jpg"} alt="Driver Training" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              <div className="gallery-item aspect-square overflow-hidden shadow-lg"><img src={data.trainingImages?.[1]?.imageUrl || "/images/partner-in-safety.webp"} alt="Safety Training" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              <div className="gallery-item aspect-square overflow-hidden shadow-lg"><img src={data.trainingImages?.[2]?.imageUrl || "/images/what-we-do-mining-civil.webp"} alt="Equipment Training" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              <div className="gallery-item aspect-square overflow-hidden shadow-lg"><img src={data.trainingImages?.[3]?.imageUrl || "/images/work-with-us.webp"} alt="Certification Programs" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              <div className="gallery-item aspect-square overflow-hidden shadow-lg"><img src={data.trainingImages?.[4]?.imageUrl || "/images/marine-bunkering.jpg"} alt="Leadership Training" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              <div className="gallery-item aspect-square overflow-hidden shadow-lg"><img src={data.trainingImages?.[5]?.imageUrl || "/images/what-we-do-fuel-transportation.webp"} alt="Technical Skills" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              <div className="gallery-item aspect-square overflow-hidden shadow-lg"><img src={data.trainingImages?.[6]?.imageUrl || "/images/hero-truck.jpg"} alt="First Aid Training" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
              <div className="gallery-item aspect-square overflow-hidden shadow-lg"><img src={data.trainingImages?.[7]?.imageUrl || "/images/work-with-us.webp"} alt="Ongoing Education" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" /></div>
            </div>
          </div>
        </section>

        {/* Team Events */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 section-heading">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.eventsEyebrow}</span>
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              </div>
              <h2 
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight"
                style={{
                  color: data.eventsHeadingColor,
                  fontSize: data.eventsHeadingSize,
                  ...getBorderStyle(data.eventsHeadingBorderEnabled, data.eventsHeadingBorderColor, data.eventsHeadingBorderWidth, data.eventsHeadingShadowColor),
                }}
              >
                {data.eventsHeading}
              </h2>
              <p 
                className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto"
                style={{
                  color: data.eventsDescriptionColor,
                  fontSize: data.eventsDescriptionSize,
                  ...getBorderStyle(data.eventsDescriptionBorderEnabled, data.eventsDescriptionBorderColor, data.eventsDescriptionBorderWidth, data.eventsDescriptionShadowColor),
                }}
              >
                {data.eventsDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(data.teamEvents?.length > 0 ? data.teamEvents : [
                { imageUrl: '/images/work-with-us.jpg', title: 'Team Building', subtitle: 'Annual retreats and activities' },
                { imageUrl: '/images/agriculture.webp', title: 'Community Service', subtitle: 'Local charity initiatives' },
                { imageUrl: '/images/work-with-us.webp', title: 'Award Ceremonies', subtitle: 'Celebrating excellence' },
                { imageUrl: '/images/what-we-do-retail.webp', title: 'Performance Events', subtitle: 'Showcasing our precision fleet' },
                { imageUrl: '/images/work-with-us.webp', title: 'Family Days', subtitle: 'Bringing families together' },
                { imageUrl: '/images/work-with-us.webp', title: 'Training Workshops', subtitle: 'Skill development sessions' },
              ]).map((item, idx) => (
                <div key={idx} className="gallery-item relative aspect-[4/3] overflow-hidden shadow-lg group">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-heading font-bold text-white uppercase">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Excellence Tagline */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center section-heading">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.excellenceEyebrow}</span>
            </div>
            <h2 
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-8"
              style={{
                color: data.excellenceTaglineColor,
                fontSize: data.excellenceTaglineSize,
                ...getBorderStyle(data.excellenceTaglineBorderEnabled, data.excellenceTaglineBorderColor, data.excellenceTaglineBorderWidth, data.excellenceTaglineShadowColor),
              }}
            >
              {data.excellenceTagline}
            </h2>
            <p 
              className="mt-8 text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              style={{
                color: data.excellenceContentColor,
                fontSize: data.excellenceContentSize,
                ...getBorderStyle(data.excellenceContentBorderEnabled, data.excellenceContentBorderColor, data.excellenceContentBorderWidth, data.excellenceContentShadowColor),
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

        {/* Job Application Form */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-4 justify-center">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.applicationEyebrow}</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-4 text-center">
                {data.applicationHeading}
              </h2>
              <p className="text-gray-600 text-lg text-center mb-10">
                {data.applicationDescription}
              </p>
              <form className="space-y-6 bg-white p-8 border border-gray-100 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.applicationFields.map((field, index) => (
                    <div key={field._key || field.name || index} className={field.fullWidth ? 'md:col-span-2' : ''}>
                      <label htmlFor={field.name} className="block text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">{field.label}</label>
                      {field.type === 'textarea' ? (
                        <textarea id={field.name} name={field.name} className="w-full border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:border-primary h-32" placeholder={field.placeholder} />
                      ) : (
                        <input id={field.name} name={field.name} type={field.type || 'text'} className="w-full border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none focus:border-primary" placeholder={field.placeholder} />
                      )}
                    </div>
                  ))}
                </div>
                <button type="submit" className="w-full px-8 py-4 bg-primary text-white font-bold text-[13px] uppercase tracking-[0.1em] border-2 border-primary hover:bg-primary-dark transition-all duration-300">
                  {data.applicationButtonText}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <CTABanner
        heading={siteSettings.ctaBannerHeading}
        text={siteSettings.ctaBannerText}
        buttonText={siteSettings.ctaBannerButtonText}
        buttonLink={siteSettings.ctaBannerButtonLink}
      />
    </>
  )
}
