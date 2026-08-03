import {readFile, writeFile} from 'node:fs/promises'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'g84jdio4'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN
const apiVersion = '2025-01-01'
const apply = process.argv.includes('--apply')
const assetPath = new URL('../../public/images/store-locator.jpg', import.meta.url)
const backupPath = '/private/tmp/atlas-store-locator-before-map.json'

if (apply && !token) throw new Error('SANITY_API_TOKEN is required with --apply')

const apiBase = `https://${projectId}.api.sanity.io/v${apiVersion}`

async function sanityQuery(query, params = {}) {
  const search = new URLSearchParams({query, returnQuery: 'false'})
  for (const [key, value] of Object.entries(params)) {
    search.set(`$${key}`, JSON.stringify(value))
  }
  const response = await fetch(`${apiBase}/data/query/${dataset}?${search}`)
  if (!response.ok) throw new Error(`Sanity query failed (${response.status})`)
  return (await response.json()).result
}

async function uploadImage() {
  const bytes = await readFile(assetPath)
  const response = await fetch(
    `${apiBase}/assets/images/${dataset}?filename=atlas-fuel-kwinana.jpg`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'image/jpeg',
      },
      body: bytes,
    }
  )
  if (!response.ok) throw new Error(`Sanity image upload failed (${response.status})`)
  return (await response.json()).document
}

async function patchDocument(revision, values) {
  const response = await fetch(
    `${apiBase}/data/mutate/${dataset}?returnDocuments=true&visibility=sync`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        mutations: [{
          patch: {
            id: 'storeLocatorPage',
            ifRevisionID: revision,
            set: values,
          },
        }],
      }),
    }
  )
  if (!response.ok) {
    const message = await response.text()
    throw new Error(`Sanity mutation failed (${response.status}): ${message}`)
  }
  return response.json()
}

const current = await sanityQuery('*[_id == $id][0]', {id: 'storeLocatorPage'})
if (!current) throw new Error('storeLocatorPage does not exist')

const missing = {
  heroImage: !current.heroSection?.heroImageUrl,
  mapSection: !current.mapSection,
  locationsSection: !current.locationsSection,
  contactSection: !current.contactSection,
}

console.log(JSON.stringify({document: current._id, revision: current._rev, missing}, null, 2))
if (!apply) process.exit(0)
if (!Object.values(missing).some(Boolean)) {
  console.log('Store Locator map data already exists; no mutation required.')
  process.exit(0)
}

await writeFile(backupPath, `${JSON.stringify(current, null, 2)}\n`)
const asset = await uploadImage()
const image = {
  _type: 'image',
  asset: {_type: 'reference', _ref: asset._id},
  alt: 'Atlas Fuel Kwinana Beach station',
}

const values = {}
if (missing.heroImage) values['heroSection.heroImageUrl'] = image
if (missing.mapSection) {
  values.mapSection = {
    eyebrow: 'Find Us',
    heading: 'Our Location',
    description: "Visit our Kwinana Beach location for all your fuel needs. We're conveniently located and ready to serve you.",
    defaultZoom: 15,
    mapAriaLabel: 'Interactive map showing Atlas Fuel store locations',
    markerHintText: 'Select a marker to view store details',
    mapLoadingText: 'Interactive map loading...',
    mapUnavailableText: 'No store coordinates are available yet.',
  }
}
if (missing.locationsSection) {
  values.locationsSection = {
    eyebrow: 'Station Details',
    heading: 'Kwinana Beach',
    directionsLabel: 'Get Directions',
    callLabel: 'Call Station',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    hoursLabel: 'Hours',
    dialogEyebrow: 'Atlas Fuel Station',
    closeDialogLabel: 'Close store details',
    locations: [{
      _key: 'kwinana-beach',
      name: 'Kwinana Beach',
      badge: 'Atlas Fuel Station',
      summary: 'Convenient fuel, fleet and commercial services at our Kwinana Beach location.',
      image,
      address: '1 Mandurah Road, Kwinana WA 6167',
      latitude: -32.2358956,
      longitude: 115.7805562,
      showOnMap: true,
      phone: '+61-8-6377-7644',
      email: 'info@atlasfuel.com.au',
      hours: 'Mon-Fri: 8am - 7pm',
      mapLink: 'https://maps.google.com/?q=1+Mandurah+Road,+Kwinana+WA+6167',
      features: [
        {_key: 'diesel', label: 'Diesel'},
        {_key: 'adblue', label: 'AdBlue'},
        {_key: 'fleet-cards', label: 'Fleet Cards'},
      ],
    }],
  }
}
if (missing.contactSection) {
  values.contactSection = {
    eyebrow: 'Headquarters',
    heading: 'Contact Us',
    description: 'Get in touch with our team for fuel supply, account and station enquiries.',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    offices: [
      {
        _key: 'corporate-office',
        name: 'Corporate Office',
        address: '1 Mandurah Road, Kwinana WA 6167',
        phone: '+61-8-6377-7644',
        email: 'info@atlasfuel.com.au',
      },
      {
        _key: 'australia-office',
        name: 'Australia Office',
        address: '1 Mandurah Road, Kwinana WA 6167',
        phone: '+61-8-6377-7644',
        email: 'info@atlasfuel.com.au',
      },
    ],
  }
}

const result = await patchDocument(current._rev, values)
console.log(JSON.stringify({
  backupPath,
  assetId: asset._id,
  transactionId: result.transactionId,
  patchedFields: Object.keys(values),
}, null, 2))
