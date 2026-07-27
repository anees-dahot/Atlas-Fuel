const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'g84jdio4',
  dataset: 'production',
  apiVersion: '2026-04-13',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
})

const aboutSections = [
  {
    _type: 'aboutHero',
    _id: 'aboutHero',
    subtitle: 'About Us',
    title: 'Powering Australia with Reliability, Integrity, and Innovation',
    description: "Atlas Fuel Australia has been proudly fuelling the nation since 2010. From a single independently operated service station to one of Australia's most trusted fuel companies — we power the industries that power this nation.",
  },
  {
    _type: 'aboutIntroStrip',
    _id: 'aboutIntroStrip',
    quote: "Trusted by Australia's leading industries — from mining and agriculture to marine and construction.",
    counters: [
      { _key: 'counter1', value: '100M+', label: 'Litres Delivered' },
      { _key: 'counter2', value: '300+', label: 'Jobs Connected' },
      { _key: 'counter3', value: '15+', label: 'Years Experience' },
      { _key: 'counter4', value: '99.5%', label: 'On-Time Rate' },
    ]
  },
  {
    _type: 'aboutValues',
    _id: 'aboutValues',
    heading: 'Driven by Trust, Powered by Experience.',
    whatWeOffer: 'At Atlas Fuel Australia, we power industries, businesses, and communities with reliable, high-quality fuel solutions tailored to every need. From mining and agriculture to transport, marine, retail, and construction, we proudly support the sectors that drive Australia forward.',
    ctaText: 'Enquire Now',
    ctaLink: '/contact',
    values: [
      { _key: 'vision', title: 'Our Vision', content: 'To emerge as a frontrunner in the fuel industry by creatively providing ideal resolutions to our clientele — introducing fuel products in the Australian market that present a more economically efficient option to the end consumer.' },
      { _key: 'mission', title: 'Our Mission', content: 'To redefine the landscape of the fuel industry by consistently delivering excellence and pioneering solutions. We strive to be a leader — not only in providing top-notch fuel products but also in innovatively addressing the evolving needs of our customers.' },
      { _key: 'goals', title: 'Our Goals', content: 'We turn challenges into solutions and problems into opportunities through creativity and focus. These are the moments where innovation starts and real progress is made — driving us to lead in fuel supply and service across Australia.' },
    ]
  },
  {
    _type: 'aboutBusinessAreas',
    _id: 'aboutBusinessAreas',
    heading: 'What We Do',
    subheading: 'Comprehensive fuel solutions across every sector of Australian industry.',
    areas: [
      { _key: 'fuelStations', title: 'Fuel Stations', description: 'World-class retail fuel stations delivering quality, convenience and competitive pricing for everyday Australians.', icon: 'fuel', link: '/#stores' },
      { _key: 'bulkDiesel', title: 'Bulk Diesel Supply', description: 'Large-scale bulk fuel delivery solutions for mining, agriculture, construction and industrial operations.', icon: 'truck', link: '/#bulk' },
      { _key: 'transport', title: 'Fuel Transportation', description: 'GPS-tracked road tanker fleet providing safe, on-time fuel logistics across Western Australia and beyond.', icon: 'transport', link: '/#transport' },
      { _key: 'civil', title: 'Construction & Civil', description: 'On-site fuel management and delivery for civil works, road projects and remote construction sites.', icon: 'hardhat', link: '/#civil' },
    ]
  },
  {
    _type: 'aboutSafety',
    _id: 'aboutSafety',
    heading: 'Your Partner in Safety',
    content: 'Atlas Fuel Australia places paramount importance on the safety of our employees and the communities we serve, particularly when handling dangerous goods such as petroleum products. Our commitment to safety is reflected in rigorous and comprehensive safe work procedures designed to mitigate risks and ensure the wellbeing of our workforce. Our teams undergo extensive training, equipping them with the knowledge and skills necessary to handle dangerous goods with precision and care. We adhere strictly to industry regulations and best practices, implementing robust safety protocols at every stage of the petroleum product supply chain.',
  },
  {
    _type: 'aboutCoreValues',
    _id: 'aboutCoreValues',
    heading: 'Our Core Values',
    subheading: 'The principles that guide every decision we make.',
    values: [
      { _key: 'safety', title: 'Safety', description: 'We place the safety of our people and communities above all else — it is non-negotiable in everything we do.', icon: 'shield' },
      { _key: 'respect', title: 'Respect', description: 'We treat every customer, partner, and community with the highest level of respect, fairness, and integrity.', icon: 'users' },
      { _key: 'quality', title: 'Quality', description: 'We deliver premium fuel products and services, meeting the highest international standards every time.', icon: 'star' },
      { _key: 'innovation', title: 'Innovation', description: 'We continuously invest in smarter systems, better processes, and new technologies to lead the industry forward.', icon: 'zap' },
    ]
  },
  {
    _type: 'aboutCulture',
    _id: 'aboutCulture',
    heading: 'Our People',
    description: 'Atlas Fuel Australia is powered by a team of highly skilled professionals dedicated to excellence in every aspect of our operations. We prioritize attracting, retaining, and nurturing top talent, creating an environment where skills are honed and expertise is valued.',
    cultureItems: [
      { _key: 'culture', title: 'Our Culture', content: 'We excel in delivering both the product and the concept — streamlining operations in a rapid, agile, and collaborative execution. Our teams work tirelessly to improve logistics for our clients.', ctaText: 'Enquire Now', ctaLink: '/contact' },
      { _key: 'operators', title: 'Our Operators', content: 'At Atlas Fuel Australia, our work culture emphasises a commitment to excellence, continuous learning, and a supportive environment ensuring both personal and professional growth.', ctaText: 'Enquire Now', ctaLink: '/contact' },
      { _key: 'team', title: 'Our Team', content: 'Our team collaborates across departments to deliver reliable fuel solutions. We focus on innovation, efficiency, and maintaining the highest service standards for our customers.', ctaText: 'Enquire Now', ctaLink: '/contact' },
    ]
  },
  {
    _type: 'aboutHowWeWork',
    _id: 'aboutHowWeWork',
    heading: 'How We Work',
    subheading: 'A simple, reliable process built around your needs.',
    steps: [
      { _key: 'step1', step: '01', title: 'You Contact Us', description: 'Reach out by phone, email or our online form. Our team responds within 24 hours to understand your fuel requirements.' },
      { _key: 'step2', step: '02', title: 'We Plan the Delivery', description: 'Our logistics team coordinates your order, schedules the tanker, and confirms delivery time — tracked live via GPS.' },
      { _key: 'step3', step: '03', title: 'Fuel Delivered On Time', description: 'Our certified driver delivers your fuel safely and on schedule, every time. Zero downtime. 99.5% on-time rate.' },
    ]
  },
  {
    _type: 'aboutStory',
    _id: 'aboutStory',
    tagline: 'Unrivalled. Unmatched. Unstoppable.',
    heading: 'Our Story',
    body: "Atlas Fuel has been proudly serving Australia since 2010. From a single independently operated service station, we've grown into one of Australia's most trusted fuel companies. Our commitment to quality, reliability, and customer service has driven our expansion across the nation.",
    keyPoints: [
      '100% Australian owned and operated',
      'Nationwide fuel delivery network',
      'World-class service stations',
      'Commitment to safety and sustainability'
    ],
    stat1Value: '2010',
    stat1Label: 'Established',
    stat2Value: '100M+',
    stat2Label: 'Litres Delivered',
  },
  {
    _type: 'aboutExcellence',
    _id: 'aboutExcellence',
    heading: 'We Deliver Excellence',
    content: "There's a moment when it all comes together. When a complicated challenge turns into a creative solution. When a problem turns into an opportunity. We live for those moments. Here at Atlas, creativity is what drives us forward. We are the outliers. The non-conformists. The game-changers. At Atlas Fuel Australia, we believe in more than just powering vehicles — we're here to empower your journeys and fuel the limitless possibilities of tomorrow.",
    ctaText: 'Contact Us',
    ctaLink: '/contact',
    secondaryCtaText: 'Our Services',
    secondaryCtaLink: '/#sectors',
  }
]

async function populateAboutSections() {
  for (const section of aboutSections) {
    try {
      // Use transaction to delete if exists and create new
      const transaction = client.transaction()
      transaction.delete(section._id)
      transaction.create(section)
      await transaction.commit()
      console.log(`✅ Created/updated: ${section._id}`)
    } catch (error) {
      console.error(`❌ Error creating ${section._id}:`, error.message)
    }
  }
  console.log('\n✨ Done! Check Sanity Studio for the new documents.')
}

populateAboutSections()
