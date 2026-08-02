import { getFuelPricesPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
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
  heroTitleColor: 'var(--cms-text)',
  heroTitleSize: '72px',
  heroDescription: 'Access real-time fuel pricing information and subscribe to price alerts. Our competitive rates help businesses across Australia optimize their fuel costs.',
  heroDescriptionColor: 'var(--cms-muted)',
  heroDescriptionSize: '18px',
  heroImageUrl: '/images/atlas-fuel-hero-1c.webp',
  heading: 'Current Fuel Prices',
  headingColor: 'var(--cms-text)',
  headingSize: '48px',
  pricesEyebrow: 'Live Rates',
  locationColumnLabel: 'Location',
  dieselColumnLabel: 'Diesel (cpl)',
  premiumColumnLabel: 'Premium (cpl)',
  unleadedColumnLabel: 'Unleaded (cpl)',
  trendsHeading: 'Price Trends',
  trendsHeadingColor: 'var(--cms-text)',
  trendsHeadingSize: '48px',
  trendsDescription: 'Track fuel price movements over time to make informed purchasing decisions.',
  trendsDescriptionColor: 'var(--cms-muted)',
  trendsDescriptionSize: '18px',
  trendsImageUrl: '/images/atlas-fuel-hero-2.webp',
  trendsImageAlt: 'Atlas Fuel price trends',
  trendsEyebrow: 'Market Insights',
  dieselTrendLabel: 'Diesel',
  premiumTrendLabel: 'Premium',
  subscribeHeading: 'Subscribe to Price Alerts',
  subscribeHeadingColor: 'var(--cms-background)',
  subscribeHeadingSize: '48px',
  subscribeDescription: 'Get notified when fuel prices drop in your area. Stay ahead of the market with real-time alerts.',
  subscribeDescriptionColor: 'var(--cms-background)',
  subscribeDescriptionSize: '18px',
  subscribeEyebrow: 'Stay Informed',
}

