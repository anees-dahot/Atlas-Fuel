'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTABanner from '@/components/shared/CTABanner'
import ServiceHero from '@/components/services/ServiceHero'
import AgricultureSection from '@/components/services/AgricultureSection'
import ServiceFeatures from '@/components/services/ServiceFeatures'
import ProcessTimeline from '@/components/services/ProcessTimeline'
import ExcellenceSection from '@/components/services/ExcellenceSection'
import SafetySection from '@/components/services/SafetySection'
import ComplianceSection from '@/components/services/ComplianceSection'
import FleetCompliance from '@/components/services/FleetCompliance'
import DriversCompliance from '@/components/services/DriversCompliance'
import DieselHarvests from '@/components/services/DieselHarvests'
import SustainableFueling from '@/components/services/SustainableFueling'
import EquipmentGrowth from '@/components/services/EquipmentGrowth'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function AgricultureFuelClient({ hero, agricultureSection, features, process, excellence, equipmentGrowth, dieselHarvests, sustainableFueling, safety, compliance, fleet, drivers, siteSettings }) {
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
        <AgricultureSection data={agricultureSection} />
        <ServiceFeatures data={features} />
        <ProcessTimeline data={process} />
        <ExcellenceSection data={excellence} />
        <EquipmentGrowth data={equipmentGrowth} />
        <DieselHarvests data={dieselHarvests} />
        <SustainableFueling data={sustainableFueling} />
        <SafetySection data={safety} />
        <ComplianceSection data={compliance} />
        <FleetCompliance data={fleet} />
        <DriversCompliance data={drivers} />
        <CTABanner data={siteSettings} />
      </main>
    </>
  )
}
