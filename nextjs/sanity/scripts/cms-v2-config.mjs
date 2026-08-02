export const CANONICAL_DOCUMENT_TYPES = new Set([
  'aboutPage',
  'additionalProduct',
  'agricultureFuelPage',
  'atlasCarRacingPage',
  'careersPage',
  'commercialDieselPage',
  'communityPage',
  'contactPage',
  'errorPages',
  'footerNavigation',
  'franchisingPage',
  'fuelPricesPage',
  'fuelProduct',
  'fuelRetailersPage',
  'fuelStationEnquiryPage',
  'fuelStationsPage',
  'fuelTransportationPage',
  'homePage',
  'localFuelDistributorsPage',
  'marineFuelPage',
  'megaMenu',
  'miningFuelPage',
  'newsListingPage',
  'newsPost',
  'onsiteBulkDieselPage',
  'productsPage',
  'servicesPage',
  'siteSettings',
  'storeLocatorPage',
  'themeSettings',
])

export const SINGLETON_IDS = Object.freeze({
  aboutPage: 'aboutPage',
  agricultureFuelPage: 'agricultureFuelPage',
  atlasCarRacingPage: 'atlasCarRacingPage',
  careersPage: 'careersPage',
  commercialDieselPage: 'commercialDieselPage',
  communityPage: 'communityPage',
  contactPage: 'contactPage',
  errorPages: 'errorPages',
  footerNavigation: 'footerNavigation',
  franchisingPage: 'franchisingPage',
  fuelPricesPage: 'fuelPricesPage',
  fuelRetailersPage: 'fuelRetailersPage',
  fuelStationEnquiryPage: 'fuelStationEnquiryPage',
  fuelStationsPage: 'fuelStationsPage',
  fuelTransportationPage: 'fuelTransportationPage',
  homePage: 'homePage',
  localFuelDistributorsPage: 'localFuelDistributorsPage',
  marineFuelPage: 'marineFuelPage',
  megaMenu: 'megaMenu',
  miningFuelPage: 'miningFuelPage',
  newsListingPage: 'newsListingPage',
  onsiteBulkDieselPage: 'onsiteBulkDieselPage',
  productsPage: 'productsPage',
  servicesPage: 'servicesPage',
  siteSettings: 'siteSettings',
  storeLocatorPage: 'storeLocatorPage',
  themeSettings: 'themeSettings',
})

export const MISSING_SINGLETON_DEFAULTS = Object.freeze({
  errorPages: {
    notFoundHeading: '404',
    notFoundSubheading: 'Page Not Found',
    notFoundDescription: "The page you're looking for doesn't exist or has been moved.",
    notFoundButtonText: 'Return Home',
    notFoundButtonLink: '/',
    errorHeading: 'Error',
    errorSubheading: 'Something went wrong',
    errorDescription: 'An unexpected error occurred.',
    errorButtonText: 'Try Again',
  },
  themeSettings: {
    colors: {
      primary: '#17a350',
      primaryDark: '#0f7037',
      background: '#ffffff',
      text: '#000000',
      surface: '#f4f4f4',
      cream: '#f5f0e8',
      sand: '#ede8e0',
      gray50: '#f9fafb',
      gray100: '#f3f4f6',
      gray200: '#e5e7eb',
      gray300: '#d1d5db',
      gray400: '#9ca3af',
      gray500: '#6b7280',
      gray600: '#4b5563',
      gray700: '#374151',
      gray800: '#1f2937',
      gray900: '#111827',
      gray950: '#030712',
    },
    typography: {
      headingFamily: 'Manrope',
      bodyFamily: 'Manrope',
      headingWeight: 700,
      bodyWeight: 400,
    },
  },
})

export const PRESENTATION_FIELD_SUFFIX =
  /(Color|Size|BorderEnabled|BorderColor|BorderWidth|ShadowColor|FontFamily|FontWeight|LineHeight|LetterSpacing)$/

export const PRESERVED_PRESENTATION_FIELD_NAMES = new Set([
  'backgroundColor',
  'buttonBackgroundColor',
])

export const SYSTEM_FIELDS = new Set([
  '_createdAt',
  '_id',
  '_key',
  '_rev',
  '_type',
  '_updatedAt',
])

export const PRODUCT_FIELD_MIGRATIONS = Object.freeze({
  fuelProduct: [
    {from: 'octane', to: 'octaneNumber'},
    {from: 'subtitle', to: 'tagline'},
  ],
  additionalProduct: [
    {from: 'name', to: 'title'},
  ],
})
