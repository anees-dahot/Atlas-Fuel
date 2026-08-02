#!/usr/bin/env node
import {schemaTypes} from '../schemaTypes/index.js'
import {
  PRESERVED_PRESENTATION_FIELD_NAMES,
  SINGLETON_IDS,
} from './cms-v2-config.mjs'

const errors = []
const typeNames = new Set()
const presentationPattern =
  /(Color|Size|BorderEnabled|BorderColor|BorderWidth|ShadowColor|FontFamily|FontWeight|LineHeight|LetterSpacing)$/
let fieldCount = 0
let semanticPresentationFields = 0

for (const schema of schemaTypes) {
  if (typeNames.has(schema.name)) errors.push(`Duplicate schema type: ${schema.name}`)
  typeNames.add(schema.name)
}

for (const [schemaType] of Object.entries(SINGLETON_IDS)) {
  const schema = schemaTypes.find((item) => item.name === schemaType)
  if (!schema) errors.push(`Missing singleton schema: ${schemaType}`)
  if (schema && schema.type !== 'document') {
    errors.push(`Singleton is not a document: ${schemaType}`)
  }
}

const visitFields = (fields, path) => {
  const names = new Set()

  for (const field of fields || []) {
    fieldCount += 1
    if (field.name) {
      if (names.has(field.name)) errors.push(`Duplicate field: ${path}.${field.name}`)
      names.add(field.name)
      if (presentationPattern.test(field.name)) {
        if (PRESERVED_PRESENTATION_FIELD_NAMES.has(field.name)) {
          semanticPresentationFields += 1
        } else {
          errors.push(`Legacy presentation field exposed: ${path}.${field.name}`)
        }
      }
    }

    if (field.type === 'object') {
      visitFields(field.fields, `${path}.${field.name || 'object'}`)
    }
    if (field.type === 'array') {
      for (const [index, member] of (field.of || []).entries()) {
        if (member.type === 'object') {
          visitFields(member.fields, `${path}.${field.name || 'array'}[${index}]`)
        }
      }
    }
  }
}

for (const schema of schemaTypes) {
  visitFields(schema.fields, schema.name)
}

const aboutHero = schemaTypes
  .find((schema) => schema.name === 'aboutPage')
  ?.fields?.find((field) => field.name === 'heroSection')
const removedAboutHeroFields = [
  'description',
  'stats',
  'borderEnabled',
  'borderColor',
  'borderWidth',
]
for (const fieldName of removedAboutHeroFields) {
  if (aboutHero?.fields?.some((field) => field.name === fieldName)) {
    errors.push(`Unconsumed About hero field exposed: ${fieldName}`)
  }
}

for (const removedType of [
  'cmsLink',
  'cmsSectionSettings',
  'cmsThemePreset',
  'cmsToken',
]) {
  if (typeNames.has(removedType)) errors.push(`Unused schema type exposed: ${removedType}`)
}

if (errors.length) {
  process.stderr.write(`${errors.join('\n')}\n`)
  process.exit(1)
}

process.stdout.write([
  `Schema types: ${schemaTypes.length}`,
  `Singletons guarded: ${Object.keys(SINGLETON_IDS).length}`,
  `Recursive fields validated: ${fieldCount}`,
  'Legacy per-text presentation fields exposed: 0',
  `Consumed semantic CTA presentation fields: ${semanticPresentationFields}`,
  'CMS v2 schema validation passed.',
  '',
].join('\n'))
