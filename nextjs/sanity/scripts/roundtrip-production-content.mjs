import {createHmac} from 'node:crypto'
import {writeFile, unlink} from 'node:fs/promises'
import {schemaTypes} from '../schemaTypes/index.js'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'g84jdio4'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN
const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET
const productionUrl = process.env.ATLAS_PRODUCTION_URL || 'https://atlas-fuel-website.vercel.app'
const backupPath = '/private/tmp/atlas-cms-roundtrip-backup.json'
const reportPath = '/private/tmp/atlas-cms-roundtrip-report.json'
const maxBatchAttributes = 90
const dryRun = process.argv.includes('--dry-run')
const smoke = process.argv.includes('--smoke')
const noRevalidate = process.argv.includes('--no-revalidate')
const wholeDocument = process.argv.includes('--whole-document')
const onlyType = process.argv.find((argument) => argument.startsWith('--type='))?.split('=')[1]
const skippedTypes = new Set(
  process.argv
    .filter((argument) => argument.startsWith('--skip-type='))
    .map((argument) => argument.split('=')[1])
)
const batchStart = Number.parseInt(
  process.argv.find((argument) => argument.startsWith('--batch-start='))?.split('=')[1] || '0',
  10
)
const requestedBatchLimit = Number.parseInt(
  process.argv.find((argument) => argument.startsWith('--batch-limit='))?.split('=')[1] || '0',
  10
)
const batchLimit = smoke ? 1 : requestedBatchLimit
const localRenderer = /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/.test(productionUrl)

if (!token && !dryRun) throw new Error('SANITY_API_TOKEN is required')
if (!revalidateSecret && !dryRun) throw new Error('SANITY_REVALIDATE_SECRET is required')

const sanityApiBase = `https://${projectId}.api.sanity.io/v2025-01-01`

const sanityRequest = async (operation) => {
  let lastError
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      if (attempt < 8) {
        await new Promise((resolve) => setTimeout(resolve, Math.min(attempt * 1500, 5000)))
      }
    }
  }
  throw lastError || new Error('Sanity request failed')
}

const sanityQuery = async (query, params = {}) => {
  const search = new URLSearchParams({query, returnQuery: 'false'})
  for (const [key, value] of Object.entries(params)) {
    search.set(`$${key}`, JSON.stringify(value))
  }
  return sanityRequest(async () => {
    const response = await fetch(`${sanityApiBase}/data/query/${dataset}?${search}`)
    if (!response.ok) throw new Error(`Sanity query failed (${response.status})`)
    return (await response.json()).result
  })
}

const sanityMutate = async (mutation) =>
  sanityRequest(async () => {
    const response = await fetch(
      `${sanityApiBase}/data/mutate/${dataset}?returnIds=true&visibility=sync`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({mutations: [mutation]}),
      }
    )
    if (!response.ok) throw new Error(`Sanity mutation failed (${response.status})`)
    return response.json()
  })

const getDocument = (id) =>
  sanityQuery('*[_id == $id][0]', {id})

const setDocumentFields = (id, fields) =>
  sanityMutate({patch: {id, set: fields}})

const unsetDocumentFields = (id, fields) =>
  sanityMutate({patch: {id, unset: fields}})

const createOrReplaceDocument = (document) =>
  sanityMutate({createOrReplace: document})

const deleteDocument = (id) =>
  sanityMutate({delete: {id}})

const routes = {
  homePage: '/',
  aboutPage: '/about',
  servicesPage: '/services',
  miningFuelPage: '/services/mining-fuel',
  marineFuelPage: '/services/marine-fuel',
  agricultureFuelPage: '/services/agriculture-fuel',
  fuelRetailersPage: '/services/fuel-retailers',
  onsiteBulkDieselPage: '/services/onsite-bulk-diesel',
  localFuelDistributorsPage: '/services/local-fuel-distributors',
  fuelStationsPage: '/fuel-stations',
  fuelTransportationPage: '/fuel-transportation',
  careersPage: '/careers',
  communityPage: '/community',
  contactPage: '/contact',
  commercialDieselPage: '/commercial-diesel',
  fuelStationEnquiryPage: '/fuel-station-enquiry',
  productsPage: '/products',
  storeLocatorPage: '/store-locator',
  franchisingPage: '/franchising',
  fuelPricesPage: '/fuel-prices',
  atlasCarRacingPage: '/atlas-car-racing',
  newsListingPage: '/news',
  siteSettings: '/',
  themeSettings: '/',
  megaMenu: '/',
  footerNavigation: '/',
  errorPages: '/route-that-does-not-exist-cms-roundtrip',
  fuelProduct: '/products',
  additionalProduct: '/products',
  newsPost: '/news/cms-roundtrip-verification',
}

