import {cmsV2SchemaTypes} from './cms-v2.js'
import {defineArrayMember, defineField} from 'sanity'

const cmsTextColorOptions = [
  {title: 'Black', value: 'text-gray-900'},
  {title: 'Primary', value: 'text-primary'},
  {title: 'White', value: 'text-white'},
  {title: 'Gray', value: 'text-gray-600'},
]

const cmsTextSizeOptions = [
  {title: '1 (12px)', value: '1'},
  {title: '2 (16px)', value: '2'},
  {title: '3 (20px)', value: '3'},
  {title: '4 (24px)', value: '4'},
  {title: '5 (32px)', value: '5'},
  {title: '6 (48px)', value: '6'},
  {title: '7 (70px)', value: '7'},
]

const cmsBorderColorOptions = [
  {title: 'Black', value: '#000000'},
  {title: 'Primary', value: '#0066cc'},
  {title: 'White', value: '#ffffff'},
  {title: 'Gray', value: '#666666'},
  {title: 'Green', value: '#10b981'},
]

const cmsBorderWidthOptions = ['1px', '2px', '3px', '4px', '5px'].map((value) => ({
  title: value,
  value,
}))

const cmsShadowOptions = [
  {title: 'None', value: ''},
  {title: 'Black', value: 'rgba(0,0,0,0.5)'},
  {title: 'White', value: 'rgba(255,255,255,0.8)'},
  {title: 'Primary', value: 'rgba(0,102,204,0.5)'},
]

const styledTextFields = (name, title, type = 'string', extra = {}) => [
  {name, title, type, ...extra},
  {name: `${name}Color`, title: `${title} Color`, type: 'string', options: {list: cmsTextColorOptions}},
  {name: `${name}Size`, title: `${title} Font Size`, type: 'string', options: {list: cmsTextSizeOptions}},
  {name: `${name}BorderEnabled`, title: `${title} Border Enabled`, type: 'boolean'},
  {name: `${name}BorderColor`, title: `${title} Border Color`, type: 'string', options: {list: cmsBorderColorOptions}},
  {name: `${name}BorderWidth`, title: `${title} Border Width`, type: 'string', options: {list: cmsBorderWidthOptions}},
  {name: `${name}ShadowColor`, title: `${title} Shadow Color`, type: 'string', options: {list: cmsShadowOptions}},
]

const cmsImageField = (name, title) => ({
  name,
  title,
  type: 'image',
  options: {hotspot: true},
  fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
  validation: (Rule) =>
    Rule.custom((image) => !image?.asset || image?.alt ? true : 'Add alt text for accessibility').warning(),
})

// ─── News Post ────────────────────────────────────────────────────────────────
const newsPost = {
  name: 'newsPost',
  title: 'News Post',
  type: 'document',
  fields: [
    { name: 'title',       title: 'Title',        type: 'string' },
    { name: 'slug',        title: 'Slug',         type: 'slug', options: { source: 'title' } },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'author',      title: 'Author',       type: 'string' },
    { name: 'category',    title: 'Category',     type: 'string' },
    { name: 'excerpt',     title: 'Excerpt',      type: 'text', rows: 3 },
    cmsImageField('mainImage', 'Main Image'),
    { name: 'body',        title: 'Body Content', type: 'array', of: [{ type: 'block' }] },
  ],
}

// ─── Home Page ────────────────────────────────────────────────────────────────
const homePage = {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [

    // 1. HERO
    {
      name: 'heroSection', title: '1 · Hero', type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string' },
        { name: 'eyebrowColor', title: 'Eyebrow Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'eyebrowSize', title: 'Eyebrow Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'eyebrowBorderEnabled', title: 'Eyebrow Border Enabled', type: 'boolean' },
        { name: 'eyebrowBorderColor', title: 'Eyebrow Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'eyebrowBorderWidth', title: 'Eyebrow Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'eyebrowShadowColor', title: 'Eyebrow Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'titleLine1', title: 'Title — Line 1', type: 'string' },
        { name: 'titleLine1Color', title: 'Title Line 1 Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleLine1Size', title: 'Title Line 1 Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleLine1BorderEnabled', title: 'Title Line 1 Border Enabled', type: 'boolean' },
        { name: 'titleLine1BorderColor', title: 'Title Line 1 Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleLine1BorderWidth', title: 'Title Line 1 Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleLine1ShadowColor', title: 'Title Line 1 Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'titleLine2', title: 'Title — Line 2', type: 'string' },
        { name: 'titleLine2Color', title: 'Title Line 2 Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleLine2Size', title: 'Title Line 2 Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleLine2BorderEnabled', title: 'Title Line 2 Border Enabled', type: 'boolean' },
        { name: 'titleLine2BorderColor', title: 'Title Line 2 Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleLine2BorderWidth', title: 'Title Line 2 Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleLine2ShadowColor', title: 'Title Line 2 Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'titleLine3', title: 'Title — Line 3', type: 'string' },
        { name: 'titleLine3Color', title: 'Title Line 3 Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleLine3Size', title: 'Title Line 3 Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleLine3BorderEnabled', title: 'Title Line 3 Border Enabled', type: 'boolean' },
        { name: 'titleLine3BorderColor', title: 'Title Line 3 Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleLine3BorderWidth', title: 'Title Line 3 Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleLine3ShadowColor', title: 'Title Line 3 Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTAText', title: 'Primary Button Text', type: 'string' },
        { name: 'primaryCTAColor', title: 'Primary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'primaryCTASize', title: 'Primary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'primaryCTABorderEnabled', title: 'Primary CTA Border Enabled', type: 'boolean' },
        { name: 'primaryCTABorderColor', title: 'Primary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'primaryCTABorderWidth', title: 'Primary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'primaryCTAShadowColor', title: 'Primary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTALink', title: 'Primary Button Link', type: 'string' },
        { name: 'secondaryCTAText', title: 'Secondary Button Text', type: 'string' },
        { name: 'secondaryCTAColor', title: 'Secondary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'secondaryCTASize', title: 'Secondary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'secondaryCTABorderEnabled', title: 'Secondary CTA Border Enabled', type: 'boolean' },
        { name: 'secondaryCTABorderColor', title: 'Secondary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'secondaryCTABorderWidth', title: 'Secondary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'secondaryCTAShadowColor', title: 'Secondary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'secondaryCTALink', title: 'Secondary Button Link', type: 'string' },
        { name: 'videoUrl', title: 'Video URL', type: 'url', description: 'YouTube or Vimeo URL for hero video' },
        { name: 'videoTitle', title: 'Video Title', type: 'string', description: 'Title text for video section (e.g., "Watch our video")' },
        { name: 'videoSubtitle', title: 'Video Subtitle', type: 'string', description: 'Subtitle/description for video section' },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
        {
          name: 'quickLinks', title: 'Quick Links Bar', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'href', title: 'URL', type: 'string' },
            { name: 'icon', title: 'Icon', type: 'string', description: 'dollar, map, phone, truck, building, alert' },
            { name: 'isEmergency', title: 'Emergency Style?', type: 'boolean' },
          ]}],
        },
        {
          name: 'heroStats', title: 'Hero Stats', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'valueColor', title: 'Value Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'valueSize', title: 'Value Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'valueBorderEnabled', title: 'Value Border Enabled', type: 'boolean' },
            { name: 'valueBorderColor', title: 'Value Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'valueBorderWidth', title: 'Value Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'valueShadowColor', title: 'Value Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },

    // 2. FEATURE BOXES
    {
      name: 'featureBoxesSection', title: '2 · Feature Boxes', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [{
        name: 'cards', title: 'Cards', type: 'array',
        of: [{ type: 'object', fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
          { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
          { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
          { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
          { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
          { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
          { name: 'eyebrowColor', title: 'Eyebrow Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
          { name: 'eyebrowSize', title: 'Eyebrow Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
          { name: 'eyebrowBorderEnabled', title: 'Eyebrow Border Enabled', type: 'boolean' },
          { name: 'eyebrowBorderColor', title: 'Eyebrow Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
          { name: 'eyebrowBorderWidth', title: 'Eyebrow Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
          { name: 'eyebrowShadowColor', title: 'Eyebrow Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          { name: 'subtitle', title: 'Description', type: 'text', rows: 2 },
          { name: 'subtitleColor', title: 'Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
          { name: 'subtitleSize', title: 'Subtitle Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
          { name: 'subtitleBorderEnabled', title: 'Subtitle Border Enabled', type: 'boolean' },
          { name: 'subtitleBorderColor', title: 'Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
          { name: 'subtitleBorderWidth', title: 'Subtitle Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
          { name: 'subtitleShadowColor', title: 'Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          { name: 'image', title: 'Image (upload)', type: 'image', options: { hotspot: true } },
          { name: 'imageUrl', title: 'Image URL (fallback)', type: 'string' },
          { name: 'link', title: 'Page Link', type: 'string' },
        ]}],
      }],
    },

    // 3. WHAT WE DO
    {
      name: 'whatWeDoSection', title: '3 · What We Do', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'sectionTag', title: 'Section Tag', type: 'string' },
        { name: 'sectionTagColor', title: 'Section Tag Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'sectionTagSize', title: 'Section Tag Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'sectionTagBorderEnabled', title: 'Section Tag Border Enabled', type: 'boolean' },
        { name: 'sectionTagBorderColor', title: 'Section Tag Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'sectionTagBorderWidth', title: 'Section Tag Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'sectionTagShadowColor', title: 'Section Tag Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'sectionHeading', title: 'Section Heading', type: 'string' },
        { name: 'sectionHeadingColor', title: 'Section Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'sectionHeadingSize', title: 'Section Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'sectionHeadingBorderEnabled', title: 'Section Heading Border Enabled', type: 'boolean' },
        { name: 'sectionHeadingBorderColor', title: 'Section Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'sectionHeadingBorderWidth', title: 'Section Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'sectionHeadingShadowColor', title: 'Section Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'scrollHintText', title: 'Scroll Hint Text', type: 'string' },
        {
          name: 'sectors', title: 'Sectors', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'slug', title: 'Slug', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Short Description', type: 'text', rows: 2 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'fullDescription', title: 'Full Description', type: 'text', rows: 4 },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'href', title: 'Page Link', type: 'string' },
            {
              name: 'stats', title: 'Stats', type: 'array',
              of: [{ type: 'object', fields: [
                { name: 'value', title: 'Value', type: 'string' },
                { name: 'valueColor', title: 'Value Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
                { name: 'valueSize', title: 'Value Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
                { name: 'valueBorderEnabled', title: 'Value Border Enabled', type: 'boolean' },
                { name: 'valueBorderColor', title: 'Value Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
                { name: 'valueBorderWidth', title: 'Value Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
                { name: 'valueShadowColor', title: 'Value Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
                { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
                { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
                { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
                { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
                { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
              ]}],
            },
          ]}],
        },
      ],
    },

    // 4. VISION
    {
      name: 'visionSection', title: '4 · Vision & Purpose', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'sectionTag', title: 'Section Tag', type: 'string' },
        { name: 'sectionTagColor', title: 'Section Tag Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'sectionTagSize', title: 'Section Tag Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'sectionTagBorderEnabled', title: 'Section Tag Border Enabled', type: 'boolean' },
        { name: 'sectionTagBorderColor', title: 'Section Tag Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'sectionTagBorderWidth', title: 'Section Tag Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'sectionTagShadowColor', title: 'Section Tag Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'quote', title: 'Quote Text', type: 'text', rows: 3 },
        { name: 'quoteColor', title: 'Quote Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'quoteSize', title: 'Quote Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'quoteBorderEnabled', title: 'Quote Border Enabled', type: 'boolean' },
        { name: 'quoteBorderColor', title: 'Quote Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'quoteBorderWidth', title: 'Quote Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'quoteShadowColor', title: 'Quote Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'highlightedPhrase', title: 'Highlighted Word', type: 'string' },
        { name: 'highlightedPhraseColor', title: 'Highlighted Phrase Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'highlightedPhraseSize', title: 'Highlighted Phrase Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'highlightedPhraseBorderEnabled', title: 'Highlighted Phrase Border Enabled', type: 'boolean' },
        { name: 'highlightedPhraseBorderColor', title: 'Highlighted Phrase Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'highlightedPhraseBorderWidth', title: 'Highlighted Phrase Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'highlightedPhraseShadowColor', title: 'Highlighted Phrase Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 5 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
        { name: 'ctaTextColor', title: 'CTA Text Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'ctaTextSize', title: 'CTA Text Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'ctaTextBorderEnabled', title: 'CTA Text Border Enabled', type: 'boolean' },
        { name: 'ctaTextBorderColor', title: 'CTA Text Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'ctaTextBorderWidth', title: 'CTA Text Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'ctaTextShadowColor', title: 'CTA Text Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'ctaLink', title: 'CTA Button Link', type: 'string' },
        { name: 'videoImage', title: 'Video Card Image', type: 'image', options: { hotspot: true } },
        { name: 'videoLabel', title: 'Video Label', type: 'string' },
        { name: 'videoLabelColor', title: 'Video Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'videoLabelSize', title: 'Video Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'videoLabelBorderEnabled', title: 'Video Label Border Enabled', type: 'boolean' },
        { name: 'videoLabelBorderColor', title: 'Video Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'videoLabelBorderWidth', title: 'Video Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'videoLabelShadowColor', title: 'Video Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'videoDescription', title: 'Video Description', type: 'string' },
      ],
    },

    // 5. COMMUNITY
    {
      name: 'communitySection', title: '5 · Community', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'sectionTag', title: 'Section Tag', type: 'string' },
        { name: 'sectionTagColor', title: 'Section Tag Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'sectionTagSize', title: 'Section Tag Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'sectionTagBorderEnabled', title: 'Section Tag Border Enabled', type: 'boolean' },
        { name: 'sectionTagBorderColor', title: 'Section Tag Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'sectionTagBorderWidth', title: 'Section Tag Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'sectionTagShadowColor', title: 'Section Tag Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'ctaText', title: 'CTA Text', type: 'string' },
        { name: 'ctaTextColor', title: 'CTA Text Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'ctaTextSize', title: 'CTA Text Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'ctaTextBorderEnabled', title: 'CTA Text Border Enabled', type: 'boolean' },
        { name: 'ctaTextBorderColor', title: 'CTA Text Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'ctaTextBorderWidth', title: 'CTA Text Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'ctaTextShadowColor', title: 'CTA Text Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'ctaLink', title: 'CTA Link', type: 'string' },
        {
          name: 'stats', title: 'Stat Cards', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'valueColor', title: 'Value Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'valueSize', title: 'Value Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'valueBorderEnabled', title: 'Value Border Enabled', type: 'boolean' },
            { name: 'valueBorderColor', title: 'Value Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'valueBorderWidth', title: 'Value Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'valueShadowColor', title: 'Value Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'icon', title: 'Icon', type: 'string' },
          ]}],
        },
      ],
    },

    // 6. ABOUT
    {
      name: 'aboutSection', title: '6 · About Us', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'tagline', title: 'Tagline', type: 'string' },
        { name: 'taglineColor', title: 'Tagline Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'taglineSize', title: 'Tagline Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'taglineBorderEnabled', title: 'Tagline Border Enabled', type: 'boolean' },
        { name: 'taglineBorderColor', title: 'Tagline Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'taglineBorderWidth', title: 'Tagline Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'taglineShadowColor', title: 'Tagline Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'body', title: 'Body Text', type: 'text', rows: 8 },
        { name: 'bodyColor', title: 'Body Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'bodySize', title: 'Body Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'bodyBorderEnabled', title: 'Body Border Enabled', type: 'boolean' },
        { name: 'bodyBorderColor', title: 'Body Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'bodyBorderWidth', title: 'Body Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'bodyShadowColor', title: 'Body Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'keyPoints', title: 'Key Points', type: 'array', of: [{ type: 'string' }] },
        { name: 'imageLeft', title: 'Image — Left', type: 'image', options: { hotspot: true } },
        { name: 'imageRight', title: 'Image — Right', type: 'image', options: { hotspot: true } },
        { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
        { name: 'ctaTextColor', title: 'CTA Text Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'ctaTextSize', title: 'CTA Text Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'ctaTextBorderEnabled', title: 'CTA Text Border Enabled', type: 'boolean' },
        { name: 'ctaTextBorderColor', title: 'CTA Text Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'ctaTextBorderWidth', title: 'CTA Text Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'ctaTextShadowColor', title: 'CTA Text Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'ctaLink', title: 'CTA Button Link', type: 'string' },
        {
          name: 'stats', title: 'Stats', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'valueColor', title: 'Value Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'valueSize', title: 'Value Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'valueBorderEnabled', title: 'Value Border Enabled', type: 'boolean' },
            { name: 'valueBorderColor', title: 'Value Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'valueBorderWidth', title: 'Value Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'valueShadowColor', title: 'Value Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },

    // 7. CERTIFICATIONS
    {
      name: 'certificationsSection', title: '7 · Certifications', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'sectionTag', title: 'Section Tag', type: 'string' },
        { name: 'sectionTagColor', title: 'Section Tag Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'sectionTagSize', title: 'Section Tag Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'sectionTagBorderEnabled', title: 'Section Tag Border Enabled', type: 'boolean' },
        { name: 'sectionTagBorderColor', title: 'Section Tag Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'sectionTagBorderWidth', title: 'Section Tag Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'sectionTagShadowColor', title: 'Section Tag Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'certificateImages', title: 'Certificate Images (Display Outside Cards)', type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }],
          description: 'Upload certificate images to display in grid below description text'
        },
        {
          name: 'certifications', title: 'Certification Cards', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'type', title: 'Type / Slug', type: 'string' },
            { name: 'title', title: 'Full Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'icon', title: 'Icon', type: 'string' },
            { name: 'certificateImage', title: 'Certificate Image', type: 'image', options: { hotspot: true }, description: 'Upload certificate image (will display below the card)' },
          ]}],
        },
      ],
    },

    // 8. OUR PEOPLE
    {
      name: 'peopleSection', title: '8 · Our People', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'sectionTag', title: 'Section Tag', type: 'string' },
        { name: 'sectionTagColor', title: 'Section Tag Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'sectionTagSize', title: 'Section Tag Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'sectionTagBorderEnabled', title: 'Section Tag Border Enabled', type: 'boolean' },
        { name: 'sectionTagBorderColor', title: 'Section Tag Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'sectionTagBorderWidth', title: 'Section Tag Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'sectionTagShadowColor', title: 'Section Tag Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 5 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'ctaText', title: 'CTA Text', type: 'string' },
        { name: 'ctaTextColor', title: 'CTA Text Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'ctaTextSize', title: 'CTA Text Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'ctaTextBorderEnabled', title: 'CTA Text Border Enabled', type: 'boolean' },
        { name: 'ctaTextBorderColor', title: 'CTA Text Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'ctaTextBorderWidth', title: 'CTA Text Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'ctaTextShadowColor', title: 'CTA Text Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'ctaLink', title: 'CTA Link', type: 'string' },
        { name: 'cardHeading', title: 'Card — Heading', type: 'string' },
        { name: 'cardHeadingColor', title: 'Card Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'cardHeadingSize', title: 'Card Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'cardHeadingBorderEnabled', title: 'Card Heading Border Enabled', type: 'boolean' },
        { name: 'cardHeadingBorderColor', title: 'Card Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'cardHeadingBorderWidth', title: 'Card Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'cardHeadingShadowColor', title: 'Card Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'cardDescription', title: 'Card — Description', type: 'text', rows: 4 },
        { name: 'cardDescriptionColor', title: 'Card Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'cardDescriptionSize', title: 'Card Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'cardDescriptionBorderEnabled', title: 'Card Description Border Enabled', type: 'boolean' },
        { name: 'cardDescriptionBorderColor', title: 'Card Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'cardDescriptionBorderWidth', title: 'Card Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'cardDescriptionShadowColor', title: 'Card Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'cardCTAText', title: 'Card — CTA Text', type: 'string' },
        { name: 'cardCTAColor', title: 'Card CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'cardCTASize', title: 'Card CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'cardCTABorderEnabled', title: 'Card CTA Border Enabled', type: 'boolean' },
        { name: 'cardCTABorderColor', title: 'Card CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'cardCTABorderWidth', title: 'Card CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'cardCTAShadowColor', title: 'Card CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'cardCTALink', title: 'Card — CTA Link', type: 'string' },
        { name: 'cardImageUrl', title: 'Card — Image', type: 'image', options: { hotspot: true } },
        { name: 'cardBadge', title: 'Card — Badge Text', type: 'string' },
        {
          name: 'stats', title: 'Stats', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'valueColor', title: 'Value Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'valueSize', title: 'Value Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'valueBorderEnabled', title: 'Value Border Enabled', type: 'boolean' },
            { name: 'valueBorderColor', title: 'Value Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'valueBorderWidth', title: 'Value Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'valueShadowColor', title: 'Value Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
        {
          name: 'cardStats', title: 'Card Stats (with icons)', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'icon', title: 'Icon Name', type: 'string', description: 'Icon identifier (e.g., users, graduation-cap, heart)' },
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ]}],
        },
      ],
    },

    // 9. NEWS
    {
      name: 'newsSectionMeta', title: '9 · News Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'sectionTag', title: 'Section Tag', type: 'string' },
        { name: 'sectionTagColor', title: 'Section Tag Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'sectionTagSize', title: 'Section Tag Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'sectionTagBorderEnabled', title: 'Section Tag Border Enabled', type: 'boolean' },
        { name: 'sectionTagBorderColor', title: 'Section Tag Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'sectionTagBorderWidth', title: 'Section Tag Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'sectionTagShadowColor', title: 'Section Tag Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'viewMoreText', title: 'View More Button Text', type: 'string' },
        { name: 'viewMoreTextColor', title: 'View More Text Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'viewMoreTextSize', title: 'View More Text Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'viewMoreTextBorderEnabled', title: 'View More Text Border Enabled', type: 'boolean' },
        { name: 'viewMoreTextBorderColor', title: 'View More Text Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'viewMoreTextBorderWidth', title: 'View More Text Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'viewMoreTextShadowColor', title: 'View More Text Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'viewMoreLink', title: 'View More Button Link', type: 'string' },
      ],
    },

    // 10. CTA BANNER
    {
      name: 'ctaBanner', title: '10 · CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'text', title: 'Body Text', type: 'text', rows: 2 },
        { name: 'textColor', title: 'Text Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'textSize', title: 'Text Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'textBorderEnabled', title: 'Text Border Enabled', type: 'boolean' },
        { name: 'textBorderColor', title: 'Text Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'textBorderWidth', title: 'Text Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'textShadowColor', title: 'Text Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonTextColor', title: 'Button Text Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'buttonTextSize', title: 'Button Text Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'buttonTextBorderEnabled', title: 'Button Text Border Enabled', type: 'boolean' },
        { name: 'buttonTextBorderColor', title: 'Button Text Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'buttonTextBorderWidth', title: 'Button Text Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'buttonTextShadowColor', title: 'Button Text Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',  title: 'Phone', type: 'string' },
        { name: 'phoneColor', title: 'Phone Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'phoneSize', title: 'Phone Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'phoneBorderEnabled', title: 'Phone Border Enabled', type: 'boolean' },
        { name: 'phoneBorderColor', title: 'Phone Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'phoneBorderWidth', title: 'Phone Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'phoneShadowColor', title: 'Phone Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'email',  title: 'Email', type: 'string' },
        { name: 'emailColor', title: 'Email Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'emailSize', title: 'Email Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'emailBorderEnabled', title: 'Email Border Enabled', type: 'boolean' },
        { name: 'emailBorderColor', title: 'Email Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'emailBorderWidth', title: 'Email Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'emailShadowColor', title: 'Email Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'address',  title: 'Address', type: 'string' },
        { name: 'addressColor', title: 'Address Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'addressSize', title: 'Address Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'addressBorderEnabled', title: 'Address Border Enabled', type: 'boolean' },
        { name: 'addressBorderColor', title: 'Address Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'addressBorderWidth', title: 'Address Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'addressShadowColor', title: 'Address Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },

    // 10. STATS TICKER
    {
      name: 'statsTicker', title: '10 · Stats Ticker', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [{
        name: 'stats', title: 'Stats', type: 'array',
        of: [{ type: 'object', fields: [
          { name: 'value', title: 'Value', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ]}],
      }],
    },
  ],
}

// ─── About Page ────────────────────────────────────────────────────────────────
// Content-only fields — no styling, no colour pickers, no fonts.
const aboutPage = {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [

    // 1. HERO
    {
      name: 'heroSection', title: '1 · Hero', type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle',      title: 'Subtitle',      type: 'string' },
        {
          name: 'subtitleColor',
          title: 'Subtitle Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'subtitleSize',
          title: 'Subtitle Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'subtitleBorderEnabled',
          title: 'Subtitle Border Enabled',
          type: 'boolean',
        },
        {
          name: 'subtitleBorderColor',
          title: 'Subtitle Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
              { title: 'Red', value: '#ff0000' },
              { title: 'Blue', value: '#0000ff' },
              { title: 'Green', value: '#00ff00' },
            ],
          },
        },
        {
          name: 'subtitleBorderWidth',
          title: 'Subtitle Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'subtitleShadowColor',
          title: 'Subtitle Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'title',         title: 'Title',         type: 'string' },
        {
          name: 'titleColor',
          title: 'Title Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'titleSize',
          title: 'Title Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'titleBorderEnabled',
          title: 'Title Border Enabled',
          type: 'boolean',
        },
        {
          name: 'titleBorderColor',
          title: 'Title Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
              { title: 'Red', value: '#ff0000' },
              { title: 'Blue', value: '#0000ff' },
              { title: 'Green', value: '#00ff00' },
            ],
          },
        },
        {
          name: 'titleBorderWidth',
          title: 'Title Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'titleShadowColor',
          title: 'Title Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'description',   title: 'Description',   type: 'text', rows: 3 },
        {
          name: 'descriptionColor',
          title: 'Description Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'descriptionSize',
          title: 'Description Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'descriptionBorderEnabled',
          title: 'Description Border Enabled',
          type: 'boolean',
        },
        {
          name: 'descriptionBorderColor',
          title: 'Description Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
              { title: 'Red', value: '#ff0000' },
              { title: 'Blue', value: '#0000ff' },
              { title: 'Green', value: '#00ff00' },
            ],
          },
        },
        {
          name: 'descriptionBorderWidth',
          title: 'Description Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'descriptionShadowColor',
          title: 'Description Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        cmsImageField('heroImageUrl', 'Hero Image'),
        {
          name: 'stats',
          title: 'Hero Stats',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              ...styledTextFields('value', 'Value'),
              ...styledTextFields('label', 'Label'),
            ],
          }],
        },
        {
          name: 'ctaButtons',
          title: 'CTA Buttons',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              ...styledTextFields('text', 'Button Text'),
              {name: 'href', title: 'Link', type: 'string'},
            ],
          }],
        },
        {
          name: 'borderEnabled',
          title: 'Enable Border',
          type: 'boolean',
        },
        {
          name: 'borderColor',
          title: 'Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'border-gray-900' },
              { title: 'Primary', value: 'border-primary' },
              { title: 'White', value: 'border-white' },
              { title: 'Gray', value: 'border-gray-300' },
            ],
          },
        },
        {
          name: 'borderWidth',
          title: 'Border Width',
          type: 'string',
          options: {
            list: [
              { title: 'Thin', value: 'border' },
              { title: 'Medium', value: 'border-2' },
              { title: 'Thick', value: 'border-4' },
            ],
          },
        },
      ],
    },

    // 2. INTRO STRIP
    {
      name: 'introStripSection', title: '2 · Intro Strip', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'quote', title: 'Quote', type: 'text', rows: 2 },
        {
          name: 'quoteColor',
          title: 'Quote Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'quoteSize',
          title: 'Quote Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'quoteBorderEnabled',
          title: 'Quote Border Enabled',
          type: 'boolean',
        },
        {
          name: 'quoteBorderColor',
          title: 'Quote Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'quoteBorderWidth',
          title: 'Quote Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'quoteShadowColor',
          title: 'Quote Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        {
          name: 'counters', title: 'Counters', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'valueColor',
              title: 'Value Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: 'text-gray-900' },
                  { title: 'Primary', value: 'text-primary' },
                  { title: 'White', value: 'text-white' },
                  { title: 'Gray', value: 'text-gray-600' },
                ],
              },
            },
            { name: 'valueSize',
              title: 'Value Font Size (1-7)',
              type: 'string',
              options: {
                list: [
                  { title: '1 (12px)', value: '1' },
                  { title: '2 (16px)', value: '2' },
                  { title: '3 (20px)', value: '3' },
                  { title: '4 (24px)', value: '4' },
                  { title: '5 (32px)', value: '5' },
                  { title: '6 (48px)', value: '6' },
                  { title: '7 (70px)', value: '7' },
                ],
              },
            },
            { name: 'valueBorderEnabled',
              title: 'Value Border Enabled',
              type: 'boolean',
            },
            { name: 'valueBorderColor',
              title: 'Value Border Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: '#000000' },
                  { title: 'Primary', value: '#0066cc' },
                  { title: 'White', value: '#ffffff' },
                  { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
                ],
              },
            },
            { name: 'valueBorderWidth',
              title: 'Value Border Width (px)',
              type: 'string',
              options: {
                list: [
                  { title: '1px', value: '1px' },
                  { title: '2px', value: '2px' },
                  { title: '3px', value: '3px' },
                  { title: '4px', value: '4px' },
                  { title: '5px', value: '5px' },
                ],
              },
            },
            { name: 'valueShadowColor',
              title: 'Value Shadow Color',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: '' },
                  { title: 'Black', value: 'rgba(0,0,0,0.5)' },
                  { title: 'White', value: 'rgba(255,255,255,0.8)' },
                  { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
                ],
              },
            },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor',
              title: 'Label Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: 'text-gray-900' },
                  { title: 'Primary', value: 'text-primary' },
                  { title: 'White', value: 'text-white' },
                  { title: 'Gray', value: 'text-gray-600' },
                ],
              },
            },
            { name: 'labelSize',
              title: 'Label Font Size (1-7)',
              type: 'string',
              options: {
                list: [
                  { title: '1 (12px)', value: '1' },
                  { title: '2 (16px)', value: '2' },
                  { title: '3 (20px)', value: '3' },
                  { title: '4 (24px)', value: '4' },
                  { title: '5 (32px)', value: '5' },
                  { title: '6 (48px)', value: '6' },
                  { title: '7 (70px)', value: '7' },
                ],
              },
            },
            { name: 'labelBorderEnabled',
              title: 'Label Border Enabled',
              type: 'boolean',
            },
            { name: 'labelBorderColor',
              title: 'Label Border Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: '#000000' },
                  { title: 'Primary', value: '#0066cc' },
                  { title: 'White', value: '#ffffff' },
                  { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
                ],
              },
            },
            { name: 'labelBorderWidth',
              title: 'Label Border Width (px)',
              type: 'string',
              options: {
                list: [
                  { title: '1px', value: '1px' },
                  { title: '2px', value: '2px' },
                  { title: '3px', value: '3px' },
                  { title: '4px', value: '4px' },
                  { title: '5px', value: '5px' },
                ],
              },
            },
            { name: 'labelShadowColor',
              title: 'Label Shadow Color',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: '' },
                  { title: 'Black', value: 'rgba(0,0,0,0.5)' },
                  { title: 'White', value: 'rgba(255,255,255,0.8)' },
                  { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
                ],
              },
            },
          ]}],
        },
      ],
    },

    // 3. VALUES (Vision, Mission, Goals)
    {
      name: 'valuesSection', title: '3 · Values', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',     title: 'Heading',     type: 'string' },
        {
          name: 'headingColor',
          title: 'Heading Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'headingSize',
          title: 'Heading Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'headingBorderEnabled',
          title: 'Heading Border Enabled',
          type: 'boolean',
        },
        {
          name: 'headingBorderColor',
          title: 'Heading Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'headingBorderWidth',
          title: 'Heading Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'headingShadowColor',
          title: 'Heading Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'whatWeOffer', title: 'What We Offer', type: 'text', rows: 4 },
        {
          name: 'whatWeOfferColor',
          title: 'What We Offer Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'whatWeOfferSize',
          title: 'What We Offer Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'whatWeOfferBorderEnabled',
          title: 'What We Offer Border Enabled',
          type: 'boolean',
        },
        {
          name: 'whatWeOfferBorderColor',
          title: 'What We Offer Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'whatWeOfferBorderWidth',
          title: 'What We Offer Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'whatWeOfferShadowColor',
          title: 'What We Offer Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'ctaText',     title: 'CTA Text',    type: 'string' },
        {
          name: 'ctaTextColor',
          title: 'CTA Text Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'ctaTextSize',
          title: 'CTA Text Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'ctaTextBorderEnabled',
          title: 'CTA Text Border Enabled',
          type: 'boolean',
        },
        {
          name: 'ctaTextBorderColor',
          title: 'CTA Text Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'ctaTextBorderWidth',
          title: 'CTA Text Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'ctaTextShadowColor',
          title: 'CTA Text Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'ctaLink',     title: 'CTA Link',    type: 'string' },
        { name: 'imageUrl',    title: 'Image',       type: 'image', options: { hotspot: true } },
        {
          name: 'values', title: 'Values (Vision, Mission, Goals)', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'title',   title: 'Title',   type: 'string' },
            {
              name: 'titleColor',
              title: 'Title Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: 'text-gray-900' },
                  { title: 'Primary', value: 'text-primary' },
                  { title: 'White', value: 'text-white' },
                  { title: 'Gray', value: 'text-gray-600' },
                ],
              },
            },
            {
              name: 'titleSize',
              title: 'Title Font Size (1-7)',
              type: 'string',
              options: {
                list: [
                  { title: '1 (12px)', value: '1' },
                  { title: '2 (16px)', value: '2' },
                  { title: '3 (20px)', value: '3' },
                  { title: '4 (24px)', value: '4' },
                  { title: '5 (32px)', value: '5' },
                  { title: '6 (48px)', value: '6' },
                  { title: '7 (70px)', value: '7' },
                ],
              },
            },
            {
              name: 'titleBorderEnabled',
              title: 'Title Border Enabled',
              type: 'boolean',
            },
            {
              name: 'titleBorderColor',
              title: 'Title Border Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: '#000000' },
                  { title: 'Primary', value: '#0066cc' },
                  { title: 'White', value: '#ffffff' },
                  { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
                ],
              },
            },
            {
              name: 'titleBorderWidth',
              title: 'Title Border Width (px)',
              type: 'string',
              options: {
                list: [
                  { title: '1px', value: '1px' },
                  { title: '2px', value: '2px' },
                  { title: '3px', value: '3px' },
                  { title: '4px', value: '4px' },
                  { title: '5px', value: '5px' },
                ],
              },
            },
            {
              name: 'titleShadowColor',
              title: 'Title Shadow Color',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: '' },
                  { title: 'Black', value: 'rgba(0,0,0,0.5)' },
                  { title: 'White', value: 'rgba(255,255,255,0.8)' },
                  { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
                ],
              },
            },
            { name: 'content', title: 'Content', type: 'text', rows: 4 },
            {
              name: 'contentColor',
              title: 'Content Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: 'text-gray-900' },
                  { title: 'Primary', value: 'text-primary' },
                  { title: 'White', value: 'text-white' },
                  { title: 'Gray', value: 'text-gray-600' },
                ],
              },
            },
            {
              name: 'contentSize',
              title: 'Content Font Size (1-7)',
              type: 'string',
              options: {
                list: [
                  { title: '1 (12px)', value: '1' },
                  { title: '2 (16px)', value: '2' },
                  { title: '3 (20px)', value: '3' },
                  { title: '4 (24px)', value: '4' },
                  { title: '5 (32px)', value: '5' },
                  { title: '6 (48px)', value: '6' },
                  { title: '7 (70px)', value: '7' },
                ],
              },
            },
            {
              name: 'contentBorderEnabled',
              title: 'Content Border Enabled',
              type: 'boolean',
            },
            {
              name: 'contentBorderColor',
              title: 'Content Border Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: '#000000' },
                  { title: 'Primary', value: '#0066cc' },
                  { title: 'White', value: '#ffffff' },
                  { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
                ],
              },
            },
            {
              name: 'contentBorderWidth',
              title: 'Content Border Width (px)',
              type: 'string',
              options: {
                list: [
                  { title: '1px', value: '1px' },
                  { title: '2px', value: '2px' },
                  { title: '3px', value: '3px' },
                  { title: '4px', value: '4px' },
                  { title: '5px', value: '5px' },
                ],
              },
            },
            {
              name: 'contentShadowColor',
              title: 'Content Shadow Color',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: '' },
                  { title: 'Black', value: 'rgba(0,0,0,0.5)' },
                  { title: 'White', value: 'rgba(255,255,255,0.8)' },
                  { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
                ],
              },
            },
          ]}],
        },
      ],
    },

    // 4. SAFETY
    {
      name: 'safetySection', title: '4 · Safety', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',        title: 'Heading',        type: 'string' },
        {
          name: 'headingColor',
          title: 'Heading Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'headingSize',
          title: 'Heading Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'headingBorderEnabled',
          title: 'Heading Border Enabled',
          type: 'boolean',
        },
        {
          name: 'headingBorderColor',
          title: 'Heading Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'headingBorderWidth',
          title: 'Heading Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'headingShadowColor',
          title: 'Heading Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'content',        title: 'Content',        type: 'text', rows: 8 },
        {
          name: 'contentColor',
          title: 'Content Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'contentSize',
          title: 'Content Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'contentBorderEnabled',
          title: 'Content Border Enabled',
          type: 'boolean',
        },
        {
          name: 'contentBorderColor',
          title: 'Content Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'contentBorderWidth',
          title: 'Content Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'contentShadowColor',
          title: 'Content Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'safetyImageUrl', title: 'Safety Image',   type: 'image', options: { hotspot: true } },
        {
          name: 'certificationCards', title: 'Certification Cards', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'name', title: 'Name (e.g. WAHVA, ISO 9001)', type: 'string' },
            { name: 'label', title: 'Description Label', type: 'string' },
          ]}],
        },
      ],
    },

    // 5. CORE VALUES
    {
      name: 'coreValuesSection', title: '5 · Core Values', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',    type: 'string' },
        {
          name: 'headingColor',
          title: 'Heading Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'headingSize',
          title: 'Heading Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'headingBorderEnabled',
          title: 'Heading Border Enabled',
          type: 'boolean',
        },
        {
          name: 'headingBorderColor',
          title: 'Heading Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'headingBorderWidth',
          title: 'Heading Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'headingShadowColor',
          title: 'Heading Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'subheading', title: 'Subheading', type: 'string' },
        {
          name: 'subheadingColor',
          title: 'Subheading Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'subheadingSize',
          title: 'Subheading Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'subheadingBorderEnabled',
          title: 'Subheading Border Enabled',
          type: 'boolean',
        },
        {
          name: 'subheadingBorderColor',
          title: 'Subheading Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'subheadingBorderWidth',
          title: 'Subheading Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'subheadingShadowColor',
          title: 'Subheading Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'imageUrl',   title: 'Image',      type: 'image', options: { hotspot: true } },
        {
          name: 'values', title: 'Core Values', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'title',       title: 'Title',       type: 'string' },
            {
              name: 'titleColor',
              title: 'Title Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: 'text-gray-900' },
                  { title: 'Primary', value: 'text-primary' },
                  { title: 'White', value: 'text-white' },
                  { title: 'Gray', value: 'text-gray-600' },
                ],
              },
            },
            {
              name: 'titleSize',
              title: 'Title Font Size (1-7)',
              type: 'string',
              options: {
                list: [
                  { title: '1 (12px)', value: '1' },
                  { title: '2 (16px)', value: '2' },
                  { title: '3 (20px)', value: '3' },
                  { title: '4 (24px)', value: '4' },
                  { title: '5 (32px)', value: '5' },
                  { title: '6 (48px)', value: '6' },
                  { title: '7 (70px)', value: '7' },
                ],
              },
            },
            {
              name: 'titleBorderEnabled',
              title: 'Title Border Enabled',
              type: 'boolean',
            },
            {
              name: 'titleBorderColor',
              title: 'Title Border Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: '#000000' },
                  { title: 'Primary', value: '#0066cc' },
                  { title: 'White', value: '#ffffff' },
                  { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
                ],
              },
            },
            {
              name: 'titleBorderWidth',
              title: 'Title Border Width (px)',
              type: 'string',
              options: {
                list: [
                  { title: '1px', value: '1px' },
                  { title: '2px', value: '2px' },
                  { title: '3px', value: '3px' },
                  { title: '4px', value: '4px' },
                  { title: '5px', value: '5px' },
                ],
              },
            },
            {
              name: 'titleShadowColor',
              title: 'Title Shadow Color',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: '' },
                  { title: 'Black', value: 'rgba(0,0,0,0.5)' },
                  { title: 'White', value: 'rgba(255,255,255,0.8)' },
                  { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
                ],
              },
            },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            {
              name: 'descriptionColor',
              title: 'Description Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: 'text-gray-900' },
                  { title: 'Primary', value: 'text-primary' },
                  { title: 'White', value: 'text-white' },
                  { title: 'Gray', value: 'text-gray-600' },
                ],
              },
            },
            {
              name: 'descriptionSize',
              title: 'Description Font Size (1-7)',
              type: 'string',
              options: {
                list: [
                  { title: '1 (12px)', value: '1' },
                  { title: '2 (16px)', value: '2' },
                  { title: '3 (20px)', value: '3' },
                  { title: '4 (24px)', value: '4' },
                  { title: '5 (32px)', value: '5' },
                  { title: '6 (48px)', value: '6' },
                  { title: '7 (70px)', value: '7' },
                ],
              },
            },
            {
              name: 'descriptionBorderEnabled',
              title: 'Description Border Enabled',
              type: 'boolean',
            },
            {
              name: 'descriptionBorderColor',
              title: 'Description Border Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: '#000000' },
                  { title: 'Primary', value: '#0066cc' },
                  { title: 'White', value: '#ffffff' },
                  { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
                ],
              },
            },
            {
              name: 'descriptionBorderWidth',
              title: 'Description Border Width (px)',
              type: 'string',
              options: {
                list: [
                  { title: '1px', value: '1px' },
                  { title: '2px', value: '2px' },
                  { title: '3px', value: '3px' },
                  { title: '4px', value: '4px' },
                  { title: '5px', value: '5px' },
                ],
              },
            },
            {
              name: 'descriptionShadowColor',
              title: 'Description Shadow Color',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: '' },
                  { title: 'Black', value: 'rgba(0,0,0,0.5)' },
                  { title: 'White', value: 'rgba(255,255,255,0.8)' },
                  { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
                ],
              },
            },
            { name: 'icon',        title: 'Icon',        type: 'string', description: 'shield, users, star, zap, etc.' },
          ]}],
        },
      ],
    },

    // 6. CULTURE
    {
      name: 'cultureSection', title: '6 · Culture', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',     title: 'Heading',     type: 'string' },
        {
          name: 'headingColor',
          title: 'Heading Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'headingSize',
          title: 'Heading Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'headingBorderEnabled',
          title: 'Heading Border Enabled',
          type: 'boolean',
        },
        {
          name: 'headingBorderColor',
          title: 'Heading Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'headingBorderWidth',
          title: 'Heading Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'headingShadowColor',
          title: 'Heading Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        {
          name: 'descriptionColor',
          title: 'Description Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'descriptionSize',
          title: 'Description Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'descriptionBorderEnabled',
          title: 'Description Border Enabled',
          type: 'boolean',
        },
        {
          name: 'descriptionBorderColor',
          title: 'Description Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'descriptionBorderWidth',
          title: 'Description Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'descriptionShadowColor',
          title: 'Description Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'imageUrl',    title: 'Image',       type: 'image', options: { hotspot: true } },
        {
          name: 'cultureItems', title: 'Culture Items', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'title',       title: 'Title',       type: 'string' },
            {
              name: 'titleColor',
              title: 'Title Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: 'text-gray-900' },
                  { title: 'Primary', value: 'text-primary' },
                  { title: 'White', value: 'text-white' },
                  { title: 'Gray', value: 'text-gray-600' },
                ],
              },
            },
            {
              name: 'titleSize',
              title: 'Title Font Size (1-7)',
              type: 'string',
              options: {
                list: [
                  { title: '1 (12px)', value: '1' },
                  { title: '2 (16px)', value: '2' },
                  { title: '3 (20px)', value: '3' },
                  { title: '4 (24px)', value: '4' },
                  { title: '5 (32px)', value: '5' },
                  { title: '6 (48px)', value: '6' },
                  { title: '7 (70px)', value: '7' },
                ],
              },
            },
            {
              name: 'titleBorderEnabled',
              title: 'Title Border Enabled',
              type: 'boolean',
            },
            {
              name: 'titleBorderColor',
              title: 'Title Border Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: '#000000' },
                  { title: 'Primary', value: '#0066cc' },
                  { title: 'White', value: '#ffffff' },
                  { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
                ],
              },
            },
            {
              name: 'titleBorderWidth',
              title: 'Title Border Width (px)',
              type: 'string',
              options: {
                list: [
                  { title: '1px', value: '1px' },
                  { title: '2px', value: '2px' },
                  { title: '3px', value: '3px' },
                  { title: '4px', value: '4px' },
                  { title: '5px', value: '5px' },
                ],
              },
            },
            {
              name: 'titleShadowColor',
              title: 'Title Shadow Color',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: '' },
                  { title: 'Black', value: 'rgba(0,0,0,0.5)' },
                  { title: 'White', value: 'rgba(255,255,255,0.8)' },
                  { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
                ],
              },
            },
            { name: 'content',     title: 'Content',     type: 'text', rows: 3 },
            {
              name: 'contentColor',
              title: 'Content Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: 'text-gray-900' },
                  { title: 'Primary', value: 'text-primary' },
                  { title: 'White', value: 'text-white' },
                  { title: 'Gray', value: 'text-gray-600' },
                ],
              },
            },
            {
              name: 'contentSize',
              title: 'Content Font Size (1-7)',
              type: 'string',
              options: {
                list: [
                  { title: '1 (12px)', value: '1' },
                  { title: '2 (16px)', value: '2' },
                  { title: '3 (20px)', value: '3' },
                  { title: '4 (24px)', value: '4' },
                  { title: '5 (32px)', value: '5' },
                  { title: '6 (48px)', value: '6' },
                  { title: '7 (70px)', value: '7' },
                ],
              },
            },
            {
              name: 'contentBorderEnabled',
              title: 'Content Border Enabled',
              type: 'boolean',
            },
            {
              name: 'contentBorderColor',
              title: 'Content Border Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: '#000000' },
                  { title: 'Primary', value: '#0066cc' },
                  { title: 'White', value: '#ffffff' },
                  { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
                ],
              },
            },
            {
              name: 'contentBorderWidth',
              title: 'Content Border Width (px)',
              type: 'string',
              options: {
                list: [
                  { title: '1px', value: '1px' },
                  { title: '2px', value: '2px' },
                  { title: '3px', value: '3px' },
                  { title: '4px', value: '4px' },
                  { title: '5px', value: '5px' },
                ],
              },
            },
            {
              name: 'contentShadowColor',
              title: 'Content Shadow Color',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: '' },
                  { title: 'Black', value: 'rgba(0,0,0,0.5)' },
                  { title: 'White', value: 'rgba(255,255,255,0.8)' },
                  { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
                ],
              },
            },
            { name: 'ctaText',     title: 'CTA Text',    type: 'string' },
            {
              name: 'ctaTextColor',
              title: 'CTA Text Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: 'text-gray-900' },
                  { title: 'Primary', value: 'text-primary' },
                  { title: 'White', value: 'text-white' },
                  { title: 'Gray', value: 'text-gray-600' },
                ],
              },
            },
            {
              name: 'ctaTextSize',
              title: 'CTA Text Font Size (1-7)',
              type: 'string',
              options: {
                list: [
                  { title: '1 (12px)', value: '1' },
                  { title: '2 (16px)', value: '2' },
                  { title: '3 (20px)', value: '3' },
                  { title: '4 (24px)', value: '4' },
                  { title: '5 (32px)', value: '5' },
                  { title: '6 (48px)', value: '6' },
                  { title: '7 (70px)', value: '7' },
                ],
              },
            },
            {
              name: 'ctaTextBorderEnabled',
              title: 'CTA Text Border Enabled',
              type: 'boolean',
            },
            {
              name: 'ctaTextBorderColor',
              title: 'CTA Text Border Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: '#000000' },
                  { title: 'Primary', value: '#0066cc' },
                  { title: 'White', value: '#ffffff' },
                  { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
                ],
              },
            },
            {
              name: 'ctaTextBorderWidth',
              title: 'CTA Text Border Width (px)',
              type: 'string',
              options: {
                list: [
                  { title: '1px', value: '1px' },
                  { title: '2px', value: '2px' },
                  { title: '3px', value: '3px' },
                  { title: '4px', value: '4px' },
                  { title: '5px', value: '5px' },
                ],
              },
            },
            {
              name: 'ctaTextShadowColor',
              title: 'CTA Text Shadow Color',
              type: 'string',
              options: {
                list: [
                  { title: 'None', value: '' },
                  { title: 'Black', value: 'rgba(0,0,0,0.5)' },
                  { title: 'White', value: 'rgba(255,255,255,0.8)' },
                  { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
                ],
              },
            },
            { name: 'ctaLink',     title: 'CTA Link',    type: 'string' },
            { name: 'imageUrl',    title: 'Image',       type: 'image', options: { hotspot: true } },
          ]}],
        },
      ],
    },

    // 7. STORY
    {
      name: 'storySection', title: '7 · Story', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'tagline',     title: 'Tagline',     type: 'string' },
        {
          name: 'taglineColor',
          title: 'Tagline Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'taglineSize',
          title: 'Tagline Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'taglineBorderEnabled',
          title: 'Tagline Border Enabled',
          type: 'boolean',
        },
        {
          name: 'taglineBorderColor',
          title: 'Tagline Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'taglineBorderWidth',
          title: 'Tagline Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'taglineShadowColor',
          title: 'Tagline Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'heading',     title: 'Heading',     type: 'string' },
        {
          name: 'headingColor',
          title: 'Heading Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'headingSize',
          title: 'Heading Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'headingBorderEnabled',
          title: 'Heading Border Enabled',
          type: 'boolean',
        },
        {
          name: 'headingBorderColor',
          title: 'Heading Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'headingBorderWidth',
          title: 'Heading Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'headingShadowColor',
          title: 'Heading Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'body',        title: 'Body Text',   type: 'text', rows: 6 },
        {
          name: 'bodyColor',
          title: 'Body Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'bodySize',
          title: 'Body Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'bodyBorderEnabled',
          title: 'Body Border Enabled',
          type: 'boolean',
        },
        {
          name: 'bodyBorderColor',
          title: 'Body Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'bodyBorderWidth',
          title: 'Body Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'bodyShadowColor',
          title: 'Body Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'image1Url',   title: 'Image 1',     type: 'image', options: { hotspot: true } },
        { name: 'image2Url',   title: 'Image 2',     type: 'image', options: { hotspot: true } },
        { name: 'stat1Value',  title: 'Stat 1 Value', type: 'string' },
        {
          name: 'stat1ValueColor',
          title: 'Stat 1 Value Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'stat1ValueSize',
          title: 'Stat 1 Value Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'stat1ValueBorderEnabled',
          title: 'Stat 1 Value Border Enabled',
          type: 'boolean',
        },
        {
          name: 'stat1ValueBorderColor',
          title: 'Stat 1 Value Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'stat1ValueBorderWidth',
          title: 'Stat 1 Value Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'stat1ValueShadowColor',
          title: 'Stat 1 Value Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'stat1Label',  title: 'Stat 1 Label', type: 'string' },
        {
          name: 'stat1LabelColor',
          title: 'Stat 1 Label Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'stat1LabelSize',
          title: 'Stat 1 Label Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'stat1LabelBorderEnabled',
          title: 'Stat 1 Label Border Enabled',
          type: 'boolean',
        },
        {
          name: 'stat1LabelBorderColor',
          title: 'Stat 1 Label Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'stat1LabelBorderWidth',
          title: 'Stat 1 Label Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'stat1LabelShadowColor',
          title: 'Stat 1 Label Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'stat2Value',  title: 'Stat 2 Value', type: 'string' },
        {
          name: 'stat2ValueColor',
          title: 'Stat 2 Value Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'stat2ValueSize',
          title: 'Stat 2 Value Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'stat2ValueBorderEnabled',
          title: 'Stat 2 Value Border Enabled',
          type: 'boolean',
        },
        {
          name: 'stat2ValueBorderColor',
          title: 'Stat 2 Value Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'stat2ValueBorderWidth',
          title: 'Stat 2 Value Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'stat2ValueShadowColor',
          title: 'Stat 2 Value Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'stat2Label',  title: 'Stat 2 Label', type: 'string' },
        {
          name: 'stat2LabelColor',
          title: 'Stat 2 Label Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'stat2LabelSize',
          title: 'Stat 2 Label Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'stat2LabelBorderEnabled',
          title: 'Stat 2 Label Border Enabled',
          type: 'boolean',
        },
        {
          name: 'stat2LabelBorderColor',
          title: 'Stat 2 Label Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'stat2LabelBorderWidth',
          title: 'Stat 2 Label Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'stat2LabelShadowColor',
          title: 'Stat 2 Label Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        {
          name: 'keyPoints', title: 'Key Points', type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },

    // 8. HOW WE WORK
    {
      name: 'howWeWorkSection', title: '8 · How We Work', type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        ...styledTextFields('eyebrow', 'Eyebrow'),
        ...styledTextFields('heading', 'Heading'),
        ...styledTextFields('subheading', 'Subheading', 'text', {rows: 2}),
        {
          name: 'steps', title: 'Steps', type: 'array',
          of: [{
            type: 'object',
            fields: [
              ...styledTextFields('step', 'Step Number'),
              ...styledTextFields('title', 'Title'),
              ...styledTextFields('description', 'Description', 'text', {rows: 3}),
              cmsImageField('imageUrl', 'Image'),
            ],
          }],
        },
      ],
    },

    // 9. BUSINESS AREAS
    {
      name: 'businessAreasSection', title: '9 · Business Areas', type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        ...styledTextFields('eyebrow', 'Eyebrow'),
        ...styledTextFields('heading', 'Heading'),
        ...styledTextFields('subheading', 'Subheading', 'text', {rows: 2}),
        ...styledTextFields('linkLabel', 'Card Link Label'),
        {
          name: 'areas', title: 'Business Areas', type: 'array',
          of: [{
            type: 'object',
            fields: [
              ...styledTextFields('title', 'Title'),
              ...styledTextFields('description', 'Description', 'text', {rows: 3}),
              {name: 'icon', title: 'Icon', type: 'string'},
              {name: 'link', title: 'Link', type: 'string'},
              cmsImageField('imageUrl', 'Image'),
            ],
          }],
        },
      ],
    },

    // 10. EXCELLENCE
    {
      name: 'excellenceSection', title: '8 · Excellence', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',            title: 'Heading',            type: 'string' },
        {
          name: 'headingColor',
          title: 'Heading Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'headingSize',
          title: 'Heading Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'headingBorderEnabled',
          title: 'Heading Border Enabled',
          type: 'boolean',
        },
        {
          name: 'headingBorderColor',
          title: 'Heading Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'headingBorderWidth',
          title: 'Heading Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'headingShadowColor',
          title: 'Heading Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'content',            title: 'Content',            type: 'text', rows: 6 },
        {
          name: 'contentColor',
          title: 'Content Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'contentSize',
          title: 'Content Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'contentBorderEnabled',
          title: 'Content Border Enabled',
          type: 'boolean',
        },
        {
          name: 'contentBorderColor',
          title: 'Content Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'contentBorderWidth',
          title: 'Content Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'contentShadowColor',
          title: 'Content Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'ctaText',            title: 'CTA Text',           type: 'string' },
        {
          name: 'ctaTextColor',
          title: 'CTA Text Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'ctaTextSize',
          title: 'CTA Text Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'ctaTextBorderEnabled',
          title: 'CTA Text Border Enabled',
          type: 'boolean',
        },
        {
          name: 'ctaTextBorderColor',
          title: 'CTA Text Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'ctaTextBorderWidth',
          title: 'CTA Text Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'ctaTextShadowColor',
          title: 'CTA Text Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'ctaLink',            title: 'CTA Link',           type: 'string' },
        { name: 'secondaryCtaText',  title: 'Secondary CTA Text', type: 'string' },
        {
          name: 'secondaryCtaTextColor',
          title: 'Secondary CTA Text Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: 'text-gray-900' },
              { title: 'Primary', value: 'text-primary' },
              { title: 'White', value: 'text-white' },
              { title: 'Gray', value: 'text-gray-600' },
            ],
          },
        },
        {
          name: 'secondaryCtaTextSize',
          title: 'Secondary CTA Text Font Size (1-7)',
          type: 'string',
          options: {
            list: [
              { title: '1 (12px)', value: '1' },
              { title: '2 (16px)', value: '2' },
              { title: '3 (20px)', value: '3' },
              { title: '4 (24px)', value: '4' },
              { title: '5 (32px)', value: '5' },
              { title: '6 (48px)', value: '6' },
              { title: '7 (70px)', value: '7' },
            ],
          },
        },
        {
          name: 'secondaryCtaTextBorderEnabled',
          title: 'Secondary CTA Text Border Enabled',
          type: 'boolean',
        },
        {
          name: 'secondaryCtaTextBorderColor',
          title: 'Secondary CTA Text Border Color',
          type: 'string',
          options: {
            list: [
              { title: 'Black', value: '#000000' },
              { title: 'Primary', value: '#0066cc' },
              { title: 'White', value: '#ffffff' },
              { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' },
            ],
          },
        },
        {
          name: 'secondaryCtaTextBorderWidth',
          title: 'Secondary CTA Text Border Width (px)',
          type: 'string',
          options: {
            list: [
              { title: '1px', value: '1px' },
              { title: '2px', value: '2px' },
              { title: '3px', value: '3px' },
              { title: '4px', value: '4px' },
              { title: '5px', value: '5px' },
            ],
          },
        },
        {
          name: 'secondaryCtaTextShadowColor',
          title: 'Secondary CTA Text Shadow Color',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: '' },
              { title: 'Black', value: 'rgba(0,0,0,0.5)' },
              { title: 'White', value: 'rgba(255,255,255,0.8)' },
              { title: 'Primary', value: 'rgba(0,102,204,0.5)' },
            ],
          },
        },
        { name: 'secondaryCtaLink',  title: 'Secondary CTA Link', type: 'string' },
        { name: 'excellenceBgUrl',    title: 'Background Image',   type: 'image', options: { hotspot: true } },
      ],
    },

    // 11. CTA BANNER
    {
      name: 'ctaBanner', title: '11 · CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        ...styledTextFields('heading', 'Heading'),
        ...styledTextFields('text', 'Body Text', 'text', {rows: 2}),
        ...styledTextFields('buttonText', 'Button Text'),
        { name: 'buttonLink', title: 'Button Link',  type: 'string' },
        ...styledTextFields('phone', 'Phone'),
        ...styledTextFields('email', 'Email'),
        ...styledTextFields('address', 'Address'),
      ],
    },
  ],
}

