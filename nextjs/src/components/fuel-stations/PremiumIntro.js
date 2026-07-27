'use client'
import React from 'react'
import Link from 'next/link'

export default function PremiumIntro({ data }) {
  const { title, description, ctaText } = data
  const ctaLink = data.ctaLink || '/contact'

  return (
    <section className="py-20 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17" />
            <path d="M3 22h12" />
            <path d="M15 12l3-3 3 3-3 3" />
          </svg>
        </div>

        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-[0.03em] mb-8">
          {title}
        </h2>
        
        <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto">
          {description}
        </p>

        <Link 
          href={ctaLink}
          className="group inline-flex items-center gap-3 px-10 py-5 bg-primary text-white font-bold uppercase tracking-wide transition-all duration-300 hover:bg-primary-dark rounded-full shadow-lg hover:shadow-xl"
        >
          <span>{ctaText}</span>
          <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
