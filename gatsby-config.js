require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Processing`,
    description: `Welcome to the Processing website`,
    author: `@processing`,
    siteUrl: `https://processing.org/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        plugins: [],
        remarkPlugins: [
          require('remark-slug'),
          require('remark-unwrap-images'),
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images-anywhere`,
            options: {
              createMarkup: ({
                src,
                srcSet,
                sizes,
                aspectRatio,
                alt,
                base64,
                presentationWidth,
              }) =>
                `<picture style="position: relative; overflow: hidden; display: inline-block; padding-bottom: ${
                  (1 / aspectRatio) * 100
                }%; width: 100%; height: 0;"><source src="${src}" srcSet="${srcSet}" /><img src="${src}" srcSet="${srcSet}" alt="${alt}" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; object-fit: cover; object-position: center center;"/></picture>`,
              maxWidth: 1200,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
        ],
      },
    },
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `env-images`,
        path: `${__dirname}/content/pages`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contributions`,
        path: `${__dirname}/content/contributions`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tools`,
        path: `${__dirname}/content/tools`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `books`,
        path: `${__dirname}/content/books`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,
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
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GitHub`,
        fieldName: `github`,
        url: `https://api.github.com/graphql`,
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/images`, // See below to configure properly
        },
      },
    },
  ],
};
