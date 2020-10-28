import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import Header from './Header';
import Footer from './Footer';

import FixedImage from './mdx/FixedImage';
import Intro from './mdx/Intro';
import HighlightBlock from './mdx/HighlightBlock';
import Note from './mdx/Note';

import '../styles/base.css';
import '../styles/variables.css';
import '../styles/fonts.css';

import css from './Layout.module.css';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const shortcodes = {
    FixedImage,
    Intro,
    HighlightBlock,
    Note,
    img: (props) => <img {...props}></img>,
  };

  return (
    <div className={css.root}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>
        {' '}
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </main>
      <Footer siteTitle={data.site.siteMetadata.title} />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
