'use client'
import React from 'react'

export default function RetailOutletsIntro({ data }) {
  const { subtitle, title, description } = data

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary text-sm font-bold uppercase tracking-wider">{subtitle}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 uppercase tracking-[0.03em] mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Stats Cards - Retail style */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-primary text-white p-6 text-center">
              <div className="text-4xl font-bold mb-1">15+</div>
              <div className="text-sm uppercase tracking-wider opacity-90">Years</div>
            </div>
            <div className="bg-primary-dark text-white p-6 text-center">
              <div className="text-4xl font-bold mb-1">24/7</div>
              <div className="text-sm uppercase tracking-wider opacity-90">Service</div>
            </div>
            <div className="bg-orange-500 text-white p-6 text-center">
              <div className="text-4xl font-bold mb-1">100%</div>
              <div className="text-sm uppercase tracking-wider opacity-90">Quality</div>
            </div>
            <div className="bg-gray-100 text-gray-900 p-6 text-center border-2 border-gray-200">
              <div className="text-4xl font-bold mb-1">AUS</div>
              <div className="text-sm uppercase tracking-wider text-gray-600">Wide</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
