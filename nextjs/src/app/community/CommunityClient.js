'use client'
import { stegaClean } from '@sanity/client/stega'
import Link from 'next/link'
import CmsImage from '@/components/common/CmsImage'
import CTABanner from '@/components/shared/CTABanner'
import PageHero from '@/components/shared/PageHero'

const initiativeIcons = {
  heart: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 00-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 00-.1-7.8z" />
    </svg>
  ),
  handshake: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M8 11l3-3a2 2 0 013 0l2 2" />
      <path d="M3 8l4-3 4 3M21 8l-4-3-3 2" />
      <path d="M6 12l5 5a2 2 0 003 0l4-4" />
      <path d="M4 10l-2 2 5 5 2-2M20 10l2 2-5 5-2-2" />
    </svg>
  ),
  support: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  graduation: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
      <path d="M2 10l10-5 10 5-10 5-10-5z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5M22 10v6" />
    </svg>
  ),
}

const cleanValue = (value) =>
  typeof value === 'string' ? stegaClean(value) : value

const cleanLink = (value) => cleanValue(value) || ''

const colorMap = {
  'text-gray-900': 'rgb(var(--cms-gray-900-rgb))',
  'text-primary': 'var(--cms-primary)',
  'text-white': 'var(--cms-background)',
  'text-gray-600': 'rgb(var(--cms-gray-600-rgb))',
  '#111827': 'rgb(var(--cms-gray-900-rgb))',
  '#000000': 'var(--cms-text)',
  '#2db234': 'var(--cms-primary)',
  '#10b981': 'var(--cms-primary)',
  '#ffffff': 'var(--cms-background)',
  '#4b5563': 'rgb(var(--cms-gray-600-rgb))',
}

const sizeMap = {
  '1': '12px',
  '2': '16px',
  '3': '20px',
  '4': '24px',
  '5': '32px',
  '6': '48px',
  '7': '70px',
}

const cmsTextStyle = (data, field) => {
  const style = {}
  const color = cleanValue(data?.[`${field}Color`])
  const size = cleanValue(data?.[`${field}Size`])
  const borderColor = cleanValue(data?.[`${field}BorderColor`])
  const borderWidth = cleanValue(data?.[`${field}BorderWidth`])
  const shadow = cleanValue(data?.[`${field}ShadowColor`])

  if (color) style.color = colorMap[color] ?? color
  if (size) style.fontSize = sizeMap[size] ?? size
  if (data?.[`${field}BorderEnabled`]) {
    style.WebkitTextStroke = `${borderWidth || '1px'} ${colorMap[borderColor] ?? borderColor ?? 'currentColor'}`
  }
  if (shadow) style.textShadow = `0 2px 4px ${shadow}`

  return style
}

