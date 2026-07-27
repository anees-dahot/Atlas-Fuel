'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TiltCard from '@/components/shared/TiltCard'
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

export default function AboutStory({ data = {} }) {
  const sectionRef = useRef(null)

  const tagline = data.tagline || 'Unrivalled. Unmatched. Unstoppable.'
  const taglineColor = data.taglineColor || 'text-primary'
  const taglineSize = data.taglineSize ? { fontSize: sizeMap[data.taglineSize] } : {}
  const taglineBorderEnabled = data.taglineBorderEnabled || false
  const taglineBorderColor = data.taglineBorderColor || '#000000'
  const taglineBorderWidth = data.taglineBorderWidth || '1px'
  const taglineShadowColor = data.taglineShadowColor || ''
  const taglineStyle = {
    ...taglineSize,
    ...(taglineBorderEnabled && {
      WebkitTextStroke: `${taglineBorderWidth} ${taglineBorderColor}`,
      ...(taglineShadowColor && { textShadow: `0 0 10px ${taglineShadowColor}` }),
    }),
  }

  const heading = data.heading || 'Our Story'
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

  const body = data.body || "Atlas Fuel has been proudly serving Australia since 2010. From a single independently operated service station, we've grown into one of Australia's most trusted fuel companies. Our commitment to quality, reliability, and customer service has driven our expansion across the nation."
  const bodyColor = data.bodyColor || 'text-gray-600'
  const bodySize = data.bodySize ? { fontSize: sizeMap[data.bodySize] } : {}
  const bodyBorderEnabled = data.bodyBorderEnabled || false
  const bodyBorderColor = data.bodyBorderColor || '#000000'
  const bodyBorderWidth = data.bodyBorderWidth || '1px'
  const bodyShadowColor = data.bodyShadowColor || ''
  const bodyStyle = {
    ...bodySize,
    ...(bodyBorderEnabled && {
      WebkitTextStroke: `${bodyBorderWidth} ${bodyBorderColor}`,
      ...(bodyShadowColor && { textShadow: `0 0 10px ${bodyShadowColor}` }),
    }),
  }

  const keyPoints = data.keyPoints || [
    '100% Australian owned and operated',
    'Nationwide fuel delivery network',
    'World-class service stations',
    'Commitment to safety and sustainability'
  ]
  const image1Url = data.image1Url || '/images/about-us.jpg'
  const image2Url = data.image2Url || '/images/our-story.webp'
  
  const stat1Value = data.stat1Value || '2010'
  const stat1ValueColor = data.stat1ValueColor || 'text-primary'
  const stat1ValueSize = data.stat1ValueSize ? { fontSize: sizeMap[data.stat1ValueSize] } : {}
  const stat1ValueBorderEnabled = data.stat1ValueBorderEnabled || false
  const stat1ValueBorderColor = data.stat1ValueBorderColor || '#000000'
  const stat1ValueBorderWidth = data.stat1ValueBorderWidth || '1px'
  const stat1ValueShadowColor = data.stat1ValueShadowColor || ''
  const stat1ValueStyle = {
    ...stat1ValueSize,
    ...(stat1ValueBorderEnabled && {
      WebkitTextStroke: `${stat1ValueBorderWidth} ${stat1ValueBorderColor}`,
      ...(stat1ValueShadowColor && { textShadow: `0 0 10px ${stat1ValueShadowColor}` }),
    }),
  }
  
  const stat1Label = data.stat1Label || 'Established'
  const stat1LabelColor = data.stat1LabelColor || 'text-gray-500'
  const stat1LabelSize = data.stat1LabelSize ? { fontSize: sizeMap[data.stat1LabelSize] } : {}
  const stat1LabelBorderEnabled = data.stat1LabelBorderEnabled || false
  const stat1LabelBorderColor = data.stat1LabelBorderColor || '#000000'
  const stat1LabelBorderWidth = data.stat1LabelBorderWidth || '1px'
  const stat1LabelShadowColor = data.stat1LabelShadowColor || ''
  const stat1LabelStyle = {
    ...stat1LabelSize,
    ...(stat1LabelBorderEnabled && {
      WebkitTextStroke: `${stat1LabelBorderWidth} ${stat1LabelBorderColor}`,
      ...(stat1LabelShadowColor && { textShadow: `0 0 10px ${stat1LabelShadowColor}` }),
    }),
  }
  
  const stat2Value = data.stat2Value || '100M+'
  const stat2ValueColor = data.stat2ValueColor || 'text-primary'
  const stat2ValueSize = data.stat2ValueSize ? { fontSize: sizeMap[data.stat2ValueSize] } : {}
  const stat2ValueBorderEnabled = data.stat2ValueBorderEnabled || false
  const stat2ValueBorderColor = data.stat2ValueBorderColor || '#000000'
  const stat2ValueBorderWidth = data.stat2ValueBorderWidth || '1px'
  const stat2ValueShadowColor = data.stat2ValueShadowColor || ''
  const stat2ValueStyle = {
    ...stat2ValueSize,
    ...(stat2ValueBorderEnabled && {
      WebkitTextStroke: `${stat2ValueBorderWidth} ${stat2ValueBorderColor}`,
      ...(stat2ValueShadowColor && { textShadow: `0 0 10px ${stat2ValueShadowColor}` }),
    }),
  }
  
  const stat2Label = data.stat2Label || 'Litres Delivered'
  const stat2LabelColor = data.stat2LabelColor || 'text-gray-500'
  const stat2LabelSize = data.stat2LabelSize ? { fontSize: sizeMap[data.stat2LabelSize] } : {}
  const stat2LabelBorderEnabled = data.stat2LabelBorderEnabled || false
  const stat2LabelBorderColor = data.stat2LabelBorderColor || '#000000'
  const stat2LabelBorderWidth = data.stat2LabelBorderWidth || '1px'
  const stat2LabelShadowColor = data.stat2LabelShadowColor || ''
  const stat2LabelStyle = {
    ...stat2LabelSize,
    ...(stat2LabelBorderEnabled && {
      WebkitTextStroke: `${stat2LabelBorderWidth} ${stat2LabelBorderColor}`,
      ...(stat2LabelShadowColor && { textShadow: `0 0 10px ${stat2LabelShadowColor}` }),
    }),
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ast-tagline', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } })
      gsap.from('.ast-heading', { opacity: 0, y: 40, duration: 1, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } })
      gsap.from('.ast-body', { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: '.ast-content', start: 'top 80%', once: true } })
      gsap.from('.ast-point', { opacity: 0, x: -20, duration: 0.6, stagger: 0.1, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: '.ast-points', start: 'top 85%', once: true } })
      gsap.from('.ast-image', { opacity: 0, scale: 0.9, duration: 1, stagger: 0.2, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: '.ast-images', start: 'top 80%', once: true } })
      gsap.from('.ast-stat', { opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'back.out(1.2)', immediateRender: false,
        scrollTrigger: { trigger: '.ast-stats', start: 'top 85%', once: true } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-primary" />
            <span className={`ast-tagline ${taglineColor} text-sm font-bold uppercase tracking-widest`} style={taglineStyle}>{tagline}</span>
            <div className="w-12 h-0.5 bg-primary" />
          </div>
          <h2 className={`ast-heading ${headingColor} text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-tight`} style={headingStyle}>
            {heading}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="ast-content">
            <p className={`ast-body ${bodyColor} text-lg md:text-xl leading-relaxed mb-8 font-light`} style={bodyStyle}>
              {body}
            </p>

            {/* Key Points */}
            <div className="ast-points space-y-4 mb-10">
              {keyPoints.map((point, i) => (
                <div key={i} className="ast-point flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{point}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="ast-stats flex gap-12 pt-8 border-t border-gray-200">
              <div className="ast-stat">
                <div className={`${stat1ValueColor} text-4xl md:text-5xl font-heading font-bold`} style={stat1ValueStyle}>{stat1Value}</div>
                <div className={`${stat1LabelColor} text-sm uppercase tracking-wider mt-1`} style={stat1LabelStyle}>{stat1Label}</div>
              </div>
              <div className="ast-stat">
                <div className={`${stat2ValueColor} text-4xl md:text-5xl font-heading font-bold`} style={stat2ValueStyle}>{stat2Value}</div>
                <div className={`${stat2LabelColor} text-sm uppercase tracking-wider mt-1`} style={stat2LabelStyle}>{stat2Label}</div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="ast-images relative">
            <TiltCard tiltAmount={5} className="relative z-10">
              <div className="ast-image relative overflow-hidden shadow-lg">
                <img src={image1Url} alt="Atlas Fuel Operations" className="w-full h-80 object-cover" />
              </div>
            </TiltCard>
            <TiltCard tiltAmount={8} className="absolute -bottom-8 -left-8 w-48 z-20">
              <div className="ast-image relative overflow-hidden shadow-lg border-4 border-white">
                <img src={image2Url} alt="Atlas Fuel Fleet" className="w-full h-32 object-cover" />
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  )
}
