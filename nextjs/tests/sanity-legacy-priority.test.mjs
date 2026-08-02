import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../src/lib/sanity.js', import.meta.url), 'utf8')

const extract = (startMarker, endMarker) => {
  const start = source.indexOf(startMarker)
  const end = source.indexOf(endMarker, start)
  assert.notEqual(start, -1, `Missing ${startMarker}`)
  assert.notEqual(end, -1, `Missing ${endMarker}`)
  return source.slice(start, end)
}

const legacySectionOrderSource = extract(
  'const legacySectionOrder =',
  '\n\nconst buildImageUrl',
)
const addLegacySectionAliasesSource = extract(
  'const addLegacySectionAliases =',
  '\n\nexport async function fetchSanity',
)

const addLegacySectionAliases = Function(
  '"use strict";\n' +
    legacySectionOrderSource +
    '\n' +
    addLegacySectionAliasesSource +
    '\nreturn addLegacySectionAliases;',
)()

test('nested empty strings and arrays override populated legacy fields', () => {
  const result = addLegacySectionAliases(
    {
      heroTitle: 'Legacy title',
      whyWorkCards: [{title: 'Legacy card'}],
      heroSection: {heroTitle: ''},
      whyWorkSection: {whyWorkCards: []},
    },
    'careersPage',
  )

  assert.equal(result.heroTitle, '')
  assert.deepEqual(result.whyWorkCards, [])
})

test('nested null and undefined retain populated legacy fields', () => {
  const result = addLegacySectionAliases(
    {
      heroTitle: 'Legacy title',
      whyWorkCards: [{title: 'Legacy card'}],
      heroSection: {heroTitle: null},
      whyWorkSection: {whyWorkCards: undefined},
    },
    'careersPage',
  )

  assert.equal(result.heroTitle, 'Legacy title')
  assert.deepEqual(result.whyWorkCards, [{title: 'Legacy card'}])
})

test('the first configured nested section owns a generic flattened alias', () => {
  const result = addLegacySectionAliases(
    {
      heading: 'Legacy heading',
      pricesSection: {heading: 'Fuel prices'},
      ctaBanner: {heading: 'CTA heading'},
    },
    'fuelPricesPage',
  )

  assert.equal(result.heading, 'Fuel prices')
})
