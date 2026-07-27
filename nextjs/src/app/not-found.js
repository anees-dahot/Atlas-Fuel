import Link from 'next/link'
import { getErrorPages } from '@/lib/sanity'

export default async function NotFound() {
  const errorPages = await getErrorPages().catch(() => null)

  const heading = errorPages?.notFoundHeading || '404'
  const subheading = errorPages?.notFoundSubheading || 'Page Not Found'
  const description = errorPages?.notFoundDescription || "The page you're looking for doesn't exist or has been moved."
  const buttonText = errorPages?.notFoundButtonText || 'Return Home'
  const buttonLink = errorPages?.notFoundButtonLink || '/'

  return (
    <>
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-6">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-heading font-bold text-primary mb-4">{heading}</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {subheading}
          </h2>
          <p className="text-gray-600 mb-8">
            {description}
          </p>
          <Link
            href={buttonLink}
            className="px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors inline-block"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </>
  )
}
