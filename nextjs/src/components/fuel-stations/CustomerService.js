'use client'
import React from 'react'

export default function CustomerService({ data }) {
  const { heading, description, question } = data

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Large Typography */}
          <div className="relative">
            <div className="absolute -left-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight">
              {heading}
            </h2>
          </div>
          
          {/* Right - Content */}
          <div className="space-y-8">
            <p className="text-xl text-gray-600 leading-relaxed">
              {description}
            </p>
            
            {/* Climate Question - Highlighted Box */}
            <div className="relative bg-gradient-to-br from-primary/5 to-orange-50 p-8 border border-primary/10">
              <div className="absolute -top-4 left-8 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <p className="text-lg text-gray-800 font-medium italic pl-4 border-l-2 border-primary">
                {question}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
