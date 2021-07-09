const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Processing`,
    description: `Welcome to the Processing website`,
    author: `@processing`,
    siteUrl: `https://processing.org/`
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'examples',
        path: path.resolve(__dirname, 'content/examples')
      }
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`
  ]
};
