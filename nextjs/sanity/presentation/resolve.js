import {defineDocuments, defineLocations} from 'sanity/presentation'

export const pageRoutes = Object.freeze({
  homePage: {title: 'Home', href: '/'},
  aboutPage: {title: 'About', href: '/about'},
  servicesPage: {title: 'Services', href: '/services'},
  miningFuelPage: {title: 'Mining Fuel', href: '/services/mining-fuel'},
  marineFuelPage: {title: 'Marine Fuel', href: '/services/marine-fuel'},
  agricultureFuelPage: {
    title: 'Agriculture Fuel',
    href: '/services/agriculture-fuel',
  },
  fuelRetailersPage: {
    title: 'Fuel Retailers',
    href: '/services/fuel-retailers',
  },
  onsiteBulkDieselPage: {
    title: 'Onsite Bulk Diesel',
    href: '/services/onsite-bulk-diesel',
  },
  localFuelDistributorsPage: {
    title: 'Local Fuel Distributors',
    href: '/services/local-fuel-distributors',
  },
  commercialDieselPage: {
    title: 'Commercial Diesel',
    href: '/commercial-diesel',
  },
  fuelStationsPage: {title: 'Fuel Stations', href: '/fuel-stations'},
  fuelTransportationPage: {
    title: 'Fuel Transportation',
    href: '/fuel-transportation',
  },
  careersPage: {title: 'Careers', href: '/careers'},
  communityPage: {title: 'Community', href: '/community'},
  atlasCarRacingPage: {
    title: 'Atlas Car Racing',
    href: '/atlas-car-racing',
  },
  contactPage: {title: 'Contact', href: '/contact'},
  fuelStationEnquiryPage: {
    title: 'Fuel Station Enquiry',
    href: '/fuel-station-enquiry',
  },
  productsPage: {title: 'Products', href: '/products'},
  storeLocatorPage: {title: 'Store Locator', href: '/store-locator'},
  franchisingPage: {title: 'Franchising', href: '/franchising'},
  fuelPricesPage: {title: 'Fuel Prices', href: '/fuel-prices'},
  newsListingPage: {title: 'News', href: '/news'},
})

const singletonDocument = (type, href) => ({
  route: href,
  filter: '_id == $documentId',
  params: {documentId: type},
})

const staticLocation = ({title, href}) =>
  defineLocations({
    select: {_type: '_type'},
    resolve: () => ({locations: [{title, href}]}),
  })

const globalLocation = (title) =>
  defineLocations({
    select: {_type: '_type'},
    resolve: () => ({
      locations: [{title: `${title} — entire website`, href: '/'}],
    }),
  })

export const mainDocuments = defineDocuments([
  ...Object.entries(pageRoutes).map(([type, {href}]) =>
    singletonDocument(type, href)
  ),
  {
    route: '/news/:slug',
    filter: '_type == "newsPost" && slug.current == $slug',
    params: ({params}) => ({slug: params.slug}),
  },
  singletonDocument('errorPages', '/__cms-404-preview'),
])

export const locations = {
  ...Object.fromEntries(
    Object.entries(pageRoutes).map(([type, location]) => [
      type,
      staticLocation(location),
    ])
  ),
  siteSettings: globalLocation('Site settings'),
  themeSettings: globalLocation('Theme settings'),
  megaMenu: globalLocation('Header and mega menu'),
  footerNavigation: globalLocation('Footer'),
  errorPages: staticLocation({
    title: '404 page preview',
    href: '/__cms-404-preview',
  }),
  fuelProduct: staticLocation({title: 'Products', href: '/products'}),
  additionalProduct: staticLocation({title: 'Products', href: '/products'}),
  newsPost: defineLocations({
    select: {title: 'title', slug: 'slug.current'},
    resolve: (document) => {
      if (!document?.slug) {
        return {
          message: 'Add a slug to preview this news post.',
          tone: 'caution',
        }
      }

      return {
        locations: [
          {
            title: document.title || 'News article',
            href: `/news/${encodeURIComponent(document.slug)}`,
          },
          {title: 'News listing', href: '/news'},
          {title: 'Homepage latest news', href: '/'},
        ],
      }
    },
  }),
}

export const presentationResolve = {mainDocuments, locations}
