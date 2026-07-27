import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'g84jdio4',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function createOrUpdate(doc) {
  try {
    const result = await client.createOrReplace(doc)
    console.log(`✅ ${doc._type}`)
    return result
  } catch (err) {
    console.error(`❌ ${doc._type}:`, err.message)
    return null
  }
}

// ============================================
// FUEL STATIONS PAGE - COMPLETE CONTENT
// ============================================
const fuelStationsData = {
  hero: {
    _type: 'fuelStationsHero',
    _id: 'fuelStations-hero',
    subtitle: 'Our Retail Outlets',
    title: 'Quality Fuel for Every Journey',
    description: 'Our service stations cater to thousands of satisfied customers daily, offering a range of high-quality petroleum products, oils, lubricants, and automotive goods. In addition, our convenience stores stock confectionery, beverages, and groceries for both home and on-the-go needs.',
    ctaText: 'Find a Station',
    ctaLink: '/store-locator',
  },
  retailIntro: {
    _type: 'fuelStationsRetailIntro',
    _id: 'fuelStations-retail-intro',
    subtitle: 'Our Retail Outlets',
    title: 'Serving Australian Motorists',
    description: 'Our service stations cater to thousands of satisfied customers daily, offering a range of high-quality petroleum products, oils, lubricants, and automotive goods. In addition, our convenience stores stock confectionery, beverages, and groceries for both home and on-the-go needs.',
    secondParagraph: 'With a widespread network, it\'s highly likely that if you\'re a motorist, you\'ve already benefited from our facilities.',
    ctaText: 'Enquire now',
    ctaLink: '/store-locator',
  },
  premiumIntro: {
    _type: 'fuelStationsPremiumIntro',
    _id: 'fuelStations-premium-intro',
    tagline: 'Premium Quality',
    content: 'Atlas Fuel Australia takes pride in offering a range of premium fuel products designed to meet the diverse needs of Australian drivers. Whether you\'re running a family car, a high-performance vehicle, or a commercial fleet, our fuels are formulated to ensure optimal performance, efficiency, and engine care. Coupled with state-of-the-art retail facilities, we provide an unparalleled refueling experience for our customers.',
    ctaText: 'Enquire Now',
    ctaLink: '/contact',
  },
  independentDealers: {
    _type: 'fuelStationsIndependentDealers',
    _id: 'fuelStations-independent-dealers',
    heading: 'Independent Dealers',
    description: 'Partner with Atlas Fuel and become part of our growing network of independent fuel retailers. We provide the support, products, and expertise you need to succeed in the competitive fuel retail market. Join our network and benefit from our established brand, quality fuel products, and comprehensive support systems.',
    ctaText: 'Learn More',
    ctaLink: '/contact',
  },
  imageGallery: {
    _type: 'fuelStationsImageGallery',
    _id: 'fuelStations-image-gallery',
    heading: 'Our Stations',
  },
  stationService: {
    _type: 'fuelStationsStationService',
    _id: 'fuelStations-station-service',
    heading: 'At Atlas Fuel, customer service is our highest priority.',
    content: 'We are dedicated to delivering exceptional experiences by ensuring every customer interaction is marked by professionalism, responsiveness, and personalized care. Our team understands the importance of reliable fuel delivery and support, striving to meet and exceed customer expectations at every turn. From timely service to transparent communication, we are committed to building lasting relationships based on trust and satisfaction. At Atlas Fuel, we don\'t just provide fuel; we power peace of mind by putting our customers first.',
    question: 'How can we meet the growing demand for fuel needs while protecting our climate & make planet a better place?',
  },
  fuelTypes: {
    _type: 'fuelStationsFuelTypes',
    _id: 'fuelStations-fuel-types',
    heading: 'Our Fuel Products',
    fuelTypes: [
      {
        octane: '91',
        name: 'Unleaded 91',
        subtitle: 'Standard Performance',
        description: 'A staple fuel option carefully refined to ensure reliable performance and efficient combustion. An excellent choice for vehicles requiring standard octane levels.',
      },
      {
        octane: '95',
        name: 'Premium 95',
        subtitle: 'Enhanced Performance',
        description: 'Provides a noticeable boost in efficiency and power. Formulated to prevent engine knocking, ensuring a smoother and more responsive drive.',
      },
      {
        octane: '98',
        name: 'Premium 98',
        subtitle: 'Maximum Performance',
        description: 'The ultimate solution for high-performance engines. Delivers precise and efficient combustion, unlocking the full potential of powerful vehicles.',
      },
    ],
  },
  stats: {
    _type: 'fuelStationsStats',
    _id: 'fuelStations-stats',
    statValue: '35,224',
    statLabel: 'Happy Customers Every Day',
  },
  dieselSection: {
    _type: 'fuelStationsDieselSection',
    _id: 'fuelStations-diesel-section',
    heading: 'Diesel Fuel',
    description: 'Our high-quality diesel fuel is formulated to deliver optimal performance for diesel engines. Whether you\'re operating commercial vehicles, heavy machinery, or agricultural equipment, Atlas Fuel diesel provides the power and efficiency you need. Our diesel meets all Australian standards and is available at all our retail locations.',
    ctaText: 'Learn More',
    ctaLink: '/contact',
  },
  features: {
    _type: 'fuelStationsFeatures',
    _id: 'fuelStations-features',
    heading: 'Why Choose Our Stations',
    features: [
      { icon: 'shield', title: 'Reliability and performance', description: 'Quality assurance guaranteed' },
      { icon: 'star', title: 'Quality Assurance', description: 'We ensure top quality products' },
      { icon: 'dollar', title: 'Competitive Prices', description: 'Best prices in the market' },
    ],
    ctaText: 'NEW BULK FUEL ENQUIRY',
    ctaLink: '/contact',
  },
  excellence: {
    _type: 'fuelStationsExcellence',
    _id: 'fuelStations-excellence',
    tagline: 'Unrivalled. Unmatched. Unstoppable.',
    content: 'These three words capture the spirit of Atlas Fuel and the people who drive it forward every day. We stand unrivalled in our commitment to quality, unmatched in our ability to deliver reliable fuel solutions nationwide, and unstoppable in our pursuit of growth, innovation, and excellence. From our performance fleet to our world-class service stations, every step we take reflects a relentless drive to set new standards in the fuel industry.',
    ctaText: 'Read More',
    ctaLink: '/about',
  },
  cta: {
    _type: 'fuelStationsCTA',
    _id: 'fuelStations-cta',
    heading: 'Ready to Power Your Journey?',
    description: 'Contact us today for a free fuel quote and let our team build a solution tailored to your needs.',
    primaryButtonText: 'Get a Free Quote',
    primaryButtonLink: '/contact',
  },
}

