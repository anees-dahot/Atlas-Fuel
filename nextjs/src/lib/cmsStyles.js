const colorMap = {
  'text-gray-900': 'rgb(var(--cms-gray-900-rgb))',
  'text-black': 'var(--cms-text)',
  'text-primary': 'var(--cms-primary)',
  'text-white': 'var(--cms-background)',
  'text-gray-600': 'rgb(var(--cms-gray-600-rgb))',
  'text-gray-500': 'rgb(var(--cms-gray-500-rgb))',
  '#111827': 'rgb(var(--cms-gray-900-rgb))',
  '#000000': 'var(--cms-text)',
  '#10b981': 'var(--cms-primary)',
  '#2db234': 'var(--cms-primary)',
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

export function getCmsTextStyle(data = {}, field) {
  const style = {}
  const color = data[`${field}Color`]
  const size = data[`${field}Size`]

  if (color) style.color = colorMap[color] ?? color
  if (size) style.fontSize = sizeMap[size] ?? size

  if (data[`${field}BorderEnabled`]) {
    style.WebkitTextStroke = `${data[`${field}BorderWidth`] || '1px'} ${
      colorMap[data[`${field}BorderColor`]] ?? data[`${field}BorderColor`] ?? 'currentColor'
    }`
  }

  if (data[`${field}ShadowColor`]) {
    style.textShadow = `0 0 10px ${data[`${field}ShadowColor`]}`
  }

  return style
}
