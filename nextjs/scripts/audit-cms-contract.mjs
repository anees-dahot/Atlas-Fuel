import {readFileSync, existsSync} from 'node:fs'
import {dirname, extname, join, relative, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {parse} from '@babel/parser'
import traverseModule from '@babel/traverse'

import {schemaTypes} from '../sanity/schemaTypes/index.js'
import {SINGLETON_ITEMS} from '../sanity/schemaTypes/singletons.js'

const traverse = traverseModule.default || traverseModule
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const srcRoot = join(root, 'src')

const routes = [
  ['/', 'src/app/page.js', 'homePage', 'getHomePage'],
  ['/about', 'src/app/about/page.js', 'aboutPage', 'getAboutPage'],
  ['/services', 'src/app/services/page.js', 'servicesPage', 'getServicesPage'],
  ['/services/mining-fuel', 'src/app/services/mining-fuel/page.js', 'miningFuelPage', 'getMiningFuelPage'],
  ['/services/marine-fuel', 'src/app/services/marine-fuel/page.js', 'marineFuelPage', 'getMarineFuelPage'],
  ['/services/agriculture-fuel', 'src/app/services/agriculture-fuel/page.js', 'agricultureFuelPage', 'getAgricultureFuelPage'],
  ['/services/fuel-retailers', 'src/app/services/fuel-retailers/page.js', 'fuelRetailersPage', 'getFuelRetailersPage'],
  ['/services/onsite-bulk-diesel', 'src/app/services/onsite-bulk-diesel/page.js', 'onsiteBulkDieselPage', 'getOnsiteBulkDieselPage'],
  ['/services/local-fuel-distributors', 'src/app/services/local-fuel-distributors/page.js', 'localFuelDistributorsPage', 'getLocalFuelDistributorsPage'],
  ['/fuel-stations', 'src/app/fuel-stations/page.js', 'fuelStationsPage', 'getFuelStationsPage'],
  ['/fuel-transportation', 'src/app/fuel-transportation/page.js', 'fuelTransportationPage', 'getFuelTransportationPage'],
  ['/careers', 'src/app/careers/page.js', 'careersPage', 'getCareersPage'],
  ['/community', 'src/app/community/page.js', 'communityPage', 'getCommunityPage'],
  ['/atlas-car-racing', 'src/app/atlas-car-racing/page.js', 'atlasCarRacingPage', 'getAtlasCarRacingPage'],
  ['/commercial-diesel', 'src/app/commercial-diesel/page.js', 'commercialDieselPage', 'getCommercialDieselPage'],
  ['/fuel-station-enquiry', 'src/app/fuel-station-enquiry/page.js', 'fuelStationEnquiryPage', 'getFuelStationEnquiryPage'],
  ['/products', 'src/app/products/page.js', 'productsPage', 'getProductsPage'],
  ['/store-locator', 'src/app/store-locator/page.js', 'storeLocatorPage', 'getStoreLocatorPage'],
  ['/franchising', 'src/app/franchising/page.js', 'franchisingPage', 'getFranchisingPage'],
  ['/fuel-prices', 'src/app/fuel-prices/page.js', 'fuelPricesPage', 'getFuelPricesPage'],
  ['/news', 'src/app/news/page.js', 'newsListingPage', 'getNewsListingPage'],
  ['/news/[slug]', 'src/app/news/[slug]/page.js', 'newsPost', 'getNewsPost'],
  ['/contact', 'src/app/contact/page.js', 'contactPage', 'getContactPage'],
].map(([path, file, schema, getter]) => ({path, file, schema, getter}))

const globals = [
  ['header', 'src/components/layout/HeaderServer.js', 'megaMenu', 'getMegaMenu'],
  ['site', 'src/components/layout/HeaderServer.js', 'siteSettings', 'getSiteSettings'],
  ['footer', 'src/components/layout/FooterServer.js', 'footerNavigation', 'getFooterNavigation'],
  ['footer-site', 'src/components/layout/FooterServer.js', 'siteSettings', 'getSiteSettings'],
  ['theme', 'src/app/layout.js', 'themeSettings', 'getThemeSettings'],
  ['errors', 'src/app/not-found.js', 'errorPages', 'getErrorPages'],
].map(([name, file, schema, getter]) => ({name, file, schema, getter}))

const documents = new Map(
  schemaTypes.filter((type) => type.type === 'document').map((type) => [type.name, type]),
)
const namedTypes = new Map(schemaTypes.map((type) => [type.name, type]))
const singletonTypes = new Set(SINGLETON_ITEMS.map(({type}) => type))
const sanitySource = readFileSync(join(root, 'src/lib/sanity.js'), 'utf8')

const parseSource = (source, filename) =>
  parse(source, {
    sourceType: 'unambiguous',
    sourceFilename: filename,
    plugins: ['jsx', 'typescript', 'dynamicImport'],
  })

const resolveImport = (fromFile, specifier) => {
  let base
  if (specifier.startsWith('@/')) base = join(srcRoot, specifier.slice(2))
  else if (specifier.startsWith('.')) base = resolve(dirname(fromFile), specifier)
  else return null

  const candidates = extname(base)
    ? [base]
    : [`${base}.js`, `${base}.jsx`, `${base}.mjs`, join(base, 'index.js')]
  return candidates.find((candidate) => existsSync(candidate)) || null
}

const dependencyClosure = (entryRelative) => {
  const entry = join(root, entryRelative)
  const pending = [entry]
  const seen = new Set()

  while (pending.length) {
    const file = pending.pop()
    if (!file || seen.has(file) || !file.startsWith(srcRoot)) continue
    seen.add(file)
    const source = readFileSync(file, 'utf8')
    const ast = parseSource(source, file)
    traverse(ast, {
      ImportDeclaration(path) {
        const target = resolveImport(file, path.node.source.value)
        if (target) pending.push(target)
      },
    })
  }
  return [...seen].sort()
}

const compactText = (value) => value.replace(/\s+/g, ' ').trim()
const hasWords = (value) => /[A-Za-z]{2}/.test(value)
const variableOwner = (path) => {
  const declaration = path.findParent((parent) => parent.isVariableDeclarator())
  return declaration?.node?.id?.type === 'Identifier' ? declaration.node.id.name : ''
}

const renderedLiterals = (files) => {
  const results = []
  for (const file of files) {
    const source = readFileSync(file, 'utf8')
    const ast = parseSource(source, file)
    const add = (path, value, kind) => {
      const text = compactText(value)
      if (!text || !hasWords(text)) return
      const owner = variableOwner(path)
      results.push({
        file: relative(root, file),
        line: path.node.loc?.start.line || 0,
        kind,
        text,
        fallback: /^fallback/i.test(owner),
      })
    }
    traverse(ast, {
      JSXText(path) {
        add(path, path.node.value, 'jsx-text')
      },
      JSXExpressionContainer(path) {
        if (path.node.expression?.type === 'StringLiteral') {
          add(path, path.node.expression.value, 'jsx-string')
        }
      },
      JSXAttribute(path) {
        const name = path.node.name?.name
        if (!['alt', 'title', 'placeholder', 'aria-label'].includes(name)) return
        if (path.node.value?.type === 'StringLiteral') {
          add(path, path.node.value.value, `attribute:${name}`)
        }
      },
    })
  }
  return results
}

const schemaFieldNames = (schema) => {
  const names = new Set()
  const visit = (field, visitedTypes = new Set()) => {
    if (field.name) names.add(field.name)
    const named = namedTypes.get(field.type)
    const fields = field.fields || named?.fields
    const namedAlreadyVisited = named && visitedTypes.has(field.type)
    if (fields?.length && !namedAlreadyVisited) {
      const nextVisited = named
        ? new Set(visitedTypes).add(field.type)
        : visitedTypes
      for (const child of fields) visit(child, nextVisited)
    }
    for (const member of field.of || []) visit(member, visitedTypes)
  }
  for (const field of schema?.fields || []) visit(field)
  return names
}

const sourcePropertyNames = (files) => {
  const names = new Set()
  for (const file of files) {
    if (file.includes('/src/lib/sanity.')) continue
    const source = readFileSync(file, 'utf8')
    const ast = parseSource(source, file)
    const addProperty = (node) => {
      if (!node.computed && node.property?.type === 'Identifier') names.add(node.property.name)
      if (node.computed && node.property?.type === 'StringLiteral') names.add(node.property.value)
    }
    traverse(ast, {
      MemberExpression(path) {
        addProperty(path.node)
      },
      OptionalMemberExpression(path) {
        addProperty(path.node)
      },
      ObjectProperty(path) {
        if (!path.node.computed && path.node.key?.type === 'Identifier') names.add(path.node.key.name)
        if (path.node.key?.type === 'StringLiteral') names.add(path.node.key.value)
      },
    })
  }
  return names
}

const fallbackObjectKeys = (file) => {
  const source = readFileSync(file, 'utf8')
  const ast = parseSource(source, file)
  const keys = new Set()
  const visit = (node) => {
    if (!node) return
    if (node.type === 'ObjectExpression') {
      for (const property of node.properties) {
        if (property.type !== 'ObjectProperty') continue
        const key = property.key.type === 'Identifier' ? property.key.name : property.key.value
        if (typeof key === 'string') keys.add(key)
        visit(property.value)
      }
    } else if (node.type === 'ArrayExpression') {
      for (const element of node.elements) visit(element)
    } else if (node.type === 'JSXElement' || node.type === 'JSXFragment') {
      // Fallback Portable Text/JSX bodies are content, not object contracts.
      return
    }
  }
  traverse(ast, {
    VariableDeclarator(path) {
      if (path.node.id?.type === 'Identifier' && /^fallback/i.test(path.node.id.name)) {
        visit(path.node.init)
      }
    },
  })
  return keys
}

const presentationSuffix = /(Color|Size|BorderEnabled|BorderColor|BorderWidth|ShadowColor|FontFamily|FontWeight|LineHeight|LetterSpacing)$/
const keyHasSchemaEquivalent = (key, fieldNames) => {
  if (fieldNames.has(key)) return true
  const candidates = new Set([
    key.replace(/Alt$/, ''),
    key.replace(/UrlAlt$/, 'Url'),
    key.replace(/ImageAlt$/, 'Image'),
    key.replace(/Url$/, ''),
    key.replace(/Image$/, ''),
  ])
  if (key === 'imageUrl' || key === 'imageAlt') candidates.add('image')
  if (key === 'heroImageAlt') candidates.add('heroImageUrl')
  return [...candidates].some((candidate) => fieldNames.has(candidate))
}

const unsafeCmsFallbacks = (files) => {
  const findings = []
  for (const file of files) {
    const source = readFileSync(file, 'utf8')
    const ast = parseSource(source, file)
    const add = (path, kind) => {
      const start = path.node.start ?? 0
      const end = path.node.end ?? start
      findings.push({
        file: relative(root, file),
        line: path.node.loc?.start.line || 0,
        kind,
        expression: compactText(source.slice(start, end)).slice(0, 220),
      })
    }
    const mentionsCms = (node) => {
      const text = source.slice(node.start ?? 0, node.end ?? 0)
      return /\b(sanity|sanityPost|data|pageData|siteSettings|globalSettings|post|posts|newsPosts|settings|s)\??\./.test(text)
    }
    traverse(ast, {
      LogicalExpression(path) {
        if (path.node.operator === '||' && mentionsCms(path.node.left)) add(path, 'truthy-fallback')
      },
      ConditionalExpression(path) {
        const test = source.slice(path.node.test.start ?? 0, path.node.test.end ?? 0)
        if (/\b(sanity|sanityPost|data|pageData|siteSettings|globalSettings|post|posts|newsPosts|settings|s)\??\.[^\n?]*\.length\b/.test(test)) {
          add(path, 'nonempty-array-fallback')
        }
      },
    })
  }
  return findings
}

const routeResults = []
const structuralErrors = []
for (const route of routes) {
  const schema = documents.get(route.schema)
  const pageSource = readFileSync(join(root, route.file), 'utf8')
  const getterExists = new RegExp(`export\\s+async\\s+function\\s+${route.getter}\\b`).test(sanitySource)
  const getterReferences = pageSource.match(new RegExp(`\\b${route.getter}\\b`, 'g'))?.length || 0
  const getterUsed = getterReferences >= 2
  const metadata = /export\s+(async\s+)?function\s+generateMetadata\b|export\s+const\s+metadata\b/.test(pageSource)
  const singleton = route.schema === 'newsPost' || singletonTypes.has(route.schema)
  const dependencies = dependencyClosure(route.file)
  const literals = renderedLiterals(dependencies)
  const unsafe = unsafeCmsFallbacks(dependencies)
  const fieldNames = schemaFieldNames(schema)
  const references = sourcePropertyNames(dependencies)
  const fallbackKeys = fallbackObjectKeys(join(root, route.file))
  const fallbackKeysWithoutSchemaField = [...fallbackKeys]
    .filter((key) => !presentationSuffix.test(key))
    .filter((key) => !keyHasSchemaEquivalent(key, fieldNames))
    .sort()
  const presentationFallbackKeys = [...fallbackKeys]
    .filter((key) => presentationSuffix.test(key))
    .filter((key) => !fieldNames.has(key))
    .sort()
  const presentationFrontendFieldsWithoutSchema = [...references]
    .filter((key) => presentationSuffix.test(key))
    .filter((key) => !fieldNames.has(key))
    .sort()
  const potentialSchemaFieldsNotReferenced = [...fieldNames]
    .filter((name) => !references.has(name))
    .sort()

  const result = {
    ...route,
    schemaExists: Boolean(schema),
    singleton,
    getterExists,
    getterUsed,
    metadata,
    dependencyCount: dependencies.length,
    directRenderedLiterals: literals.filter((item) => !item.fallback),
    fallbackRenderedLiterals: literals.filter((item) => item.fallback),
    unsafeFallbacks: unsafe,
    fallbackKeysWithoutSchemaField,
    presentationFallbackKeys,
    presentationFrontendFieldsWithoutSchema,
    potentialSchemaFieldsNotReferenced,
  }
  routeResults.push(result)
  for (const [check, passed] of Object.entries({schemaExists: result.schemaExists, singleton, getterExists, getterUsed, metadata})) {
    if (!passed) structuralErrors.push(`${route.path}: ${check}`)
  }
}

const globalResults = globals.map((item) => {
  const source = readFileSync(join(root, item.file), 'utf8')
  const result = {
    ...item,
    schemaExists: documents.has(item.schema),
    singleton: singletonTypes.has(item.schema),
    getterExists: new RegExp(`export\\s+async\\s+function\\s+${item.getter}\\b`).test(sanitySource),
    getterUsed: new RegExp(`\\b${item.getter}\\s*\\(`).test(source),
  }
  for (const check of ['schemaExists', 'singleton', 'getterExists', 'getterUsed']) {
    if (!result[check]) structuralErrors.push(`${item.name}: ${check}`)
  }
  return result
})

const mergeFallbackSource = readFileSync(join(root, 'src/lib/fallback.js'), 'utf8')
const fallbackSemantics = {
  onlyNullishMissing: /value\s*!==\s*undefined\s*&&\s*value\s*!==\s*null/.test(mergeFallbackSource),
  arraysAreAuthoritative:
    /Array\.isArray\(content\)\s*\?\s*content\s*:\s*fallback/.test(mergeFallbackSource),
}

const contractErrors = []
if (!fallbackSemantics.onlyNullishMissing) {
  contractErrors.push('fallback helper treats an authored false, zero, or empty string as missing')
}
if (!fallbackSemantics.arraysAreAuthoritative) {
  contractErrors.push('fallback helper replaces an authored empty array')
}

const extractProjection = (source, name) => {
  const marker = source.search(new RegExp(`\\b${name}\\s*\\{`))
  if (marker < 0) return ''
  const start = source.indexOf('{', marker)
  let depth = 0
  for (let index = start; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1
    if (source[index] !== '}') continue
    depth -= 1
    if (depth === 0) return source.slice(start + 1, index)
  }
  return ''
}

const homeSource = readFileSync(join(root, 'src/app/page.js'), 'utf8')
const pageCtaSource = readFileSync(join(root, 'src/lib/contentFallbacks.js'), 'utf8')
const homeCtaProjection = extractProjection(homeSource, 'ctaBanner')
const homeCtaFields = [
  'stylePreset',
  'backgroundColor',
  'buttonBackgroundColor',
  'backgroundImage',
  'overlayOpacity',
]
for (const field of homeCtaFields) {
  if (!new RegExp(`\\b${field}\\b`).test(homeCtaProjection)) {
    contractErrors.push(`homepage CTA query omits ctaBanner.${field}`)
  }
  const inlineMapping = new RegExp(`s\\?\\.ctaBanner\\?\\.${field}\\b`).test(homeSource)
  const sharedMapping =
    new RegExp(`\\b${field}\\s*:\\s*valueOrFallback\\(cta\\.${field}\\b`).test(pageCtaSource) &&
    new RegExp(`globalCta\\.${field}\\b`).test(pageCtaSource)
  if (!inlineMapping && !sharedMapping) {
    contractErrors.push(`homepage CTA mapping omits ctaBanner.${field}`)
  }
}

const criticalHomeProperties = new Set([
  'tagline', 'heading', 'body', 'stat1Value', 'stat1Label', 'stat2Value', 'stat2Label',
  'ctaText', 'ctaLink', 'eyebrow', 'description', 'ctaPrimary', 'ctaPrimaryLink',
  'ctaSecondary', 'ctaSecondaryLink', 'videoTitle', 'videoSubtitle', 'quickLinksLabel',
  'tag', 'quote', 'quoteHighlight', 'videoLabel', 'bylineLabel', 'readMoreText',
])
const homeResult = routeResults.find((route) => route.path === '/')
const criticalHomeFallbacks = (homeResult?.unsafeFallbacks || []).filter((finding) => {
  if (finding.kind === 'nonempty-array-fallback') return true
  const property = finding.expression.match(/(?:data|newsPosts)\?*\.(\w+)/)?.[1]
  return property && criticalHomeProperties.has(property)
})
for (const finding of criticalHomeFallbacks) {
  contractErrors.push(
    `authored empty homepage value is replaced at ${finding.file}:${finding.line}`,
  )
}
if (/newsPosts\?\.length\s*\?/.test(homeSource)) {
  contractErrors.push('homepage replaces an authored empty news collection with fallback articles')
}

const cmsVideoSource = readFileSync(join(root, 'src/components/common/CmsVideo.js'), 'utf8')
if (!/\bcaption\b/.test(cmsVideoSource)) {
  contractErrors.push('cmsVideo.caption exists in Studio but is not accepted or rendered by CmsVideo')
}

const miningStatsSource = readFileSync(join(root, 'src/components/services/MiningStats.js'), 'utf8')
for (const field of ['footerText', 'ctaText', 'ctaLink']) {
  if (!new RegExp(`data\\.${field}\\b`).test(miningStatsSource)) {
    contractErrors.push(`miningFuelPage.statsSection.${field} exists in Studio but is not rendered`)
  }
}

const globalCssSource = readFileSync(join(root, 'src/styles/global.css'), 'utf8')
const globalHeadingFont =
  /h1\s*,[\s\S]{0,120}h6\s*\{[\s\S]{0,180}font-family\s*:\s*var\(--cms-font-heading\)/.test(globalCssSource)
if (!globalHeadingFont) {
  contractErrors.push('theme heading font is not applied globally to h1-h6')
}

const fixedPresentationFallbacks = Object.fromEntries(
  routeResults
    .filter((route) => route.presentationFallbackKeys.length)
    .map((route) => [route.path, route.presentationFallbackKeys.length]),
)

const report = {
  scope: {
    routes: routes.length,
    globals: globals.length,
    documentSchemas: documents.size,
    singletonSchemas: singletonTypes.size,
  },
  fallbackSemantics,
  structuralErrors,
  contractErrors,
  fixedPresentationFallbacks,
  routes: routeResults,
  globals: globalResults,
}

console.log(JSON.stringify(report, null, 2))
process.exitCode = structuralErrors.length || contractErrors.length ? 1 : 0
