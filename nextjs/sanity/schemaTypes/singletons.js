export const SINGLETON_ITEMS = Object.freeze([
  {type: 'siteSettings', id: 'siteSettings', title: 'Site Settings'},
  {type: 'themeSettings', id: 'themeSettings', title: 'Theme Settings'},
  {type: 'megaMenu', id: 'megaMenu', title: 'Mega Menu Navigation'},
  {type: 'footerNavigation', id: 'footerNavigation', title: 'Footer Navigation'},
  {type: 'errorPages', id: 'errorPages', title: 'Error Pages'},
  {type: 'homePage', id: 'homePage', title: 'Home Page'},
  {type: 'aboutPage', id: 'aboutPage', title: 'About Page'},
  {type: 'servicesPage', id: 'servicesPage', title: 'Services Page'},
  {type: 'miningFuelPage', id: 'miningFuelPage', title: 'Mining Fuel Page'},
  {type: 'marineFuelPage', id: 'marineFuelPage', title: 'Marine Fuel Page'},
  {type: 'agricultureFuelPage', id: 'agricultureFuelPage', title: 'Agriculture Fuel Page'},
  {type: 'fuelRetailersPage', id: 'fuelRetailersPage', title: 'Fuel Retailers Page'},
  {type: 'onsiteBulkDieselPage', id: 'onsiteBulkDieselPage', title: 'Onsite Bulk Diesel Page'},
  {type: 'localFuelDistributorsPage', id: 'localFuelDistributorsPage', title: 'Local Fuel Distributors Page'},
  {type: 'contactPage', id: 'contactPage', title: 'Contact Page'},
  {type: 'fuelStationsPage', id: 'fuelStationsPage', title: 'Fuel Stations Page'},
  {type: 'fuelTransportationPage', id: 'fuelTransportationPage', title: 'Fuel Transportation Page'},
  {type: 'careersPage', id: 'careersPage', title: 'Careers Page'},
  {type: 'communityPage', id: 'communityPage', title: 'Community Page'},
  {type: 'atlasCarRacingPage', id: 'atlasCarRacingPage', title: 'Atlas Car Racing Page'},
  {type: 'commercialDieselPage', id: 'commercialDieselPage', title: 'Commercial Diesel Page'},
  {type: 'fuelStationEnquiryPage', id: 'fuelStationEnquiryPage', title: 'Fuel Station Enquiry Page'},
  {type: 'productsPage', id: 'productsPage', title: 'Products Page'},
  {type: 'storeLocatorPage', id: 'storeLocatorPage', title: 'Store Locator Page'},
  {type: 'franchisingPage', id: 'franchisingPage', title: 'Franchising Page'},
  {type: 'fuelPricesPage', id: 'fuelPricesPage', title: 'Fuel Prices Page'},
  {type: 'newsListingPage', id: 'newsListingPage', title: 'News Listing Page'},
])

export const SINGLETON_SCHEMA_TYPES = new Set(SINGLETON_ITEMS.map(({type}) => type))

export const isSingleton = (schemaType) => SINGLETON_SCHEMA_TYPES.has(schemaType)
