"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown, Play, Phone, Mail, Fuel, Truck, MapPin, Briefcase, DollarSign } from "lucide-react";

const quickLinks = [
  { name: "New Bulk Enquiry", href: "#quote", icon: Fuel },
  { name: "Call Head Office", href: "tel:+61863777644", icon: Phone },
  { name: "Fuel Transportation", href: "#transport", icon: Truck },
  { name: "Atlas Fuel Pricing", href: "#pricing", icon: DollarSign },
  { name: "Fuel Station Enquiry", href: "#stations", icon: MapPin },
  { name: "Work With Us", href: "#careers", icon: Briefcase },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate quick links highlight
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % quickLinks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-trucks.jpg"
          alt="Atlas Fuel tanker trucks in Australian outback"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlays for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Animated particles/dots (subtle) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-64">
        <div className="max-w-3xl">
          {/* Eyebrow with animated line */}
          <div
            className={`flex items-center gap-4 transform transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative h-0.5 w-16 bg-primary overflow-hidden">
              <div className="absolute inset-0 bg-white/50 animate-[shimmer_2s_infinite]" 
                style={{ 
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                  animation: 'shimmer 2s infinite'
                }} 
              />
            </div>
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em]">
              On-Site Fuel Solutions
            </span>
          </div>

          {/* Main Heading with staggered animation */}
          <h1 className="mt-8 space-y-2">
            {["Powering", "Australia's", "Future"].map((word, index) => (
              <span
                key={word}
                className={`block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] uppercase tracking-tight font-[family-name:var(--font-heading)] transform transition-all duration-700 ${
                  index === 1 ? "text-primary" : "text-white"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p
            className={`mt-8 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed transform transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "850ms" }}
          >
            Atlas Fuel Australia delivers reliable, efficient fuel solutions nationwide. 
            We cater to businesses of all sizes, ensuring quality and sustainability. 
            Trust us to fuel your success.
          </p>

          {/* CTA Buttons */}
          <div
            className={`mt-10 flex flex-wrap gap-4 transform transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1000ms" }}
          >
            <Link
              href="#quote"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              <span className="relative z-10">Contact Fuel Station</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Link>
            <Link
              href="#quote"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold uppercase tracking-wide rounded-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              New Bulk Fuel Enquiry
            </Link>
          </div>

          {/* Video link */}
          <div
            className={`mt-8 transform transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1150ms" }}
          >
            <button className="group flex items-center gap-4 text-white/80 hover:text-white transition-colors">
              <span className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-0 group-hover:opacity-100" style={{ animationDuration: '1.5s' }} />
              </span>
              <div className="text-left">
                <span className="block text-sm font-semibold uppercase tracking-wider">Watch our video</span>
                <span className="block text-xs text-white/60">Learn about the operation of Atlas Fuel Australia</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Links Bar - Positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Quick links */}
        <div className="max-w-7xl mx-auto px-6 pb-6">
          <div
            className={`transform transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1300ms" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSlide === index 
                      ? "bg-primary text-white" 
                      : "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:border-white text-white hover:text-foreground"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    activeSlide === index 
                      ? "bg-white/20" 
                      : "bg-primary/20 group-hover:bg-primary"
                  }`}>
                    <link.icon className={`w-4 h-4 transition-colors ${
                      activeSlide === index 
                        ? "text-white" 
                        : "text-primary group-hover:text-white"
                    }`} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide leading-tight">
                    {link.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="bg-white border-t border-border">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ArrowDown className="w-4 h-4 animate-bounce" />
                <span className="text-sm font-medium">Sectors We Cover</span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                {[
                  { value: "300+", label: "Jobs Connected" },
                  { value: "50+", label: "Talent Rising" },
                  { value: "100%", label: "Australian Owned" },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-primary rounded-full" />
                    <div>
                      <div className="text-lg font-bold text-foreground font-[family-name:var(--font-heading)]">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
