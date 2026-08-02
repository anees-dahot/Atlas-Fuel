import { stegaClean } from '@sanity/client/stega'

const colorMap = {
  'text-gray-900': 'rgb(var(--cms-gray-900-rgb))',
  'text-black': 'var(--cms-text)',
  'text-primary': 'var(--cms-primary)',
  'text-white': 'var(--cms-background)',
  'text-gray-600': 'rgb(var(--cms-gray-600-rgb))',
  'text-gray-500': 'rgb(var(--cms-gray-500-rgb))',
  '#111827': 'rgb(var(--cms-gray-900-rgb))',
  '#000000': 'var(--cms-text)',
  '#2db234': 'var(--cms-primary)',
  '#17a350': 'var(--cms-primary)',
  '#ffffff': 'var(--cms-background)',
  '#4b5563': 'rgb(var(--cms-gray-600-rgb))',
  '#6b7280': 'rgb(var(--cms-gray-500-rgb))',
}

const sizeMap = {
  '1': '12px',
  '2': '16px',
  '3': '20px',
  '4': '24px',
  '5': '32px',
  '6': '48px',
  '7': '70px',
}

export const cleanCmsValue = (value) =>
  typeof value === 'string' ? stegaClean(value) : value

export const cleanCmsLink = (value) => cleanCmsValue(value) || ''

export function cmsTextStyle(data = {}, field) {
  const color = cleanCmsValue(data[`${field}Color`])
  const size = cleanCmsValue(data[`${field}Size`])
  const borderColor = cleanCmsValue(data[`${field}BorderColor`])
  const borderWidth = cleanCmsValue(data[`${field}BorderWidth`])
  const shadow = cleanCmsValue(data[`${field}ShadowColor`])
  const style = {}

  if (color) style.color = colorMap[color] ?? color
  if (size) style.fontSize = sizeMap[size] ?? size
  if (data[`${field}BorderEnabled`]) {
    style.WebkitTextStroke = `${borderWidth || '1px'} ${colorMap[borderColor] ?? borderColor ?? 'currentColor'}`
  }
  if (shadow) style.textShadow = `0 2px 4px ${shadow}`

  return style
}
