import createImageUrlBuilder from '@sanity/image-url'
import {sanityFetch} from '@/lib/live'
import {client} from '@/lib/sanityClient'

export {client}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const cmsRoundtripTest = process.env.CMS_ROUNDTRIP_TEST === '1'

const imageBuilder = createImageUrlBuilder({ projectId, dataset })

const singletonIds = {
  siteSettings: 'siteSettings',
  themeSettings: 'themeSettings',
  megaMenu: 'megaMenu',
  footerNavigation: 'footerNavigation',
  errorPages: 'errorPages',
  homePage: 'homePage',
  aboutPage: 'aboutPage',
  servicesPage: 'servicesPage',
  miningFuelPage: 'miningFuelPage',
  marineFuelPage: 'marineFuelPage',
  agricultureFuelPage: 'agricultureFuelPage',
  fuelRetailersPage: 'fuelRetailersPage',
  onsiteBulkDieselPage: 'onsiteBulkDieselPage',
  localFuelDistributorsPage: 'localFuelDistributorsPage',
  contactPage: 'contactPage',
  fuelStationsPage: 'fuelStationsPage',
  fuelTransportationPage: 'fuelTransportationPage',
  careersPage: 'careersPage',
  communityPage: 'communityPage',
  atlasCarRacingPage: 'atlasCarRacingPage',
  commercialDieselPage: 'commercialDieselPage',
  fuelStationEnquiryPage: 'fuelStationEnquiryPage',
  productsPage: 'productsPage',
  storeLocatorPage: 'storeLocatorPage',
  franchisingPage: 'franchisingPage',
  fuelPricesPage: 'fuelPricesPage',
  newsListingPage: 'newsListingPage',
}

const legacySectionOrder = {
  contactPage: ['heroSection', 'infoSection', 'formSection', 'ctaBanner'],
  careersPage: [
    'heroSection',
    'whyWorkSection',
    'cultureSection',
    'openingsSection',
    'talentSection',
    'teamGallerySection',
    'officeSection',
    'trainingSection',
    'eventsSection',
    'excellenceSection',
    'applicationSection',
    'ctaBanner',
  ],
  communityPage: [
    'heroSection',
    'initiativesSection',
    'genderEqualitySection',
    'impactSection',
    'supportingLocalsSection',
    'regionalSection',
    'storySection',
    'ctaBanner',
  ],
  atlasCarRacingPage: [
    'heroSection',
    'meetGtrSection',
    'gallerySection',
    'pillarsSection',
    'sponsorshipSection',
    'pradoSection',
    'contactSection',
    'ctaBanner',
  ],
  commercialDieselPage: [
    'heroSection',
    'industriesSection',
    'sectorsSection',
    'bunkerSection',
    'ownStationSection',
    'doYouKnowSection',
    'miningSection',
    'agricultureSection',
    'whatWeOfferSection',
    'transportationSection',
    'complianceSection',
    'ctaBanner',
  ],
  fuelStationEnquiryPage: [
    'heroSection',
    'introSection',
    'benefitsSection',
    'journeySection',
    'trainingSection',
    'investmentSection',
    'internationalSection',
    'ctaBanner',
  ],
  productsPage: [
    'heroSection',
    'introSection',
    'statsSection',
    'servicePromiseSection',
    'additionalProductsSection',
    'ctaBanner',
  ],
  storeLocatorPage: [
    'heroSection',
    'mapSection',
    'locationsSection',
    'contactSection',
    'ctaBanner',
  ],
  franchisingPage: [
    'heroSection',
    'introSection',
    'benefitsSection',
    'journeySection',
    'trainingSection',
    'investmentSection',
    'internationalSection',
    'ctaBanner',
  ],
  fuelPricesPage: [
    'heroSection',
    'pricesSection',
    'trendsSection',
    'subscribeSection',
    'ctaBanner',
  ],
  newsListingPage: ['heroSection', 'listingSection', 'ctaBanner'],
}

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
  value._type === 'image'

const normalizeImage = (image) => {
  const url =
    image?.asset?.url ||
    buildImageUrl(image?.asset?._ref) ||
    (typeof image?.url === 'string' ? image.url : '')

  return {
    ...image,
    url,
    imageUrl: url,
    alt: image?.alt || '',
  }
}

