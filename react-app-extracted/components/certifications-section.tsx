"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Award, Leaf, HardHat, Truck } from "lucide-react";

const certifications = [
  {
    name: "WAHVA",
    title: "Western Australian Heavy Vehicle",
    description: "Accreditation ensuring every vehicle meets strict roadworthiness and safety benchmarks.",
    icon: Truck,
  },
  {
    name: "ISO 9001",
    title: "Quality Management Systems",
    description: "International standard for quality management ensuring consistent service delivery.",
    icon: Award,
  },
  {
    name: "ISO 14001",
    title: "Environmental Management Systems",
    description: "Environmental management certification demonstrating our commitment to sustainability.",
    icon: Leaf,
  },
  {
    name: "ISO 45001",
    title: "Occupational Health & Safety",
    description: "Workplace health and safety management ensuring employee and customer wellbeing.",
    icon: HardHat,
  },
];

export function CertificationsSection() {
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
    <section ref={sectionRef} className="py-20 lg:py-32 bg-muted/30" id="certifications">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div>
            <div
              className={`flex items-center gap-4 mb-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="w-12 h-0.5 bg-primary" />
              <span className="text-primary text-sm font-bold uppercase tracking-widest">
                Our Certifications
              </span>
            </div>
            
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight font-[family-name:var(--font-heading)] mb-6 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Certified for Excellence, Driven by Compliance
            </h2>
            
            <p
              className={`text-lg text-muted-foreground leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              At Atlas Fuel, compliance is more than a standard — it&apos;s our foundation for trust 
              and performance. Every operation, vehicle, and site meets rigorous national and 
              international certifications. We don&apos;t just follow the rules — we set the benchmark 
              for safety, quality, and reliability.
            </p>
            
            {/* Trust badge */}
            <div
              className={`inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-xl transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <div className="font-bold text-foreground">100% Compliant</div>
                <div className="text-sm text-muted-foreground">All operations certified</div>
              </div>
            </div>
          </div>

          {/* Right - Certification Cards */}
          <div className="grid grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={cert.name}
                className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 group ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary flex items-center justify-center mb-4 transition-colors duration-300">
                  <cert.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                
                {/* Name badge */}
                <div className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3">
                  {cert.name}
                </div>
                
                {/* Title */}
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
