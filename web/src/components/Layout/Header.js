import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import { cn } from '../../lib/utils'

const navigation = [
  {
    name: 'About Us',
    href: '/#about',
    submenu: [
      { name: 'Our Story', href: '/#about', description: 'Learn about our journey' },
      { name: 'Vision & Purpose 2030', href: '/#vision', description: 'Our roadmap to the future' },
      { name: 'Our People', href: '/#people', description: 'The team behind Atlas Fuel' },
      { name: 'Certifications', href: '/#certifications', description: 'Our quality standards' },
    ],
  },
  {
    name: 'Services',
    href: '/#sectors',
    submenu: [
      { name: 'On-Site Diesel', href: '/#onsite', description: 'Mobile fuel delivery' },
      { name: 'Fuel Transportation', href: '/#transport', description: 'Bulk fuel logistics' },
      { name: 'Fuel Stations', href: '/#stores', description: 'Retail fuel services' },
      { name: 'Bulk Fuel Supply', href: '/#bulk', description: 'Large-scale distribution' },
    ],
  },
  {
    name: 'Sectors',
    href: '/#sectors',
    submenu: [
      { name: 'Mining', href: '/#mining', description: 'Powering mining operations' },
      { name: 'Marine', href: '/#marine', description: 'Marine bunkering solutions' },
      { name: 'Agriculture', href: '/#agriculture', description: 'Farm fuel delivery' },
      { name: 'Civil Works', href: '/#civil', description: 'Construction site supply' },
    ],
  },
  { name: 'Store Locator', href: '/#stores' },
  { name: 'Community', href: '/#community' },
  { name: 'Careers', href: '/#careers' },
]

const ArrowIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    setIsLoaded(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const handleMouseEnter = (name) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveSubmenu(name)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveSubmenu(null), 100)
  }

  return (
    <>
      {/* Top Bar */}
      <div
        className={cn(
          'hidden lg:block bg-white border-b border-gray-200/50 transition-all duration-700 ease-out',
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center divide-x divide-gray-200">
              <a
                href="tel:+61863777644"
                className={cn(
                  'flex items-center gap-2 pr-4 text-sm text-gray-500 hover:text-primary transition-all duration-300',
                  isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                )}
                style={{ transitionDelay: '100ms' }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6.87-6.87 19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.904.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>+61 8 6377 7644</span>
              </a>
              <a
                href="mailto:info@atlasfuel.com.au"
                className={cn(
                  'flex items-center gap-2 px-4 text-sm text-gray-500 hover:text-primary transition-all duration-300',
                  isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                )}
                style={{ transitionDelay: '200ms' }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 6L2 7" />
                </svg>
                <span>info@atlasfuel.com.au</span>
              </a>
              <div
                className={cn(
                  'flex items-center gap-2 px-4 text-sm text-gray-500 transition-all duration-300',
                  isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                )}
                style={{ transitionDelay: '300ms' }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>1 Mandurah Rd, Kwinana WA 6167</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'flex items-center gap-2 text-sm text-gray-500 transition-all duration-300',
                  isLoaded ? 'opacity-100' : 'opacity-0'
                )}
                style={{ transitionDelay: '400ms' }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex items-center gap-2">
                {[
                  <svg key="fb" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
                  <svg key="ig" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
                  <svg key="li" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
                ].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className={cn(
                      'w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110',
                      isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    )}
                    style={{ transitionDelay: `${500 + i * 100}ms` }}
                  >
                    {React.cloneElement(icon, { className: 'w-3.5 h-3.5' })}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 left-0 right-0 z-50 transition-all duration-500 ease-out bg-white/95 backdrop-blur-sm',
          isScrolled && 'shadow-lg shadow-black/5',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className={cn(
                'flex items-center transition-all duration-700 hover:scale-105',
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              )}
              style={{ transitionDelay: '100ms' }}
            >
              <img src="/images/logo.png" alt="Atlas Fuel" className="h-14 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center">
              {navigation.map((item, index) => (
                <div
                  key={item.name}
                  className={cn(
                    'relative transition-all duration-500',
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                  )}
                  style={{ transitionDelay: `${200 + index * 80}ms` }}
                  onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={item.href}
                    className="group flex items-center gap-1.5 px-4 py-6 text-sm font-semibold text-black uppercase tracking-wide transition-colors duration-300 hover:text-primary relative"
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </span>
                    {item.submenu && <ArrowIcon />}
                  </Link>

                  {/* Mega Dropdown */}
                  {item.submenu && (
                    <div
                      className={cn(
                        'absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 z-50',
                        activeSubmenu === item.name
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      )}
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-200/50" />
                      <div className="relative bg-white rounded-xl shadow-2xl shadow-black/10 border border-gray-200/50 overflow-hidden min-w-[300px]">
                        <div className="h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />
                        <div className="p-2">
                          {item.submenu.map((sub, si) => (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              className={cn(
                                'group/item flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-primary/5 transition-all duration-300',
                                activeSubmenu === item.name
                                  ? 'opacity-100 translate-x-0'
                                  : 'opacity-0 -translate-x-4'
                              )}
                              style={{ transitionDelay: activeSubmenu === item.name ? `${si * 50}ms` : '0ms' }}
                            >
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover/item:bg-primary group-hover/item:scale-110 transition-all duration-300">
                                <svg className="w-4 h-4 text-primary group-hover/item:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <line x1="5" y1="12" x2="19" y2="12" />
                                  <polyline points="12 5 19 12 12 19" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-black group-hover/item:text-primary transition-colors">{sub.name}</div>
                                <div className="text-xs text-gray-500 mt-0.5">{sub.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div
              className={cn(
                'hidden lg:flex items-center gap-3 transition-all duration-700',
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              )}
              style={{ transitionDelay: '700ms' }}
            >
              <a
                href="tel:+61863777644"
                className="px-4 py-2.5 border-2 border-primary text-primary text-sm font-bold uppercase tracking-wide rounded-lg hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6.87-6.87 19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.904.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.906.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Call Now
              </a>
              <a
                href="/#contact"
                className="group relative px-6 py-2.5 bg-primary text-white text-sm font-bold uppercase tracking-wide rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  Get a Quote
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              className={cn('lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-all', isLoaded ? 'opacity-100' : 'opacity-0')}
              onClick={() => setIsMobileMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span className={cn('absolute left-0 w-6 h-0.5 bg-black transition-all duration-300', isMobileMenuOpen ? 'top-2.5 rotate-45' : 'top-0')} />
                <span className={cn('absolute left-0 top-2 w-6 h-0.5 bg-black transition-all duration-300', isMobileMenuOpen ? 'opacity-0 translate-x-3' : 'opacity-100')} />
                <span className={cn('absolute left-0 w-6 h-0.5 bg-black transition-all duration-300', isMobileMenuOpen ? 'top-2.5 -rotate-45' : 'top-4')} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-500',
            isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
          )}
        >
          <div className="px-6 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
            {navigation.map((item, i) => (
              <div key={item.name} className="border-b border-gray-200/50 last:border-0">
                <Link
                  to={item.href}
                  className="flex items-center justify-between py-4 text-black font-semibold uppercase tracking-wide hover:text-primary transition-colors"
                  onClick={() => !item.submenu && setIsMobileMenuOpen(false)}
                >
                  {item.name}
                  {item.submenu && <ArrowIcon />}
                </Link>
                {item.submenu && (
                  <div className="pb-4 space-y-1">
                    {item.submenu.map(sub => (
                      <Link
                        key={sub.name}
                        to={sub.href}
                        className="flex items-center gap-3 py-2 pl-4 text-sm text-gray-500 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-3">
              <a href="tel:+61863777644" className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-primary text-primary font-bold uppercase rounded-lg">
                Call Now
              </a>
              <Link to="/#contact" className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-white font-bold uppercase rounded-lg">
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
