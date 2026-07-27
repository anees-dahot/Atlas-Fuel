import CTABanner from '@/components/shared/CTABanner'
import { notFound } from 'next/navigation'
import { getNewsListingPage, getNewsPost, getNewsPosts, getSiteSettings } from '@/lib/sanity'
import { mapPageCta } from '@/lib/contentFallbacks'
import { mergeWithFallback } from '@/lib/fallback'
import { toHTML } from '@portabletext/to-html'

export async function generateMetadata({params}) {
  const {slug} = await params
  const post = await getNewsPost(slug).catch(() => null)
  const fallback = blogPosts[slug]
  return {
    title: `${post?.title || fallback?.title || 'News Article'} | Atlas Fuel Australia`,
    description: post?.excerpt || fallback?.excerpt || 'Read the latest news and insights from Atlas Fuel Australia.',
  }
}

const fallbackSiteSettings = {
  ctaBannerHeading: 'Stay Connected',
  ctaBannerText: 'Subscribe to our newsletter for the latest news and updates from Atlas Fuel.',
  ctaBannerButtonText: 'Subscribe',
  ctaBannerButtonLink: '/contact',
}

const blogPosts = {
  'future-of-fueling': {
    title: 'The Future of Fueling: How Technology is Transforming the Industry',
    date: '18 Aug 2025',
    author: 'Admin',
    category: 'Industry Insights',
    imageUrl: '/images/what-we-do-fuel-transportation.webp',
    excerpt: 'Modern innovation is driving advanced technology growth across industries worldwide today rapidly.',
    content: `
      <p>The fuel industry is undergoing a revolutionary transformation, driven by cutting-edge technologies that are reshaping how we produce, distribute, and consume energy. At Atlas Fuel, we're at the forefront of this evolution, embracing innovation to deliver better services to our customers across Australia.</p>
      
      <h2>Smart Fuel Management Systems</h2>
      <p>Modern fuel stations are no longer just places to refuel. They're becoming smart energy hubs equipped with advanced monitoring systems, automated inventory management, and real-time data analytics. These technologies enable us to:</p>
      <ul>
        <li>Monitor fuel quality and storage conditions 24/7</li>
        <li>Predict maintenance needs before issues arise</li>
        <li>Optimize delivery schedules based on demand patterns</li>
        <li>Reduce environmental impact through precision monitoring</li>
      </ul>
      
      <h2>Digital Payment Solutions</h2>
      <p>The way customers pay for fuel is changing rapidly. Contactless payments, mobile apps, and integrated loyalty programs are becoming standard expectations. Atlas Fuel has invested heavily in digital infrastructure to ensure our customers enjoy seamless, secure transactions at all our locations.</p>
      
      <h2>Alternative Energy Integration</h2>
      <p>As the world moves toward cleaner energy, we're exploring how traditional fuel infrastructure can support the transition. This includes evaluating electric vehicle charging stations, hydrogen fueling points, and biofuel options that complement our existing diesel and petrol offerings.</p>
      
      <h2>AI-Powered Logistics</h2>
      <p>Artificial intelligence is revolutionizing our supply chain. Machine learning algorithms analyze traffic patterns, weather conditions, and demand forecasts to optimize delivery routes. This means faster deliveries, lower costs, and reduced carbon emissions from our transportation fleet.</p>
      
      <h2>Looking Ahead</h2>
      <p>The future of fueling is about more than just the fuel itself—it's about creating an ecosystem that supports diverse energy needs while maintaining the reliability and convenience our customers expect. Atlas Fuel remains committed to investing in technologies that deliver value today while preparing for tomorrow's energy landscape.</p>
    `,
  },
  'choosing-fueling-partner': {
    title: '10 Essential Tips for Choosing the Right Fueling Partner',
    date: '15 Sep 2025',
    author: 'Admin',
    category: 'Business Tips',
    imageUrl: '/images/hero-trucks.jpg',
    excerpt: 'Discover ten key reasons for selecting the best fueling partner for success today.',
    content: `
      <p>Selecting the right fuel supplier is a critical decision that can significantly impact your business operations, costs, and overall success. Whether you run a fleet of vehicles, operate heavy machinery, or manage a fuel station, choosing a reliable partner requires careful consideration. Here are ten essential tips to guide your decision:</p>
      
      <h2>1. Assess Reliability and Track Record</h2>
      <p>Look for a fuel supplier with a proven history of consistent, on-time deliveries. Check references, read reviews, and research their reputation in the industry. A reliable partner should have backup plans for emergencies and adverse weather conditions.</p>
      
      <h2>2. Evaluate Supply Chain Strength</h2>
      <p>Your fuel partner should have robust relationships with multiple fuel producers and a diversified supply chain. This ensures continuity even when market conditions fluctuate or disruptions occur.</p>
      
      <h2>3. Consider Geographic Coverage</h2>
      <p>Choose a partner that can service all your locations efficiently. Whether you operate in urban centers or remote areas, your supplier should have the logistics network to reach you wherever you are.</p>
      
      <h2>4. Analyze Pricing Transparency</h2>
      <p>Look for clear, competitive pricing without hidden fees. The best partners offer transparent pricing structures and are willing to discuss long-term contracts that lock in favorable rates.</p>
      
      <h2>5. Verify Quality Assurance</h2>
      <p>Fuel quality directly affects equipment performance and longevity. Ensure your partner maintains strict quality control standards and provides fuel that meets or exceeds industry specifications.</p>
      
      <h2>6. Check Compliance and Certifications</h2>
      <p>Your fuel partner should hold all necessary certifications and comply with environmental, safety, and transportation regulations. This protects your business from liability and ensures responsible operations.</p>
      
      <h2>7. Assess Customer Service Quality</h2>
      <p>Responsive, knowledgeable customer service is invaluable. Test their responsiveness before committing, and ensure they offer multiple channels for support—phone, email, and online portals.</p>
      
      <h2>8. Evaluate Technology Integration</h2>
      <p>Modern fuel suppliers offer digital tools for ordering, tracking deliveries, and managing accounts. These technologies can streamline your operations and provide valuable data insights.</p>
      
      <h2>9. Consider Flexible Delivery Options</h2>
      <p>Your business needs may vary—sometimes requiring bulk deliveries, other times needing smaller, more frequent drops. A good partner accommodates different delivery schedules and volumes.</p>
      
      <h2>10. Look for Value-Added Services</h2>
      <p>Beyond fuel delivery, the best partners offer additional services like tank monitoring, equipment maintenance, and consulting on fuel efficiency. These extras can provide significant long-term value.</p>
      
      <h2>Conclusion</h2>
      <p>Choosing a fuel partner is about more than just price—it's about finding a reliable ally that supports your business growth. Take time to evaluate potential partners against these criteria, and don't hesitate to ask tough questions. The right fuel supplier becomes an extension of your team, contributing to your operational success.</p>
    `,
  },
  'ai-automation-fueling': {
    title: 'The Role of AI and Automation in Modern Fueling',
    date: '18 Dec 2025',
    author: 'Admin',
    category: 'Technology',
    imageUrl: '/images/what-we-do-mining-civil.webp',
    excerpt: 'AI and automation are transforming modern fueling through smarter systems and efficiency.',
    content: `
      <p>Artificial intelligence and automation are no longer futuristic concepts—they're actively transforming the fuel industry today. From predictive maintenance to autonomous delivery trucks, these technologies are creating safer, more efficient, and more sustainable fueling operations across Australia and worldwide.</p>
      
      <h2>Smart Inventory Management</h2>
      <p>AI-powered systems now monitor fuel levels at stations and customer sites in real-time, automatically triggering reorders when supplies run low. This eliminates the risk of stockouts while optimizing inventory holding costs. Machine learning algorithms analyze consumption patterns to predict future needs with remarkable accuracy.</p>
      
      <h2>Autonomous Delivery Systems</h2>
      <p>The logistics of fuel delivery are being revolutionized by automation. GPS-guided routing systems optimize delivery paths, reducing fuel consumption and delivery times. Some operations are already testing autonomous trucks for specific routes, promising enhanced safety and 24/7 operational capability.</p>
      
      <h2>Predictive Maintenance</h2>
      <p>Equipment failures can be catastrophic in the fuel industry. AI systems analyze sensor data from storage tanks, pumps, and vehicles to predict maintenance needs before failures occur. This proactive approach minimizes downtime, extends equipment life, and enhances safety.</p>
      
      <h2>Quality Control Automation</h2>
      <p>Automated testing systems continuously monitor fuel quality throughout the supply chain. These systems can detect contaminants, measure octane levels, and verify compliance with specifications faster and more accurately than manual testing.</p>
      
      <h2>Customer Experience Enhancement</h2>
      <p>AI chatbots and virtual assistants now handle routine customer inquiries, freeing human staff for complex issues. Smart payment systems reduce transaction times, while personalized loyalty programs use data analytics to offer targeted promotions.</p>
      
      <h2>Safety Improvements</h2>
      <p>Automation reduces human exposure to hazardous environments. Robotic systems handle dangerous tasks, while AI monitors operations for safety violations or potential hazards. Computer vision systems can detect spills, leaks, or unsafe conditions instantly.</p>
      
      <h2>Environmental Monitoring</h2>
      <p>Environmental compliance is critical in the fuel industry. Automated systems continuously monitor emissions, groundwater, and air quality around fueling facilities, immediately alerting operators to any issues and generating compliance reports automatically.</p>
      
      <h2>The Human Element</h2>
      <p>While automation brings many benefits, the human element remains essential. AI augments human decision-making rather than replacing it entirely. Skilled professionals are still needed to manage complex situations, maintain relationships, and ensure ethical operations.</p>
      
      <h2>Looking Forward</h2>
      <p>As these technologies mature, we can expect even more profound changes in how fuel is produced, distributed, and consumed. Companies like Atlas Fuel that embrace these innovations will be better positioned to serve their customers efficiently while contributing to a more sustainable energy future.</p>
    `,
  },
}

