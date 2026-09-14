import Link from 'next/link'
import {getFuelTestingPage, getSiteSettings} from '@/lib/sanity'
import {mapPageCta} from '@/lib/contentFallbacks'
import {mergeWithFallback} from '@/lib/fallback'
import {loadPageMetadata} from '@/lib/metadata'
import CmsImage from '@/components/common/CmsImage'
import CTABanner from '@/components/shared/CTABanner'
import ServiceHero from '@/components/services/ServiceHero'
import FuelTestingEnquiryForm from '@/components/fuel-testing/FuelTestingEnquiryForm'

export function generateMetadata() {
  return loadPageMetadata({
    getPage: getFuelTestingPage,
    getSiteSettings,
    path: '/fuel-testing-laboratory',
    fallbackTitle: 'Atlas Fuel Testing Laboratory | Atlas Fuel Australia',
    fallbackDescription:
      'Independent fuel quality testing and compliance certification from Atlas Fuel Australia — contamination checks, on-site sampling, and fast turnaround.',
    fallbackImage: '/images/atlas-fuel-hero-2.webp',
  })
}

const fallbackData = {
  heroSubtitle: 'Atlas Fuel Testing Laboratory',
  heroTitle: 'Know Exactly What Is In Your Fuel',
  heroDescription:
    'Independent fuel quality testing and compliance certification, backed by fast turnaround and a team that understands what a bad batch of fuel can cost your operation.',
  heroImageUrl: '/images/atlas-fuel-hero-2.webp',
  heroImageAlt: 'Atlas Fuel testing laboratory sample analysis',
  heroStats: [
    {value: 'Independent', label: 'Lab Analysis'},
    {value: '48hr', label: 'Standard Turnaround'},
    {value: 'AS/NZS', label: 'Standards Tested'},
    {value: 'Certified', label: 'Report Issued'},
  ],

  stepsHeading: 'How Testing Works',
  steps: [
    {
      number: '01',
      title: 'Submit a Sample',
      description: 'Send a sample to our lab, or request an Atlas technician collect it on-site.',
    },
    {
      number: '02',
      title: 'Lab Analysis',
      description: 'We test against Australian fuel quality standards for contamination and composition.',
    },
    {
      number: '03',
      title: 'Certified Report',
      description: 'You receive a documented certificate of analysis, ready for audit or supplier follow-up.',
    },
  ],

  parametersHeading: 'What We Test For',
  parameters: [
    {name: 'Water Content', detail: 'Detects moisture contamination that causes engine damage and corrosion.'},
    {name: 'Particulate & Microbial', detail: 'Screens for debris and microbial growth that can block filters and injectors.'},
    {name: 'Cetane / Octane Rating', detail: 'Confirms the fuel meets the combustion performance it is sold on.'},
    {name: 'Sulphur Content', detail: 'Checks compliance with Australian fuel quality regulations.'},
  ],

  // Placeholder imagery/copy — swap for real lab/equipment photos once signed off.
  equipmentShowcase: {
    heading: 'Lab-Grade Equipment, Every Step',
    body: 'From on-site sample collection to certified lab analysis, every step uses equipment calibrated to Australian fuel quality standards.',
    points: [
      'Calibrated sample collection kits',
      'AS/NZS-standard analysis instruments',
      'Documented chain of custody',
    ],
    image1Url: '/images/what-we-do-onsite-diesel.webp',
    equipment1Value: 'Sample Collection Kits',
    equipment1Label: 'On-Site Technician Visits',
    image2Url: '/images/fuel-logistics.jpg',
    equipment2Value: 'Analysis Instruments',
    equipment2Label: 'AS/NZS Standards Testing',
    ctaText: 'Request Testing',
    ctaLink: '#request',
  },

  resultsHighlight: {
    tag: 'Fast & Certified',
    heading: 'Results You Can Act On',
    description: 'Every report is documented and ready for audit, supplier follow-up, or your own compliance file — no guesswork.',
    ctaText: 'Talk to Our Team',
    ctaLink: '/contact',
    cardBadge: 'Fuel Testing',
    cardImageUrl: '/images/fuel-stations.jpg',
    cardHeading: '48-Hour Turnaround',
    cardDescription: 'Submit a sample and receive a certified report fast enough to act before a bad batch causes damage.',
    stats: [
      {value: '48hr', label: 'Turnaround'},
      {value: 'AS/NZS', label: 'Standards'},
      {value: '100%', label: 'Certified Reports'},
    ],
    cardCtaText: 'Request Testing',
    cardCtaLink: '#request',
  },

  requestHeading: 'Request Testing',
  requestDescription: 'Tell us what you need tested and we will confirm sample requirements and turnaround before you send anything in.',
}

const fallbackSiteSettings = {
  ctaBannerHeading: 'Need Your Fuel Tested?',
  ctaBannerText: 'Talk to the Atlas Fuel lab team about sample collection and turnaround times.',
  ctaBannerButtonText: 'Talk to Our Team',
  ctaBannerButtonLink: '/contact',
}

