import {defineLive} from '@sanity/next-loader'
import {client} from '@/lib/sanityClient'

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: false,
  fetchOptions: {
    revalidate: 60,
  },
})