const singletonTypes = Object.keys(routes).filter(
  (type) => !['fuelProduct', 'additionalProduct', 'newsPost'].includes(type)
)

const targets = [
  ...singletonTypes.map((type) => ({id: type, type, route: routes[type]})),
  {
    id: 'cms-roundtrip-fuel-product',
    type: 'fuelProduct',
    route: routes.fuelProduct,
    temporary: true,
  },
  {
    id: 'cms-roundtrip-additional-product',
    type: 'additionalProduct',
    route: routes.additionalProduct,
    temporary: true,
  },
  {
    id: 'cms-roundtrip-news-post',
    type: 'newsPost',
    route: routes.newsPost,
    temporary: true,
  },
].filter(
  (target) => (!onlyType || target.type === onlyType) && !skippedTypes.has(target.type)
)

const schemas = new Map(schemaTypes.map((schema) => [schema.name, schema]))
const systemKeys = new Set(['_rev', '_createdAt', '_updatedAt', '_system'])
const notImmediatelyVisibleNames = new Set([
  'formSuccessMessage',
  'formErrorMessage',
  'noResultsText',
  'filteredEmptyMessage',
  'loadingText',
  'mapEmbedUrl',
  'seoTitle',
  'seoDescription',
  'seoImage',
])

const hash = (value) => {
  let result = 2166136261
  for (const character of value) {
    result ^= character.charCodeAt(0)
    result = Math.imul(result, 16777619)
  }
  return (result >>> 0).toString(36).slice(0, 6).toUpperCase()
}

const markerFor = (type, path) =>
  `CMSRT_${type.replace(/Page$/, '').toUpperCase()}_${hash(path)}_${path.at(-1).toUpperCase()}`

const optionValue = (field, path) => {
  const list = field.options?.list
  if (!Array.isArray(list) || !list.length) return undefined
  const option = list[Number.parseInt(hash(path), 36) % list.length]
  return typeof option === 'object' ? option.value : option
}

const stringValue = (field, path, marker) => {
  if (field.name === 'source') return 'external'
  if (path[0] === 'themeSettings' && field.name === 'headingFamily') return 'Bebas Neue'
  if (path[0] === 'themeSettings' && field.name === 'bodyFamily') return 'Inter'
  const listedValue = optionValue(field, path)
  if (listedValue !== undefined) return listedValue

  const name = (field.name || path.at(-1) || 'value').toLowerCase()
  if (name === 'slug') return marker.toLowerCase().replaceAll('_', '-')
  if (name.includes('email')) return `${marker.toLowerCase()}@example.com`
  if (name.includes('phone')) return `+61 8 6000 ${hash(path).slice(0, 4)}`
  if (
    name.includes('link') ||
    name.includes('href') ||
    name.includes('url') ||
    name.includes('action')
  ) {
    return `/contact?cmsrt=${marker}`
  }
  if (name.includes('color') || path[1] === 'colors') {
    const color = (Number.parseInt(hash(path), 36) % 0xffffff).toString(16).padStart(6, '0')
    return `#${color}`
  }
  if (name.includes('icon')) return 'truck'
  if (name.includes('date')) return '26 July 2026'
  if (name.includes('time')) return '09:00–17:00'
  return `${marker} verified from Sanity`
}

