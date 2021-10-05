const path = require('path');

module.exports = {
  flags: {
    DEV_SSR: true,
    FAST_DEV: false,
    PRESERVE_FILE_DOWNLOAD_CACHE: false
  },
  siteMetadata: {
    title: `Processing`,
    description: `Welcome to the Processing website`,
    author: `@processing`,
    siteUrl: `https://processing.org/`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contributions`,
        path: path.resolve(__dirname, 'content/contributions')
      }
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `json`
      }
    }
  ]
};
