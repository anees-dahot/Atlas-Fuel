"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";

const footerLinks = {
  quickLinks: [
    { name: "About Us", href: "#about" },
    { name: "Career", href: "#careers" },
    { name: "Contact Us", href: "#contact" },
  ],
  services: [
    { name: "Onsite - Fuel", href: "#onsite" },
    { name: "Fuel Transportation", href: "#transport" },
    { name: "Retail Sector", href: "#retail" },
  ],
  franchising: [
    { name: "About Franchising", href: "#franchising" },
    { name: "Franchising Opportunities", href: "#opportunities" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      {/* CTA Banner */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-heading)] uppercase">
                Work With Us
              </h3>
              <p className="text-white/80 mt-1">
                Join Atlas Fuel and build a rewarding career powering growth across Australia.
              </p>
            </div>
            <Link
              href="#careers"
              className="group flex items-center gap-2 px-6 py-3 bg-white text-primary font-bold uppercase tracking-wide rounded-lg hover:bg-white/90 transition-all duration-300"
            >
              Careers at Atlas Fuel
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Image 
              src="/images/logo.png" 
              alt="Atlas Fuel Logo" 
              width={180}
              height={60}
              className="h-14 w-auto brightness-0 invert mb-6"
            />
            <p className="text-white/60 mb-6 max-w-sm leading-relaxed">
              Australia&apos;s trusted fuel partner. Delivering reliable, efficient
              fuel solutions nationwide since 2015.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+61863777644"
                className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                +61 8 6377 7644
              </a>
              <a
                href="mailto:info@atlasfuel.com.au"
                className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                info@atlasfuel.com.au
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-5 h-5 flex-shrink-0 text-primary" />
                1 Mandurah Rd, Kwinana WA 6167
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wide">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Franchising */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wide">Franchising</h4>
            <ul className="space-y-3">
              {footerLinks.franchising.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Media */}
            <h4 className="font-bold text-white mt-8 mb-4 uppercase tracking-wide">Social Media</h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              © 2015 ATLAS FUEL AUSTRALIA PTY LTD. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <Link href="#privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
