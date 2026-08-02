import {defineField, defineType} from 'sanity'

const colorField = (name, title, initialValue) =>
  defineField({
    name,
    title,
    type: 'string',
    initialValue,
    validation: (Rule) =>
      Rule.custom((value) =>
        !value || /^(#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})|rgb(a)?\(|hsl(a)?\(|var\(--)/i.test(value)
          ? true
          : 'Use a CSS hex, rgb, hsl, or var() color'
      ),
  })

export const cmsMedia = defineType({
  name: 'cmsMedia',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((alt, context) =>
          !context.parent?.image?.asset || alt?.trim()
            ? true
            : 'Alternative text is required when an image is selected'
        ),
    }),
  ],
  preview: {
    select: {title: 'alt', media: 'image'},
  },
})

export const cmsVideo = defineType({
  name: 'cmsVideo',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'external',
      options: {
        layout: 'radio',
        list: [
          {title: 'YouTube, Vimeo, or hosted URL', value: 'external'},
          {title: 'Uploaded file', value: 'upload'},
        ],
      },
    }),
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      hidden: ({parent}) => parent?.source === 'upload',
    }),
    defineField({
      name: 'file',
      title: 'Video File',
      type: 'file',
      options: {accept: 'video/*'},
      hidden: ({parent}) => parent?.source !== 'upload',
    }),
    defineField({name: 'poster', title: 'Poster Image', type: 'cmsMedia'}),
    defineField({name: 'title', title: 'Accessible Title', type: 'string'}),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
    defineField({name: 'transcript', title: 'Transcript', type: 'text', rows: 5}),
    defineField({name: 'transcriptLabel', title: 'Transcript Label', type: 'string'}),
    defineField({name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: false}),
    defineField({name: 'muted', title: 'Muted', type: 'boolean', initialValue: true}),
    defineField({name: 'loop', title: 'Loop', type: 'boolean', initialValue: false}),
  ],
  validation: (Rule) =>
    Rule.custom((video) => {
      if (!video) return true
      if (!video.title?.trim()) return 'Add an accessible video title'
      if (video.source === 'upload') return video.file?.asset ? true : 'Select a video file'
      return video.url ? true : 'Enter a video URL'
    }),
  preview: {
    select: {title: 'title', subtitle: 'url', media: 'poster.image'},
  },
})

export const cmsSeo = defineType({
  name: 'cmsSeo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      validation: (Rule) => Rule.max(60).warning('Search results may truncate titles over 60 characters'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Search results may truncate descriptions over 160 characters'),
    }),
    defineField({name: 'image', title: 'Social Share Image', type: 'cmsMedia'}),
    defineField({name: 'canonicalUrl', title: 'Canonical URL', type: 'url'}),
    defineField({
      name: 'indexMode',
      title: 'Search Engine Visibility',
      type: 'string',
      initialValue: 'index',
      options: {
        list: [
          {title: 'Index and follow', value: 'index'},
          {title: 'Do not index', value: 'noindex'},
        ],
      },
    }),
  ],
})

export const themeSettings = defineType({
  name: 'themeSettings',
  title: 'Theme Settings',
  type: 'document',
  groups: [
    {name: 'colors', title: 'Colors', default: true},
    {name: 'typography', title: 'Typography'},
  ],
  fields: [
    defineField({
      name: 'colors',
      title: 'Brand Colors',
      type: 'object',
      group: 'colors',
      fields: [
        colorField('primary', 'Primary', '#17a350'),
        colorField('primaryDark', 'Primary Dark', '#0f7037'),
        colorField('background', 'Page Background', '#ffffff'),
        colorField('text', 'Text', '#000000'),
        colorField('surface', 'Surface', '#f4f4f4'),
        colorField('cream', 'Cream', '#f5f0e8'),
        colorField('sand', 'Sand', '#ede8e0'),
        colorField('gray50', 'Gray 50', '#f9fafb'),
        colorField('gray100', 'Gray 100', '#f3f4f6'),
        colorField('gray200', 'Gray 200', '#e5e7eb'),
        colorField('gray300', 'Gray 300', '#d1d5db'),
        colorField('gray400', 'Gray 400', '#9ca3af'),
        colorField('gray500', 'Gray 500', '#6b7280'),
        colorField('gray600', 'Gray 600', '#4b5563'),
        colorField('gray700', 'Gray 700', '#374151'),
        colorField('gray800', 'Gray 800', '#1f2937'),
        colorField('gray900', 'Gray 900', '#111827'),
        colorField('gray950', 'Gray 950', '#030712'),
      ],
    }),
    defineField({
      name: 'typography',
      title: 'Typography',
      type: 'object',
      group: 'typography',
      fields: [
        defineField({
          name: 'headingFamily',
          title: 'Heading Font Family',
          type: 'string',
          initialValue: 'Manrope',
          options: {list: ['Manrope', 'Inter', 'Oswald', 'Bebas Neue']},
        }),
        defineField({
          name: 'bodyFamily',
          title: 'Body Font Family',
          type: 'string',
          initialValue: 'Manrope',
          options: {list: ['Manrope', 'Inter']},
        }),
        defineField({name: 'headingWeight', title: 'Heading Weight', type: 'number', initialValue: 700}),
        defineField({name: 'bodyWeight', title: 'Body Weight', type: 'number', initialValue: 400}),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Theme Settings'}
    },
  },
})

export const cmsV2SchemaTypes = [
  cmsMedia,
  cmsVideo,
  cmsSeo,
  themeSettings,
]
