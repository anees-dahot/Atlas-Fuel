'use client'
import PageHero from "@/components/shared/PageHero";

export default function LocatorHero({ data = {} }) {
  const eyebrow = data.subtitle || 'STORE LOCATOR';
  const title = data.title || 'Find Your Nearest Atlas Fuel Station';
  const description = data.description || 'Locate Atlas Fuel stations near you with real-time availability and directions to premium fuel services.';
  const backgroundImage = data.heroImageUrl || '/images/fuel-stations.jpg';

  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      backgroundImage={backgroundImage}
    />
  );
}
