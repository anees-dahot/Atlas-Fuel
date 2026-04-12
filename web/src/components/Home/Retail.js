import React, { useEffect, useRef, useState } from "react";
import { Link } from "gatsby";
import { cn } from "../../lib/utils";

const products = [
  {
    name: "Donuts",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.5 6.5a4.5 4.5 0 0 0-7 0C6.5 8.5 6 12 6 12s.5 3.5 2.5 5.5a4.5 4.5 0 0 0 7 0c2-2 2.5-5.5 2.5-5.5s-.5-3.5-2.5-5.5z" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    name: "Hot Food",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    name: "Wraps",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M4 12c0-4 4-8 8-8s8 4 8 8" />
        <path d="M4 12c0 4 4 8 8 8s8-4 8-8" />
        <path d="M12 4c-4 0-8 4-8 8s4 8 8 8" />
      </svg>
    ),
  },
  {
    name: "Coffee",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" x2="6" y1="2" y2="4" />
        <line x1="10" x2="10" y1="2" y2="4" />
        <line x1="14" x2="14" y1="2" y2="4" />
      </svg>
    ),
  },
  {
    name: "Confectionery",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M20.66 7A10 10 0 0 0 14 2.05V10h8.55" />
      </svg>
    ),
  },
  {
    name: "Drinks",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2h8l-2 18H10L8 2z" />
        <path d="M12 2v6" />
        <path d="M8 2h8" />
      </svg>
    ),
  },
];

const categoryPills = ["Donuts", "Sandwiches", "Hot Food", "Cold Drinks"];

const features = [
  "World-class facilities",
  "Competitive pricing",
  "Premium products",
  "Freshly made food",
  "Clean restrooms",
  "Friendly service",
];

export default function Retail() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
            className={cn(
              "flex items-center justify-center gap-4 mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <span className="text-primary text-sm font-bold uppercase tracking-[0.2em]">
              Your Local Servos - Supporting Locals Everyday!
            </span>
          </div>
          <h2
            className={cn(
              "font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Discover Our Retail Stores
          </h2>
          <p
            className={cn(
              "mt-6 text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            At Atlas Fuel, our retail stores deliver more than just fuel — they provide a complete,
            customer-focused experience built around quality, convenience, and value. Each location
            is designed with world-class facilities, competitive pricing, and a wide range of premium
            products that ensure customers always get the best.
          </p>
        </div>

        {/* Product Pills */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-3 mb-16 transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {products.map((product, index) => (
            <div
              key={product.name}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 bg-gray-50 rounded-full border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer group",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              )}
              style={{ transitionDelay: `${400 + index * 80}ms` }}
            >
              <span className="text-primary">{product.icon}</span>
              <span className="text-sm font-semibold text-foreground">{product.name}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image with overlay */}
          <div
            className={cn(
              "relative transition-all duration-700 delay-400",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/fuel-depot.jpg"
                alt="Atlas Fuel Retail Store"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Krunch & Munch badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-white rounded-xl px-5 py-3 shadow-lg">
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    What&apos;s Inside Our Stores?
                  </div>
                  <div className="text-xl font-bold text-primary font-heading">
                    Krunch &amp; Munch Cafe
                  </div>
                </div>
              </div>

              {/* Quick categories */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                {categoryPills.map((item, i) => (
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
            className={cn(
              "transition-all duration-700 delay-500",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}
          >
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Atlas Fuel service stations offer more than just fuel — they provide convenience,
              comfort, and value. Inside, you&apos;ll find freshly stocked retail stores with essentials,
              snacks, and trusted brands. With clean facilities and friendly service, every visit
              is made easy and enjoyable.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-3 transition-all duration-500",
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}
                  style={{ transitionDelay: `${600 + index * 80}ms` }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-foreground text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="#locator"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold uppercase tracking-wide rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Find a Store
              </Link>
              <Link
                to="#about"
                className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground text-foreground font-bold uppercase tracking-wide rounded-lg hover:bg-foreground hover:text-white transition-all duration-300"
              >
                Read More
                <svg className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
