import assert from 'node:assert/strict'
import test from 'node:test'

import {buildPageMetadata} from '../src/lib/metadata.js'

test('uses page SEO fields and produces canonical social metadata', () => {
  const metadata = buildPageMetadata({
    page: {
      seo: {
        title: 'Editable title',
        description: 'Editable description',
        canonicalUrl: '/about',
        image: {imageUrl: 'https://cdn.sanity.io/example.jpg', alt: 'Team'},
      },
    },
    siteSettings: {
      siteName: 'Atlas Fuel',
      baseUrl: 'https://atlasfuel.com.au',
    },
    path: '/about',
  })

  assert.equal(metadata.title, 'Editable title')
  assert.equal(metadata.alternates.canonical, 'https://atlasfuel.com.au/about')
  assert.equal(metadata.openGraph.images[0].alt, 'Team')
  assert.deepEqual(metadata.twitter.images, ['https://cdn.sanity.io/example.jpg'])
})

test('falls back safely and supports noindex', () => {
  const metadata = buildPageMetadata({
    page: {seo: {indexMode: 'noindex'}},
    siteSettings: {baseUrl: 'not a URL'},
    path: '/contact',
    fallbackTitle: 'Contact',
    fallbackDescription: 'Contact Atlas Fuel',
  })

  assert.equal(metadata.alternates.canonical, 'https://atlasfuel.com.au/contact')
  assert.equal(metadata.robots.index, false)
  assert.equal(metadata.title, 'Contact')
})
