import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('service landing passes complete CMS card and statistics data', () => {
  const page = read('src/app/services/page.js')
  const stats = read('src/components/services/AnimatedStatsSection.js')

  assert.match(page, /id:\s*s\.id/)
  assert.match(page, /fullDescription:\s*s\.fullDescription/)
  assert.match(page, /stats:\s*Array\.isArray\(s\.stats\)/)
  assert.match(stats, /function AnimatedStatsSection\(\{ data = \{\} \}\)/)
  assert.match(stats, /Array\.isArray\(data\.stats\)/)
})

test('fallback-only service sections now receive CMS data', () => {
  const mining = read('src/app/services/mining-fuel/MiningFuelClient.js')
  const retailers = read('src/app/services/fuel-retailers/FuelRetailersClient.js')

  assert.match(mining, /<ExcellenceSection data=\{excellence\}/)
  assert.match(retailers, /<ProcessTimeline data=\{process\}/)
})

test('shared service content, links, images and arrays are data-driven', () => {
  const safety = read('src/components/services/SafetySection.js')
  const fleet = read('src/components/services/FleetCompliance.js')
  const drivers = read('src/components/services/DriversCompliance.js')
  const timeline = read('src/components/services/ProcessTimeline.js')

  assert.match(safety, /Array\.isArray\(data\.cards\)/)
  assert.match(safety, /href=\{ctaLink\}/)
  assert.match(fleet, /Array\.isArray\(data\.features\)/)
  assert.match(drivers, /Array\.isArray\(data\.requirements\)/)
  assert.match(drivers, /<CmsImage/)
  assert.match(timeline, /step\.imageAlt \?\? step\.imageUrlAlt/)
  assert.doesNotMatch(timeline, /<img/)
})

test('service collections preserve authored empty arrays and CMS images keep crop data', () => {
  const showcase = read('src/components/services/ServicesShowcase.js')
  const industries = read('src/components/services/VisualIndustriesGrid.js')
  const onsite = read('src/components/services/OnsiteIntro.js')
  const marine = read('src/components/marine/MarineIntro.js')
  const cmsImage = read('src/components/common/CmsImage.js')

  assert.match(showcase, /Array\.isArray\(data\.services\)/)
  assert.match(industries, /Array\.isArray\(data\.industries\)/)
  assert.match(onsite, /value=\{images\[0\]\?\.image/)
  assert.match(marine, /value=\{data\.imageImage \?\? data\.image/)
  assert.doesNotMatch(showcase, /<img/)
  assert.doesNotMatch(onsite, /<img/)
  assert.doesNotMatch(marine, /<img/)
  assert.match(cmsImage, /resolveSource\(imageValue, width, height\)/)
  assert.match(cmsImage, /const imageValue = value \?\? src/)
  assert.match(cmsImage, /imageValue == null\s*\? fallbackSrc/)
  assert.doesNotMatch(cmsImage, /resolveSource\(imageValue[^)]*\)\s*\|\|\s*fallbackSrc/)
})

test('service presentation controls preserve intentional blank values', () => {
  const page = read('src/app/services/page.js')

  assert.match(page, /subtitleColor: sanity\?\.heroSection\?\.subtitleColor \?\? 'text-primary'/)
  assert.match(page, /titleColor: s\.titleColor \?\? 'text-gray-900'/)
  assert.doesNotMatch(page, /sanity\?\.[^\n]+\|\|/)
})
