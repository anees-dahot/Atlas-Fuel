import { getNewsPosts, getNewsListingPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import CTABanner from '@/components/shared/CTABanner'
import ServiceHero from '@/components/services/ServiceHero'
import Link from 'next/link'

export const metadata = {
  title: 'News | Atlas Fuel Australia',
  description: 'Stay updated with the latest news from Atlas Fuel. Company updates, industry insights, and community stories.',
}

const fallbackSiteSettings = {
  ctaBannerHeading: 'Stay Connected',
  ctaBannerText: 'Subscribe to our newsletter for the latest news and updates from Atlas Fuel.',
  ctaBannerButtonText: 'Subscribe',
  ctaBannerButtonLink: '/contact',
}

const fallbackData = {
  heroSubtitle: 'News',
  heroSubtitleColor: '#10b981',
  heroSubtitleSize: '14px',
  heroTitle: 'Latest Updates',
  heroTitleColor: '#000000',
  heroTitleSize: '72px',
  heroDescription: 'Stay informed about Atlas Fuel\'s expansion, industry insights, and community initiatives across Australia.',
  heroDescriptionColor: '#666666',
  heroDescriptionSize: '18px',
  heroImageUrl: '/images/atlas-fuel-hero-1.webp',
  heroImageAlt: 'Atlas Fuel news and updates',
  eyebrow: 'News & Insights',
  heading: 'Recent News',
  headingColor: '#000000',
  headingSize: '48px',
  emptyMessage: 'No news articles are available yet.',
  readMoreText: 'Read More',
  bylinePrefix: 'By:',
}

const fallbackNews = {
  articles: [
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
    {
      title: 'Atlas Fuel Expands Network with Three New Stations',
      date: 'March 2024',
      category: 'Company News',
      author: 'Admin',
      excerpt: 'Atlas Fuel Australia is proud to announce the opening of three new fuel stations in Western Australia, bringing our total network to 15 locations across the state.',
      imageUrl: '/images/what-we-do-retail.webp',
    },
    {
      title: 'Sustainable Fueling Initiative Launches in Regional Areas',
      date: 'February 2024',
      category: 'Sustainability',
      author: 'Admin',
      excerpt: 'Our new sustainable fueling program brings low-emission fuels to regional communities, supporting Australia\'s transition to cleaner energy.',
      imageUrl: '/images/agriculture.webp',
    },
    {
      title: 'Atlas Fuel Wins Safety Excellence Award',
      date: 'January 2024',
      category: 'Awards',
      author: 'Admin',
      excerpt: 'Recognized for our commitment to workplace safety, Atlas Fuel receives the 2023 Safety Excellence Award from the Australian Fuel Industry Association.',
      imageUrl: '/images/partner-in-safety.webp',
    },
  ],
}

export default async function NewsPage() {
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
    heroImageAlt: data.heroImageUrlAlt || data.heroImageAlt,
    subtitleColor: data.heroSubtitleColor,
    subtitleSize: data.heroSubtitleSize,
    titleColor: data.heroTitleColor,
    titleSize: data.heroTitleSize,
    descriptionColor: data.heroDescriptionColor,
    descriptionSize: data.heroDescriptionSize,
  }

  const news = {
    heading: data.heading,
    articles: newsPosts?.length > 0 ? newsPosts : fallbackNews.articles,
  }
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
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
              {data.eyebrow}
            </span>
            <h2
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12"
              style={{color: data.headingColor, fontSize: data.headingSize}}
            >
              {news.heading}
            </h2>
            {news.articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.articles.map((article, index) => (
                <article key={article._id || index} className="bg-white overflow-hidden border border-gray-200 hover:border-primary transition-colors group">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.imageAlt || article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase rounded-full">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm text-gray-500">{formatDate(article.publishedAt || article.date)}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-sm text-gray-500">{data.bylinePrefix} {article.author}</span>
                    </div>
                    <Link href={article.slug ? `/news/${typeof article.slug === 'string' ? article.slug : article.slug.current}` : '/news'} className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline">
                      {data.readMoreText}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
              </div>
            ) : (
              <p className="text-gray-600">{data.emptyMessage}</p>
            )}
          </div>
        </section>

        <CTABanner data={settings} />
      
    </>
  )
}