const relatedArticles = [
  { slug: 'future-of-fueling', title: 'The Future of Fueling: How Technology is Transforming the Industry', date: '18 Aug 2025', imageUrl: '/images/what-we-do-fuel-transportation.webp' },
  { slug: 'choosing-fueling-partner', title: '10 Essential Tips for Choosing the Right Fueling Partner', date: '15 Sep 2025', imageUrl: '/images/hero-trucks.jpg' },
  { slug: 'ai-automation-fueling', title: 'The Role of AI and Automation in Modern Fueling', date: '18 Dec 2025', imageUrl: '/images/what-we-do-mining-civil.webp' },
]

const fallbackDetailMeta = {
  bylinePrefix: 'By:',
  shareHeading: 'Share this article',
  categoriesHeading: 'Categories',
  categories: ['Industry Insights', 'Business Tips', 'Technology', 'Company News'],
  relatedHeading: 'Related Articles',
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params

  const [sanityPost, newsPosts, newsListing, globalSettings] = await Promise.all([
    getNewsPost(slug).catch(() => null),
    getNewsPosts().catch(() => null),
    getNewsListingPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  let postData

  if (sanityPost) {
    const fallbackPost = blogPosts[slug]
    // Format Sanity post data
    const formattedDate = sanityPost.publishedAt
      ? new Date(sanityPost.publishedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
      : 'Recent'

    // Convert Sanity block content to HTML
    const htmlContent = sanityPost.body?.length
      ? toHTML(sanityPost.body)
      : fallbackPost?.content || '<p>No content available.</p>'

    postData = {
      title: sanityPost.title || fallbackPost?.title,
      date: formattedDate,
      author: sanityPost.author || 'Admin',
      category: sanityPost.category || 'Company News',
      imageUrl: sanityPost.imageUrl || fallbackPost?.imageUrl || '/images/what-we-do-retail.webp',
      imageAlt: sanityPost.imageAlt || fallbackPost?.title || sanityPost.title,
      excerpt: sanityPost.excerpt || fallbackPost?.excerpt || '',
      content: htmlContent,
    }
  } else {
    // Fallback to hardcoded posts
    postData = blogPosts[slug]
  }

  if (!postData) {
    notFound()
  }

  const relatedSource = newsPosts?.length ? newsPosts : relatedArticles
  const relatedFinal = relatedSource.filter((article) => article.slug !== slug).slice(0, 2)
  const siteSettings = mapPageCta(newsListing, globalSettings, fallbackSiteSettings)
  const detailMeta = mergeWithFallback(fallbackDetailMeta, newsListing?.listingSection)

  return (
    <>
      
        {/* Hero Section */}
        <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
          <img
            src={postData.imageUrl}
            alt={postData.imageAlt || postData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-white/40" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="max-w-[1440px] mx-auto">
              <span className="inline-block px-4 py-1 bg-primary text-white text-sm font-semibold uppercase tracking-wider mb-4">
                {postData.category}
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 max-w-4xl">
                {postData.title}
              </h1>
              <div className="flex items-center gap-4 mt-4 text-gray-700">
                <span>{postData.date}</span>
                <span>|</span>
                <span>{detailMeta.bylinePrefix} {postData.author}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <article
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: postData.content }}
                />

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{detailMeta.shareHeading}</h3>
                  <div className="flex gap-3">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://atlasfuel.com.au/news/${slug}`)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1877F2] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://atlasfuel.com.au/news/${slug}`)}&text=${encodeURIComponent(postData.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1DA1F2] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://atlasfuel.com.au/news/${slug}`)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#0A66C2] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {/* Categories */}
                  <div className="bg-gray-50 p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{detailMeta.categoriesHeading}</h3>
                    <ul className="space-y-2">
                      {detailMeta.categories.map((category) => (
                        <li key={category}><a href="/news" className="text-gray-600 hover:text-primary transition-colors">{category}</a></li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Articles */}
                  <div className="bg-white border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{detailMeta.relatedHeading}</h3>
                    <div className="space-y-4">
                      {relatedFinal.map((article) => (
                        <a key={article.slug} href={`/news/${article.slug}`} className="group block">
                          <div className="flex gap-4">
                            <img src={article.imageUrl} alt={article.imageAlt || article.title} className="w-20 h-20 object-cover flex-shrink-0" />
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h4>
                              <span className="text-xs text-gray-500 mt-1 block">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-AU') : article.date}</span>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTABanner data={siteSettings} />
      
    </>
  )
}
