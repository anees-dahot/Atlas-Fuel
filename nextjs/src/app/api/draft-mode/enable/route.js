import {defineEnableDraftMode} from 'next-sanity/draft-mode'
import {NextResponse} from 'next/server'
import {client} from '@/lib/sanityClient'

const readToken = process.env.SANITY_API_READ_TOKEN

const enableDraftMode = readToken
  ? defineEnableDraftMode({
      client: client.withConfig({token: readToken, useCdn: false}),
    }).GET
  : null

export async function GET(request) {
  if (!enableDraftMode) {
    return NextResponse.json(
      {message: 'Draft preview is not configured.'},
      {status: 503}
    )
  }

  return enableDraftMode(request)
}
