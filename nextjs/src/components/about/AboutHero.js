"use client";
import PageHero from "@/components/shared/PageHero";
import { getCmsTextStyle } from "@/lib/cmsStyles";

export default function AboutHero({ data = {} }) {
  const eyebrow = data.subtitle ?? "About Us";
  const title = data.title ?? "Powering Australia with Reliability, Integrity, and Innovation";
  const backgroundImage =
    data.heroImage ?? data.backgroundImage ?? data.heroImageUrl ?? "/images/about-us-hero.jpg";
  const ctaButtons = Array.isArray(data.ctaButtons)
    ? data.ctaButtons.filter((button) => button?.text && button?.href)
    : null;

  const eyebrowStyle = getCmsTextStyle(data, "subtitle");
  const titleStyle = getCmsTextStyle(data, "title");

  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      backgroundImage={backgroundImage}
      backgroundAlt={data.heroImageAlt ?? "Atlas Fuel operations"}
      ctaButtons={ctaButtons?.map((button) => ({
        ...button,
        textStyle: getCmsTextStyle(button, "text"),
      }))}
      eyebrowStyle={eyebrowStyle}
      titleStyle={titleStyle}
    />
  );
}
