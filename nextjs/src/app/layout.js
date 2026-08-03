import localFont from 'next/font/local'
import {draftMode} from 'next/headers'
import VisualEditing from 'next-sanity/visual-editing/client-component'
import 'leaflet/dist/leaflet.css'
import '../styles/global.css'
import HeaderServer from '@/components/layout/HeaderServer'
import FooterServer from '@/components/layout/FooterServer'
import ScrollIndicator from '@/components/shared/ScrollIndicator'
import { ErrorSettingsProvider } from '@/components/common/ErrorSettingsProvider'
import { getErrorPages, getSiteSettings, getThemeSettings } from '@/lib/sanity'
import {SanityLive} from '@/lib/live'
import {buildThemeStyle} from '@/lib/theme'

const manrope = localFont({
  src: '../fonts/manrope-latin.woff2',
  display: 'swap',
  variable: '--font-manrope',
  weight: '300 800',
})
const inter = localFont({
  src: '../fonts/inter-latin.woff2',
  display: 'swap',
  variable: '--font-inter',
  weight: '300 800',
})
const oswald = localFont({
  src: '../fonts/oswald-latin.woff2',
  display: 'swap',
  variable: '--font-oswald',
  weight: '300 700',
})
const bebasNeue = localFont({
  src: '../fonts/bebas-neue-latin.woff2',
  display: 'swap',
  variable: '--font-bebas-neue',
  weight: '400',
})

export async function generateMetadata() {
  const siteSettings = await getSiteSettings({stega: false}).catch(() => null)

  return {
    title: siteSettings?.siteTitle || 'Atlas Fuel Australia',
    description: siteSettings?.siteDescription || 'Reliable. Efficient. Nationwide. Atlas Fuel is Australia\'s trusted provider of quality petroleum products across mining, marine, agriculture, and more.',
    metadataBase: new URL(siteSettings?.baseUrl || 'https://atlasfuel.com.au'),
  }
}

export const revalidate = 1

export default async function RootLayout({ children }) {
  const [errorSettings, themeSettings] = await Promise.all([
    getErrorPages().catch(() => null),
    getThemeSettings().catch(() => null),
  ])
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${oswald.variable} ${bebasNeue.variable}`}
      style={buildThemeStyle(themeSettings)}
    >
      <body className="font-body">
        <ErrorSettingsProvider settings={errorSettings}>
          <HeaderServer />
          <main>{children}</main>
          <ScrollIndicator />
          <FooterServer />
        </ErrorSettingsProvider>
        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  )
}
