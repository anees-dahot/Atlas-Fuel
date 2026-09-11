import {getSiteSettings} from '@/lib/sanity'
import {mapPageCta} from '@/lib/contentFallbacks'
import {buildPageMetadata} from '@/lib/metadata'
import CTABanner from '@/components/shared/CTABanner'
import ServiceHero from '@/components/services/ServiceHero'
import FuelTestingEnquiryForm from '@/components/fuel-testing/FuelTestingEnquiryForm'

// NOTE: Content is hard-coded for client review. Once the page is signed off it
// will be moved into Sanity behind a `fuelTestingPage` document, matching the
// other pages in this app.

export async function generateMetadata() {
  const siteSettings = await getSiteSettings({stega: false}).catch(() => null)

  return buildPageMetadata({
    siteSettings,
    path: '/fuel-testing-laboratory',
    fallbackTitle: 'Atlas Fuel Testing Laboratory | Atlas Fuel Australia',
    fallbackDescription:
      'Independent fuel quality testing and compliance certification from Atlas Fuel Australia — contamination checks, on-site sampling, and fast turnaround.',
    fallbackImage: '/images/atlas-fuel-hero-2.webp',
  })
}

const hero = {
  subtitle: 'Atlas Fuel Testing Laboratory',
  title: 'Know Exactly What Is In Your Fuel',
  description:
    'Independent fuel quality testing and compliance certification, backed by fast turnaround and a team that understands what a bad batch of fuel can cost your operation.',
  heroImageUrl: '/images/atlas-fuel-hero-2.webp',
  heroImageAlt: 'Atlas Fuel testing laboratory sample analysis',
  stats: [
    {value: 'Independent', label: 'Lab Analysis'},
    {value: '48hr', label: 'Standard Turnaround'},
    {value: 'AS/NZS', label: 'Standards Tested'},
    {value: 'Certified', label: 'Report Issued'},
  ],
}

const steps = [
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
]

const parameters = [
  {name: 'Water Content', detail: 'Detects moisture contamination that causes engine damage and corrosion.'},
  {name: 'Particulate & Microbial', detail: 'Screens for debris and microbial growth that can block filters and injectors.'},
  {name: 'Cetane / Octane Rating', detail: 'Confirms the fuel meets the combustion performance it is sold on.'},
  {name: 'Sulphur Content', detail: 'Checks compliance with Australian fuel quality regulations.'},
]

const fallbackSiteSettings = {
  ctaBannerHeading: 'Need Your Fuel Tested?',
  ctaBannerText: 'Talk to the Atlas Fuel lab team about sample collection and turnaround times.',
  ctaBannerButtonText: 'Talk to Our Team',
  ctaBannerButtonLink: '/contact',
}

export default async function FuelTestingLaboratoryPage() {
  const siteSettings = await getSiteSettings().catch(() => null)
  const settings = mapPageCta(null, siteSettings, fallbackSiteSettings)

  return (
    <>
      <ServiceHero data={hero} />

      {/* Process */}
      <section className="bg-gray-900 py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold uppercase tracking-wide lg:text-4xl">
            How Testing Works
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
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
            What We Test For
          </h2>

          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {parameters.map((parameter) => (
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

      {/* Enquiry form */}
      <section id="request" className="scroll-mt-24 bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-wide text-gray-900 lg:text-4xl">
                Request Testing
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">
                Tell us what you need tested and we will confirm sample requirements and
                turnaround before you send anything in.
              </p>
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