// ============================================
// FUEL TRANSPORTATION PAGE - COMPLETE CONTENT
// ============================================
const fuelTransportData = {
  hero: {
    _type: 'fuelTransportHero',
    _id: 'fuelTransport-hero',
    subtitle: 'Fuel Transportation',
    title: 'Reliable Logistics Across Australia',
    description: 'Atlas Fuel operates a modern, GPS-tracked fleet delivering fuel safely and efficiently to any location across Australia. Our state-of-the-art logistics network ensures on-time delivery every time, with real-time tracking and 24/7 emergency support for complete peace of mind.',
  },
  fleet: {
    _type: 'fuelTransportFleet',
    _id: 'fuelTransport-fleet',
    heading: 'Transportation & Logistics',
    description: 'Atlas Fuel\'s transportation division is the backbone of our fuel delivery network. With a fleet of modern, certified tankers and a team of experienced logistics professionals, we provide seamless fuel transportation services that keep businesses running. Our advanced GPS tracking system ensures real-time visibility of every delivery, while our 24/7 operations center provides continuous monitoring and support. From remote mine sites to coastal ports, agricultural regions to industrial centers, we have the capability, experience, and commitment to deliver fuel safely, efficiently, and on schedule.',
    stats: [
      { value: '30+', label: 'Fleet Vehicles' },
      { value: '99.5%', label: 'On-Time Rate' },
      { value: '24/7', label: 'Operations' },
    ],
  },
  coverage: {
    _type: 'fuelTransportCoverage',
    _id: 'fuelTransport-coverage',
    heading: 'Coverage Areas',
    areas: [
      { name: 'Western Australia', description: 'Complete coverage across WA including remote mine sites and regional centers.' },
      { name: 'Northern Territory', description: 'Reliable fuel delivery to NT operations and communities.' },
      { name: 'South Australia', description: 'Efficient logistics network across SA.' },
    ],
  },
  features: {
    _type: 'fuelTransportFeatures',
    _id: 'fuelTransport-features',
    heading: 'Our Transportation Services',
    features: [
      {
        icon: 'remote',
        title: 'GPS-Tracked Fleet',
        description: 'Every delivery is tracked in real-time using advanced GPS technology, providing complete visibility of your fuel\'s location and estimated arrival time. Our control room monitors all movements 24/7 for maximum security and efficiency.',
      },
      {
        icon: 'bulk',
        title: 'Bulk Transport',
        description: 'Large-scale bulk fuel transport for industrial and commercial clients. Our fleet includes various tanker sizes to accommodate different volume requirements, from small deliveries to massive bulk shipments.',
      },
      {
        icon: 'emergency',
        title: 'Emergency Delivery',
        description: '24/7 emergency fuel supply when you need it most. Our rapid response team can mobilize within hours to deliver fuel to critical operations, preventing costly downtime and ensuring business continuity.',
      },
      {
        icon: 'onsite',
        title: 'Fleet Operations',
        description: 'State-of-the-art logistics ensuring on-time delivery every time. Our experienced drivers and support team coordinate complex delivery schedules across multiple sites with precision and reliability.',
      },
    ],
  },
  safety: {
    _type: 'fuelTransportSafety',
    _id: 'fuelTransport-safety',
    heading: 'YOUR PARTNER IN SAFETY',
    description: 'Atlas Fuel Australia places paramount importance on the safety of our employees and the communities we serve, particularly when handling dangerous goods such as petroleum products. Our commitment to safety is reflected in rigorous and comprehensive safe work procedures designed to mitigate risks and ensure the wellbeing of our workforce. Our teams undergo extensive training, equipping them with the knowledge and skills necessary to handle dangerous goods with precision and care.',
  },
  process: {
    _type: 'fuelTransportProcess',
    _id: 'fuelTransport-process',
    heading: 'How We Work',
    subheading: 'A streamlined transportation process',
    processSteps: [
      { step: '01', title: 'Order Placement', description: 'Submit your fuel delivery request with volume requirements, delivery location, and schedule preferences. Our team confirms details within 24 hours.' },
      { step: '02', title: 'Route Planning', description: 'Our logistics team plans optimal routes using advanced mapping software, considering road conditions, weather, and site access requirements for safe, efficient delivery.' },
      { step: '03', title: 'Real-Time Delivery', description: 'Track your delivery in real-time as our GPS-equipped tanker navigates to your location. Receive updates on ETA and delivery status throughout the journey.' },
      { step: '04', title: 'Safe Offloading', description: 'Our certified drivers safely offload fuel using proper equipment and procedures. Delivery confirmation and documentation provided upon completion.' },
    ],
  },
  excellence: {
    _type: 'fuelTransportExcellence',
    _id: 'fuelTransport-excellence',
    tagline: 'Unrivalled. Unmatched. Unstoppable.',
    content: 'These three words capture the spirit of Atlas Fuel and the people who drive it forward every day. We stand unrivalled in our commitment to quality, unmatched in our ability to deliver reliable fuel solutions nationwide, and unstoppable in our pursuit of growth, innovation, and excellence. From our performance fleet to our world-class service stations, every step we take reflects a relentless drive to set new standards in the fuel industry.',
    ctaText: 'Read More',
    ctaLink: '/about',
  },
  compliance: {
    _type: 'fuelTransportCompliance',
    _id: 'fuelTransport-compliance',
    heading: 'Atlas Compliance',
    description: 'Atlas Fuel stands proudly certified across ISO, WAHVA, and regulatory standards, proving our unwavering commitment to quality, safety, and responsible operations.',
  },
  fleetCompliance: {
    _type: 'fuelTransportFleetCompliance',
    _id: 'fuelTransport-fleet-compliance',
    heading: 'Fleet Compliance',
    description: 'Our fleet operates with the highest standards of safety and compliance, ensuring your fuel deliveries are handled by certified professionals using state-of-the-art equipment.',
    features: [
      'Regular vehicle inspections and maintenance',
      'GPS tracking on all vehicles',
      'Emergency response protocols',
      'Dangerous goods certification',
    ],
  },
  driversCompliance: {
    _type: 'fuelTransportDriversCompliance',
    _id: 'fuelTransport-drivers-compliance',
    heading: 'Drivers Compliance',
    description: 'Every Atlas Fuel driver meets the highest industry standards. Our rigorous training and certification programs ensure your fuel is transported by qualified professionals who prioritize safety above all else.',
    features: [
      'Licensed and certified drivers',
      'Regular safety training',
      'Background checks',
      'Drug and alcohol testing',
    ],
  },
  cta: {
    _type: 'fuelTransportCTA',
    _id: 'fuelTransport-cta',
    heading: 'Ready to Optimize Your Fuel Logistics?',
    description: 'Contact us today for a free transportation quote and let our team build a logistics solution tailored to your operational needs.',
    primaryButtonText: 'Get a Free Quote',
    primaryButtonLink: '/contact',
  },
}

