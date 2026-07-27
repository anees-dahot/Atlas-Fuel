'use client'

import React from 'react'
import Link from 'next/link'

export default function TopRibbon({ siteSettings = {} }) {
  const [isVisible, setIsVisible] = React.useState(true)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY <= 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fallback values
  const phone = siteSettings.phone || '+61 8 6377 7644'
  const email = siteSettings.email || 'info@atlasfuel.com.au'
  const address = siteSettings.address || '1 Mandurah Rd, Kwinana WA 6167'
  const contactText = siteSettings.topRibbonContactText || 'Contact Us'
  const contactLink = siteSettings.topRibbonContactLink || '/contact'
  const facebookUrl = siteSettings.facebookUrl || '#'
  const instagramUrl = siteSettings.instagramUrl || '#'
  const linkedinUrl = siteSettings.linkedinUrl || '#'

  return (
    <div className={`bg-white text-gray-700 text-xs border-b border-gray-200 transition-all duration-300 overflow-hidden ${isVisible ? 'py-2 opacity-100' : 'py-0 opacity-0 h-0'}`}>
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">

          {/* Left: Contact Info with dividers */}
          <div className="flex flex-wrap items-center justify-center md:justify-start">
            {/* Phone */}
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 hover:text-primary transition-colors pr-4 border-r border-gray-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6.87-6.87 19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.904.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              {phone}
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 hover:text-primary transition-colors px-4 border-r border-gray-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M22 7l-10 6L2 7"/>
              </svg>
              {email}
            </a>

            {/* Address */}
            <div className="flex items-center gap-2 px-4">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {address}
            </div>
          </div>

          {/* Right: Contact Us + Social with divider */}
          <div className="flex items-center">
            {/* Contact Us Link */}
            <Link
              href={contactLink}
              className="font-semibold hover:text-primary transition-colors px-4 border-r border-gray-300"
            >
              {contactText}
            </Link>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pl-4">
              {facebookUrl && facebookUrl !== '#' && (
                <a
                  href={facebookUrl}
                  className="hover:text-primary transition-colors"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
              )}
              {instagramUrl && instagramUrl !== '#' && (
                <a
                  href={instagramUrl}
                  className="hover:text-primary transition-colors"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              )}
              {linkedinUrl && linkedinUrl !== '#' && (
                <a
                  href={linkedinUrl}
                  className="hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
