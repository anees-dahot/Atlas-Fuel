import { getProductsPage, getSiteSettings } from '@/lib/sanity'
import { mergeWithFallback } from '@/lib/fallback'
import { mapPageCta } from '@/lib/contentFallbacks'
import CTABanner from '@/components/shared/CTABanner'
import ServiceHero from '@/components/services/ServiceHero'

export const metadata = {
  title: 'Products | Premium Fuel Products | Atlas Fuel Australia',
  description: 'Atlas Fuel Australia offers a range of premium fuel products designed to meet the diverse needs of Australian drivers - Unleaded 91, Premium 95, Premium 98, and Diesel.',
}

const fallbackData = {
  heroSubtitle: 'Our Products',
  heroSubtitleColor: '#10b981',
  heroSubtitleSize: '14px',
  heroTitle: 'Premium Fuel Products for Every Need',
  heroTitleColor: '#000000',
  heroTitleSize: '72px',
  heroDescription: 'Atlas Fuel Australia takes pride in offering a range of premium fuel products designed to meet the diverse needs of Australian drivers. Whether you are running a family car, a high-performance vehicle, or a commercial fleet, our fuels are formulated to ensure optimal performance, efficiency, and engine care.',
  heroDescriptionColor: '#666666',
  heroDescriptionSize: '18px',
  heroImageUrl: '/images/atlas-fuel-hero-1.webp',
  introHeading: 'Quality Fuel for Every Journey',
  introHeadingColor: '#000000',
  introHeadingSize: '48px',
  introDescription: 'Atlas Fuel Australia takes pride in offering a range of premium fuel products designed to meet the diverse needs of Australian drivers. Whether you are running a family car, a high-performance vehicle, or a commercial fleet, our fuels are formulated to ensure optimal performance, efficiency, and engine care. Coupled with state-of-the-art retail facilities, we provide an unparalleled refueling experience for our customers.',
  introDescriptionColor: '#666666',
  introDescriptionSize: '18px',
  statsValue: '35,224',
  statsLabel: 'Happy Customers Every Day',
  servicePromiseHeading: 'At Atlas Fuel, customer service is our highest priority.',
  servicePromiseHeadingColor: '#000000',
  servicePromiseHeadingSize: '48px',
  servicePromiseDescription: 'We are dedicated to delivering exceptional experiences by ensuring every customer interaction is marked by professionalism, responsiveness, and personalized care. Our team understands the importance of reliable fuel delivery and support, striving to meet and exceed customer expectations at every turn.',
  servicePromiseDescriptionColor: '#666666',
  servicePromiseDescriptionSize: '18px',
  servicePromiseImageUrl: '/images/independent-fuel-stations.jpg',
  servicePromiseImageAlt: 'Atlas Fuel service team',
  servicePromiseFeatures: ['Reliability and performance', 'Quality Assurance', 'Competitive Prices'],
  additionalProductsHeading: 'Additional Products & Services',
  additionalProductsDescription: 'Beyond our standard fuel range, we offer specialized products to meet diverse industry needs.',
}

const fallbackProducts = {
  products: [
    {
      id: 'unleaded-91',
      name: 'Unleaded 91',
      octane: '91',
      subtitle: 'Standard Performance',
      description: 'A staple fuel option carefully refined to ensure reliable performance and efficient combustion. An excellent choice for vehicles requiring standard octane levels, providing consistent power and economy for everyday driving.',
      features: ['Reliable everyday performance', 'Efficient combustion', 'Suitable for standard vehicles', 'Cost-effective option'],
      imageUrl: '/images/fuel-stations.jpg',
      color: 'bg-green-500',
    },
    {
      id: 'premium-95',
      name: 'Premium 95',
      octane: '95',
      subtitle: 'Enhanced Performance',
      description: 'Provides a noticeable boost in efficiency and power. Formulated to prevent engine knocking, ensuring a smoother and more responsive drive for vehicles that demand higher octane fuel.',
      features: ['Enhanced engine performance', 'Prevents engine knocking', 'Smoother acceleration', 'Better fuel economy'],
      imageUrl: '/images/what-we-do-retail.webp',
      color: 'bg-blue-500',
    },
    {
      id: 'premium-98',
      name: 'Premium 98',
      octane: '98',
      subtitle: 'Maximum Performance',
      description: 'The ultimate solution for high-performance engines. Delivers precise and efficient combustion, unlocking the full potential of powerful vehicles and sports cars.',
      features: ['Maximum engine performance', 'Optimal for high-performance vehicles', 'Superior acceleration', 'Advanced engine protection'],
      imageUrl: '/images/what-we-do-retail.webp',
      color: 'bg-red-500',
    },
    {
      id: 'diesel',
      name: 'Diesel',
      octane: 'D',
      subtitle: 'Power & Efficiency',
      description: 'Our high-quality diesel fuel is formulated to deliver optimal performance for diesel engines. Whether you are operating commercial vehicles, heavy machinery, or agricultural equipment, Atlas Fuel diesel provides the power and efficiency you need.',
      features: ['High cetane rating', 'Optimal for commercial vehicles', 'Suitable for heavy machinery', 'Meets Australian standards'],
      imageUrl: '/images/onsite-diesel.jpg',
      color: 'bg-yellow-500',
    },
  ],
  additionalProducts: [
    {
      name: 'Marine Diesel',
      description: 'Specialized diesel formulation for marine engines, ensuring reliable performance across Australian waters.',
      icon: 'anchor',
    },
    {
      name: 'Low Sulphur Fuel',
      description: 'Environmentally-friendly low-sulphur options that meet strict IMO 2020 compliance standards.',
      icon: 'leaf',
    },
    {
      name: 'Bulk Diesel',
      description: 'Large-volume diesel supply for industrial operations, mining, and agricultural needs.',
      icon: 'truck',
    },
    {
      name: 'Lubricants',
      description: 'High-quality engine oils and lubricants to keep your vehicles and machinery running smoothly.',
      icon: 'droplet',
    },
  ],
}

