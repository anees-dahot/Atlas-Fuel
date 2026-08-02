'use client'

import React from 'react'
import CmsImage from '@/components/common/CmsImage'

export default function ImageGallery({ data = {} }) {
  const heading = data.heading ?? 'Our Stations'
  const headingColor = data.headingColor ?? 'var(--cms-text)'
  const headingSize = data.headingSize ?? '48px'
  const headingBorderEnabled = data.headingBorderEnabled ?? false
  const headingBorderColor = data.headingBorderColor ?? 'var(--cms-text)'
  const headingBorderWidth = data.headingBorderWidth ?? '1px'
  const headingShadowColor = data.headingShadowColor ?? ''

  const displayImages = data.images ?? []

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <h2
          className="font-bold mb-8 leading-tight text-center"
          style={{
            color: headingColor,
            fontSize: headingSize,
            border: headingBorderEnabled ? `${headingBorderWidth} solid ${headingBorderColor}` : 'none',
            textShadow: headingShadowColor ? `0 2px 4px ${headingShadowColor}` : 'none',
          }}
        >
          {heading}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayImages.map((image, index) => {
            const imageUrl = typeof image === 'string'
              ? image
              : image?.url ?? image?.imageUrl
            const imageAlt = typeof image === 'string'
              ? `Atlas Fuel station ${index + 1}`
              : image?.alt ?? image?.imageAlt ?? ''
            return (
            <div
              key={image?._key || imageUrl || index}
              className={`relative overflow-hidden ${
                index === 0 ? 'col-span-2 md:col-span-2 row-span-2' : ''
              }`}
            >
              <CmsImage
                value={image}
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
