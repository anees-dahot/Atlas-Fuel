import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { isSingleton } from './schemaTypes/singletons'
import structure from './structure'
import {presentationResolve} from './presentation/resolve'
import AtlasFuelLogo from './studio/AtlasFuelLogo'

const previewUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL ||
  'https://atlas-fuel-website.vercel.app'
const previewOrigin = new URL(previewUrl).origin

export default defineConfig({
  name: 'atlas-fuel',
  title: 'Atlas Fuel Content Manager',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'g84jdio4',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [
    structureTool({ structure }),
    presentationTool({
      name: 'website',
      title: 'Preview & Edit Website',
      previewUrl: {
        initial: previewUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
          shareAccess: true,
        },
      },
      allowOrigins: [
        previewOrigin,
        'http://localhost:*',
        'http://127.0.0.1:*',
      ],
      resolve: presentationResolve,
    }),
    ...(process.env.NODE_ENV === 'development'
      ? [visionTool({defaultApiVersion: '2024-01-01'})]
      : []),
  ],
  studio: {
    components: {
      logo: AtlasFuelLogo,
    },
  },
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((template) => !isSingleton(template.schemaType)),
  },
  document: {
    actions: (actions, context) =>
      isSingleton(context.schemaType)
        ? actions.filter(
            ({action}) =>
              !['delete', 'duplicate', 'unpublish'].includes(action)
          )
        : actions,
    newDocumentOptions: (templates) =>
      templates.filter(
        (template) =>
          !isSingleton(template.templateId) && !isSingleton(template.schemaType)
      ),
  },
})
