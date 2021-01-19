import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import Header from './Header';
import Footer from './Footer';

import { useWindowSize } from '../utils/hooks';

import FixedImage from './mdx/FixedImage';
import Intro from './mdx/Intro';
import HighlightBlock from './mdx/HighlightBlock';
import Note from './mdx/Note';

import '../styles/base.css';
import '../styles/variables.css';
import '../styles/fonts.css';

import css from './Layout.module.css';

export const LayoutContext = React.createContext({ headerHeight: 0 });

const Layout = ({ children }) => {
  const [headerScrolled, setScrolled] = useState(false);
  const winSize = useWindowSize();

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
      if (offset > 200 && !headerScrolled) {
        setScrolled(true);
      }
      if (offset < 60) {
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
    img: (props) => <img {...props} alt=""></img>,
  };

  const size =
    winSize.width < 720 ? 'small' : winSize.width < 1080 ? 'medium' : 'large';

  return (
    <div className={css.root}>
      <LayoutContext.Provider value={{ headerScrolled }}>
        <Header
          siteTitle={data.site.siteMetadata.title}
          scrolled={headerScrolled}
          size={size}
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
