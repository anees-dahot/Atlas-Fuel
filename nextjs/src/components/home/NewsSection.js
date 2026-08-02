'use client'
import Link from 'next/link'
import CmsImage from '@/components/common/CmsImage'

const sizeMap = { '1': '12px', '2': '16px', '3': '20px', '4': '24px', '5': '32px', '6': '48px', '7': '70px' }

const getStyle = (obj, field) => {
  const style = {}
  if (obj[`${field}Size`]) {
    style.fontSize = sizeMap[obj[`${field}Size`]]
  }
  if (obj[`${field}BorderEnabled`]) {
    style.WebkitTextStroke = `${obj[`${field}BorderWidth`]} ${obj[`${field}BorderColor`]}`
    if (obj[`${field}ShadowColor`]) {
      style.textShadow = `0 0 10px ${obj[`${field}ShadowColor`]}`
    }
  }
  return style
}

export default function NewsSection({ data }) {
  const { tag, heading, articles, viewMoreLink, viewMoreText } = data

  return (
    <section id="news" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className={`${data.sectionTagColor || "text-primary"} font-semibold uppercase tracking-wider text-sm`} style={getStyle(data, 'sectionTag')}>
              {tag}
            </span>
            <h2 className={`${data.headingColor || "text-gray-900"} text-3xl lg:text-4xl font-bold mt-2`} style={getStyle(data, 'heading')}>
              {heading}
            </h2>
          </div>
          <Link
            href={viewMoreLink}
            className={`${data.viewMoreTextColor || "text-primary"} mt-4 md:mt-0 inline-flex items-center gap-2 font-semibold hover:underline`} style={getStyle(data, 'viewMoreText')}
          >
            {viewMoreText ?? 'View More'}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={index}
              className="bg-white overflow-hidden border border-gray-200 hover:border-primary transition-colors group"
            >
              <Link href={article.link} className="block">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <CmsImage
                    value={article.image || article.imageUrl}
                    fallbackSrc="/images/what-we-do-retail.webp"
                    alt={article.imageAlt || article.title || ""}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  {article.category && (
                    <span className="mb-3 inline-block bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                      {article.category}
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-sm text-gray-500">{data.bylineLabel ?? "By:"} {article.author}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-4 text-primary font-semibold text-sm hover:underline">
                    {data.readMoreText ?? "Read More"}
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
