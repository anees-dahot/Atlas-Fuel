"use client";
import AboutBusinessAreas from "@/components/about/AboutBusinessAreas";
import AboutCoreValues from "@/components/about/AboutCoreValues";
import AboutCulture from "@/components/about/AboutCulture";
import AboutExcellence from "@/components/about/AboutExcellence";
import AboutHero from "@/components/about/AboutHero";
import AboutHowWeWork from "@/components/about/AboutHowWeWork";
import AboutIntroStrip from "@/components/about/AboutIntroStrip";
import AboutSafety from "@/components/about/AboutSafety";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import CTABanner from "@/components/shared/CTABanner";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function AboutPageContent({ hero, introStrip, values, safety, coreValues, culture, story, howWeWork, businessAreas, excellence, siteSettings }) {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section headings fade-in
      gsap.utils.toArray(".section-heading").forEach((heading) => {
        gsap.from(heading, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            once: true,
          },
        });
      });

      // Content blocks slide-up
      gsap.utils.toArray(".content-block").forEach((block) => {
        gsap.from(block, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            once: true,
          },
        });
      });

      // Image galleries stagger
      gsap.utils.toArray(".gallery-item").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            once: true,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      <AboutHero data={hero} />
        <AboutIntroStrip data={introStrip} />
        <AboutValues data={values} />
        <AboutSafety data={safety} />
        <AboutCoreValues data={coreValues} />
        <AboutCulture data={culture} />
        <AboutStory data={story} />
        <AboutHowWeWork data={howWeWork} />
        <AboutBusinessAreas data={businessAreas} />
        <AboutExcellence data={excellence} />
        <CTABanner data={siteSettings} />
    </div>
  );
}
