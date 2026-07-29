require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const path = require('path');

module.exports = {
  flags: {
    DEV_SSR: true,
    FAST_DEV: false,
    PRESERVE_FILE_DOWNLOAD_CACHE: false
  },
  siteMetadata: {
    siteUrl: `https://processing.org/`
  },
  plugins: [
    // `gatsby-plugin-perf-budgets`,
    // `gatsby-plugin-webpack-bundle-analyser-v2`,
    `gatsby-alias-imports`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `en`,
        configPath: require.resolve(`./i18n/config.json`)
      }
    },
    {
      resolve: `gatsby-theme-i18n-react-intl`,
      options: {
        defaultLocale: `./i18n/react-intl/en.json`
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        cssLoaderOptions: {
          localIdentName: '[name]-[local]-[hash:base64:3]'
        },
        postCssPlugins: [
          require(`postcss-import`),
          require('postcss-normalize'),
          require('postcss-nesting'),
          require('postcss-custom-properties')({
            importFrom: './src/styles/variables.css',
            // Do this to prevent warnings in the console output.
            disableDeprecationNotice: true
          }),
          require('postcss-calc')(),
          require('postcss-custom-media')({
            importFrom: './src/styles/variables.css'
          }),
          require('postcss-reporter')
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sitewide`,
        path: path.resolve(__dirname, 'content/sitewide')
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(__dirname, 'src/images')
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `env-images`,
        path: path.resolve(__dirname, 'content/pages')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'reference',
        path: path.resolve(__dirname, 'content/references/translations')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'reference-examples',
        path: path.resolve(__dirname, 'content/references/examples')
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.resolve(__dirname, 'content/pages')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'examples',
        path: path.resolve(__dirname, 'content/examples')
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tutorials`,
        path: path.resolve(__dirname, 'content/tutorials')
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contributions`,
        path: path.resolve(__dirname, 'content/contributions')
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tools`,
        path: path.resolve(__dirname, 'content/tools')
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `books`,
        path: path.resolve(__dirname, 'content/books')
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `download`,
        path: path.resolve(__dirname, 'content/download')
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        plugins: [],
        remarkPlugins: [
          require('remark-slug'),
          require('remark-unwrap-images')
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200
            }
          },
          `gatsby-remark-copy-linked-files`
        ]
      }
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `json`
      }
    },
    {
      resolve: `gatsby-transformer-code`,
      options: {
        name: 'reference-examples',
        extensions: ['pde']
      }
    },
    {
      resolve: `gatsby-transformer-code`,
      options: {
        name: 'examples',
        extensions: ['js', 'pde']
      }
    },
    `gatsby-plugin-image`,
    `gatsby-remark-images`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo-processing.svg`
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: path.resolve(__dirname, 'src/images')
        }
      }
    },
    {
      resolve: 'gatsby-plugin-fathom',
      options: {
        // Unique site id
        siteId: 'DKYMXLKT'
      }
    }
  ]
};
