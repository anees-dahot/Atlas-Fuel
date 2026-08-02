import assert from 'node:assert/strict'
import test from 'node:test'

import {buildThemeStyle, colorToRgb} from '../src/lib/theme.js'

test('converts supported CMS colors to Tailwind RGB channels', () => {
  assert.equal(colorToRgb('#2db234'), '45 178 52')
  assert.equal(colorToRgb('#abc'), '170 187 204')
  assert.equal(colorToRgb('rgb(12, 34, 56)'), '12 34 56')
})

test('maps allowlisted CMS typography and palette to CSS variables', () => {
  const style = buildThemeStyle({
    colors: {primary: '#2db234'},
    typography: {
      headingFamily: 'Oswald',
      bodyFamily: 'Inter',
      headingWeight: 650,
      bodyWeight: 450,
    },
  })

  assert.equal(style['--cms-primary-rgb'], '45 178 52')
  assert.match(style['--cms-font-heading'], /font-oswald/)
  assert.match(style['--cms-font-body'], /font-inter/)
  assert.equal(style['--cms-heading-weight'], '700')
  assert.equal(style['--cms-body-weight'], '500')
})

test('propagates compact semantic colors through every site palette token', () => {
  const style = buildThemeStyle({
    colors: {
      text: '#112233',
      muted: '#445566',
      surface: '#ddeeff',
    },
  })

  assert.equal(style['--cms-muted'], '#445566')
  assert.equal(style['--cms-gray-600-rgb'], '68 85 102')
  assert.equal(style['--cms-gray-900-rgb'], '17 34 51')
  assert.equal(style['--cms-gray-100-rgb'], '221 238 255')
  assert.equal(style['--cms-cream'], '#ddeeff')
  assert.equal(style['--cms-sand'], '#ddeeff')
})

test('rejects arbitrary font names and malformed colors', () => {
  const style = buildThemeStyle({
    colors: {primary: 'url(javascript:alert(1))'},
    typography: {headingFamily: 'Untrusted Font'},
  })

  assert.equal(style['--cms-primary-rgb'], '23 163 80')
  assert.match(style['--cms-font-heading'], /font-manrope/)
})
