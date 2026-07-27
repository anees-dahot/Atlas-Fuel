'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTABanner from '@/components/shared/CTABanner'
import MarineFeatures from '@/components/marine/MarineFeatures'
import MarineIntro from '@/components/marine/MarineIntro'
import MarineCommercial from '@/components/marine/MarineCommercial'
import MarineCompliance from '@/components/marine/MarineCompliance'
import MarineFleetCompliance from '@/components/marine/MarineFleetCompliance'
import MarineDriversCompliance from '@/components/marine/MarineDriversCompliance'
import EnquireSection from '@/components/services/EnquireSection'
import MarineHero from '@/components/marine/MarineHero'
import ProcessTimeline from '@/components/services/ProcessTimeline'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function MarineFuelClient({ hero, features, intro, commercial, compliance, process, enquire, fleet, drivers, siteSettings }) {
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
        <MarineHero data={hero} />
        <MarineFeatures data={features} />
        <MarineIntro data={intro} />
        <MarineCommercial data={commercial} />
        <MarineCompliance data={compliance} />
        <MarineFleetCompliance data={fleet} />
        <MarineDriversCompliance data={drivers} />
        <ProcessTimeline data={process} />
        <EnquireSection data={enquire} />
        <CTABanner data={siteSettings} />
      </main>
    </>
  )
}
