'use client'
import PageHero from "@/components/shared/PageHero";

export default function FranchisingHero({ data = {} }) {
  const eyebrow = data.subtitle || 'FRANCHISING';
  const title = data.title || 'Own and Operate An Atlas Fuel Station';
  const description = data.description || "Build a successful fuel retail business with the backing of Australia's fastest-growing fuel network.";
  const backgroundImage = data.heroImageUrl || '/images/fuel-stations.jpg';

  const ctaButtons = [
    { text: 'Enquire Now', href: '/contact' },
    { text: 'Learn More', href: '#benefits' }
  ];

  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      backgroundImage={backgroundImage}
      ctaButtons={ctaButtons}
    />
  );
}