export const normalizeSanityContent = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (!isSanityImage(item)) return normalizeSanityContent(item)
      return normalizeImage(item)
    })
  }

  if (!value || typeof value !== 'object') return value

  return Object.fromEntries(
    Object.entries(value).flatMap(([key, child]) => {
      if (!isSanityImage(child)) {
        return [[key, normalizeSanityContent(child)]]
      }

      const normalizedImage = normalizeImage(child)
      const url = normalizedImage.url
      const baseKey = key.endsWith('Url') ? key.slice(0, -3) : key
      const entries = key.endsWith('Url')
        ? [[key, url], [`${baseKey}Image`, normalizedImage]]
        : [[key, normalizedImage], [`${key}Url`, url]]

      return [
        ...entries,
        [`${key}Alt`, normalizedImage.alt],
        ...(baseKey !== key ? [[`${baseKey}Alt`, normalizedImage.alt]] : []),
      ]
    })
  )
}

const addLegacySectionAliases = (document, type) => {
  if (!document) return document
  const flattened = {...document}
  const nestedAliases = new Set()
  const configuredOrder = legacySectionOrder[type] || []
  const remainingSections = Object.keys(document)
    .filter(
      (key) =>
        !configuredOrder.includes(key) &&
        (key.endsWith('Section') || key === 'ctaBanner')
    )
    .sort()

  for (const key of [...configuredOrder, ...remainingSections]) {
    const value = document[key]
    if (!value || typeof value !== 'object' || Array.isArray(value)) continue

    for (const [field, fieldValue] of Object.entries(value)) {
      if (
        fieldValue !== undefined &&
        fieldValue !== null &&
        !nestedAliases.has(field)
      ) {
        flattened[field] = fieldValue
        nestedAliases.add(field)
      }
    }
  }

  return flattened
}

export async function fetchSanity({
  query,
  params = {},
  tags = ['sanity'],
  stega,
}) {
  if (cmsRoundtripTest) {
    return client.fetch(query, params, {
      cache: 'no-store',
      perspective: 'published',
      stega: false,
      useCdn: false,
    })
  }

  const {data} = await sanityFetch({query, params, tags, stega})
  return data
}

async function getSingleton(type, {flatten = false, stega} = {}) {
  const id = singletonIds[type] || type
  const byIdQuery = `*[_id == $id][0]{...}`
  let result = await fetchSanity({
    query: byIdQuery,
    params: {id},
    tags: [type, `${type}:${id}`],
    stega,
  })

  // Transitional safety for the existing non-canonical footer document.
  // The migration replaces it with the fixed singleton ID.
  if (!result) {
    result = await fetchSanity({
      query: `*[_type == $type][0]{...}`,
      params: {type},
      tags: [type],
      stega,
    })
  }

  const normalized = normalizeSanityContent(result)
  return flatten ? addLegacySectionAliases(normalized, type) : normalized
}

// Cached megaMenu fetch - revalidates every 60 seconds
export async function getMegaMenu() {
  return getSingleton('megaMenu')
}

export async function getHomePage(options) {
  return getSingleton('homePage', options)
}

export async function getAboutPage(options) {
  return getSingleton("aboutPage", options)
}

export async function getServicesPage(options) {
  return getSingleton("servicesPage", options)
}

export async function getMiningFuelPage(options) {
  return getSingleton("miningFuelPage", options)
}

export async function getMarineFuelPage(options) {
  return getSingleton("marineFuelPage", options)
}

export async function getAgricultureFuelPage(options) {
  return getSingleton("agricultureFuelPage", options)
}

export async function getFuelRetailersPage(options) {
  return getSingleton("fuelRetailersPage", options)
}

export async function getOnsiteBulkDieselPage(options) {
  return getSingleton("onsiteBulkDieselPage", options)
}

export async function getLocalFuelDistributorsPage(options) {
  return getSingleton("localFuelDistributorsPage", options)
}

export async function getContactPage(options = {}) {
  return getSingleton('contactPage', {...options, flatten: true})
}

export async function getFuelStationsPage(options) {
  return getSingleton("fuelStationsPage", options)
}

export async function getFuelTransportationPage(options) {
  return getSingleton("fuelTransportationPage", options)
}

export async function getCareersPage(options = {}) {
  return getSingleton('careersPage', {...options, flatten: true})
}

export async function getCommunityPage(options = {}) {
  return getSingleton('communityPage', {...options, flatten: true})
}

