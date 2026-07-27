const colorMap = {
  'text-gray-900': '#111827',
  'text-black': '#000000',
  'text-primary': '#10b981',
  'text-white': '#ffffff',
  'text-gray-600': '#4b5563',
  'text-gray-500': '#6b7280',
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

  if (color) style.color = colorMap[color] || color
  if (size) style.fontSize = sizeMap[size] || size

  if (data[`${field}BorderEnabled`]) {
    style.WebkitTextStroke = `${data[`${field}BorderWidth`] || '1px'} ${
      data[`${field}BorderColor`] || 'currentColor'
    }`
  }

  if (data[`${field}ShadowColor`]) {
    style.textShadow = `0 0 10px ${data[`${field}ShadowColor`]}`
  }

  return style
}
