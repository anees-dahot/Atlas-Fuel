import { Manrope } from 'next/font/google'
import '../styles/global.css'
import HeaderServer from '@/components/layout/HeaderServer'
import FooterServer from '@/components/layout/FooterServer'
import ScrollIndicator from '@/components/shared/ScrollIndicator'
import { ErrorSettingsProvider } from '@/components/common/ErrorSettingsProvider'
import { getErrorPages, getSiteSettings } from '@/lib/sanity'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export async function generateMetadata() {
  const siteSettings = await getSiteSettings().catch(() => null)

  return {
    title: siteSettings?.siteTitle || 'Atlas Fuel Australia',
    description: siteSettings?.siteDescription || 'Reliable. Efficient. Nationwide. Atlas Fuel is Australia\'s trusted provider of quality petroleum products across mining, marine, agriculture, and more.',
    metadataBase: new URL(siteSettings?.baseUrl || 'https://atlasfuel.com.au'),
  }
}

export const revalidate = 60

export default async function RootLayout({ children }) {
  const errorSettings = await getErrorPages().catch(() => null)

  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-body">
        <ErrorSettingsProvider settings={errorSettings}>
          <HeaderServer />
          <main>{children}</main>
          <ScrollIndicator />
          <FooterServer />
        </ErrorSettingsProvider>
      </body>
    </html>
  )
}
