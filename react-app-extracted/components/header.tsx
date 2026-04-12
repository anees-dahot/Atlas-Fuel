"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone, Mail, MapPin, ArrowRight, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "About Us",
    href: "#about",
    submenu: [
      { name: "Our Story", href: "#story", description: "Learn about our journey" },
      { name: "Vision & Purpose 2030", href: "#vision", description: "Our roadmap to the future" },
      { name: "Our People", href: "#people", description: "The team behind Atlas Fuel" },
      { name: "Certifications", href: "#certifications", description: "Our quality standards" },
    ],
  },
  {
    name: "Services",
    href: "#services",
    submenu: [
      { name: "On-Site Diesel", href: "#onsite", description: "Mobile fuel delivery" },
      { name: "Fuel Transportation", href: "#transport", description: "Bulk fuel logistics" },
      { name: "Fuel Stations", href: "#stations", description: "Retail fuel services" },
      { name: "Bulk Fuel Supply", href: "#bulk", description: "Large-scale distribution" },
    ],
  },
  {
    name: "Sectors",
    href: "#sectors",
    submenu: [
      { name: "Mining", href: "#mining", description: "Powering mining operations" },
      { name: "Marine", href: "#marine", description: "Marine bunkering solutions" },
      { name: "Agriculture", href: "#agriculture", description: "Farm fuel delivery" },
      { name: "Civil Works", href: "#civil", description: "Construction site supply" },
    ],
  },
  {
    name: "Store Locator",
    href: "#stores",
  },
  {
    name: "Community",
    href: "#community",
  },
  {
    name: "Careers",
    href: "#careers",
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveSubmenu(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveSubmenu(null), 100);
  };

  return (
    <>
      {/* Animated Top Bar - Light Theme */}
      <div 
        className={cn(
          "hidden lg:block bg-white border-b border-border/50 transition-all duration-700 ease-out",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-10">
            {/* Left side - Contact info with staggered animation */}
            <div className="flex items-center divide-x divide-border">
              <a
                href="tel:+61863777644"
                className={cn(
                  "flex items-center gap-2 pr-4 text-sm text-muted-foreground hover:text-primary transition-all duration-300",
                  isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: "100ms" }}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+61 8 6377 7644</span>
              </a>
              <a
                href="mailto:info@atlasfuel.com.au"
                className={cn(
                  "flex items-center gap-2 px-4 text-sm text-muted-foreground hover:text-primary transition-all duration-300",
                  isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: "200ms" }}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>info@atlasfuel.com.au</span>
              </a>
              <div
                className={cn(
                  "flex items-center gap-2 px-4 text-sm text-muted-foreground transition-all duration-300",
                  isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: "300ms" }}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>1 Mandurah Rd, Kwinana WA 6167</span>
              </div>
            </div>
            
            {/* Right side - Social & Hours */}
            <div className="flex items-center gap-4">
              <div 
                className={cn(
                  "flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300",
                  isLoaded ? "opacity-100" : "opacity-0"
                )}
                style={{ transitionDelay: "400ms" }}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>24/7 Support</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className={cn(
                      "w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110",
                      isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-50"
                    )}
                    style={{ transitionDelay: `${500 + i * 100}ms` }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Light Theme */}
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isScrolled
            ? "bg-white shadow-lg shadow-black/5"
            : "bg-white/95 backdrop-blur-sm",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo with animation */}
            <Link 
              href="/" 
              className={cn(
                "flex items-center transition-all duration-700 hover:scale-105",
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              )}
              style={{ transitionDelay: "100ms" }}
            >
              <Image
                src="/images/logo.png"
                alt="Atlas Fuel Logo"
                width={180}
                height={60}
                className="h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation with staggered animation */}
            <nav className="hidden lg:flex items-center">
              {navigation.map((item, index) => (
                <div
                  key={item.name}
                  className={cn(
                    "relative transition-all duration-500",
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  )}
                  style={{ transitionDelay: `${200 + index * 80}ms` }}
                  onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="group flex items-center gap-1.5 px-4 py-6 text-sm font-semibold text-foreground uppercase tracking-wide transition-colors duration-300 hover:text-primary relative"
                  >
                    <span className="relative">
                      {item.name}
                      {/* Animated underline */}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </span>
                    {item.submenu && (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-all duration-300 group-hover:text-primary",
                          activeSubmenu === item.name ? "rotate-180 text-primary" : ""
                        )}
                      />
                    )}
                  </Link>

                  {/* Enhanced Mega Dropdown */}
                  {item.submenu && (
                    <div
                      className={cn(
                        "absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300",
                        activeSubmenu === item.name
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      )}
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Arrow */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-border/50" />
                      
                      <div className="relative bg-white rounded-xl shadow-2xl shadow-black/10 border border-border/50 overflow-hidden min-w-[300px]">
                        {/* Green accent bar at top */}
                        <div className="h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />
                        
                        <div className="p-2">
                          {item.submenu.map((subitem, subIndex) => (
                            <Link
                              key={subitem.name}
                              href={subitem.href}
                              className={cn(
                                "group/item flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-primary/5 transition-all duration-300",
                                activeSubmenu === item.name 
                                  ? "opacity-100 translate-x-0" 
                                  : "opacity-0 -translate-x-4"
                              )}
                              style={{ 
                                transitionDelay: activeSubmenu === item.name ? `${subIndex * 50}ms` : "0ms" 
                              }}
                            >
                              {/* Icon circle */}
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover/item:bg-primary group-hover/item:scale-110 transition-all duration-300">
                                <ArrowRight className="w-4 h-4 text-primary group-hover/item:text-white transition-colors" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-foreground group-hover/item:text-primary transition-colors">
                                  {subitem.name}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {subitem.description}
                                </div>
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

            {/* CTA Buttons with animation */}
            <div 
              className={cn(
                "hidden lg:flex items-center gap-3 transition-all duration-700",
                isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              )}
              style={{ transitionDelay: "700ms" }}
            >
              <Link
                href="tel:+61863777644"
                className="group px-4 py-2.5 border-2 border-primary text-primary text-sm font-bold uppercase tracking-wide rounded-lg hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </Link>
              <Link
                href="#quote"
                className="group relative px-6 py-2.5 bg-primary text-white text-sm font-bold uppercase tracking-wide rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  Get a Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "lg:hidden p-2 rounded-lg hover:bg-muted transition-all duration-300",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span 
                  className={cn(
                    "absolute left-0 w-6 h-0.5 bg-foreground transition-all duration-300 ease-out",
                    isMobileMenuOpen ? "top-2.5 rotate-45" : "top-0"
                  )}
                />
                <span 
                  className={cn(
                    "absolute left-0 top-2 w-6 h-0.5 bg-foreground transition-all duration-300 ease-out",
                    isMobileMenuOpen ? "opacity-0 translate-x-3" : "opacity-100"
                  )}
                />
                <span 
                  className={cn(
                    "absolute left-0 w-6 h-0.5 bg-foreground transition-all duration-300 ease-out",
                    isMobileMenuOpen ? "top-2.5 -rotate-45" : "top-4"
                  )}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Light Theme */}
        <div
          className={cn(
            "lg:hidden bg-white border-t border-border overflow-hidden transition-all duration-500 ease-out",
            isMobileMenuOpen ? "max-h-[calc(100vh-5rem)]" : "max-h-0"
          )}
        >
          <div className="px-6 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
            {navigation.map((item, index) => (
              <div 
                key={item.name}
                className={cn(
                  "border-b border-border/50 last:border-0 transition-all duration-300",
                  isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-4 text-foreground font-semibold uppercase tracking-wide hover:text-primary transition-colors"
                  onClick={() => !item.submenu && setIsMobileMenuOpen(false)}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </Link>
                {item.submenu && (
                  <div className="pb-4 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="flex items-center gap-3 py-2 pl-4 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile CTAs */}
            <div 
              className={cn(
                "pt-4 space-y-3 transition-all duration-300",
                isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: isMobileMenuOpen ? "400ms" : "0ms" }}
            >
              <a
                href="tel:+61863777644"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-primary text-primary font-bold uppercase tracking-wide rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <Link
                href="#quote"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-white font-bold uppercase tracking-wide rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
