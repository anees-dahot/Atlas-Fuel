import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {test} from 'node:test'

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('About keeps visible labels, image alt text and arrays CMS-driven', () => {
  const page = read('src/app/about/page.js')
  const hero = read('src/components/about/AboutHero.js')
  const values = read('src/components/about/AboutValues.js')
  const safety = read('src/components/about/AboutSafety.js')
  const coreValues = read('src/components/about/AboutCoreValues.js')
  const culture = read('src/components/about/AboutCulture.js')
  const excellence = read('src/components/about/AboutExcellence.js')

  assert.match(page, /eyebrow: "What We Offer"/)
  assert.match(page, /imageOverlayLabel: "ISO Certified Operations"/)
  assert.match(values, /\{eyebrow\}/)
  assert.match(safety, /\{imageOverlayLabel\}/)
  assert.match(coreValues, /\{eyebrow\}/)
  assert.match(culture, /data\.imageAlt/)
  assert.match(excellence, /data\.excellenceBgAlt/)
  assert.doesNotMatch(hero, /description=\{/)
  assert.doesNotMatch(hero, /stats=\{/)
})

test('Fuel Stations preserves intentionally empty CMS text and collections', () => {
  const page = read('src/app/fuel-stations/page.js')
  const gallery = read('src/components/fuel-stations/ImageGallery.js')
  const fuelTypes = read('src/components/fuel-stations/FuelTypes.js')

  assert.match(page, /value !== undefined &&\s*value !== null/)
  assert.doesNotMatch(page, /value !== ''/)
  assert.doesNotMatch(page, /value\.length > 0/)
  assert.match(gallery, /const displayImages = data\.images \?\? \[\]/)
  assert.match(fuelTypes, /products \?\? data\.fuelTypes \?\? \[\]/)
})

test('Fuel Transportation renders every authored image and hides blank CTAs', () => {
  const client = read(
    'src/app/fuel-transportation/FuelTransportationClient.js',
  )

  assert.match(client, /data\.teamImages\.map/)
  assert.match(client, /data\.fleetGalleryImages\.map/)
  assert.doesNotMatch(client, /teamImages\.slice/)
  assert.doesNotMatch(client, /fleetGalleryImages\.slice/)
  assert.match(client, /data\.heroCtaText && data\.heroCtaLink/)
  assert.match(client, /data\.excellenceCtaText && data\.excellenceCtaLink/)
  assert.doesNotMatch(client, /<img/)
})

test('Store Locator connects Sanity stores to interactive map markers and dialogs', () => {
  const page = read('src/app/store-locator/page.js')
  const map = read('src/components/store-locator/LocationMap.js')
  const schema = read('sanity/schemaTypes/index.js')
  const config = read('sanity/sanity.config.js')
  const structure = read('sanity/structure.js')

  assert.match(page, /locationsData=\{data\.locationsSection\}/)
  assert.match(map, /await import\('leaflet'\)/)
  assert.match(map, /marker\.on\('click'/)
  assert.match(map, /role="dialog"/)
  assert.match(map, /directionsHref\(location\)/)
  assert.match(map, /<CmsImage/)
  assert.match(schema, /name: 'latitude'/)
  assert.match(schema, /name: 'longitude'/)
  assert.match(schema, /name: 'showOnMap'/)
  assert.match(schema, /name: 'dialogEyebrow'/)
  assert.match(config, /name: 'start-here'/)
  assert.match(structure, /title: 'Store Locator and Map'/)
})
