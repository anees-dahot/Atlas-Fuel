import React from 'react'
import Layout from '../components/Layout/Layout'
import SEO from '../components/Common/SEO'
import Hero from '../components/Home/Hero'
import FeatureBoxes from '../components/Home/FeatureBoxes'
import WhatWeDo from '../components/Home/WhatWeDo'
import Vision from '../components/Home/Vision'
import Community from '../components/Home/Community'
import About from '../components/Home/About'
import Certifications from '../components/Home/Certifications'
import People from '../components/Home/People'
import Contact from '../components/Home/Contact'

export default function HomePage() {
  return (
    <Layout>
      <SEO
        title="Home"
        description="Atlas Fuel Australia — Reliable. Efficient. Nationwide. Australia's trusted fuel supply company serving mining, marine, agriculture, and retail industries."
      />
      <Hero />
      <FeatureBoxes />
      <WhatWeDo />
      <Vision />
      <Community />
      <About />
      <Certifications />
      <People />
      <Contact />
    </Layout>
  )
}
