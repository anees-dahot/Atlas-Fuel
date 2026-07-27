'use client'
import React from 'react'
import Link from 'next/link'

export default function Breadcrumb({ items }) {
  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-gray-400">/</span>}
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  )
}
