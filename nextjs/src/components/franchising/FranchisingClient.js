'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTABanner from '@/components/shared/CTABanner'
import CmsImage from '@/components/common/CmsImage'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function FranchisingClient({ franchisingData, siteSettings }) {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('h2').forEach((heading) => {
        gsap.from(heading, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            once: true,
          },
        })
      })

      gsap.utils.toArray('.card').forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        })
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* Intro Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{franchisingData.intro.eyebrow}</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6">
                {franchisingData.intro.heading}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {franchisingData.intro.description}
              </p>
            </div>
            <div className="relative h-[400px] overflow-hidden">
              <CmsImage
                value={franchisingData.intro.image}
                fallbackSrc="/images/what-we-do-retail.webp"
                alt={franchisingData.intro.imageAlt ?? 'Atlas Fuel station opportunity'}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                ratio="3/2"
          className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Success Journey Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6">
              {franchisingData.journey.heading}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {franchisingData.journey.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {franchisingData.journey.steps.map((step, index) => (
              <div key={step._key || step.step || index} className="relative">
                <div className="bg-white border border-gray-100 shadow-sm p-6">
                  <div className="font-heading text-5xl font-bold text-primary leading-none mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 uppercase tracking-wide mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative h-[400px]">
                <CmsImage
                  value={franchisingData.training.image}
                  fallbackSrc="/images/atlas-fuel-hero-1b.webp"
                  alt={franchisingData.training.imageAlt ?? 'Atlas Fuel station opportunity training'}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  ratio="3/2"
          className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6">
                {franchisingData.training.heading}
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                {franchisingData.training.description}
              </p>
              <div className="space-y-3">
                {franchisingData.training.features.map((topic, index) => (
                  <div key={typeof topic === 'string' ? topic : topic._key || index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-gray-700">{typeof topic === 'string' ? topic : topic.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Overview */}
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight mb-6">
              {franchisingData.investment.heading}
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              {franchisingData.investment.description}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {franchisingData.investment.points.map((point, index) => (
              <div key={point._key || point.label || index} className="text-center">
                <div className="font-heading text-2xl font-bold mb-1">{point.value}</div>
                <div className="text-sm text-white/80">{point.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner data={siteSettings} />
    </div>
  )
}
