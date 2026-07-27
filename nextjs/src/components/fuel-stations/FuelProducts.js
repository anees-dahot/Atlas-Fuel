'use client'
import React from 'react'
import Link from 'next/link'

export default function FuelProducts({ products }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className={`grid md:grid-cols-2 gap-12 items-center mb-20 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Large Octane Number - Like Live Site */}
            <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
              <div className="relative">
                <span className="text-[150px] md:text-[200px] font-bold text-gray-100 leading-none select-none">
                  {product.octane}
                </span>
                <div className="absolute top-1/2 left-0 -translate-y-1/2">
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase tracking-[0.03em]">
                    {product.name}
                  </h3>
                  <p className="text-lg text-primary font-semibold uppercase tracking-wider mt-2">
                    {product.subtitle}
                  </p>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed mt-8 max-w-lg">
                {product.description}
              </p>
              
              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold uppercase tracking-wider text-sm hover:bg-primary-dark transition-colors"
                >
                  <span>{product.orderCta}</span>
                </Link>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-bold border-2 border-gray-200 hover:bg-gray-50 hover:border-primary/30 transition-colors uppercase tracking-wider text-sm"
                >
                  <span>{product.enquireCta}</span>
                </Link>
              </div>
            </div>
            
            {/* Product Image */}
            <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
