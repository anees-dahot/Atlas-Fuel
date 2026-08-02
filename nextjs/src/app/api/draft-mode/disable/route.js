import {draftMode} from 'next/headers'

export async function GET(request) {
  const dm = await draftMode()
  dm.disable()
  return Response.redirect(new URL('/', request.url), 307)
}
