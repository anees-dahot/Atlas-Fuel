"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Users, GraduationCap, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function PeopleSection() {
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
    <section ref={sectionRef} className="py-20 lg:py-32 bg-muted/30" id="people">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`flex items-center gap-4 mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
            Driven by People, Fueled by Purpose
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 uppercase tracking-tight font-[family-name:var(--font-heading)] transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Our People
            </h2>
            
            <p
              className={`text-lg text-muted-foreground leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Atlas Fuel&apos;s team is dedicated to delivering excellence, combining expertise with a deep 
              understanding of the mining industry&apos;s needs. Our people prioritize reliability, safety, 
              and customer satisfaction, ensuring seamless service at every step. With a commitment to 
              innovation and collaboration, our team helps mining operations achieve efficiency and success.
            </p>
            
            <Link
              href="#careers"
              className={`group inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:gap-4 transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              Read More
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right - Careers Card */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/mining-site.jpg"
                  alt="Atlas Fuel Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-bold uppercase tracking-wider rounded-full">
                    Careers
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)] uppercase">
                  Work With Us
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  50+ Talent Rising reflects Atlas Fuel&apos;s commitment to shaping future professionals. 
                  Each year, we proudly train 50+ members with the skills and confidence to build 
                  lasting careers in Australia&apos;s thriving fuel industry.
                </p>
                
                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-muted/50 rounded-xl">
                    <Users className="w-6 h-6 text-primary mx-auto mb-1" />
                    <div className="text-lg font-bold text-foreground font-[family-name:var(--font-heading)]">300+</div>
                    <div className="text-xs text-muted-foreground">Jobs</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-primary mx-auto mb-1" />
                    <div className="text-lg font-bold text-foreground font-[family-name:var(--font-heading)]">50+</div>
                    <div className="text-xs text-muted-foreground">Trainees</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-xl">
                    <Heart className="w-6 h-6 text-primary mx-auto mb-1" />
                    <div className="text-lg font-bold text-foreground font-[family-name:var(--font-heading)]">5+</div>
                    <div className="text-xs text-muted-foreground">Seniors</div>
                  </div>
                </div>
                
                <Link
                  href="#careers"
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-bold uppercase tracking-wide rounded-lg hover:bg-primary/90 transition-all duration-300"
                >
                  View Opportunities
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
