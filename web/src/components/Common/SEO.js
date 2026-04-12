import React from 'react'
import { Helmet } from 'react-helmet'

export default function SEO({ title, description, image, pathname }) {
  const siteTitle = `Atlas Fuel Australia`
  const siteDescription = description || `Reliable. Efficient. Nationwide. Atlas Fuel is Australia's trusted provider of quality petroleum products.`
  const siteUrl = `https://atlasfuel.com.au`
  const defaultImage = `/images/logo.png`

  const seo = {
    title: title ? `${title} | ${siteTitle}` : siteTitle,
    description: siteDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname || `/`}`,
  }

  return (
    <Helmet
      title={seo.title}
      meta={[
        { name: `description`, content: seo.description },
        { name: `image`, content: seo.image },
        { property: `og:title`, content: seo.title },
        { property: `og:description`, content: seo.description },
        { property: `og:type`, content: `website` },
        { property: `og:image`, content: seo.image },
        { property: `og:url`, content: seo.url },
        { name: `twitter:card`, content: `summary_large_image` },
        { name: `twitter:title`, content: seo.title },
        { name: `twitter:description`, content: seo.description },
        { name: `twitter:image`, content: seo.image },
      ]}
    />
  )
}
