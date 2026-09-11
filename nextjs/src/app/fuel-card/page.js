import {getSiteSettings} from '@/lib/sanity'
import {mapPageCta} from '@/lib/contentFallbacks'
import {buildPageMetadata} from '@/lib/metadata'
import CTABanner from '@/components/shared/CTABanner'
import ServiceHero from '@/components/services/ServiceHero'
import FuelCardVisual from '@/components/fuel-card/FuelCardVisual'
import FuelCardApplyForm from '@/components/fuel-card/FuelCardApplyForm'
import FuelCardFaq from '@/components/fuel-card/FuelCardFaq'

// NOTE: Content is hard-coded for client review. Once the page is signed off it
// will be moved into Sanity behind a `fuelCardPage` document, matching the other
// pages in this app.

export async function generateMetadata() {
  const siteSettings = await getSiteSettings({stega: false}).catch(() => null)

  return buildPageMetadata({
    siteSettings,
    path: '/fuel-card',
    fallbackTitle: 'Atlas Fuel Card | Fleet & Business Fuel Cards | Atlas Fuel Australia',
    fallbackDescription:
      'One card for your fleet. The Atlas Fuel Card gives Australian businesses competitive pricing, driver-level controls, and one consolidated invoice each month.',
    fallbackImage: '/images/atlas-fuel-hero-2.webp',
  })
}

const hero = {
  subtitle: 'Atlas Fuel Card',
  title: 'One Card for Your Entire Fleet',
  description:
    'Cut fuel admin, control every litre, and keep your vehicles moving with competitive pricing, driver-level controls, and one invoice each month.',
  heroImageUrl: '/images/atlas-fuel-hero-2.webp',
  heroImageAlt: 'Atlas Fuel tanker on an Australian highway',
}

const benefits = [
  {title: 'Competitive Pricing', description: 'Cents-per-litre savings against Terminal Gate Pricing.'},
  {title: 'Full Purchase Control', description: 'Cap spend, restrict to fuel only, or lock a card to one vehicle.'},
  {title: 'One Monthly Invoice', description: 'Every transaction in a single, easy-to-reconcile statement.'},
]

const cards = [
  {variant: 'fleet', name: 'Fleet Card', description: 'For businesses running multiple vehicles or drivers.'},
  {variant: 'business', name: 'Business Card', description: 'Simple fuel accounting for small businesses and tradies.'},
  {variant: 'driver', name: 'Driver Card', description: 'For owner-drivers who fuel up on the road.'},
]

const faqs = [
  {
    question: 'Who can apply for an Atlas Fuel Card?',
    answer:
      'Any Australian business with a valid ABN can apply, from a single ute through to a large fleet. Applications are subject to a standard credit assessment.',
  },
  {
    question: 'Where can I use the card?',
    answer:
      'The card is accepted across the Atlas Fuel station network. Talk to us if your operation also needs on-site bulk diesel delivery on the same account.',
  },
  {
    question: 'How long does approval take?',
    answer:
      'Most applications receive a decision within one to two business days, with cards typically dispatched within five business days.',
  },
]

const fallbackSiteSettings = {
  ctaBannerHeading: 'Ready to Take Control of Your Fuel Spend?',
  ctaBannerText: 'Talk to the Atlas Fuel team about the right card program for your fleet.',
  ctaBannerButtonText: 'Talk to Our Team',
  ctaBannerButtonLink: '/contact',
}

export default async function FuelCardPage() {
  const siteSettings = await getSiteSettings().catch(() => null)
  const settings = mapPageCta(null, siteSettings, fallbackSiteSettings)

  return (
    <>
      <ServiceHero data={hero} />

      {/* Intro + benefits */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-wide text-gray-900 lg:text-4xl">
              Less Paperwork. More Control.
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              Replace loose receipts and cash advances with one account, one statement, and
              complete visibility over every litre your business buys.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <h3 className="mb-2 font-heading text-lg font-bold uppercase tracking-wide text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Card range */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold uppercase tracking-wide text-gray-900 lg:text-4xl">
            Choose the Card That Fits
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {cards.map((card) => (
              <div key={card.name} className="flex flex-col items-center text-center">
                <FuelCardVisual variant={card.variant} className="mb-5" />
                <h3 className="mb-2 font-heading text-lg font-bold uppercase tracking-wide text-gray-900">
                  {card.name}
                </h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="scroll-mt-24 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
            <div>
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-wide text-gray-900 lg:text-4xl">
                Apply for a Fuel Card
              </h2>
              <p className="mb-6 leading-relaxed text-gray-600">
                Fill in the form and an account manager will call you to confirm pricing, limits,
                and card setup.
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

            <div className="bg-gray-50 p-6 lg:p-8">
              <FuelCardApplyForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold uppercase tracking-wide text-gray-900 lg:text-4xl">
            Fuel Card FAQs
          </h2>
          <FuelCardFaq items={faqs} />
        </div>
      </section>

      <CTABanner data={settings} />
    </>
  )
}
