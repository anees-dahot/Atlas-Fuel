import Header from './Header'
import { getMegaMenu, getSiteSettings } from '@/lib/sanity'

export default async function HeaderServer() {
  const [megaMenu, siteSettings] = await Promise.all([
    getMegaMenu().catch(() => null),
    getSiteSettings().catch(() => null)
  ])
  const navItems = megaMenu?.navItems?.map((item) =>
    item.href?.toLowerCase() === '/sectors'
      ? { ...item, href: '/services' }
      : item
  )

  return <Header navItems={navItems || null} siteSettings={siteSettings || {}} />
}
