const sizeMap = {
  '1': '12px',
  '2': '16px',
  '3': '20px',
  '4': '24px',
  '5': '32px',
  '6': '48px',
  '7': '70px',
}

const colorMap = {
  'text-gray-900': 'rgb(var(--cms-gray-900-rgb))',
  'text-gray-600': 'rgb(var(--cms-gray-600-rgb))',
  'text-primary': 'var(--cms-primary)',
  'text-white': 'var(--cms-background)',
  'text-black': 'var(--cms-text)',
  '#111827': 'rgb(var(--cms-gray-900-rgb))',
  '#4b5563': 'rgb(var(--cms-gray-600-rgb))',
  '#6b7280': 'rgb(var(--cms-gray-500-rgb))',
  '#2db234': 'var(--cms-primary)',
  '#17a350': 'var(--cms-primary)',
  '#1a7a1f': 'var(--cms-primary-dark)',
  '#0f7037': 'var(--cms-primary-dark)',
  '#ffffff': 'var(--cms-background)',
  '#000000': 'var(--cms-text)',
  '#0a0a0a': 'var(--cms-text)',
  'rgba(255,255,255,0.8)': 'rgb(var(--cms-background-rgb) / 0.8)',
}

export function cmsColor(value, fallback) {
  const selected = value ?? fallback
  return colorMap[String(selected).toLowerCase()] ?? selected
}

export function cmsSize(value, fallback) {
  return sizeMap[value] ?? value ?? fallback
}

export function cmsTextStyle(data = {}, field, fallbackColor, fallbackSize) {
  const style = {
    color: cmsColor(data[`${field}Color`], fallbackColor),
    fontSize: cmsSize(data[`${field}Size`], fallbackSize),
  }

  if (data[`${field}BorderEnabled`]) {
    style.WebkitTextStroke = `${data[`${field}BorderWidth`] || '1px'} ${cmsColor(data[`${field}BorderColor`], fallbackColor)}`
  }

  if (data[`${field}ShadowColor`]) {
    style.textShadow = `0 2px 4px ${data[`${field}ShadowColor`]}`
  }

  return style
}

export function mapCtaBanner(cta = {}, fallback = {}) {
  return {
    ...fallback,
    ctaBannerHeading: cta.heading ?? fallback.ctaBannerHeading,
    ctaBannerText: cta.text ?? fallback.ctaBannerText,
    ctaBannerButtonText: cta.buttonText ?? fallback.ctaBannerButtonText,
    ctaBannerButtonLink: cta.buttonLink ?? fallback.ctaBannerButtonLink,
    phone: cta.phone ?? fallback.phone,
    email: cta.email ?? fallback.email,
    address: cta.address ?? fallback.address,
  }
}