const fallbackPriceData = {
  lastUpdated: 'Last updated: Just now',
  prices: [
    {
      state: 'Western Australia',
      locations: [
        { name: 'Kwinana', diesel: '168.45', premium: '172.95', unleaded: '165.20' },
        { name: 'Perth Metro', diesel: '169.80', premium: '174.30', unleaded: '166.55' },
        { name: 'Fremantle', diesel: '170.15', premium: '174.65', unleaded: '166.90' },
      ],
    },
    {
      state: 'Queensland',
      locations: [
        { name: 'Brisbane', diesel: '171.20', premium: '175.70', unleaded: '167.95' },
        { name: 'Gold Coast', diesel: '172.50', premium: '177.00', unleaded: '169.25' },
      ],
    },
    {
      state: 'Victoria',
      locations: [
        { name: 'Melbourne', diesel: '169.80', premium: '174.30', unleaded: '166.55' },
        { name: 'Geelong', diesel: '170.30', premium: '174.80', unleaded: '167.05' },
      ],
    },
  ],
  priceTrends: {
    trendData: [
      { date: 'Jan', diesel: 165.5, premium: 170.0 },
      { date: 'Feb', diesel: 167.2, premium: 171.8 },
      { date: 'Mar', diesel: 168.5, premium: 173.1 },
      { date: 'Apr', diesel: 169.8, premium: 174.3 },
      { date: 'May', diesel: 168.4, premium: 172.9 },
    ],
  },
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
  const [sanity, siteSettings] = await Promise.all([
    getFuelPricesPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const data = mergeWithFallback(fallbackData, sanity)
  const settings = mapPageCta(sanity, siteSettings, fallbackSiteSettings)

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
    heading: data.heading,
    eyebrow: sanity?.pricesSection?.eyebrow ?? fallbackData.pricesEyebrow,
    lastUpdated: data.lastUpdated ?? fallbackPriceData.lastUpdated,
    columnLabels: {
      location: sanity?.pricesSection?.locationColumnLabel ?? fallbackData.locationColumnLabel,
      diesel: sanity?.pricesSection?.dieselColumnLabel ?? fallbackData.dieselColumnLabel,
      premium: sanity?.pricesSection?.premiumColumnLabel ?? fallbackData.premiumColumnLabel,
      unleaded: sanity?.pricesSection?.unleadedColumnLabel ?? fallbackData.unleadedColumnLabel,
    },
    prices: Array.isArray(data.prices) ? data.prices : fallbackPriceData.prices,
    priceTrends: {
      heading: data.trendsHeading,
      description: data.trendsDescription,
      eyebrow: sanity?.trendsSection?.eyebrow ?? fallbackData.trendsEyebrow,
      trendData: Array.isArray(data.trendData)
        ? data.trendData
        : fallbackPriceData.priceTrends.trendData,
      dieselLabel:
        sanity?.trendsSection?.dieselTrendLabel ??
        data.dieselTrendLabel ??
        fallbackData.dieselTrendLabel,
      premiumLabel:
        sanity?.trendsSection?.premiumTrendLabel ??
        data.premiumTrendLabel ??
        fallbackData.premiumTrendLabel,
      unitLabel: sanity?.trendsSection?.unitLabel ?? 'cpl',
    },
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
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{priceData.eyebrow}</span>
              </div>
              <h2
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-4"
                style={{color: data.headingColor, fontSize: data.headingSize}}
              >
                {priceData.heading}
              </h2>
              <p className="text-gray-600">{priceData.lastUpdated}</p>
            </div>

            {priceData.prices.map((stateData, index) => (
              <div key={index} className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{stateData.state}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-primary text-white">
                        <th className="px-6 py-4 text-left font-semibold">{priceData.columnLabels.location}</th>
                        <th className="px-6 py-4 text-right font-semibold">{priceData.columnLabels.diesel}</th>
                        <th className="px-6 py-4 text-right font-semibold">{priceData.columnLabels.premium}</th>
                        <th className="px-6 py-4 text-right font-semibold">{priceData.columnLabels.unleaded}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stateData.locations.map((location, locIndex) => (
                        <tr key={locIndex} className={locIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 font-medium">{location.name}</td>
                          <td className="px-6 py-4 text-right">{location.diesel}</td>
                          <td className="px-6 py-4 text-right">{location.premium}</td>
                          <td className="px-6 py-4 text-right">{location.unleaded}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Price Trends Section */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                  <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{priceData.priceTrends.eyebrow}</span>
                </div>
                <h2
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6"
                  style={{color: data.trendsHeadingColor, fontSize: data.trendsHeadingSize}}
                >
                  {priceData.priceTrends.heading}
                </h2>
                <p
                  className="text-gray-600 text-lg leading-relaxed mb-8"
                  style={{color: data.trendsDescriptionColor, fontSize: data.trendsDescriptionSize}}
                >
                  {priceData.priceTrends.description}
                </p>
                
                <div className="space-y-4">
                  {priceData.priceTrends.trendData.map((trend, index) => (
                    <div key={trend._key || trend.date || index} className="grid grid-cols-[6rem_1fr_auto] items-center gap-4">
                      <div className="w-24 font-semibold text-gray-900">{trend.date}</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-14 text-[10px] font-bold uppercase tracking-wide text-gray-500">{priceData.priceTrends.dieselLabel}</span>
                          <div className="h-3 flex-1 overflow-hidden bg-gray-200">
                            <div
                              className="h-full bg-primary"
                              style={{width: `${Math.min((Number(trend.diesel) / 180) * 100, 100)}%`}}
                            />
                          </div>
                        </div>
                        {trend.premium !== undefined && trend.premium !== null && (
                          <div className="flex items-center gap-2">
                            <span className="w-14 text-[10px] font-bold uppercase tracking-wide text-gray-500">{priceData.priceTrends.premiumLabel}</span>
                            <div className="h-3 flex-1 overflow-hidden bg-gray-200">
                              <div
                                className="h-full bg-primary-dark"
                                style={{width: `${Math.min((Number(trend.premium) / 180) * 100, 100)}%`}}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>{trend.diesel}{priceData.priceTrends.unitLabel ? ` ${priceData.priceTrends.unitLabel}` : ''}</div>
                        {trend.premium !== undefined && trend.premium !== null && (
                          <div>{trend.premium}{priceData.priceTrends.unitLabel ? ` ${priceData.priceTrends.unitLabel}` : ''}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative h-[400px] bg-gray-100 overflow-hidden shadow-xl">
                <CmsImage
                  value={data.trendsImage || data.trendsImageImage}
                  src={data.trendsImageUrl}
                  fallbackSrc="/images/atlas-fuel-hero-2.webp"
                  alt={data.trendsImageUrlAlt || data.trendsImageAlt || priceData.priceTrends.heading}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
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
