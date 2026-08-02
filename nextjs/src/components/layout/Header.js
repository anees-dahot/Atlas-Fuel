'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import TopRibbon from '@/components/common/TopRibbon'
import CmsImage from '@/components/common/CmsImage'

// ─── Default Nav data (fallback when Sanity data is not available) ────────────
const defaultNavItems = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    calloutHeading: 'Welcome',
    calloutCta: 'Explore',
    description: 'Atlas Fuel - Your trusted partner for reliable fuel solutions across Australia.',
    groups: [],
    featured: { label: 'Home', href: '/', image: '/images/hero-trucks.jpg' },
  },
  {
    id: 'about',
    label: 'About Us',
    href: '/about',
    calloutHeading: 'Our Story',
    calloutCta: 'Learn More',
    description: 'Atlas Fuel has been powering Australian industries since 2010. From our beginnings as a single fuel station to a nationwide network, our commitment to reliable fuel delivery has never wavered.',
    groups: [
      {
        heading: 'About Us',
        links: [
          { label: 'Who We Are', excerpt: '100% Australian owned and operated fuel company delivering excellence nationwide.', href: '/about', image: '/images/what-we-do-fuel-transportation.webp' },
          { label: 'Leadership', excerpt: 'Meet the team driving Atlas Fuel forward with vision and expertise.', href: '/about', image: '/images/hero-trucks.jpg' },
          { label: 'Vision & Purpose', excerpt: 'Our purpose is to provide reliable fuel solutions that power progress.', href: '/about', image: '/images/what-we-do-mining-civil.webp' },
          { label: 'Community', excerpt: 'Creating jobs and supporting local communities across Australia.', href: '/community', image: '/images/hero-trucks.jpg' },
          { label: 'Sustainability', excerpt: 'Committed to environmental responsibility in all our operations.', href: '/about', image: '/images/what-we-do-fuel-transportation.webp' },
          { label: 'Safety Standards', excerpt: 'ISO certified operations with zero compromise on safety.', href: '/about', image: '/images/what-we-do-mining-civil.webp' },
        ],
      },
    ],
    featured: { label: 'Our Story', href: '/about', image: '/images/hero-trucks.jpg' },
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    calloutHeading: 'Fuel Solutions',
    calloutCta: 'All Services',
    description: 'From mining to marine, agriculture to retail, we deliver comprehensive fuel solutions tailored to every industry\'s unique needs.',
    groups: [
      {
        heading: 'Industries',
        links: [
          { label: 'Mining Fuel', excerpt: 'Bulk diesel supply for mining operations with 24/7 delivery.', href: '/services/mining-fuel', image: '/images/what-we-do-mining-civil.webp' },
          { label: 'Marine Fuel', excerpt: 'Bunkering services for ports and marine vessels nationwide.', href: '/services/marine-fuel', image: '/images/hero-trucks.jpg' },
          { label: 'Agriculture Fuel', excerpt: 'Supporting farmers with timely fuel delivery for seasonal demands.', href: '/services/agriculture-fuel', image: '/images/what-we-do-fuel-transportation.webp' },
        ],
      },
      {
        heading: 'Solutions',
        links: [
          { label: 'Fuel Retailers', excerpt: 'Partner with us to operate world-class fuel stations.', href: '/services/fuel-retailers', image: '/images/hero-trucks.jpg' },
          { label: 'Onsite Bulk Diesel', excerpt: 'Direct-to-site fuel delivery with secure storage solutions.', href: '/services/onsite-bulk-diesel', image: '/images/what-we-do-mining-civil.webp' },
          { label: 'Local Fuel Distributors', excerpt: 'Join our network of trusted local fuel distributors.', href: '/services/local-fuel-distributors', image: '/images/what-we-do-fuel-transportation.webp' },
        ],
      },
    ],
    featured: { label: 'All Services', href: '/services', image: '/images/hero-trucks.jpg' },
  },
  {
    id: 'stations',
    label: 'Fuel Stations',
    href: '/fuel-stations',
    calloutHeading: 'Our Network',
    calloutCta: 'Find a Station',
    description: 'Locate your nearest Atlas Fuel station. We\'re building a network of modern, convenient fuel stations across Australia.',
    groups: [
      {
        heading: 'Our Stations',
        links: [
          { label: 'Store Locator', excerpt: 'Find your nearest Atlas Fuel station with real-time availability.', href: '/store-locator', image: '/images/hero-trucks.jpg' },
          { label: 'Station Services', excerpt: 'More than just fuel — discover our full range of services.', href: '/fuel-stations', image: '/images/what-we-do-fuel-transportation.webp' },
          { label: 'Franchise Opportunities', excerpt: 'Partner with us to own and operate an Atlas Fuel station.', href: '/franchising', image: '/images/what-we-do-mining-civil.webp' },
          { label: 'Station Enquiry', excerpt: 'Enquire about becoming an Atlas Fuel station partner.', href: '/fuel-station-enquiry', image: '/images/hero-trucks.jpg' },
          { label: 'Fuel Products', excerpt: 'Premium diesel, petrol, and specialty fuels for every need.', href: '/products', image: '/images/what-we-do-fuel-transportation.webp' },
          { label: 'Fuel Prices', excerpt: 'Check current fuel prices at our stations.', href: '/fuel-prices', image: '/images/what-we-do-mining-civil.webp' },
        ],
      },
    ],
    featured: { label: 'Find a Station', href: '/fuel-stations', image: '/images/hero-trucks.jpg' },
  },
  {
    id: 'fuel-transportation',
    label: 'Fuel Transportation',
    href: '/fuel-transportation',
    calloutHeading: 'Logistics & Transport',
    calloutCta: 'Our Fleet',
    description: 'Our modern fleet of certified tankers delivers fuel safely and efficiently to any location across Australia.',
    groups: [
      {
        heading: 'Our Services',
        links: [
          { label: 'Bulk Transport', excerpt: 'Large-scale fuel transport for industrial and commercial clients.', href: '/fuel-transportation', image: '/images/hero-trucks.jpg' },
          { label: 'Fleet Operations', excerpt: 'State-of-the-art logistics ensuring on-time delivery every time.', href: '/fuel-transportation', image: '/images/what-we-do-mining-civil.webp' },
          { label: 'Emergency Delivery', excerpt: '24/7 emergency fuel supply when you need it most.', href: '/fuel-transportation', image: '/images/what-we-do-fuel-transportation.webp' },
          { label: 'Mining Sites', excerpt: 'Reliable fuel delivery to remote mining operations.', href: '/services/mining-fuel', image: '/images/what-we-do-mining-civil.webp' },
          { label: 'Agriculture', excerpt: 'Seasonal fuel supply for farming operations.', href: '/services/agriculture-fuel', image: '/images/what-we-do-fuel-transportation.webp' },
          { label: 'Marine Ports', excerpt: 'Coastal and port fuel delivery services.', href: '/services/marine-fuel', image: '/images/hero-trucks.jpg' },
        ],
      },
    ],
    featured: { label: 'Our Fleet', href: '/fuel-transportation', image: '/images/hero-trucks.jpg' },
  },
  {
    id: 'careers',
    label: 'Careers',
    href: '/careers',
    calloutHeading: 'Get In Touch',
    calloutCta: 'Careers',
    description: 'Reach out to Atlas Fuel for all your fuel needs. Our team is ready to assist you with enquiries, quotes, and support.',
    groups: [],
    featured: { label: 'Careers', href: '/careers', image: '/images/hero-trucks.jpg' },
  },
]

