import { getNewsPosts, getNewsListingPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import CTABanner from '@/components/shared/CTABanner'
import ServiceHero from '@/components/services/ServiceHero'
import Link from 'next/link'
import CmsImage from '@/components/common/CmsImage'

const fallbackSiteSettings = {
  ctaBannerHeading: 'Stay Connected',
  ctaBannerText: 'Subscribe to our newsletter for the latest news and updates from Atlas Fuel.',
  ctaBannerButtonText: 'Subscribe',
  ctaBannerButtonLink: '/contact',
}

const fallbackData = {
  heroSubtitle: 'News',
  heroSubtitleColor: 'var(--cms-primary)',
  heroSubtitleSize: '14px',
  heroTitle: 'Latest Updates',
  heroTitleColor: 'var(--cms-text)',
  heroTitleSize: '72px',
  heroDescription: 'Stay informed about Atlas Fuel\'s expansion, industry insights, and community initiatives across Australia.',
  heroDescriptionColor: 'var(--cms-muted)',
  heroDescriptionSize: '18px',
  heroImageUrl: '/images/atlas-fuel-hero-1.webp',
  heroImageAlt: 'Atlas Fuel news and updates',
  eyebrow: 'News & Insights',
  heading: 'Recent News',
  headingColor: 'var(--cms-text)',
  headingSize: '48px',
  emptyMessage: 'No news articles are available yet.',
  readMoreText: 'Read More',
  bylinePrefix: 'By:',
}

const fallbackArticles = [
  {
    slug: 'future-of-fueling',
    title: 'The Future of Fueling: How Technology is Transforming the Industry',
    date: '18 Aug 2025',
    category: 'Industry Insights',
    author: 'Admin',
    excerpt: 'Modern innovation is driving advanced technology growth across industries worldwide today rapidly.',
    imageUrl: '/images/what-we-do-onsite-diesel.webp',
  },
  {
    slug: 'choosing-fueling-partner',
    title: '10 Essential Tips for Choosing the Right Fueling Partner',
    date: '15 Sep 2025',
    category: 'Business Tips',
    author: 'Admin',
    excerpt: 'Discover ten key reasons for selecting the best fueling partner for success today.',
    imageUrl: '/images/what-we-do-fuel-transportation.webp',
  },
  {
    slug: 'ai-automation-fueling',
    title: 'The Role of AI and Automation in Modern Fueling',
    date: '18 Dec 2025',
    category: 'Technology',
    author: 'Admin',
    excerpt: 'AI and automation are transforming modern fueling through smarter systems and efficiency.',
    imageUrl: '/images/what-we-do-fuel-transportation.webp',
  },
]

export async function generateMetadata() {
  const [newsListing, siteSettings] = await Promise.all([
    getNewsListingPage({stega: false}).catch(() => null),
    getSiteSettings({stega: false}).catch(() => null),
  ])
  const data = mergeWithFallback(fallbackData, newsListing)
  const seo = data.seo || {}
  const title = seo.title || data.seoTitle || `${data.heroTitle} | ${siteSettings?.siteName || 'Atlas Fuel Australia'}`
  const description = seo.description || data.seoDescription || data.heroDescription
  const image =
    seo.image?.imageUrl ||
    seo.image?.image?.url ||
    seo.imageUrl ||
    data.seoImageUrl ||
    data.heroImageUrl
  const imageAlt =
    seo.image?.alt ||
    seo.image?.image?.alt ||
    data.seoImageAlt ||
    data.heroImageUrlAlt ||
    data.heroImageAlt ||
    data.heroTitle

  return {
    title,
    description,
    alternates: {canonical: seo.canonicalUrl || '/news'},
    ...(seo.indexMode === 'noindex' ? {robots: {index: false, follow: false}} : {}),
    openGraph: {
      title,
      description,
      ...(image ? {images: [{url: image, alt: imageAlt}]} : {}),
    },
  }
}

export default async function NewsPage({searchParams}) {
  const [newsListing, newsPosts, siteSettings] = await Promise.all([
    getNewsListingPage().catch(() => null),
    getNewsPosts().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const data = mergeWithFallback(fallbackData, newsListing)
  const settings = mapPageCta(newsListing, siteSettings, fallbackSiteSettings)

  const hero = {
    subtitle: data.heroSubtitle,
    title: data.heroTitle,
    description: data.heroDescription,
    heroImageUrl: data.heroImageUrl,
    heroImage: data.heroImage ?? data.heroImageImage,
    heroImageAlt: data.heroImageUrlAlt ?? data.heroImageAlt,
    subtitleColor: data.heroSubtitleColor,
    subtitleSize: data.heroSubtitleSize,
    titleColor: data.heroTitleColor,
    titleSize: data.heroTitleSize,
    descriptionColor: data.heroDescriptionColor,
    descriptionSize: data.heroDescriptionSize,
  }

  const news = {
    heading: data.heading,
    articles: Array.isArray(newsPosts) ? newsPosts : fallbackArticles,
  }
  const resolvedSearchParams = await searchParams
  const selectedCategory =
    typeof resolvedSearchParams?.category === 'string'
      ? resolvedSearchParams.category.trim()
      : ''
  const categories = Array.isArray(data.categories)
    ? data.categories
    : [...new Set(news.articles.map((article) => article.category).filter(Boolean))]
  const articles = selectedCategory
    ? news.articles.filter(
        (article) =>
          article.category?.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase()
      )
    : news.articles
  const formatDate = (value) => {
    if (!value) return ''
    const date = new Date(value)
    return Number.isNaN(date.getTime())
      ? value
      : new Intl.DateTimeFormat('en-AU', {day: 'numeric', month: 'short', year: 'numeric'}).format(date)
  }

  return (
    <>
      
        <ServiceHero data={hero} />
        
        {/* News Grid Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12" data-empty-message={data.emptyMessage}>
            {data.eyebrow && (
              <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                {data.eyebrow}
              </span>
            )}
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12"
              style={{color: data.headingColor, fontSize: data.headingSize}}
            >
              {news.heading}
            </h2>
            {categories.length > 0 && (
              <nav className="mb-10 flex flex-wrap gap-3" aria-label={data.categoriesHeading ?? 'News categories'}>
                <Link
                  href="/news"
                  aria-current={!selectedCategory ? 'page' : undefined}
                  className={`border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    !selectedCategory
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                  }`}
                >
                  {data.allCategoriesText ?? 'All'}
                </Link>
                {categories.map((category) => {
                  const active =
                    selectedCategory.toLocaleLowerCase() === category.toLocaleLowerCase()
                  return (
                    <Link
                      key={category}
                      href={`/news?category=${encodeURIComponent(category)}`}
                      aria-current={active ? 'page' : undefined}
                      className={`border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                        active
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                      }`}
                    >
                      {category}
                    </Link>
                  )
                })}
              </nav>
            )}
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <article key={article._id || index} className="bg-white overflow-hidden border border-gray-200 hover:border-primary transition-colors group">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <CmsImage
                      value={article.mainImage}
                      src={article.imageUrl || article.mainImageUrl}
                      fallbackSrc="/images/what-we-do-retail.webp"
                      alt={article.imageAlt || article.mainImageAlt || article.mainImage?.alt || article.title || ''}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {article.category && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase rounded-full">
                          {article.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                      {(article.publishedAt || article.date) && (
                        <span className="text-sm text-gray-500">{formatDate(article.publishedAt || article.date)}</span>
                      )}
                      {(article.publishedAt || article.date) && article.author && (
                        <span className="text-gray-300">|</span>
                      )}
                      {article.author && (
                        <span className="text-sm text-gray-500">
                          {data.bylinePrefix ? `${data.bylinePrefix} ` : ''}{article.author}
                        </span>
                      )}
                    </div>
                    {data.readMoreText && article.slug && (
                      <Link href={`/news/${typeof article.slug === 'string' ? article.slug : article.slug.current}`} className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                        {data.readMoreText}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12"/>
                          <polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </Link>
                    )}
                  </div>
                </article>
              ))}
              </div>
            ) : (
              <p className="text-gray-600">
                {selectedCategory
                  ? (data.filteredEmptyMessage ?? data.emptyMessage)
                  : data.emptyMessage}
              </p>
            )}
          </div>
        </section>

        <CTABanner data={settings} />
      
    </>
  )
}
