import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'atlas-fuel',
  title: 'Atlas Fuel CMS',

  // TODO: Replace with your actual Sanity project ID and dataset
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