// ─── Services Page ────────────────────────────────────────────────────────────────
const servicesPage = {
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    {
      name: 'heroSection', title: '1 · Hero', type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'subtitleColor', title: 'Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subtitleSize', title: 'Subtitle Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subtitleBorderEnabled', title: 'Subtitle Border Enabled', type: 'boolean' },
        { name: 'subtitleBorderColor', title: 'Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subtitleBorderWidth', title: 'Subtitle Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subtitleShadowColor', title: 'Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
        { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heroImageUrl',  title: 'Hero Image', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'servicesSection', title: '2 · Services Showcase', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'subheading', title: 'Subheading', type: 'string' },
        { name: 'subheadingColor', title: 'Subheading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subheadingSize', title: 'Subheading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subheadingBorderEnabled', title: 'Subheading Border Enabled', type: 'boolean' },
        { name: 'subheadingBorderColor', title: 'Subheading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subheadingBorderWidth', title: 'Subheading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subheadingShadowColor', title: 'Subheading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'services', title: 'Services', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'link', title: 'Link', type: 'string' },
            { name: 'imageUrl', title: 'Image', type: 'image', options: { hotspot: true } },
          ]}],
        },
      ],
    },
    {
      name: 'industriesGridSection', title: '3 · Industries Grid', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'sectionTag', title: 'Section Tag', type: 'string' },
        { name: 'sectionTagColor', title: 'Section Tag Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'sectionTagSize', title: 'Section Tag Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'sectionTagBorderEnabled', title: 'Section Tag Border Enabled', type: 'boolean' },
        { name: 'sectionTagBorderColor', title: 'Section Tag Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'sectionTagBorderWidth', title: 'Section Tag Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'sectionTagShadowColor', title: 'Section Tag Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'industries', title: 'Industries', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'id', title: 'Icon', type: 'string', options: { list: [{ title: 'Mining', value: 'mining' }, { title: 'Marine', value: 'marine' }, { title: 'Agriculture', value: 'agriculture' }, { title: 'Transportation', value: 'transport' }, { title: 'Fuel Retailers', value: 'retail' }, { title: 'Distribution', value: 'distribution' }] } },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'link', title: 'Link', type: 'string' },
          ]}],
        },
      ],
    },
    {
      name: 'statsSection', title: '4 · Stats Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'stats', title: 'Stats', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'valueColor', title: 'Value Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'valueSize', title: 'Value Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'valueBorderEnabled', title: 'Value Border Enabled', type: 'boolean' },
            { name: 'valueBorderColor', title: 'Value Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'valueBorderWidth', title: 'Value Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'valueShadowColor', title: 'Value Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'string' },
          ]}],
        },
      ],
    },
    {
      name: 'timelineSection', title: '4 · Timeline Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'subheading', title: 'Subheading', type: 'string' },
        { name: 'subheadingColor', title: 'Subheading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subheadingSize', title: 'Subheading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subheadingBorderEnabled', title: 'Subheading Border Enabled', type: 'boolean' },
        { name: 'subheadingBorderColor', title: 'Subheading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subheadingBorderWidth', title: 'Subheading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subheadingShadowColor', title: 'Subheading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'steps', title: 'Steps', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'step', title: 'Step Number', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },
    {
      name: 'doYouKnowSection', title: '5 · Do You Know Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 8 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'bunkerRefuelingSection', title: '6 · Bunker Refueling Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 8 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'ctaText', title: 'CTA Text', type: 'string' },
        { name: 'ctaTextColor', title: 'CTA Text Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'ctaTextSize', title: 'CTA Text Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'ctaTextBorderEnabled', title: 'CTA Text Border Enabled', type: 'boolean' },
        { name: 'ctaTextBorderColor', title: 'CTA Text Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'ctaTextBorderWidth', title: 'CTA Text Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'ctaTextShadowColor', title: 'CTA Text Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'imageUrl', title: 'Image', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'ownStationSection', title: '7 · Own Station Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 8 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTAText', title: 'Primary CTA Text', type: 'string' },
        { name: 'primaryCTAColor', title: 'Primary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'primaryCTASize', title: 'Primary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'primaryCTABorderEnabled', title: 'Primary CTA Border Enabled', type: 'boolean' },
        { name: 'primaryCTABorderColor', title: 'Primary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'primaryCTABorderWidth', title: 'Primary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'primaryCTAShadowColor', title: 'Primary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTALink', title: 'Primary CTA Link', type: 'string' },
        { name: 'secondaryCTAText', title: 'Secondary CTA Text', type: 'string' },
        { name: 'secondaryCTAColor', title: 'Secondary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'secondaryCTASize', title: 'Secondary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'secondaryCTABorderEnabled', title: 'Secondary CTA Border Enabled', type: 'boolean' },
        { name: 'secondaryCTABorderColor', title: 'Secondary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'secondaryCTABorderWidth', title: 'Secondary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'secondaryCTAShadowColor', title: 'Secondary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'secondaryCTALink', title: 'Secondary CTA Link', type: 'string' },
        { name: 'imageUrl', title: 'Image', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'sectorsCoverSection', title: '8 · Sectors Cover Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'sectors', title: 'Sectors', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'nameColor', title: 'Name Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'nameSize', title: 'Name Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'nameBorderEnabled', title: 'Name Border Enabled', type: 'boolean' },
            { name: 'nameBorderColor', title: 'Name Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'nameBorderWidth', title: 'Name Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'nameShadowColor', title: 'Name Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'imageUrl', title: 'Image', type: 'image', options: { hotspot: true } },
          ]}],
        },
      ],
    },
    {
      name: 'ctaBanner', title: '9 · CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text', rows: 2 },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

