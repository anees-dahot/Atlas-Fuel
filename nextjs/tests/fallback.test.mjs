import test from 'node:test'
import assert from 'node:assert/strict'
import {mergeWithFallback} from '../src/lib/fallback.js'
import {mapPageCta} from '../src/lib/contentFallbacks.js'

const fallback = {
  hero: {
    title: 'Fallback title',
    imageUrl: '/images/fallback.webp',
  },
  cards: [
    {title: 'Fallback card', imageUrl: '/images/card.webp'},
  ],
}

test('uses the complete fallback when the CMS document is missing', () => {
  assert.deepEqual(mergeWithFallback(fallback, null), fallback)
})

test('fills missing scalar and image fields in partial CMS content', () => {
  assert.deepEqual(mergeWithFallback(fallback, {hero: {title: 'CMS title'}}), {
    ...fallback,
    hero: {title: 'CMS title', imageUrl: '/images/fallback.webp'},
  })
})

test('preserves complete CMS content', () => {
  const content = {
    hero: {title: 'CMS title', imageUrl: 'https://cdn.sanity.io/image.webp'},
    cards: [{title: 'CMS card', imageUrl: 'https://cdn.sanity.io/card.webp'}],
  }
  assert.deepEqual(mergeWithFallback(fallback, content), content)
})

test('preserves an intentionally empty CMS array', () => {
  assert.deepEqual(mergeWithFallback(fallback, {cards: []}).cards, [])
})

test('uses CMS arrays as complete editor-authored units', () => {
  assert.deepEqual(mergeWithFallback(fallback, {cards: [{title: 'CMS card'}]}).cards, [
    {title: 'CMS card'},
  ])
})

test('preserves intentionally empty strings', () => {
  assert.deepEqual(
    mergeWithFallback({eyebrow: 'Fallback'}, {eyebrow: ''}),
    {eyebrow: ''},
  )
})

test('preserves intentionally blank page and global CTA contact fields', () => {
  const result = mapPageCta(
    {ctaBanner: {heading: '', phone: ''}},
    {phone: '08 1234 5678', ctaBanner: {heading: 'Global heading'}},
    {ctaBannerHeading: 'Fallback heading'},
  )

  assert.equal(result.ctaBannerHeading, '')
  assert.equal(result.phone, '')
})