const buildValue = (field, path, assetId, evidence, arrayIndex = 0) => {
  const namedType = schemas.get(field.type)
  if (namedType && namedType.type !== 'document') {
    return buildValue(
      {
        ...namedType,
        ...field,
        type: namedType.type,
        fields: (namedType.fields || []).filter(
          (child) => !(namedType.name === 'cmsVideo' && child.type === 'file')
        ),
      },
      path,
      assetId,
      evidence,
      arrayIndex
    )
  }

  const marker = markerFor(path[0], [...path, String(arrayIndex)])
  const evidenceEntry = {
    path: path.slice(1).join('.'),
    field: field.name || path.at(-1),
    type: field.type,
    marker,
    immediate: !notImmediatelyVisibleNames.has(field.name),
  }

  switch (field.type) {
    case 'string':
    case 'text': {
      const value = stringValue(field, path, marker)
      if (value.includes(marker)) {
        evidence.push({...evidenceEntry, value})
      } else if (
        path[0] === 'themeSettings' &&
        (path[1] === 'colors' || field.name?.endsWith('Family'))
      ) {
        const grayShade = field.name?.match(/^gray(\d+)$/)?.[1]
        const renderedValue = grayShade
          ? `--cms-gray-${grayShade}-rgb:${[1, 3, 5]
              .map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16))
              .join(' ')}`
          : value
        evidence.push({...evidenceEntry, marker: renderedValue, value})
      }
      return value
    }
    case 'url': {
      const value = field.name === 'canonicalUrl'
        ? `https://example.com/cmsrt-${marker}`
        : `https://example.com/?cmsrt=${marker}`
      evidence.push({...evidenceEntry, value})
      return value
    }
    case 'number': {
      if (path[0] === 'themeSettings') {
        const value = field.name === 'headingWeight' ? 800 : 300
        evidence.push({
          ...evidenceEntry,
          marker: `--cms-${field.name === 'headingWeight' ? 'heading' : 'body'}-weight:${value}`,
          value,
        })
        return value
      }
      return 9000 + (Number.parseInt(hash(path), 36) % 999)
    }
    case 'boolean':
      return true
    case 'datetime':
      return '2026-07-26T12:00:00.000Z'
    case 'date':
      return '2026-07-26'
    case 'slug':
      return {current: marker.toLowerCase().replaceAll('_', '-')}
    case 'image': {
      const hasAlt = field.fields?.some((child) => child.name === 'alt')
      if (hasAlt) {
        evidence.push({...evidenceEntry, path: `${evidenceEntry.path}.alt`, value: marker})
      }
      return {
        _type: 'image',
        asset: {_type: 'reference', _ref: assetId},
        ...(hasAlt ? {alt: marker} : {}),
        hotspot: {_type: 'sanity.imageHotspot', x: 0.5, y: 0.5, height: 0.8, width: 0.8},
        crop: {_type: 'sanity.imageCrop', top: 0, bottom: 0, left: 0, right: 0},
      }
    }
    case 'file':
      return {
        _type: 'file',
        asset: {_type: 'reference', _ref: assetId},
      }
    case 'object': {
      const object = {_type: 'object'}
      for (const child of field.fields || []) {
        object[child.name] = buildValue(child, [...path, child.name], assetId, evidence)
      }
      return object
    }
    case 'array': {
      const member = field.of?.[0]
      if (!member) return []
      if (member.type === 'block') {
        evidence.push({...evidenceEntry, path: `${evidenceEntry.path}.body`, value: marker})
        return [{
          _key: `block-${hash(path)}`,
          _type: 'block',
          style: 'normal',
          markDefs: [],
          children: [{_key: `span-${hash(path)}`, _type: 'span', marks: [], text: `${marker} verified from Sanity`}],
        }]
      }

      return [0, 1].map((index) => {
        const value = buildValue(member, [...path, String(index)], assetId, evidence, index)
        if (member.type === 'object') {
          return {...value, _key: `item-${hash([...path, String(index)].join('.'))}`}
        }
        return value
      })
    }
    default:
      throw new Error(`Unsupported schema type ${field.type} at ${path.join('.')}`)
  }
}

