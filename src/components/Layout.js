import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import Header from './Header';
import Footer from './Footer';

import FixedImage from './mdx/FixedImage';
import Intro from './mdx/Intro';
import HighlightBlock from './mdx/HighlightBlock';
import Note from './mdx/Note';

import { useHeight } from '../utils/hooks';

import '../styles/base.css';
import '../styles/variables.css';
import '../styles/fonts.css';

import css from './Layout.module.css';

export const LayoutContext = React.createContext({ headerHeight: 0 });

const Layout = ({ children }) => {
  const [headerScrolled, setScrolled] = useState(false);

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const shortcodes = {
    FixedImage,
    Intro,
    HighlightBlock,
    Note,
    img: (props) => <img {...props}></img>,
  };

  return (
    <div className={css.root}>
      <LayoutContext.Provider value={{ headerScrolled }}>
        <Header
          siteTitle={data.site.siteMetadata.title}
          scrolled={headerScrolled}
        />
        <main className={classnames({ [css.headerScrolled]: headerScrolled })}>
          <MDXProvider components={shortcodes}>{children}</MDXProvider>
        </main>
        <Footer siteTitle={data.site.siteMetadata.title} />
      </LayoutContext.Provider>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
