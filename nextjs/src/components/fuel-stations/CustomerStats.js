'use client'
import React from 'react'

export default function CustomerStats({ data }) {
  const { statValue, statLabel } = data

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Large Stat - Like Live Site */}
        <div className="text-8xl md:text-9xl font-bold text-gray-900 leading-none">
          {statValue}
        </div>
        <div className="text-xl md:text-2xl text-gray-600 mt-4 uppercase tracking-wide">
          {statLabel}
        </div>
      </div>
    </section>
  )
}
