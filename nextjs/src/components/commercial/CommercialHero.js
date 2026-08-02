'use client'
import PageHero from "@/components/shared/PageHero";
import { cmsTextStyle } from './cmsStyles'

export default function CommercialHero({ data = {} }) {
  const eyebrow = data.subtitle ?? 'COMMERCIAL FUEL';
  const title = data.title ?? 'Bulk Fuel Solutions for Business and Industry';
  const description = data.description ?? 'Reliable commercial fuel delivery with competitive pricing and flexible contracts tailored to your business needs.';
  const backgroundImage =
    data.heroImage ?? data.backgroundImage ?? data.heroImageUrl ?? '/images/what-we-do-mining-civil.webp';

  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      backgroundImage={backgroundImage}
      backgroundAlt={data.heroImageAlt ?? data.heroImageUrlAlt ?? title}
      eyebrowStyle={cmsTextStyle(data, 'subtitle')}
      titleStyle={cmsTextStyle(data, 'title')}
      descriptionStyle={cmsTextStyle(data, 'description')}
    />
  );
}
