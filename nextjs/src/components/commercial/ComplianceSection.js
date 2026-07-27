'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function ComplianceSection({ data = {} }) {
  const sectionRef = useRef(null)
  const [activeTab, setActiveTab] = useState('atlas')
  
  const complianceTabs = data.certifications ? data.certifications.map((cert, index) => ({
    id: index.toString(),
    title: cert.name,
    content: cert.label
  })) : [
    {
      id: 'atlas',
      title: 'Atlas Compliance',
      content: 'At Atlas Fuel, compliance is more than a requirement — it\'s the foundation of how we operate. We uphold the highest standards of safety, quality, and accountability through rigorous adherence to ISO certifications, WAHVA standards, and all regulatory obligations. Our commitment to compliance ensures trust with our partners, protection for our people, and responsible business practices that support every community we serve across Australia.'
    },
    {
      id: 'fleet',
      title: 'Fleet Compliance',
      content: 'Atlas Fuel\'s fleet compliance sets the benchmark for safety, reliability, and professionalism on every journey nationwide. By meeting WAHVA standards and strict regulatory requirements, our vehicles and drivers operate with full accountability, ensuring trust, efficiency, sustainability, and consistent performance across Australia\'s diverse roads, industries, communities, environments, and future growth opportunities everywhere.'
    },
    {
      id: 'drivers',
      title: 'Drivers Compliance',
      content: 'At Atlas Fuel, driver compliance is the cornerstone of our safe, dependable, and responsible operations. By following WAHVA standards, national regulations, and continuous training initiatives, our drivers embody professionalism and consistency, delivering trusted service, operational efficiency, and sustainable performance across Australia\'s roads, sectors, communities, environments, and future opportunities.'
    }
  ]
  
  const heading = data.heading || 'Atlas Compliance'
  const description = data.description || 'Atlas Fuel stands proudly certified across ISO, WAHVA, and regulatory standards, proving our unwavering commitment to quality, safety, and responsible operations.'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cs-header', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      })
      gsap.from('.cs-tabs', { opacity: 0, y: 50, duration: 1, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="cs-header text-center mb-12">
          <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">{data.eyebrow || 'Standards & Safety'}</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-tight mb-6">{heading}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="cs-tabs">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {complianceTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-bold uppercase tracking-wide transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 lg:p-12 border border-gray-100 shadow-sm">
            {complianceTabs.map((tab) => (
              <div
                key={tab.id}
                className={`transition-all duration-500 ${
                  activeTab === tab.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-wide mb-6">{tab.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{tab.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