export default function CommunityClient({ data, siteSettings }) {
  const hero = {
    subtitle: data.heroSubtitle,
    subtitleStyle: cmsTextStyle(data, 'heroSubtitle'),
    title: data.heroTitle,
    titleStyle: cmsTextStyle(data, 'heroTitle'),
    description: data.heroDescription,
    descriptionStyle: cmsTextStyle(data, 'heroDescription'),
    image: data.heroImage ?? data.heroImageUrl,
    imageAlt: data.heroImageAlt ?? data.heroImageUrlAlt ?? data.heroTitle,
  }

  const initiatives = {
    heading: data.initiativesHeading,
    initiatives: data.initiatives,
  }

  const impact = {
    heading: data.impactHeading,
    stats: data.stats,
  }

  const story = {
    heading: data.storyHeading,
    content: data.storyContent,
    image: data.storyImage ?? data.storyImageUrl,
    imageAlt: data.storyImageAlt ?? data.storyImageUrlAlt ?? data.storyHeading,
  }

  return (
    <>
      <main>
        <PageHero
          eyebrow={hero.subtitle}
          title={hero.title}
          description={hero.description}
          backgroundImage={hero.image}
          backgroundAlt={hero.imageAlt}
          eyebrowStyle={hero.subtitleStyle}
          titleStyle={hero.titleStyle}
          descriptionStyle={hero.descriptionStyle}
        />
        
        {/* Initiatives Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
              <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.initiativesEyebrow}</span>
            </div>
            <h2 
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-12 text-center"
              style={cmsTextStyle(data, 'initiativesHeading')}
            >
              {initiatives.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {initiatives.initiatives.map((initiative, index) => (
                <div key={initiative._key || initiative.title || index} className="bg-gray-50 p-6 text-center hover:shadow-lg transition-shadow">
                  {initiative.image || initiative.imageUrl ? (
                    <div className="relative w-16 h-16 mx-auto mb-4 overflow-hidden">
                      <CmsImage
                        value={initiative.image ?? initiative.imageUrl}
                        alt={initiative.imageAlt ?? initiative.alt ?? initiative.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  ) : initiative.icon ? (
                    <div className="w-16 h-16 bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary">
                        {initiativeIcons[cleanValue(initiative.icon)] ?? initiativeIcons.support}
                      </span>
                    </div>
                  ) : null}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{initiative.title}</h3>
                  <p className="text-gray-600">{initiative.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gender Equality */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                  <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.genderEqualityEyebrow}</span>
                </div>
                <h2 
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6"
                  style={cmsTextStyle(data, 'genderEqualityHeading')}
                >
                  {data.genderEqualityHeading}
                </h2>
                <p 
                  className="text-gray-600 text-lg leading-relaxed mb-4"
                  style={cmsTextStyle(data, 'genderEqualityDescription')}
                >
                  {data.genderEqualityDescription}
                </p>
              </div>
              <div className="relative h-[400px] overflow-hidden">
                <CmsImage
                  value={data.genderEqualityImage ?? data.genderEqualityImageUrl}
                  alt={data.genderEqualityImageAlt ?? data.genderEqualityImageUrlAlt ?? data.genderEqualityHeading}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 lg:py-24 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight mb-12 text-center"
              style={cmsTextStyle(data, 'impactHeading')}
            >
              {impact.heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impact.stats.map((stat, index) => (
                <div key={stat._key || stat.label || index} className="text-center">
                  <div className="text-5xl lg:text-6xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm opacity-80">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supporting Locals */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] overflow-hidden">
                <CmsImage
                  value={data.supportingLocalsImage ?? data.supportingLocalsImageUrl}
                  alt={data.supportingLocalsImageAlt ?? data.supportingLocalsImageUrlAlt ?? data.supportingLocalsHeading}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                  <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.supportingLocalsEyebrow}</span>
                </div>
                <h2 
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6"
                  style={cmsTextStyle(data, 'supportingLocalsHeading')}
                >
                  {data.supportingLocalsHeading}
                </h2>
                <p 
                  className="text-gray-600 text-lg leading-relaxed mb-6"
                  style={cmsTextStyle(data, 'supportingLocalsDescription')}
                >
                  {data.supportingLocalsDescription}
                </p>
                {data.supportingLocalsCtaText && cleanLink(data.supportingLocalsCtaLink) && (
                  <Link href={cleanLink(data.supportingLocalsCtaLink)} className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold text-[13px] uppercase tracking-[0.1em] border-2 border-primary hover:bg-primary-dark transition-all duration-300">
                    {data.supportingLocalsCtaText}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Regional Communities */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-0.5 bg-primary flex-shrink-0" />
                <span className="text-primary text-[11px] font-bold uppercase tracking-[0.2em]">{data.regionalEyebrow}</span>
              </div>
              <h2 
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-4"
                style={cmsTextStyle(data, 'regionalHeading')}
              >
                {data.regionalHeading}
              </h2>
              <p className="text-gray-900 font-bold text-xl mb-4">{data.regionalSubtitle}</p>
              <p 
                className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed"
                style={cmsTextStyle(data, 'regionalDescription')}
              >
                {data.regionalDescription}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.regionalImages.map((item, index) => (
                <div key={item._key || item.alt || index} className="relative h-64 overflow-hidden">
                  <CmsImage
                    value={item.image ?? item.imageUrl}
                    alt={item.alt ?? item.imageAlt ?? ''}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 uppercase tracking-wide leading-tight mb-6"
                  style={cmsTextStyle(data, 'storyHeading')}
                >
                  {story.heading}
                </h2>
                <p 
                  className="text-gray-600 text-lg leading-relaxed mb-6"
                  style={cmsTextStyle(data, 'storyContent')}
                >
                  {story.content}
                </p>
              </div>
              <div className="relative h-[400px] bg-gray-100 overflow-hidden">
                <CmsImage
                  value={story.image}
                  alt={story.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <CTABanner data={siteSettings} />
      </main>
    </>
  )
}
