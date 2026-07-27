'use client'
import PageHero from "@/components/shared/PageHero";

export default function StationHero({ data = {} }) {
  const eyebrow = data.subtitle || 'FUEL STATION';
  const title = data.title || 'Premium Fuel and Exceptional Service';
  const description = data.description || 'Modern facilities, competitive pricing, and a commitment to quality at every Atlas Fuel station.';
  const backgroundImage = data.heroImageUrl || '/images/fuel-stations.jpg';
  const textStyle = (field) => ({
    color: data[`${field}Color`] || undefined,
    fontSize: data[`${field}Size`] || undefined,
    WebkitTextStroke: data[`${field}BorderEnabled`]
      ? `${data[`${field}BorderWidth`] || '1px'} ${data[`${field}BorderColor`] || 'currentColor'}`
      : undefined,
    textShadow: data[`${field}ShadowColor`]
      ? `0 2px 4px ${data[`${field}ShadowColor`]}`
      : undefined,
  });

  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      backgroundImage={backgroundImage}
      eyebrowStyle={textStyle('subtitle')}
      titleStyle={textStyle('title')}
      descriptionStyle={textStyle('description')}
      ctaButtons={
        data.ctaText
          ? [{ text: data.ctaText, href: data.ctaLink || '/store-locator' }]
          : null
      }
    />
  );
}
