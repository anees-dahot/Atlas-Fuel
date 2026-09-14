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

  processHeading: 'How Testing Works',
  processSteps: [
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
  parametersList: [
    {name: 'Water Content', detail: 'Detects moisture contamination that causes engine damage and corrosion.'},
    {name: 'Particulate & Microbial', detail: 'Screens for debris and microbial growth that can block filters and injectors.'},
    {name: 'Cetane / Octane Rating', detail: 'Confirms the fuel meets the combustion performance it is sold on.'},
    {name: 'Sulphur Content', detail: 'Checks compliance with Australian fuel quality regulations.'},
  ],

  // Placeholder imagery — swap for real lab/equipment photos in Sanity once signed off.
  equipmentHeading: 'Lab-Grade Equipment, Every Step',
  equipmentBody:
    'From on-site sample collection to certified lab analysis, every step uses equipment calibrated to Australian fuel quality standards.',
  equipmentPoints: [
    'Calibrated sample collection kits',
    'AS/NZS-standard analysis instruments',
    'Documented chain of custody',
  ],
  equipmentImage1Url: '/images/what-we-do-onsite-diesel.webp',
  equipmentItem1Value: 'Sample Collection Kits',
  equipmentItem1Label: 'On-Site Technician Visits',
  equipmentImage2Url: '/images/fuel-logistics.jpg',
  equipmentItem2Value: 'Analysis Instruments',
  equipmentItem2Label: 'AS/NZS Standards Testing',
  equipmentCtaText: 'Request Testing',
  equipmentCtaLink: '#request',

  resultsTag: 'Fast & Certified',
  resultsHeading: 'Results You Can Act On',
  resultsDescription:
    'Every report is documented and ready for audit, supplier follow-up, or your own compliance file \u2014 no guesswork.',
  resultsCtaText: 'Talk to Our Team',
  resultsCtaLink: '/contact',
  resultsCardBadge: 'Fuel Testing',
  resultsCardImageUrl: '/images/fuel-stations.jpg',
  resultsCardHeading: '48-Hour Turnaround',
  resultsCardDescription:
    'Submit a sample and receive a certified report fast enough to act before a bad batch causes damage.',
  resultsStats: [
    {value: '48hr', label: 'Turnaround'},
    {value: 'AS/NZS', label: 'Standards'},
    {value: '100%', label: 'Certified Reports'},
  ],
  resultsCardCtaText: 'Request Testing',
  resultsCardCtaLink: '#request',

  requestHeading: 'Request Testing',
  requestDescription:
    'Tell us what you need tested and we will confirm sample requirements and turnaround before you send anything in.',
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
    title: data.heroTitle,
    description: data.heroDescription,
    heroImageUrl: data.heroImageUrl,
    heroImageAlt: data.heroImageUrl?.alt ?? data.heroImageAlt ?? data.heroTitle,
    stats: data.heroStats,
  }

  return (
    <>
      <ServiceHero data={hero} />

      {/* Process */}
      <section className="bg-gray-900 py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold uppercase tracking-wide lg:text-4xl">
            {data.processHeading}
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {data.processSteps.map((step) => (
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
            {data.parametersList.map((parameter) => (
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
                {data.equipmentHeading}
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">{data.equipmentBody}</p>
              <ul className="mb-8 space-y-3">
                {data.equipmentPoints.map((point) => (
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
                href={data.equipmentCtaLink}
                className="group inline-flex items-center gap-2 font-bold uppercase tracking-wide text-primary transition-all hover:gap-4"
              >
                {data.equipmentCtaText}
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
                    value={data.equipmentImage1}
                    src={data.equipmentImage1Url}
                    alt={data.equipmentImage1?.alt ?? data.equipmentItem1Value}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    ratio="4/5"
                    className="object-cover object-center"
                  />
                </div>
                <div className="bg-primary p-6 text-white">
                  <div className="mb-1 font-heading text-2xl font-bold">{data.equipmentItem1Value}</div>
                  <div className="text-sm text-white/80">{data.equipmentItem1Label}</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gray-900 p-6 text-white">
                  <div className="mb-1 font-heading text-2xl font-bold">{data.equipmentItem2Value}</div>
                  <div className="text-sm text-white/70">{data.equipmentItem2Label}</div>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden shadow-lg">
                  <CmsImage
                    value={data.equipmentImage2}
                    src={data.equipmentImage2Url}
                    alt={data.equipmentImage2?.alt ?? data.equipmentItem2Value}
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
                  {data.resultsTag}
                </span>
              </div>
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-wide text-gray-900 lg:text-4xl">
                {data.resultsHeading}
              </h2>
              <p className="mb-6 max-w-xl leading-relaxed text-gray-600">{data.resultsDescription}</p>
              <Link
                href={data.resultsCtaLink}
                className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                {data.resultsCtaText}
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="overflow-hidden border border-gray-200 bg-white shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <CmsImage
                  value={data.resultsCardImage}
                  src={data.resultsCardImageUrl}
                  alt={data.resultsCardImage?.alt ?? data.resultsCardHeading}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  ratio="16/9"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent" />
                <div className="absolute left-4 top-4">
                  <span className="bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-800">
                    {data.resultsCardBadge}
                  </span>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <h3 className="text-2xl font-bold text-gray-900">{data.resultsCardHeading}</h3>
                <p className="leading-relaxed text-gray-600">{data.resultsCardDescription}</p>
                <div className="grid grid-cols-3 gap-4 pt-2">
                  {data.resultsStats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center justify-center border border-gray-100 p-4">
                      <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                      <span className="text-sm text-gray-500">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={data.resultsCardCtaLink}
                  className="flex w-full items-center justify-center bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark"
                >
                  {data.resultsCardCtaText}
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
