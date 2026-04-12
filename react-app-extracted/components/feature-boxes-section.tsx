"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Truck, Briefcase } from "lucide-react";

const features = [
  {
    eyebrow: "Services",
    title: "Atlas Store Locator",
    description: "Our commitment to superior service sets industry standards, transforming logistics to enhance operations and gain a competitive edge for our customers.",
    image: "/images/fuel-depot.jpg",
    href: "#locator",
    icon: MapPin,
    subtitle: "Quickly find your nearest local Atlas Fuel station and experience world-class service wherever you are.",
  },
  {
    eyebrow: "Services",
    title: "Atlas Performance Fleet",
    description: "Our commitment to superior service sets industry standards, transforming logistics to enhance operations and gain a competitive edge for our customers.",
    image: "/images/hero-trucks.jpg",
    href: "#fleet",
    icon: Truck,
    subtitle: "Discover our high-performance fleet engineered for speed, strength, and reliable nationwide fuel delivery.",
  },
  {
    eyebrow: "Careers",
    title: "Work With Us",
    description: "Join Atlas Fuel and build a rewarding career powering growth across Australia every single day.",
    image: "/images/mining-site.jpg",
    href: "#careers",
    icon: Briefcase,
    subtitle: "Join Atlas Fuel and build a rewarding career powering growth across Australia every single day.",
  },
];

export function FeatureBoxesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              href={feature.href}
              className={`group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Eyebrow */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                    {feature.eyebrow}
                  </span>
                </div>
                
                {/* Icon */}
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors font-[family-name:var(--font-heading)] uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {feature.subtitle}
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wide">
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
              
              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-2xl transition-colors duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
