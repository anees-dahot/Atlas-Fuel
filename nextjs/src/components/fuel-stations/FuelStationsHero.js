'use client'
import PageHero from "@/components/shared/PageHero";

export default function FuelStationsHero({ data = {} }) {
  const eyebrow = data.subtitle || 'FUEL STATIONS';
  const title = data.title || 'World-Class Service Stations Across Australia';
  const description = data.description || 'Experience premium fuel and exceptional service at our network of modern fuel stations designed for everyday Australians.';
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
