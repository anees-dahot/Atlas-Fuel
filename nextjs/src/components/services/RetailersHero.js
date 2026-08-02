'use client'
import PageHero from "@/components/shared/PageHero";
import { cmsTextStyle } from './cmsStyles'

export default function RetailersHero({ data = {} }) {
  const eyebrow = data.subtitle ?? 'FUEL RETAILERS';
  const title = data.title ?? "Partner With Australia's Trusted Fuel Network";
  const description = data.description ?? 'Join our network of independent fuel retailers and operate world-class service stations backed by nationwide support.';
  const backgroundImage =
    data.heroImageImage ?? data.heroImage ?? data.backgroundImage ?? data.heroImageUrl ?? '/images/what-we-do-retail.webp';

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
