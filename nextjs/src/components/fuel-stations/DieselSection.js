'use client'

import React from 'react'
import Link from 'next/link'

export default function DieselSection({ data = {} }) {
  const heading = data.heading || 'Diesel Fuel'
  const headingColor = data.headingColor || '#000000'
  const headingSize = data.headingSize || '48px'
  const headingBorderEnabled = data.headingBorderEnabled || false
  const headingBorderColor = data.headingBorderColor || '#000000'
  const headingBorderWidth = data.headingBorderWidth || '1px'
  const headingShadowColor = data.headingShadowColor || ''

  const description = data.description || 'Our high-quality diesel fuel is formulated to deliver optimal performance for diesel engines. Whether you\'re operating commercial vehicles, heavy machinery, or agricultural equipment, Atlas Fuel diesel provides the power and efficiency you need.'
  const descriptionColor = data.descriptionColor || '#000000'
  const descriptionSize = data.descriptionSize || '18px'
  const descriptionBorderEnabled = data.descriptionBorderEnabled || false
  const descriptionBorderColor = data.descriptionBorderColor || '#000000'
  const descriptionBorderWidth = data.descriptionBorderWidth || '1px'
  const descriptionShadowColor = data.descriptionShadowColor || ''

  const ctaText = data.ctaText || 'Learn More'
  const ctaLink = data.ctaLink || '/contact'
  const imageUrl = data.imageUrl || '/images/hero-trucks.jpg'

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <h2
              className="font-bold mb-8 leading-tight"
              style={{
                color: headingColor,
                fontSize: headingSize,
                border: headingBorderEnabled ? `${headingBorderWidth} solid ${headingBorderColor}` : 'none',
                textShadow: headingShadowColor ? `0 2px 4px ${headingShadowColor}` : 'none',
              }}
            >
              {heading}
            </h2>
            <p
              className="leading-relaxed mb-8"
              style={{
                color: descriptionColor,
                fontSize: descriptionSize,
                border: descriptionBorderEnabled ? `${descriptionBorderWidth} solid ${descriptionBorderColor}` : 'none',
                textShadow: descriptionShadowColor ? `0 2px 4px ${descriptionShadowColor}` : 'none',
              }}
            >
              {description}
            </p>
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-bold uppercase tracking-wider hover:bg-primary-dark transition-colors"
            >
              {ctaText}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>

          {/* Right: Image */}
          <div>
            <div className="relative h-[400px] lg:h-[500px] bg-gray-100 overflow-hidden">
              <img
                src={imageUrl}
                alt={heading}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
