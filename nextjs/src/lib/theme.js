const DEFAULT_COLORS = {
  primary: '#17a350',
  primaryDark: '#0f7037',
  background: '#ffffff',
  text: '#000000',
  muted: '#4b5563',
  surface: '#f4f4f4',
  cream: '#f5f0e8',
  sand: '#ede8e0',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  gray950: '#030712',
}

const FONT_FAMILIES = {
  Manrope: 'var(--font-manrope), Manrope, sans-serif',
  Inter: 'var(--font-inter), Inter, sans-serif',
  Oswald: 'var(--font-oswald), Oswald, sans-serif',
  'Bebas Neue': 'var(--font-bebas-neue), "Bebas Neue", sans-serif',
}

const clampChannel = (value) =>
  Math.max(0, Math.min(255, Math.round(Number(value) || 0)))

export function colorToRgb(value, fallback) {
  const color = typeof value === 'string' ? value.trim() : ''
  const fallbackRgb = fallback || '0 0 0'
  const shortHex = color.match(/^#([0-9a-f]{3})$/i)
  const longHex = color.match(/^#([0-9a-f]{6})(?:[0-9a-f]{2})?$/i)
  const rgb = color.match(
    /^rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)/i
  )

  if (shortHex) {
    return shortHex[1]
      .split('')
      .map((channel) => parseInt(`${channel}${channel}`, 16))
      .join(' ')
  }

  if (longHex) {
    return [0, 2, 4]
      .map((offset) => parseInt(longHex[1].slice(offset, offset + 2), 16))
      .join(' ')
  }

  if (rgb) {
    return [rgb[1], rgb[2], rgb[3]].map(clampChannel).join(' ')
  }

  return fallbackRgb
}

const fontFamily = (value, fallback) =>
  FONT_FAMILIES[value] || FONT_FAMILIES[fallback]

const fontWeight = (value, fallback) => {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return String(fallback)
  return String(Math.max(100, Math.min(900, Math.round(parsed / 100) * 100)))
}

export function buildThemeStyle(theme) {
  const authoredColors = theme?.colors || {}
  const colors = {...DEFAULT_COLORS, ...authoredColors}
  const typography = theme?.typography || {}
  const surface = authoredColors.surface ?? colors.surface
  const muted = authoredColors.muted ?? colors.muted
  const text = authoredColors.text ?? colors.text
  const cream = authoredColors.cream ?? authoredColors.surface ?? colors.cream
  const sand = authoredColors.sand ?? authoredColors.surface ?? colors.sand
  const gray = (shade, semantic, fallback) =>
    authoredColors[`gray${shade}`] ?? semantic ?? fallback

  return {
    '--cms-primary': colors.primary,
    '--cms-primary-dark': colors.primaryDark,
    '--cms-background': colors.background,
    '--cms-text': text,
    '--cms-muted': muted,
    '--cms-surface': surface,
    '--cms-cream': cream,
    '--cms-sand': sand,
    '--cms-primary-rgb': colorToRgb(colors.primary, '23 163 80'),
    '--cms-primary-dark-rgb': colorToRgb(colors.primaryDark, '15 112 55'),
    '--cms-background-rgb': colorToRgb(colors.background, '255 255 255'),
    '--cms-text-rgb': colorToRgb(text, '10 10 10'),
    '--cms-muted-rgb': colorToRgb(muted, '75 85 99'),
    '--cms-surface-rgb': colorToRgb(surface, '244 244 244'),
    '--cms-cream-rgb': colorToRgb(cream, '245 240 232'),
    '--cms-sand-rgb': colorToRgb(sand, '237 232 224'),
    '--cms-gray-50-rgb': colorToRgb(gray('50', surface, colors.gray50), '249 250 251'),
    '--cms-gray-100-rgb': colorToRgb(gray('100', surface, colors.gray100), '243 244 246'),
    '--cms-gray-200-rgb': colorToRgb(gray('200', surface, colors.gray200), '229 231 235'),
    '--cms-gray-300-rgb': colorToRgb(gray('300', muted, colors.gray300), '209 213 219'),
    '--cms-gray-400-rgb': colorToRgb(gray('400', muted, colors.gray400), '156 163 175'),
    '--cms-gray-500-rgb': colorToRgb(gray('500', muted, colors.gray500), '107 114 128'),
    '--cms-gray-600-rgb': colorToRgb(gray('600', muted, colors.gray600), '75 85 99'),
    '--cms-gray-700-rgb': colorToRgb(gray('700', muted, colors.gray700), '55 65 81'),
    '--cms-gray-800-rgb': colorToRgb(gray('800', text, colors.gray800), '31 41 55'),
    '--cms-gray-900-rgb': colorToRgb(gray('900', text, colors.gray900), '17 24 39'),
    '--cms-gray-950-rgb': colorToRgb(gray('950', text, colors.gray950), '3 7 18'),
    '--cms-font-heading': fontFamily(
      typography.headingFamily,
      'Manrope'
    ),
    '--cms-font-body': fontFamily(typography.bodyFamily, 'Manrope'),
    '--cms-heading-weight': fontWeight(typography.headingWeight, 700),
    '--cms-body-weight': fontWeight(typography.bodyWeight, 400),
  }
}

export {DEFAULT_COLORS, FONT_FAMILIES}