const fallbackSiteSettings = {
  ctaBannerHeading: 'Need Quality Fuel Products?',
  ctaBannerText: 'Contact us today to learn more about our premium fuel products and find your nearest Atlas Fuel station.',
  ctaBannerButtonText: 'Find a Station',
  ctaBannerButtonLink: '/store-locator',
}

export default async function ProductsPage() {
  const [sanity, siteSettings] = await Promise.all([
    getProductsPage().catch(() => null),
    getSiteSettings().catch(() => null),
  ])

  const data = mergeWithFallback(fallbackData, sanity)
  const settings = mapPageCta(sanity, siteSettings, fallbackSiteSettings)

  const hero = {
    subtitle: data.heroSubtitle,
    title: data.heroTitle,
    description: data.heroDescription,
    heroImageUrl: data.heroImageUrl,
  }

  const productsData = {
    intro: {
      heading: data.introHeading,
      description: data.introDescription,
    },
    products: sanity?.products?.length > 0 ? sanity.products : fallbackProducts.products,
    stats: {
      value: data.statsValue,
      label: data.statsLabel,
    },
    additionalProducts: sanity?.additionalProducts?.length > 0 ? sanity.additionalProducts : fallbackProducts.additionalProducts,
    additional: mergeWithFallback({
      heading: fallbackData.additionalProductsHeading,
      description: fallbackData.additionalProductsDescription,
    }, sanity?.additionalProductsSection),
    servicePromise: {
      heading: data.servicePromiseHeading,
      description: data.servicePromiseDescription,
      imageUrl: data.servicePromiseImageUrl,
      imageAlt: sanity?.servicePromiseSection?.imageAlt || fallbackData.servicePromiseImageAlt,
      features: sanity?.servicePromiseSection?.features?.length
        ? sanity.servicePromiseSection.features
        : fallbackData.servicePromiseFeatures,
    },
  }

  return (
    <>
      
        <ServiceHero data={hero} />

        {/* Intro Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" style={{ color: data.introHeadingColor, fontSize: data.introHeadingSize }}>
                {productsData.intro.heading}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed" style={{ color: data.introDescriptionColor, fontSize: data.introDescriptionSize }}>
                {productsData.intro.description}
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {productsData.products.map((product) => (
                <div
                  key={product._id || product.id || product.name || product.title}
                  data-product-slug={product.slug?.current || product.slug || undefined}
                  className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.imageAlt || product.name || product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-4 right-4 w-16 h-16 ${product.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                      {product.octane || product.octaneNumber}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      {product.category && (
                        <span className="bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                          {product.category}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                        {product.subtitle || product.tagline}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {product.name || product.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>
                    <ul className="space-y-2">
                      {(product.features || []).map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-gray-700">
                          <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Stats */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12 text-center">
            <div className="text-6xl lg:text-8xl font-bold mb-4">
              {productsData.stats.value}
            </div>
            <div className="text-2xl font-bold uppercase tracking-widest border-t-2 border-white/30 pt-4">
              {productsData.stats.label}
            </div>
          </div>
        </section>

        {/* Additional Products */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {productsData.additional.heading}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {productsData.additional.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {productsData.additionalProducts.map((product, index) => (
                <div
                  key={product._id || product._key || index}
                  className="bg-gray-50 overflow-hidden hover:bg-primary hover:text-white transition-colors group"
                >
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.imageAlt || product.name || product.title}
                      className="h-40 w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-white/20">
                      <svg className="w-6 h-6 text-primary group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {product.icon === 'anchor' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                        {product.icon === 'leaf' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                        {product.icon === 'truck' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />}
                        {product.icon === 'droplet' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />}
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{product.name || product.title}</h3>
                    <p className="text-sm text-gray-600 group-hover:text-white/90">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Promise */}
        <section className="py-16 lg:py-24 bg-sand">
          <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" style={{ color: data.servicePromiseHeadingColor, fontSize: data.servicePromiseHeadingSize }}>
                  {productsData.servicePromise.heading}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8" style={{ color: data.servicePromiseDescriptionColor, fontSize: data.servicePromiseDescriptionSize }}>
                  {productsData.servicePromise.description}
                </p>
                <div className="space-y-4">
                  {productsData.servicePromise.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={productsData.servicePromise.imageUrl}
                  alt={productsData.servicePromise.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <CTABanner data={settings} />
      
    </>
  )
}