export async function getAtlasCarRacingPage(options = {}) {
  return getSingleton('atlasCarRacingPage', {...options, flatten: true})
}

export async function getCommercialDieselPage(options = {}) {
  return getSingleton('commercialDieselPage', {...options, flatten: true})
}

export async function getFuelStationEnquiryPage(options = {}) {
  return getSingleton('fuelStationEnquiryPage', {...options, flatten: true})
}

export async function getProductsPage(options = {}) {
  const productsQuery = `*[_type in [
    "fuelProduct",
    "additionalProduct",
    "unleaded91",
    "premium95",
    "premium98",
    "diesel"
  ]] | order(order asc, name asc){
    ...,
    "name": coalesce(title, name),
    "title": coalesce(title, name),
    "subtitle": coalesce(tagline, subtitle),
    "tagline": coalesce(tagline, subtitle),
    "octane": coalesce(octaneNumber, octane),
    "octaneNumber": coalesce(octaneNumber, octane),
    image{
      ...,
      asset->{_id, url, metadata{lqip, dimensions}},
      alt,
      hotspot,
      crop
    },
    "imageUrl": coalesce(image.asset->url, imageUrl.asset->url),
    "imageAlt": coalesce(image.alt, imageUrl.alt)
  }`

  const [page, products] = await Promise.all([
    getSingleton('productsPage', {...options, flatten: true}),
    fetchSanity({
      query: productsQuery,
      tags: ['fuelProduct', 'additionalProduct', 'legacyFuelProduct'],
      stega: options.stega,
    }),
  ])

  const normalized = normalizeSanityContent(products) || []
  const fuelProductDocuments = normalized.filter(
    (product) => product._type !== 'additionalProduct'
  )
  const additionalProductDocuments = normalized.filter(
    (product) => product._type === 'additionalProduct'
  )

  return {
    ...page,
    products: fuelProductDocuments.length
      ? fuelProductDocuments.filter((product) => product.active !== false)
      : undefined,
    additionalProducts: additionalProductDocuments.length
      ? additionalProductDocuments.filter((product) => product.active !== false)
      : undefined,
  }
}

export async function getStoreLocatorPage(options = {}) {
  return getSingleton('storeLocatorPage', {...options, flatten: true})
}

export async function getSiteSettings(options) {
  return getSingleton('siteSettings', options)
}

export async function getThemeSettings(options) {
  return getSingleton('themeSettings', options)
}

export async function getNewsPosts(options = {}) {
  const query = `*[_type == "newsPost"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author,
    category,
    mainImage{
      ...,
      asset->{_id, url, metadata{lqip, dimensions}},
      alt,
      hotspot,
      crop
    }
  }`

  const posts = await fetchSanity({
    query,
    tags: ['newsPost'],
    stega: options.stega,
  })
  return normalizeSanityContent(posts)
}

export async function getNewsPost(slug, options = {}) {
  const query = `*[_type == "newsPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author,
    category,
    mainImage{
      ...,
      asset->{_id, url, metadata{lqip, dimensions}},
      alt,
      hotspot,
      crop
    },
    seo{
      ...,
      image{
        ...,
        image{
          ...,
          asset->{_id, url, metadata{lqip, dimensions}},
          hotspot,
          crop
        }
      }
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{_id, url, metadata{lqip, dimensions}}
      },
      _type == "cmsVideo" => {
        ...,
        file{
          ...,
          asset->{_id, url, mimeType, originalFilename}
        },
        poster{
          ...,
          image{
            ...,
            asset->{_id, url, metadata{lqip, dimensions}},
            hotspot,
            crop
          }
        }
      }
    }
  }`

  const post = await fetchSanity({
    query,
    params: {slug},
    tags: ['newsPost', `newsPost:${slug}`],
    stega: options.stega,
  })
  return normalizeSanityContent(post)
}

export async function getFranchisingPage(options = {}) {
  return getSingleton('franchisingPage', {...options, flatten: true})
}

export async function getFuelPricesPage(options = {}) {
  return getSingleton('fuelPricesPage', {...options, flatten: true})
}

export async function getNewsListingPage(options = {}) {
  return getSingleton('newsListingPage', {...options, flatten: true})
}

export async function getFooterNavigation() {
  return getSingleton('footerNavigation')
}

export async function getErrorPages() {
  return getSingleton('errorPages')
}
