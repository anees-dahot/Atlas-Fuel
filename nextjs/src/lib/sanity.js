import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: process.env.CMS_ROUNDTRIP_TEST !== '1',
})

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const cmsRoundtripTest = process.env.CMS_ROUNDTRIP_TEST === '1'
const cacheOptions = (tags, revalidate = 60) =>
  cmsRoundtripTest
    ? {cache: 'no-store'}
    : {next: {revalidate, tags}}

const imageBuilder = createImageUrlBuilder({ projectId, dataset })

const buildImageUrl = (ref) => {
  if (!ref) return ''
  try {
    return imageBuilder.image({_ref: ref, _type: 'reference'}).url()
  } catch {
    return ''
  }
}

const isSanityImage = (value) =>
  value &&
  typeof value === 'object' &&
  value._type === 'image' &&
  value.asset

const normalizeSanityContent = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (!isSanityImage(item)) return normalizeSanityContent(item)
      const url = item.asset?.url || buildImageUrl(item.asset?._ref)
      return {...item, url, imageUrl: url, alt: item.alt || ''}
    })
  }

  if (!value || typeof value !== 'object') return value

  return Object.fromEntries(
    Object.entries(value).flatMap(([key, child]) => {
      if (!isSanityImage(child)) {
        return [[key, normalizeSanityContent(child)]]
      }

      const url = child.asset?.url || buildImageUrl(child.asset?._ref)
      const normalizedImage = {...child, url, alt: child.alt || ''}
      const entries = key.endsWith('Url')
        ? [[key, url]]
        : [[key, normalizedImage], [`${key}Url`, url]]

      return [...entries, [`${key}Alt`, child.alt || '']]
    })
  )
}

const flattenNestedLegacySections = (document) => {
  if (!document) return document
  const flattened = {...document}

  Object.entries(document).forEach(([key, value]) => {
    if (key.endsWith('Section') && value && typeof value === 'object') {
      Object.assign(flattened, value)
    }
  })

  return flattened
}

async function getSingleton(type, {flatten = false, revalidate = 60} = {}) {
  const query = `*[_type == $type][0]{...}`
  const result = await client.fetch(
    query,
    {type},
    cacheOptions([type], revalidate)
  )
  const normalized = normalizeSanityContent(result)
  return flatten ? flattenNestedLegacySections(normalized) : normalized
}

// Cached megaMenu fetch - revalidates every 60 seconds
export async function getMegaMenu() {
  return getSingleton('megaMenu')
}

export async function getAboutPage() {
  return getSingleton("aboutPage")
}

export async function getServicesPage() {
  return getSingleton("servicesPage")
}

export async function getMiningFuelPage() {
  return getSingleton("miningFuelPage")
}

export async function getMarineFuelPage() {
  return getSingleton("marineFuelPage")
}

export async function getAgricultureFuelPage() {
  return getSingleton("agricultureFuelPage")
}

export async function getFuelRetailersPage() {
  return getSingleton("fuelRetailersPage")
}

export async function getOnsiteBulkDieselPage() {
  return getSingleton("onsiteBulkDieselPage")
}

export async function getLocalFuelDistributorsPage() {
  return getSingleton("localFuelDistributorsPage")
}

export async function getContactPage() {
  return getSingleton('contactPage', {flatten: true})
}

export async function getFuelStationsPage() {
  return getSingleton("fuelStationsPage")
}

export async function getFuelTransportationPage() {
  return getSingleton("fuelTransportationPage")
}

export async function getCareersPage() {
  return getSingleton('careersPage', {flatten: true})
}

export async function getCommunityPage() {
  return getSingleton('communityPage', {flatten: true})
}

export async function getAtlasCarRacingPage() {
  return getSingleton('atlasCarRacingPage', {flatten: true})
}

export async function getCommercialDieselPage() {
  return getSingleton('commercialDieselPage', {flatten: true})
}

export async function getFuelStationEnquiryPage() {
  return getSingleton('fuelStationEnquiryPage', {flatten: true})
}

export async function getProductsPage() {
  const productsQuery = `*[_type in [
    "fuelProduct",
    "additionalProduct",
    "unleaded91",
    "premium95",
    "premium98",
    "diesel"
  ] && active != false] | order(order asc, name asc){
    ...,
    "name": coalesce(name, title),
    "subtitle": coalesce(subtitle, tagline),
    "octane": coalesce(octane, octaneNumber),
    "imageUrl": coalesce(image.asset->url, imageUrl.asset->url),
    "imageAlt": coalesce(image.alt, imageUrl.alt)
  }`

  const [page, products] = await Promise.all([
    getSingleton('productsPage', {flatten: true}),
    client.fetch(
      productsQuery,
      {},
      cacheOptions(['fuelProduct', 'additionalProduct', 'legacyFuelProduct'])
    ),
  ])

  const normalized = normalizeSanityContent(products)
  return {
    ...page,
    products: normalized.filter((product) => product._type !== 'additionalProduct'),
    additionalProducts: normalized.filter((product) => product._type === 'additionalProduct'),
  }
}

export async function getStoreLocatorPage() {
  return getSingleton('storeLocatorPage', {flatten: true})
}

export async function getSiteSettings() {
  return getSingleton('siteSettings')
}

export async function getNewsPosts() {
  const query = `*[_type == "newsPost"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author,
    category,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt
  }`

  return await client.fetch(query, {}, cacheOptions(['newsPost']))
}

export async function getNewsPost(slug) {
  const query = `*[_type == "newsPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author,
    category,
    "imageUrl": mainImage.asset->url,
    "imageAlt": mainImage.alt,
    body
  }`

  return await client.fetch(query, {slug}, cacheOptions(['newsPost']))
}

export async function getFranchisingPage() {
  return getSingleton('franchisingPage', {flatten: true})
}

export async function getFuelPricesPage() {
  return getSingleton('fuelPricesPage', {flatten: true})
}

export async function getNewsListingPage() {
  return getSingleton('newsListingPage', {flatten: true})
}

export async function getFooterNavigation() {
  return getSingleton('footerNavigation')
}

export async function getErrorPages() {
  return getSingleton('errorPages')
}
