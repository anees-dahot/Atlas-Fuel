'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTABanner from '@/components/shared/CTABanner'
import StationHero from '@/components/fuel-stations/StationHero'
import RetailIntro from '@/components/fuel-stations/RetailIntro'
import PremiumProductsIntro from '@/components/fuel-stations/PremiumProductsIntro'
import IndependentDealers from '@/components/fuel-stations/IndependentDealers'
import ImageGallery from '@/components/fuel-stations/ImageGallery'
import FuelTypes from '@/components/fuel-stations/FuelTypes'
import StationsStats from '@/components/fuel-stations/StationsStats'
import StationService from '@/components/fuel-stations/StationService'
import DieselSection from '@/components/fuel-stations/DieselSection'
import StationFeatures from '@/components/fuel-stations/StationFeatures'
import ExcellenceSection from '@/components/services/ExcellenceSection'
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

export default function FuelStationsClient({ hero, retailIntro, premiumIntro, independentDealers, imageGallery, stationService, fuelTypes, stats, dieselSection, stationFeatures, excellence, siteSettings }) {
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
        <StationHero data={hero} />
        <RetailIntro data={retailIntro} />
        <PremiumProductsIntro data={premiumIntro} />
        <IndependentDealers data={independentDealers} />
        <ImageGallery data={imageGallery} />
        <StationService data={stationService} />
        <FuelTypes data={fuelTypes} products={fuelTypes.fuelTypes} />
        <StationsStats data={stats} />
        <DieselSection data={dieselSection} />
        <StationFeatures data={stationFeatures} />
        <ExcellenceSection data={excellence} />
        <CTABanner data={siteSettings} />
      </main>
    </>
  )
}
