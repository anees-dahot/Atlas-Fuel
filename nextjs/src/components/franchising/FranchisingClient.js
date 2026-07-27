'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTABanner from '@/components/shared/CTABanner'

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

  const iconPaths = {
    chart: <><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></>,
    graduation: <><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></>,
    support: <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    megaphone: <><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></>,
    truck: <><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
    map: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>
  }

  return (
    <>
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
              <img
                src={franchisingData.intro.imageUrl}
                alt="Atlas Fuel Franchise"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6">
              {franchisingData.benefitsHeading}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {franchisingData.benefitsDescription}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {franchisingData.benefits.map((benefit, index) => (
              <div
                key={benefit._key || benefit.title || index}
                className="card bg-white p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    {iconPaths[benefit.icon] || iconPaths.chart}
                  </svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-gray-900 uppercase tracking-wide mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
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
              <img
                src={franchisingData.training.imageUrl}
                alt="Training"
                className="w-full h-[400px] object-cover"
              />
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

      {/* International Enquiries */}
      <section className="py-16 lg:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
            <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{franchisingData.international.eyebrow}</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-4">
            {franchisingData.international.heading}
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {franchisingData.international.description}
          </p>
          <a
            href={franchisingData.international.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold text-[13px] uppercase tracking-[0.1em] border-2 border-primary hover:bg-primary-dark transition-all duration-300"
          >
            {franchisingData.international.buttonText}: {franchisingData.international.whatsappNumber}
          </a>
        </div>
      </section>
    </>
  )
}