// ─── Mining Fuel Page ─────────────────────────────────────────────────────────────
const miningFuelPage = {
  name: 'miningFuelPage',
  title: 'Mining Fuel Page',
  type: 'document',
  fields: [
    {
      name: 'heroSection', title: '1 · Hero Section', type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'subtitleColor', title: 'Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subtitleSize', title: 'Subtitle Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subtitleBorderEnabled', title: 'Subtitle Border Enabled', type: 'boolean' },
        { name: 'subtitleBorderColor', title: 'Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subtitleBorderWidth', title: 'Subtitle Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subtitleShadowColor', title: 'Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
        { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heroImageUrl',  title: 'Hero Image', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'featuresSection', title: '2 · Features Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
        { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'subtitleColor', title: 'Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subtitleSize', title: 'Subtitle Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subtitleBorderEnabled', title: 'Subtitle Border Enabled', type: 'boolean' },
        { name: 'subtitleBorderColor', title: 'Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subtitleBorderWidth', title: 'Subtitle Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subtitleShadowColor', title: 'Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'features', title: 'Features', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'icon', title: 'Icon', type: 'string', description: 'remote, bulk, onsite, emergency' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },
    {
      name: 'miningSectorSection', title: '3 · Mining Sector Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 8 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'statsSection', title: '4 · Stats Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'stats', title: 'Stats', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'valueColor', title: 'Value Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'valueSize', title: 'Value Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'valueBorderEnabled', title: 'Value Border Enabled', type: 'boolean' },
            { name: 'valueBorderColor', title: 'Value Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'valueBorderWidth', title: 'Value Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'valueShadowColor', title: 'Value Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'suffix', title: 'Suffix', type: 'string' },
            { name: 'prefix', title: 'Prefix', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'icon', title: 'Icon', type: 'string', description: 'drop, clock, support, mine' },
          ]}],
        },
      ],
    },
    {
      name: 'safetySection', title: '5 · Safety Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 8 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'complianceSection', title: '6 · Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'certifications', title: 'Certifications', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'nameColor', title: 'Name Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'nameSize', title: 'Name Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'nameBorderEnabled', title: 'Name Border Enabled', type: 'boolean' },
            { name: 'nameBorderColor', title: 'Name Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'nameBorderWidth', title: 'Name Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'nameShadowColor', title: 'Name Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },
    {
      name: 'fleetComplianceSection', title: '7 · Fleet Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'driversComplianceSection', title: '8 · Drivers Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'processTimelineSection', title: '9 · Process Timeline Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'subheading', title: 'Subheading', type: 'string' },
        { name: 'subheadingColor', title: 'Subheading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subheadingSize', title: 'Subheading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subheadingBorderEnabled', title: 'Subheading Border Enabled', type: 'boolean' },
        { name: 'subheadingBorderColor', title: 'Subheading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subheadingBorderWidth', title: 'Subheading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subheadingShadowColor', title: 'Subheading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'steps', title: 'Steps', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'step', title: 'Step Number', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'imageUrl', title: 'Image', type: 'image', options: { hotspot: true } },
          ]}],
        },
      ],
    },
    {
      name: 'enquireSection', title: '10 · Enquire Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTAText', title: 'Primary CTA Text', type: 'string' },
        { name: 'primaryCTAColor', title: 'Primary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'primaryCTASize', title: 'Primary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'primaryCTABorderEnabled', title: 'Primary CTA Border Enabled', type: 'boolean' },
        { name: 'primaryCTABorderColor', title: 'Primary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'primaryCTABorderWidth', title: 'Primary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'primaryCTAShadowColor', title: 'Primary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTALink', title: 'Primary CTA Link', type: 'string' },
        { name: 'secondaryCTAText', title: 'Secondary CTA Text', type: 'string' },
        { name: 'secondaryCTAColor', title: 'Secondary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'secondaryCTASize', title: 'Secondary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'secondaryCTABorderEnabled', title: 'Secondary CTA Border Enabled', type: 'boolean' },
        { name: 'secondaryCTABorderColor', title: 'Secondary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'secondaryCTABorderWidth', title: 'Secondary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'secondaryCTAShadowColor', title: 'Secondary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'secondaryCTALink', title: 'Secondary CTA Link', type: 'string' },
      ],
    },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

// ─── Marine Fuel Page ─────────────────────────────────────────────────────────────
const marineFuelPage = {
  name: 'marineFuelPage',
  title: 'Marine Fuel Page',
  type: 'document',
  fields: [
    {
      name: 'heroSection', title: '1 · Hero Section', type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'subtitleColor', title: 'Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subtitleSize', title: 'Subtitle Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subtitleBorderEnabled', title: 'Subtitle Border Enabled', type: 'boolean' },
        { name: 'subtitleBorderColor', title: 'Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subtitleBorderWidth', title: 'Subtitle Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subtitleShadowColor', title: 'Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
        { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heroImageUrl',  title: 'Hero Image', type: 'image', options: { hotspot: true } },
        {
          name: 'stats', title: 'Stats', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'valueColor', title: 'Value Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'valueSize', title: 'Value Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'valueBorderEnabled', title: 'Value Border Enabled', type: 'boolean' },
            { name: 'valueBorderColor', title: 'Value Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'valueBorderWidth', title: 'Value Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'valueShadowColor', title: 'Value Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },
    {
      name: 'featuresSection', title: '2 · Features Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'features', title: 'Features', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'icon', title: 'Icon', type: 'string', description: 'vessel, port, diesel, fleet' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'ctaText', title: 'CTA Text', type: 'string' },
            { name: 'ctaLink', title: 'CTA Link', type: 'string' },
          ]}],
        },
      ],
    },
    {
      name: 'introSection', title: '3 · Intro Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 6 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'imageUrl', title: 'Image', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'commercialSection', title: '4 · Commercial Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'tagline', title: 'Tagline', type: 'string' },
        { name: 'taglineColor', title: 'Tagline Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'taglineSize', title: 'Tagline Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'taglineBorderEnabled', title: 'Tagline Border Enabled', type: 'boolean' },
        { name: 'taglineBorderColor', title: 'Tagline Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'taglineBorderWidth', title: 'Tagline Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'taglineShadowColor', title: 'Tagline Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'ctaText', title: 'CTA Text', type: 'string' },
        { name: 'ctaLink', title: 'CTA Link', type: 'string' },
        { name: 'imageUrl', title: 'Image', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'complianceSection', title: '5 · Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'certifications', title: 'Certifications', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'nameColor', title: 'Name Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'nameSize', title: 'Name Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'nameBorderEnabled', title: 'Name Border Enabled', type: 'boolean' },
            { name: 'nameBorderColor', title: 'Name Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'nameBorderWidth', title: 'Name Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'nameShadowColor', title: 'Name Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },
    {
      name: 'fleetComplianceSection', title: '6 · Fleet Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'driversComplianceSection', title: '7 · Drivers Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'processTimelineSection', title: '8 · Process Timeline Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'subheading', title: 'Subheading', type: 'string' },
        { name: 'subheadingColor', title: 'Subheading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subheadingSize', title: 'Subheading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subheadingBorderEnabled', title: 'Subheading Border Enabled', type: 'boolean' },
        { name: 'subheadingBorderColor', title: 'Subheading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subheadingBorderWidth', title: 'Subheading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subheadingShadowColor', title: 'Subheading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'steps', title: 'Steps', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'step', title: 'Step Number', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'imageUrl', title: 'Image', type: 'image', options: { hotspot: true } },
          ]}],
        },
      ],
    },
    {
      name: 'enquireSection', title: '9 · Enquire Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTAText', title: 'Primary CTA Text', type: 'string' },
        { name: 'primaryCTAColor', title: 'Primary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'primaryCTASize', title: 'Primary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'primaryCTABorderEnabled', title: 'Primary CTA Border Enabled', type: 'boolean' },
        { name: 'primaryCTABorderColor', title: 'Primary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'primaryCTABorderWidth', title: 'Primary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'primaryCTAShadowColor', title: 'Primary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTALink', title: 'Primary CTA Link', type: 'string' },
        { name: 'secondaryCTAText', title: 'Secondary CTA Text', type: 'string' },
        { name: 'secondaryCTAColor', title: 'Secondary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'secondaryCTASize', title: 'Secondary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'secondaryCTABorderEnabled', title: 'Secondary CTA Border Enabled', type: 'boolean' },
        { name: 'secondaryCTABorderColor', title: 'Secondary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'secondaryCTABorderWidth', title: 'Secondary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'secondaryCTAShadowColor', title: 'Secondary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'secondaryCTALink', title: 'Secondary CTA Link', type: 'string' },
      ],
    },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

