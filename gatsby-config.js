module.exports = {
  siteMetadata: {
    title: `Processing`,
    description: `Welcome to the Processing website`,
    author: `@processing`,
    siteUrl: `https://processing.org/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `en`,
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
      resolve: `gatsby-plugin-postcss`,
      options: {
        cssLoaderOptions: {
          localIdentName: '[name]-[local]-[hash:base64:3]',
        },
        postCssPlugins: [
          require(`postcss-import`),
          require('postcss-normalize'),
          require(`postcss-preset-env`)({
            stage: 0,
            importFrom: [`${__dirname}/src/styles/variables.css`],
          }),
          require(`postcss-calc`),
        ],
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'json',
        path: `${__dirname}/content/references/translations`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'in-examples',
        path: `${__dirname}/content/references/examples`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'examples',
        path: `${__dirname}/content/examples`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tutorials`,
        path: `${__dirname}/content/tutorials`,
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
