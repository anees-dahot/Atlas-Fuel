import { getFuelPricesPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import { getLiveFuelRates, mapFuelRatesToRows } from '@/lib/fuelRates'
import CTABanner from '@/components/shared/CTABanner'
import ServiceHero from '@/components/services/ServiceHero'
import FuelPriceSubscribeForm from './FuelPriceSubscribeForm'
import CmsImage from '@/components/common/CmsImage'
import {loadPageMetadata} from '@/lib/metadata'

const fallbackSiteSettings = {
  ctaBannerHeading: 'Get Competitive Fuel Pricing',
  ctaBannerText: 'Contact us today for custom fuel pricing solutions for your business operations.',
  ctaBannerButtonText: 'Get a Quote',
  ctaBannerButtonLink: '/contact',
}

const fallbackData = {
  heroSubtitle: 'Fuel Prices',
  heroSubtitleColor: 'var(--cms-primary)',
  heroSubtitleSize: '14px',
  heroTitle: 'Live Fuel Rates & Pricing',
  heroTitleColor: 'var(--cms-background)',
  heroTitleSize: '72px',
  heroDescription: 'Access real-time fuel pricing information and subscribe to price alerts. Our competitive rates help businesses across Australia optimize their fuel costs.',
  heroDescriptionColor: 'var(--cms-background)',
  heroDescriptionSize: '18px',
  heroImageUrl: '/images/atlas-fuel-hero-1c.webp',
  subscribeHeading: 'Subscribe to Price Alerts',
  subscribeHeadingColor: 'var(--cms-background)',
  subscribeHeadingSize: '48px',
  subscribeDescription: 'Get notified when fuel prices drop in your area. Stay ahead of the market with real-time alerts.',
  subscribeDescriptionColor: 'var(--cms-background)',
  subscribeDescriptionSize: '18px',
  subscribeEyebrow: 'Stay Informed',
}

const fallbackPriceData = {
  subscribe: {
    form: {
      emailPlaceholder: 'Enter your email address',
      locationPlaceholder: 'Select your location',
      buttonText: 'Subscribe to Alerts',
      locations: ['Western Australia', 'Queensland', 'Victoria'],
      successMessage: 'Thanks. Your fuel price alert request has been submitted.',
      errorMessage: 'Your request could not be submitted. Please try again.',
      submittingButtonText: 'Submitting…',
      emailFallbackText: 'Email us instead',
    },
  },
}

export async function generateMetadata() {
  return loadPageMetadata({
    getPage: getFuelPricesPage,
    getSiteSettings,
    path: '/fuel-prices',
    fallbackTitle: 'Fuel Prices | Live Fuel Rates | Atlas Fuel Australia',
    fallbackDescription:
      'View live fuel prices and subscribe for price alerts. Get competitive fuel pricing for your business with Atlas Fuel Australia.',
    fallbackImage: fallbackData.heroImageUrl,
  })
}

export default async function FuelPricesPage() {
  const [sanity, siteSettings, liveRates] = await Promise.all([
    getFuelPricesPage().catch(() => null),
    getSiteSettings().catch(() => null),
    getLiveFuelRates().catch(() => null),
  ])

  const data = mergeWithFallback(fallbackData, sanity)
  const settings = mapPageCta(sanity, siteSettings, fallbackSiteSettings)
  const liveRows = liveRates ? mapFuelRatesToRows(liveRates) : null

  const hero = {
    subtitle: data.heroSubtitle,
    title: data.heroTitle,
    description: data.heroDescription,
    heroImageUrl: data.heroImageUrl,
    heroImageAlt: data.heroImageUrlAlt || data.heroImageAlt || data.heroTitle,
    subtitleColor: data.heroSubtitleColor,
    subtitleSize: data.heroSubtitleSize,
    titleColor: data.heroTitleColor,
    titleSize: data.heroTitleSize,
    descriptionColor: data.heroDescriptionColor,
    descriptionSize: data.heroDescriptionSize,
  }

  const priceData = {
    title: liveRates?.pricing_date
      ? `Atlas Fuel Australia Terminal Gate Pricing (TGP) at ${liveRates.pricing_date}`
      : 'Atlas Fuel Australia Terminal Gate Pricing (TGP)',
    rows: liveRows?.length ? liveRows : null,
    subscribe: {
      heading: data.subscribeHeading,
      description: data.subscribeDescription,
      eyebrow: sanity?.subscribeSection?.eyebrow ?? fallbackData.subscribeEyebrow,
      form: mergeWithFallback(fallbackPriceData.subscribe.form, sanity?.subscribeSection),
    },
  }

  return (
    <>
      
        <ServiceHero data={hero} />

        {/* Current Prices Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
              {priceData.title}
            </h2>

            {priceData.rows ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="px-6 py-4 text-center font-semibold">State</th>
                      <th className="px-6 py-4 text-center font-semibold">City</th>
                      <th className="px-6 py-4 text-center font-semibold">Diesel</th>
                      <th className="px-6 py-4 text-center font-semibold">Premium - 98</th>
                      <th className="px-6 py-4 text-center font-semibold">Blended E10</th>
                      <th className="px-6 py-4 text-center font-semibold">Unleaded 91 (ULP)</th>
                      <th className="px-6 py-4 text-center font-semibold">Pulp - 95</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceData.rows.map((row, index) => (
                      <tr key={`${row.state}-${row.city}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 text-center font-medium">{row.state}</td>
                        <td className="px-6 py-4 text-center">{row.city}</td>
                        <td className="px-6 py-4 text-center">{row.diesel ?? '--'}</td>
                        <td className="px-6 py-4 text-center">{row.premium ?? '--'}</td>
                        <td className="px-6 py-4 text-center">{row.e10 ?? '--'}</td>
                        <td className="px-6 py-4 text-center">{row.unleaded ?? '--'}</td>
                        <td className="px-6 py-4 text-center">{row.pulp95 ?? '--'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 py-8 text-center">
                Live pricing is temporarily unavailable. Please check back shortly or{' '}
                <a href="/contact" className="text-primary font-semibold underline">contact us</a> for current rates.
              </p>
            )}
          </div>
        </section>

        {/* Subscribe Section */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-white flex-shrink-0" />
                <span className="text-white text-[11px] font-bold uppercase tracking-[0.2em]">{priceData.subscribe.eyebrow}</span>
              </div>
              <h2
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide leading-tight mb-6"
                style={{color: data.subscribeHeadingColor, fontSize: data.subscribeHeadingSize}}
              >
                {priceData.subscribe.heading}
              </h2>
              <p
                className="text-lg text-white/90 mb-8"
                style={{color: data.subscribeDescriptionColor, fontSize: data.subscribeDescriptionSize}}
              >
                {priceData.subscribe.description}
              </p>
              
              <div className="bg-white p-8">
                <FuelPriceSubscribeForm form={priceData.subscribe.form} />
              </div>
            </div>
          </div>
        </section>

        <CTABanner data={settings} />
      
    </>
  )
}