// ─── Agriculture Fuel Page ─────────────────────────────────────────────────────────────
const agricultureFuelPage = {
  name: 'agricultureFuelPage',
  title: 'Agriculture Fuel Page',
  type: 'document',
  fields: [
    {
      name: 'heroSection', title: '1 · Hero Section', type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'subtitleColor', title: 'Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subtitleSize', title: 'Subtitle Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subtitleBorderEnabled', title: 'Subtitle Border Enabled', type: 'boolean' },
        { name: 'subtitleBorderColor', title: 'Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subtitleBorderWidth', title: 'Subtitle Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subtitleShadowColor', title: 'Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
        { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heroImageUrl',  title: 'Hero Image', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'agricultureSection', title: '2 · Agriculture Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 8 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'featuresSection', title: '3 · Features Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
        { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'subtitleColor', title: 'Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subtitleSize', title: 'Subtitle Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subtitleBorderEnabled', title: 'Subtitle Border Enabled', type: 'boolean' },
        { name: 'subtitleBorderColor', title: 'Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subtitleBorderWidth', title: 'Subtitle Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subtitleShadowColor', title: 'Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'features', title: 'Features', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'icon', title: 'Icon', type: 'string', description: 'remote, bulk, onsite, emergency' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },
    {
      name: 'processTimelineSection', title: '4 · Process Timeline Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'subheading', title: 'Subheading', type: 'string' },
        { name: 'subheadingColor', title: 'Subheading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subheadingSize', title: 'Subheading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subheadingBorderEnabled', title: 'Subheading Border Enabled', type: 'boolean' },
        { name: 'subheadingBorderColor', title: 'Subheading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subheadingBorderWidth', title: 'Subheading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subheadingShadowColor', title: 'Subheading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'steps', title: 'Steps', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'step', title: 'Step Number', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'imageUrl', title: 'Image', type: 'image', options: { hotspot: true } },
          ]}],
        },
      ],
    },
    {
      name: 'excellenceSection', title: '5 · Excellence Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'tagline', title: 'Tagline', type: 'string' },
        { name: 'taglineColor', title: 'Tagline Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'taglineSize', title: 'Tagline Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'taglineBorderEnabled', title: 'Tagline Border Enabled', type: 'boolean' },
        { name: 'taglineBorderColor', title: 'Tagline Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'taglineBorderWidth', title: 'Tagline Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'taglineShadowColor', title: 'Tagline Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 6 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'ctaText', title: 'CTA Text', type: 'string' },
        { name: 'ctaLink', title: 'CTA Link', type: 'string' },
      ],
    },
    {
      name: 'equipmentGrowthSection', title: '6 · Equipment Growth Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'dieselHarvestsSection', title: '7 · Diesel Harvests Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'sustainableFuelingSection', title: '8 · Sustainable Fueling Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'ctaText', title: 'CTA Text', type: 'string' },
        { name: 'ctaLink', title: 'CTA Link', type: 'string' },
      ],
    },
    {
      name: 'safetySection', title: '9 · Safety Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 6 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'complianceSection', title: '10 · Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'certifications', title: 'Certifications', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'nameColor', title: 'Name Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'nameSize', title: 'Name Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'nameBorderEnabled', title: 'Name Border Enabled', type: 'boolean' },
            { name: 'nameBorderColor', title: 'Name Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'nameBorderWidth', title: 'Name Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'nameShadowColor', title: 'Name Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },
    {
      name: 'fleetComplianceSection', title: '11 · Fleet Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'driversComplianceSection', title: '12 · Drivers Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

// ─── Fuel Retailers Page ─────────────────────────────────────────────────────────────
const fuelRetailersPage = {
  name: 'fuelRetailersPage',
  title: 'Fuel Retailers Page',
  type: 'document',
  fields: [
    {
      name: 'retailerHeroSection', title: '1 · Retailer Hero Section', type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'subtitleColor', title: 'Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subtitleSize', title: 'Subtitle Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subtitleBorderEnabled', title: 'Subtitle Border Enabled', type: 'boolean' },
        { name: 'subtitleBorderColor', title: 'Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subtitleBorderWidth', title: 'Subtitle Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subtitleShadowColor', title: 'Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
        { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heroImageUrl',  title: 'Hero Image', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'supportSection', title: '2 · Support Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'ctaText', title: 'CTA Text', type: 'string' },
        { name: 'ctaLink', title: 'CTA Link', type: 'string' },
      ],
    },
    {
      name: 'featuresSection', title: '3 · Features Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
        { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'subtitleColor', title: 'Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subtitleSize', title: 'Subtitle Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subtitleBorderEnabled', title: 'Subtitle Border Enabled', type: 'boolean' },
        { name: 'subtitleBorderColor', title: 'Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subtitleBorderWidth', title: 'Subtitle Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subtitleShadowColor', title: 'Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'features', title: 'Features', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'icon', title: 'Icon', type: 'string', description: 'emergency, bulk, remote, onsite' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },
    {
      name: 'growthSection', title: '4 · Growth Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
        { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'ctaPrimaryText', title: 'Primary CTA Text', type: 'string' },
        { name: 'ctaPrimaryLink', title: 'Primary CTA Link', type: 'string' },
        { name: 'ctaSecondaryText', title: 'Secondary CTA Text', type: 'string' },
        { name: 'ctaSecondaryLink', title: 'Secondary CTA Link', type: 'string' },
        { name: 'imageUrl', title: 'Image', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'safetySection', title: '5 · Safety Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 6 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'complianceSection', title: '6 · Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'certifications', title: 'Certifications', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'nameColor', title: 'Name Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'nameSize', title: 'Name Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'nameBorderEnabled', title: 'Name Border Enabled', type: 'boolean' },
            { name: 'nameBorderColor', title: 'Name Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'nameBorderWidth', title: 'Name Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'nameShadowColor', title: 'Name Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },
    {
      name: 'fleetComplianceSection', title: '7 · Fleet Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'driversComplianceSection', title: '8 · Drivers Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'enquireSection', title: '9 · Enquire Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTAText', title: 'Primary CTA Text', type: 'string' },
        { name: 'primaryCTAColor', title: 'Primary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'primaryCTASize', title: 'Primary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'primaryCTABorderEnabled', title: 'Primary CTA Border Enabled', type: 'boolean' },
        { name: 'primaryCTABorderColor', title: 'Primary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'primaryCTABorderWidth', title: 'Primary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'primaryCTAShadowColor', title: 'Primary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTALink', title: 'Primary CTA Link', type: 'string' },
        { name: 'secondaryCTAText', title: 'Secondary CTA Text', type: 'string' },
        { name: 'secondaryCTAColor', title: 'Secondary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'secondaryCTASize', title: 'Secondary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'secondaryCTABorderEnabled', title: 'Secondary CTA Border Enabled', type: 'boolean' },
        { name: 'secondaryCTABorderColor', title: 'Secondary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'secondaryCTABorderWidth', title: 'Secondary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'secondaryCTAShadowColor', title: 'Secondary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'secondaryCTALink', title: 'Secondary CTA Link', type: 'string' },
      ],
    },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

// ─── Onsite Bulk Diesel Page ─────────────────────────────────────────────────────────────
const onsiteBulkDieselPage = {
  name: 'onsiteBulkDieselPage',
  title: 'Onsite Bulk Diesel Page',
  type: 'document',
  fields: [
    {
      name: 'heroSection', title: '1 · Hero Section', type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'subtitleColor', title: 'Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subtitleSize', title: 'Subtitle Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subtitleBorderEnabled', title: 'Subtitle Border Enabled', type: 'boolean' },
        { name: 'subtitleBorderColor', title: 'Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subtitleBorderWidth', title: 'Subtitle Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subtitleShadowColor', title: 'Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
        { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heroImageUrl',  title: 'Hero Image', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'featuresSection', title: '2 · Features Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
        { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'subtitleColor', title: 'Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subtitleSize', title: 'Subtitle Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subtitleBorderEnabled', title: 'Subtitle Border Enabled', type: 'boolean' },
        { name: 'subtitleBorderColor', title: 'Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subtitleBorderWidth', title: 'Subtitle Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subtitleShadowColor', title: 'Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'features', title: 'Features', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'icon', title: 'Icon', type: 'string', description: 'onsite, bulk, remote, emergency' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },
    {
      name: 'processTimelineSection', title: '3 · Process Timeline Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'subheading', title: 'Subheading', type: 'string' },
        { name: 'subheadingColor', title: 'Subheading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subheadingSize', title: 'Subheading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subheadingBorderEnabled', title: 'Subheading Border Enabled', type: 'boolean' },
        { name: 'subheadingBorderColor', title: 'Subheading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subheadingBorderWidth', title: 'Subheading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subheadingShadowColor', title: 'Subheading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'steps', title: 'Steps', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'step', title: 'Step Number', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'imageUrl', title: 'Image', type: 'image', options: { hotspot: true } },
          ]}],
        },
      ],
    },
    {
      name: 'safetySection', title: '4 · Safety Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 6 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'complianceSection', title: '5 · Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'certifications', title: 'Certifications', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'nameColor', title: 'Name Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'nameSize', title: 'Name Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'nameBorderEnabled', title: 'Name Border Enabled', type: 'boolean' },
            { name: 'nameBorderColor', title: 'Name Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'nameBorderWidth', title: 'Name Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'nameShadowColor', title: 'Name Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },
    {
      name: 'fleetComplianceSection', title: '6 · Fleet Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'driversComplianceSection', title: '7 · Drivers Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'enquireSection', title: '8 · Enquire Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTAText', title: 'Primary CTA Text', type: 'string' },
        { name: 'primaryCTAColor', title: 'Primary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'primaryCTASize', title: 'Primary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'primaryCTABorderEnabled', title: 'Primary CTA Border Enabled', type: 'boolean' },
        { name: 'primaryCTABorderColor', title: 'Primary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'primaryCTABorderWidth', title: 'Primary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'primaryCTAShadowColor', title: 'Primary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTALink', title: 'Primary CTA Link', type: 'string' },
        { name: 'secondaryCTAText', title: 'Secondary CTA Text', type: 'string' },
        { name: 'secondaryCTAColor', title: 'Secondary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'secondaryCTASize', title: 'Secondary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'secondaryCTABorderEnabled', title: 'Secondary CTA Border Enabled', type: 'boolean' },
        { name: 'secondaryCTABorderColor', title: 'Secondary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'secondaryCTABorderWidth', title: 'Secondary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'secondaryCTAShadowColor', title: 'Secondary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'secondaryCTALink', title: 'Secondary CTA Link', type: 'string' },
      ],
    },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

// ─── Local Fuel Distributors Page ─────────────────────────────────────────────────────────────
const localFuelDistributorsPage = {
  name: 'localFuelDistributorsPage',
  title: 'Local Fuel Distributors Page',
  type: 'document',
  fields: [
    {
      name: 'heroSection', title: '1 · Hero Section', type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'subtitleColor', title: 'Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subtitleSize', title: 'Subtitle Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subtitleBorderEnabled', title: 'Subtitle Border Enabled', type: 'boolean' },
        { name: 'subtitleBorderColor', title: 'Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subtitleBorderWidth', title: 'Subtitle Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subtitleShadowColor', title: 'Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
        { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
        { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'heroImageUrl',  title: 'Hero Image', type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'distributorSection', title: '2 · Distributor Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 6 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'featuresSection', title: '3 · Features Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
        { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'subtitleColor', title: 'Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subtitleSize', title: 'Subtitle Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subtitleBorderEnabled', title: 'Subtitle Border Enabled', type: 'boolean' },
        { name: 'subtitleBorderColor', title: 'Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subtitleBorderWidth', title: 'Subtitle Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subtitleShadowColor', title: 'Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'features', title: 'Features', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'icon', title: 'Icon', type: 'string', description: 'remote, bulk, onsite, emergency' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },
    {
      name: 'processTimelineSection', title: '4 · Process Timeline Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'subheading', title: 'Subheading', type: 'string' },
        { name: 'subheadingColor', title: 'Subheading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'subheadingSize', title: 'Subheading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'subheadingBorderEnabled', title: 'Subheading Border Enabled', type: 'boolean' },
        { name: 'subheadingBorderColor', title: 'Subheading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'subheadingBorderWidth', title: 'Subheading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'subheadingShadowColor', title: 'Subheading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'steps', title: 'Steps', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'step', title: 'Step Number', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'titleColor', title: 'Title Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'titleSize', title: 'Title Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'titleBorderEnabled', title: 'Title Border Enabled', type: 'boolean' },
            { name: 'titleBorderColor', title: 'Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'titleBorderWidth', title: 'Title Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'titleShadowColor', title: 'Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            { name: 'descriptionColor', title: 'Description Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'descriptionSize', title: 'Description Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'descriptionBorderEnabled', title: 'Description Border Enabled', type: 'boolean' },
            { name: 'descriptionBorderColor', title: 'Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'descriptionBorderWidth', title: 'Description Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'descriptionShadowColor', title: 'Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'imageUrl', title: 'Image', type: 'image', options: { hotspot: true } },
          ]}],
        },
      ],
    },
    {
      name: 'safetySection', title: '5 · Safety Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 6 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'complianceSection', title: '6 · Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        {
          name: 'certifications', title: 'Certifications', type: 'array',
          of: [{ type: 'object', fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'nameColor', title: 'Name Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'nameSize', title: 'Name Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'nameBorderEnabled', title: 'Name Border Enabled', type: 'boolean' },
            { name: 'nameBorderColor', title: 'Name Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'nameBorderWidth', title: 'Name Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'nameShadowColor', title: 'Name Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'labelColor', title: 'Label Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
            { name: 'labelSize', title: 'Label Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
            { name: 'labelBorderEnabled', title: 'Label Border Enabled', type: 'boolean' },
            { name: 'labelBorderColor', title: 'Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
            { name: 'labelBorderWidth', title: 'Label Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
            { name: 'labelShadowColor', title: 'Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
          ]}],
        },
      ],
    },
    {
      name: 'fleetComplianceSection', title: '7 · Fleet Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'driversComplianceSection', title: '8 · Drivers Compliance Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'content', title: 'Content', type: 'text', rows: 4 },
        { name: 'contentColor', title: 'Content Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'contentSize', title: 'Content Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'contentBorderEnabled', title: 'Content Border Enabled', type: 'boolean' },
        { name: 'contentBorderColor', title: 'Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'contentBorderWidth', title: 'Content Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'contentShadowColor', title: 'Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
      ],
    },
    {
      name: 'enquireSection', title: '9 · Enquire Section', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'headingSize', title: 'Heading Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'headingBorderEnabled', title: 'Heading Border Enabled', type: 'boolean' },
        { name: 'headingBorderColor', title: 'Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'headingBorderWidth', title: 'Heading Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'headingShadowColor', title: 'Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTAText', title: 'Primary CTA Text', type: 'string' },
        { name: 'primaryCTAColor', title: 'Primary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'primaryCTASize', title: 'Primary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'primaryCTABorderEnabled', title: 'Primary CTA Border Enabled', type: 'boolean' },
        { name: 'primaryCTABorderColor', title: 'Primary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'primaryCTABorderWidth', title: 'Primary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'primaryCTAShadowColor', title: 'Primary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'primaryCTALink', title: 'Primary CTA Link', type: 'string' },
        { name: 'secondaryCTAText', title: 'Secondary CTA Text', type: 'string' },
        { name: 'secondaryCTAColor', title: 'Secondary CTA Color', type: 'string', options: { list: [{ title: 'Black', value: 'text-gray-900' }, { title: 'Primary', value: 'text-primary' }, { title: 'White', value: 'text-white' }, { title: 'Gray', value: 'text-gray-600' }] } },
        { name: 'secondaryCTASize', title: 'Secondary CTA Font Size (1-7)', type: 'string', options: { list: [{ title: '1 (12px)', value: '1' }, { title: '2 (16px)', value: '2' }, { title: '3 (20px)', value: '3' }, { title: '4 (24px)', value: '4' }, { title: '5 (32px)', value: '5' }, { title: '6 (48px)', value: '6' }, { title: '7 (70px)', value: '7' }] } },
        { name: 'secondaryCTABorderEnabled', title: 'Secondary CTA Border Enabled', type: 'boolean' },
        { name: 'secondaryCTABorderColor', title: 'Secondary CTA Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
        { name: 'secondaryCTABorderWidth', title: 'Secondary CTA Border Width (px)', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }, { title: '4px', value: '4px' }, { title: '5px', value: '5px' }] } },
        { name: 'secondaryCTAShadowColor', title: 'Secondary CTA Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.5)' }, { title: 'White', value: 'rgba(255,255,255,0.8)' }, { title: 'Primary', value: 'rgba(0,102,204,0.5)' }] } },
        { name: 'secondaryCTALink', title: 'Secondary CTA Link', type: 'string' },
      ],
    },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

export const contactPage = {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. Hero Section', default: true },
    { name: 'info', title: '2. Contact Info' },
    { name: 'form', title: '3. Form Section' },
    { name: 'cta', title: '4. CTA Banner' },
  ],
  fields: [
    { name: 'heroTitle',  title: 'Hero Title', type: 'string' },
    { name: 'heroTitleColor',  title: 'Hero Title Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroTitleSize',  title: 'Hero Title Size', type: 'string', options: { list: [{ title: '48px', value: '48px' }, { title: '56px', value: '56px' }, { title: '64px', value: '64px' }, { title: '72px', value: '72px' }] } },
    { name: 'heroTitleBorderEnabled',  title: 'Hero Title Border Enabled', type: 'boolean' },
    { name: 'heroTitleBorderColor',  title: 'Hero Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroTitleBorderWidth',  title: 'Hero Title Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'heroTitleShadowColor',  title: 'Hero Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'heroDescription',  title: 'Hero Description', type: 'text' },
    { name: 'heroDescriptionColor',  title: 'Hero Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroDescriptionSize',  title: 'Hero Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'heroDescriptionBorderEnabled',  title: 'Hero Description Border Enabled', type: 'boolean' },
    { name: 'heroDescriptionBorderColor',  title: 'Hero Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroDescriptionBorderWidth',  title: 'Hero Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'heroDescriptionShadowColor',  title: 'Hero Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'heroImageUrl',  title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'address',  title: 'Address', type: 'string' },
    { name: 'phone',  title: 'Phone', type: 'string' },
    { name: 'email',  title: 'Email', type: 'string' },
    { name: 'weekdaysHours',  title: 'Weekdays Hours', type: 'string' },
    { name: 'saturdayHours',  title: 'Saturday Hours', type: 'string' },
    { name: 'sundayHours',  title: 'Sunday Hours', type: 'string' },
    { name: 'emergencySupport',  title: 'Emergency Support', type: 'string' },
    { name: 'formHeading', group: 'form', title: 'Form Heading', type: 'string' },
    { name: 'formHeadingColor', group: 'form', title: 'Form Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'formHeadingSize', group: 'form', title: 'Form Heading Size', type: 'string', options: { list: [{ title: '24px', value: '24px' }, { title: '30px', value: '30px' }, { title: '36px', value: '36px' }] } },
    { name: 'formHeadingBorderEnabled', group: 'form', title: 'Form Heading Border Enabled', type: 'boolean' },
    { name: 'formHeadingBorderColor', group: 'form', title: 'Form Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'formHeadingBorderWidth', group: 'form', title: 'Form Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'formHeadingShadowColor', group: 'form', title: 'Form Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'submitButtonText', group: 'form', title: 'Submit Button Text', type: 'string' },
    { name: 'successMessage', group: 'form', title: 'Success Message', type: 'text' },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

const fuelStationsFieldGroup = (fieldName) => {
  if (fieldName === 'ctaBanner') return 'cta'
  if (fieldName.startsWith('retailIntro')) return 'retailIntro'
  if (fieldName.startsWith('premium')) return 'premium'
  if (fieldName.startsWith('independent')) return 'independent'
  if (fieldName.startsWith('gallery')) return 'gallery'
  if (fieldName.startsWith('service')) return 'service'
  if (fieldName.startsWith('fuelTypes')) return 'products'
  if (fieldName.startsWith('stats')) return 'stats'
  if (fieldName.startsWith('diesel')) return 'diesel'
  if (fieldName.startsWith('features')) return 'features'
  if (fieldName.startsWith('excellence')) return 'excellence'
  return 'hero'
}

export const fuelStationsPage = {
  name: 'fuelStationsPage',
  title: 'Fuel Stations Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. Hero Section', default: true },
    { name: 'retailIntro', title: '2. Retail Introduction' },
    { name: 'premium', title: '3. Premium Products' },
    { name: 'independent', title: '4. Independent Dealers' },
    { name: 'gallery', title: '5. Station Gallery' },
    { name: 'service', title: '6. Customer Service' },
    { name: 'products', title: '7. Fuel Products' },
    { name: 'stats', title: '8. Customer Statistics' },
    { name: 'diesel', title: '9. Diesel Fuel' },
    { name: 'features', title: '10. Station Features' },
    { name: 'excellence', title: '11. Excellence' },
    { name: 'cta', title: '12. CTA Banner' },
  ],
  fields: [
    { name: 'heroSubtitle',  title: 'Hero Subtitle', type: 'string' },
    { name: 'heroSubtitleColor',  title: 'Hero Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroSubtitleSize',  title: 'Hero Subtitle Size', type: 'string', options: { list: [{ title: '14px', value: '14px' }, { title: '16px', value: '16px' }, { title: '18px', value: '18px' }] } },
    { name: 'heroSubtitleBorderEnabled',  title: 'Hero Subtitle Border Enabled', type: 'boolean' },
    { name: 'heroSubtitleBorderColor',  title: 'Hero Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroSubtitleBorderWidth',  title: 'Hero Subtitle Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'heroSubtitleShadowColor',  title: 'Hero Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'heroTitle',  title: 'Hero Title', type: 'string' },
    { name: 'heroTitleColor',  title: 'Hero Title Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroTitleSize',  title: 'Hero Title Size', type: 'string', options: { list: [{ title: '48px', value: '48px' }, { title: '56px', value: '56px' }, { title: '64px', value: '64px' }, { title: '72px', value: '72px' }] } },
    { name: 'heroTitleBorderEnabled',  title: 'Hero Title Border Enabled', type: 'boolean' },
    { name: 'heroTitleBorderColor',  title: 'Hero Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroTitleBorderWidth',  title: 'Hero Title Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'heroTitleShadowColor',  title: 'Hero Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'heroDescription',  title: 'Hero Description', type: 'text' },
    { name: 'heroDescriptionColor',  title: 'Hero Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroDescriptionSize',  title: 'Hero Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'heroDescriptionBorderEnabled',  title: 'Hero Description Border Enabled', type: 'boolean' },
    { name: 'heroDescriptionBorderColor',  title: 'Hero Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroDescriptionBorderWidth',  title: 'Hero Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'heroDescriptionShadowColor',  title: 'Hero Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'heroImageUrl',  title: 'Hero Image URL', type: 'image' },
    { name: 'heroCtaText', title: 'Hero CTA Text', type: 'string' },
    { name: 'heroCtaLink', title: 'Hero CTA Link', type: 'string' },
    { name: 'retailIntroSubtitle', title: 'Retail Intro Subtitle', type: 'string' },
    { name: 'retailIntroSubtitleColor', title: 'Retail Intro Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'retailIntroSubtitleSize', title: 'Retail Intro Subtitle Size', type: 'string', options: { list: [{ title: '14px', value: '14px' }, { title: '16px', value: '16px' }, { title: '18px', value: '18px' }] } },
    { name: 'retailIntroSubtitleBorderEnabled', title: 'Retail Intro Subtitle Border Enabled', type: 'boolean' },
    { name: 'retailIntroSubtitleBorderColor', title: 'Retail Intro Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'retailIntroSubtitleBorderWidth', title: 'Retail Intro Subtitle Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'retailIntroSubtitleShadowColor', title: 'Retail Intro Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'retailIntroTitle', title: 'Retail Intro Title', type: 'string' },
    { name: 'retailIntroTitleColor', title: 'Retail Intro Title Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'retailIntroTitleSize', title: 'Retail Intro Title Size', type: 'string', options: { list: [{ title: '48px', value: '48px' }, { title: '56px', value: '56px' }, { title: '64px', value: '64px' }] } },
    { name: 'retailIntroTitleBorderEnabled', title: 'Retail Intro Title Border Enabled', type: 'boolean' },
    { name: 'retailIntroTitleBorderColor', title: 'Retail Intro Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'retailIntroTitleBorderWidth', title: 'Retail Intro Title Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'retailIntroTitleShadowColor', title: 'Retail Intro Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'retailIntroDescription', title: 'Retail Intro Description', type: 'text' },
    { name: 'retailIntroDescriptionColor', title: 'Retail Intro Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'retailIntroDescriptionSize', title: 'Retail Intro Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'retailIntroDescriptionBorderEnabled', title: 'Retail Intro Description Border Enabled', type: 'boolean' },
    { name: 'retailIntroDescriptionBorderColor', title: 'Retail Intro Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'retailIntroDescriptionBorderWidth', title: 'Retail Intro Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'retailIntroDescriptionShadowColor', title: 'Retail Intro Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'retailIntroSecondParagraph', title: 'Retail Intro Second Paragraph', type: 'text' },
    { name: 'retailIntroCtaText', title: 'Retail Intro CTA Text', type: 'string' },
    { name: 'retailIntroCtaLink', title: 'Retail Intro CTA Link', type: 'string' },
    { name: 'retailIntroStatValue', title: 'Retail Intro Stat Value', type: 'string' },
    { name: 'retailIntroStatLabel', title: 'Retail Intro Stat Label', type: 'string' },
    { name: 'retailIntroImageUrl', title: 'Retail Intro Image', type: 'image', options: { hotspot: true } },
    { name: 'premiumTagline', title: 'Premium Tagline', type: 'string' },
    { name: 'premiumTaglineColor', title: 'Premium Tagline Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'premiumTaglineSize', title: 'Premium Tagline Size', type: 'string', options: { list: [{ title: '18px', value: '18px' }, { title: '24px', value: '24px' }, { title: '30px', value: '30px' }] } },
    { name: 'premiumTaglineBorderEnabled', title: 'Premium Tagline Border Enabled', type: 'boolean' },
    { name: 'premiumTaglineBorderColor', title: 'Premium Tagline Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'premiumTaglineBorderWidth', title: 'Premium Tagline Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'premiumTaglineShadowColor', title: 'Premium Tagline Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'premiumContent', title: 'Premium Content', type: 'text' },
    { name: 'premiumContentColor', title: 'Premium Content Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'premiumContentSize', title: 'Premium Content Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'premiumContentBorderEnabled', title: 'Premium Content Border Enabled', type: 'boolean' },
    { name: 'premiumContentBorderColor', title: 'Premium Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'premiumContentBorderWidth', title: 'Premium Content Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'premiumContentShadowColor', title: 'Premium Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'premiumCtaText', title: 'Premium CTA Text', type: 'string' },
    { name: 'premiumCtaLink', title: 'Premium CTA Link', type: 'string' },
    { name: 'independentHeading', title: 'Independent Heading', type: 'string' },
    { name: 'independentHeadingColor', title: 'Independent Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'independentHeadingSize', title: 'Independent Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '56px', value: '56px' }] } },
    { name: 'independentHeadingBorderEnabled', title: 'Independent Heading Border Enabled', type: 'boolean' },
    { name: 'independentHeadingBorderColor', title: 'Independent Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'independentHeadingBorderWidth', title: 'Independent Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'independentHeadingShadowColor', title: 'Independent Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'independentDescription', title: 'Independent Description', type: 'text' },
    { name: 'independentDescriptionColor', title: 'Independent Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'independentDescriptionSize', title: 'Independent Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'independentDescriptionBorderEnabled', title: 'Independent Description Border Enabled', type: 'boolean' },
    { name: 'independentDescriptionBorderColor', title: 'Independent Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'independentDescriptionBorderWidth', title: 'Independent Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'independentDescriptionShadowColor', title: 'Independent Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'independentCtaText', title: 'Independent CTA Text', type: 'string' },
    { name: 'independentCtaLink', title: 'Independent CTA Link', type: 'string' },
    { name: 'independentImageUrl', title: 'Independent Dealer Image', type: 'image', options: { hotspot: true } },
    { name: 'galleryHeading', title: 'Gallery Heading', type: 'string' },
    { name: 'galleryHeadingColor', title: 'Gallery Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'galleryHeadingSize', title: 'Gallery Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '56px', value: '56px' }] } },
    { name: 'galleryHeadingBorderEnabled', title: 'Gallery Heading Border Enabled', type: 'boolean' },
    { name: 'galleryHeadingBorderColor', title: 'Gallery Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'galleryHeadingBorderWidth', title: 'Gallery Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'galleryHeadingShadowColor', title: 'Gallery Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'galleryImages', title: 'Gallery Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'serviceHeading', title: 'Service Heading', type: 'string' },
    { name: 'serviceHeadingColor', title: 'Service Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'serviceHeadingSize', title: 'Service Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '56px', value: '56px' }] } },
    { name: 'serviceHeadingBorderEnabled', title: 'Service Heading Border Enabled', type: 'boolean' },
    { name: 'serviceHeadingBorderColor', title: 'Service Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'serviceHeadingBorderWidth', title: 'Service Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'serviceHeadingShadowColor', title: 'Service Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'serviceContent', title: 'Service Content', type: 'text' },
    { name: 'serviceContentColor', title: 'Service Content Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'serviceContentSize', title: 'Service Content Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'serviceContentBorderEnabled', title: 'Service Content Border Enabled', type: 'boolean' },
    { name: 'serviceContentBorderColor', title: 'Service Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'serviceContentBorderWidth', title: 'Service Content Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'serviceContentShadowColor', title: 'Service Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'serviceQuestion', title: 'Service Question', type: 'string' },
    { name: 'serviceQuestionColor', title: 'Service Question Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'serviceQuestionSize', title: 'Service Question Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'serviceQuestionBorderEnabled', title: 'Service Question Border Enabled', type: 'boolean' },
    { name: 'serviceQuestionBorderColor', title: 'Service Question Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'serviceQuestionBorderWidth', title: 'Service Question Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'serviceQuestionShadowColor', title: 'Service Question Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'serviceStatValue', title: 'Service Stat Value', type: 'string' },
    { name: 'serviceStatLabel', title: 'Service Stat Label', type: 'string' },
    { name: 'serviceImageUrl', title: 'Customer Service Image', type: 'image', options: { hotspot: true } },
    { name: 'fuelTypesHeading', title: 'Fuel Types Heading', type: 'string' },
    { name: 'fuelTypesHeadingColor', title: 'Fuel Types Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'fuelTypesHeadingSize', title: 'Fuel Types Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '56px', value: '56px' }] } },
    { name: 'fuelTypesHeadingBorderEnabled', title: 'Fuel Types Heading Border Enabled', type: 'boolean' },
    { name: 'fuelTypesHeadingBorderColor', title: 'Fuel Types Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'fuelTypesHeadingBorderWidth', title: 'Fuel Types Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'fuelTypesHeadingShadowColor', title: 'Fuel Types Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    {
      name: 'fuelTypes', title: 'Fuel Types', type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'octane', title: 'Octane Rating', type: 'string' },
        { name: 'name', title: 'Fuel Name', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'imageUrl', title: 'Image', type: 'image', options: { hotspot: true } },
      ]}],
    },
    { name: 'fuelTypesPrimaryCtaText', title: 'Primary CTA Text', type: 'string' },
    { name: 'fuelTypesPrimaryCtaLink', title: 'Primary CTA Link', type: 'string' },
    { name: 'fuelTypesSecondaryCtaText', title: 'Secondary CTA Text', type: 'string' },
    { name: 'fuelTypesSecondaryCtaLink', title: 'Secondary CTA Link', type: 'string' },
    { name: 'statsValue', title: 'Stats Value', type: 'string' },
    { name: 'statsValueColor', title: 'Stats Value Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'statsValueSize', title: 'Stats Value Size', type: 'string', options: { list: [{ title: '48px', value: '48px' }, { title: '64px', value: '64px' }, { title: '80px', value: '80px' }] } },
    { name: 'statsValueBorderEnabled', title: 'Stats Value Border Enabled', type: 'boolean' },
    { name: 'statsValueBorderColor', title: 'Stats Value Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'statsValueBorderWidth', title: 'Stats Value Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'statsValueShadowColor', title: 'Stats Value Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'statsLabel', title: 'Stats Label', type: 'string' },
    { name: 'statsLabelColor', title: 'Stats Label Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'statsLabelSize', title: 'Stats Label Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'statsLabelBorderEnabled', title: 'Stats Label Border Enabled', type: 'boolean' },
    { name: 'statsLabelBorderColor', title: 'Stats Label Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'statsLabelBorderWidth', title: 'Stats Label Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'statsLabelShadowColor', title: 'Stats Label Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'dieselHeading', title: 'Diesel Heading', type: 'string' },
    { name: 'dieselHeadingColor', title: 'Diesel Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'dieselHeadingSize', title: 'Diesel Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '56px', value: '56px' }] } },
    { name: 'dieselHeadingBorderEnabled', title: 'Diesel Heading Border Enabled', type: 'boolean' },
    { name: 'dieselHeadingBorderColor', title: 'Diesel Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'dieselHeadingBorderWidth', title: 'Diesel Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'dieselHeadingShadowColor', title: 'Diesel Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'dieselDescription', title: 'Diesel Description', type: 'text' },
    { name: 'dieselDescriptionColor', title: 'Diesel Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'dieselDescriptionSize', title: 'Diesel Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'dieselDescriptionBorderEnabled', title: 'Diesel Description Border Enabled', type: 'boolean' },
    { name: 'dieselDescriptionBorderColor', title: 'Diesel Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'dieselDescriptionBorderWidth', title: 'Diesel Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'dieselDescriptionShadowColor', title: 'Diesel Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'dieselCtaText', title: 'Diesel CTA Text', type: 'string' },
    { name: 'dieselCtaLink', title: 'Diesel CTA Link', type: 'string' },
    { name: 'dieselImageUrl', title: 'Diesel Image', type: 'image', options: { hotspot: true } },
    { name: 'featuresTagline', title: 'Features Tagline', type: 'string' },
    { name: 'featuresHeading', title: 'Features Heading', type: 'string' },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          {
            name: 'icon',
            title: 'Icon',
            type: 'string',
            options: {
              list: [
                { title: 'Shield', value: 'shield' },
                { title: 'Star', value: 'star' },
                { title: 'Dollar', value: 'dollar' },
              ],
            },
          },
        ],
      }],
    },
    { name: 'featuresCtaText', title: 'Features CTA Text', type: 'string' },
    { name: 'featuresCtaLink', title: 'Features CTA Link', type: 'string' },
    { name: 'excellenceSectionTag', title: 'Excellence Section Tag', type: 'string' },
    { name: 'excellenceTagline', group: 'excellence', title: 'Excellence Tagline', type: 'string' },
    { name: 'excellenceTaglineColor', group: 'excellence', title: 'Excellence Tagline Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'excellenceTaglineSize', group: 'excellence', title: 'Excellence Tagline Size', type: 'string', options: { list: [{ title: '18px', value: '18px' }, { title: '24px', value: '24px' }, { title: '30px', value: '30px' }] } },
    { name: 'excellenceTaglineBorderEnabled', group: 'excellence', title: 'Excellence Tagline Border Enabled', type: 'boolean' },
    { name: 'excellenceTaglineBorderColor', group: 'excellence', title: 'Excellence Tagline Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'excellenceTaglineBorderWidth', group: 'excellence', title: 'Excellence Tagline Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'excellenceTaglineShadowColor', group: 'excellence', title: 'Excellence Tagline Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'excellenceContent', group: 'excellence', title: 'Excellence Content', type: 'text' },
    { name: 'excellenceContentColor', group: 'excellence', title: 'Excellence Content Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'excellenceContentSize', group: 'excellence', title: 'Excellence Content Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'excellenceContentBorderEnabled', group: 'excellence', title: 'Excellence Content Border Enabled', type: 'boolean' },
    { name: 'excellenceContentBorderColor', group: 'excellence', title: 'Excellence Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'excellenceContentBorderWidth', group: 'excellence', title: 'Excellence Content Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'excellenceContentShadowColor', group: 'excellence', title: 'Excellence Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'excellenceCtaText', group: 'excellence', title: 'Excellence CTA Text', type: 'string' },
    { name: 'excellenceCtaLink', group: 'excellence', title: 'Excellence CTA Link', type: 'string' },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ].map((field) => ({
    ...field,
    group: field.group || fuelStationsFieldGroup(field.name),
  })),
}

export const fuelTransportationPage = {
  name: 'fuelTransportationPage',
  title: 'Fuel Transportation Page',
  type: 'document',
  groups: [
    { name: 'hero', title: '1. Hero Section', default: true },
    { name: 'fleet', title: '2. Fleet Section' },
    { name: 'services', title: '3. Services Section' },
    { name: 'excellence', title: '4. Excellence Section' },
    { name: 'cta', title: '5. CTA Banner' },
  ],
  fields: [
    { name: 'heroSubtitle',  title: 'Hero Subtitle', type: 'string' },
    { name: 'heroSubtitleColor',  title: 'Hero Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroSubtitleSize',  title: 'Hero Subtitle Size', type: 'string', options: { list: [{ title: '14px', value: '14px' }, { title: '16px', value: '16px' }, { title: '18px', value: '18px' }] } },
    { name: 'heroSubtitleBorderEnabled',  title: 'Hero Subtitle Border Enabled', type: 'boolean' },
    { name: 'heroSubtitleBorderColor',  title: 'Hero Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroSubtitleBorderWidth',  title: 'Hero Subtitle Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'heroSubtitleShadowColor',  title: 'Hero Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'heroTitle',  title: 'Hero Title', type: 'string' },
    { name: 'heroTitleColor',  title: 'Hero Title Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroTitleSize',  title: 'Hero Title Size', type: 'string', options: { list: [{ title: '48px', value: '48px' }, { title: '56px', value: '56px' }, { title: '64px', value: '64px' }, { title: '72px', value: '72px' }] } },
    { name: 'heroTitleBorderEnabled',  title: 'Hero Title Border Enabled', type: 'boolean' },
    { name: 'heroTitleBorderColor',  title: 'Hero Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroTitleBorderWidth',  title: 'Hero Title Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'heroTitleShadowColor',  title: 'Hero Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'heroDescription',  title: 'Hero Description', type: 'text' },
    { name: 'heroDescriptionColor',  title: 'Hero Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroDescriptionSize',  title: 'Hero Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'heroDescriptionBorderEnabled',  title: 'Hero Description Border Enabled', type: 'boolean' },
    { name: 'heroDescriptionBorderColor',  title: 'Hero Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroDescriptionBorderWidth',  title: 'Hero Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'heroDescriptionShadowColor',  title: 'Hero Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'heroImageUrl',  title: 'Hero Image URL', type: 'image' },
    { name: 'heroCtaText', title: 'Hero CTA Text', type: 'string' },
    { name: 'heroCtaLink', title: 'Hero CTA Link', type: 'string' },
    { name: 'fleetHeading', title: 'Fleet Heading', type: 'string' },
    { name: 'fleetHeadingColor', title: 'Fleet Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'fleetHeadingSize', title: 'Fleet Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '56px', value: '56px' }] } },
    { name: 'fleetHeadingBorderEnabled', title: 'Fleet Heading Border Enabled', type: 'boolean' },
    { name: 'fleetHeadingBorderColor', title: 'Fleet Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'fleetHeadingBorderWidth', title: 'Fleet Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'fleetHeadingShadowColor', title: 'Fleet Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'fleetDescription', title: 'Fleet Description', type: 'text' },
    { name: 'fleetDescriptionColor', title: 'Fleet Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'fleetDescriptionSize', title: 'Fleet Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'fleetDescriptionBorderEnabled', title: 'Fleet Description Border Enabled', type: 'boolean' },
    { name: 'fleetDescriptionBorderColor', title: 'Fleet Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'fleetDescriptionBorderWidth', title: 'Fleet Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'fleetDescriptionShadowColor', title: 'Fleet Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'servicesHeading', title: 'Services Heading', type: 'string' },
    { name: 'servicesHeadingColor', title: 'Services Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'servicesHeadingSize', title: 'Services Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '56px', value: '56px' }] } },
    { name: 'servicesHeadingBorderEnabled', title: 'Services Heading Border Enabled', type: 'boolean' },
    { name: 'servicesHeadingBorderColor', title: 'Services Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'servicesHeadingBorderWidth', title: 'Services Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'servicesHeadingShadowColor', title: 'Services Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'coverageHeading', title: 'Coverage Heading', type: 'string' },
    { name: 'coverageHeadingColor', title: 'Coverage Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'coverageHeadingSize', title: 'Coverage Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '56px', value: '56px' }] } },
    { name: 'coverageHeadingBorderEnabled', title: 'Coverage Heading Border Enabled', type: 'boolean' },
    { name: 'coverageHeadingBorderColor', title: 'Coverage Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'coverageHeadingBorderWidth', title: 'Coverage Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'coverageHeadingShadowColor', title: 'Coverage Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'coverageDescription', title: 'Coverage Description', type: 'text' },
    { name: 'coverageDescriptionColor', title: 'Coverage Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'coverageDescriptionSize', title: 'Coverage Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'coverageDescriptionBorderEnabled', title: 'Coverage Description Border Enabled', type: 'boolean' },
    { name: 'coverageDescriptionBorderColor', title: 'Coverage Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'coverageDescriptionBorderWidth', title: 'Coverage Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'coverageDescriptionShadowColor', title: 'Coverage Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'teamHeading', title: 'Team Heading', type: 'string' },
    { name: 'teamHeadingColor', title: 'Team Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'teamHeadingSize', title: 'Team Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '56px', value: '56px' }] } },
    { name: 'teamHeadingBorderEnabled', title: 'Team Heading Border Enabled', type: 'boolean' },
    { name: 'teamHeadingBorderColor', title: 'Team Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'teamHeadingBorderWidth', title: 'Team Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'teamHeadingShadowColor', title: 'Team Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'teamDescription', title: 'Team Description', type: 'text' },
    { name: 'teamDescriptionColor', title: 'Team Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'teamDescriptionSize', title: 'Team Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'teamDescriptionBorderEnabled', title: 'Team Description Border Enabled', type: 'boolean' },
    { name: 'teamDescriptionBorderColor', title: 'Team Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'teamDescriptionBorderWidth', title: 'Team Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'teamDescriptionShadowColor', title: 'Team Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'processHeading', title: 'Process Heading', type: 'string' },
    { name: 'processHeadingColor', title: 'Process Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'processHeadingSize', title: 'Process Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '56px', value: '56px' }] } },
    { name: 'processHeadingBorderEnabled', title: 'Process Heading Border Enabled', type: 'boolean' },
    { name: 'processHeadingBorderColor', title: 'Process Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'processHeadingBorderWidth', title: 'Process Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'processHeadingShadowColor', title: 'Process Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'safetyHeading', title: 'Safety Heading', type: 'string' },
    { name: 'safetyHeadingColor', title: 'Safety Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'safetyHeadingSize', title: 'Safety Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '56px', value: '56px' }] } },
    { name: 'safetyHeadingBorderEnabled', title: 'Safety Heading Border Enabled', type: 'boolean' },
    { name: 'safetyHeadingBorderColor', title: 'Safety Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'safetyHeadingBorderWidth', title: 'Safety Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'safetyHeadingShadowColor', title: 'Safety Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'safetyDescription', title: 'Safety Description', type: 'text' },
    { name: 'safetyDescriptionColor', title: 'Safety Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'safetyDescriptionSize', title: 'Safety Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'safetyDescriptionBorderEnabled', title: 'Safety Description Border Enabled', type: 'boolean' },
    { name: 'safetyDescriptionBorderColor', title: 'Safety Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'safetyDescriptionBorderWidth', title: 'Safety Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'safetyDescriptionShadowColor', title: 'Safety Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'fleetGalleryHeading', title: 'Fleet Gallery Heading', type: 'string' },
    { name: 'fleetGalleryHeadingColor', title: 'Fleet Gallery Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'fleetGalleryHeadingSize', title: 'Fleet Gallery Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '56px', value: '56px' }] } },
    { name: 'fleetGalleryHeadingBorderEnabled', title: 'Fleet Gallery Heading Border Enabled', type: 'boolean' },
    { name: 'fleetGalleryHeadingBorderColor', title: 'Fleet Gallery Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'fleetGalleryHeadingBorderWidth', title: 'Fleet Gallery Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'fleetGalleryHeadingShadowColor', title: 'Fleet Gallery Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'excellenceTagline', group: 'excellence', title: 'Excellence Tagline', type: 'string' },
    { name: 'excellenceTaglineColor', group: 'excellence', title: 'Excellence Tagline Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'excellenceTaglineSize', group: 'excellence', title: 'Excellence Tagline Size', type: 'string', options: { list: [{ title: '18px', value: '18px' }, { title: '24px', value: '24px' }, { title: '30px', value: '30px' }] } },
    { name: 'excellenceTaglineBorderEnabled', group: 'excellence', title: 'Excellence Tagline Border Enabled', type: 'boolean' },
    { name: 'excellenceTaglineBorderColor', group: 'excellence', title: 'Excellence Tagline Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'excellenceTaglineBorderWidth', group: 'excellence', title: 'Excellence Tagline Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'excellenceTaglineShadowColor', group: 'excellence', title: 'Excellence Tagline Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'excellenceContent', group: 'excellence', title: 'Excellence Content', type: 'text' },
    { name: 'excellenceContentColor', group: 'excellence', title: 'Excellence Content Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'excellenceContentSize', group: 'excellence', title: 'Excellence Content Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'excellenceContentBorderEnabled', group: 'excellence', title: 'Excellence Content Border Enabled', type: 'boolean' },
    { name: 'excellenceContentBorderColor', group: 'excellence', title: 'Excellence Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'excellenceContentBorderWidth', group: 'excellence', title: 'Excellence Content Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'excellenceContentShadowColor', group: 'excellence', title: 'Excellence Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'excellenceCtaText', group: 'excellence', title: 'Excellence CTA Text', type: 'string' },
    { name: 'excellenceCtaLink', group: 'excellence', title: 'Excellence CTA Link', type: 'string' },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

export const careersPage = {
  name: 'careersPage',
  type: 'document',
  title: 'Careers Page',
  groups: [
    { name: 'hero', title: '1. Hero Section', default: true },
    { name: 'whyWork', title: '2. Why Work With Us' },
    { name: 'culture', title: '3. Our Culture' },
    { name: 'openings', title: '4. Current Openings' },
    { name: 'talent', title: '5. Talent Rising Program' },
    { name: 'teamGallery', title: '6. Team Gallery' },
    { name: 'office', title: '7. Office Environment' },
    { name: 'training', title: '8. Training & Development' },
    { name: 'events', title: '9. Team Events' },
    { name: 'excellence', title: '10. Excellence' },
    { name: 'cta', title: '11. CTA Banner' },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════════
    // 1. HERO SECTION
    // ═══════════════════════════════════════════════════════════════════════════
    { name: 'heroSubtitle',  title: 'Hero Subtitle', type: 'string' },
    { name: 'heroSubtitleColor',  title: 'Hero Subtitle Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroSubtitleSize',  title: 'Hero Subtitle Size', type: 'string', options: { list: [{ title: '12px', value: '12px' }, { title: '14px', value: '14px' }, { title: '16px', value: '16px' }] } },
    { name: 'heroSubtitleBorderEnabled',  title: 'Hero Subtitle Border Enabled', type: 'boolean' },
    { name: 'heroSubtitleBorderColor',  title: 'Hero Subtitle Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroSubtitleBorderWidth',  title: 'Hero Subtitle Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'heroSubtitleShadowColor',  title: 'Hero Subtitle Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'heroTitle',  title: 'Hero Title', type: 'string' },
    { name: 'heroTitleColor',  title: 'Hero Title Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroTitleSize',  title: 'Hero Title Size', type: 'string', options: { list: [{ title: '48px', value: '48px' }, { title: '64px', value: '64px' }, { title: '72px', value: '72px' }] } },
    { name: 'heroTitleBorderEnabled',  title: 'Hero Title Border Enabled', type: 'boolean' },
    { name: 'heroTitleBorderColor',  title: 'Hero Title Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroTitleBorderWidth',  title: 'Hero Title Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'heroTitleShadowColor',  title: 'Hero Title Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'heroDescription',  title: 'Hero Description', type: 'text' },
    { name: 'heroDescriptionColor',  title: 'Hero Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroDescriptionSize',  title: 'Hero Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'heroDescriptionBorderEnabled',  title: 'Hero Description Border Enabled', type: 'boolean' },
    { name: 'heroDescriptionBorderColor',  title: 'Hero Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'heroDescriptionBorderWidth',  title: 'Hero Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'heroDescriptionShadowColor',  title: 'Hero Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'heroImageUrl',  title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'heroCtaText', title: 'Hero CTA Text', type: 'string', group: 'hero' },
    { name: 'heroCtaLink', title: 'Hero CTA Link', type: 'string', group: 'hero' },

    // ═══════════════════════════════════════════════════════════════════════════
    // 2. WHY WORK WITH US SECTION
    // ═══════════════════════════════════════════════════════════════════════════
    { name: 'whyWorkHeading', title: 'Why Work Heading', type: 'string', group: 'whyWork' },
    { name: 'whyWorkHeadingColor', group: 'whyWork', title: 'Why Work Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'whyWorkHeadingSize', group: 'whyWork', title: 'Why Work Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '64px', value: '64px' }] } },
    { name: 'whyWorkHeadingBorderEnabled', group: 'whyWork', title: 'Why Work Heading Border Enabled', type: 'boolean' },
    { name: 'whyWorkHeadingBorderColor', group: 'whyWork', title: 'Why Work Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'whyWorkHeadingBorderWidth', group: 'whyWork', title: 'Why Work Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'whyWorkHeadingShadowColor', group: 'whyWork', title: 'Why Work Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'whyWorkDescription', group: 'whyWork', title: 'Why Work Description', type: 'text' },
    { name: 'whyWorkDescriptionColor', group: 'whyWork', title: 'Why Work Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'whyWorkDescriptionSize', group: 'whyWork', title: 'Why Work Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'whyWorkDescriptionBorderEnabled', group: 'whyWork', title: 'Why Work Description Border Enabled', type: 'boolean' },
    { name: 'whyWorkDescriptionBorderColor', group: 'whyWork', title: 'Why Work Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'whyWorkDescriptionBorderWidth', group: 'whyWork', title: 'Why Work Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'whyWorkDescriptionShadowColor', group: 'whyWork', title: 'Why Work Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'cultureHeading', title: 'Culture Heading', group: 'culture', type: 'string' },
    { name: 'cultureHeadingColor', group: 'culture', title: 'Culture Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'cultureHeadingSize', group: 'culture', title: 'Culture Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '64px', value: '64px' }] } },
    { name: 'cultureHeadingBorderEnabled', group: 'culture', title: 'Culture Heading Border Enabled', type: 'boolean' },
    { name: 'cultureHeadingBorderColor', group: 'culture', title: 'Culture Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'cultureHeadingBorderWidth', group: 'culture', title: 'Culture Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'cultureHeadingShadowColor', group: 'culture', title: 'Culture Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'cultureDescription', group: 'culture', title: 'Culture Description', type: 'text' },
    { name: 'cultureDescriptionColor', group: 'culture', title: 'Culture Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'cultureDescriptionSize', group: 'culture', title: 'Culture Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'cultureDescriptionBorderEnabled', group: 'culture', title: 'Culture Description Border Enabled', type: 'boolean' },
    { name: 'cultureDescriptionBorderColor', group: 'culture', title: 'Culture Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'cultureDescriptionBorderWidth', group: 'culture', title: 'Culture Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'cultureDescriptionShadowColor', group: 'culture', title: 'Culture Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'openingsHeading', group: 'openings', title: 'Openings Heading', type: 'string' },
    { name: 'openingsHeadingColor', group: 'openings', title: 'Openings Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'openingsHeadingSize', group: 'openings', title: 'Openings Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '64px', value: '64px' }] } },
    { name: 'openingsHeadingBorderEnabled', group: 'openings', title: 'Openings Heading Border Enabled', type: 'boolean' },
    { name: 'openingsHeadingBorderColor', group: 'openings', title: 'Openings Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'openingsHeadingBorderWidth', group: 'openings', title: 'Openings Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'openingsHeadingShadowColor', group: 'openings', title: 'Openings Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'talentHeading', group: 'talent', title: 'Talent Heading', type: 'string' },
    { name: 'talentHeadingColor', group: 'talent', title: 'Talent Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'talentHeadingSize', group: 'talent', title: 'Talent Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '64px', value: '64px' }] } },
    { name: 'talentHeadingBorderEnabled', group: 'talent', title: 'Talent Heading Border Enabled', type: 'boolean' },
    { name: 'talentHeadingBorderColor', group: 'talent', title: 'Talent Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'talentHeadingBorderWidth', group: 'talent', title: 'Talent Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'talentHeadingShadowColor', group: 'talent', title: 'Talent Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'talentDescription', group: 'talent', title: 'Talent Description', type: 'text' },
    { name: 'talentDescriptionColor', group: 'talent', title: 'Talent Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'talentDescriptionSize', group: 'talent', title: 'Talent Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'talentDescriptionBorderEnabled', group: 'talent', title: 'Talent Description Border Enabled', type: 'boolean' },
    { name: 'talentDescriptionBorderColor', group: 'talent', title: 'Talent Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'talentDescriptionBorderWidth', group: 'talent', title: 'Talent Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'talentDescriptionShadowColor', group: 'talent', title: 'Talent Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'teamGalleryHeading', group: 'teamGallery', title: 'Team Gallery Heading', type: 'string' },
    { name: 'teamGalleryHeadingColor', group: 'teamGallery', title: 'Team Gallery Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'teamGalleryHeadingSize', group: 'teamGallery', title: 'Team Gallery Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '64px', value: '64px' }] } },
    { name: 'teamGalleryHeadingBorderEnabled', group: 'teamGallery', title: 'Team Gallery Heading Border Enabled', type: 'boolean' },
    { name: 'teamGalleryHeadingBorderColor', group: 'teamGallery', title: 'Team Gallery Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'teamGalleryHeadingBorderWidth', group: 'teamGallery', title: 'Team Gallery Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'teamGalleryHeadingShadowColor', group: 'teamGallery', title: 'Team Gallery Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'officeHeading', group: 'office', title: 'Office Heading', type: 'string' },
    { name: 'officeHeadingColor', group: 'office', title: 'Office Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'officeHeadingSize', group: 'office', title: 'Office Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '64px', value: '64px' }] } },
    { name: 'officeHeadingBorderEnabled', group: 'office', title: 'Office Heading Border Enabled', type: 'boolean' },
    { name: 'officeHeadingBorderColor', group: 'office', title: 'Office Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'officeHeadingBorderWidth', group: 'office', title: 'Office Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'officeHeadingShadowColor', group: 'office', title: 'Office Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'officeDescription', group: 'office', title: 'Office Description', type: 'text' },
    { name: 'officeDescriptionColor', group: 'office', title: 'Office Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'officeDescriptionSize', group: 'office', title: 'Office Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'officeDescriptionBorderEnabled', group: 'office', title: 'Office Description Border Enabled', type: 'boolean' },
    { name: 'officeDescriptionBorderColor', group: 'office', title: 'Office Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'officeDescriptionBorderWidth', group: 'office', title: 'Office Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'officeDescriptionShadowColor', group: 'office', title: 'Office Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'trainingHeading', group: 'training', title: 'Training Heading', type: 'string' },
    { name: 'trainingHeadingColor', group: 'training', title: 'Training Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'trainingHeadingSize', group: 'training', title: 'Training Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '64px', value: '64px' }] } },
    { name: 'trainingHeadingBorderEnabled', group: 'training', title: 'Training Heading Border Enabled', type: 'boolean' },
    { name: 'trainingHeadingBorderColor', group: 'training', title: 'Training Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'trainingHeadingBorderWidth', group: 'training', title: 'Training Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'trainingHeadingShadowColor', group: 'training', title: 'Training Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'trainingDescription', group: 'training', title: 'Training Description', type: 'text' },
    { name: 'trainingDescriptionColor', group: 'training', title: 'Training Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'trainingDescriptionSize', group: 'training', title: 'Training Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'trainingDescriptionBorderEnabled', group: 'training', title: 'Training Description Border Enabled', type: 'boolean' },
    { name: 'trainingDescriptionBorderColor', group: 'training', title: 'Training Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'trainingDescriptionBorderWidth', group: 'training', title: 'Training Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'trainingDescriptionShadowColor', group: 'training', title: 'Training Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'eventsHeading', group: 'events', title: 'Events Heading', type: 'string' },
    { name: 'eventsHeadingColor', group: 'events', title: 'Events Heading Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'eventsHeadingSize', group: 'events', title: 'Events Heading Size', type: 'string', options: { list: [{ title: '36px', value: '36px' }, { title: '48px', value: '48px' }, { title: '64px', value: '64px' }] } },
    { name: 'eventsHeadingBorderEnabled', group: 'events', title: 'Events Heading Border Enabled', type: 'boolean' },
    { name: 'eventsHeadingBorderColor', group: 'events', title: 'Events Heading Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'eventsHeadingBorderWidth', group: 'events', title: 'Events Heading Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'eventsHeadingShadowColor', group: 'events', title: 'Events Heading Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'eventsDescription', group: 'events', title: 'Events Description', type: 'text' },
    { name: 'eventsDescriptionColor', group: 'events', title: 'Events Description Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'eventsDescriptionSize', group: 'events', title: 'Events Description Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'eventsDescriptionBorderEnabled', group: 'events', title: 'Events Description Border Enabled', type: 'boolean' },
    { name: 'eventsDescriptionBorderColor', group: 'events', title: 'Events Description Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'eventsDescriptionBorderWidth', group: 'events', title: 'Events Description Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'eventsDescriptionShadowColor', group: 'events', title: 'Events Description Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'excellenceTagline', group: 'excellence', title: 'Excellence Tagline', type: 'string' },
    { name: 'excellenceTaglineColor', group: 'excellence', title: 'Excellence Tagline Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'excellenceTaglineSize', group: 'excellence', title: 'Excellence Tagline Size', type: 'string', options: { list: [{ title: '20px', value: '20px' }, { title: '24px', value: '24px' }, { title: '28px', value: '28px' }] } },
    { name: 'excellenceTaglineBorderEnabled', group: 'excellence', title: 'Excellence Tagline Border Enabled', type: 'boolean' },
    { name: 'excellenceTaglineBorderColor', group: 'excellence', title: 'Excellence Tagline Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'excellenceTaglineBorderWidth', group: 'excellence', title: 'Excellence Tagline Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'excellenceTaglineShadowColor', group: 'excellence', title: 'Excellence Tagline Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'excellenceContent', group: 'excellence', title: 'Excellence Content', type: 'text' },
    { name: 'excellenceContentColor', group: 'excellence', title: 'Excellence Content Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'excellenceContentSize', group: 'excellence', title: 'Excellence Content Size', type: 'string', options: { list: [{ title: '16px', value: '16px' }, { title: '18px', value: '18px' }, { title: '20px', value: '20px' }] } },
    { name: 'excellenceContentBorderEnabled', group: 'excellence', title: 'Excellence Content Border Enabled', type: 'boolean' },
    { name: 'excellenceContentBorderColor', group: 'excellence', title: 'Excellence Content Border Color', type: 'string', options: { list: [{ title: 'Black', value: '#000000' }, { title: 'Primary', value: '#0066cc' }, { title: 'White', value: '#ffffff' }, { title: 'Gray', value: '#666666' }, { title: 'Green', value: '#10b981' }] } },
    { name: 'excellenceContentBorderWidth', group: 'excellence', title: 'Excellence Content Border Width', type: 'string', options: { list: [{ title: '1px', value: '1px' }, { title: '2px', value: '2px' }, { title: '3px', value: '3px' }] } },
    { name: 'excellenceContentShadowColor', group: 'excellence', title: 'Excellence Content Shadow Color', type: 'string', options: { list: [{ title: 'None', value: '' }, { title: 'Black', value: 'rgba(0,0,0,0.3)' }, { title: 'White', value: 'rgba(255,255,255,0.3)' }] } },
    { name: 'excellenceCtaText', group: 'excellence', title: 'Excellence CTA Text', type: 'string' },
    { name: 'excellenceCtaLink', group: 'excellence', title: 'Excellence CTA Link', type: 'string' },

    // ═══════════════════════════════════════════════════════════════════════════
    // IMAGE ARRAYS FOR EDITABLE CONTENT
    // ═══════════════════════════════════════════════════════════════════════════

    // Why Work With Us - Benefits Cards (6 cards with images)
    {
      name: 'whyWorkCards', title: 'Why Work With Us - Benefits Cards', type: 'array',
      group: 'whyWork',
      description: 'Add 6 benefit cards with images, titles, and descriptions',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 2 },
        ],
        preview: {
          select: { title: 'title', media: 'image' }
        }
      }]
    },

    // Culture Section - 4 images for the grid
    {
      name: 'cultureImages', title: 'Culture Section Images', type: 'array',
      group: 'culture',
      description: 'Add 4 images for the culture section grid',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.max(4)
    },

    // Job Openings
    {
      name: 'jobOpenings', title: 'Current Job Openings', type: 'array',
      group: 'openings',
      description: 'Add job listings with images',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'title', title: 'Job Title', type: 'string' },
          { name: 'location', title: 'Location', type: 'string' },
          { name: 'type', title: 'Job Type', type: 'string', options: { list: ['Full Time', 'Part Time', 'Part Time / Full Time', 'Contract', 'Casual'] } },
          { name: 'description', title: 'Description', type: 'text', rows: 2 },
        ],
        preview: {
          select: { title: 'title', subtitle: 'location', media: 'image' }
        }
      }]
    },

    // Talent Rising Image
    { name: 'talentRisingImage', title: 'Talent Rising Program Image', type: 'image', group: 'talent', options: { hotspot: true } },

    // Team Gallery - 8 images
    {
      name: 'teamGalleryImages', title: 'Team Gallery Images', type: 'array',
      group: 'teamGallery',
      description: 'Add 8 images for the team gallery',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.max(8)
    },

    // Office Locations
    {
      name: 'officeLocations', title: 'Office Locations', type: 'array',
      group: 'office',
      description: 'Add office locations with images',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'title', title: 'Office Name', type: 'string' },
          { name: 'subtitle', title: 'Location', type: 'string' },
        ],
        preview: {
          select: { title: 'title', subtitle: 'subtitle', media: 'image' }
        }
      }]
    },

    // Training Images - 8 images
    {
      name: 'trainingImages', title: 'Training & Development Images', type: 'array',
      group: 'training',
      description: 'Add 8 images for training section',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.max(8)
    },

    // Team Events
    {
      name: 'teamEvents', title: 'Team Events & Activities', type: 'array',
      group: 'events',
      description: 'Add team events with images',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'title', title: 'Event Title', type: 'string' },
          { name: 'subtitle', title: 'Subtitle', type: 'string' },
        ],
        preview: {
          select: { title: 'title', subtitle: 'subtitle', media: 'image' }
        }
      }]
    },

    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      group: 'cta',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

