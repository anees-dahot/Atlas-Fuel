'use client'
import React from 'react'
import Link from 'next/link'

export default function RetailFeatures({ data }) {
  const { features, ctaText } = data
  const ctaLink = data.ctaLink || '/contact'

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Simple Bullet List - Like Live Site */}
        <ul className="space-y-4 mb-12">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-lg text-gray-700">
              <span className="w-2 h-2 bg-primary rounded-full" />
              {feature.title}
            </li>
          ))}
        </ul>

        {/* CTA - Like Live Site */}
        <div className="text-center">
          <Link 
            href={ctaLink}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-all"
          >
            <span>{ctaText}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