export default async function FuelTestingLaboratoryPage() {
  const [sanity, siteSettings] = await Promise.all([
    getFuelTestingPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const data = mergeWithFallback(fallbackData, sanity)
  const settings = mapPageCta(sanity, siteSettings, fallbackSiteSettings)

  const hero = {
    subtitle: data.heroSubtitle,
    subtitleColor: data.heroSubtitleColor,
    subtitleSize: data.heroSubtitleSize,
    title: data.heroTitle,
    titleColor: data.heroTitleColor,
    titleSize: data.heroTitleSize,
    description: data.heroDescription,
    descriptionColor: data.heroDescriptionColor,
    descriptionSize: data.heroDescriptionSize,
    heroImageUrl: data.heroImageUrl,
    heroImageAlt: data.heroImageUrl?.alt ?? data.heroTitle,
    stats: data.heroStats,
  }

  const {equipmentShowcase, resultsHighlight} = data

  return (
    <>
      <ServiceHero data={hero} />

      {/* Process */}
      <section className="bg-gray-900 py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold uppercase tracking-wide lg:text-4xl">
            {data.stepsHeading}
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {data.steps.map((step) => (
              <div key={step.number} className="border-t-2 border-primary pt-5">
                <div className="mb-2 font-heading text-4xl font-bold text-primary">{step.number}</div>
                <h3 className="mb-2 font-heading text-lg font-bold uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parameters */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold uppercase tracking-wide text-gray-900 lg:text-4xl">
            {data.parametersHeading}
          </h2>

          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {data.parameters.map((parameter) => (
              <div
                key={parameter.name}
                className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[minmax(0,240px)_1fr] sm:items-center sm:gap-8"
              >
                <span className="font-heading text-base font-bold uppercase tracking-wide text-gray-900">
                  {parameter.name}
                </span>
                <span className="text-sm text-gray-600">{parameter.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment showcase */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-wide text-gray-900 lg:text-4xl">
                {equipmentShowcase.heading}
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">{equipmentShowcase.body}</p>
              <ul className="mb-8 space-y-3">
                {equipmentShowcase.points.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <svg className="h-5 w-5 flex-shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className="text-gray-900">{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={equipmentShowcase.ctaLink}
                className="group inline-flex items-center gap-2 font-bold uppercase tracking-wide text-primary transition-all hover:gap-4"
              >
                {equipmentShowcase.ctaText}
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[4/5] overflow-hidden shadow-lg">
                  <CmsImage
                    value={equipmentShowcase.image1}
                    src={equipmentShowcase.image1Url}
                    alt={equipmentShowcase.image1Alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    ratio="4/5"
                    className="object-cover object-center"
                  />
                </div>
                <div className="bg-primary p-6 text-white">
                  <div className="mb-1 font-heading text-2xl font-bold">{equipmentShowcase.equipment1Value}</div>
                  <div className="text-sm text-white/80">{equipmentShowcase.equipment1Label}</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gray-900 p-6 text-white">
                  <div className="mb-1 font-heading text-2xl font-bold">{equipmentShowcase.equipment2Value}</div>
                  <div className="text-sm text-white/70">{equipmentShowcase.equipment2Label}</div>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden shadow-lg">
                  <CmsImage
                    value={equipmentShowcase.image2}
                    src={equipmentShowcase.image2Url}
                    alt={equipmentShowcase.image2Alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    ratio="4/5"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results highlight card */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-0.5 w-10 flex-shrink-0 bg-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  {resultsHighlight.tag}
                </span>
              </div>
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-wide text-gray-900 lg:text-4xl">
                {resultsHighlight.heading}
              </h2>
              <p className="mb-6 max-w-xl leading-relaxed text-gray-600">{resultsHighlight.description}</p>
              <Link
                href={resultsHighlight.ctaLink}
                className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                {resultsHighlight.ctaText}
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="overflow-hidden border border-gray-200 bg-white shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <CmsImage
                  value={resultsHighlight.cardImage}
                  src={resultsHighlight.cardImageUrl}
                  alt={resultsHighlight.cardHeading}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  ratio="16/9"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent" />
                <div className="absolute left-4 top-4">
                  <span className="bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-800">
                    {resultsHighlight.cardBadge}
                  </span>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <h3 className="text-2xl font-bold text-gray-900">{resultsHighlight.cardHeading}</h3>
                <p className="leading-relaxed text-gray-600">{resultsHighlight.cardDescription}</p>
                <div className="grid grid-cols-3 gap-4 pt-2">
                  {resultsHighlight.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center justify-center border border-gray-100 p-4">
                      <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                      <span className="text-sm text-gray-500">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={resultsHighlight.cardCtaLink}
                  className="flex w-full items-center justify-center bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark"
                >
                  {resultsHighlight.cardCtaText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="request" className="scroll-mt-24 bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-wide text-gray-900 lg:text-4xl">
                {data.requestHeading}
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">{data.requestDescription}</p>
              <div className="space-y-4 border-l-2 border-primary pl-5">
                <div>
                  <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">
                    Call us
                  </div>
                  <a
                    href={`tel:${(siteSettings?.phone ?? '+61 8 6377 7644').replace(/[^\d+]/g, '')}`}
                    className="font-heading text-xl font-bold text-gray-900 transition-colors hover:text-primary"
                  >
                    {siteSettings?.phone ?? '+61 8 6377 7644'}
                  </a>
                </div>
                <div>
                  <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-500">
                    Email
                  </div>
                  <a
                    href={`mailto:${siteSettings?.email ?? 'info@atlasfuel.com.au'}`}
                    className="text-gray-700 transition-colors hover:text-primary"
                  >
                    {siteSettings?.email ?? 'info@atlasfuel.com.au'}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 lg:p-8">
              <FuelTestingEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <CTABanner data={settings} />
    </>
  )
}