// ─── Chevron ──────────────────────────────────────────────────────────────────
const ChevronRight = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

const withFallbackValues = (fallback, value) => ({
  ...fallback,
  ...Object.fromEntries(
    Object.entries(value || {}).filter(([, fieldValue]) =>
      fieldValue !== undefined && fieldValue !== null
    )
  ),
})

const normalizeNavItems = (items) => {
  if (!Array.isArray(items)) return defaultNavItems

  return items.map((item, itemIndex) => {
    const itemIdentity = (item.id || item.label || '').toLowerCase()
    const fallback =
      defaultNavItems.find((candidate) =>
        candidate.id.toLowerCase() === itemIdentity ||
        (itemIdentity === 'sectors' && candidate.id === 'services')
      ) ||
      defaultNavItems[itemIndex] ||
      {}

    const merged = withFallbackValues(fallback, item)
    const sourceGroups = Array.isArray(item.groups) ? item.groups : fallback.groups || []

    return {
      ...merged,
      href: merged.href?.toLowerCase() === '/sectors' ? '/services' : merged.href,
      featured: withFallbackValues(fallback.featured, item.featured),
      groups: sourceGroups.map((group, groupIndex) => {
        const fallbackGroup = fallback.groups?.[groupIndex] || {}
        const sourceLinks = Array.isArray(group.links) ? group.links : fallbackGroup.links || []

        return {
          ...withFallbackValues(fallbackGroup, group),
          links: sourceLinks.map((link, linkIndex) =>
            withFallbackValues(fallbackGroup.links?.[linkIndex], link)
          ),
        }
      }),
    }
  })
}

