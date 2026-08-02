import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Community uses nested Sanity collections, CMS images, alts and links', () => {
  const page = read('src/app/community/page.js')
  const client = read('src/app/community/CommunityClient.js')

  assert.match(page, /sanity\?\.initiativesSection\?\.initiatives \?\?/)
  assert.match(page, /sanity\?\.impactSection\?\.stats \?\?/)
  assert.match(page, /sanity\?\.regionalSection\?\.regionalImages \?\?/)
  assert.match(client, /value=\{data\.genderEqualityImage \?\? data\.genderEqualityImageUrl\}/)
  assert.match(client, /data\.supportingLocalsCtaText && cleanLink\(data\.supportingLocalsCtaLink\)/)
  assert.match(client, /cmsTextStyle\(data, 'storyContent'\)/)
  assert.doesNotMatch(client, /<img/)
})

test('Atlas Car Racing keeps arrays, media, captions, icons and CTAs CMS-driven', () => {
  const page = read('src/app/atlas-car-racing/page.js')
  const client = read('src/app/atlas-car-racing/AtlasCarRacingClient.js')

  assert.match(page, /sanity\?\.gallerySection\?\.images \?\? sanity\?\.galleryImages/)
  assert.match(page, /sanity\?\.contactSection\?\.methods \?\? sanity\?\.contactMethods/)
  assert.match(client, /value=\{item\.image \?\? item\.imageUrl\}/)
  assert.match(client, /item\.featured \?\? \(index === 0\)/)
  assert.match(client, /icons\[iconName\]/)
  assert.match(client, /data\.sponsorshipCtaText && cleanLink\(data\.sponsorshipCtaLink\)/)
  assert.doesNotMatch(client, /<img/)
})

test('Commercial Diesel wires style fields, empty arrays, images and CTA labels', () => {
  const page = read('src/app/commercial-diesel/page.js')
  const transportation = read('src/components/commercial/TransportationSector.js')
  const compliance = read('src/components/commercial/ComplianceSection.js')
  const componentPaths = [
    'Agriculture.js',
    'BunkerRefuelingSection.js',
    'CommercialHero.js',
    'ComplianceSection.js',
    'DoYouKnow.js',
    'IndustriesGrid.js',
    'MiningSector.js',
    'OwnStation.js',
    'SectorsCover.js',
    'TransportationSector.js',
    'WhatWeOffer.js',
  ]

  assert.match(page, /industries: data\.industries \?\? fallbackIndustries\.industries/)
  assert.match(page, /headingColor: data\.transportationHeadingColor/)
  assert.match(page, /descriptionColor: data\.complianceContentColor/)
  assert.match(transportation, /const ctaText = data\.ctaText \?\? 'Get a Quote'/)
  assert.match(transportation, /\{ctaText\}/)
  assert.match(compliance, /tab\.image &&/)
  assert.match(compliance, /const activeId =/)

  for (const path of componentPaths) {
    assert.doesNotMatch(
      read(`src/components/commercial/${path}`),
      /<img/,
      `${path} must use CmsImage for CMS media`,
    )
  }
})
