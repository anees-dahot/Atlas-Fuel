'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function IndependentDealers({ data = {} }) {
  const heading = data.heading || 'Independent Dealers'
  const headingColor = data.headingColor || '#000000'
  const headingSize = data.headingSize || '48px'
  const headingBorderEnabled = data.headingBorderEnabled || false
  const headingBorderColor = data.headingBorderColor || '#000000'
  const headingBorderWidth = data.headingBorderWidth || '1px'
  const headingShadowColor = data.headingShadowColor || ''

  const description = data.description || 'Partner with Atlas Fuel and become part of our growing network of independent fuel retailers. We provide the support, products, and expertise you need to succeed in the competitive fuel retail market.'
  const descriptionColor = data.descriptionColor || '#000000'
  const descriptionSize = data.descriptionSize || '18px'
  const descriptionBorderEnabled = data.descriptionBorderEnabled || false
  const descriptionBorderColor = data.descriptionBorderColor || '#000000'
  const descriptionBorderWidth = data.descriptionBorderWidth || '1px'
  const descriptionShadowColor = data.descriptionShadowColor || ''

  const ctaText = data.ctaText || 'Learn More'
  const ctaLink = data.ctaLink || '/contact'
  const imageUrl = data.imageUrl || '/images/what-we-do-fuel-transportation.webp'

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
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
          <div className="order-1 lg:order-2">
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
