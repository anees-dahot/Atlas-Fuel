import {NextResponse} from 'next/server'
import {getErrorPages} from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  const settings = await getErrorPages().catch(() => null)

  return NextResponse.json(
    {
      errorHeading: settings?.errorHeading ?? 'Error',
      errorSubheading: settings?.errorSubheading ?? 'Something went wrong',
      errorDescription: settings?.errorDescription ?? 'An unexpected error occurred.',
      errorButtonText: settings?.errorButtonText ?? 'Try Again',
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  )
}
