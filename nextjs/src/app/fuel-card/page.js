import Link from 'next/link'
import {getSiteSettings} from '@/lib/sanity'
import {mapPageCta} from '@/lib/contentFallbacks'
import {buildPageMetadata} from '@/lib/metadata'
import CmsImage from '@/components/common/CmsImage'
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

// Placeholder imagery/copy for client review — swap for real product photos once signed off.
const equipmentShowcase = {
  heading: 'Built For The Way Your Fleet Fuels',
  body: 'From a single ute to a full fleet, the right card is already in the driver’s hand at every Atlas Fuel site — no separate terminals, no reconciling receipts.',
  points: [
    'Chip-secured fleet cards',
    'PIN-protected driver cards',
    'Accepted at every Atlas Fuel site',
  ],
  image1Url: '/images/truck-new.jpg',
  image1Alt: 'Atlas Fuel tanker truck',
  equipment1Value: 'Fleet Cards',
  equipment1Label: 'Multi-Vehicle Access',
  image2Url: '/images/hero-truck.jpg',
  image2Alt: 'Atlas Fuel truck on the highway',
  equipment2Value: 'Driver Cards',
  equipment2Label: 'PIN-Protected, On the Road',
  ctaText: 'Apply Now',
  ctaLink: '#apply',
}

const networkHighlight = {
  tag: 'Simple By Design',
  heading: 'One Card. Every Atlas Site.',
  description: 'No separate EFTPOS terminal and no manual reconciliation — tap your card at the pump and every litre lands on one monthly statement.',
  ctaText: 'Talk to Our Team',
  ctaLink: '/contact',
  cardBadge: 'Fuel Card',
  cardImageUrl: '/images/fuel-stations.jpg',
  cardHeading: 'Ready When You Are',
  cardDescription: 'Apply online in minutes and start fuelling on account as soon as your account is approved.',
  stats: [
    {value: '150+', label: 'Accepting Sites'},
    {value: '24/7', label: 'Pump Access'},
    {value: '1', label: 'Monthly Invoice'},
  ],
  cardCtaText: 'Apply Now',
  cardCtaLink: '#apply',
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

      {/* Equipment showcase */}
      <section className="bg-white py-16 lg:py-20">
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

      {/* Network highlight card */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-0.5 w-10 flex-shrink-0 bg-primary" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
                  {networkHighlight.tag}
                </span>
              </div>
              <h2 className="mb-4 font-heading text-2xl font-bold uppercase tracking-wide text-gray-900 lg:text-4xl">
                {networkHighlight.heading}
              </h2>
              <p className="mb-6 max-w-xl leading-relaxed text-gray-600">{networkHighlight.description}</p>
              <Link
                href={networkHighlight.ctaLink}
                className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                {networkHighlight.ctaText}
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="overflow-hidden border border-gray-200 bg-white shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <CmsImage
                  src={networkHighlight.cardImageUrl}
                  alt={networkHighlight.cardHeading}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  ratio="16/9"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent" />
                <div className="absolute left-4 top-4">
                  <span className="bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-800">
                    {networkHighlight.cardBadge}
                  </span>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <h3 className="text-2xl font-bold text-gray-900">{networkHighlight.cardHeading}</h3>
                <p className="leading-relaxed text-gray-600">{networkHighlight.cardDescription}</p>
                <div className="grid grid-cols-3 gap-4 pt-2">
                  {networkHighlight.stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center justify-center border border-gray-100 p-4">
                      <span className="text-xl font-bold text-gray-900">{stat.value}</span>
                      <span className="text-sm text-gray-500">{stat.label}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={networkHighlight.cardCtaLink}
                  className="flex w-full items-center justify-center bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark"
                >
                  {networkHighlight.cardCtaText}
                </Link>
              </div>
            </div>
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
