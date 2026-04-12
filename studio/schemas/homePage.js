export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: () => '🏠',
  fields: [
    {
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'The main hero headline (e.g. "ATLAS FUEL")',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'Tagline shown below the hero heading',
    },
    {
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
    },
    {
      name: 'aboutText',
      title: 'About Section Text',
      type: 'text',
      rows: 4,
    },
    {
      name: 'aboutImage',
      title: 'About Section Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'quoteText',
      title: 'Quote Section Text',
      type: 'text',
      rows: 3,
    },
    {
      name: 'ctaHeading',
      title: 'CTA Section Heading',
      type: 'string',
    },
    {
      name: 'ctaSubtext',
      title: 'CTA Section Subtext',
      type: 'string',
    },
  ],
}
