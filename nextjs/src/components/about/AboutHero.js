"use client";
import PageHero from "@/components/shared/PageHero";
import { getCmsTextStyle } from "@/lib/cmsStyles";

export default function AboutHero({ data = {} }) {
  const eyebrow = data.subtitle || "About Us";
  const title = data.title || "Powering Australia with Reliability, Integrity, and Innovation";
  const description = data.description || "Atlas Fuel Australia has been proudly fuelling the nation since 2010. From a single site to a national network — we power the industries that power this nation.";
  const backgroundImage = data.heroImageUrl || "/images/about-us-hero.jpg";
  const stats = data.stats || [
    { value: "2010", label: "Established" },
    { value: "100%", label: "Aussie Owned" },
    { value: "8+", label: "Sectors Served" },
    { value: "300+", label: "Jobs Created" },
  ];
  const ctaButtons = data.ctaButtons || null;

  const eyebrowStyle = getCmsTextStyle(data, "subtitle");
  const titleStyle = getCmsTextStyle(data, "title");
  const descriptionStyle = getCmsTextStyle(data, "description");

  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      backgroundImage={backgroundImage}
      backgroundAlt={data.heroImageAlt || "Atlas Fuel operations"}
      stats={stats.map((stat) => ({
        ...stat,
        valueStyle: getCmsTextStyle(stat, "value"),
        labelStyle: getCmsTextStyle(stat, "label"),
      }))}
      ctaButtons={ctaButtons?.map((button) => ({
        ...button,
        textStyle: getCmsTextStyle(button, "text"),
      }))}
      eyebrowStyle={eyebrowStyle}
      titleStyle={titleStyle}
      descriptionStyle={descriptionStyle}
    />
  );
}
