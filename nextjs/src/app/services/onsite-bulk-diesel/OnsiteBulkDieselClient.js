'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTABanner from '@/components/shared/CTABanner'
import ServiceHero from '@/components/services/ServiceHero'
import ServiceFeatures from '@/components/services/ServiceFeatures'
import ProcessTimeline from '@/components/services/ProcessTimeline'
import ExcellenceSection from '@/components/services/ExcellenceSection'
import SafetySection from '@/components/services/SafetySection'
import ComplianceSection from '@/components/services/ComplianceSection'
import FleetCompliance from '@/components/services/FleetCompliance'
import DriversCompliance from '@/components/services/DriversCompliance'
import OnsiteIntro from '@/components/services/OnsiteIntro'
import OnsiteFeatures from '@/components/services/OnsiteFeatures'
import OnsitePartner from '@/components/services/OnsitePartner'
import EnquireSection from '@/components/services/EnquireSection'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function OnsiteBulkDieselClient({ hero, onsiteIntro, features, process, excellence, partner, safety, compliance, fleet, drivers, enquire, siteSettings }) {
  const pageRef = useRef(null)

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
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <main ref={pageRef}>
        <ServiceHero data={hero} />
        <OnsiteIntro data={onsiteIntro} />
        <OnsiteFeatures data={features} />
        <ProcessTimeline data={process} />
        <ExcellenceSection data={excellence} />
        <OnsitePartner data={partner} />
        <SafetySection data={safety} />
        <ComplianceSection data={compliance} />
        <FleetCompliance data={fleet} />
        <DriversCompliance data={drivers} />
        <EnquireSection data={enquire} />
        <CTABanner data={siteSettings} />
      </main>
    </>
  )
}
