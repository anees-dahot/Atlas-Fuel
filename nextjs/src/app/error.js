'use client'

import { useErrorSettings } from '@/components/common/ErrorSettingsProvider'

export default function Error({ error, reset }) {
  const settings = useErrorSettings()

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-heading font-bold text-primary mb-4">{settings.errorHeading}</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {settings.errorSubheading}
        </h2>
        <p className="text-gray-600 mb-8">
          {settings.errorDescription}
        </p>
        <button
          onClick={() => reset()}
          className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors"
        >
          {settings.errorButtonText}
        </button>
      </div>
    </div>
  )
}