export const communityPage = {
  name: 'communityPage',
  type: 'document',
  title: 'Community Page',
  groups: [
    { name: 'hero', title: '1. Hero Section', default: true },
    { name: 'initiatives', title: '2. Community Initiatives' },
    { name: 'genderEquality', title: '3. Gender Equality' },
    { name: 'impact', title: '4. Impact' },
    { name: 'supportingLocals', title: '5. Supporting Locals' },
    { name: 'regional', title: '6. Regional Communities' },
    { name: 'story', title: '7. Our Story' },
    { name: 'cta', title: '8. CTA Banner' },
  ],
  fields: [
    { name: 'heroSubtitle',  title: 'Hero Subtitle', type: 'string' },
    { name: 'heroSubtitleColor',  title: 'Hero Subtitle Color', type: 'string', options: { list: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#000000', '#ffffff'] } },
    { name: 'heroSubtitleSize',  title: 'Hero Subtitle Size', type: 'string', options: { list: ['12px', '14px', '16px', '18px'] } },
    { name: 'heroSubtitleBorderEnabled',  title: 'Hero Subtitle Border Enabled', type: 'boolean' },
    { name: 'heroSubtitleBorderColor',  title: 'Hero Subtitle Border Color', type: 'string' },
    { name: 'heroSubtitleBorderWidth',  title: 'Hero Subtitle Border Width', type: 'string', options: { list: ['1px', '2px', '3px'] } },
    { name: 'heroSubtitleShadowColor',  title: 'Hero Subtitle Shadow Color', type: 'string' },
    { name: 'heroTitle',  title: 'Hero Title', type: 'string' },
    { name: 'heroTitleColor',  title: 'Hero Title Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981', '#3b82f6'] } },
    { name: 'heroTitleSize',  title: 'Hero Title Size', type: 'string', options: { list: ['48px', '60px', '72px', '84px'] } },
    { name: 'heroTitleBorderEnabled',  title: 'Hero Title Border Enabled', type: 'boolean' },
    { name: 'heroTitleBorderColor',  title: 'Hero Title Border Color', type: 'string' },
    { name: 'heroTitleBorderWidth',  title: 'Hero Title Border Width', type: 'string', options: { list: ['1px', '2px', '3px'] } },
    { name: 'heroTitleShadowColor',  title: 'Hero Title Shadow Color', type: 'string' },
    { name: 'heroDescription',  title: 'Hero Description', type: 'text' },
    { name: 'heroDescriptionColor',  title: 'Hero Description Color', type: 'string', options: { list: ['#000000', '#ffffff', '#666666'] } },
    { name: 'heroDescriptionSize',  title: 'Hero Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'heroDescriptionBorderEnabled',  title: 'Hero Description Border Enabled', type: 'boolean' },
    { name: 'heroDescriptionBorderColor',  title: 'Hero Description Border Color', type: 'string' },
    { name: 'heroDescriptionBorderWidth',  title: 'Hero Description Border Width', type: 'string', options: { list: ['1px', '2px', '3px'] } },
    { name: 'heroDescriptionShadowColor',  title: 'Hero Description Shadow Color', type: 'string' },
    { name: 'heroImageUrl',  title: 'Hero Image URL', type: 'image' },
    { name: 'initiativesHeading', group: 'initiatives', title: 'Initiatives Heading', type: 'string' },
    { name: 'initiativesHeadingColor', group: 'initiatives', title: 'Initiatives Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'initiativesHeadingSize', group: 'initiatives', title: 'Initiatives Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'initiativesHeadingBorderEnabled', group: 'initiatives', title: 'Initiatives Heading Border Enabled', type: 'boolean' },
    { name: 'initiativesHeadingBorderColor', group: 'initiatives', title: 'Initiatives Heading Border Color', type: 'string' },
    { name: 'initiativesHeadingBorderWidth', group: 'initiatives', title: 'Initiatives Heading Border Width', type: 'string', options: { list: ['1px', '2px', '3px'] } },
    { name: 'initiativesHeadingShadowColor', group: 'initiatives', title: 'Initiatives Heading Shadow Color', type: 'string' },
    { name: 'genderEqualityHeading', title: 'Gender Equality Heading', type: 'string' },
    { name: 'genderEqualityHeadingColor', title: 'Gender Equality Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'genderEqualityHeadingSize', title: 'Gender Equality Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'genderEqualityHeadingBorderEnabled', title: 'Gender Equality Heading Border Enabled', type: 'boolean' },
    { name: 'genderEqualityHeadingBorderColor', title: 'Gender Equality Heading Border Color', type: 'string' },
    { name: 'genderEqualityHeadingBorderWidth', title: 'Gender Equality Heading Border Width', type: 'string', options: { list: ['1px', '2px', '3px'] } },
    { name: 'genderEqualityHeadingShadowColor', title: 'Gender Equality Heading Shadow Color', type: 'string' },
    { name: 'genderEqualityDescription', title: 'Gender Equality Description', type: 'text' },
    { name: 'genderEqualityDescriptionColor', title: 'Gender Equality Description Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'genderEqualityDescriptionSize', title: 'Gender Equality Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'genderEqualityDescriptionBorderEnabled', title: 'Gender Equality Description Border Enabled', type: 'boolean' },
    { name: 'genderEqualityDescriptionBorderColor', title: 'Gender Equality Description Border Color', type: 'string' },
    { name: 'genderEqualityDescriptionBorderWidth', title: 'Gender Equality Description Border Width', type: 'string', options: { list: ['1px', '2px', '3px'] } },
    { name: 'genderEqualityDescriptionShadowColor', title: 'Gender Equality Description Shadow Color', type: 'string' },
    { name: 'genderEqualityImageUrl', title: 'Gender Equality Image URL', type: 'image' },
    { name: 'impactHeading', title: 'Impact Heading', type: 'string' },
    { name: 'impactHeadingColor', title: 'Impact Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'impactHeadingSize', title: 'Impact Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'impactHeadingBorderEnabled', title: 'Impact Heading Border Enabled', type: 'boolean' },
    { name: 'impactHeadingBorderColor', title: 'Impact Heading Border Color', type: 'string' },
    { name: 'impactHeadingBorderWidth', title: 'Impact Heading Border Width', type: 'string', options: { list: ['1px', '2px', '3px'] } },
    { name: 'impactHeadingShadowColor', title: 'Impact Heading Shadow Color', type: 'string' },
    { name: 'supportingLocalsHeading', title: 'Supporting Locals Heading', type: 'string' },
    { name: 'supportingLocalsHeadingColor', title: 'Supporting Locals Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'supportingLocalsHeadingSize', title: 'Supporting Locals Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'supportingLocalsHeadingBorderEnabled', title: 'Supporting Locals Heading Border Enabled', type: 'boolean' },
    { name: 'supportingLocalsHeadingBorderColor', title: 'Supporting Locals Heading Border Color', type: 'string' },
    { name: 'supportingLocalsHeadingBorderWidth', title: 'Supporting Locals Heading Border Width', type: 'string', options: { list: ['1px', '2px', '3px'] } },
    { name: 'supportingLocalsHeadingShadowColor', title: 'Supporting Locals Heading Shadow Color', type: 'string' },
    { name: 'supportingLocalsDescription', title: 'Supporting Locals Description', type: 'text' },
    { name: 'supportingLocalsDescriptionColor', title: 'Supporting Locals Description Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'supportingLocalsDescriptionSize', title: 'Supporting Locals Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'supportingLocalsDescriptionBorderEnabled', title: 'Supporting Locals Description Border Enabled', type: 'boolean' },
    { name: 'supportingLocalsDescriptionBorderColor', title: 'Supporting Locals Description Border Color', type: 'string' },
    { name: 'supportingLocalsDescriptionBorderWidth', title: 'Supporting Locals Description Border Width', type: 'string', options: { list: ['1px', '2px', '3px'] } },
    { name: 'supportingLocalsDescriptionShadowColor', title: 'Supporting Locals Description Shadow Color', type: 'string' },
    { name: 'supportingLocalsImageUrl', title: 'Supporting Locals Image URL', type: 'image' },
    { name: 'supportingLocalsCtaText', title: 'Supporting Locals CTA Text', type: 'string' },
    { name: 'supportingLocalsCtaLink', title: 'Supporting Locals CTA Link', type: 'string' },
    { name: 'regionalHeading', title: 'Regional Heading', type: 'string' },
    { name: 'regionalHeadingColor', title: 'Regional Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'regionalHeadingSize', title: 'Regional Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'regionalHeadingBorderEnabled', title: 'Regional Heading Border Enabled', type: 'boolean' },
    { name: 'regionalHeadingBorderColor', title: 'Regional Heading Border Color', type: 'string' },
    { name: 'regionalHeadingBorderWidth', title: 'Regional Heading Border Width', type: 'string', options: { list: ['1px', '2px', '3px'] } },
    { name: 'regionalHeadingShadowColor', title: 'Regional Heading Shadow Color', type: 'string' },
    { name: 'regionalDescription', title: 'Regional Description', type: 'text' },
    { name: 'regionalDescriptionColor', title: 'Regional Description Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'regionalDescriptionSize', title: 'Regional Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'regionalDescriptionBorderEnabled', title: 'Regional Description Border Enabled', type: 'boolean' },
    { name: 'regionalDescriptionBorderColor', title: 'Regional Description Border Color', type: 'string' },
    { name: 'regionalDescriptionBorderWidth', title: 'Regional Description Border Width', type: 'string', options: { list: ['1px', '2px', '3px'] } },
    { name: 'regionalDescriptionShadowColor', title: 'Regional Description Shadow Color', type: 'string' },
    { name: 'storyHeading', title: 'Story Heading', type: 'string' },
    { name: 'storyHeadingColor', title: 'Story Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'storyHeadingSize', title: 'Story Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'storyHeadingBorderEnabled', title: 'Story Heading Border Enabled', type: 'boolean' },
    { name: 'storyHeadingBorderColor', title: 'Story Heading Border Color', type: 'string' },
    { name: 'storyHeadingBorderWidth', title: 'Story Heading Border Width', type: 'string', options: { list: ['1px', '2px', '3px'] } },
    { name: 'storyHeadingShadowColor', title: 'Story Heading Shadow Color', type: 'string' },
    { name: 'storyContent', title: 'Story Content', type: 'text' },
    { name: 'storyContentColor', title: 'Story Content Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'storyContentSize', title: 'Story Content Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'storyContentBorderEnabled', title: 'Story Content Border Enabled', type: 'boolean' },
    { name: 'storyContentBorderColor', title: 'Story Content Border Color', type: 'string' },
    { name: 'storyContentBorderWidth', title: 'Story Content Border Width', type: 'string', options: { list: ['1px', '2px', '3px'] } },
    { name: 'storyContentShadowColor', title: 'Story Content Shadow Color', type: 'string' },
    { name: 'storyImageUrl', group: 'story', title: 'Story Image URL', type: 'image' },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      group: 'cta',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

export const atlasCarRacingPage = {
  name: 'atlasCarRacingPage',
  type: 'document',
  title: 'Atlas Car Racing Page',
  fields: [
    { name: 'heroTag', title: 'Hero Tag', type: 'string' },
    { name: 'heroTagColor', title: 'Hero Tag Color', type: 'string', options: { list: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#000000', '#ffffff'] } },
    { name: 'heroTagSize', title: 'Hero Tag Size', type: 'string', options: { list: ['12px', '14px', '16px'] } },
    { name: 'heroTitle',  title: 'Hero Title', type: 'string' },
    { name: 'heroTitleColor',  title: 'Hero Title Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981', '#3b82f6'] } },
    { name: 'heroTitleSize',  title: 'Hero Title Size', type: 'string', options: { list: ['48px', '60px', '72px', '84px'] } },
    { name: 'heroSubtitle',  title: 'Hero Subtitle', type: 'text' },
    { name: 'heroSubtitleColor',  title: 'Hero Subtitle Color', type: 'string', options: { list: ['#000000', '#666666', '#ffffff'] } },
    { name: 'heroSubtitleSize',  title: 'Hero Subtitle Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'heroPlate', title: 'Hero Plate', type: 'string' },
    { name: 'heroImageUrl',  title: 'Hero Image URL', type: 'image' },
    { name: 'meetGtrHeading', title: 'Meet GTR Heading', type: 'string' },
    { name: 'meetGtrHeadingColor', title: 'Meet GTR Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'meetGtrHeadingSize', title: 'Meet GTR Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'meetGtrDescription', title: 'Meet GTR Description', type: 'text' },
    { name: 'meetGtrDescriptionColor', title: 'Meet GTR Description Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'meetGtrDescriptionSize', title: 'Meet GTR Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'meetGtrCtaText', title: 'Meet GTR CTA Text', type: 'string' },
    { name: 'meetGtrCtaLink', title: 'Meet GTR CTA Link', type: 'string' },
    { name: 'galleryHeading', title: 'Gallery Heading', type: 'string' },
    { name: 'galleryHeadingColor', title: 'Gallery Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'galleryHeadingSize', title: 'Gallery Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'pillarsHeading', title: 'Pillars Heading', type: 'string' },
    { name: 'pillarsHeadingColor', title: 'Pillars Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'pillarsHeadingSize', title: 'Pillars Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'sponsorshipHeading', title: 'Sponsorship Heading', type: 'string' },
    { name: 'sponsorshipHeadingColor', title: 'Sponsorship Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'sponsorshipHeadingSize', title: 'Sponsorship Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'sponsorshipDescription', title: 'Sponsorship Description', type: 'text' },
    { name: 'sponsorshipDescriptionColor', title: 'Sponsorship Description Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'sponsorshipDescriptionSize', title: 'Sponsorship Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'sponsorshipCtaText', title: 'Sponsorship CTA Text', type: 'string' },
    { name: 'sponsorshipCtaLink', title: 'Sponsorship CTA Link', type: 'string' },
    { name: 'pradoHeading', title: 'Prado Heading', type: 'string' },
    { name: 'pradoHeadingColor', title: 'Prado Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'pradoHeadingSize', title: 'Prado Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'pradoDescription', title: 'Prado Description', type: 'text' },
    { name: 'pradoDescriptionColor', title: 'Prado Description Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'pradoDescriptionSize', title: 'Prado Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'pradoImageUrl', title: 'Prado Image URL', type: 'image' },
    { name: 'contactHeading', title: 'Contact Heading', type: 'string' },
    { name: 'contactHeadingColor', title: 'Contact Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'contactHeadingSize', title: 'Contact Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'contactDescription', title: 'Contact Description', type: 'text' },
    { name: 'contactDescriptionColor', title: 'Contact Description Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'contactDescriptionSize', title: 'Contact Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

export const commercialDieselPage = {
  name: 'commercialDieselPage',
  type: 'document',
  title: 'Commercial Diesel Page',
  fields: [
    { name: 'heroSubtitle',  title: 'Hero Subtitle', type: 'string' },
    { name: 'heroSubtitleColor',  title: 'Hero Subtitle Color', type: 'string', options: { list: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#000000', '#ffffff'] } },
    { name: 'heroSubtitleSize',  title: 'Hero Subtitle Size', type: 'string', options: { list: ['12px', '14px', '16px'] } },
    { name: 'heroTitle',  title: 'Hero Title', type: 'string' },
    { name: 'heroTitleColor',  title: 'Hero Title Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981', '#3b82f6'] } },
    { name: 'heroTitleSize',  title: 'Hero Title Size', type: 'string', options: { list: ['48px', '60px', '72px', '84px'] } },
    { name: 'heroDescription',  title: 'Hero Description', type: 'text' },
    { name: 'heroDescriptionColor',  title: 'Hero Description Color', type: 'string', options: { list: ['#000000', '#ffffff', '#666666'] } },
    { name: 'heroDescriptionSize',  title: 'Hero Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'heroImageUrl',  title: 'Hero Image URL', type: 'image' },
    { name: 'industriesHeading', title: 'Industries Heading', type: 'string' },
    { name: 'industriesHeadingColor', title: 'Industries Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'industriesHeadingSize', title: 'Industries Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'sectorsHeading', title: 'Sectors Heading', type: 'string' },
    { name: 'sectorsHeadingColor', title: 'Sectors Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'sectorsHeadingSize', title: 'Sectors Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'sectorsContent', title: 'Sectors Content', type: 'text' },
    { name: 'sectorsContentColor', title: 'Sectors Content Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'sectorsContentSize', title: 'Sectors Content Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'sectorsImageUrl', title: 'Sectors Image URL', type: 'image' },
    { name: 'bunkerHeading', title: 'Bunker Heading', type: 'string' },
    { name: 'bunkerHeadingColor', title: 'Bunker Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'bunkerHeadingSize', title: 'Bunker Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'bunkerContent', title: 'Bunker Content', type: 'text' },
    { name: 'bunkerContentColor', title: 'Bunker Content Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'bunkerContentSize', title: 'Bunker Content Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'bunkerImageUrl', title: 'Bunker Image URL', type: 'image' },
    { name: 'ownStationTagline', title: 'Own Station Tagline', type: 'string' },
    { name: 'ownStationHeading', title: 'Own Station Heading', type: 'string' },
    { name: 'ownStationHeadingColor', title: 'Own Station Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'ownStationHeadingSize', title: 'Own Station Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'ownStationContent', title: 'Own Station Content', type: 'text' },
    { name: 'ownStationContentColor', title: 'Own Station Content Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'ownStationContentSize', title: 'Own Station Content Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'ownStationImageUrl', title: 'Own Station Image URL', type: 'image' },
    { name: 'doYouKnowTagline', title: 'Do You Know Tagline', type: 'string' },
    { name: 'doYouKnowHeading', title: 'Do You Know Heading', type: 'string' },
    { name: 'doYouKnowHeadingColor', title: 'Do You Know Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'doYouKnowHeadingSize', title: 'Do You Know Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'doYouKnowContent', title: 'Do You Know Content', type: 'text' },
    { name: 'doYouKnowContentColor', title: 'Do You Know Content Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'doYouKnowContentSize', title: 'Do You Know Content Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'miningTagline', title: 'Mining Tagline', type: 'string' },
    { name: 'miningHeading', title: 'Mining Heading', type: 'string' },
    { name: 'miningHeadingColor', title: 'Mining Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'miningHeadingSize', title: 'Mining Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'miningContent', title: 'Mining Content', type: 'text' },
    { name: 'miningContentColor', title: 'Mining Content Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'miningContentSize', title: 'Mining Content Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'miningImageUrl', title: 'Mining Image URL', type: 'image' },
    { name: 'agricultureTagline', title: 'Agriculture Tagline', type: 'string' },
    { name: 'agricultureHeading', title: 'Agriculture Heading', type: 'string' },
    { name: 'agricultureHeadingColor', title: 'Agriculture Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'agricultureHeadingSize', title: 'Agriculture Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'agricultureContent', title: 'Agriculture Content', type: 'text' },
    { name: 'agricultureContentColor', title: 'Agriculture Content Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'agricultureContentSize', title: 'Agriculture Content Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'agricultureImageUrl', title: 'Agriculture Image URL', type: 'image' },
    { name: 'whatWeOfferTagline', title: 'What We Offer Tagline', type: 'string' },
    { name: 'whatWeOfferHeading', title: 'What We Offer Heading', type: 'string' },
    { name: 'whatWeOfferHeadingColor', title: 'What We Offer Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'whatWeOfferHeadingSize', title: 'What We Offer Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'whatWeOfferContent', title: 'What We Offer Content', type: 'text' },
    { name: 'whatWeOfferContentColor', title: 'What We Offer Content Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'whatWeOfferContentSize', title: 'What We Offer Content Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'transportationTagline', title: 'Transportation Tagline', type: 'string' },
    { name: 'transportationHeading', title: 'Transportation Heading', type: 'string' },
    { name: 'transportationHeadingColor', title: 'Transportation Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'transportationHeadingSize', title: 'Transportation Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'transportationContent', title: 'Transportation Content', type: 'text' },
    { name: 'transportationContentColor', title: 'Transportation Content Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'transportationContentSize', title: 'Transportation Content Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'complianceHeading', title: 'Compliance Heading', type: 'string' },
    { name: 'complianceHeadingColor', title: 'Compliance Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'complianceHeadingSize', title: 'Compliance Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'complianceContent', title: 'Compliance Content', type: 'text' },
    { name: 'complianceContentColor', title: 'Compliance Content Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'complianceContentSize', title: 'Compliance Content Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

export const fuelStationEnquiryPage = {
  name: 'fuelStationEnquiryPage',
  type: 'document',
  title: 'Fuel Station Enquiry Page',
  fields: [
    { name: 'heroSubtitle',  title: 'Hero Subtitle', type: 'string' },
    { name: 'heroSubtitleColor',  title: 'Hero Subtitle Color', type: 'string', options: { list: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#000000', '#ffffff'] } },
    { name: 'heroSubtitleSize',  title: 'Hero Subtitle Size', type: 'string', options: { list: ['12px', '14px', '16px'] } },
    { name: 'heroTitle',  title: 'Hero Title', type: 'string' },
    { name: 'heroTitleColor',  title: 'Hero Title Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981', '#3b82f6'] } },
    { name: 'heroTitleSize',  title: 'Hero Title Size', type: 'string', options: { list: ['48px', '60px', '72px', '84px'] } },
    { name: 'heroDescription',  title: 'Hero Description', type: 'text' },
    { name: 'heroDescriptionColor',  title: 'Hero Description Color', type: 'string', options: { list: ['#000000', '#ffffff', '#666666'] } },
    { name: 'heroDescriptionSize',  title: 'Hero Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'heroImageUrl',  title: 'Hero Image URL', type: 'image' },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

export const productsPage = {
  name: 'productsPage',
  type: 'document',
  title: 'Products Page',
  fields: [
    { name: 'heroSubtitle',  title: 'Hero Subtitle', type: 'string' },
    { name: 'heroSubtitleColor',  title: 'Hero Subtitle Color', type: 'string', options: { list: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#000000', '#ffffff'] } },
    { name: 'heroSubtitleSize',  title: 'Hero Subtitle Size', type: 'string', options: { list: ['12px', '14px', '16px'] } },
    { name: 'heroTitle',  title: 'Hero Title', type: 'string' },
    { name: 'heroTitleColor',  title: 'Hero Title Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981', '#3b82f6'] } },
    { name: 'heroTitleSize',  title: 'Hero Title Size', type: 'string', options: { list: ['48px', '60px', '72px', '84px'] } },
    { name: 'heroDescription',  title: 'Hero Description', type: 'text' },
    { name: 'heroDescriptionColor',  title: 'Hero Description Color', type: 'string', options: { list: ['#000000', '#ffffff', '#666666'] } },
    { name: 'heroDescriptionSize',  title: 'Hero Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'heroImageUrl',  title: 'Hero Image URL', type: 'image' },
    { name: 'introHeading', title: 'Intro Heading', type: 'string' },
    { name: 'introHeadingColor', title: 'Intro Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'introHeadingSize', title: 'Intro Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'introDescription', title: 'Intro Description', type: 'text' },
    { name: 'introDescriptionColor', title: 'Intro Description Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'introDescriptionSize', title: 'Intro Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'statsValue', title: 'Stats Value', type: 'string' },
    { name: 'statsLabel', title: 'Stats Label', type: 'string' },
    { name: 'servicePromiseHeading', title: 'Service Promise Heading', type: 'string' },
    { name: 'servicePromiseHeadingColor', title: 'Service Promise Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'servicePromiseHeadingSize', title: 'Service Promise Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'servicePromiseDescription', title: 'Service Promise Description', type: 'text' },
    { name: 'servicePromiseDescriptionColor', title: 'Service Promise Description Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'servicePromiseDescriptionSize', title: 'Service Promise Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'servicePromiseImageUrl', title: 'Service Promise Image URL', type: 'image' },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

export const storeLocatorPage = {
  name: 'storeLocatorPage',
  type: 'document',
  title: 'Store Locator Page',
  fields: [
    { name: 'heroSubtitle',  title: 'Hero Subtitle', type: 'string' },
    { name: 'heroSubtitleColor',  title: 'Hero Subtitle Color', type: 'string', options: { list: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#000000', '#ffffff'] } },
    { name: 'heroSubtitleSize',  title: 'Hero Subtitle Size', type: 'string', options: { list: ['12px', '14px', '16px'] } },
    { name: 'heroTitle',  title: 'Hero Title', type: 'string' },
    { name: 'heroTitleColor',  title: 'Hero Title Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981', '#3b82f6'] } },
    { name: 'heroTitleSize',  title: 'Hero Title Size', type: 'string', options: { list: ['48px', '60px', '72px', '84px'] } },
    { name: 'heroDescription',  title: 'Hero Description', type: 'text' },
    { name: 'heroDescriptionColor',  title: 'Hero Description Color', type: 'string', options: { list: ['#000000', '#ffffff', '#666666'] } },
    { name: 'heroDescriptionSize',  title: 'Hero Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'heroImageUrl',  title: 'Hero Image URL', type: 'image' },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

export const franchisingPage = {
  name: 'franchisingPage',
  type: 'document',
  title: 'Franchising Page',
  groups: [
    { name: 'hero', title: '1. Hero Section', default: true },
    { name: 'intro', title: '2. Intro Section' },
    { name: 'benefits', title: '3. Benefits Section' },
    { name: 'journey', title: '4. Journey Section' },
    { name: 'training', title: '5. Training Section' },
    { name: 'investment', title: '6. Investment Section' },
    { name: 'international', title: '7. International Section' },
    { name: 'cta', title: '8. CTA Banner' },
  ],
  fields: [
    { name: 'heroSubtitle',  title: 'Hero Subtitle', type: 'string' },
    { name: 'heroSubtitleColor',  title: 'Hero Subtitle Color', type: 'string', options: { list: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#000000', '#ffffff'] } },
    { name: 'heroSubtitleSize',  title: 'Hero Subtitle Size', type: 'string', options: { list: ['12px', '14px', '16px'] } },
    { name: 'heroTitle',  title: 'Hero Title', type: 'string' },
    { name: 'heroTitleColor',  title: 'Hero Title Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981', '#3b82f6'] } },
    { name: 'heroTitleSize',  title: 'Hero Title Size', type: 'string', options: { list: ['48px', '60px', '72px', '84px'] } },
    { name: 'heroDescription',  title: 'Hero Description', type: 'text' },
    { name: 'heroDescriptionColor',  title: 'Hero Description Color', type: 'string', options: { list: ['#000000', '#ffffff', '#666666'] } },
    { name: 'heroDescriptionSize',  title: 'Hero Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'heroImageUrl',  title: 'Hero Image URL', type: 'image' },
    { name: 'introHeading', title: 'Intro Heading', type: 'string' },
    { name: 'introHeadingColor', title: 'Intro Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'introHeadingSize', title: 'Intro Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'introDescription', title: 'Intro Description', type: 'text' },
    { name: 'introDescriptionColor', title: 'Intro Description Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'introDescriptionSize', title: 'Intro Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'introImageUrl', title: 'Intro Image URL', type: 'image' },
    { name: 'benefitsHeading', title: 'Benefits Heading', type: 'string' },
    { name: 'benefitsHeadingColor', title: 'Benefits Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'benefitsHeadingSize', title: 'Benefits Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'journeyHeading', title: 'Journey Heading', type: 'string' },
    { name: 'journeyHeadingColor', title: 'Journey Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'journeyHeadingSize', title: 'Journey Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'trainingHeading', group: 'training', title: 'Training Heading', type: 'string' },
    { name: 'trainingHeadingColor', group: 'training', title: 'Training Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'trainingHeadingSize', group: 'training', title: 'Training Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'trainingDescription', group: 'training', title: 'Training Description', type: 'text' },
    { name: 'trainingDescriptionColor', group: 'training', title: 'Training Description Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'trainingDescriptionSize', group: 'training', title: 'Training Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'trainingImageUrl', title: 'Training Image URL', type: 'image' },
    { name: 'investmentHeading', title: 'Investment Heading', type: 'string' },
    { name: 'investmentHeadingColor', title: 'Investment Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'investmentHeadingSize', title: 'Investment Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'internationalHeading', title: 'International Heading', type: 'string' },
    { name: 'internationalHeadingColor', title: 'International Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'internationalHeadingSize', title: 'International Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'internationalDescription', title: 'International Description', type: 'text' },
    { name: 'internationalDescriptionColor', title: 'International Description Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'internationalDescriptionSize', title: 'International Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

export const fuelPricesPage = {
  name: 'fuelPricesPage',
  type: 'document',
  title: 'Fuel Prices Page',
  fields: [
    { name: 'heroSubtitle',  title: 'Hero Subtitle', type: 'string' },
    { name: 'heroSubtitleColor',  title: 'Hero Subtitle Color', type: 'string', options: { list: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#000000', '#ffffff'] } },
    { name: 'heroSubtitleSize',  title: 'Hero Subtitle Size', type: 'string', options: { list: ['12px', '14px', '16px'] } },
    { name: 'heroTitle',  title: 'Hero Title', type: 'string' },
    { name: 'heroTitleColor',  title: 'Hero Title Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981', '#3b82f6'] } },
    { name: 'heroTitleSize',  title: 'Hero Title Size', type: 'string', options: { list: ['48px', '60px', '72px', '84px'] } },
    { name: 'heroDescription',  title: 'Hero Description', type: 'text' },
    { name: 'heroDescriptionColor',  title: 'Hero Description Color', type: 'string', options: { list: ['#000000', '#ffffff', '#666666'] } },
    { name: 'heroDescriptionSize',  title: 'Hero Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'heroImageUrl',  title: 'Hero Image URL', type: 'image' },
    { name: 'heading', title: 'Prices Heading', type: 'string' },
    { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'headingSize', title: 'Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'trendsHeading', title: 'Trends Heading', type: 'string' },
    { name: 'trendsHeadingColor', title: 'Trends Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'trendsHeadingSize', title: 'Trends Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'trendsDescription', title: 'Trends Description', type: 'text' },
    { name: 'trendsDescriptionColor', title: 'Trends Description Color', type: 'string', options: { list: ['#000000', '#666666'] } },
    { name: 'trendsDescriptionSize', title: 'Trends Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'trendsImageUrl', title: 'Trends Image URL', type: 'image' },
    { name: 'subscribeHeading', title: 'Subscribe Heading', type: 'string' },
    { name: 'subscribeHeadingColor', title: 'Subscribe Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'subscribeHeadingSize', title: 'Subscribe Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    { name: 'subscribeDescription', title: 'Subscribe Description', type: 'text' },
    { name: 'subscribeDescriptionColor', title: 'Subscribe Description Color', type: 'string', options: { list: ['#000000', '#666666', '#ffffff'] } },
    { name: 'subscribeDescriptionSize', title: 'Subscribe Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

export const newsListingPage = {
  name: 'newsListingPage',
  type: 'document',
  title: 'News Listing Page',
  fields: [
    { name: 'heroSubtitle',  title: 'Hero Subtitle', type: 'string' },
    { name: 'heroSubtitleColor',  title: 'Hero Subtitle Color', type: 'string', options: { list: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#000000', '#ffffff'] } },
    { name: 'heroSubtitleSize',  title: 'Hero Subtitle Size', type: 'string', options: { list: ['12px', '14px', '16px'] } },
    { name: 'heroTitle',  title: 'Hero Title', type: 'string' },
    { name: 'heroTitleColor',  title: 'Hero Title Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981', '#3b82f6'] } },
    { name: 'heroTitleSize',  title: 'Hero Title Size', type: 'string', options: { list: ['48px', '60px', '72px', '84px'] } },
    { name: 'heroDescription',  title: 'Hero Description', type: 'text' },
    { name: 'heroDescriptionColor',  title: 'Hero Description Color', type: 'string', options: { list: ['#000000', '#ffffff', '#666666'] } },
    { name: 'heroDescriptionSize',  title: 'Hero Description Size', type: 'string', options: { list: ['16px', '18px', '20px'] } },
    { name: 'heroImageUrl',  title: 'Hero Image URL', type: 'image' },
    { name: 'heading', title: 'News Heading', type: 'string' },
    { name: 'headingColor', title: 'Heading Color', type: 'string', options: { list: ['#000000', '#ffffff', '#10b981'] } },
    { name: 'headingSize', title: 'Heading Size', type: 'string', options: { list: ['36px', '48px', '60px'] } },
    {
      name: 'ctaBanner',  title: 'CTA Banner', type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading',    title: 'Heading',     type: 'string' },
        { name: 'text',       title: 'Body Text',   type: 'text' },
        { name: 'buttonText', title: 'Button Text', type: 'string' },
        { name: 'buttonLink', title: 'Button Link', type: 'string' },
        { name: 'phone',      title: 'Phone',       type: 'string' },
        { name: 'email',      title: 'Email',       type: 'string' },
        { name: 'address',    title: 'Address',     type: 'string' },
      ],
    },
  ],
}

// ─── Site Settings ────────────────────────────────────────────────────────────────
const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'contact', title: 'Contact Info' },
    { name: 'social', title: 'Social Media' },
    { name: 'header', title: 'Header Settings' },
    { name: 'footer', title: 'Footer Settings' },
    { name: 'seo', title: 'SEO & Metadata' },
  ],
  fields: [
    // General
    { name: 'siteName', group: 'general', title: 'Site Name', type: 'string' },
    { name: 'logo', group: 'general', title: 'Logo', type: 'image' },

    // Contact Info
    { name: 'phone', group: 'contact', title: 'Phone', type: 'string', description: 'Main contact phone number' },
    { name: 'email', group: 'contact', title: 'Email', type: 'string', description: 'Main contact email' },
    { name: 'address', group: 'contact', title: 'Address', type: 'string', description: 'Physical address' },
    { name: 'emergencyPhone', group: 'contact', title: 'Emergency Phone (24/7)', type: 'string', description: 'Emergency contact number' },

    // Social Media
    { name: 'facebookUrl', group: 'social', title: 'Facebook URL', type: 'url' },
    { name: 'instagramUrl', group: 'social', title: 'Instagram URL', type: 'url' },
    { name: 'linkedinUrl', group: 'social', title: 'LinkedIn URL', type: 'url' },
    { name: 'twitterUrl', group: 'social', title: 'X / Twitter URL', type: 'url' },
    { name: 'youtubeUrl', group: 'social', title: 'YouTube URL', type: 'url' },

    // Header Settings
    { name: 'topRibbonContactText', group: 'header', title: 'Top Ribbon - Contact Link Text', type: 'string', description: 'Text for "Contact Us" link in top ribbon' },
    { name: 'headerCallButtonText', group: 'header', title: 'Header - Call Button Text', type: 'string', description: 'Text for call button in header' },
    { name: 'headerQuoteButtonText', group: 'header', title: 'Header - Quote Button Text', type: 'string', description: 'Text for quote button in header' },
    { name: 'headerQuoteButtonLink', group: 'header', title: 'Header - Quote Button Link', type: 'string' },
    { name: 'mobileMenuQuoteButtonText', group: 'header', title: 'Mobile Menu - Quote Button Text', type: 'string' },
    { name: 'mobileMenuQuoteButtonLink', group: 'header', title: 'Mobile Menu - Quote Button Link', type: 'string' },
    { name: 'topRibbonContactLink', group: 'header', title: 'Top Ribbon - Contact Link', type: 'string' },
    {
      name: 'heroQuickLinks',
      group: 'header',
      title: 'Homepage Hero Quick Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', title: 'Label', type: 'string'},
          {name: 'href', title: 'Link', type: 'string'},
          {name: 'icon', title: 'Icon', type: 'string'},
          {name: 'isEmergency', title: 'Emergency Style', type: 'boolean'},
        ],
      }],
    },

    // Footer Settings
    { name: 'footerDescription', group: 'footer', title: 'Footer Description', type: 'text' },
    { name: 'copyrightText', group: 'footer', title: 'Copyright Text', type: 'string', description: 'E.g., "Atlas Fuel Australia Pty Ltd. All rights reserved."' },

    // SEO & Metadata
    { name: 'siteTitle', group: 'seo', title: 'Site Title', type: 'string', description: 'Used in browser title and meta tags' },
    { name: 'siteDescription', group: 'seo', title: 'Site Description', type: 'text', description: 'Default meta description for SEO' },
    { name: 'baseUrl', group: 'seo', title: 'Base URL', type: 'url', description: 'E.g., https://atlasfuel.com.au' },
    {
      name: 'ctaBanner',
      group: 'general',
      title: 'Default CTA Banner',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        ...styledTextFields('heading', 'Heading'),
        ...styledTextFields('text', 'Body Text', 'text', {rows: 2}),
        ...styledTextFields('buttonText', 'Button Text'),
        {name: 'buttonLink', title: 'Button Link', type: 'string'},
        ...styledTextFields('phone', 'Phone'),
        ...styledTextFields('email', 'Email'),
        ...styledTextFields('address', 'Address'),
      ],
    },

    // Legacy fields (keep for backward compatibility)
    { name: 'heroEyebrow', group: 'general', title: 'Hero Eyebrow', type: 'string' },
    { name: 'visionQuote', group: 'general', title: 'Vision Quote', type: 'text' },
    { name: 'visionAttribution', group: 'general', title: 'Vision Attribution', type: 'string' },
    { name: 'communityTag', group: 'general', title: 'Community Tag', type: 'string' },
    { name: 'communityHeading', group: 'general', title: 'Community Heading', type: 'string' },
    { name: 'ctaBannerHeading', group: 'general', title: 'CTA Banner Heading', type: 'string' },
    { name: 'ctaBannerText', group: 'general', title: 'CTA Banner Text', type: 'text' },
  ],
}

// ─── Mega Menu Navigation ───────────────────────────────────────────────────────
const megaMenu = {
  name: 'megaMenu',
  title: 'Mega Menu Navigation',
  type: 'document',
  fields: [
    {
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            { name: 'id', title: 'ID (unique identifier)', type: 'string', validation: Rule => Rule.required() },
            { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
            { name: 'href', title: 'Link URL', type: 'string', validation: Rule => Rule.required() },
            { name: 'calloutHeading', title: 'Callout Heading', type: 'string' },
            { name: 'calloutCta', title: 'Callout CTA Text', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 3 },
            {
              name: 'groups',
              title: 'Menu Groups',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'group',
                  fields: [
                    { name: 'heading', title: 'Group Heading', type: 'string' },
                    {
                      name: 'links',
                      title: 'Links',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          name: 'link',
                          fields: [
                            { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
                            { name: 'excerpt', title: 'Excerpt/Description', type: 'text', rows: 2 },
                            { name: 'href', title: 'Link URL', type: 'string', validation: Rule => Rule.required() },
                            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
                          ],
                          preview: {
                            select: {
                              title: 'label',
                              subtitle: 'href',
                              media: 'image',
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'featured',
              title: 'Featured Item',
              type: 'object',
              fields: [
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'href', title: 'Link URL', type: 'string' },
                { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
              ],
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Mega Menu Navigation',
      }
    },
  },
}

const footerNavigation = {
  name: 'footerNavigation',
  title: 'Footer Navigation',
  type: 'document',
  fields: [
    // Company Section
    { name: 'companySectionHeading', title: 'Company Section Heading', type: 'string', description: 'Heading for the Company links section' },
    {
      name: 'companyLinks', title: 'Company Links', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Link Text', type: 'string' },
          { name: 'href', title: 'Link URL', type: 'string' },
        ],
        preview: {
          select: { title: 'label', subtitle: 'href' },
        },
      }],
    },
    // Services Section
    { name: 'servicesSectionHeading', title: 'Services Section Heading', type: 'string', description: 'Heading for the Services links section' },
    {
      name: 'servicesLinks', title: 'Services Links', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Link Text', type: 'string' },
          { name: 'href', title: 'Link URL', type: 'string' },
        ],
        preview: {
          select: { title: 'label', subtitle: 'href' },
        },
      }],
    },
    // Support Section
    { name: 'supportSectionHeading', title: 'Support Section Heading', type: 'string', description: 'Heading for the Support links section' },
    {
      name: 'supportLinks', title: 'Support Links', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Link Text', type: 'string' },
          { name: 'href', title: 'Link URL', type: 'string' },
        ],
        preview: {
          select: { title: 'label', subtitle: 'href' },
        },
      }],
    },
    // Legal Section
    {
      name: 'legalLinks', title: 'Legal Links', type: 'array',
      description: 'Privacy Policy, Disclaimer, etc.',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Link Text', type: 'string' },
          { name: 'href', title: 'Link URL', type: 'string' },
        ],
        preview: {
          select: { title: 'label', subtitle: 'href' },
        },
      }],
    },
  ],
}

const errorPages = {
  name: 'errorPages',
  title: 'Error Pages',
  type: 'document',
  fields: [
    // 404 Page
    { name: 'notFoundHeading', title: '404 - Heading', type: 'string', description: 'e.g., "404"' },
    { name: 'notFoundSubheading', title: '404 - Subheading', type: 'string', description: 'e.g., "Page Not Found"' },
    { name: 'notFoundDescription', title: '404 - Description', type: 'text', description: 'Error message text' },
    { name: 'notFoundButtonText', title: '404 - Button Text', type: 'string', description: 'e.g., "Return Home"' },
    { name: 'notFoundButtonLink', title: '404 - Button Link', type: 'string', description: 'e.g., "/"' },

    // General Error Page
    { name: 'errorHeading', title: 'Error - Heading', type: 'string', description: 'e.g., "Error"' },
    { name: 'errorSubheading', title: 'Error - Subheading', type: 'string', description: 'e.g., "Something went wrong"' },
    { name: 'errorDescription', title: 'Error - Description', type: 'text', description: 'Error message text' },
    { name: 'errorButtonText', title: 'Error - Button Text', type: 'string', description: 'e.g., "Try Again"' },
  ],
}

const organizePageSchema = (schema, groups, fieldGroups, defaultGroup = 'hero') => {
  schema.groups = groups.map(([name, title], index) => ({
    name,
    title: `${index + 1}. ${title}`,
    ...(index === 0 ? { default: true } : {}),
  }))
  schema.fields = schema.fields.map((field) => ({
    ...field,
    group: field.group
      || fieldGroups.find(([prefix]) => field.name === prefix || field.name.startsWith(prefix))?.[1]
      || defaultGroup,
  }))
}

organizePageSchema(contactPage, [
  ['hero', 'Hero Section'],
  ['info', 'Contact Information'],
  ['form', 'Contact Form'],
  ['cta', 'CTA Banner'],
], [
  ['hero', 'hero'],
  ['address', 'info'],
  ['phone', 'info'],
  ['email', 'info'],
  ['weekdaysHours', 'info'],
  ['saturdayHours', 'info'],
  ['sundayHours', 'info'],
  ['emergencySupport', 'info'],
  ['form', 'form'],
  ['submitButtonText', 'form'],
  ['successMessage', 'form'],
  ['ctaBanner', 'cta'],
])

organizePageSchema(fuelTransportationPage, [
  ['hero', 'Hero Section'],
  ['fleet', 'Fleet Introduction'],
  ['services', 'Transport Services'],
  ['coverage', 'Nationwide Coverage'],
  ['team', 'Transport Team'],
  ['process', 'Delivery Process'],
  ['safety', 'Safety'],
  ['fleetGallery', 'Fleet Gallery'],
  ['excellence', 'Excellence'],
  ['cta', 'CTA Banner'],
], [
  ['hero', 'hero'],
  ['fleetGallery', 'fleetGallery'],
  ['fleet', 'fleet'],
  ['services', 'services'],
  ['coverage', 'coverage'],
  ['team', 'team'],
  ['process', 'process'],
  ['safety', 'safety'],
  ['excellence', 'excellence'],
  ['ctaBanner', 'cta'],
])

organizePageSchema(careersPage, [
  ['hero', 'Hero Section'],
  ['whyWork', 'Why Work With Us'],
  ['culture', 'Culture'],
  ['openings', 'Open Positions'],
  ['talent', 'Talent Rising'],
  ['teamGallery', 'Team Gallery'],
  ['office', 'Office Locations'],
  ['training', 'Training'],
  ['events', 'Team Events'],
  ['excellence', 'Excellence'],
  ['cta', 'CTA Banner'],
], [
  ['hero', 'hero'],
  ['whyWork', 'whyWork'],
  ['culture', 'culture'],
  ['openings', 'openings'],
  ['jobOpenings', 'openings'],
  ['talent', 'talent'],
  ['teamGallery', 'teamGallery'],
  ['office', 'office'],
  ['training', 'training'],
  ['events', 'events'],
  ['teamEvents', 'events'],
  ['excellence', 'excellence'],
  ['ctaBanner', 'cta'],
])

organizePageSchema(communityPage, [
  ['hero', 'Hero Section'],
  ['initiatives', 'Community Initiatives'],
  ['genderEquality', 'Gender Equality'],
  ['impact', 'Community Impact'],
  ['supportingLocals', 'Supporting Locals'],
  ['regional', 'Regional Communities'],
  ['story', 'Community Story'],
  ['cta', 'CTA Banner'],
], [
  ['hero', 'hero'],
  ['initiatives', 'initiatives'],
  ['genderEquality', 'genderEquality'],
  ['impact', 'impact'],
  ['supportingLocals', 'supportingLocals'],
  ['regional', 'regional'],
  ['story', 'story'],
  ['ctaBanner', 'cta'],
])

organizePageSchema(atlasCarRacingPage, [
  ['hero', 'Hero Section'],
  ['meetGtr', 'Meet the GTR'],
  ['gallery', 'Racing Gallery'],
  ['pillars', 'Racing Pillars'],
  ['sponsorship', 'Sponsorship'],
  ['prado', 'Prado Project'],
  ['contact', 'Racing Contact'],
  ['cta', 'CTA Banner'],
], [
  ['hero', 'hero'],
  ['meetGtr', 'meetGtr'],
  ['gallery', 'gallery'],
  ['pillars', 'pillars'],
  ['sponsorship', 'sponsorship'],
  ['prado', 'prado'],
  ['contact', 'contact'],
  ['ctaBanner', 'cta'],
])

organizePageSchema(commercialDieselPage, [
  ['hero', 'Hero Section'],
  ['industries', 'Industries Introduction'],
  ['sectors', 'Commercial Sectors'],
  ['bunker', 'Bunker Fuel'],
  ['ownStation', 'Own Station'],
  ['doYouKnow', 'Did You Know'],
  ['mining', 'Mining'],
  ['agriculture', 'Agriculture'],
  ['whatWeOffer', 'What We Offer'],
  ['transportation', 'Transportation'],
  ['compliance', 'Compliance'],
  ['cta', 'CTA Banner'],
], [
  ['hero', 'hero'],
  ['industries', 'industries'],
  ['sectors', 'sectors'],
  ['bunker', 'bunker'],
  ['ownStation', 'ownStation'],
  ['doYouKnow', 'doYouKnow'],
  ['mining', 'mining'],
  ['agriculture', 'agriculture'],
  ['whatWeOffer', 'whatWeOffer'],
  ['transportation', 'transportation'],
  ['compliance', 'compliance'],
  ['ctaBanner', 'cta'],
])

organizePageSchema(fuelStationEnquiryPage, [
  ['hero', 'Hero Section'],
  ['cta', 'CTA Banner'],
], [
  ['hero', 'hero'],
  ['ctaBanner', 'cta'],
])

organizePageSchema(productsPage, [
  ['hero', 'Hero Section'],
  ['intro', 'Products Introduction'],
  ['stats', 'Product Statistics'],
  ['servicePromise', 'Service Promise'],
  ['cta', 'CTA Banner'],
], [
  ['hero', 'hero'],
  ['intro', 'intro'],
  ['stats', 'stats'],
  ['servicePromise', 'servicePromise'],
  ['ctaBanner', 'cta'],
])

organizePageSchema(storeLocatorPage, [
  ['hero', 'Hero Section'],
  ['cta', 'CTA Banner'],
], [
  ['hero', 'hero'],
  ['ctaBanner', 'cta'],
])

organizePageSchema(franchisingPage, [
  ['hero', 'Hero Section'],
  ['intro', 'Franchise Introduction'],
  ['benefits', 'Franchise Benefits'],
  ['journey', 'Franchise Journey'],
  ['training', 'Training and Support'],
  ['investment', 'Investment'],
  ['international', 'International Opportunities'],
  ['cta', 'CTA Banner'],
], [
  ['hero', 'hero'],
  ['intro', 'intro'],
  ['benefits', 'benefits'],
  ['journey', 'journey'],
  ['training', 'training'],
  ['investment', 'investment'],
  ['international', 'international'],
  ['ctaBanner', 'cta'],
])

organizePageSchema(fuelPricesPage, [
  ['hero', 'Hero Section'],
  ['prices', 'Fuel Prices'],
  ['trends', 'Price Trends'],
  ['subscribe', 'Price Updates'],
  ['cta', 'CTA Banner'],
], [
  ['hero', 'hero'],
  ['heading', 'prices'],
  ['trends', 'trends'],
  ['subscribe', 'subscribe'],
  ['ctaBanner', 'cta'],
])

organizePageSchema(newsListingPage, [
  ['hero', 'Hero Section'],
  ['listing', 'News Listing'],
  ['cta', 'CTA Banner'],
], [
  ['hero', 'hero'],
  ['heading', 'listing'],
  ['ctaBanner', 'cta'],
])

const withAccessibleImages = (field) => {
  if (field.type === 'image') {
    const existingFields = field.fields || []
    return {
      ...field,
      options: { ...field.options, hotspot: true },
      fields: existingFields.some((item) => item.name === 'alt')
        ? existingFields
        : [
            ...existingFields,
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: (rule) =>
                rule.required().warning('Alt text is important for accessibility and SEO'),
            },
          ],
    }
  }

  if (field.type === 'array') {
    return {
      ...field,
      of: (field.of || []).map((member) => withAccessibleImages(member)),
    }
  }

  if (field.type === 'object') {
    return {
      ...field,
      fields: (field.fields || []).map((child) => withAccessibleImages(child)),
    }
  }

  return field
}

const fuelStationsSectionSpecs = [
  ['heroSection', 'Hero Section', 'hero', 'hero'],
  ['retailIntroSection', 'Retail Introduction', 'retailIntro', 'retailIntro'],
  ['premiumProductsSection', 'Premium Products', 'premium', 'premium'],
  ['independentDealersSection', 'Independent Dealers', 'independent', 'independent'],
  ['gallerySection', 'Station Gallery', 'gallery', 'gallery'],
  ['customerServiceSection', 'Customer Service', 'service', 'service'],
  ['fuelProductsSection', 'Fuel Products', 'fuelTypes', 'products'],
  ['statisticsSection', 'Customer Statistics', 'stats', 'stats'],
  ['dieselSection', 'Diesel Fuel', 'diesel', 'diesel'],
  ['featuresSection', 'Station Features', 'features', 'features'],
  ['excellenceSection', 'Excellence', 'excellence', 'excellence'],
]

const legacyFuelStationsFields = fuelStationsPage.fields

const nestedFuelStationsFields = fuelStationsSectionSpecs.map(
  ([name, title, prefix, group]) => ({
    name,
    title,
    type: 'object',
    group,
    options: { collapsible: true, collapsed: false },
    fields: legacyFuelStationsFields
      .filter((field) => field.name === prefix || field.name.startsWith(prefix))
      .map((field) => {
        const suffix =
          field.name === prefix
            ? field.name
            : field.name.slice(prefix.length)
        const nestedName =
          field.name === prefix
            ? field.name
            : `${suffix.charAt(0).toLowerCase()}${suffix.slice(1)}`

        return withAccessibleImages({
          ...field,
          name: nestedName,
          title: field.title.replace(
            new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'i'),
            ''
          ),
          group: undefined,
        })
      }),
  })
)

fuelStationsPage.fields = [
  ...nestedFuelStationsFields,
  ...legacyFuelStationsFields.map((field) => {
    if (field.name === 'ctaBanner') return withAccessibleImages(field)

    return {
      ...withAccessibleImages(field),
      title: `${field.title} (Legacy)`,
      deprecated: {
        reason: 'Use the matching nested section above. Kept for existing production content.',
      },
      readOnly: true,
      hidden: true,
      initialValue: undefined,
    }
  }),
]

const legacyFuelTransportationFields = fuelTransportationPage.fields

const transportationSectionExtras = {
  heroSection: [
    { name: 'secondaryCtaText', title: 'Secondary Button Text', type: 'string' },
    { name: 'secondaryCtaLink', title: 'Secondary Button Link', type: 'string' },
    {
      name: 'stats',
      title: 'Quick Statistics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
    },
  ],
  fleetSection: [
    { name: 'sectionLabel', title: 'Section Label', type: 'string' },
    {
      name: 'items',
      title: 'Fleet Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'subtitle', title: 'Subtitle', type: 'string' },
        ],
        preview: { select: { title: 'title', subtitle: 'subtitle', media: 'image' } },
      }],
    },
  ],
  servicesSection: [
    { name: 'sectionLabel', title: 'Section Label', type: 'string' },
    {
      name: 'items',
      title: 'Transportation Services',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ],
        preview: { select: { title: 'title', subtitle: 'description', media: 'image' } },
      }],
    },
  ],
  coverageSection: [
    { name: 'sectionLabel', title: 'Section Label', type: 'string' },
    {
      name: 'areas',
      title: 'Coverage Areas',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image' },
          { name: 'region', title: 'Region', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'locations', title: 'Locations', type: 'array', of: [{ type: 'string' }] },
        ],
        preview: { select: { title: 'region', subtitle: 'description', media: 'image' } },
      }],
    },
  ],
  teamSection: [
    { name: 'sectionLabel', title: 'Section Label', type: 'string' },
    {
      name: 'stats',
      title: 'Team Statistics',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'value', title: 'Value', type: 'string' },
          { name: 'label', title: 'Label', type: 'string' },
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
    },
    { name: 'qualifications', title: 'Qualifications', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'images',
      title: 'Team Images',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image' },
          { name: 'alt', title: 'Image Description', type: 'string' },
        ],
        preview: { select: { title: 'alt', media: 'image' } },
      }],
    },
  ],
  processSection: [
    { name: 'sectionLabel', title: 'Section Label', type: 'string' },
    {
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'step', title: 'Step Number', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'image', title: 'Image', type: 'image' },
          { name: 'reverse', title: 'Reverse Layout', type: 'boolean' },
        ],
        preview: { select: { title: 'title', subtitle: 'step', media: 'image' } },
      }],
    },
  ],
  safetySection: [
    { name: 'sectionLabel', title: 'Section Label', type: 'string' },
    { name: 'image', title: 'Safety Image', type: 'image' },
    { name: 'statisticValue', title: 'Safety Statistic Value', type: 'string' },
    { name: 'statisticTitle', title: 'Safety Statistic Title', type: 'string' },
    { name: 'statisticText', title: 'Safety Statistic Description', type: 'text' },
    {
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'label', title: 'Description', type: 'string' },
        ],
        preview: { select: { title: 'name', subtitle: 'label' } },
      }],
    },
  ],
  fleetGallerySection: [
    { name: 'sectionLabel', title: 'Section Label', type: 'string' },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'image', title: 'Image', type: 'image' },
          { name: 'alt', title: 'Image Description', type: 'string' },
        ],
        preview: { select: { title: 'alt', media: 'image' } },
      }],
    },
  ],
  excellenceSection: [
    { name: 'sectionLabel', title: 'Section Label', type: 'string' },
  ],
}

