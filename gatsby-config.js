require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Processing`,
    description: `Welcome to the Processing website`,
    author: `@processing`,
    siteUrl: `https://processing.org/`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
            resolve: `gatsby-remark-images-anywhere`,
            options: {
              createMarkup: ({
                src,
                srcSet,
                sizes,
                aspectRatio,
                alt,
                base64,
                presentationWidth
              }) =>
                `<picture style="position: relative; overflow: hidden; display: inline-block; padding-bottom: ${
                  (1 / aspectRatio) * 100
                }%; width: 100%; height: 0;"><source src="${src}" srcSet="${srcSet}" /><img src="${src}" srcSet="${srcSet}" alt="${alt}" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; object-fit: cover; object-position: center center;"/></picture>`,
              maxWidth: 1200,
              showCaptions: true
            }
          },
          {
            resolve: `gatsby-remark-copy-linked-files`
          }
        ]
      }
    },
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
            importFrom: './src/styles/variables.css'
          }),
          require('postcss-calc')(),
          require('postcss-custom-media')({
            importFrom: './src/styles/variables.css'
          })
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
        name: 'json',
        path: path.resolve(__dirname, 'content/references/translations')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'in-examples',
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
      resolve: `gatsby-transformer-code`,
      options: {
        name: `examples`
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
    }
  ]
};
