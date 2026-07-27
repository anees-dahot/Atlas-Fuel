'use client'

import { createContext, useContext } from 'react'

const fallbackSettings = {
  errorHeading: 'Error',
  errorSubheading: 'Something went wrong',
  errorDescription: 'An unexpected error occurred.',
  errorButtonText: 'Try Again',
}

const ErrorSettingsContext = createContext(fallbackSettings)

export function ErrorSettingsProvider({ settings, children }) {
  return (
    <ErrorSettingsContext.Provider value={{...fallbackSettings, ...settings}}>
      {children}
    </ErrorSettingsContext.Provider>
  )
}

export function useErrorSettings() {
  return useContext(ErrorSettingsContext)
}