const transportationSectionSpecs = [
  ['heroSection', 'Hero Section', 'hero', 'hero'],
  ['fleetSection', 'Fleet Introduction', 'fleet', 'fleet'],
  ['servicesSection', 'Transport Services', 'services', 'services'],
  ['coverageSection', 'Nationwide Coverage', 'coverage', 'coverage'],
  ['teamSection', 'Transport Team', 'team', 'team'],
  ['processSection', 'Delivery Process', 'process', 'process'],
  ['safetySection', 'Safety', 'safety', 'safety'],
  ['fleetGallerySection', 'Fleet Gallery', 'fleetGallery', 'fleetGallery'],
  ['excellenceSection', 'Excellence', 'excellence', 'excellence'],
]

const nestedFuelTransportationFields = transportationSectionSpecs.map(
  ([name, title, prefix, group]) => {
    const legacyFields = legacyFuelTransportationFields
      .filter((field) => {
        const matchesPrefix = field.name === prefix || field.name.startsWith(prefix)
        const matchesMoreSpecificPrefix = transportationSectionSpecs.some(
          ([, , otherPrefix]) =>
            otherPrefix !== prefix &&
            otherPrefix.startsWith(prefix) &&
            (field.name === otherPrefix || field.name.startsWith(otherPrefix))
        )
        return matchesPrefix && !matchesMoreSpecificPrefix
      })
      .map((field) => {
        const suffix = field.name === prefix ? field.name : field.name.slice(prefix.length)
        const nestedName = field.name === prefix
          ? field.name
          : `${suffix.charAt(0).toLowerCase()}${suffix.slice(1)}`

        return {
          ...field,
          name: nestedName,
          group: undefined,
        }
      })

    return withAccessibleImages({
      name,
      title,
      type: 'object',
      group,
      options: { collapsible: true, collapsed: false },
      fields: [...legacyFields, ...(transportationSectionExtras[name] || [])],
    })
  }
)

