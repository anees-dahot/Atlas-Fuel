import React, { useEffect, useRef, useState } from "react";
import { Link } from "gatsby";
import { cn } from "../../lib/utils";

const features = [
  {
    eyebrow: "Services",
    title: "Atlas Store Locator",
    description: "Our commitment to superior service sets industry standards, transforming logistics to enhance operations and gain a competitive edge for our customers.",
    image: "/images/fuel-depot.jpg",
    href: "/#locator",
    subtitle: "Quickly find your nearest local Atlas Fuel station and experience world-class service wherever you are.",
    icon: "MapPin",
  },
  {
    eyebrow: "Services",
    title: "Atlas Performance Fleet",
    description: "Our commitment to superior service sets industry standards, transforming logistics to enhance operations and gain a competitive edge for our customers.",
    image: "/images/hero-trucks.jpg",
    href: "/#fleet",
    subtitle: "Discover our high-performance fleet engineered for speed, strength, and reliable nationwide fuel delivery.",
    icon: "Truck",
  },
  {
    eyebrow: "Careers",
    title: "Work With Us",
    description: "Join Atlas Fuel and build a rewarding career powering growth across Australia every single day.",
    image: "/images/mining-site.jpg",
    href: "/#careers",
    subtitle: "Join Atlas Fuel and build a rewarding career powering growth across Australia every single day.",
    icon: "Briefcase",
  },
];

const iconPaths = {
  MapPin: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  ),
  MapPinOuter: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  ),
  Truck: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V5.625A2.625 2.625 0 0 0 16.125 3H7.875A2.625 2.625 0 0 0 5.25 5.625V12.75"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12.75A.75.75 0 0 0 3.75 13.5h16.5a.75.75 0 0 0 .75-.75V9.75H3v3Z"
      />
    </>
  ),
  Briefcase: (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
      />
    </>
  ),
};

function FeatureIcon({ name, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      {iconPaths[name] &&
        (Array.isArray(iconPaths[name]) ? (
          iconPaths[name]
        ) : (
          <>
            {iconPaths[name]}
            {name === "MapPin" && iconPaths.MapPinOuter}
          </>
        ))}
    </svg>
  );
}

function FeatureBoxes() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.href}
              className={cn(
                "group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-primary/90 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                    {feature.eyebrow}
                  </span>
                </div>

                {/* Icon */}
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <FeatureIcon name={feature.icon} className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-primary transition-colors font-heading uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {feature.subtitle}
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wide">
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
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

export default FeatureBoxes;
