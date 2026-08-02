'use client'
import PageHero from "@/components/shared/PageHero";
import { cmsTextStyle } from './cmsStyles'

export default function ServiceHero({ data = {} }) {
  const eyebrow = data.subtitle ?? 'OUR SERVICES';
  const title = data.title ?? 'Comprehensive Fuel Solutions for Every Industry';
  const description = data.description ?? 'From mining to marine, agriculture to retail — we deliver reliable fuel solutions tailored to your industry needs.';
  const backgroundImage =
    data.heroImageImage ?? data.heroImage ?? data.backgroundImage ?? data.heroImageUrl ?? '/images/hero-trucks.jpg';

  return (
    <PageHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      backgroundImage={backgroundImage}
      backgroundAlt={data.heroImageAlt ?? data.heroImageUrlAlt ?? title}
      stats={Array.isArray(data.stats) ? data.stats : null}
      eyebrowStyle={cmsTextStyle(data, 'subtitle')}
      titleStyle={cmsTextStyle(data, 'title')}
      descriptionStyle={cmsTextStyle(data, 'description')}
    />
  );
}