// ============================================
// COMMUNITY PAGE - COMPLETE CONTENT
// ============================================
const communityData = {
  hero: {
    _type: 'communityHero',
    _id: 'community-hero',
    subtitle: 'Community',
    title: 'Giving Back to Our Communities',
    description: 'Atlas Fuel is committed to making a positive impact in the communities we serve. Through charity events, partnerships, and local initiatives, we\'re building stronger communities across Australia.',
  },
  initiatives: {
    _type: 'communityInitiatives',
    _id: 'community-initiatives',
    heading: 'Our Community Initiatives',
    initiatives: [
      {
        title: 'Charity Events',
        description: 'Our Performance Fleet proudly attends charity events, community fundraisers, hospital visits, and local showcases. Every appearance is paired with Atlas Fuel goodies, creating unforgettable moments for kids, especially those battling illness.',
        icon: 'heart',
      },
      {
        title: 'Local Partnerships',
        description: 'We partner with local sports teams, schools, and community organizations to support their programs and events. Our sponsorship helps fund equipment, facilities, and programs that benefit local communities.',
        icon: 'handshake',
      },
      {
        title: 'Community Support',
        description: 'We provide fuel support during emergencies and natural disasters, ensuring critical services and emergency responders have the fuel they need when it matters most.',
        icon: 'support',
      },
      {
        title: 'Youth Programs',
        description: 'Our 50+ Talent Rising program trains and employs young people, giving them valuable skills and experience to build lasting careers in the fuel industry.',
        icon: 'graduation',
      },
    ],
  },
  impact: {
    _type: 'communityImpact',
    _id: 'community-impact',
    heading: 'Our Impact',
    stats: [
      { value: '300+', label: 'Jobs Created', description: 'Across Australia' },
      { value: '50+', label: 'Community Partners', description: 'Organizations supported' },
      { value: '25+', label: 'Events Sponsored', description: 'Per year' },
      { value: '50+', label: 'Talent Rising', description: 'Youth trained annually' },
    ],
  },
  story: {
    _type: 'communityStory',
    _id: 'community-story',
    heading: 'Our Community Story',
    content: 'At Atlas Fuel, we believe that business success and community support go hand in hand. Since our founding, we\'ve been dedicated to giving back to the communities that have supported our growth. From sponsoring local sports teams to visiting children in hospitals, from supporting emergency services to training the next generation of fuel industry professionals, our community initiatives reflect our core values of respect, integrity, and care for others.',
  },
}

