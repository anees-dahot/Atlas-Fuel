'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTABanner from '@/components/shared/CTABanner'
import ServiceHero from '@/components/services/ServiceHero'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function CommunityClient({ data, siteSettings }) {
  const getBorderStyle = (enabled, color, width, shadow) => {
    if (!enabled) return {}
    return {
      border: `${width} solid ${color}`,
      boxShadow: shadow ? `0 0 10px ${shadow}` : 'none',
    }
  }

  const hero = {
    subtitle: data.heroSubtitle,
    title: data.heroTitle,
    description: data.heroDescription,
    heroImageUrl: data.heroImageUrl,
  }

  const initiatives = {
    heading: data.initiativesHeading,
    initiatives: data.initiatives,
  }

  const impact = {
    heading: data.impactHeading,
    stats: data.stats,
  }

  const story = {
    heading: data.storyHeading,
    content: data.storyContent,
    imageUrl: data.storyImageUrl,
  }

  return (
    <>
      <main>
        <ServiceHero data={hero} />
        
        {/* Initiatives Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.initiativesEyebrow}</span>
            </div>
            <h2 
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-12 text-center"
              style={{
                color: data.initiativesHeadingColor,
                fontSize: data.initiativesHeadingSize,
                ...getBorderStyle(data.initiativesHeadingBorderEnabled, data.initiativesHeadingBorderColor, data.initiativesHeadingBorderWidth, data.initiativesHeadingShadowColor),
              }}
            >
              {initiatives.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {initiatives.initiatives.map((initiative, index) => (
                <div key={initiative._key || initiative.title || index} className="bg-gray-50 p-6 text-center hover:shadow-lg transition-shadow">
                  {initiative.imageUrl ? (
                    <img src={initiative.imageUrl} alt={initiative.imageAlt || initiative.title} className="w-16 h-16 object-cover mx-auto mb-4" />
                  ) : (
                    <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{initiative.title}</h3>
                  <p className="text-gray-600">{initiative.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gender Equality */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                  <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.genderEqualityEyebrow}</span>
                </div>
                <h2 
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6"
                  style={{
                    color: data.genderEqualityHeadingColor,
                    fontSize: data.genderEqualityHeadingSize,
                    ...getBorderStyle(data.genderEqualityHeadingBorderEnabled, data.genderEqualityHeadingBorderColor, data.genderEqualityHeadingBorderWidth, data.genderEqualityHeadingShadowColor),
                  }}
                >
                  {data.genderEqualityHeading}
                </h2>
                <p 
                  className="text-gray-600 text-lg leading-relaxed mb-4"
                  style={{
                    color: data.genderEqualityDescriptionColor,
                    fontSize: data.genderEqualityDescriptionSize,
                    ...getBorderStyle(data.genderEqualityDescriptionBorderEnabled, data.genderEqualityDescriptionBorderColor, data.genderEqualityDescriptionBorderWidth, data.genderEqualityDescriptionShadowColor),
                  }}
                >
                  {data.genderEqualityDescription}
                </p>
              </div>
              <div className="relative h-[400px] overflow-hidden">
                <img src={data.genderEqualityImageUrl} alt="Gender Equality at Atlas Fuel" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight mb-12 text-center"
              style={{
                color: data.impactHeadingColor,
                fontSize: data.impactHeadingSize,
                ...getBorderStyle(data.impactHeadingBorderEnabled, data.impactHeadingBorderColor, data.impactHeadingBorderWidth, data.impactHeadingShadowColor),
              }}
            >
              {impact.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impact.stats.map((stat, index) => (
                <div key={stat._key || stat.label || index} className="text-center">
                  <div className="text-5xl lg:text-6xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm opacity-80">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supporting Locals */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] overflow-hidden">
                <img src={data.supportingLocalsImageUrl} alt="Supporting Local Communities" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                  <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.supportingLocalsEyebrow}</span>
                </div>
                <h2 
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6"
                  style={{
                    color: data.supportingLocalsHeadingColor,
                    fontSize: data.supportingLocalsHeadingSize,
                    ...getBorderStyle(data.supportingLocalsHeadingBorderEnabled, data.supportingLocalsHeadingBorderColor, data.supportingLocalsHeadingBorderWidth, data.supportingLocalsHeadingShadowColor),
                  }}
                >
                  {data.supportingLocalsHeading}
                </h2>
                <p 
                  className="text-gray-600 text-lg leading-relaxed mb-6"
                  style={{
                    color: data.supportingLocalsDescriptionColor,
                    fontSize: data.supportingLocalsDescriptionSize,
                    ...getBorderStyle(data.supportingLocalsDescriptionBorderEnabled, data.supportingLocalsDescriptionBorderColor, data.supportingLocalsDescriptionBorderWidth, data.supportingLocalsDescriptionShadowColor),
                  }}
                >
                  {data.supportingLocalsDescription}
                </p>
                <a href={data.supportingLocalsCtaLink} className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold text-[13px] uppercase tracking-[0.1em] border-2 border-primary hover:bg-primary-dark transition-all duration-300">
                  {data.supportingLocalsCtaText}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Communities */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.regionalEyebrow}</span>
              </div>
              <h2 
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-4"
                style={{
                  color: data.regionalHeadingColor,
                  fontSize: data.regionalHeadingSize,
                  ...getBorderStyle(data.regionalHeadingBorderEnabled, data.regionalHeadingBorderColor, data.regionalHeadingBorderWidth, data.regionalHeadingShadowColor),
                }}
              >
                {data.regionalHeading}
              </h2>
              <p className="text-gray-900 font-bold text-xl mb-4">{data.regionalSubtitle}</p>
              <p 
                className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed"
                style={{
                  color: data.regionalDescriptionColor,
                  fontSize: data.regionalDescriptionSize,
                  ...getBorderStyle(data.regionalDescriptionBorderEnabled, data.regionalDescriptionBorderColor, data.regionalDescriptionBorderWidth, data.regionalDescriptionShadowColor),
                }}
              >
                {data.regionalDescription}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.regionalImages.map((item, index) => (
                <div key={item._key || item.alt || index} className="relative h-64 overflow-hidden">
                  <img src={item.imageUrl} alt={item.alt || item.imageAlt || ''} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6"
                  style={{
                    color: data.storyHeadingColor,
                    fontSize: data.storyHeadingSize,
                    ...getBorderStyle(data.storyHeadingBorderEnabled, data.storyHeadingBorderColor, data.storyHeadingBorderWidth, data.storyHeadingShadowColor),
                  }}
                >
                  {story.heading}
                </h2>
                <p 
                  className="text-gray-600 text-lg leading-relaxed mb-6"
                  style={{
                    color: data.storyContentColor,
                    fontSize: data.storyContentSize,
                    ...getBorderStyle(data.storyContentBorderEnabled, data.storyContentBorderColor, data.storyContentBorderWidth, data.storyContentShadowColor),
                  }}
                >
                  {story.content}
                </p>
              </div>
              <div className="relative h-[400px] bg-gray-100 overflow-hidden">
                <img
                  src={story.imageUrl}
                  alt="Community"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <CTABanner data={siteSettings} />
      </main>
    </>
  )
}
