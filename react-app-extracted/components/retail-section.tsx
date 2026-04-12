"use client";

import { useEffect, useRef, useState } from "react";
import { Coffee, Sandwich, Cookie, CupSoda, Croissant, Flame, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const products = [
  { name: "Donuts", icon: Croissant },
  { name: "Hot Food", icon: Flame },
  { name: "Wraps", icon: Sandwich },
  { name: "Coffee", icon: Coffee },
  { name: "Confectionery", icon: Cookie },
  { name: "Drinks", icon: CupSoda },
];

export function RetailSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white" id="stores">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div
            className={`flex items-center justify-center gap-4 mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em]">
              Your Local Servos - Supporting Locals Everyday!
            </span>
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight font-[family-name:var(--font-heading)] transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Discover Our Retail Stores
          </h2>
          <p
            className={`mt-6 text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            At Atlas Fuel, our retail stores deliver more than just fuel — they provide a complete, 
            customer-focused experience built around quality, convenience, and value. Each location 
            is designed with world-class facilities, competitive pricing, and a wide range of premium 
            products that ensure customers always get the best.
          </p>
        </div>

        {/* Product Pills */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-16 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {products.map((product, index) => (
            <div
              key={product.name}
              className={`flex items-center gap-2 px-5 py-2.5 bg-muted/50 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer group ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              style={{ transitionDelay: `${400 + index * 80}ms` }}
            >
              <product.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">{product.name}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image with overlay */}
          <div
            className={`relative transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/fuel-depot.jpg"
                alt="Atlas Fuel Retail Store"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Krunch & Munch badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-white rounded-xl px-5 py-3 shadow-lg">
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">What&apos;s Inside Our Stores?</div>
                  <div className="text-xl font-bold text-primary font-[family-name:var(--font-heading)]">
                    Krunch & Munch Cafe
                  </div>
                </div>
              </div>
              
              {/* Quick categories */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                {["Donuts", "Sandwiches", "Hot Food", "Cold Drinks"].map((item, i) => (
                  <span 
                    key={item} 
                    className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-foreground"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div
            className={`transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Atlas Fuel service stations offer more than just fuel — they provide convenience, 
              comfort, and value. Inside, you&apos;ll find freshly stocked retail stores with essentials, 
              snacks, and trusted brands. With clean facilities and friendly service, every visit 
              is made easy and enjoyable.
            </p>
            
            {/* Features list */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                "World-class facilities",
                "Competitive pricing",
                "Premium products",
                "Freshly made food",
                "Clean restrooms",
                "Friendly service",
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${600 + index * 80}ms` }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="#locator"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold uppercase tracking-wide rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                <MapPin className="w-5 h-5" />
                Find a Store
              </Link>
              <Link
                href="#about"
                className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground text-foreground font-bold uppercase tracking-wide rounded-lg hover:bg-foreground hover:text-white transition-all duration-300"
              >
                Read More
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
