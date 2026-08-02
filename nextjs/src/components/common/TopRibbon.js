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

  const phone = siteSettings.phone ?? '+61 8 6377 7644'
  const email = siteSettings.email ?? 'info@atlasfuel.com.au'
  const address = siteSettings.address ?? '1 Mandurah Rd, Kwinana WA 6167'
  const contactText = siteSettings.topRibbonContactText ?? 'Contact Us'
  const contactLink = siteSettings.topRibbonContactLink ?? '/contact'
  const facebookUrl = siteSettings.facebookUrl ?? '#'
  const instagramUrl = siteSettings.instagramUrl ?? '#'
  const linkedinUrl = siteSettings.linkedinUrl ?? '#'
  const twitterUrl = siteSettings.twitterUrl ?? ''
  const youtubeUrl = siteSettings.youtubeUrl ?? ''
  const hasSocial = [facebookUrl, instagramUrl, linkedinUrl, twitterUrl, youtubeUrl]
    .some((url) => url && url !== '#')

  return (
    <div className={`bg-white text-gray-700 text-xs border-b border-gray-200 transition-all duration-300 overflow-hidden ${isVisible ? 'py-2 opacity-100' : 'py-0 opacity-0 h-0'}`}>
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">

          {/* Left: Contact Info with dividers */}
          <div className="flex flex-wrap items-center justify-center md:justify-start">
            {/* Phone */}
            {phone && (
              <a
                href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                className={`flex items-center gap-2 hover:text-primary transition-colors pr-4 ${email || address ? 'border-r border-gray-300' : ''}`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6.87-6.87 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 2 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.904.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {phone}
              </a>
            )}

            {/* Email */}
            {email && (
              <a
                href={`mailto:${email}`}
                className={`flex items-center gap-2 hover:text-primary transition-colors px-4 ${address ? 'border-r border-gray-300' : ''}`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 7l-10 6L2 7"/>
                </svg>
                {email}
              </a>
            )}

            {/* Address */}
            {address && (
              <div className="flex items-center gap-2 px-4">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {address}
              </div>
            )}
          </div>

          {/* Right: Contact Us + Social with divider */}
          <div className="flex items-center">
            {/* Contact Us Link */}
            {contactText && contactLink && (
              <Link
                href={contactLink}
                className={`font-semibold hover:text-primary transition-colors px-4 ${hasSocial ? 'border-r border-gray-300' : ''}`}
              >
                {contactText}
              </Link>
            )}

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
              {twitterUrl && twitterUrl !== '#' && (
                <a
                  href={twitterUrl}
                  className="hover:text-primary transition-colors"
                  aria-label="X"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2H21.5l-7.114 8.13L22.75 22h-6.55l-5.13-6.708L5.202 22H1.944l7.612-8.7L1.53 2h6.716l4.638 6.132L18.244 2Zm-1.143 17.91h1.804L7.265 3.986H5.33L17.1 19.91Z"/>
                  </svg>
                </a>
              )}
              {youtubeUrl && youtubeUrl !== '#' && (
                <a
                  href={youtubeUrl}
                  className="hover:text-primary transition-colors"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z"/>
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