fuelTransportationPage.fields = [
  ...nestedFuelTransportationFields,
  ...legacyFuelTransportationFields.map((field) => {
    if (field.name === 'ctaBanner') return withAccessibleImages(field)

    return {
      ...withAccessibleImages(field),
      title: `${field.title} (Legacy)`,
      deprecated: {
        reason: 'Use the matching nested section above. Kept for existing production content.',
      },
      readOnly: true,
      hidden: true,
      initialValue: undefined,
    }
  }),
]

const sectionNameForGroup = (groupName) =>
  groupName.endsWith('Section') ? groupName : `${groupName}Section`

const nestGroupedPageSchema = (schema) => {
  if (!schema.groups?.length) return

  const legacyFields = schema.fields
  const canonicalSections = schema.groups.flatMap((group) => {
    const fields = legacyFields.filter(
      (field) => field.group === group.name && field.name !== 'ctaBanner'
    )

    if (!fields.length) return []

    return [{
      name: sectionNameForGroup(group.name),
      title: group.title,
      type: 'object',
      options: {collapsible: true, collapsed: !group.default},
      fields: fields.map((field) => withAccessibleImages({...field, group: undefined})),
    }]
  })

  const ctaBanner = legacyFields.find((field) => field.name === 'ctaBanner')
  const legacyCompatibilityFields = legacyFields
    .filter((field) => field.name !== 'ctaBanner')
    .map((field) => ({
      ...withAccessibleImages(field),
      title: `${field.title} (Legacy)`,
      group: undefined,
      deprecated: {
        reason: 'Use the matching nested section above. Kept for existing production content.',
      },
      readOnly: true,
      hidden: true,
      initialValue: undefined,
    }))

  schema.groups = undefined
  schema.fields = [
    ...canonicalSections,
    ...(ctaBanner ? [withAccessibleImages({...ctaBanner, group: undefined})] : []),
    ...legacyCompatibilityFields,
  ]
}

const groupedSingletons = [
  contactPage,
  careersPage,
  communityPage,
  atlasCarRacingPage,
  commercialDieselPage,
  fuelStationEnquiryPage,
  productsPage,
  storeLocatorPage,
  franchisingPage,
  fuelPricesPage,
  newsListingPage,
]

groupedSingletons.forEach(nestGroupedPageSchema)

const insertBeforeCta = (schema, sections) => {
  const ctaIndex = schema.fields.findIndex((field) => field.name === 'ctaBanner')
  schema.fields.splice(ctaIndex < 0 ? schema.fields.length : ctaIndex, 0, ...sections)
}

const appendSectionFields = (schema, sectionName, fields) => {
  const section = schema.fields.find((field) => field.name === sectionName)
  if (!section) return
  const existing = new Set((section.fields || []).map((field) => field.name))
  section.fields = [
    ...(section.fields || []),
    ...fields.filter((field) => !existing.has(field.name)),
  ]
}

const appendArrayItemFields = (schema, sectionName, arrayName, fields) => {
  const section = schema.fields.find((field) => field.name === sectionName)
  const array = (section?.fields || []).find((field) => field.name === arrayName)
  const member = (array?.of || []).find((item) => item.type === 'object')
  if (!member) return

  const existing = new Set((member.fields || []).map((field) => field.name))
  member.fields = [
    ...(member.fields || []),
    ...fields.filter((field) => !existing.has(field.name)),
  ]
}

const appendTopLevelFields = (schema, fields) => {
  const existing = new Set((schema.fields || []).map((field) => field.name))
  schema.fields = [
    ...(schema.fields || []),
    ...fields.filter((field) => !existing.has(field.name)),
  ]
}

const removeSectionFields = (schema, sectionName, names) => {
  const section = schema.fields.find((field) => field.name === sectionName)
  if (!section) return
  const removed = new Set(names)
  section.fields = (section.fields || []).filter((field) => !removed.has(field.name))
}

const labeledValueArray = (name, title, extraFields = []) => ({
  name,
  title,
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      {name: 'label', title: 'Label', type: 'string'},
      {name: 'value', title: 'Value', type: 'string'},
      ...extraFields,
    ],
    preview: {select: {title: 'label', subtitle: 'value'}},
  }],
})

insertBeforeCta(storeLocatorPage, [
  {
    name: 'mapSection',
    title: '2. Interactive Map',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('eyebrow', 'Eyebrow'),
      ...styledTextFields('heading', 'Heading'),
      ...styledTextFields('description', 'Description', 'text', {rows: 3}),
      defineField({
        name: 'defaultZoom',
        title: 'Default Map Zoom',
        type: 'number',
        description: 'Higher numbers show a closer view. Use 15 for a single station.',
        initialValue: 15,
        validation: (Rule) => Rule.min(3).max(18).integer(),
      }),
      defineField({name: 'mapAriaLabel', title: 'Map Accessibility Label', type: 'string'}),
      defineField({name: 'markerHintText', title: 'Marker Help Text', type: 'string'}),
      defineField({name: 'mapLoadingText', title: 'Map Loading Text', type: 'string'}),
      defineField({name: 'mapUnavailableText', title: 'No Mappable Stations Message', type: 'string'}),
    ],
  },
  {
    name: 'locationsSection',
    title: '3. Store Locations and Map Markers',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('eyebrow', 'Eyebrow'),
      ...styledTextFields('servicesEyebrow', 'Services Eyebrow'),
      ...styledTextFields('servicesHeading', 'Services Heading'),
      {name: 'callButtonText', title: 'Call Button Text', type: 'string'},
      {name: 'directionsHeading', title: 'Directions Heading', type: 'string'},
      {name: 'directionsText', title: 'Directions Text', type: 'text', rows: 2},
      {name: 'directionsButtonText', title: 'Directions Button Text', type: 'string'},
      {name: 'addressLabel', title: 'Address Label', type: 'string'},
      {name: 'phoneLabel', title: 'Phone Label', type: 'string'},
      {name: 'emailLabel', title: 'Email Label', type: 'string'},
      {name: 'hoursLabel', title: 'Hours Label', type: 'string'},
      {name: 'dialogEyebrow', title: 'Map Dialog Eyebrow', type: 'string'},
      {name: 'closeDialogLabel', title: 'Close Dialog Label', type: 'string'},
      {
        name: 'locations',
        title: 'Stores and Markers',
        description: 'Each store becomes one clickable marker on the website map.',
        type: 'array',
        validation: (Rule) => Rule.min(1).error('Add at least one store location.'),
        of: [defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Store Name', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'badge', title: 'Badge', type: 'string', description: 'Example: Atlas Fuel Station or Head Office'}),
            defineField({name: 'summary', title: 'Short Description', type: 'text', rows: 3}),
            cmsImageField('image', 'Dialog Image'),
            defineField({name: 'address', title: 'Address', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({
              name: 'latitude',
              title: 'Latitude',
              type: 'number',
              description: 'Decimal coordinate, for example -32.2358956.',
              validation: (Rule) => Rule.required().min(-90).max(90),
            }),
            defineField({
              name: 'longitude',
              title: 'Longitude',
              type: 'number',
              description: 'Decimal coordinate, for example 115.7805562.',
              validation: (Rule) => Rule.required().min(-180).max(180),
            }),
            defineField({name: 'showOnMap', title: 'Show Marker on Map', type: 'boolean', initialValue: true}),
            defineField({name: 'phone', title: 'Phone', type: 'string'}),
            defineField({name: 'email', title: 'Email', type: 'string', validation: (Rule) => Rule.email()}),
            defineField({name: 'hours', title: 'Opening Hours', type: 'string'}),
            defineField({name: 'mapLink', title: 'Google Maps Directions Link', type: 'url'}),
            labeledValueArray('features', 'Station Features'),
          ],
          preview: {select: {title: 'name', subtitle: 'address'}},
        })],
      },
    ],
  },
  {
    name: 'contactSection',
    title: '4. Contact Offices',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('eyebrow', 'Eyebrow'),
      ...styledTextFields('heading', 'Heading'),
      ...styledTextFields('description', 'Description', 'text', {rows: 3}),
      {
        name: 'offices',
        title: 'Offices',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'address', title: 'Address', type: 'string'},
            {name: 'phone', title: 'Phone', type: 'string'},
            {name: 'email', title: 'Email', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'address'}},
        }],
      },
    ],
  },
])

insertBeforeCta(fuelStationEnquiryPage, [
  {
    name: 'introSection',
    title: 'Franchise Introduction',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('eyebrow', 'Eyebrow'),
      ...styledTextFields('heading', 'Heading'),
      ...styledTextFields('description', 'Description', 'text', {rows: 4}),
      cmsImageField('image', 'Image'),
    ],
  },
  {
    name: 'benefitsSection',
    title: 'Franchise Benefits',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('heading', 'Heading'),
      ...styledTextFields('description', 'Description', 'text', {rows: 2}),
      {
        name: 'benefits',
        title: 'Benefits',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
            {name: 'icon', title: 'Icon', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        }],
      },
    ],
  },
  {
    name: 'journeySection',
    title: 'Success Journey',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('heading', 'Heading'),
      ...styledTextFields('description', 'Description', 'text', {rows: 2}),
      {
        name: 'steps',
        title: 'Steps',
        type: 'array',
        of: [{
          type: 'object',
          fields: [
            {name: 'step', title: 'Step Number', type: 'string'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
          ],
          preview: {select: {title: 'title', subtitle: 'step'}},
        }],
      },
    ],
  },
  {
    name: 'trainingSection',
    title: 'Training and Support',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('heading', 'Heading'),
      ...styledTextFields('description', 'Description', 'text', {rows: 4}),
      {name: 'features', title: 'Training Features', type: 'array', of: [{type: 'string'}]},
      cmsImageField('image', 'Image'),
    ],
  },
  {
    name: 'investmentSection',
    title: 'Investment',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('heading', 'Heading'),
      ...styledTextFields('description', 'Description', 'text', {rows: 2}),
      labeledValueArray('points', 'Investment Points'),
    ],
  },
  {
    name: 'internationalSection',
    title: 'International Enquiries',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('eyebrow', 'Eyebrow'),
      ...styledTextFields('heading', 'Heading'),
      ...styledTextFields('description', 'Description', 'text', {rows: 3}),
      {name: 'buttonText', title: 'WhatsApp Button Text', type: 'string'},
      {name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string'},
      {name: 'whatsappUrl', title: 'WhatsApp Link', type: 'url'},
    ],
  },
])

appendSectionFields(fuelStationEnquiryPage, 'heroSection', [
  {
    name: 'ctaButtons',
    title: 'Hero Buttons',
    type: 'array',
    of: [{
      type: 'object',
      fields: [
        {name: 'text', title: 'Button Text', type: 'string'},
        {name: 'href', title: 'Button Link', type: 'string'},
      ],
      preview: {select: {title: 'text', subtitle: 'href'}},
    }],
  },
])

const franchiseIconOptions = [
  {title: 'Chart', value: 'chart'},
  {title: 'Graduation', value: 'graduation'},
  {title: 'Support', value: 'support'},
  {title: 'Megaphone', value: 'megaphone'},
  {title: 'Truck', value: 'truck'},
  {title: 'Map Pin', value: 'map'},
]
for (const schema of [fuelStationEnquiryPage, franchisingPage]) {
  const section = schema.fields.find((field) => field.name === 'benefitsSection')
  const benefits = section?.fields?.find((field) => field.name === 'benefits')
  const member = benefits?.of?.find((item) => item.type === 'object')
  const icon = member?.fields?.find((field) => field.name === 'icon')
  if (icon) icon.options = {list: franchiseIconOptions}
}

appendSectionFields(fuelPricesPage, 'pricesSection', [
  {name: 'lastUpdated', title: 'Last Updated Text', type: 'string'},
  {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
  {name: 'locationColumnLabel', title: 'Location Column Label', type: 'string'},
  {name: 'dieselColumnLabel', title: 'Diesel Column Label', type: 'string'},
  {name: 'premiumColumnLabel', title: 'Premium Column Label', type: 'string'},
  {name: 'unleadedColumnLabel', title: 'Unleaded Column Label', type: 'string'},
  {
    name: 'prices',
    title: 'Prices by State',
    type: 'array',
    of: [{
      type: 'object',
      fields: [
        {name: 'state', title: 'State', type: 'string'},
        {
          name: 'locations',
          title: 'Locations',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {name: 'name', title: 'Location', type: 'string'},
              {name: 'diesel', title: 'Diesel', type: 'number'},
              {name: 'premium', title: 'Premium', type: 'number'},
              {name: 'unleaded', title: 'Unleaded', type: 'number'},
            ],
            preview: {select: {title: 'name'}},
          }],
        },
      ],
      preview: {select: {title: 'state'}},
    }],
  },
])
appendSectionFields(fuelPricesPage, 'trendsSection', [
  {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
  {
    name: 'trendData',
    title: 'Price Trend Data',
    type: 'array',
    of: [{
      type: 'object',
      fields: [
        {name: 'date', title: 'Date Label', type: 'string'},
        {name: 'diesel', title: 'Diesel', type: 'number'},
        {name: 'premium', title: 'Premium', type: 'number'},
      ],
      preview: {select: {title: 'date'}},
    }],
  },
])
appendSectionFields(fuelPricesPage, 'subscribeSection', [
  {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
  {name: 'emailPlaceholder', title: 'Email Placeholder', type: 'string'},
  {name: 'locationPlaceholder', title: 'Location Placeholder', type: 'string'},
  {name: 'buttonText', title: 'Submit Button Text', type: 'string'},
  {name: 'locations', title: 'Location Options', type: 'array', of: [{type: 'string'}]},
])

insertBeforeCta(productsPage, [{
  name: 'additionalProductsSection',
  title: 'Additional Products',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    ...styledTextFields('heading', 'Heading'),
    ...styledTextFields('description', 'Description', 'text', {rows: 3}),
  ],
}])
appendSectionFields(productsPage, 'servicePromiseSection', [
  {name: 'features', title: 'Service Promise Features', type: 'array', of: [{type: 'string'}]},
])

appendSectionFields(communityPage, 'initiativesSection', [{
  name: 'initiatives',
  title: 'Initiatives',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      {name: 'title', title: 'Title', type: 'string'},
      {name: 'description', title: 'Description', type: 'text', rows: 3},
      {
        name: 'icon',
        title: 'Icon',
        type: 'string',
        options: {
          list: [
            {title: 'Heart', value: 'heart'},
            {title: 'Handshake', value: 'handshake'},
            {title: 'Support Shield', value: 'support'},
            {title: 'Graduation', value: 'graduation'},
          ],
        },
      },
      cmsImageField('image', 'Image'),
    ],
    preview: {select: {title: 'title', subtitle: 'description', media: 'image'}},
  }],
}])
appendSectionFields(communityPage, 'initiativesSection', [
  {name: 'initiativesEyebrow', title: 'Eyebrow', type: 'string'},
])
appendSectionFields(communityPage, 'impactSection', [
  labeledValueArray('stats', 'Impact Statistics', [
    {name: 'description', title: 'Description', type: 'string'},
  ]),
])
appendSectionFields(communityPage, 'genderEqualitySection', [
  {name: 'genderEqualityEyebrow', title: 'Eyebrow', type: 'string'},
])
appendSectionFields(communityPage, 'supportingLocalsSection', [
  {name: 'supportingLocalsEyebrow', title: 'Eyebrow', type: 'string'},
])
appendSectionFields(communityPage, 'regionalSection', [
  {name: 'regionalEyebrow', title: 'Eyebrow', type: 'string'},
  {name: 'regionalSubtitle', title: 'Subtitle', type: 'string'},
  {
    name: 'regionalImages',
    title: 'Regional Images',
    type: 'array',
    of: [{
      type: 'object',
      fields: [cmsImageField('image', 'Image'), {name: 'alt', title: 'Alternative Text', type: 'string'}],
      preview: {select: {title: 'alt', media: 'image'}},
    }],
  },
])

appendSectionFields(careersPage, 'heroSection', [
  labeledValueArray('stats', 'Hero Statistics', [
    {name: 'sublabel', title: 'Description', type: 'string'},
  ]),
  {name: 'secondaryCtaText', title: 'Secondary CTA Text', type: 'string'},
  {name: 'secondaryCtaLink', title: 'Secondary CTA Link', type: 'string'},
])
appendSectionFields(careersPage, 'cultureSection', [
  {name: 'values', title: 'Culture Values', type: 'array', of: [{type: 'string'}]},
  {name: 'cultureCtaText', title: 'CTA Text', type: 'string'},
  {name: 'cultureCtaLink', title: 'CTA Link', type: 'string'},
])
appendSectionFields(careersPage, 'whyWorkSection', [
  {name: 'whyWorkEyebrow', title: 'Eyebrow', type: 'string'},
])
appendSectionFields(careersPage, 'cultureSection', [
  {name: 'cultureEyebrow', title: 'Eyebrow', type: 'string'},
])
appendSectionFields(careersPage, 'openingsSection', [
  {name: 'openingsEyebrow', title: 'Eyebrow', type: 'string'},
  {name: 'jobCtaText', title: 'Job CTA Text', type: 'string'},
  {name: 'jobCtaLink', title: 'Job CTA Link', type: 'string'},
])
appendSectionFields(careersPage, 'talentSection', [
  {name: 'talentEyebrow', title: 'Eyebrow', type: 'string'},
  {name: 'talentStatValue', title: 'Statistic Value', type: 'string'},
  {name: 'talentStatLabel', title: 'Statistic Label', type: 'string'},
  {name: 'talentStatDescription', title: 'Statistic Description', type: 'string'},
  {name: 'talentFeatures', title: 'Program Features', type: 'array', of: [{type: 'string'}]},
  {name: 'talentCtaText', title: 'CTA Text', type: 'string'},
  {name: 'talentCtaLink', title: 'CTA Link', type: 'string'},
])
for (const [sectionName, fieldName, title] of [
  ['teamGallerySection', 'teamGalleryEyebrow', 'Team Gallery'],
  ['officeSection', 'officeEyebrow', 'Offices'],
  ['trainingSection', 'trainingEyebrow', 'Training'],
  ['eventsSection', 'eventsEyebrow', 'Events'],
  ['excellenceSection', 'excellenceEyebrow', 'Excellence'],
]) {
  appendSectionFields(careersPage, sectionName, [
    {name: fieldName, title: `${title} Eyebrow`, type: 'string'},
  ])
}
insertBeforeCta(careersPage, [{
  name: 'applicationSection',
  title: 'Job Application Form',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    {name: 'applicationEyebrow', title: 'Eyebrow', type: 'string'},
    ...styledTextFields('applicationHeading', 'Heading'),
    ...styledTextFields('applicationDescription', 'Description', 'text', {rows: 2}),
    {name: 'applicationButtonText', title: 'Submit Button Text', type: 'string'},
    {
      name: 'applicationFields',
      title: 'Form Fields',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', title: 'Field Name', type: 'string'},
          {name: 'label', title: 'Label', type: 'string'},
          {name: 'type', title: 'Type', type: 'string', options: {list: ['text', 'email', 'tel', 'textarea']}},
          {name: 'placeholder', title: 'Placeholder', type: 'string'},
          {name: 'fullWidth', title: 'Full Width', type: 'boolean'},
        ],
        preview: {select: {title: 'label', subtitle: 'type'}},
      }],
    },
  ],
}])

appendSectionFields(atlasCarRacingPage, 'heroSection', [
  labeledValueArray('specs', 'Vehicle Specifications'),
  {name: 'heroPlateLabel', title: 'Plate Label', type: 'string'},
  {name: 'heroScrollLabel', title: 'Scroll Label', type: 'string'},
  {name: 'heroImageAlt', title: 'Image Alt Text', type: 'string'},
])
appendSectionFields(atlasCarRacingPage, 'meetGtrSection', [{
  name: 'images',
  title: 'Meet the GTR Images',
  type: 'array',
  of: [cmsImageField('image', 'Image')],
}])
appendSectionFields(atlasCarRacingPage, 'meetGtrSection', [
  {name: 'meetGtrEyebrow', title: 'Eyebrow', type: 'string'},
])
appendSectionFields(atlasCarRacingPage, 'gallerySection', [{
  name: 'images',
  title: 'Performance Gallery',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      cmsImageField('image', 'Image'),
      {name: 'caption', title: 'Caption', type: 'string'},
      {name: 'featured', title: 'Featured Large Image', type: 'boolean'},
    ],
    preview: {select: {title: 'caption', media: 'image'}},
  }],
}])
appendSectionFields(atlasCarRacingPage, 'gallerySection', [
  {name: 'galleryEyebrow', title: 'Eyebrow', type: 'string'},
])
appendSectionFields(atlasCarRacingPage, 'pillarsSection', [{
  name: 'pillars',
  title: 'Purpose Pillars',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      {
        name: 'icon',
        title: 'Icon',
        type: 'string',
        options: {
          list: [
            {title: 'Community', value: 'community'},
            {title: 'Motorsport', value: 'motorsport'},
            {title: 'Partnership', value: 'partnership'},
            {title: 'Charity', value: 'charity'},
          ],
        },
      },
      {name: 'title', title: 'Title', type: 'string'},
      {name: 'description', title: 'Description', type: 'text', rows: 3},
    ],
    preview: {select: {title: 'title', subtitle: 'description'}},
  }],
}])
appendSectionFields(atlasCarRacingPage, 'pillarsSection', [
  {name: 'pillarsEyebrow', title: 'Eyebrow', type: 'string'},
])
appendSectionFields(atlasCarRacingPage, 'sponsorshipSection', [
  {name: 'sponsorshipEyebrow', title: 'Eyebrow', type: 'string'},
  {name: 'benefits', title: 'Sponsorship Benefits', type: 'array', of: [{type: 'string'}]},
])
appendSectionFields(atlasCarRacingPage, 'pradoSection', [
  {name: 'pradoEyebrow', title: 'Eyebrow', type: 'string'},
  {name: 'pradoImageAlt', title: 'Image Alt Text', type: 'string'},
])
appendSectionFields(atlasCarRacingPage, 'contactSection', [{
  name: 'methods',
  title: 'Contact Methods',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      {name: 'label', title: 'Label', type: 'string'},
      {name: 'value', title: 'Value', type: 'string'},
      {name: 'href', title: 'Link', type: 'string'},
      {
        name: 'icon',
        title: 'Icon',
        type: 'string',
        options: {
          list: [
            {title: 'WhatsApp', value: 'whatsapp'},
            {title: 'Phone', value: 'phone'},
            {title: 'Email', value: 'email'},
          ],
        },
      },
    ],
    preview: {select: {title: 'label', subtitle: 'value'}},
  }],
}])
appendSectionFields(atlasCarRacingPage, 'contactSection', [
  {name: 'contactEyebrow', title: 'Eyebrow', type: 'string'},
])

appendSectionFields(franchisingPage, 'introSection', [
  {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
])
appendSectionFields(franchisingPage, 'benefitsSection', [
  {name: 'description', title: 'Description', type: 'text', rows: 2},
  {
    name: 'benefits',
    title: 'Franchise Benefits',
    type: 'array',
    of: [{
      type: 'object',
      fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'description', title: 'Description', type: 'text', rows: 3},
        {name: 'icon', title: 'Icon', type: 'string'},
      ],
      preview: {select: {title: 'title', subtitle: 'description'}},
    }],
  },
])
appendSectionFields(franchisingPage, 'journeySection', [
  {name: 'description', title: 'Description', type: 'text', rows: 2},
  {
    name: 'steps',
    title: 'Journey Steps',
    type: 'array',
    of: [{
      type: 'object',
      fields: [
        {name: 'step', title: 'Step Number', type: 'string'},
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'description', title: 'Description', type: 'text', rows: 3},
      ],
      preview: {select: {title: 'title', subtitle: 'step'}},
    }],
  },
])
appendSectionFields(franchisingPage, 'trainingSection', [
  {name: 'features', title: 'Training Features', type: 'array', of: [{type: 'string'}]},
])
appendSectionFields(franchisingPage, 'investmentSection', [
  {name: 'description', title: 'Description', type: 'text', rows: 2},
  labeledValueArray('points', 'Investment Points'),
])
appendSectionFields(franchisingPage, 'internationalSection', [
  {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
  {name: 'buttonText', title: 'WhatsApp Button Text', type: 'string'},
  {name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string'},
  {name: 'whatsappUrl', title: 'WhatsApp Link', type: 'url'},
])

appendSectionFields(commercialDieselPage, 'industriesSection', [{
  name: 'industries',
  title: 'Industries',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      {name: 'title', title: 'Title', type: 'string'},
      {name: 'description', title: 'Description', type: 'text', rows: 3},
      {
        name: 'icon',
        title: 'Icon',
        type: 'string',
        options: {
          list: [
            {title: 'Mining', value: 'pickaxe'},
            {title: 'Marine', value: 'anchor'},
            {title: 'Agriculture', value: 'wheat'},
            {title: 'Fuel Station', value: 'fuel'},
            {title: 'Truck', value: 'truck'},
          ],
        },
      },
      cmsImageField('image', 'Image'),
    ],
    preview: {select: {title: 'title', subtitle: 'description', media: 'image'}},
  }],
}])
appendSectionFields(commercialDieselPage, 'industriesSection', [
  {name: 'industriesEyebrow', title: 'Eyebrow', type: 'string'},
])
appendSectionFields(commercialDieselPage, 'sectorsSection', [
  {name: 'sectorsEyebrow', title: 'Eyebrow', type: 'string'},
  {name: 'sectorsImageAlt', title: 'Image Alt Text', type: 'string'},
])
appendSectionFields(commercialDieselPage, 'bunkerSection', [
  {name: 'bunkerEyebrow', title: 'Eyebrow', type: 'string'},
  {name: 'bunkerImageAlt', title: 'Image Alt Text', type: 'string'},
  {name: 'whatsappButtonText', title: 'WhatsApp Button Text', type: 'string'},
  {name: 'ctaHeading', title: 'CTA Heading', type: 'string'},
  {name: 'ctaDescription', title: 'CTA Description', type: 'text', rows: 2},
  {name: 'whatsapp', title: 'WhatsApp Number', type: 'string'},
  {name: 'whatsappUrl', title: 'WhatsApp Link', type: 'url'},
])
appendSectionFields(commercialDieselPage, 'ownStationSection', [
  {name: 'ctaText', title: 'CTA Text', type: 'string'},
  {name: 'ctaLink', title: 'CTA Link', type: 'string'},
])
appendSectionFields(commercialDieselPage, 'doYouKnowSection', [
  labeledValueArray('stats', 'Impact Statistics'),
])
appendSectionFields(commercialDieselPage, 'miningSection', [
  {name: 'statValue', title: 'Statistic Value', type: 'string'},
  {name: 'statLabel', title: 'Statistic Label', type: 'string'},
])
appendSectionFields(commercialDieselPage, 'agricultureSection', [{
  name: 'features',
  title: 'Agriculture Features',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      {name: 'title', title: 'Title', type: 'string'},
      {name: 'description', title: 'Description', type: 'text', rows: 2},
    ],
    preview: {select: {title: 'title', subtitle: 'description'}},
  }],
}])
appendSectionFields(commercialDieselPage, 'transportationSection', [
  {name: 'ctaHeading', title: 'CTA Heading', type: 'string'},
  {name: 'ctaDescription', title: 'CTA Description', type: 'text', rows: 2},
  {name: 'ctaText', title: 'CTA Text', type: 'string'},
  {name: 'ctaLink', title: 'CTA Link', type: 'string'},
])
appendSectionFields(commercialDieselPage, 'complianceSection', [{
  name: 'certifications',
  title: 'Certifications',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      {name: 'name', title: 'Name', type: 'string'},
      {name: 'label', title: 'Description', type: 'string'},
      cmsImageField('image', 'Certificate Image'),
    ],
    preview: {select: {title: 'name', subtitle: 'label', media: 'image'}},
  }],
}])
appendSectionFields(commercialDieselPage, 'complianceSection', [
  {name: 'complianceEyebrow', title: 'Eyebrow', type: 'string'},
])