const getItemLinks = (item) => item.groups?.flatMap((group) => group?.links ?? []) ?? []

// ─── Mega Menu Panel (100% Bechtel Clone) ─────────────────────────────────────
function MegaMenu({ item, visible }) {
  const groups = (item.groups || []).filter((group) => group?.links?.length)

  if (groups.length === 0) return null

  const easing = 'cubic-bezier(0.22, 1, 0.36, 1)'
  const featuredImage =
    item.featured?.imageUrl ||
    (typeof item.featured?.image === 'string' ? item.featured.image : '') ||
    '/images/hero-trucks.jpg'

  return (
    <div
      className={cn(
        'hidden lg:block fixed left-0 right-0 z-[60] max-h-[calc(100vh-var(--header-height,110px))] origin-top overflow-y-auto bg-white shadow-[0_30px_90px_rgba(10,10,10,0.18)] transition-[opacity,transform] duration-500',
        visible
          ? 'pointer-events-auto opacity-100 translate-y-0'
          : 'pointer-events-none opacity-0 -translate-y-5'
      )}
      style={{ top: 'var(--header-height, 110px)', transitionTimingFunction: easing }}
    >
      {/* Top border accent */}
      <div
        className={cn('h-1 bg-primary w-full origin-left transition-transform duration-500', visible ? 'scale-x-100' : 'scale-x-0')}
        style={{ transitionTimingFunction: easing }}
      />

      {/* Main content container - exactly like Bechtel */}
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
        <div
          className={cn(
            'wp-block-bechtel-menu-layout-standard__inner flex gap-10 py-12 transition-[opacity,transform] duration-500',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
          style={{ transitionTimingFunction: easing, transitionDelay: visible ? '70ms' : '0ms' }}
        >
          
          {/* ── Left: Callout panel ── */}
          <div
            className={cn(
              'wp-block-bechtel-menu-callout w-[360px] flex-shrink-0 flex flex-col justify-between transition-[opacity,transform] duration-500',
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
            style={{ transitionTimingFunction: easing, transitionDelay: visible ? '120ms' : '0ms' }}
          >
            <div>
              {(item.calloutHeading || item.label) && (
                <h2 className="wp-block-bechtel-menu-callout__heading text-[2.25rem] font-semibold text-gray-900 leading-[1.1] mb-5">
                  {item.calloutHeading || item.label}
                </h2>
              )}
              {item.description && (
                <p className="wp-block-bechtel-menu-callout__copy text-gray-600 leading-[1.6] text-base mb-8">
                  {item.description}
                </p>
              )}
              {item.featured?.label && item.featured?.href && (
                <Link
                  href={item.featured.href}
                  className="group mb-6 flex items-center gap-4 border border-gray-200 bg-gray-50 p-3 transition-colors hover:border-primary"
                >
                  <span className="relative h-16 w-24 flex-shrink-0 overflow-hidden bg-gray-100">
                    <CmsImage
                      value={item.featured.image}
                      src={featuredImage}
                      alt={item.featured.imageAlt || item.featured.label}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-primary">
                    {item.featured.label}
                  </span>
                </Link>
              )}
            </div>
            {item.calloutCta && item.href && (
              <div className="wp-block-button is-style-arrow-right">
              <Link
                href={item.href || '#'}
                className="wp-block-button__link wp-element-button inline-flex items-center gap-3 px-6 py-3 bg-primary text-white text-sm font-semibold uppercase tracking-wider hover:bg-primary-dark transition-colors"
              >
                {item.calloutCta}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              </div>
            )}
          </div>

          {/* ── Right: Card grid layout ── */}
          <div className="wp-block-bechtel-menu-layout-links flex-1">
            <div className="space-y-8">
              {groups.map((group, groupIndex) => (
                <section key={group._key || group.heading || groupIndex}>
                  {group.heading && (
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-gray-500">
                      {group.heading}
                    </h3>
                  )}
                  <div className="grid grid-cols-3 gap-x-6 gap-y-8">
                    {group.links.map((link, linkIndex) => {
                      const imageSource =
                        link.imageUrl ||
                        (typeof link.image === 'string' ? link.image : '') ||
                        featuredImage
                      const readMoreText =
                        link.readMoreText ?? item.readMoreText ?? 'Read More'
                      const animationIndex =
                        groups
                          .slice(0, groupIndex)
                          .reduce((count, previous) => count + previous.links.length, 0) +
                        linkIndex

                      return (
                        <div
                          key={link._key || `${link.href}-${linkIndex}`}
                          className={cn(
                            'wp-block-bechtel-post-link transition-[opacity,transform] duration-500',
                            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                          )}
                          style={{
                            transitionTimingFunction: easing,
                            transitionDelay: visible ? `${180 + animationIndex * 40}ms` : '0ms',
                          }}
                        >
                          <article className="block-link block-link--vertical group">
                            <Link href={link.href || '#'} className="block">
                              <figure className="block-link__media block-link__media--vertical relative h-[169px] overflow-hidden bg-gray-100 mb-4">
                                <CmsImage
                                  value={link.image}
                                  src={imageSource}
                                  alt={link.imageAlt || link.label || ''}
                                  fill
                                  sizes="(min-width: 1024px) 240px, 100vw"
                                  className="block-link__image block-link__image--vertical object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </figure>
                              <div className="block-link__content block-link__content--vertical">
                                {link.label && (
                                  <h3 className="block-link__title block-link__title--vertical text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                    {link.label}
                                  </h3>
                                )}
                                {link.excerpt && (
                                  <p className="block-link__excerpt block-link__excerpt--vertical text-sm text-gray-600 leading-relaxed line-clamp-3">
                                    {link.excerpt}
                                  </p>
                                )}
                                {readMoreText && (
                                  <span className="block-link__link block-link__link--vertical inline-flex items-center gap-2 text-sm text-primary font-semibold mt-3 group-hover:gap-3 transition-all">
                                    {readMoreText}
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <line x1="5" y1="12" x2="19" y2="12"/>
                                      <polyline points="12 5 19 12 12 19"/>
                                    </svg>
                                  </span>
                                )}
                              </div>
                            </Link>
                          </article>
                        </div>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom shadow */}
      <div className="h-6 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
    </div>
  )
}

// ─── Main Header ──────────────────────────────────────────────────────────────
export default function Header({ navItems: propNavItems, siteSettings }) {
  const navItems = normalizeNavItems(propNavItems)

  // Button text and phone from siteSettings with fallbacks
  const phone = siteSettings?.phone ?? '+61 8 6377 7644'
  const callButtonText = siteSettings?.headerCallButtonText ?? 'Call Now'
  const quoteButtonText = siteSettings?.headerQuoteButtonText ?? 'Get a Quote'
  const mobileQuoteButtonText = siteSettings?.mobileMenuQuoteButtonText ?? 'Get a Quote'
  const quoteButtonLink = siteSettings?.headerQuoteButtonLink ?? '/contact'
  const mobileQuoteButtonLink = siteSettings?.mobileMenuQuoteButtonLink ?? quoteButtonLink

  const [isScrolled, setIsScrolled]       = useState(false)
  const [activeMenu, setActiveMenu]       = useState(null)
  const [isMobileOpen, setIsMobileOpen]   = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const [headerHeight, setHeaderHeight]   = useState(72)
  const [supportsHover, setSupportsHover] = useState(false)

  const headerRef  = useRef(null)
  const leaveTimer = useRef(null)

  // Track scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateHoverSupport = () => setSupportsHover(mediaQuery.matches)

    updateHoverSupport()
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateHoverSupport)
      return () => mediaQuery.removeEventListener('change', updateHoverSupport)
    }

    mediaQuery.addListener(updateHoverSupport)
    return () => mediaQuery.removeListener(updateHoverSupport)
  }, [])

  // Track header height for mega-menu positioning
  useEffect(() => {
    const update = () => {
      if (!headerRef.current) return

      // Get the actual bottom position of the header from viewport top
      const headerRect = headerRef.current.getBoundingClientRect()
      const headerBottom = headerRect.bottom

      setHeaderHeight(headerBottom)
      document.documentElement.style.setProperty('--header-height', `${headerBottom}px`)
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, { passive: true })

    // Update after a short delay to ensure ribbon animation completes
    const scrollTimer = setTimeout(update, 350)

    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update)
      clearTimeout(scrollTimer)
    }
  }, [isScrolled])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  useEffect(() => () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveMenu(null)
        setIsMobileOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const openMenu  = useCallback((id) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
    setActiveMenu(id)
  }, [])

  const closeMenu = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 120)
  }, [])

  const keepMenu  = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current)
  }, [])

  return (
    <>
      {/* ── Top Ribbon ── */}
      <TopRibbon siteSettings={siteSettings} />

      {/* ── Overlay when mega menu is open ── */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-slate-950/20 backdrop-blur-[1px] transition-opacity duration-300',
          activeMenu ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
        style={{ top: `${headerHeight}px` }}
        onMouseEnter={closeMenu}
      />

      {/* ── Header ── */}
      <header
        ref={headerRef}
        className={cn(
          'sticky top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300',
          isScrolled ? 'shadow-md border-b border-gray-200' : 'border-b border-gray-100'
        )}
      >
        <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
          <div className={cn('flex items-center justify-between gap-8 transition-all duration-300', isScrolled ? 'h-16' : 'h-[72px]')}>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 z-10" onClick={() => setActiveMenu(null)}>
              <CmsImage
                value={siteSettings?.logo}
                src={siteSettings?.logoUrl}
                fallbackSrc="/images/logo.png"
                alt={siteSettings?.logoAlt ?? siteSettings?.logo?.alt ?? siteSettings?.siteName ?? 'Atlas Fuel'}
                width={180}
                height={72}
                className={cn('w-auto transition-all duration-300', isScrolled ? 'h-9' : 'h-11')}
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center h-full">
              {navItems.map((item) => {
                const hasMenuItems = getItemLinks(item).length > 0
                const hoverEnabled = hasMenuItems && supportsHover
                
                return (
                  <div
                    key={item.id}
                    className="relative h-full flex items-center"
                    onMouseEnter={hoverEnabled ? () => openMenu(item.id) : undefined}
                    onMouseLeave={hoverEnabled ? closeMenu : undefined}
                  >
                  <Link
                    href={item.href || '#'}
                    onClick={() => setActiveMenu(null)}
                    className={cn(
                      'relative px-4 h-full flex items-center text-[13px] font-bold uppercase tracking-[0.08em] transition-colors duration-150 whitespace-nowrap',
                      activeMenu === item.id
                        ? 'text-primary'
                        : 'text-gray-800 hover:text-primary'
                    )}
                  >
                    {item.label}
                    {/* Active underline indicator */}
                    <span
                      className={cn(
                        'absolute bottom-0 left-4 right-4 h-[3px] bg-primary transition-all duration-200',
                        activeMenu === item.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    </Link>
                  </div>
                )
              })}

            </nav>

            {/* ── Right: Call Now + Get Quote Buttons ── */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              {/* Call Now Button (Green Outline) */}
              {phone && callButtonText && (
                <a
                  href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-primary text-primary text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  {callButtonText}
                </a>
              )}

              {/* Get a Quote Button (Solid Green) */}
              {quoteButtonText && quoteButtonLink && (
                <Link
                  href={quoteButtonLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-[12px] font-bold uppercase tracking-[0.1em] hover:bg-primary-dark transition-colors duration-200"
                >
                  {quoteButtonText}
                </Link>
              )}
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              className="lg:hidden p-2 -mr-2 text-gray-800"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-[18px] relative flex flex-col justify-between">
                <span className={cn('block w-full h-0.5 bg-current transition-all duration-300 origin-center', isMobileOpen && 'rotate-45 translate-y-2')} />
                <span className={cn('block w-full h-0.5 bg-current transition-all duration-200', isMobileOpen && 'opacity-0 scale-x-0')} />
                <span className={cn('block w-full h-0.5 bg-current transition-all duration-300 origin-center', isMobileOpen && '-rotate-45 -translate-y-2')} />
              </div>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu Drawer ── */}
        <div className={cn(
          'lg:hidden fixed inset-0 bg-white z-40 flex flex-col transition-all duration-300 ease-out',
          isMobileOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        )} style={{ top: `${headerHeight}px` }}>
          <div className="flex-1 overflow-y-auto">
            <nav className="divide-y divide-gray-100">
              {navItems.map((item) => {
                const menuLinks = getItemLinks(item)
                const hasMenuItems = menuLinks.length > 0

                return (
                  <div key={item.id}>
                    <div className="flex items-stretch">
                      <Link
                        href={item.href || '#'}
                        className="flex-1 px-6 py-4 text-left font-heading text-xl font-semibold uppercase tracking-wide text-gray-900"
                        onClick={() => {
                          setIsMobileOpen(false)
                          setMobileExpanded(null)
                        }}
                      >
                        {item.label}
                      </Link>

                      {hasMenuItems && (
                        <button
                          type="button"
                          className="px-6 text-gray-400 transition-colors hover:text-primary"
                          onClick={() => setMobileExpanded(mobileExpanded === item.id ? null : item.id)}
                          aria-label={`Toggle ${item.label} submenu`}
                          aria-expanded={mobileExpanded === item.id}
                        >
                          <svg
                            className={cn('w-5 h-5 transition-transform duration-200', mobileExpanded === item.id && 'rotate-180')}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="6 9 12 15 18 9"/>
                          </svg>
                        </button>
                      )}
                    </div>

                    {hasMenuItems && (
                      <div className={cn(
                        'overflow-hidden transition-all duration-300',
                        mobileExpanded === item.id ? 'max-h-[60vh] overflow-y-auto' : 'max-h-0'
                      )}>
                        <div className="bg-gray-50 px-6 pb-4 pt-2">
                          {(item.groups || []).map((group, groupIndex) => (
                            <div key={group._key || group.heading || groupIndex} className="mb-3 last:mb-0">
                              {group.heading && (
                                <p className="pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                                  {group.heading}
                                </p>
                              )}
                              {(group.links || []).map((link, linkIndex) => (
                                <Link
                                  key={link._key || `${link.href}-${linkIndex}`}
                                  href={link.href || '#'}
                                  className="flex items-center gap-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-primary transition-colors"
                                  onClick={() => {
                                    setIsMobileOpen(false)
                                    setMobileExpanded(null)
                                  }}
                                >
                                  <span className="w-1.5 h-1.5 bg-primary flex-shrink-0" />
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                          {item.featured?.label && item.featured?.href && (
                            <Link
                              href={item.featured.href}
                              className="mt-3 flex items-center gap-3 border-t border-gray-200 pt-4 text-sm font-bold text-primary"
                              onClick={() => {
                                setIsMobileOpen(false)
                                setMobileExpanded(null)
                              }}
                            >
                              <ChevronRight />
                              {item.featured.label}
                            </Link>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
          </div>

          {/* Mobile footer */}
          <div className="border-t border-gray-100 px-6 py-6 space-y-3 bg-white">
            {phone && (
              <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-gray-200 text-gray-800 font-bold text-sm uppercase tracking-wider hover:border-primary hover:text-primary transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6.87-6.87 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 2 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.904.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {phone}
              </a>
            )}
            {mobileQuoteButtonText && mobileQuoteButtonLink && (
              <Link
                href={mobileQuoteButtonLink}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-white font-bold text-sm uppercase tracking-wider hover:bg-primary-dark transition-colors"
                onClick={() => setIsMobileOpen(false)}
              >
                {mobileQuoteButtonText}
                <ChevronRight />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── Mega Menu Panels (rendered outside header for full-width) ── */}
      {navItems
        .filter(item => item.groups?.some(g => g.links?.length > 0))
        .map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => keepMenu()}
            onMouseLeave={closeMenu}
          >
            <MegaMenu item={item} visible={activeMenu === item.id} />
          </div>
        ))}
    </>
  )
}
