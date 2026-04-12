/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Atlas Fuel Australia`,
    description: `Reliable. Efficient. Nationwide. Atlas Fuel is Australia's trusted provider of quality petroleum products across mining, marine, agriculture, and more.`,
    siteUrl: `https://atlasfuel.com.au`,
    phone: `+61 8 6377 7644`,
    email: `info@atlasfuel.com.au`,
    address: `1 Mandurah Rd, Kwinana WA 6167`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-plugin-react-helmet`,
      options: {
        output: false,
      },
    },
  ],
}
