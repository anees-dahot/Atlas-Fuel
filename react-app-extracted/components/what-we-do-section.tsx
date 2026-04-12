"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Fuel, Ship, Tractor, HardHat, Store, Truck, DollarSign, Users } from "lucide-react";

const sectors = [
  {
    id: "stations",
    title: "Fuel Stations",
    shortTitle: "Fuel Stations",
    icon: Store,
    description: "Atlas Fuel stations deliver more than fuel—we power communities with convenience, service, and reliability.",
    fullDescription: "Our fuel stations are designed for everyday Australians, offering world-class facilities, competitive pricing, and exceptional customer service. Each location features modern amenities, clean restrooms, and our signature Krunch & Munch Cafe.",
    image: "/images/fuel-depot.jpg",
    stats: [
      { label: "Locations", value: "15+" },
      { label: "Daily Customers", value: "5000+" },
    ],
  },
  {
    id: "sectors",
    title: "Sectors We Cover",
    shortTitle: "Mining & Civil",
    icon: HardHat,
    description: "From mining to marine, agriculture to civil works, Atlas Fuel proudly keeps every sector moving forward.",
    fullDescription: "We provide comprehensive fuel solutions to mining operations, civil construction projects, and heavy industry across Australia. Our specialized delivery fleet and bulk storage solutions ensure your operations never stop.",
    image: "/images/mining-site.jpg",
    stats: [
      { label: "Mining Clients", value: "50+" },
      { label: "Litres Delivered", value: "100M+" },
    ],
  },
  {
    id: "logistics",
    title: "Fuel Logistics",
    shortTitle: "Logistics",
    icon: Truck,
    description: "With a modern fleet and precision planning, Atlas Fuel ensures your fuel arrives safely, on time, every time.",
    fullDescription: "Our state-of-the-art logistics network features GPS-tracked vehicles, real-time delivery updates, and 24/7 emergency response capabilities. We maintain the highest safety standards with WAHVA-accredited fleet operations.",
    image: "/images/hero-trucks.jpg",
    stats: [
      { label: "Fleet Size", value: "30+" },
      { label: "On-Time Rate", value: "99.5%" },
    ],
  },
  {
    id: "onsite",
    title: "On-Site Diesel",
    shortTitle: "On-Site",
    icon: Fuel,
    description: "Atlas Fuel brings the pump to you—efficient onsite diesel solutions that keep your operations running nonstop.",
    fullDescription: "Our mobile refueling units and on-site tank installations eliminate downtime and improve operational efficiency. We handle everything from tank installation to regular maintenance and fuel management systems.",
    image: "/images/fuel-depot.jpg",
    stats: [
      { label: "Sites Serviced", value: "200+" },
      { label: "Uptime", value: "24/7" },
    ],
  },
  {
    id: "marine",
    title: "Marine Bunkering",
    shortTitle: "Marine",
    icon: Ship,
    description: "Marine bunkering solutions ensuring your vessels stay fueled and operational across Australian waters.",
    fullDescription: "We provide comprehensive marine fuel services including bunker fuel delivery, lubricants, and vessel refueling at major Australian ports. Our marine division adheres to the strictest environmental and safety protocols.",
    image: "/images/marine-fuel.jpg",
    stats: [
      { label: "Ports Covered", value: "12+" },
      { label: "Vessels Served", value: "500+" },
    ],
  },
  {
    id: "agriculture",
    title: "Agriculture",
    shortTitle: "Agriculture",
    icon: Tractor,
    description: "Farm fuel delivery keeping Australian agriculture running efficiently during critical seasons.",
    fullDescription: "We understand the unique demands of Australian agriculture. Our flexible delivery schedules, bulk storage solutions, and competitive pricing help farmers maximize efficiency during planting and harvest seasons.",
    image: "/images/agriculture.jpg",
    stats: [
      { label: "Farms Supplied", value: "300+" },
      { label: "Coverage", value: "WA Wide" },
    ],
  },
  {
    id: "pricing",
    title: "Fuel Prices",
    shortTitle: "Pricing",
    icon: DollarSign,
    description: "Atlas Fuel delivers competitive fuel prices without compromising quality, keeping you powered for less.",
    fullDescription: "Our direct supply agreements and efficient distribution network allow us to offer some of the most competitive fuel prices in Australia. We provide transparent pricing with no hidden fees.",
    image: "/images/hero-trucks.jpg",
    stats: [
      { label: "Price Match", value: "Guaranteed" },
      { label: "Savings", value: "Up to 15%" },
    ],
  },
  {
    id: "community",
    title: "Community",
    shortTitle: "Community",
    icon: Users,
    description: "Atlas Fuel stands with the community, driving support, connection, and progress wherever we operate.",
    fullDescription: "We believe in giving back to the communities we serve. From sponsoring local sports teams to supporting charitable initiatives, Atlas Fuel is committed to making a positive impact beyond fuel.",
    image: "/images/mining-site.jpg",
    stats: [
      { label: "Jobs Created", value: "300+" },
      { label: "Community Programs", value: "25+" },
    ],
  },
];

export function WhatWeDoSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  const activeSector = sectors[activeIndex];

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-muted/30" id="sectors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`flex items-center gap-4 mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-muted-foreground text-sm font-medium uppercase tracking-widest">
            Sectors We Cover
          </span>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Tabs */}
          <div>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 uppercase tracking-tight font-[family-name:var(--font-heading)] transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              What We Do
            </h2>
            
            {/* Tab Navigation */}
            <div
              className={`space-y-1 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {sectors.map((sector, index) => (
                <button
                  key={sector.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group w-full flex items-center justify-between px-6 py-4 rounded-lg text-left transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-primary/5 text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        activeIndex === index ? "bg-white/20" : "bg-primary/10"
                      }`}
                    >
                      <sector.icon
                        className={`w-5 h-5 transition-colors ${
                          activeIndex === index ? "text-white" : "text-primary"
                        }`}
                      />
                    </div>
                    <span className="font-semibold">{sector.title}</span>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 transition-all duration-300 ${
                      activeIndex === index
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Content Card */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
              {/* Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={activeSector.image}
                  alt={activeSector.title}
                  fill
                  className="object-cover transition-transform duration-700"
                  key={activeSector.id}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                {/* Stats overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-6">
                  {activeSector.stats.map((stat, i) => (
                    <div key={i} className="text-white">
                      <div className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)]">
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/70">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)] uppercase">
                  {activeSector.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {activeSector.fullDescription}
                </p>
                <Link
                  href={`#${activeSector.id}`}
                  className="group inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wide hover:gap-4 transition-all duration-300"
                >
                  Learn More
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