// ============================================
// COMMERCIAL DIESEL PAGE - COMPLETE CONTENT
// ============================================
const commercialDieselData = {
  hero: {
    _type: 'commercialDieselHero',
    _id: 'commercial-diesel-hero',
    subtitle: 'Commercial Diesel',
    title: 'Powering Your Business with Reliable Fuel Solutions',
    description: 'Atlas Fuel Australia delivers high-quality diesel and fuel solutions to power industries, businesses, and communities across Australia. From mining and agriculture to transport and marine, our services are customized to meet every sector\'s needs.',
  },
  industries: {
    _type: 'commercialDieselIndustries',
    _id: 'commercial-diesel-industries',
    heading: 'Industries We Serve',
    industries: [
      { title: 'Mining Fuel', description: 'We deliver high-quality fuel solutions to power industries, businesses, and communities across Australia.', icon: 'pickaxe' },
      { title: 'Marine Fuel', description: 'From mining and agriculture to transport and marine, our services are customized to meet every sector\'s needs.', icon: 'anchor' },
      { title: 'Agriculture', description: 'Our offerings include bulk fuel supply, on-site refueling, logistics, and retail solutions for seamless operations.', icon: 'wheat' },
      { title: 'Fuel Retailer', description: 'Wherever you operate, Atlas Fuel keeps you moving, growing, and succeeding with dependable service.', icon: 'fuel' },
      { title: 'Fuel Distributor', description: 'Wherever you operate, Atlas Fuel keeps you moving, growing, and succeeding with dependable service.', icon: 'truck' },
    ],
  },
  sectors: {
    _type: 'commercialDieselSectors',
    _id: 'commercial-diesel-sectors',
    heading: 'Sectors We Cover',
    content: 'ATLAS specializes in offering fuel supply and logistics services, catering to various sectors such as the Mining industry, local farmers, retail fuel stations, and independent fuel companies. Our organizational structure is distinctive yet straightforward, and we take pride in being accessible to a wide range of customers.',
  },
  bunker: {
    _type: 'commercialDieselBunker',
    _id: 'commercial-diesel-bunker',
    heading: 'Bunker Refueling',
    content: 'Atlas Fuel stands out as the most effective supplier for bunker refueling due to its commitment to providing high-quality fuel, reliable services, and competitive pricing. With years of experience in the industry, Atlas Fuel ensures efficient and timely delivery, even in the most challenging conditions, making it the preferred choice for clients worldwide.\n\nFor international clients, Atlas Fuel offers seamless communication through WhatsApp or can be reached via email at info@atlasfuel.com.au to discuss their specific needs and receive prompt assistance.',
    ctaHeading: 'International Enquiries',
    ctaDescription: 'We are available 24/7 to look after our international clients. Contact us through WhatsApp for immediate assistance.',
    whatsapp: '+61 428 935 216',
  },
  ownStation: {
    _type: 'commercialDieselOwnStation',
    _id: 'commercial-diesel-own-station',
    tagline: 'Franchise Opportunity',
    heading: 'Own a Fuel Station?',
    content: 'If you own a fuel station, Atlas Fuel can provide you with Atlas Fuel branding, services tailored to enhance your station\'s visibility and appeal. Enquiring about Atlas Fuel branding can offer you a range of benefits, from distinctive branding that attracts more customers to operational support that helps streamline your business.\n\nExplore how Atlas Fuel branding can elevate your station\'s presence and customer satisfaction today by reaching out to inquire about their specialized services.',
    ctaText: 'Learn More',
    ctaLink: '/fuel-station-enquiry',
  },
  doYouKnow: {
    _type: 'commercialDieselDoYouKnow',
    _id: 'commercial-diesel-do-you-know',
    tagline: 'Did You Know?',
    heading: 'Our Impact',
    content: 'Atlas Fuel is a trusted partner for over 200 commercial diesel clients and retail businesses across Australia, providing reliable fuel solutions tailored to their unique needs. Our extensive network and logistical expertise ensure seamless delivery of high-quality fuel, no matter where our clients are located.\n\nWith a strong commitment to efficiency, competitive pricing, and customer satisfaction, Atlas Fuel has become a leading choice for businesses that depend on uninterrupted fuel supply. Whether powering fleets, machinery, or retail outlets, we consistently deliver success by combining superior service with nationwide coverage.',
    stats: [
      { value: '200+', label: 'Commercial Clients' },
      { value: '100%', label: 'Australian Owned' },
      { value: '24/7', label: 'Support Available' },
      { value: '15+', label: 'Years Experience' },
    ],
  },
  mining: {
    _type: 'commercialDieselMining',
    _id: 'commercial-diesel-mining',
    tagline: 'Industry Solutions',
    heading: 'Mining Sector',
    content: 'Atlas Fuel is the optimal choice for refueling mining machines due to its unparalleled reliability, efficiency, and safety features. With a steadfast commitment to quality, Atlas Fuel ensures uninterrupted operations by delivering fuel on-site precisely when needed, eliminating costly downtime.\n\nTheir rigorous adherence to industry standards guarantees the highest level of safety, crucial for the demanding environments of mining operations. Moreover, Atlas Fuel\'s competitive pricing and flexible delivery options provide cost-effective solutions tailored to meet the unique demands of mining projects, making them the preferred partner for fueling efficiency and productivity in the mining sector.',
    statValue: '24/7',
    statLabel: 'On-Site Delivery',
  },
  agriculture: {
    _type: 'commercialDieselAgriculture',
    _id: 'commercial-diesel-agriculture',
    tagline: 'Supporting Farmers',
    heading: 'Agriculture',
    content: 'Atlas Fuel Australia prides itself on delivering the best prices to its agriculture customers. With a commitment to supporting Australia\'s farming communities, Atlas Fuel ensures competitive rates that help farmers manage their operational costs effectively.\n\nWhether it\'s supplying diesel for machinery or other fuel needs essential to agriculture, Atlas Fuel Australia combines reliability with cost-efficiency, ensuring that farmers can focus on their crops and livestock without financial strain. Their dedication to customer satisfaction and understanding of agricultural needs makes them a trusted partner in the industry, fostering long-term relationships built on reliability and competitive pricing.',
    features: [
      { title: 'Best Prices', description: 'Competitive rates for farming communities' },
      { title: 'Reliable', description: 'On-time delivery during harvest seasons' },
      { title: 'Quality', description: 'Premium diesel for all machinery' },
      { title: 'Local', description: 'Supporting Australian farmers' },
    ],
  },
  whatWeOffer: {
    _type: 'commercialDieselWhatWeOffer',
    _id: 'commercial-diesel-what-we-offer',
    tagline: 'Our Promise',
    heading: 'What We Offer?',
    content: 'Atlas Fuel Australia stands out for its unwavering commitment to reliability, ensuring your business always has access to fuel when and where you need it most.',
  },
  transportation: {
    _type: 'commercialDieselTransportation',
    _id: 'commercial-diesel-transportation',
    tagline: 'Transport & Logistics',
    heading: 'Transportation Sector',
    content: 'Atlas Fuel Australia also stands as a leading provider of competitive fuel prices for the transportation sector. Recognizing the critical role that transportation plays in the movement of goods across the country, Atlas Fuel offers cost-effective solutions tailored to the needs of logistics and transport companies.\n\n\nBy providing high-quality fuels at the best possible prices, Atlas Fuel helps businesses in the transportation industry reduce their operating costs and maximize efficiency. With a focus on reliability and customer service, Atlas Fuel Australia ensures that transport companies can keep their fleets running smoothly, while maintaining budget-conscious operations that support their bottom line.',
    ctaHeading: 'Fleet Solutions',
    ctaDescription: 'Get competitive pricing for your fleet. We understand the transportation industry\'s needs for reliable, cost-effective fuel supply.',
    ctaLink: '/contact',
  },
  compliance: {
    _type: 'commercialDieselCompliance',
    _id: 'commercial-diesel-compliance',
    heading: 'Atlas Compliance',
    content: 'Atlas Fuel stands proudly certified across ISO, WAHVA, and regulatory standards, proving our unwavering commitment to quality, safety, and responsible operations.',
    certifications: [
      { name: 'ISO 9001', label: 'Quality Management' },
      { name: 'ISO 14001', label: 'Environmental Management' },
      { name: 'ISO 45001', label: 'Occupational Health & Safety' },
      { name: 'NHVAS', label: 'National Heavy Vehicle Accreditation' },
    ],
  },
}

