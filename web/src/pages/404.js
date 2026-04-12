import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout/Layout'
import SEO from '../components/Common/SEO'

export default function NotFound() {
  return (
    <Layout>
      <SEO title="404 - Page Not Found" />
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="container-max text-center py-32">
          <h1 className="text-8xl font-bold text-primary mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            404
          </h1>
          <h2 className="text-3xl font-bold text-foreground mb-4 uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
            Page Not Found
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </Layout>
  )
}
