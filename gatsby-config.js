module.exports = {
  siteMetadata: {
    title: `Processing`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://processing.org/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `en`,
        locales: process.env.LOCALES,
        configPath: require.resolve(`./i18n/config.json`),
      },
    },
    {
      resolve: `gatsby-theme-i18n-react-intl`,
      options: {
        defaultLocale: `./i18n/react-intl/en.json`,
      },
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `json`, 
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "json",
        path: `${__dirname}/documentation/references/translation`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "examples",
        path: `${__dirname}/documentation/references/examples`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
      },
    },
  ],
};
