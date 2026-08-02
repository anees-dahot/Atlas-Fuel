import {createClient} from '@sanity/client'
import {schemaTypes} from '../schemaTypes/index.js'

const apply = process.argv.includes('--apply')
const token = process.env.SANITY_TOKEN || process.env.SANITY_API_TOKEN
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'g84jdio4'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (apply && !token) throw new Error('SANITY_TOKEN or SANITY_API_TOKEN is required with --apply')

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

const singletonTypes = [
  'atlasCarRacingPage',
  'careersPage',
  'commercialDieselPage',
  'communityPage',
  'contactPage',
  'franchisingPage',
  'fuelPricesPage',
  'fuelStationEnquiryPage',
  'newsListingPage',
  'productsPage',
  'storeLocatorPage',
]

const keyed = (items, prefix) =>
  Array.isArray(items)
    ? items.map((item, index) => ({
        _key: item?._key || `${prefix}-${index + 1}`,
        _type: item?._type || 'object',
        ...item,
      }))
    : undefined

const legacySpecs = {
  servicesPage: {
    heroSection: ['services-hero', (doc) => ({
      heroSubtitle: doc.subtitle,
      heroTitle: doc.title,
      heroDescription: doc.description,
      heroImageUrl: doc.image,
    })],
    servicesSection: ['services-features', (doc) => ({
      heading: doc.heading,
      description: doc.subheading,
      services: keyed(doc.features, 'legacy-service'),
    })],
    statsSection: ['services-stats', (doc) => ({
      heading: doc.heading,
      stats: keyed(doc.stats, 'legacy-stat'),
    })],
    timelineSection: ['services-process', (doc) => ({
      heading: doc.heading,
      sectionLabel: doc.subheading,
      steps: keyed(doc.processSteps, 'legacy-process'),
    })],
    ctaBanner: ['services-cta', (doc) => ({
      heading: doc.heading,
      text: doc.description,
      buttonText: doc.primaryButtonText,
      buttonLink: doc.primaryButtonLink,
    })],
  },
  careersPage: {
    heroSection: ['careers-hero', (doc) => ({
      heroSubtitle: doc.subtitle,
      heroTitle: doc.title,
      heroDescription: doc.description,
      heroImageUrl: doc.image,
    })],
    whyWorkSection: ['careers-benefits', (doc) => ({
      whyWorkHeading: doc.heading,
      whyWorkCards: keyed(doc.benefits, 'legacy-career-benefit'),
    })],
    cultureSection: ['careers-culture', (doc) => ({
      cultureHeading: doc.heading,
      cultureDescription: doc.description,
      values: doc.cultureValues,
    })],
  },
  contactPage: {
    heroSection: ['contact-hero', (doc) => ({
      heroTitle: doc.title,
      heroDescription: doc.description,
      heroImageUrl: doc.image,
    })],
    infoSection: ['contact-info', (doc) => ({
      address: doc.address,
      phone: doc.phone,
      email: doc.email,
      weekdaysHours: doc.weekdaysHours,
      saturdayHours: doc.saturdayHours,
      sundayHours: doc.sundayHours,
      emergencySupport: doc.emergencySupport,
    })],
    formSection: ['contact-form', (doc) => ({
      formHeading: doc.heading,
      submitButtonText: doc.submitButtonText,
      successMessage: doc.successMessage,
    })],
  },
  franchisingPage: {
    heroSection: ['franchising-hero', (doc) => ({
      heroSubtitle: doc.subtitle,
      heroTitle: doc.title,
      heroDescription: doc.description,
      heroImageUrl: doc.image,
    })],
    introSection: ['franchising-intro', (doc) => ({
      introHeading: doc.heading,
      introDescription: doc.description,
      introImageUrl: doc.image,
    })],
    benefitsSection: ['franchising-benefits', (doc) => ({
      benefitsHeading: doc.heading,
      benefits: keyed(doc.benefits, 'legacy-franchise-benefit'),
    })],
    journeySection: ['franchising-journey', (doc) => ({
      journeyHeading: doc.heading,
      steps: keyed(doc.steps, 'legacy-franchise-step'),
    })],
    trainingSection: ['franchising-training', (doc) => ({
      trainingHeading: doc.heading,
      trainingDescription: doc.description,
      trainingImageUrl: doc.image,
      features: doc.trainingFeatures,
    })],
    investmentSection: ['franchising-investment', (doc) => ({
      investmentHeading: doc.heading,
      points: keyed(doc.points, 'legacy-franchise-investment'),
    })],
    ctaBanner: ['franchising-cta', (doc) => ({
      heading: doc.heading,
      text: doc.description,
      buttonText: doc.primaryButtonText,
      buttonLink: doc.primaryButtonLink,
    })],
  },
}

const clean = (value) => Object.fromEntries(
  Object.entries(value || {}).filter(([, child]) => child !== undefined && child !== null)
)

const setMissingPaths = (target, sectionName, section, changes) => {
  const values = clean(section)
  if (!Object.keys(values).length) return
  if (!target[sectionName]) {
    changes[sectionName] = values
    return
  }
  for (const [fieldName, value] of Object.entries(values)) {
    if (target[sectionName][fieldName] === undefined || target[sectionName][fieldName] === null) {
      changes[`${sectionName}.${fieldName}`] = value
    }
  }
}

const allTypes = [...new Set([...singletonTypes, ...Object.keys(legacySpecs)])]
const documents = await client.fetch('*[_type in $types]', {types: allTypes})
const byType = Object.fromEntries(documents.map((document) => [document._type, document]))
const legacyIds = [...new Set(
  Object.values(legacySpecs).flatMap((sections) =>
    Object.values(sections).map(([id]) => id)
  )
)]
const legacyDocuments = await client.fetch('*[_id in $ids]', {ids: legacyIds})
const byId = Object.fromEntries(legacyDocuments.map((document) => [document._id, document]))
const report = []

for (const typeName of allTypes) {
  const document = byType[typeName]
  if (!document) continue
  const schema = schemaTypes.find((type) => type.name === typeName)
  const changes = {}

  for (const section of schema?.fields || []) {
    if (section.type !== 'object' || !section.name.endsWith('Section') || document[section.name]) continue
    const values = Object.fromEntries(
      (section.fields || []).flatMap((field) => {
        const value = document[field.name]
        return value === undefined || value === null ? [] : [[field.name, value]]
      })
    )
    setMissingPaths(document, section.name, values, changes)
  }

  for (const [sectionName, [legacyId, mapper]] of Object.entries(legacySpecs[typeName] || {})) {
    const legacyDocument = byId[legacyId]
    if (legacyDocument) setMissingPaths(document, sectionName, mapper(legacyDocument), changes)
  }

  const paths = Object.keys(changes)
  if (!paths.length) continue
  report.push({document: document._id, paths})
  if (apply) {
    await client.patch(document._id).setIfMissing(changes).commit({autoGenerateArrayKeys: true})
  }
}

console.log(JSON.stringify({mode: apply ? 'apply' : 'dry-run', documents: report}, null, 2))
