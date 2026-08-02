import { getContactPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import {loadPageMetadata} from '@/lib/metadata'
import ContactClient from './ContactClient'

export async function generateMetadata() {
  return loadPageMetadata({
    getPage: getContactPage,
    getSiteSettings,
    path: '/contact',
    fallbackTitle: 'Contact | Atlas Fuel Australia',
    fallbackDescription:
      'Contact Atlas Fuel Australia for fuel supply, pricing, stations, and business enquiries.',
    fallbackImage: '/images/atlas-fuel-hero-1b.webp',
  })
}

export default async function ContactPage() {
  const [sanity, globalSettings] = await Promise.all([
    getContactPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const fallbackContact = {
    heroTitle: 'Get in Touch',
    heroTitleColor: 'var(--cms-text)',
    heroTitleSize: '72px',
    heroTitleBorderEnabled: false,
    heroTitleBorderColor: 'var(--cms-text)',
    heroTitleBorderWidth: '1px',
    heroTitleShadowColor: '',
    heroDescription: "Have a question or need a fuel solution? Our team is here to help. Contact us today and we'll respond within 24 hours.",
    heroDescriptionColor: 'var(--cms-text)',
    heroDescriptionSize: '18px',
    heroDescriptionBorderEnabled: false,
    heroDescriptionBorderColor: 'var(--cms-text)',
    heroDescriptionBorderWidth: '1px',
    heroDescriptionShadowColor: '',
    heroImageUrl: '/images/atlas-fuel-hero-1b.webp',
    address: '1 Mandurah Rd, Kwinana WA 6167',
    phone: '+61 8 6377 7644',
    email: 'info@atlasfuel.com.au',
    weekdaysHours: '8:00 AM - 5:00 PM',
    saturdayHours: 'Closed',
    sundayHours: 'Closed',
    emergencySupport: '24/7 Available',
    formHeading: 'Send us a message',
    formHeadingColor: 'var(--cms-text)',
    formHeadingSize: '30px',
    formHeadingBorderEnabled: false,
    formHeadingBorderColor: 'var(--cms-text)',
    formHeadingBorderWidth: '1px',
    formHeadingShadowColor: '',
    submitButtonText: 'Send Message',
    submittingButtonText: 'Sending…',
    successMessage: 'Thank you for your message. We will get back to you within 24 hours.',
    errorMessage: 'Your message could not be submitted. Please try again.',
    emailFallbackText: 'Email us instead',
    fields: [
      {name: 'firstName', label: 'First Name *', type: 'text', placeholder: 'John', required: true},
      {name: 'lastName', label: 'Last Name *', type: 'text', placeholder: 'Smith', required: true},
      {name: 'email', label: 'Email *', type: 'email', placeholder: 'john@example.com', required: true},
      {name: 'phone', label: 'Phone', type: 'tel', placeholder: '+61 8 6377 7644', required: false},
      {name: 'subject', label: 'Subject *', type: 'select', placeholder: 'Select a subject', required: true, options: ['General Enquiry', 'Request a Quote', 'Mining Fuel', 'Marine Fuel', 'Agriculture Fuel', 'Fuel Retailers', 'Fuel Transportation', 'Other']},
      {name: 'message', label: 'Message *', type: 'textarea', placeholder: 'How can we help you?', required: true},
    ],
    infoHeading: 'Contact Information',
    country: 'Australia',
    phoneNote: 'Mon-Fri 8:00 AM - 5:00 PM',
    emailNote: 'We respond within 24 hours',
    hoursHeading: 'Business Hours',
    callButtonText: 'Call Now',
    stationButtonText: 'Find a Station',
    stationButtonLink: '/store-locator',
    mapHeading: 'Visit Us',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3346.8234567890123!2d115.7756!3d-32.2367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDE0JzI2LjIiTiAxMTXCsDQ2JzMzLjYiRQ!5e0!3m2!1sen!2sau!4v1234567890',
    directionsButtonText: 'Get Directions',
    directionsLink: 'https://www.google.com/maps/dir/?api=1&destination=1+Mandurah+Rd,+Kwinana+WA+6167',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    weekdaysLabel: 'Monday - Friday',
    saturdayLabel: 'Saturday',
    sundayLabel: 'Sunday',
    emergencyLabel: 'Emergency Support:',
  }

  const fallbackSiteSettings = {
    ctaBannerHeading: 'Ready to Power Your Business?',
    ctaBannerText: 'Contact us today for a free fuel quote and let our team build a solution tailored to your needs.',
    ctaBannerButtonText: 'Get a Free Quote',
    ctaBannerButtonLink: '/contact',
  }

  // Merge Sanity data with fallbacks
  const data = mergeWithFallback(fallbackContact, sanity)
  const siteSettings = mapPageCta(sanity, globalSettings, fallbackSiteSettings)

  return (
    <>
      <ContactClient data={data} siteSettings={siteSettings} />
    </>
  )
}
