"use client";

import { useEffect, useRef, useState } from "react";
import { Users, GraduationCap, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  {
    value: "300+",
    label: "Jobs Connected",
    description: "Across Australia, Atlas Fuel has generated over 300 direct and indirect jobs, empowering local communities.",
    icon: Users,
  },
  {
    value: "50+",
    label: "Talent Rising",
    description: "Each year, we proudly train 50+ members with skills and confidence to build lasting careers.",
    icon: GraduationCap,
  },
  {
    value: "5+",
    label: "Seniors at Work",
    description: "We proudly employ senior citizens, valuing the wisdom, reliability, and experience they bring.",
    icon: Heart,
  },
];

export function CommunitySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [countedValues, setCountedValues] = useState<number[]>([0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate counters
          stats.forEach((stat, index) => {
            const target = parseInt(stat.value);
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setCountedValues(prev => {
                const newValues = [...prev];
                newValues[index] = Math.floor(current);
                return newValues;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white" id="community">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`flex items-center justify-center gap-4 mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-12 h-0.5 bg-primary" />
            <span className="text-primary text-sm font-bold uppercase tracking-widest">
              Community & Supply Chain
            </span>
            <div className="w-12 h-0.5 bg-primary" />
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight font-[family-name:var(--font-heading)] transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            We Are Committed to Partnering With Communities
          </h2>
          <p
            className={`mt-4 text-lg text-muted-foreground transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            By listening to their needs and building meaningful relationships. Together, we strive 
            to create sustainable solutions that bring long-term benefits.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`relative bg-muted/30 rounded-2xl p-8 text-center group hover:bg-primary hover:text-white transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-white/20 flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <stat.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              
              {/* Value */}
              <div className="text-5xl md:text-6xl font-bold text-primary group-hover:text-white mb-2 font-[family-name:var(--font-heading)] transition-colors">
                {countedValues[index]}+
              </div>
              
              {/* Label */}
              <div className="text-xl font-bold text-foreground group-hover:text-white mb-4 font-[family-name:var(--font-heading)] uppercase transition-colors">
                {stat.label}
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground group-hover:text-white/80 text-sm leading-relaxed transition-colors">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="#about"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            Learn More About Our Impact
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
