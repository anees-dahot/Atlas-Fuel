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
  'text-gray-900': '#111827',
  'text-gray-600': '#4b5563',
  'text-primary': '#2db234',
  'text-white': '#ffffff',
  'text-black': '#000000',
}

export function cmsColor(value, fallback) {
  return colorMap[value] || value || fallback
}

export function cmsSize(value, fallback) {
  return sizeMap[value] || value || fallback
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
    ctaBannerHeading: cta.heading || fallback.ctaBannerHeading,
    ctaBannerText: cta.text || fallback.ctaBannerText,
    ctaBannerButtonText: cta.buttonText || fallback.ctaBannerButtonText,
    ctaBannerButtonLink: cta.buttonLink ?? fallback.ctaBannerButtonLink,
    phone: cta.phone || fallback.phone,
    email: cta.email || fallback.email,
    address: cta.address || fallback.address,
  }
}
