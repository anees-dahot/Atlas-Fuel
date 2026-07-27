import Footer from './Footer'
import { getFooterNavigation, getSiteSettings } from '@/lib/sanity'

export default async function FooterServer() {
  const [footerNav, siteSettings] = await Promise.all([
    getFooterNavigation().catch(() => null),
    getSiteSettings().catch(() => null)
  ])

  return <Footer footerNavigation={footerNav} siteSettings={siteSettings} />
}
