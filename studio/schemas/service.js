export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: () => '⛽',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Mining', value: 'mining' },
          { title: 'Marine', value: 'marine' },
          { title: 'Agriculture', value: 'agriculture' },
          { title: 'Retail', value: 'retail' },
          { title: 'Distribution', value: 'distribution' },
          { title: 'Bulk Diesel', value: 'bulk-diesel' },
        ],
      },
    },
    {
      name: 'shortDescription',
      title: 'Short Description (for tabs)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 5,
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
}
