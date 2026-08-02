'use client'

import {useEffect, useState} from 'react'

const fallbackSettings = {
  errorHeading: 'Error',
  errorSubheading: 'Something went wrong',
  errorDescription: 'An unexpected error occurred.',
  errorButtonText: 'Try Again',
}

export default function GlobalError({ reset }) {
  const [settings, setSettings] = useState(fallbackSettings)

  useEffect(() => {
    let active = true

    fetch('/api/error-settings')
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (active && data) setSettings({...fallbackSettings, ...data})
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [])

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="text-center max-w-md">
          {settings.errorHeading && <h1 className="text-6xl font-heading font-bold text-primary mb-4">{settings.errorHeading}</h1>}
          {settings.errorSubheading && (
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {settings.errorSubheading}
            </h2>
          )}
          {settings.errorDescription && (
            <p className="text-gray-600 mb-8">
              {settings.errorDescription}
            </p>
          )}
          {settings.errorButtonText && (
            <button
              onClick={() => reset()}
              className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors"
            >
              {settings.errorButtonText}
            </button>
          )}
        </div>
      </body>
    </html>
  )
}
