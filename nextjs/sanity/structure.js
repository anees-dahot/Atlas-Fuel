import {
  CaseIcon,
  CogIcon,
  ColorWheelIcon,
  ComposeIcon,
  DocumentIcon,
  DocumentsIcon,
  EarthGlobeIcon,
  EnvelopeIcon,
  HomeIcon,
  InfoOutlineIcon,
  MenuIcon,
  PackageIcon,
  PinIcon,
  StackIcon,
  ThListIcon,
  UsersIcon,
} from '@sanity/icons'

const singleton = (S, {title, schemaType, icon = DocumentIcon}) =>
  S.listItem()
    .id(schemaType)
    .title(title)
    .icon(icon)
    .schemaType(schemaType)
    .child(
      S.document()
        .id(schemaType)
        .title(title)
        .schemaType(schemaType)
        .documentId(schemaType)
    )

const group = (S, {id, title, icon = StackIcon, items}) =>
  S.listItem()
    .id(id)
    .title(title)
    .icon(icon)
    .child(S.list().id(`${id}-list`).title(title).items(items))

export default function structure(S) {
  const websiteSettings = [
    singleton(S, {
      title: 'Site Details, Logo & Top Bar',
      schemaType: 'siteSettings',
      icon: CogIcon,
    }),
    singleton(S, {
      title: 'Header & Mega Menu',
      schemaType: 'megaMenu',
      icon: MenuIcon,
    }),
    singleton(S, {
      title: 'Footer',
      schemaType: 'footerNavigation',
      icon: ThListIcon,
    }),
    singleton(S, {
      title: 'Website Colors & Fonts',
      schemaType: 'themeSettings',
      icon: ColorWheelIcon,
    }),
    singleton(S, {
      title: '404 & Error Messages',
      schemaType: 'errorPages',
      icon: InfoOutlineIcon,
    }),
  ]

  const mainPages = [
    singleton(S, {title: 'About', schemaType: 'aboutPage', icon: UsersIcon}),
    singleton(S, {
      title: 'Fuel Stations',
      schemaType: 'fuelStationsPage',
      icon: PinIcon,
    }),
    singleton(S, {
      title: 'Fuel Transportation',
      schemaType: 'fuelTransportationPage',
      icon: PackageIcon,
    }),
    singleton(S, {title: 'Careers', schemaType: 'careersPage', icon: CaseIcon}),
    singleton(S, {
      title: 'Community',
      schemaType: 'communityPage',
      icon: EarthGlobeIcon,
    }),
    singleton(S, {
      title: 'Atlas Car Racing',
      schemaType: 'atlasCarRacingPage',
      icon: ComposeIcon,
    }),
    singleton(S, {title: 'Contact', schemaType: 'contactPage', icon: EnvelopeIcon}),
  ]

  const servicePages = [
    singleton(S, {title: 'Services Overview', schemaType: 'servicesPage'}),
    singleton(S, {title: 'Mining Fuel', schemaType: 'miningFuelPage'}),
    singleton(S, {title: 'Marine Fuel', schemaType: 'marineFuelPage'}),
    singleton(S, {title: 'Agriculture Fuel', schemaType: 'agricultureFuelPage'}),
    singleton(S, {title: 'Fuel Retailers', schemaType: 'fuelRetailersPage'}),
    singleton(S, {title: 'Onsite Bulk Diesel', schemaType: 'onsiteBulkDieselPage'}),
    singleton(S, {
      title: 'Local Fuel Distributors',
      schemaType: 'localFuelDistributorsPage',
    }),
    singleton(S, {title: 'Commercial Diesel', schemaType: 'commercialDieselPage'}),
  ]

  const otherPages = [
    singleton(S, {
      title: 'Fuel Station Enquiry',
      schemaType: 'fuelStationEnquiryPage',
    }),
    singleton(S, {title: 'Products', schemaType: 'productsPage'}),
    singleton(S, {title: 'Franchising', schemaType: 'franchisingPage'}),
    singleton(S, {title: 'Fuel Prices', schemaType: 'fuelPricesPage'}),
    singleton(S, {title: 'News Listing', schemaType: 'newsListingPage'}),
  ]

  return S.list()
    .id('atlas-fuel-content')
    .title('Atlas Fuel Content')
    .items([
      ...websiteSettings,
      S.divider(),
      singleton(S, {title: 'Home Page', schemaType: 'homePage', icon: HomeIcon}),
      singleton(S, {
        title: 'Store Locator and Map',
        schemaType: 'storeLocatorPage',
        icon: PinIcon,
      }),
      group(S, {
        id: 'main-pages',
        title: 'Main Pages',
        icon: DocumentsIcon,
        items: mainPages,
      }),
      group(S, {
        id: 'service-pages',
        title: 'Service Pages',
        icon: PackageIcon,
        items: servicePages,
      }),
      group(S, {
        id: 'other-pages',
        title: 'Other Pages',
        icon: DocumentsIcon,
        items: otherPages,
      }),
      S.divider(),
      S.listItem()
        .id('news-posts')
        .title('News Articles')
        .icon(ComposeIcon)
        .schemaType('newsPost')
        .child(
          S.documentTypeList('newsPost')
            .title('News Articles')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
        ),
      S.listItem()
        .id('fuel-products')
        .title('Fuel Products')
        .icon(PackageIcon)
        .schemaType('fuelProduct')
        .child(
          S.documentTypeList('fuelProduct')
            .title('Fuel Products')
            .defaultOrdering([{field: 'order', direction: 'asc'}])
        ),
      S.listItem()
        .id('additional-products')
        .title('Additional Products')
        .icon(PackageIcon)
        .schemaType('additionalProduct')
        .child(
          S.documentTypeList('additionalProduct')
            .title('Additional Products')
            .defaultOrdering([{field: 'order', direction: 'asc'}])
        ),
    ])
}
