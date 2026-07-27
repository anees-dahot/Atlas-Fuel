import test from 'node:test'
import assert from 'node:assert/strict'
import {mergeWithFallback} from '../src/lib/fallback.js'

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

test('uses fallback arrays when the CMS array is empty', () => {
  assert.deepEqual(mergeWithFallback(fallback, {cards: []}).cards, fallback.cards)
})

test('fills missing fields inside non-empty CMS arrays', () => {
  assert.deepEqual(mergeWithFallback(fallback, {cards: [{title: 'CMS card'}]}).cards, [
    {title: 'CMS card', imageUrl: '/images/card.webp'},
  ])
})
