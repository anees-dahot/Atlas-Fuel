"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id="about" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Tagline */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-primary text-sm font-bold uppercase tracking-[0.3em]">
            Unrivalled. Unmatched. Unstoppable.
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight uppercase tracking-tight font-[family-name:var(--font-heading)]">
              About Us
            </h2>
            
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              <strong className="text-foreground">Unrivalled. Unmatched. Unstoppable.</strong>{" "}
              These three words capture the spirit of Atlas Fuel and the people who drive it 
              forward every day. We stand unrivalled in our commitment to quality, unmatched 
              in our ability to deliver reliable fuel solutions nationwide, and unstoppable 
              in our pursuit of growth, innovation, and excellence.
            </p>
            
            <p className="text-muted-foreground leading-relaxed mb-8">
              From our performance fleet to our world-class service stations, every step we 
              take reflects a relentless drive to set new standards in the fuel industry. 
              For our customers, our partners, and our communities, Atlas Fuel is more than 
              a brand — it&apos;s a promise of strength, progress, and a future powered without limits.
            </p>

            {/* Key points */}
            <div className="space-y-3 mb-8">
              {[
                "100% Australian owned and operated",
                "Nationwide fuel delivery network",
                "World-class service stations",
                "Commitment to safety and sustainability"
              ].map((point, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{point}</span>
                </div>
              ))}
            </div>

            <Link
              href="#story"
              className="group inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:gap-4 transition-all"
            >
              Read More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Image Grid */}
          <div
            className={`relative transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/fuel-depot.jpg"
                    alt="Atlas Fuel depot"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="bg-primary text-white p-6 rounded-2xl">
                  <div className="text-4xl font-bold mb-1 font-[family-name:var(--font-heading)]">2015</div>
                  <div className="text-sm text-white/80">Established</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-foreground text-white p-6 rounded-2xl">
                  <div className="text-4xl font-bold mb-1 font-[family-name:var(--font-heading)]">100M+</div>
                  <div className="text-sm text-white/70">Litres Delivered</div>
                </div>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/hero-trucks.jpg"
                    alt="Atlas Fuel Fleet"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
