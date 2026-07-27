'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const fallbackPoints = [
  '100% Australian owned and operated',
  'Nationwide fuel delivery network',
  'World-class service stations',
  'Commitment to safety and sustainability',
]

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

export default function About({ data = {} }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const taglineRef = useRef(null)
  const contentRef = useRef(null)
  const imageGridRef = useRef(null)
  const keyPointsRef = useRef(null)
  const keyPointRefs = useRef([])

  const tagline = data?.tagline || 'Unrivalled. Unmatched. Unstoppable.'
  const heading = data?.heading || 'About Us'
  const body =
    data?.body ||
    'These three words capture the spirit of Atlas Fuel and the people who drive it forward every day. We stand unrivalled in our commitment to quality, unmatched in our ability to deliver reliable fuel solutions nationwide, and unstoppable in our pursuit of growth, innovation, and excellence.'
  // Use Sanity keyPoints if provided (even if empty), fallback only if null/undefined
  const keyPoints =
    data?.keyPoints !== null && data?.keyPoints !== undefined
      ? data.keyPoints
      : fallbackPoints
  const image1Url = data?.image1Url || '/images/what-we-do-fuel-transportation.webp'
  const image2Url = data?.image2Url || '/images/hero-trucks.jpg'
  const stat1Value = data?.stat1Value || '2015'
  const stat1Label = data?.stat1Label || 'Established'
  const stat2Value = data?.stat2Value || '100M+'
  const stat2Label = data?.stat2Label || 'Litres Delivered'

  // Intersection Observer for initial reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!isVisible) return

    let ctx

    const initGSAP = async () => {
      const gsapModule = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      const gsap = gsapModule.gsap
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Tagline reveal
        if (taglineRef.current) {
          gsap.fromTo(
            taglineRef.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: taglineRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        }

        // Left content slides in from left
        if (contentRef.current) {
          gsap.fromTo(
            contentRef.current,
            { opacity: 0, x: -80 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: contentRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          )
        }

        // Right image grid slides in from right
        if (imageGridRef.current) {
          gsap.fromTo(
            imageGridRef.current,
            { opacity: 0, x: 80 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'power3.out',
              delay: 0.2,
              scrollTrigger: {
                trigger: imageGridRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          )
        }

        // Staggered key points reveal
        if (keyPointRefs.current.length > 0) {
          gsap.fromTo(
            keyPointRefs.current,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: keyPointsRef.current,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      }, sectionRef)
    }

    initGSAP()

    return () => {
      if (ctx) ctx.revert()
    }
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      id="about"
className="py-16 lg:py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Tagline */}
        <div ref={taglineRef} className="text-center mb-16">
          <span className={`${data?.taglineColor || "text-primary"} text-sm font-bold uppercase tracking-[0.2em]`} style={getStyle(data, 'tagline')}>
            {tagline}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div ref={contentRef}>
            <h2 className={`${data?.headingColor || "text-black"} text-3xl md:text-4xl lg:text-5xl font-heading mb-6 leading-tight uppercase tracking-tight`} style={getStyle(data, 'heading')}>
              {heading}
            </h2>

            <p className={`${data?.bodyColor || "text-gray-500"} text-lg leading-relaxed mb-8`} style={getStyle(data, 'body')}>
              {body}
            </p>

            <div ref={keyPointsRef} className="space-y-3 mb-8">
              {keyPoints.map((point, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    keyPointRefs.current[index] = el
                  }}
                  className="flex items-center gap-3"
                >
                  <svg
                    className="w-5 h-5 text-primary flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span className="text-black">{point}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 font-bold uppercase tracking-wide hover:gap-4 transition-all"
            >
              <span className={data?.ctaTextColor || "text-primary"} style={getStyle(data, 'ctaText')}>Read More</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Right: Image Grid with Stat Cards */}
          <div ref={imageGridRef} className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[4/5] overflow-hidden shadow-lg">
                  <img
                    src={image1Url}
                    alt={data?.image1Alt || "Atlas Fuel depot"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="bg-primary text-white p-6">
                  <div className="text-4xl font-heading font-bold mb-1" style={getStyle(data, 'stat1Value')}>
                    {stat1Value}
                  </div>
                  <div className="text-sm text-white/80" style={getStyle(data, 'stat1Label')}>{stat1Label}</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-primary-dark text-white p-6">
                  <div className="text-4xl font-heading font-bold mb-1" style={getStyle(data, 'stat2Value')}>
                    {stat2Value}
                  </div>
                  <div className="text-sm text-white/70" style={getStyle(data, 'stat2Label')}>{stat2Label}</div>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden shadow-lg">
                  <img
                    src={image2Url}
                    alt={data?.image2Alt || "Atlas Fuel fleet"}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
            {/* Decorative blur */}
          </div>
        </div>
      </div>
    </section>
  )
}