// ============================================
// RUN SEED
// ============================================
async function seedAll() {
  console.log('\n🚀 Seeding Sanity with COMPLETE content...\n')

  if (!process.env.SANITY_API_TOKEN) {
    console.log('⚠️  SANITY_API_TOKEN not set')
    console.log('   Run: SANITY_API_TOKEN=your_token node sanity-seed.js\n')
    return
  }

  console.log('📦 Fuel Stations (12 sections)...')
  for (const doc of Object.values(fuelStationsData)) await createOrUpdate(doc)

  console.log('\n📦 Fuel Transportation (11 sections)...')
  for (const doc of Object.values(fuelTransportData)) await createOrUpdate(doc)

  console.log('\n📦 Community (4 sections)...')
  for (const doc of Object.values(communityData)) await createOrUpdate(doc)

  console.log('\n📦 Commercial Diesel (12 sections)...')
  for (const doc of Object.values(commercialDieselData)) await createOrUpdate(doc)

  console.log('\n✅ Done! 39 section documents created.\n')
  console.log('📝 NOTE: Images are NOT included in seed data.')
  console.log('   Images in Sanity are stored as asset references.')
  console.log('   After seeding, upload images manually in Sanity Studio.')
  console.log('   Or use fallback images from /images/ folder.\n')
}

seedAll().catch(console.error)
