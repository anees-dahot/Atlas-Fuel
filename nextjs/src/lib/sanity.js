import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN for faster reads
})

// Cached megaMenu fetch - revalidates every 60 seconds
export async function getMegaMenu() {
  const query = `*[_type == "megaMenu"][0]{
    navItems[]{
      id,
      label,
      href,
      calloutHeading,
      calloutCta,
      description,
      groups[]{
        heading,
        links[]{
          label,
          excerpt,
          href,
          "imageUrl": image.asset->url
        }
      },
      featured{
        label,
        href,
        "imageUrl": image.asset->url
      }
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getAboutPage() {
  const query = `*[_type == "aboutPage"][0]{
    heroSection{
      subtitle,
      subtitleColor,
      subtitleSize,
      subtitleBorderEnabled,
      subtitleBorderColor,
      subtitleBorderWidth,
      subtitleShadowColor,
      title,
      titleColor,
      titleSize,
      titleBorderEnabled,
      titleBorderColor,
      titleBorderWidth,
      titleShadowColor,
      description,
      descriptionColor,
      descriptionSize,
      descriptionBorderEnabled,
      descriptionBorderColor,
      descriptionBorderWidth,
      descriptionShadowColor,
      "heroImageUrl": heroImageUrl.asset->url,
      borderEnabled,
      borderColor,
      borderWidth,
    },
    introStripSection{
      quote,
      quoteColor,
      quoteSize,
      quoteBorderEnabled,
      quoteBorderColor,
      quoteBorderWidth,
      quoteShadowColor,
      counters[]{
        value,
        valueColor,
        valueSize,
        valueBorderEnabled,
        valueBorderColor,
        valueBorderWidth,
        valueShadowColor,
        label,
        labelColor,
        labelSize,
        labelBorderEnabled,
        labelBorderColor,
        labelBorderWidth,
        labelShadowColor
      }
    },
    valuesSection{
      heading,
      headingColor,
      headingSize,
      headingBorderEnabled,
      headingBorderColor,
      headingBorderWidth,
      headingShadowColor,
      whatWeOffer,
      whatWeOfferColor,
      whatWeOfferSize,
      whatWeOfferBorderEnabled,
      whatWeOfferBorderColor,
      whatWeOfferBorderWidth,
      whatWeOfferShadowColor,
      ctaText,
      ctaTextColor,
      ctaTextSize,
      ctaTextBorderEnabled,
      ctaTextBorderColor,
      ctaTextBorderWidth,
      ctaTextShadowColor,
      ctaLink,
      "imageUrl": imageUrl.asset->url,
      values[]{
        title,
        titleColor,
        titleSize,
        titleBorderEnabled,
        titleBorderColor,
        titleBorderWidth,
        titleShadowColor,
        content,
        contentColor,
        contentSize,
        contentBorderEnabled,
        contentBorderColor,
        contentBorderWidth,
        contentShadowColor
      }
    },
    safetySection{
      heading,
      headingColor,
      headingSize,
      headingBorderEnabled,
      headingBorderColor,
      headingBorderWidth,
      headingShadowColor,
      content,
      contentColor,
      contentSize,
      contentBorderEnabled,
      contentBorderColor,
      contentBorderWidth,
      contentShadowColor,
      "safetyImageUrl": safetyImageUrl.asset->url,
      certificationCards[]{ name, label }
    },
    coreValuesSection{
      heading,
      headingColor,
      headingSize,
      headingBorderEnabled,
      headingBorderColor,
      headingBorderWidth,
      headingShadowColor,
      subheading,
      subheadingColor,
      subheadingSize,
      subheadingBorderEnabled,
      subheadingBorderColor,
      subheadingBorderWidth,
      subheadingShadowColor,
      "imageUrl": imageUrl.asset->url,
      values[]{
        title,
        titleColor,
        titleSize,
        titleBorderEnabled,
        titleBorderColor,
        titleBorderWidth,
        titleShadowColor,
        description,
        descriptionColor,
        descriptionSize,
        descriptionBorderEnabled,
        descriptionBorderColor,
        descriptionBorderWidth,
        descriptionShadowColor,
        icon
      }
    },
    cultureSection{
      heading,
      headingColor,
      headingSize,
      headingBorderEnabled,
      headingBorderColor,
      headingBorderWidth,
      headingShadowColor,
      description,
      descriptionColor,
      descriptionSize,
      descriptionBorderEnabled,
      descriptionBorderColor,
      descriptionBorderWidth,
      descriptionShadowColor,
      "imageUrl": imageUrl.asset->url,
      cultureItems[]{
        title,
        titleColor,
        titleSize,
        titleBorderEnabled,
        titleBorderColor,
        titleBorderWidth,
        titleShadowColor,
        content,
        contentColor,
        contentSize,
        contentBorderEnabled,
        contentBorderColor,
        contentBorderWidth,
        contentShadowColor,
        ctaText,
        ctaTextColor,
        ctaTextSize,
        ctaTextBorderEnabled,
        ctaTextBorderColor,
        ctaTextBorderWidth,
        ctaTextShadowColor,
        ctaLink,
        "imageUrl": imageUrl.asset->url
      }
    },
    storySection{
      tagline,
      taglineColor,
      taglineSize,
      taglineBorderEnabled,
      taglineBorderColor,
      taglineBorderWidth,
      taglineShadowColor,
      heading,
      headingColor,
      headingSize,
      headingBorderEnabled,
      headingBorderColor,
      headingBorderWidth,
      headingShadowColor,
      body,
      bodyColor,
      bodySize,
      bodyBorderEnabled,
      bodyBorderColor,
      bodyBorderWidth,
      bodyShadowColor,
      "image1Url": image1Url.asset->url,
      "image2Url": image2Url.asset->url,
      stat1Value,
      stat1ValueColor,
      stat1ValueSize,
      stat1ValueBorderEnabled,
      stat1ValueBorderColor,
      stat1ValueBorderWidth,
      stat1ValueShadowColor,
      stat1Label,
      stat1LabelColor,
      stat1LabelSize,
      stat1LabelBorderEnabled,
      stat1LabelBorderColor,
      stat1LabelBorderWidth,
      stat1LabelShadowColor,
      stat2Value,
      stat2ValueColor,
      stat2ValueSize,
      stat2ValueBorderEnabled,
      stat2ValueBorderColor,
      stat2ValueBorderWidth,
      stat2ValueShadowColor,
      stat2Label,
      stat2LabelColor,
      stat2LabelSize,
      stat2LabelBorderEnabled,
      stat2LabelBorderColor,
      stat2LabelBorderWidth,
      stat2LabelShadowColor,
      keyPoints
    },
    excellenceSection{
      heading,
      headingColor,
      headingSize,
      headingBorderEnabled,
      headingBorderColor,
      headingBorderWidth,
      headingShadowColor,
      content,
      contentColor,
      contentSize,
      contentBorderEnabled,
      contentBorderColor,
      contentBorderWidth,
      contentShadowColor,
      ctaText,
      ctaTextColor,
      ctaTextSize,
      ctaTextBorderEnabled,
      ctaTextBorderColor,
      ctaTextBorderWidth,
      ctaTextShadowColor,
      ctaLink,
      secondaryCtaText,
      secondaryCtaTextColor,
      secondaryCtaTextSize,
      secondaryCtaTextBorderEnabled,
      secondaryCtaTextBorderColor,
      secondaryCtaTextBorderWidth,
      secondaryCtaTextShadowColor,
      secondaryCtaLink,
      "excellenceBgUrl": excellenceBgUrl.asset->url
    },
    ctaBanner{
      heading,
      text,
      buttonText,
      buttonLink,
      phone,
      email,
      address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getServicesPage() {
  const query = `*[_type == "servicesPage"][0]{
    heroSection{
      subtitle,
      subtitleColor,
      subtitleSize,
      subtitleBorderEnabled,
      subtitleBorderColor,
      subtitleBorderWidth,
      subtitleShadowColor,
      title,
      titleColor,
      titleSize,
      titleBorderEnabled,
      titleBorderColor,
      titleBorderWidth,
      titleShadowColor,
      description,
      descriptionColor,
      descriptionSize,
      descriptionBorderEnabled,
      descriptionBorderColor,
      descriptionBorderWidth,
      descriptionShadowColor,
      "heroImageUrl": heroImageUrl.asset->url,
    },
    industriesGridSection{
      sectionTag, sectionTagColor, sectionTagSize, sectionTagBorderEnabled, sectionTagBorderColor, sectionTagBorderWidth, sectionTagShadowColor,
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      industries[]{
        id,
        title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
        description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
        link
      }
    },
    servicesSection{
      heading,
      headingColor,
      headingSize,
      headingBorderEnabled,
      headingBorderColor,
      headingBorderWidth,
      headingShadowColor,
      subheading,
      subheadingColor,
      subheadingSize,
      subheadingBorderEnabled,
      subheadingBorderColor,
      subheadingBorderWidth,
      subheadingShadowColor,
      services[]{
        title,
        titleColor,
        titleSize,
        titleBorderEnabled,
        titleBorderColor,
        titleBorderWidth,
        titleShadowColor,
        description,
        descriptionColor,
        descriptionSize,
        descriptionBorderEnabled,
        descriptionBorderColor,
        descriptionBorderWidth,
        descriptionShadowColor,
        link,
        "imageUrl": imageUrl.asset->url,
      }
    },
    statsSection{
      heading,
      headingColor,
      headingSize,
      headingBorderEnabled,
      headingBorderColor,
      headingBorderWidth,
      headingShadowColor,
      stats[]{
        value,
        valueColor,
        valueSize,
        valueBorderEnabled,
        valueBorderColor,
        valueBorderWidth,
        valueShadowColor,
        label,
        labelColor,
        labelSize,
        labelBorderEnabled,
        labelBorderColor,
        labelBorderWidth,
        labelShadowColor,
        description,
      }
    },
    timelineSection{
      heading,
      headingColor,
      headingSize,
      headingBorderEnabled,
      headingBorderColor,
      headingBorderWidth,
      headingShadowColor,
      subheading,
      subheadingColor,
      subheadingSize,
      subheadingBorderEnabled,
      subheadingBorderColor,
      subheadingBorderWidth,
      subheadingShadowColor,
      steps[]{
        step,
        title,
        titleColor,
        titleSize,
        titleBorderEnabled,
        titleBorderColor,
        titleBorderWidth,
        titleShadowColor,
        description,
        descriptionColor,
        descriptionSize,
        descriptionBorderEnabled,
        descriptionBorderColor,
        descriptionBorderWidth,
        descriptionShadowColor,
      }
    },
    doYouKnowSection{
      heading,
      headingColor,
      headingSize,
      headingBorderEnabled,
      headingBorderColor,
      headingBorderWidth,
      headingShadowColor,
      content,
      contentColor,
      contentSize,
      contentBorderEnabled,
      contentBorderColor,
      contentBorderWidth,
      contentShadowColor,
    },
    bunkerRefuelingSection{
      heading,
      headingColor,
      headingSize,
      headingBorderEnabled,
      headingBorderColor,
      headingBorderWidth,
      headingShadowColor,
      content,
      contentColor,
      contentSize,
      contentBorderEnabled,
      contentBorderColor,
      contentBorderWidth,
      contentShadowColor,
      ctaText,
      ctaTextColor,
      ctaTextSize,
      ctaTextBorderEnabled,
      ctaTextBorderColor,
      ctaTextBorderWidth,
      ctaTextShadowColor,
      "imageUrl": imageUrl.asset->url,
    },
    ownStationSection{
      heading,
      headingColor,
      headingSize,
      headingBorderEnabled,
      headingBorderColor,
      headingBorderWidth,
      headingShadowColor,
      content,
      contentColor,
      contentSize,
      contentBorderEnabled,
      contentBorderColor,
      contentBorderWidth,
      contentShadowColor,
      primaryCTAText,
      primaryCTAColor,
      primaryCTASize,
      primaryCTABorderEnabled,
      primaryCTABorderColor,
      primaryCTABorderWidth,
      primaryCTAShadowColor,
      primaryCTALink,
      secondaryCTAText,
      secondaryCTAColor,
      secondaryCTASize,
      secondaryCTABorderEnabled,
      secondaryCTABorderColor,
      secondaryCTABorderWidth,
      secondaryCTAShadowColor,
      secondaryCTALink,
      "imageUrl": imageUrl.asset->url,
    },
    sectorsCoverSection{
      heading,
      headingColor,
      headingSize,
      headingBorderEnabled,
      headingBorderColor,
      headingBorderWidth,
      headingShadowColor,
      content,
      contentColor,
      contentSize,
      contentBorderEnabled,
      contentBorderColor,
      contentBorderWidth,
      contentShadowColor,
      sectors[]{
        name,
        nameColor,
        nameSize,
        nameBorderEnabled,
        nameBorderColor,
        nameBorderWidth,
        nameShadowColor,
        description,
        descriptionColor,
        descriptionSize,
        descriptionBorderEnabled,
        descriptionBorderColor,
        descriptionBorderWidth,
        descriptionShadowColor,
        "imageUrl": imageUrl.asset->url,
      }
    },
    ctaBanner{
      heading,
      text,
      buttonText,
      buttonLink,
      phone,
      email,
      address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getMiningFuelPage() {
  const query = `*[_type == "miningFuelPage"][0]{
    heroSection{
      subtitle, subtitleColor, subtitleSize, subtitleBorderEnabled, subtitleBorderColor, subtitleBorderWidth, subtitleShadowColor,
      title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      "heroImageUrl": heroImageUrl.asset->url,
    },
    featuresSection{
      title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      subtitle, subtitleColor, subtitleSize, subtitleBorderEnabled, subtitleBorderColor, subtitleBorderWidth, subtitleShadowColor,
      features[]{
        icon,
        title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
        description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      }
    },
    miningSectorSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    statsSection{
      stats[]{
        value, valueColor, valueSize, valueBorderEnabled, valueBorderColor, valueBorderWidth, valueShadowColor,
        suffix, prefix,
        label, labelColor, labelSize, labelBorderEnabled, labelBorderColor, labelBorderWidth, labelShadowColor,
        icon,
      }
    },
    safetySection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    complianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
      certifications[]{
        name, nameColor, nameSize, nameBorderEnabled, nameBorderColor, nameBorderWidth, nameShadowColor,
        label, labelColor, labelSize, labelBorderEnabled, labelBorderColor, labelBorderWidth, labelShadowColor,
      }
    },
    fleetComplianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    driversComplianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    processTimelineSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      subheading, subheadingColor, subheadingSize, subheadingBorderEnabled, subheadingBorderColor, subheadingBorderWidth, subheadingShadowColor,
      steps[]{
        step,
        title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
        description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
        "imageUrl": imageUrl.asset->url,
      }
    },
    enquireSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      primaryCTAText, primaryCTAColor, primaryCTASize, primaryCTABorderEnabled, primaryCTABorderColor, primaryCTABorderWidth, primaryCTAShadowColor,
      primaryCTALink,
      secondaryCTAText, secondaryCTAColor, secondaryCTASize, secondaryCTABorderEnabled, secondaryCTABorderColor, secondaryCTABorderWidth, secondaryCTAShadowColor,
      secondaryCTALink,
    },
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getMarineFuelPage() {
  const query = `*[_type == "marineFuelPage"][0]{
    heroSection{
      subtitle, subtitleColor, subtitleSize, subtitleBorderEnabled, subtitleBorderColor, subtitleBorderWidth, subtitleShadowColor,
      title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      "heroImageUrl": heroImageUrl.asset->url,
      stats[]{
        value, label,
      }
    },
    featuresSection{
      features[]{
        icon,
        title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
        description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
        ctaText, ctaText, ctaTextColor, ctaTextSize, ctaTextBorderEnabled, ctaTextBorderColor, ctaTextBorderWidth, ctaTextShadowColor,
        ctaLink,
      }
    },
    introSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
      "imageUrl": imageUrl.asset->url,
    },
    commercialSection{
      tagline, taglineColor, taglineSize, taglineBorderEnabled, taglineBorderColor, taglineBorderWidth, taglineShadowColor,
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      ctaText, ctaTextColor, ctaTextSize, ctaTextBorderEnabled, ctaTextBorderColor, ctaTextBorderWidth, ctaTextShadowColor,
      ctaLink,
      "imageUrl": imageUrl.asset->url,
    },
    complianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
      certifications[]{
        name, nameColor, nameSize, nameBorderEnabled, nameBorderColor, nameBorderWidth, nameShadowColor,
        label, labelColor, labelSize, labelBorderEnabled, labelBorderColor, labelBorderWidth, labelShadowColor,
      }
    },
    fleetComplianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    driversComplianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    processTimelineSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      subheading, subheadingColor, subheadingSize, subheadingBorderEnabled, subheadingBorderColor, subheadingBorderWidth, subheadingShadowColor,
      steps[]{
        step,
        title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
        description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
        "imageUrl": imageUrl.asset->url,
      }
    },
    enquireSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      primaryCTAText, primaryCTAColor, primaryCTASize, primaryCTABorderEnabled, primaryCTABorderColor, primaryCTABorderWidth, primaryCTAShadowColor,
      primaryCTALink,
      secondaryCTAText, secondaryCTAColor, secondaryCTASize, secondaryCTABorderEnabled, secondaryCTABorderColor, secondaryCTABorderWidth, secondaryCTAShadowColor,
      secondaryCTALink,
    },
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getAgricultureFuelPage() {
  const query = `*[_type == "agricultureFuelPage"][0]{
    heroSection{
      subtitle, subtitleColor, subtitleSize, subtitleBorderEnabled, subtitleBorderColor, subtitleBorderWidth, subtitleShadowColor,
      title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      "heroImageUrl": heroImageUrl.asset->url,
    },
    agricultureSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    featuresSection{
      title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      subtitle, subtitleColor, subtitleSize, subtitleBorderEnabled, subtitleBorderColor, subtitleBorderWidth, subtitleShadowColor,
      features[]{
        icon,
        title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
        description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      }
    },
    processTimelineSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      subheading, subheadingColor, subheadingSize, subheadingBorderEnabled, subheadingBorderColor, subheadingBorderWidth, subheadingShadowColor,
      steps[]{
        step,
        title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
        description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
        "imageUrl": imageUrl.asset->url,
      }
    },
    excellenceSection{
      tagline, taglineColor, taglineSize, taglineBorderEnabled, taglineBorderColor, taglineBorderWidth, taglineShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
      ctaText, ctaTextColor, ctaTextSize, ctaTextBorderEnabled, ctaTextBorderColor, ctaTextBorderWidth, ctaTextShadowColor,
      ctaLink,
    },
    equipmentGrowthSection{
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    dieselHarvestsSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    sustainableFuelingSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
      ctaText, ctaTextColor, ctaTextSize, ctaTextBorderEnabled, ctaTextBorderColor, ctaTextBorderWidth, ctaTextShadowColor,
      ctaLink,
    },
    safetySection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    complianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
      certifications[]{
        name, nameColor, nameSize, nameBorderEnabled, nameBorderColor, nameBorderWidth, nameShadowColor,
        label, labelColor, labelSize, labelBorderEnabled, labelBorderColor, labelBorderWidth, labelShadowColor,
      }
    },
    fleetComplianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    driversComplianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getFuelRetailersPage() {
  const query = `*[_type == "fuelRetailersPage"][0]{
    retailerHeroSection{
      subtitle, subtitleColor, subtitleSize, subtitleBorderEnabled, subtitleBorderColor, subtitleBorderWidth, subtitleShadowColor,
      title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      "heroImageUrl": heroImageUrl.asset->url,
    },
    supportSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      ctaText, ctaTextColor, ctaTextSize, ctaTextBorderEnabled, ctaTextBorderColor, ctaTextBorderWidth, ctaTextShadowColor,
      ctaLink,
    },
    featuresSection{
      title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      subtitle, subtitleColor, subtitleSize, subtitleBorderEnabled, subtitleBorderColor, subtitleBorderWidth, subtitleShadowColor,
      features[]{
        icon,
        title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
        description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      }
    },
    growthSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      ctaPrimaryText, ctaPrimaryColor, ctaPrimarySize, ctaPrimaryBorderEnabled, ctaPrimaryBorderColor, ctaPrimaryBorderWidth, ctaPrimaryShadowColor,
      ctaPrimaryLink,
      ctaSecondaryText, ctaSecondaryColor, ctaSecondarySize, ctaSecondaryBorderEnabled, ctaSecondaryBorderColor, ctaSecondaryBorderWidth, ctaSecondaryShadowColor,
      ctaSecondaryLink,
      "imageUrl": imageUrl.asset->url,
    },
    safetySection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    complianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
      certifications[]{
        name, nameColor, nameSize, nameBorderEnabled, nameBorderColor, nameBorderWidth, nameShadowColor,
        label, labelColor, labelSize, labelBorderEnabled, labelBorderColor, labelBorderWidth, labelShadowColor,
      }
    },
    fleetComplianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    driversComplianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    enquireSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      primaryCTAText, primaryCTAColor, primaryCTASize, primaryCTABorderEnabled, primaryCTABorderColor, primaryCTABorderWidth, primaryCTAShadowColor,
      primaryCTALink,
      secondaryCTAText, secondaryCTAColor, secondaryCTASize, secondaryCTABorderEnabled, secondaryCTABorderColor, secondaryCTABorderWidth, secondaryCTAShadowColor,
      secondaryCTALink,
    },
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getOnsiteBulkDieselPage() {
  const query = `*[_type == "onsiteBulkDieselPage"][0]{
    heroSection{
      subtitle, subtitleColor, subtitleSize, subtitleBorderEnabled, subtitleBorderColor, subtitleBorderWidth, subtitleShadowColor,
      title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      "heroImageUrl": heroImageUrl.asset->url,
    },
    featuresSection{
      title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      subtitle, subtitleColor, subtitleSize, subtitleBorderEnabled, subtitleBorderColor, subtitleBorderWidth, subtitleShadowColor,
      features[]{
        icon,
        title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
        description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      }
    },
    processTimelineSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      subheading, subheadingColor, subheadingSize, subheadingBorderEnabled, subheadingBorderColor, subheadingBorderWidth, subheadingShadowColor,
      steps[]{
        step,
        title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
        description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
        "imageUrl": imageUrl.asset->url,
      }
    },
    safetySection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    complianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
      certifications[]{
        name, nameColor, nameSize, nameBorderEnabled, nameBorderColor, nameBorderWidth, nameShadowColor,
        label, labelColor, labelSize, labelBorderEnabled, labelBorderColor, labelBorderWidth, labelShadowColor,
      }
    },
    fleetComplianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    driversComplianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    enquireSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      primaryCTAText, primaryCTAColor, primaryCTASize, primaryCTABorderEnabled, primaryCTABorderColor, primaryCTABorderWidth, primaryCTAShadowColor,
      primaryCTALink,
      secondaryCTAText, secondaryCTAColor, secondaryCTASize, secondaryCTABorderEnabled, secondaryCTABorderColor, secondaryCTABorderWidth, secondaryCTAShadowColor,
      secondaryCTALink,
    },
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getLocalFuelDistributorsPage() {
  const query = `*[_type == "localFuelDistributorsPage"][0]{
    heroSection{
      subtitle, subtitleColor, subtitleSize, subtitleBorderEnabled, subtitleBorderColor, subtitleBorderWidth, subtitleShadowColor,
      title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      "heroImageUrl": heroImageUrl.asset->url,
    },
    distributorSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    featuresSection{
      title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
      subtitle, subtitleColor, subtitleSize, subtitleBorderEnabled, subtitleBorderColor, subtitleBorderWidth, subtitleShadowColor,
      features[]{
        icon,
        title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
        description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
      }
    },
    processTimelineSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      subheading, subheadingColor, subheadingSize, subheadingBorderEnabled, subheadingBorderColor, subheadingBorderWidth, subheadingShadowColor,
      steps[]{
        step,
        title, titleColor, titleSize, titleBorderEnabled, titleBorderColor, titleBorderWidth, titleShadowColor,
        description, descriptionColor, descriptionSize, descriptionBorderEnabled, descriptionBorderColor, descriptionBorderWidth, descriptionShadowColor,
        "imageUrl": imageUrl.asset->url,
      }
    },
    safetySection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    complianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
      certifications[]{
        name, nameColor, nameSize, nameBorderEnabled, nameBorderColor, nameBorderWidth, nameShadowColor,
        label, labelColor, labelSize, labelBorderEnabled, labelBorderColor, labelBorderWidth, labelShadowColor,
      }
    },
    fleetComplianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    driversComplianceSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      content, contentColor, contentSize, contentBorderEnabled, contentBorderColor, contentBorderWidth, contentShadowColor,
    },
    enquireSection{
      heading, headingColor, headingSize, headingBorderEnabled, headingBorderColor, headingBorderWidth, headingShadowColor,
      primaryCTAText, primaryCTAColor, primaryCTASize, primaryCTABorderEnabled, primaryCTABorderColor, primaryCTABorderWidth, primaryCTAShadowColor,
      primaryCTALink,
      secondaryCTAText, secondaryCTAColor, secondaryCTASize, secondaryCTABorderEnabled, secondaryCTABorderColor, secondaryCTABorderWidth, secondaryCTAShadowColor,
      secondaryCTALink,
    },
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getContactPage() {
  const query = `*[_type == "contactPage"][0]{
    heroTitle, heroTitleColor, heroTitleSize, heroTitleBorderEnabled, heroTitleBorderColor, heroTitleBorderWidth, heroTitleShadowColor,
    heroDescription, heroDescriptionColor, heroDescriptionSize, heroDescriptionBorderEnabled, heroDescriptionBorderColor, heroDescriptionBorderWidth, heroDescriptionShadowColor,
    "heroImageUrl": heroImageUrl.asset->url,
    address, phone, email, weekdaysHours, saturdayHours, sundayHours, emergencySupport,
    formHeading, formHeadingColor, formHeadingSize, formHeadingBorderEnabled, formHeadingBorderColor, formHeadingBorderWidth, formHeadingShadowColor,
    submitButtonText, successMessage,
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getFuelStationsPage() {
  const query = `*[_type == "fuelStationsPage"][0]{
    heroSubtitle, heroSubtitleColor, heroSubtitleSize, heroSubtitleBorderEnabled, heroSubtitleBorderColor, heroSubtitleBorderWidth, heroSubtitleShadowColor,
    heroTitle, heroTitleColor, heroTitleSize, heroTitleBorderEnabled, heroTitleBorderColor, heroTitleBorderWidth, heroTitleShadowColor,
    heroDescription, heroDescriptionColor, heroDescriptionSize, heroDescriptionBorderEnabled, heroDescriptionBorderColor, heroDescriptionBorderWidth, heroDescriptionShadowColor,
    "heroImageUrl": heroImageUrl.asset->url,
    heroCtaText, heroCtaLink,
    retailIntroSubtitle, retailIntroSubtitleColor, retailIntroSubtitleSize, retailIntroSubtitleBorderEnabled, retailIntroSubtitleBorderColor, retailIntroSubtitleBorderWidth, retailIntroSubtitleShadowColor,
    retailIntroTitle, retailIntroTitleColor, retailIntroTitleSize, retailIntroTitleBorderEnabled, retailIntroTitleBorderColor, retailIntroTitleBorderWidth, retailIntroTitleShadowColor,
    retailIntroDescription, retailIntroDescriptionColor, retailIntroDescriptionSize, retailIntroDescriptionBorderEnabled, retailIntroDescriptionBorderColor, retailIntroDescriptionBorderWidth, retailIntroDescriptionShadowColor,
    retailIntroSecondParagraph,
    retailIntroCtaText, retailIntroCtaLink,
    "retailIntroImageUrl": retailIntroImageUrl.asset->url,
    premiumTagline, premiumTaglineColor, premiumTaglineSize, premiumTaglineBorderEnabled, premiumTaglineBorderColor, premiumTaglineBorderWidth, premiumTaglineShadowColor,
    premiumContent, premiumContentColor, premiumContentSize, premiumContentBorderEnabled, premiumContentBorderColor, premiumContentBorderWidth, premiumContentShadowColor,
    premiumCtaText, premiumCtaLink,
    independentHeading, independentHeadingColor, independentHeadingSize, independentHeadingBorderEnabled, independentHeadingBorderColor, independentHeadingBorderWidth, independentHeadingShadowColor,
    independentDescription, independentDescriptionColor, independentDescriptionSize, independentDescriptionBorderEnabled, independentDescriptionBorderColor, independentDescriptionBorderWidth, independentDescriptionShadowColor,
    independentCtaText, independentCtaLink,
    "independentImageUrl": independentImageUrl.asset->url,
    galleryHeading, galleryHeadingColor, galleryHeadingSize, galleryHeadingBorderEnabled, galleryHeadingBorderColor, galleryHeadingBorderWidth, galleryHeadingShadowColor,
    "galleryImages": galleryImages[].asset->url,
    serviceHeading, serviceHeadingColor, serviceHeadingSize, serviceHeadingBorderEnabled, serviceHeadingBorderColor, serviceHeadingBorderWidth, serviceHeadingShadowColor,
    serviceContent, serviceContentColor, serviceContentSize, serviceContentBorderEnabled, serviceContentBorderColor, serviceContentBorderWidth, serviceContentShadowColor,
    serviceQuestion, serviceQuestionColor, serviceQuestionSize, serviceQuestionBorderEnabled, serviceQuestionBorderColor, serviceQuestionBorderWidth, serviceQuestionShadowColor,
    "serviceImageUrl": serviceImageUrl.asset->url,
    fuelTypesHeading, fuelTypesHeadingColor, fuelTypesHeadingSize, fuelTypesHeadingBorderEnabled, fuelTypesHeadingBorderColor, fuelTypesHeadingBorderWidth, fuelTypesHeadingShadowColor,
    statsValue, statsValueColor, statsValueSize, statsValueBorderEnabled, statsValueBorderColor, statsValueBorderWidth, statsValueShadowColor,
    statsLabel, statsLabelColor, statsLabelSize, statsLabelBorderEnabled, statsLabelBorderColor, statsLabelBorderWidth, statsLabelShadowColor,
    dieselHeading, dieselHeadingColor, dieselHeadingSize, dieselHeadingBorderEnabled, dieselHeadingBorderColor, dieselHeadingBorderWidth, dieselHeadingShadowColor,
    dieselDescription, dieselDescriptionColor, dieselDescriptionSize, dieselDescriptionBorderEnabled, dieselDescriptionBorderColor, dieselDescriptionBorderWidth, dieselDescriptionShadowColor,
    dieselCtaText, dieselCtaLink,
    "dieselImageUrl": dieselImageUrl.asset->url,
    featuresCtaText, featuresCtaLink,
    excellenceTagline, excellenceTaglineColor, excellenceTaglineSize, excellenceTaglineBorderEnabled, excellenceTaglineBorderColor, excellenceTaglineBorderWidth, excellenceTaglineShadowColor,
    excellenceContent, excellenceContentColor, excellenceContentSize, excellenceContentBorderEnabled, excellenceContentBorderColor, excellenceContentBorderWidth, excellenceContentShadowColor,
    excellenceCtaText, excellenceCtaLink,
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getFuelTransportationPage() {
  const query = `*[_type == "fuelTransportationPage"][0]{
    heroSubtitle, heroSubtitleColor, heroSubtitleSize, heroSubtitleBorderEnabled, heroSubtitleBorderColor, heroSubtitleBorderWidth, heroSubtitleShadowColor,
    heroTitle, heroTitleColor, heroTitleSize, heroTitleBorderEnabled, heroTitleBorderColor, heroTitleBorderWidth, heroTitleShadowColor,
    heroDescription, heroDescriptionColor, heroDescriptionSize, heroDescriptionBorderEnabled, heroDescriptionBorderColor, heroDescriptionBorderWidth, heroDescriptionShadowColor,
    "heroImageUrl": heroImageUrl.asset->url,
    heroCtaText, heroCtaLink,
    fleetHeading, fleetHeadingColor, fleetHeadingSize, fleetHeadingBorderEnabled, fleetHeadingBorderColor, fleetHeadingBorderWidth, fleetHeadingShadowColor,
    fleetDescription, fleetDescriptionColor, fleetDescriptionSize, fleetDescriptionBorderEnabled, fleetDescriptionBorderColor, fleetDescriptionBorderWidth, fleetDescriptionShadowColor,
    servicesHeading, servicesHeadingColor, servicesHeadingSize, servicesHeadingBorderEnabled, servicesHeadingBorderColor, servicesHeadingBorderWidth, servicesHeadingShadowColor,
    coverageHeading, coverageHeadingColor, coverageHeadingSize, coverageHeadingBorderEnabled, coverageHeadingBorderColor, coverageHeadingBorderWidth, coverageHeadingShadowColor,
    coverageDescription, coverageDescriptionColor, coverageDescriptionSize, coverageDescriptionBorderEnabled, coverageDescriptionBorderColor, coverageDescriptionBorderWidth, coverageDescriptionShadowColor,
    teamHeading, teamHeadingColor, teamHeadingSize, teamHeadingBorderEnabled, teamHeadingBorderColor, teamHeadingBorderWidth, teamHeadingShadowColor,
    teamDescription, teamDescriptionColor, teamDescriptionSize, teamDescriptionBorderEnabled, teamDescriptionBorderColor, teamDescriptionBorderWidth, teamDescriptionShadowColor,
    processHeading, processHeadingColor, processHeadingSize, processHeadingBorderEnabled, processHeadingBorderColor, processHeadingBorderWidth, processHeadingShadowColor,
    safetyHeading, safetyHeadingColor, safetyHeadingSize, safetyHeadingBorderEnabled, safetyHeadingBorderColor, safetyHeadingBorderWidth, safetyHeadingShadowColor,
    safetyDescription, safetyDescriptionColor, safetyDescriptionSize, safetyDescriptionBorderEnabled, safetyDescriptionBorderColor, safetyDescriptionBorderWidth, safetyDescriptionShadowColor,
    fleetGalleryHeading, fleetGalleryHeadingColor, fleetGalleryHeadingSize, fleetGalleryHeadingBorderEnabled, fleetGalleryHeadingBorderColor, fleetGalleryHeadingBorderWidth, fleetGalleryHeadingShadowColor,
    excellenceTagline, excellenceTaglineColor, excellenceTaglineSize, excellenceTaglineBorderEnabled, excellenceTaglineBorderColor, excellenceTaglineBorderWidth, excellenceTaglineShadowColor,
    excellenceContent, excellenceContentColor, excellenceContentSize, excellenceContentBorderEnabled, excellenceContentBorderColor, excellenceContentBorderWidth, excellenceContentShadowColor,
    excellenceCtaText, excellenceCtaLink,
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getCareersPage() {
  const query = `*[_type == "careersPage"][0]{
    heroSubtitle, heroSubtitleColor, heroSubtitleSize, heroSubtitleBorderEnabled, heroSubtitleBorderColor, heroSubtitleBorderWidth, heroSubtitleShadowColor,
    heroTitle, heroTitleColor, heroTitleSize, heroTitleBorderEnabled, heroTitleBorderColor, heroTitleBorderWidth, heroTitleShadowColor,
    heroDescription, heroDescriptionColor, heroDescriptionSize, heroDescriptionBorderEnabled, heroDescriptionBorderColor, heroDescriptionBorderWidth, heroDescriptionShadowColor,
    "heroImageUrl": heroImageUrl.asset->url,
    heroCtaText, heroCtaLink,
    whyWorkHeading, whyWorkHeadingColor, whyWorkHeadingSize, whyWorkHeadingBorderEnabled, whyWorkHeadingBorderColor, whyWorkHeadingBorderWidth, whyWorkHeadingShadowColor,
    whyWorkDescription, whyWorkDescriptionColor, whyWorkDescriptionSize, whyWorkDescriptionBorderEnabled, whyWorkDescriptionBorderColor, whyWorkDescriptionBorderWidth, whyWorkDescriptionShadowColor,
    cultureHeading, cultureHeadingColor, cultureHeadingSize, cultureHeadingBorderEnabled, cultureHeadingBorderColor, cultureHeadingBorderWidth, cultureHeadingShadowColor,
    cultureDescription, cultureDescriptionColor, cultureDescriptionSize, cultureDescriptionBorderEnabled, cultureDescriptionBorderColor, cultureDescriptionBorderWidth, cultureDescriptionShadowColor,
    openingsHeading, openingsHeadingColor, openingsHeadingSize, openingsHeadingBorderEnabled, openingsHeadingBorderColor, openingsHeadingBorderWidth, openingsHeadingShadowColor,
    talentHeading, talentHeadingColor, talentHeadingSize, talentHeadingBorderEnabled, talentHeadingBorderColor, talentHeadingBorderWidth, talentHeadingShadowColor,
    talentDescription, talentDescriptionColor, talentDescriptionSize, talentDescriptionBorderEnabled, talentDescriptionBorderColor, talentDescriptionBorderWidth, talentDescriptionShadowColor,
    teamGalleryHeading, teamGalleryHeadingColor, teamGalleryHeadingSize, teamGalleryHeadingBorderEnabled, teamGalleryHeadingBorderColor, teamGalleryHeadingBorderWidth, teamGalleryHeadingShadowColor,
    officeHeading, officeHeadingColor, officeHeadingSize, officeHeadingBorderEnabled, officeHeadingBorderColor, officeHeadingBorderWidth, officeHeadingShadowColor,
    officeDescription, officeDescriptionColor, officeDescriptionSize, officeDescriptionBorderEnabled, officeDescriptionBorderColor, officeDescriptionBorderWidth, officeDescriptionShadowColor,
    trainingHeading, trainingHeadingColor, trainingHeadingSize, trainingHeadingBorderEnabled, trainingHeadingBorderColor, trainingHeadingBorderWidth, trainingHeadingShadowColor,
    trainingDescription, trainingDescriptionColor, trainingDescriptionSize, trainingDescriptionBorderEnabled, trainingDescriptionBorderColor, trainingDescriptionBorderWidth, trainingDescriptionShadowColor,
    eventsHeading, eventsHeadingColor, eventsHeadingSize, eventsHeadingBorderEnabled, eventsHeadingBorderColor, eventsHeadingBorderWidth, eventsHeadingShadowColor,
    eventsDescription, eventsDescriptionColor, eventsDescriptionSize, eventsDescriptionBorderEnabled, eventsDescriptionBorderColor, eventsDescriptionBorderWidth, eventsDescriptionShadowColor,
    excellenceTagline, excellenceTaglineColor, excellenceTaglineSize, excellenceTaglineBorderEnabled, excellenceTaglineBorderColor, excellenceTaglineBorderWidth, excellenceTaglineShadowColor,
    excellenceContent, excellenceContentColor, excellenceContentSize, excellenceContentBorderEnabled, excellenceContentBorderColor, excellenceContentBorderWidth, excellenceContentShadowColor,
    excellenceCtaText, excellenceCtaLink,

    // Image arrays for editable content
    whyWorkCards[]{ "imageUrl": image.asset->url, title, description },
    cultureImages[]{ "imageUrl": asset->url },
    jobOpenings[]{ "imageUrl": image.asset->url, title, location, type, description },
    "talentRisingImageUrl": talentRisingImage.asset->url,
    teamGalleryImages[]{ "imageUrl": asset->url },
    officeLocations[]{ "imageUrl": image.asset->url, title, subtitle },
    trainingImages[]{ "imageUrl": asset->url },
    teamEvents[]{ "imageUrl": image.asset->url, title, subtitle },

    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getCommunityPage() {
  const query = `*[_type == "communityPage"][0]{
    heroSubtitle, heroSubtitleColor, heroSubtitleSize, heroSubtitleBorderEnabled, heroSubtitleBorderColor, heroSubtitleBorderWidth, heroSubtitleShadowColor,
    heroTitle, heroTitleColor, heroTitleSize, heroTitleBorderEnabled, heroTitleBorderColor, heroTitleBorderWidth, heroTitleShadowColor,
    heroDescription, heroDescriptionColor, heroDescriptionSize, heroDescriptionBorderEnabled, heroDescriptionBorderColor, heroDescriptionBorderWidth, heroDescriptionShadowColor,
    "heroImageUrl": heroImageUrl.asset->url,
    initiativesHeading, initiativesHeadingColor, initiativesHeadingSize, initiativesHeadingBorderEnabled, initiativesHeadingBorderColor, initiativesHeadingBorderWidth, initiativesHeadingShadowColor,
    genderEqualityHeading, genderEqualityHeadingColor, genderEqualityHeadingSize, genderEqualityHeadingBorderEnabled, genderEqualityHeadingBorderColor, genderEqualityHeadingBorderWidth, genderEqualityHeadingShadowColor,
    genderEqualityDescription, genderEqualityDescriptionColor, genderEqualityDescriptionSize, genderEqualityDescriptionBorderEnabled, genderEqualityDescriptionBorderColor, genderEqualityDescriptionBorderWidth, genderEqualityDescriptionShadowColor,
    "genderEqualityImageUrl": genderEqualityImageUrl.asset->url,
    impactHeading, impactHeadingColor, impactHeadingSize, impactHeadingBorderEnabled, impactHeadingBorderColor, impactHeadingBorderWidth, impactHeadingShadowColor,
    supportingLocalsHeading, supportingLocalsHeadingColor, supportingLocalsHeadingSize, supportingLocalsHeadingBorderEnabled, supportingLocalsHeadingBorderColor, supportingLocalsHeadingBorderWidth, supportingLocalsHeadingShadowColor,
    supportingLocalsDescription, supportingLocalsDescriptionColor, supportingLocalsDescriptionSize, supportingLocalsDescriptionBorderEnabled, supportingLocalsDescriptionBorderColor, supportingLocalsDescriptionBorderWidth, supportingLocalsDescriptionShadowColor,
    "supportingLocalsImageUrl": supportingLocalsImageUrl.asset->url,
    supportingLocalsCtaText, supportingLocalsCtaLink,
    regionalHeading, regionalHeadingColor, regionalHeadingSize, regionalHeadingBorderEnabled, regionalHeadingBorderColor, regionalHeadingBorderWidth, regionalHeadingShadowColor,
    regionalDescription, regionalDescriptionColor, regionalDescriptionSize, regionalDescriptionBorderEnabled, regionalDescriptionBorderColor, regionalDescriptionBorderWidth, regionalDescriptionShadowColor,
    storyHeading, storyHeadingColor, storyHeadingSize, storyHeadingBorderEnabled, storyHeadingBorderColor, storyHeadingBorderWidth, storyHeadingShadowColor,
    storyContent, storyContentColor, storyContentSize, storyContentBorderEnabled, storyContentBorderColor, storyContentBorderWidth, storyContentShadowColor,
    "storyImageUrl": storyImageUrl.asset->url,
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getAtlasCarRacingPage() {
  const query = `*[_type == "atlasCarRacingPage"][0]{
    heroTag, heroTagColor, heroTagSize,
    heroTitle, heroTitleColor, heroTitleSize,
    heroSubtitle, heroSubtitleColor, heroSubtitleSize,
    heroPlate,
    "heroImageUrl": heroImageUrl.asset->url,
    meetGtrHeading, meetGtrHeadingColor, meetGtrHeadingSize,
    meetGtrDescription, meetGtrDescriptionColor, meetGtrDescriptionSize,
    meetGtrCtaText, meetGtrCtaLink,
    galleryHeading, galleryHeadingColor, galleryHeadingSize,
    pillarsHeading, pillarsHeadingColor, pillarsHeadingSize,
    sponsorshipHeading, sponsorshipHeadingColor, sponsorshipHeadingSize,
    sponsorshipDescription, sponsorshipDescriptionColor, sponsorshipDescriptionSize,
    sponsorshipCtaText, sponsorshipCtaLink,
    pradoHeading, pradoHeadingColor, pradoHeadingSize,
    pradoDescription, pradoDescriptionColor, pradoDescriptionSize,
    "pradoImageUrl": pradoImageUrl.asset->url,
    contactHeading, contactHeadingColor, contactHeadingSize,
    contactDescription, contactDescriptionColor, contactDescriptionSize,
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getCommercialDieselPage() {
  const query = `*[_type == "commercialDieselPage"][0]{
    heroSubtitle, heroSubtitleColor, heroSubtitleSize,
    heroTitle, heroTitleColor, heroTitleSize,
    heroDescription, heroDescriptionColor, heroDescriptionSize,
    "heroImageUrl": heroImageUrl.asset->url,
    industriesHeading, industriesHeadingColor, industriesHeadingSize,
    sectorsHeading, sectorsHeadingColor, sectorsHeadingSize,
    sectorsContent, sectorsContentColor, sectorsContentSize,
    "sectorsImageUrl": sectorsImageUrl.asset->url,
    bunkerHeading, bunkerHeadingColor, bunkerHeadingSize,
    bunkerContent, bunkerContentColor, bunkerContentSize,
    "bunkerImageUrl": bunkerImageUrl.asset->url,
    ownStationTagline, ownStationHeading, ownStationHeadingColor, ownStationHeadingSize,
    ownStationContent, ownStationContentColor, ownStationContentSize,
    "ownStationImageUrl": ownStationImageUrl.asset->url,
    doYouKnowTagline, doYouKnowHeading, doYouKnowHeadingColor, doYouKnowHeadingSize,
    doYouKnowContent, doYouKnowContentColor, doYouKnowContentSize,
    miningTagline, miningHeading, miningHeadingColor, miningHeadingSize,
    miningContent, miningContentColor, miningContentSize,
    "miningImageUrl": miningImageUrl.asset->url,
    agricultureTagline, agricultureHeading, agricultureHeadingColor, agricultureHeadingSize,
    agricultureContent, agricultureContentColor, agricultureContentSize,
    "agricultureImageUrl": agricultureImageUrl.asset->url,
    whatWeOfferTagline, whatWeOfferHeading, whatWeOfferHeadingColor, whatWeOfferHeadingSize,
    whatWeOfferContent, whatWeOfferContentColor, whatWeOfferContentSize,
    transportationTagline, transportationHeading, transportationHeadingColor, transportationHeadingSize,
    transportationContent, transportationContentColor, transportationContentSize,
    complianceHeading, complianceHeadingColor, complianceHeadingSize,
    complianceContent, complianceContentColor, complianceContentSize,
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getFuelStationEnquiryPage() {
  const query = `*[_type == "fuelStationEnquiryPage"][0]{
    heroSubtitle, heroSubtitleColor, heroSubtitleSize,
    heroTitle, heroTitleColor, heroTitleSize,
    heroDescription, heroDescriptionColor, heroDescriptionSize,
    "heroImageUrl": heroImageUrl.asset->url,
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getProductsPage() {
  const query = `*[_type == "productsPage"][0]{
    heroSubtitle, heroSubtitleColor, heroSubtitleSize,
    heroTitle, heroTitleColor, heroTitleSize,
    heroDescription, heroDescriptionColor, heroDescriptionSize,
    "heroImageUrl": heroImageUrl.asset->url,
    introHeading, introHeadingColor, introHeadingSize,
    introDescription, introDescriptionColor, introDescriptionSize,
    statsValue, statsLabel,
    servicePromiseHeading, servicePromiseHeadingColor, servicePromiseHeadingSize,
    servicePromiseDescription, servicePromiseDescriptionColor, servicePromiseDescriptionSize,
    "servicePromiseImageUrl": servicePromiseImageUrl.asset->url,
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  const productsQuery = `*[_type in ["unleaded91", "premium95", "premium98", "diesel"]]{
    _id,
    name,
    octane,
    subtitle,
    description,
    features,
    "imageUrl": imageUrl.asset->url,
    color
  }`

  const [page, products] = await Promise.all([
    client.fetch(query),
    client.fetch(productsQuery),
  ])

  return { ...page, products }
}

export async function getStoreLocatorPage() {
  const query = `*[_type == "storeLocatorPage"][0]{
    heroSubtitle, heroSubtitleColor, heroSubtitleSize,
    heroTitle, heroTitleColor, heroTitleSize,
    heroDescription, heroDescriptionColor, heroDescriptionSize,
    "heroImageUrl": heroImageUrl.asset->url,
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]{
    siteName,
    "logoUrl": logo.asset->url,
    address,
    phone,
    email,
    emergencyPhone,
    footerDescription,
    facebookUrl,
    linkedinUrl,
    instagramUrl,
    twitterUrl,
    youtubeUrl,
    topRibbonContactText,
    headerCallButtonText,
    headerQuoteButtonText,
    mobileMenuQuoteButtonText,
    heroQuickLinks[]{
      name,
      href,
      icon,
      isEmergency
    },
    copyrightText,
    siteTitle,
    siteDescription,
    baseUrl
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getNewsPosts() {
  const query = `*[_type == "newsPost"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author,
    category,
    "imageUrl": mainImage.asset->url
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getNewsPost(slug) {
  const query = `*[_type == "newsPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    author,
    category,
    "imageUrl": mainImage.asset->url,
    body
  }`

  return await client.fetch(query, { slug }, { next: { revalidate: 86400 } })
}

export async function getFranchisingPage() {
  const query = `*[_type == "franchisingPage"][0]{
    heroSubtitle, heroSubtitleColor, heroSubtitleSize,
    heroTitle, heroTitleColor, heroTitleSize,
    heroDescription, heroDescriptionColor, heroDescriptionSize,
    "heroImageUrl": heroImageUrl.asset->url,
    introHeading, introHeadingColor, introHeadingSize,
    introDescription, introDescriptionColor, introDescriptionSize,
    "introImageUrl": introImageUrl.asset->url,
    benefitsHeading, benefitsHeadingColor, benefitsHeadingSize,
    journeyHeading, journeyHeadingColor, journeyHeadingSize,
    trainingHeading, trainingHeadingColor, trainingHeadingSize,
    trainingDescription, trainingDescriptionColor, trainingDescriptionSize,
    "trainingImageUrl": trainingImageUrl.asset->url,
    investmentHeading, investmentHeadingColor, investmentHeadingSize,
    internationalHeading, internationalHeadingColor, internationalHeadingSize,
    internationalDescription, internationalDescriptionColor, internationalDescriptionSize,
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getFuelPricesPage() {
  const query = `*[_type == "fuelPricesPage"][0]{
    heroSubtitle, heroSubtitleColor, heroSubtitleSize,
    heroTitle, heroTitleColor, heroTitleSize,
    heroDescription, heroDescriptionColor, heroDescriptionSize,
    "heroImageUrl": heroImageUrl.asset->url,
    heading, headingColor, headingSize,
    trendsHeading, trendsHeadingColor, trendsHeadingSize,
    trendsDescription, trendsDescriptionColor, trendsDescriptionSize,
    "trendsImageUrl": trendsImageUrl.asset->url,
    subscribeHeading, subscribeHeadingColor, subscribeHeadingSize,
    subscribeDescription, subscribeDescriptionColor, subscribeDescriptionSize,
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getNewsListingPage() {
  const query = `*[_type == "newsListingPage"][0]{
    heroSubtitle, heroSubtitleColor, heroSubtitleSize,
    heroTitle, heroTitleColor, heroTitleSize,
    heroDescription, heroDescriptionColor, heroDescriptionSize,
    "heroImageUrl": heroImageUrl.asset->url,
    heading, headingColor, headingSize,
    ctaBanner{
      heading, text, buttonText, buttonLink, phone, email, address
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getFooterNavigation() {
  const query = `*[_type == "footerNavigation"][0]{
    companySectionHeading,
    companyLinks[]{
      label,
      href
    },
    servicesSectionHeading,
    servicesLinks[]{
      label,
      href
    },
    supportSectionHeading,
    supportLinks[]{
      label,
      href
    },
    legalLinks[]{
      label,
      href
    }
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}

export async function getErrorPages() {
  const query = `*[_type == "errorPages"][0]{
    notFoundHeading,
    notFoundSubheading,
    notFoundDescription,
    notFoundButtonText,
    notFoundButtonLink,
    errorHeading,
    errorSubheading,
    errorDescription,
    errorButtonText
  }`

  return await client.fetch(query, {}, { next: { revalidate: 60 } }) // 60 seconds
}