const canonicalFields = (schema) =>
  (schema.fields || []).filter(
    (field) => !field.hidden && !field.readOnly && !field.deprecated
  )

const cleanDocument = (document) =>
  Object.fromEntries(
    Object.entries(document || {}).filter(([key]) => !systemKeys.has(key))
  )

const comparableDocument = (document) => JSON.stringify(cleanDocument(document))

const signedRevalidate = async (document) => {
  if (localRenderer || noRevalidate) return
  const body = JSON.stringify({_id: document._id, _type: document._type, slug: document.slug})
  const timestamp = Date.now()
  const signature = createHmac('sha256', revalidateSecret.trim())
    .update(`${timestamp}.${body}`)
    .digest('base64url')
  await sanityRequest(async () => {
    const response = await fetch(`${productionUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'sanity-webhook-signature': `t=${timestamp},v1=${signature}`,
      },
      body,
    })
    if (!response.ok) {
      throw new Error(`Revalidation failed (${response.status}): ${await response.text()}`)
    }
    return true
  })
}

const fetchHtml = async (route) => {
  let lastError
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    try {
      const response = await fetch(`${productionUrl}${route}`, {
        headers: {'cache-control': 'no-cache'},
        redirect: 'follow',
      })
      const html = await response.text()
      const expectedErrorBoundaryResponse =
        route === '/cms-error-test' && response.status === 500
      if (!response.ok && response.status !== 404 && !expectedErrorBoundaryResponse) {
        throw new Error(`${route} returned ${response.status}`)
      }
      return html
    } catch (error) {
      lastError = error
      if (attempt < 8) {
        await new Promise((resolve) => setTimeout(resolve, Math.min(attempt * 1000, 5000)))
      }
    }
  }
  throw lastError
}

const waitForMarker = async (route, expectedMarker, shouldExist) => {
  for (let attempt = 1; attempt <= 18; attempt += 1) {
    const html = await fetchHtml(route)
    if (html.includes(expectedMarker) === shouldExist) return html
    await new Promise((resolve) => setTimeout(resolve, 2500))
  }
  throw new Error(`${route} did not ${shouldExist ? 'show' : 'restore'} ${expectedMarker}`)
}

const fetchVerificationHtml = async (target) => {
  let html = await fetchHtml(target.route)
  if (target.type === 'newsListingPage') {
    html += await fetchHtml('/news/future-of-fueling')
  }
  if (target.type === 'newsPost') {
    html += await fetchHtml('/news')
  }
  if (target.type === 'errorPages') {
    html += await fetchHtml('/route-that-does-not-exist-cms-roundtrip')
    html += await fetchHtml('/cms-error-test')
    html += await fetchHtml('/api/error-settings')
  }
  return html
}

const waitForEvidence = async (target, evidence) => {
  let html = ''
  for (let attempt = 1; attempt <= 18; attempt += 1) {
    html = await fetchVerificationHtml(target)
    if (evidence.every((item) => html.includes(item.marker))) return html
    if (attempt < 18) await new Promise((resolve) => setTimeout(resolve, 2500))
  }
  return html
}

const verificationRoute = (target, batchEvidence) => {
  if (
    target.type === 'errorPages' &&
    batchEvidence.some((item) => item.path.startsWith('error'))
  ) {
    return '/cms-error-test'
  }
  return target.route
}

const matchesExpected = (actual, expected) => {
  if (Array.isArray(expected)) {
    return Array.isArray(actual) &&
      actual.length === expected.length &&
      expected.every((item, index) => matchesExpected(actual[index], item))
  }
  if (expected && typeof expected === 'object') {
    return Object.entries(expected).every(([key, value]) => {
      if (key === '_type' && value === 'object' && actual?.[key] === undefined) return true
      return matchesExpected(actual?.[key], value)
    })
  }
  return actual === expected
}

const attributeCost = (value) => {
  if (Array.isArray(value)) {
    const itemCost = value.length ? attributeCost(value[0]) : 0
    return 1 + itemCost
  }
  if (value && typeof value === 'object') {
    return 1 + Object.entries(value)
      .filter(([key]) => !key.startsWith('_'))
      .reduce((sum, [, child]) => sum + attributeCost(child), 0)
  }
  return 1
}

const fieldValueCount = (field) => {
  if (field.type === 'object') {
    return (field.fields || []).reduce((sum, child) => sum + fieldValueCount(child), 0)
  }
  if (field.type === 'array' && field.of?.[0]?.type === 'object') {
    return (field.of[0].fields || []).reduce((sum, child) => sum + fieldValueCount(child), 0)
  }
  return 1
}

const contributionsFor = (field, value) => {
  if (field.type !== 'object') return [{name: field.name, value, cost: attributeCost(value)}]
  return (field.fields || []).map((child) => ({
    name: child.name,
    value: value[child.name],
    cost: attributeCost(value[child.name]) + 1,
  }))
}

const batchesFor = (contributions, seedContribution) => {
  const batches = []
  let batch = []
  let cost = 0

  for (const contribution of contributions) {
    if (batch.length && cost + contribution.cost > maxBatchAttributes) {
      batches.push(batch)
      batch = []
      cost = 0
    }
    batch.push(contribution)
    cost += contribution.cost
  }
  if (batch.length) batches.push(batch)

  if (!seedContribution) return batches
  return batches.map((items) =>
    items.some((item) => item.name === seedContribution.name)
      ? items
      : [seedContribution, ...items]
  )
}

const restoreBatch = async (target, backup, topFieldName, firstMarker) => {
  if (backup && Object.hasOwn(backup, topFieldName)) {
    await setDocumentFields(target.id, {[topFieldName]: backup[topFieldName]})
  } else if (backup) {
    await unsetDocumentFields(target.id, [topFieldName])
  } else {
    await deleteDocument(target.id)
  }
  await signedRevalidate({
    _id: target.id,
    _type: target.type,
    slug: target.type === 'newsPost' ? {current: 'cms-roundtrip-verification'} : undefined,
  })
  if (firstMarker) await waitForMarker(target.route, firstMarker, false)
}

const emergencyRestore = async (target, backup) => {
  if (!backup) {
    await deleteDocument(target.id)
    return
  }
  await createOrReplaceDocument(cleanDocument(backup))
}

const report = {
  startedAt: new Date().toISOString(),
  productionUrl,
  dryRun,
  documents: [],
  totals: {documents: 0, sections: 0, fields: 0, values: 0, batches: 0, evidence: 0, visible: 0, missing: 0},
}

const backups = {}
let currentRestore = null
let runFailed = false

try {
  const asset = dryRun
    ? {_id: 'image-dry-run-100x100-png'}
    : await sanityQuery('*[_type == "sanity.imageAsset"]|order(_updatedAt desc)[0]{_id}')
  if (!asset?._id) throw new Error('No Sanity image asset is available for image round-trip testing')

  for (const target of targets) {
    const schema = schemas.get(target.type)
    if (!schema) throw new Error(`Missing local schema for ${target.type}`)

    const fields = canonicalFields(schema)
    const evidence = []
    const generated = {}
    for (const field of fields) {
      generated[field.name] = buildValue(
        field,
        [target.type, field.name],
        asset._id,
        evidence
      )
    }

    if (target.type === 'newsPost') {
      generated.slug = {current: 'cms-roundtrip-verification'}
      generated.publishedAt = '2026-07-26T12:00:00.000Z'
    }
    if (target.type === 'fuelProduct' || target.type === 'additionalProduct') {
      generated.active = true
      generated.order = -999
    }

    const backup = dryRun ? null : await getDocument(target.id)
    backups[target.id] = backup
    const documentReport = {
      id: target.id,
      type: target.type,
      route: target.route,
      existed: Boolean(backup),
      sections: fields.filter((field) => field.type === 'object').length,
      fields: fields.length,
      values: fields.reduce((sum, field) => sum + fieldValueCount(field), 0),
      evidence: evidence.length,
      batches: 0,
      visible: 0,
      missing: [],
      status: dryRun ? 'planned' : 'testing',
    }
    report.documents.push(documentReport)
    report.totals.documents += 1
    report.totals.sections += documentReport.sections
    report.totals.fields += fields.length
    report.totals.values += documentReport.values
    report.totals.evidence += evidence.length

    if (dryRun) {
      const batchCount = wholeDocument
        ? 1
        : fields.reduce((sum, field) => {
            const contributions = contributionsFor(field, generated[field.name])
            return sum + batchesFor(contributions).length
          }, 0)
      documentReport.batches = batchCount
      report.totals.batches += batchCount
      console.log(`PLAN ${target.type}: ${fields.length} fields, ${documentReport.values} values, ${documentReport.sections} sections, ${batchCount} batches, ${evidence.length} markers`)
      continue
    }

    if (wholeDocument) {
      const testDocument = {
        _id: target.id,
        _type: target.type,
        ...generated,
      }
      currentRestore = {target, backup}
      await createOrReplaceDocument(testDocument)

      const readback = await getDocument(target.id)
      for (const field of fields) {
        if (!matchesExpected(readback?.[field.name], generated[field.name])) {
          throw new Error(`${target.type}.${field.name} failed Sanity write/read round-trip`)
        }
      }

      await signedRevalidate(readback)
      const immediateEvidence = evidence.filter((item) => item.immediate)
      const firstMarker = immediateEvidence[0]?.marker
      const html = await waitForEvidence(target, immediateEvidence)
      const visible = evidence.filter((item) => html.includes(item.marker))
      const missing = immediateEvidence.filter((item) => !html.includes(item.marker))
      documentReport.batches = 1
      documentReport.visible = visible.length
      documentReport.missing = missing.map((item) => item.path)
      report.totals.batches += 1
      report.totals.visible += visible.length
      report.totals.missing += missing.length

      if (backup) {
        await createOrReplaceDocument(cleanDocument(backup))
      } else {
        await deleteDocument(target.id)
      }
      await signedRevalidate({
        _id: target.id,
        _type: target.type,
        slug: target.type === 'newsPost' ? {current: 'cms-roundtrip-verification'} : undefined,
      })
      if (firstMarker) {
        await waitForMarker(verificationRoute(target, immediateEvidence), firstMarker, false)
      }
      currentRestore = null

      const restored = await getDocument(target.id)
      if (backup && comparableDocument(restored) !== comparableDocument(backup)) {
        throw new Error(`${target.type} did not restore exactly`)
      }
      if (!backup && restored) throw new Error(`${target.type} temporary document was not removed`)
      if (documentReport.missing.length) {
        throw new Error(
          `${target.type} has ${documentReport.missing.length} fields missing from production output: ` +
          documentReport.missing.join(', ')
        )
      }

      documentReport.status = 'passed-restored'
      console.log(
        `PASS ${target.type}: ${fields.length} fields, ${documentReport.values} values, ` +
        `${documentReport.sections} sections, 1 batch, ` +
        `${documentReport.visible}/${evidence.length} markers visible, ` +
        `${documentReport.missing.length} missing, restored`
      )
      continue
    }

    let executedBatches = 0
    let globalBatchIndex = 0
    fieldLoop:
    for (const field of fields) {
      const fieldEvidence = evidence.filter((item) =>
        item.path === field.name || item.path.startsWith(`${field.name}.`)
      )
      const contributions = contributionsFor(field, generated[field.name])
      const seedEvidence = fieldEvidence.find((item) => item.immediate)
      const seedContribution = seedEvidence && field.type === 'object'
        ? contributions.find((item) =>
            seedEvidence.path === `${field.name}.${item.name}` ||
            seedEvidence.path.startsWith(`${field.name}.${item.name}.`)
          )
        : null
      const batches = batchesFor(contributions, seedContribution)

      for (const batch of batches) {
        const batchIndex = globalBatchIndex
        globalBatchIndex += 1
        if (batchIndex < batchStart) continue
        if (batchLimit > 0 && executedBatches >= batchLimit) break fieldLoop
        executedBatches += 1
        documentReport.batches += 1
        report.totals.batches += 1
        const batchNames = new Set(batch.map((item) => item.name))
        const batchEvidence = fieldEvidence.filter((item) => {
          if (field.type !== 'object') return true
          return [...batchNames].some((name) =>
            item.path === `${field.name}.${name}` ||
            item.path.startsWith(`${field.name}.${name}.`)
          )
        })
        const firstMarker = batchEvidence.find((item) => item.immediate)?.marker
        const liveRoute = verificationRoute(target, batchEvidence)
        const previousTopValue = backup?.[field.name]
        let testTopValue
        if (field.type === 'object') {
          testTopValue = {
            ...(previousTopValue && typeof previousTopValue === 'object'
              ? previousTopValue
              : {_type: 'object'}),
            ...Object.fromEntries(batch.map((item) => [item.name, item.value])),
          }
        } else {
          testTopValue = batch[0].value
        }

        currentRestore = {target, backup, topFieldName: field.name}
        if (backup) {
          await setDocumentFields(target.id, {[field.name]: testTopValue})
        } else {
          await createOrReplaceDocument({
            _id: target.id,
            _type: target.type,
            [field.name]: testTopValue,
            ...(target.type === 'newsPost'
              ? {slug: {current: 'cms-roundtrip-verification'}, publishedAt: '2026-07-26T12:00:00.000Z'}
              : {}),
            ...(['fuelProduct', 'additionalProduct'].includes(target.type)
              ? {active: true, order: -999}
              : {}),
          })
        }

        const readback = await getDocument(target.id)
        if (!matchesExpected(readback?.[field.name], testTopValue)) {
          throw new Error(`${target.type}.${field.name} failed Sanity write/read round-trip`)
        }

        await signedRevalidate(readback)
        let html
        if (firstMarker) {
          html = await waitForMarker(liveRoute, firstMarker, true)
        } else {
          html = await fetchHtml(liveRoute)
        }
        if (target.type === 'newsListingPage') {
          html += await fetchHtml('/news/future-of-fueling')
        }
        const visible = batchEvidence.filter((item) => html.includes(item.marker))
        const missing = batchEvidence.filter(
          (item) => item.immediate && !html.includes(item.marker)
        )
        documentReport.visible += visible.length
        documentReport.missing.push(...missing.map((item) => item.path))
        report.totals.visible += visible.length
        report.totals.missing += missing.length

        await restoreBatch(target, backup, field.name, firstMarker)
        currentRestore = null
      }
    }

    const restored = await getDocument(target.id)
    if (backup && comparableDocument(restored) !== comparableDocument(backup)) {
      throw new Error(`${target.type} did not restore exactly`)
    }
    if (!backup && restored) throw new Error(`${target.type} temporary document was not removed`)

    documentReport.status = 'passed-restored'
    currentRestore = null
    console.log(
      `PASS ${target.type}: ${fields.length} fields, ${documentReport.values} values, ` +
      `${documentReport.sections} sections, ${documentReport.batches} batches, ` +
      `${documentReport.visible}/${evidence.length} markers visible, ` +
      `${documentReport.missing.length} missing, restored`
    )
  }
} catch (error) {
  runFailed = true
  report.error = error.stack || error.message
  if (currentRestore) {
    try {
      await emergencyRestore(currentRestore.target, currentRestore.backup)
      report.emergencyRestore = 'passed'
    } catch (restoreError) {
      report.emergencyRestore = restoreError.stack || restoreError.message
    }
  }
  console.error(`FAIL ${error.message}`)
  process.exitCode = 1
} finally {
  report.finishedAt = new Date().toISOString()
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  if (!dryRun) {
    await writeFile(backupPath, `${JSON.stringify(backups, null, 2)}\n`)
  }
}

if (dryRun) {
  console.log(`TOTAL ${report.totals.documents} documents, ${report.totals.sections} sections, ${report.totals.fields} top-level fields, ${report.totals.values} editable values, ${report.totals.batches} batches, ${report.totals.evidence} markers`)
} else {
  if (!runFailed) await unlink(backupPath).catch(() => {})
  console.log(`REPORT ${reportPath}`)
}
