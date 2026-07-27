'use client'
import PageHero from "@/components/shared/PageHero";
import { cmsTextStyle } from '@/components/services/cmsStyles'

export default function MarineHero({ data = {} }) {
  const eyebrow = data.subtitle || 'MARINE FUEL';
  const title = data.title || 'Marine Bunkering Solutions for Australian Waters';
  const description = data.description || 'Comprehensive marine fuel services for vessels across major Australian ports with reliable delivery and quality assurance.';
  const backgroundImage = data.heroImageUrl || '/images/hero-trucks.jpg';

  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      backgroundImage={backgroundImage}
      stats={data.stats?.length ? data.stats : null}
      eyebrowStyle={cmsTextStyle(data, 'subtitle')}
      titleStyle={cmsTextStyle(data, 'title')}
      descriptionStyle={cmsTextStyle(data, 'description')}
    />
  );
}
