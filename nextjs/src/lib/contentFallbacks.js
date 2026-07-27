export function valueOrFallback(value, fallback) {
  return value === undefined || value === null || value === '' ? fallback : value
}

export function arrayOrFallback(value, fallback) {
  return Array.isArray(value) && value.length > 0 ? value : fallback
}

export function mapPageCta(pageData, siteSettings, fallback) {
  const globalCta = siteSettings?.ctaBanner || {}
  const cta = pageData?.ctaBanner || {}
  const merged = {
    ...fallback,
    ...siteSettings,
    ...globalCta,
    ...cta,
  }

  return {
    ...merged,
    ctaBannerHeading: valueOrFallback(cta.heading, valueOrFallback(globalCta.heading, fallback.ctaBannerHeading)),
    ctaBannerText: valueOrFallback(cta.text, valueOrFallback(globalCta.text, fallback.ctaBannerText)),
    ctaBannerButtonText: valueOrFallback(cta.buttonText, valueOrFallback(globalCta.buttonText, fallback.ctaBannerButtonText)),
    ctaBannerButtonLink: valueOrFallback(cta.buttonLink, valueOrFallback(globalCta.buttonLink, fallback.ctaBannerButtonLink)),
    phone: valueOrFallback(cta.phone, valueOrFallback(globalCta.phone, siteSettings?.phone || '')),
    email: valueOrFallback(cta.email, valueOrFallback(globalCta.email, siteSettings?.email || '')),
    address: valueOrFallback(cta.address, valueOrFallback(globalCta.address, siteSettings?.address || '')),
  }
}
