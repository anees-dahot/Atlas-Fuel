import React, { useEffect, useRef, useState } from "react";
import { Link } from "gatsby";
import { cn } from "../../lib/utils";

const stats = [
  {
    value: "300+",
    label: "Jobs Connected",
    description:
      "Across Australia, Atlas Fuel has generated over 300 direct and indirect jobs, empowering local communities.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    value: "50+",
    label: "Talent Rising",
    description:
      "Each year, we proudly train 50+ members with skills and confidence to build lasting careers.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    value: "5+",
    label: "Seniors at Work",
    description:
      "We proudly employ senior citizens, valuing the wisdom, reliability, and experience they bring.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
];

export default function Community() {
  const [isVisible, setIsVisible] = useState(false);
  const [countedValues, setCountedValues] = useState([0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);

          stats.forEach((stat, index) => {
            const target = parseInt(stat.value, 10);
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
              setCountedValues((prev) => {
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
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white" id="community">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={cn(
              "flex items-center justify-center gap-4 mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <div className="w-12 h-0.5 bg-primary" />
            <span className="text-primary text-sm font-bold uppercase tracking-widest">
              Community &amp; Supply Chain
            </span>
            <div className="w-12 h-0.5 bg-primary" />
          </div>
          <h2
            className={cn(
              "font-heading text-3xl md:text-4xl lg:text-5xl text-foreground uppercase tracking-tight transition-all duration-700 delay-100",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            We Are Committed to Partnering With Communities
          </h2>
          <p
            className={cn(
              "mt-4 text-lg text-muted-foreground transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
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
              className={cn(
                "relative bg-gray-50 rounded-2xl p-8 text-center group hover:bg-primary hover:text-white transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-white/20 flex items-center justify-center mx-auto mb-6 transition-colors duration-300 text-primary group-hover:text-white">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="font-heading text-5xl md:text-6xl font-bold text-primary group-hover:text-white mb-2 transition-colors">
                {countedValues[index]}+
              </div>

              {/* Label */}
              <div className="font-heading text-xl font-bold text-foreground group-hover:text-white mb-4 uppercase transition-colors">
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
          className={cn(
            "text-center mt-12 transition-all duration-700 delay-500",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase tracking-wide rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
          >
            Learn More About Our Impact
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
