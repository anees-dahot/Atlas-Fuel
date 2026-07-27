'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-heading font-bold text-primary mb-4">Critical Error</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Something went seriously wrong
          </h2>
          <p className="text-gray-600 mb-8">
            {error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => reset()}
            className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