appendSectionFields(contactPage, 'infoSection', [
  {name: 'infoHeading', title: 'Contact Information Heading', type: 'string'},
  {name: 'country', title: 'Country', type: 'string'},
  {name: 'phoneNote', title: 'Phone Note', type: 'string'},
  {name: 'emailNote', title: 'Email Note', type: 'string'},
  {name: 'hoursHeading', title: 'Business Hours Heading', type: 'string'},
  {name: 'callButtonText', title: 'Call Button Text', type: 'string'},
  {name: 'stationButtonText', title: 'Station Button Text', type: 'string'},
  {name: 'stationButtonLink', title: 'Station Button Link', type: 'string'},
  {name: 'mapEmbedUrl', title: 'Map Embed URL', type: 'url'},
  {name: 'mapHeading', title: 'Map Heading', type: 'string'},
  {name: 'directionsButtonText', title: 'Directions Button Text', type: 'string'},
  {name: 'directionsLink', title: 'Directions Link', type: 'url'},
  {name: 'addressLabel', title: 'Address Label', type: 'string'},
  {name: 'phoneLabel', title: 'Phone Label', type: 'string'},
  {name: 'emailLabel', title: 'Email Label', type: 'string'},
  {name: 'weekdaysLabel', title: 'Weekdays Label', type: 'string'},
  {name: 'saturdayLabel', title: 'Saturday Label', type: 'string'},
  {name: 'sundayLabel', title: 'Sunday Label', type: 'string'},
  {name: 'emergencyLabel', title: 'Emergency Support Label', type: 'string'},
])
appendSectionFields(contactPage, 'formSection', [
  {
    name: 'fields',
    title: 'Form Fields',
    type: 'array',
    of: [{
      type: 'object',
      fields: [
        {name: 'name', title: 'Field Name', type: 'string'},
        {name: 'label', title: 'Label', type: 'string'},
        {name: 'type', title: 'Type', type: 'string', options: {list: ['text', 'email', 'tel', 'select', 'textarea']}},
        {name: 'placeholder', title: 'Placeholder', type: 'string'},
        {name: 'required', title: 'Required', type: 'boolean'},
        {name: 'options', title: 'Select Options', type: 'array', of: [{type: 'string'}]},
      ],
      preview: {select: {title: 'label', subtitle: 'type'}},
    }],
  },
])

appendSectionFields(newsListingPage, 'listingSection', [
  {name: 'eyebrow', title: 'Listing Eyebrow', type: 'string'},
  {name: 'emptyMessage', title: 'No Articles Message', type: 'string'},
  {name: 'readMoreText', title: 'Read More Text', type: 'string'},
  {name: 'bylinePrefix', title: 'Author Prefix', type: 'string'},
  {name: 'shareHeading', title: 'Share Heading', type: 'string'},
  {name: 'categoriesHeading', title: 'Categories Heading', type: 'string'},
  {name: 'categories', title: 'Categories', type: 'array', of: [{type: 'string'}]},
  {name: 'relatedHeading', title: 'Related Articles Heading', type: 'string'},
])

insertBeforeCta(onsiteBulkDieselPage, [
  {
    name: 'onsiteIntroSection',
    title: 'Onsite Introduction',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('heading', 'Heading'),
      ...styledTextFields('description', 'Description', 'text', {rows: 4}),
      ...styledTextFields('ctaText', 'CTA Text'),
      {name: 'ctaLink', title: 'CTA Link', type: 'string'},
    ],
  },
  {
    name: 'excellenceSection',
    title: 'Excellence',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('tagline', 'Tagline'),
      ...styledTextFields('content', 'Content', 'text', {rows: 5}),
      ...styledTextFields('ctaText', 'CTA Text'),
      {name: 'ctaLink', title: 'CTA Link', type: 'string'},
    ],
  },
  {
    name: 'partnerSection',
    title: 'Onsite Fuel Partner',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('heading', 'Heading'),
      ...styledTextFields('description', 'Description', 'text', {rows: 5}),
      ...styledTextFields('ctaPrimary', 'Primary CTA Text'),
      {name: 'ctaPrimaryLink', title: 'Primary CTA Link', type: 'string'},
      ...styledTextFields('ctaSecondary', 'Secondary CTA Text'),
      {name: 'ctaSecondaryLink', title: 'Secondary CTA Link', type: 'string'},
      cmsImageField('imageUrl', 'Image'),
    ],
  },
])

insertBeforeCta(localFuelDistributorsPage, [
  {
    name: 'introSection',
    title: 'Distributor Introduction',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('heading', 'Heading'),
      ...styledTextFields('content', 'Content', 'text', {rows: 5}),
      ...styledTextFields('ctaText', 'CTA Text'),
      {name: 'ctaLink', title: 'CTA Link', type: 'string'},
    ],
  },
  {
    name: 'serviceSection',
    title: 'Distributor Service',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('heading', 'Heading'),
      ...styledTextFields('content', 'Content', 'text', {rows: 5}),
    ],
  },
  {
    name: 'partnershipSection',
    title: 'Partnership',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('tagline', 'Tagline'),
      ...styledTextFields('content', 'Content', 'text', {rows: 5}),
    ],
  },
  {
    name: 'busyTimesSection',
    title: 'Busy and Hard Times',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      ...styledTextFields('heading', 'Heading'),
      ...styledTextFields('content', 'Content', 'text', {rows: 5}),
      {
        name: 'primaryCta',
        title: 'Primary CTA',
        type: 'object',
        fields: [
          ...styledTextFields('text', 'Text'),
          {name: 'link', title: 'Link', type: 'string'},
        ],
      },
      {
        name: 'secondaryCta',
        title: 'Secondary CTA',
        type: 'object',
        fields: [
          ...styledTextFields('text', 'Text'),
          {name: 'link', title: 'Link', type: 'string'},
        ],
      },
    ],
  },
])

const compactStatsField = {
  name: 'stats',
  title: 'Statistics',
  type: 'array',
  of: [{
    type: 'object',
    fields: [
      {name: 'value', title: 'Value', type: 'string'},
      {name: 'label', title: 'Label', type: 'string'},
    ],
    preview: {select: {title: 'value', subtitle: 'label'}},
  }],
}

const servicePageSchemas = [
  miningFuelPage,
  marineFuelPage,
  agricultureFuelPage,
  fuelRetailersPage,
  onsiteBulkDieselPage,
  localFuelDistributorsPage,
]

appendSectionFields(homePage, 'heroSection', [
  {name: 'quickLinksLabel', title: 'Quick Links Label', type: 'string'},
  {name: 'video', title: 'Hero Video', type: 'cmsVideo'},
])
appendArrayItemFields(homePage, 'featureBoxesSection', 'cards', [
  {name: 'ctaText', title: 'Link Text', type: 'string'},
])
appendArrayItemFields(homePage, 'whatWeDoSection', 'sectors', [
  {name: 'ctaText', title: 'Link Text', type: 'string'},
])
appendSectionFields(homePage, 'visionSection', [
  {name: 'video', title: 'Vision Video', type: 'cmsVideo'},
  {name: 'videoBadgeLabel', title: 'Video Badge Label', type: 'string'},
])
appendSectionFields(homePage, 'certificationsSection', [
  ...styledTextFields('trustBadgeText', 'Trust Badge Heading'),
  ...styledTextFields('trustBadgeSubtext', 'Trust Badge Subtext'),
])
appendArrayItemFields(homePage, 'certificationsSection', 'certifications', [
  {name: 'icon', title: 'Icon', type: 'string'},
])
appendSectionFields(homePage, 'newsSectionMeta', [
  {name: 'bylineLabel', title: 'Author Label', type: 'string'},
  {name: 'readMoreText', title: 'Article Link Text', type: 'string'},
])

appendSectionFields(aboutPage, 'valuesSection', [
  {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
])
appendSectionFields(aboutPage, 'safetySection', [
  {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
  {name: 'imageOverlayLabel', title: 'Image Overlay Label', type: 'string'},
])
appendSectionFields(aboutPage, 'coreValuesSection', [
  {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
])
appendSectionFields(aboutPage, 'cultureSection', [
  {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
])
appendSectionFields(aboutPage, 'excellenceSection', [
  {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
])
removeSectionFields(aboutPage, 'heroSection', [
  'description',
  'descriptionColor',
  'descriptionSize',
  'descriptionBorderEnabled',
  'descriptionBorderColor',
  'descriptionBorderWidth',
  'descriptionShadowColor',
  'stats',
  'borderEnabled',
  'borderColor',
  'borderWidth',
])

appendSectionFields(servicesPage, 'servicesSection', [
  {name: 'scrollHint', title: 'Scroll Hint', type: 'string'},
  {name: 'ctaLabel', title: 'Default Service Link Text', type: 'string'},
])
appendArrayItemFields(servicesPage, 'servicesSection', 'services', [
  {name: 'id', title: 'Stable ID', type: 'string'},
  {name: 'fullDescription', title: 'Full Description', type: 'text', rows: 4},
  compactStatsField,
  {name: 'ctaText', title: 'Link Text', type: 'string'},
])
appendSectionFields(servicesPage, 'statsSection', [
  {name: 'sectionTag', title: 'Section Tag', type: 'string'},
  {name: 'displayHeading', title: 'Display Heading', type: 'string'},
  {name: 'description', title: 'Description', type: 'text', rows: 3},
  {name: 'footerText', title: 'Footer Text', type: 'string'},
  {name: 'ctaText', title: 'CTA Text', type: 'string'},
  {name: 'ctaLink', title: 'CTA Link', type: 'string'},
])
appendSectionFields(servicesPage, 'industriesGridSection', [
  {name: 'ctaLabel', title: 'Default Industry Link Text', type: 'string'},
])
appendArrayItemFields(servicesPage, 'industriesGridSection', 'industries', [
  {name: 'ctaText', title: 'Link Text', type: 'string'},
])
appendSectionFields(servicesPage, 'bunkerRefuelingSection', [
  {name: 'ctaLink', title: 'CTA Link', type: 'string'},
])
appendArrayItemFields(servicesPage, 'timelineSection', 'steps', [
  cmsImageField('image', 'Step Image'),
])

insertBeforeCta(miningFuelPage, [{
  name: 'excellenceSection',
  title: 'Excellence',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    {name: 'sectionTag', title: 'Section Tag', type: 'string'},
    ...styledTextFields('tagline', 'Tagline'),
    ...styledTextFields('content', 'Content', 'text', {rows: 5}),
    ...styledTextFields('ctaText', 'CTA Text'),
    {name: 'ctaLink', title: 'CTA Link', type: 'string'},
  ],
}])

insertBeforeCta(fuelRetailersPage, [{
  name: 'processTimelineSection',
  title: 'Process Timeline',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    {name: 'sectionTag', title: 'Section Tag', type: 'string'},
    ...styledTextFields('heading', 'Heading'),
    ...styledTextFields('subheading', 'Subheading'),
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'number', title: 'Step Number', type: 'string'},
          {name: 'title', title: 'Title', type: 'string'},
          {name: 'description', title: 'Description', type: 'text', rows: 3},
          cmsImageField('image', 'Step Image'),
        ],
        preview: {select: {title: 'title', subtitle: 'number', media: 'image'}},
      }],
    },
  ],
}])

servicePageSchemas.forEach((schema) => {
  appendSectionFields(schema, 'safetySection', [
    {name: 'sectionTag', title: 'Section Tag', type: 'string'},
    {name: 'ctaText', title: 'CTA Text', type: 'string'},
    {name: 'ctaLink', title: 'CTA Link', type: 'string'},
    {
      name: 'cards',
      title: 'Safety Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'label', title: 'Label', type: 'string'},
          {name: 'sublabel', title: 'Sublabel', type: 'string'},
          {name: 'icon', title: 'Icon', type: 'string'},
        ],
        preview: {select: {title: 'label', subtitle: 'sublabel'}},
      }],
    },
  ])
  appendSectionFields(schema, 'fleetComplianceSection', [
    {name: 'sectionTag', title: 'Section Tag', type: 'string'},
    {
      name: 'features',
      title: 'Fleet Features',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'icon', title: 'Icon', type: 'string'},
          {name: 'title', title: 'Title', type: 'string'},
          {name: 'description', title: 'Description', type: 'text', rows: 3},
        ],
        preview: {select: {title: 'title', subtitle: 'description'}},
      }],
    },
  ])
  appendSectionFields(schema, 'driversComplianceSection', [
    {name: 'sectionTag', title: 'Section Tag', type: 'string'},
    {
      name: 'requirements',
      title: 'Driver Requirements',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', title: 'Title', type: 'string'},
          {name: 'subtitle', title: 'Subtitle', type: 'string'},
          {name: 'description', title: 'Description', type: 'text', rows: 3},
        ],
        preview: {select: {title: 'title', subtitle: 'subtitle'}},
      }],
    },
    cmsImageField('imageUrl', 'Driver Image'),
    compactStatsField,
    {name: 'badgeTitle', title: 'Badge Heading', type: 'string'},
    {name: 'badgeSubtitle', title: 'Badge Subheading', type: 'string'},
  ])
  appendArrayItemFields(schema, 'featuresSection', 'features', [
    {name: 'ctaText', title: 'CTA Text', type: 'string'},
    {name: 'ctaLink', title: 'CTA Link', type: 'string'},
  ])
  appendArrayItemFields(schema, 'processTimelineSection', 'steps', [
    cmsImageField('image', 'Step Image'),
  ])
})

appendSectionFields(miningFuelPage, 'miningSectorSection', [
  {name: 'sectionTag', title: 'Section Tag', type: 'string'},
  {name: 'ctaText', title: 'CTA Text', type: 'string'},
  {name: 'ctaLink', title: 'CTA Link', type: 'string'},
  {name: 'secondaryCtaText', title: 'Secondary CTA Text', type: 'string'},
  {name: 'secondaryCtaLink', title: 'Secondary CTA Link', type: 'string'},
  {
    name: 'features',
    title: 'Mining Features',
    type: 'array',
    of: [{
      type: 'object',
      fields: [
        {name: 'icon', title: 'Icon', type: 'string'},
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'description', title: 'Description', type: 'text', rows: 3},
      ],
      preview: {select: {title: 'title', subtitle: 'description'}},
    }],
  },
])
appendSectionFields(miningFuelPage, 'statsSection', [
  {name: 'sectionTag', title: 'Section Tag', type: 'string'},
  {name: 'displayHeading', title: 'Display Heading', type: 'string'},
  {name: 'description', title: 'Description', type: 'text', rows: 3},
  {name: 'footerText', title: 'Footer Text', type: 'string'},
  {name: 'ctaText', title: 'CTA Text', type: 'string'},
  {name: 'ctaLink', title: 'CTA Link', type: 'string'},
])
appendSectionFields(agricultureFuelPage, 'agricultureSection', [
  {name: 'sectionTag', title: 'Section Tag', type: 'string'},
  {name: 'ctaText', title: 'CTA Text', type: 'string'},
  {name: 'ctaLink', title: 'CTA Link', type: 'string'},
  compactStatsField,
])
appendSectionFields(fuelRetailersPage, 'supportSection', [
  {name: 'sectionTag', title: 'Section Tag', type: 'string'},
  compactStatsField,
  {
    name: 'images',
    title: 'Support Images',
    type: 'array',
    of: [{type: 'object', fields: [cmsImageField('image', 'Image')]}],
  },
])
appendSectionFields(onsiteBulkDieselPage, 'onsiteIntroSection', [
  {name: 'sectionTag', title: 'Section Tag', type: 'string'},
  compactStatsField,
  {
    name: 'images',
    title: 'Onsite Images',
    type: 'array',
    of: [{type: 'object', fields: [cmsImageField('image', 'Image')]}],
  },
])
appendSectionFields(onsiteBulkDieselPage, 'partnerSection', [
  {name: 'sectionTag', title: 'Section Tag', type: 'string'},
])

appendSectionFields(servicesPage, 'timelineSection', [
  {name: 'sectionTag', title: 'Section Tag', type: 'string'},
])
appendSectionFields(marineFuelPage, 'featuresSection', [
  {name: 'sectionTag', title: 'Section Tag', type: 'string'},
  {name: 'heading', title: 'Heading', type: 'string'},
])
appendSectionFields(marineFuelPage, 'introSection', [
  {name: 'sectionTag', title: 'Section Tag', type: 'string'},
  {name: 'primaryCtaText', title: 'Primary CTA Text', type: 'string'},
  {name: 'primaryCtaLink', title: 'Primary CTA Link', type: 'string'},
  {name: 'secondaryCtaText', title: 'Secondary CTA Text', type: 'string'},
  {name: 'secondaryCtaLink', title: 'Secondary CTA Link', type: 'string'},
  {name: 'statValue', title: 'Statistic Value', type: 'string'},
  {name: 'statLabel', title: 'Statistic Label', type: 'string'},
])
appendSectionFields(marineFuelPage, 'commercialSection', [
  {name: 'secondaryDescription', title: 'Secondary Description', type: 'text', rows: 3},
])
appendSectionFields(marineFuelPage, 'complianceSection', [
  {name: 'sectionTag', title: 'Section Tag', type: 'string'},
  {name: 'trustText', title: 'Trust Text', type: 'string'},
  {name: 'trustBadges', title: 'Trust Badges', type: 'array', of: [{type: 'string'}]},
])
appendSectionFields(marineFuelPage, 'fleetComplianceSection', [
  {name: 'standardsHeading', title: 'Standards Heading', type: 'string'},
  {name: 'quote', title: 'Quote', type: 'text', rows: 3},
])
appendSectionFields(marineFuelPage, 'driversComplianceSection', [
  {name: 'certificationsHeading', title: 'Certifications Heading', type: 'string'},
  {name: 'note', title: 'Certification Note', type: 'text', rows: 2},
])

for (const schema of [
  miningFuelPage,
  marineFuelPage,
  agricultureFuelPage,
  onsiteBulkDieselPage,
  localFuelDistributorsPage,
]) {
  appendSectionFields(schema, 'processTimelineSection', [
    {name: 'sectionTag', title: 'Section Tag', type: 'string'},
  ])
}

for (const schema of [agricultureFuelPage, onsiteBulkDieselPage]) {
  appendSectionFields(schema, 'excellenceSection', [
    {name: 'sectionTag', title: 'Section Tag', type: 'string'},
  ])
}

for (const schema of [miningFuelPage, agricultureFuelPage]) {
  appendArrayItemFields(schema, 'featuresSection', 'features', [
    cmsImageField('image', 'Feature Image'),
  ])
}

const enforceFormContract = (
  schema,
  sectionName,
  arrayName,
  allowedNames,
  requiredNames
) => {
  const section = schema.fields.find((field) => field.name === sectionName)
  const array = section?.fields?.find((field) => field.name === arrayName)
  const member = array?.of?.find((item) => item.type === 'object')
  if (!array || !member) return

  const nameField = member.fields?.find((field) => field.name === 'name')
  if (nameField) {
    nameField.options = {
      list: allowedNames.map((name) => ({title: name, value: name})),
    }
    nameField.validation = (Rule) => Rule.required()
    nameField.readOnly = ({value}) => Boolean(value)
  }

  if (!member.fields.some((field) => field.name === 'required')) {
    member.fields.push({
      name: 'required',
      title: 'Required',
      type: 'boolean',
    })
  }

  array.validation = (Rule) =>
    Rule.custom((items) => {
      if (!Array.isArray(items) || items.length === 0) return true
      const names = items.map((item) => item?.name).filter(Boolean)
      const duplicates = names.filter((name, index) => names.indexOf(name) !== index)
      if (duplicates.length) {
        return `Each field name must be unique. Duplicates: ${[...new Set(duplicates)].join(', ')}`
      }
      const missing = requiredNames.filter((name) => !names.includes(name))
      if (missing.length) {
        return `Required submission fields are missing: ${missing.join(', ')}`
      }
      const optionalRequired = items
        .filter((item) => requiredNames.includes(item?.name) && item.required === false)
        .map((item) => item.name)
      return optionalRequired.length
        ? `These submission fields cannot be optional: ${optionalRequired.join(', ')}`
        : true
    })
}

appendSectionFields(contactPage, 'formSection', [
  {name: 'errorMessage', title: 'Error Message', type: 'text', rows: 2},
  {name: 'submittingButtonText', title: 'Submitting Button Text', type: 'string'},
  {name: 'emailFallbackText', title: 'Email Fallback Link Text', type: 'string'},
])
appendSectionFields(careersPage, 'applicationSection', [
  {name: 'applicationSuccessMessage', title: 'Success Message', type: 'text', rows: 2},
  {name: 'applicationErrorMessage', title: 'Error Message', type: 'text', rows: 2},
  {name: 'applicationSubmittingButtonText', title: 'Submitting Button Text', type: 'string'},
  {name: 'applicationEmailFallbackText', title: 'Email Fallback Link Text', type: 'string'},
])
enforceFormContract(
  contactPage,
  'formSection',
  'fields',
  ['firstName', 'lastName', 'email', 'phone', 'company', 'subject', 'message'],
  ['email', 'message']
)
enforceFormContract(
  careersPage,
  'applicationSection',
  'applicationFields',
  ['fullName', 'email', 'phone', 'position', 'coverLetter'],
  ['fullName', 'email', 'coverLetter']
)
appendSectionFields(fuelPricesPage, 'subscribeSection', [
  {name: 'successMessage', title: 'Success Message', type: 'text', rows: 2},
  {name: 'errorMessage', title: 'Error Message', type: 'text', rows: 2},
  {name: 'submittingButtonText', title: 'Submitting Button Text', type: 'string'},
  {name: 'emailFallbackText', title: 'Email Fallback Link Text', type: 'string'},
])
appendSectionFields(fuelPricesPage, 'trendsSection', [
  {name: 'dieselTrendLabel', title: 'Diesel Trend Label', type: 'string'},
  {name: 'premiumTrendLabel', title: 'Premium Trend Label', type: 'string'},
  {name: 'unitLabel', title: 'Price Unit Label', type: 'string'},
])
appendSectionFields(newsListingPage, 'listingSection', [
  {name: 'allCategoriesText', title: 'All Categories Label', type: 'string'},
  {name: 'filteredEmptyMessage', title: 'Filtered Results Empty Message', type: 'string'},
])

appendTopLevelFields(siteSettings, [
  {name: 'logoAlt', title: 'Logo Alternative Text', type: 'string', group: 'general'},
  {name: 'emergencyPhoneLabel', title: 'Emergency Phone Label', type: 'string', group: 'contact'},
])
appendArrayItemFields(megaMenu, 'navItems', 'groups', [])
const navItemsField = megaMenu.fields.find((field) => field.name === 'navItems')
const navItemMember = navItemsField?.of?.find((item) => item.type === 'object')
if (navItemMember) {
  const navNames = new Set((navItemMember.fields || []).map((field) => field.name))
  if (!navNames.has('readMoreText')) {
    navItemMember.fields.push({name: 'readMoreText', title: 'Read More Label', type: 'string'})
  }
  const groups = navItemMember.fields.find((field) => field.name === 'groups')
  const groupMember = groups?.of?.find((item) => item.type === 'object')
  const links = groupMember?.fields?.find((field) => field.name === 'links')
  const linkMember = links?.of?.find((item) => item.type === 'object')
  const linkNames = new Set((linkMember?.fields || []).map((field) => field.name))
  if (linkMember && !linkNames.has('readMoreText')) {
    linkMember.fields.push({name: 'readMoreText', title: 'Read More Label', type: 'string'})
  }
}

const newsBody = newsPost.fields.find((field) => field.name === 'body')
if (newsBody) {
  newsBody.of = [
    ...(newsBody.of || []),
    {
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', title: 'Alternative Text', type: 'string', validation: (Rule) => Rule.required()},
        {name: 'caption', title: 'Caption', type: 'string'},
      ],
    },
    {type: 'cmsVideo'},
  ]
}
;['title', 'slug', 'publishedAt', 'category', 'excerpt', 'body'].forEach((name) => {
  const field = newsPost.fields.find((item) => item.name === name)
  if (field) field.validation = (Rule) => Rule.required()
})
const newsMainImage = newsPost.fields.find((field) => field.name === 'mainImage')
if (newsMainImage) {
  newsMainImage.validation = (Rule) =>
    Rule.required().custom((image) =>
      !image?.asset || image.alt?.trim()
        ? true
        : 'Alternative text is required for the article image'
    )
}

const marketingPages = [
  homePage,
  aboutPage,
  servicesPage,
  ...servicePageSchemas,
  contactPage,
  fuelStationsPage,
  fuelTransportationPage,
  careersPage,
  communityPage,
  atlasCarRacingPage,
  commercialDieselPage,
  fuelStationEnquiryPage,
  productsPage,
  storeLocatorPage,
  franchisingPage,
  fuelPricesPage,
  newsListingPage,
]
marketingPages.forEach((schema) => appendTopLevelFields(schema, [
  {name: 'seo', title: 'SEO', type: 'cmsSeo'},
]))
appendTopLevelFields(newsPost, [{name: 'seo', title: 'SEO', type: 'cmsSeo'}])

const enhanceCtaBanner = (field) => {
  if (field.name !== 'ctaBanner' || field.type !== 'object') return field

  const existingNames = new Set((field.fields || []).map((item) => item.name))
  const canonicalFields = [
    {name: 'heading', title: 'Heading', type: 'string'},
    {name: 'text', title: 'Body Text', type: 'text', rows: 2},
    {name: 'buttonText', title: 'Button Text', type: 'string'},
    {name: 'buttonLink', title: 'Button Link', type: 'string'},
    {name: 'phone', title: 'Phone', type: 'string'},
    {name: 'email', title: 'Email', type: 'string'},
    {name: 'address', title: 'Address', type: 'string'},
    {
      name: 'stylePreset',
      title: 'Style Preset',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Primary', value: 'primary'},
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
          {title: 'Image', value: 'image'},
        ],
      },
    },
    {name: 'backgroundColor', title: 'Background Color Override', type: 'string'},
    {name: 'buttonBackgroundColor', title: 'Button Background Color Override', type: 'string'},
    cmsImageField('backgroundImage', 'Background Image'),
    {
      name: 'overlayOpacity',
      title: 'Image Overlay Opacity',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(1),
    },
  ]

  return {
    ...field,
    fields: [
      ...(field.fields || []),
      ...canonicalFields.filter((item) => !existingNames.has(item.name)),
    ],
  }
}

const fuelProduct = {
  name: 'fuelProduct',
  title: 'Fuel Product',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string'},
    {name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name'}},
    {name: 'octaneNumber', title: 'Octane / Product Number', type: 'string'},
    {name: 'category', title: 'Category', type: 'string'},
    {name: 'tagline', title: 'Tagline', type: 'string'},
    {
      name: 'color',
      title: 'Card Color',
      type: 'string',
      options: {
        list: [
          {title: 'Green', value: 'bg-green-500'},
          {title: 'Blue', value: 'bg-blue-500'},
          {title: 'Purple', value: 'bg-purple-500'},
          {title: 'Yellow', value: 'bg-yellow-500'},
          {title: 'Red', value: 'bg-red-500'},
        ],
      },
    },
    {name: 'description', title: 'Description', type: 'text', rows: 4},
    {name: 'features', title: 'Features', type: 'array', of: [{type: 'string'}]},
    cmsImageField('image', 'Product Image'),
    {name: 'order', title: 'Display Order', type: 'number'},
    {name: 'active', title: 'Active', type: 'boolean'},
  ],
  preview: {select: {title: 'name', subtitle: 'category', media: 'image'}},
}

const additionalProduct = {
  name: 'additionalProduct',
  title: 'Additional Product',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string'},
    {name: 'description', title: 'Description', type: 'text', rows: 3},
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Anchor', value: 'anchor'},
          {title: 'Leaf', value: 'leaf'},
          {title: 'Truck', value: 'truck'},
          {title: 'Droplet', value: 'droplet'},
        ],
      },
    },
    cmsImageField('image', 'Image'),
    {name: 'order', title: 'Display Order', type: 'number'},
    {name: 'active', title: 'Active', type: 'boolean'},
  ],
  preview: {select: {title: 'title', subtitle: 'description', media: 'image'}},
}

const legacyPresentationField =
  /(Color|Size|BorderEnabled|BorderColor|BorderWidth|ShadowColor|FontFamily|FontWeight|LineHeight|LetterSpacing)$/
const semanticPresentationFields = new Set([
  'backgroundColor',
  'buttonBackgroundColor',
])

const withoutLegacyPresentationFields = (field) => {
  if (field.name === 'cardStats') return null

  if (
    field.name &&
    legacyPresentationField.test(field.name) &&
    !semanticPresentationFields.has(field.name)
  ) {
    return null
  }

  if (field.type === 'array') {
    return {
      ...field,
      of: (field.of || [])
        .map((member) => withoutLegacyPresentationFields(member))
        .filter(Boolean),
    }
  }

  if (field.type === 'object') {
    return {
      ...field,
      fields: (field.fields || [])
        .map((child) => withoutLegacyPresentationFields(child))
        .filter(Boolean),
    }
  }

  return field
}

const allSchemaTypes = [
  homePage,
  aboutPage,
  servicesPage,
  miningFuelPage,
  marineFuelPage,
  agricultureFuelPage,
  fuelRetailersPage,
  onsiteBulkDieselPage,
  localFuelDistributorsPage,
  fuelProduct,
  additionalProduct,
  newsPost,
  contactPage,
  fuelStationsPage,
  fuelTransportationPage,
  careersPage,
  communityPage,
  atlasCarRacingPage,
  commercialDieselPage,
  fuelStationEnquiryPage,
  productsPage,
  storeLocatorPage,
  franchisingPage,
  fuelPricesPage,
  newsListingPage,
  siteSettings,
  megaMenu,
  footerNavigation,
  errorPages,
]

allSchemaTypes.forEach((schema) => {
  schema.fields = (schema.fields || [])
    .map((field) => withAccessibleImages(enhanceCtaBanner(field)))
    .map((field) => withoutLegacyPresentationFields(field))
    .filter(Boolean)
})

export const schemaTypes = [...allSchemaTypes, ...cmsV2SchemaTypes]
