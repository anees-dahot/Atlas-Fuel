'use client'
import React from 'react'
import Link from 'next/link'
import CmsImage from '@/components/common/CmsImage'

// Default navigation data
const defaultCompanyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'News', href: '/news' },
  { label: 'Community', href: '/community' },
  { label: 'Contact Us', href: '/contact' },
]

const defaultServicesLinks = [
  { label: 'Mining Fuel', href: '/services/mining-fuel' },
  { label: 'Marine Fuel', href: '/services/marine-fuel' },
  { label: 'Agriculture Fuel', href: '/services/agriculture-fuel' },
  { label: 'Fuel Retailers', href: '/services/fuel-retailers' },
  { label: 'Onsite Bulk Diesel', href: '/services/onsite-bulk-diesel' },
  { label: 'Fuel Transportation', href: '/fuel-transportation' },
]

const defaultSupportLinks = [
  { label: 'Store Locator', href: '/store-locator' },
  { label: 'Fuel Pricing', href: '/fuel-prices' },
  { label: 'Franchise Enquiry', href: '/franchising' },
  { label: 'Fuel Station Enquiry', href: '/fuel-station-enquiry' },
]

const defaultLegalLinks = [
  { label: 'Privacy Policy', href: '/contact' },
  { label: 'Disclaimer', href: '/contact' },
]

export default function Footer({ data = {}, footerNavigation, siteSettings }) {
  const phone = siteSettings?.phone ?? data?.phone ?? '+61 8 6377 7644'
  const emergencyPhone = siteSettings?.emergencyPhone ?? data?.emergencyPhone ?? ''
  const email = siteSettings?.email ?? data?.email ?? 'info@atlasfuel.com.au'
  const address = siteSettings?.address ?? data?.address ?? '1 Mandurah Rd, Kwinana WA 6167'
  const description = siteSettings?.footerDescription ?? data?.footerDescription ?? "Australia's trusted fuel partner. Delivering reliable, efficient fuel solutions nationwide since 2010."
  const fb = siteSettings?.facebookUrl ?? data?.facebookUrl ?? ''
  const ig = siteSettings?.instagramUrl ?? data?.instagramUrl ?? ''
  const li = siteSettings?.linkedinUrl ?? data?.linkedinUrl ?? ''
  const tw = siteSettings?.twitterUrl ?? data?.twitterUrl ?? ''
  const yt = siteSettings?.youtubeUrl ?? data?.youtubeUrl ?? ''
  const emergencyPhoneLabel =
    siteSettings?.emergencyPhoneLabel ?? data?.emergencyPhoneLabel ?? '24/7 Emergency'

  const companyHeading = footerNavigation?.companySectionHeading ?? 'Company'
  const companyLinks = Array.isArray(footerNavigation?.companyLinks)
    ? footerNavigation.companyLinks
    : defaultCompanyLinks

  const servicesHeading = footerNavigation?.servicesSectionHeading ?? 'Services'
  const servicesLinks = Array.isArray(footerNavigation?.servicesLinks)
    ? footerNavigation.servicesLinks
    : defaultServicesLinks

  const supportHeading = footerNavigation?.supportSectionHeading ?? 'Support'
  const supportLinks = Array.isArray(footerNavigation?.supportLinks)
    ? footerNavigation.supportLinks
    : defaultSupportLinks

  const legalLinks = Array.isArray(footerNavigation?.legalLinks)
    ? footerNavigation.legalLinks
    : defaultLegalLinks

  const copyrightText = siteSettings?.copyrightText ?? `© ${new Date().getFullYear()} Atlas Fuel Australia Pty Ltd. All rights reserved.`

  return (
    <footer className="bg-cream text-gray-800">
      {/* Main Footer */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <CmsImage
                value={siteSettings?.logo}
                src={siteSettings?.logoUrl}
                fallbackSrc="/images/logo.png"
                alt={siteSettings?.logoAlt ?? siteSettings?.logo?.alt ?? siteSettings?.siteName ?? 'Atlas Fuel'}
                width={140}
                height={56}
                className="h-14 w-auto"
              />
            </div>
            {description && <p className="text-gray-600 mb-6 max-w-sm leading-relaxed">{description}</p>}
            <div className="space-y-3">
              {phone && <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors">
                <svg className="w-5 h-5 text-primary-dark flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6.87-6.87 19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.904.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                {phone}
              </a>}
              {emergencyPhone && (
                <a href={`tel:${emergencyPhone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors">
                  <svg className="w-5 h-5 text-primary-dark flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                  <span>{emergencyPhoneLabel ? `${emergencyPhoneLabel}: ` : ''}{emergencyPhone}</span>
                </a>
              )}
              {email && <a href={`mailto:${email}`} className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors">
                <svg className="w-5 h-5 text-primary-dark flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" /></svg>
                {email}
              </a>}
              {address && <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-5 h-5 flex-shrink-0 text-primary-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {address}
              </div>}
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {fb && <a href={fb} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-sand border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" aria-label="Facebook">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>}
              {ig && <a href={ig} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-sand border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>}
              {li && <a href={li} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-sand border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" aria-label="LinkedIn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
              </a>}
              {tw && <a href={tw} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-sand border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" aria-label="X">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21.5l-7.114 8.13L22.75 22h-6.55l-5.13-6.708L5.202 22H1.944l7.612-8.7L1.53 2h6.716l4.638 6.132L18.244 2Zm-1.143 17.91h1.804L7.265 3.986H5.33L17.1 19.91Z" /></svg>
              </a>}
              {yt && <a href={yt} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-sand border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300" aria-label="YouTube">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" /></svg>
              </a>}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-primary-dark mb-6 uppercase tracking-wide text-sm">{companyHeading}</h4>
            <ul className="space-y-3">
              {companyLinks.filter((link) => link?.label && link?.href).map(l => (
                <li key={`${l.label}-${l.href}`}>
                  <Link href={l.href} className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-primary-dark mb-6 uppercase tracking-wide text-sm">{servicesHeading}</h4>
            <ul className="space-y-3">
              {servicesLinks.filter((link) => link?.label && link?.href).map(l => (
                <li key={`${l.label}-${l.href}`}>
                  <Link href={l.href} className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-primary-dark mb-6 uppercase tracking-wide text-sm">{supportHeading}</h4>
            <ul className="space-y-3">
              {supportLinks.filter((link) => link?.label && link?.href).map(l => (
                <li key={`${l.label}-${l.href}`}>
                  <Link href={l.href} className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sand">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-12 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">{copyrightText}</p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              {legalLinks.filter((link) => link?.label && link?.href).map((link, index) => (
                <React.Fragment key={`${link.label}-${link.href}`}>
                  {index > 0 && <span className="text-gray-300">|</span>}
                  <Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
