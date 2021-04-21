import React, { useEffect, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

import Header from './Header';
import Footer from './Footer';

import FixedImage from './mdx/FixedImage';
import Intro from './mdx/Intro';
import H2 from './mdx/H2';
import HighlightBlock from './mdx/HighlightBlock';
import Note from './mdx/Note';

import '../styles/base.css';
import '../styles/variables.css';
import '../styles/fonts.css';

import css from './Layout.module.css';

export const LayoutContext = React.createContext({
  headerHeight: 0
});

const Layout = ({ children, isHomepage, withSidebar }) => {
  const mainRef = useRef();
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [currentHeading, setCurrentHeading] = useState('');

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
        setHeaderScrolled(true);
      }
      if (offset < 60) {
        setHeaderScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerScrolled]);

  const shortcodes = useMemo(
    () => ({
      FixedImage,
      Intro,
      HighlightBlock,
      Note,
      h2: ({ children }) => <H2 setCurrent={setCurrentHeading}>{children}</H2>,
      img: (props) => <img {...props} alt=""></img>
    }),
    [setCurrentHeading]
  );

  return (
    <div className={css.root}>
      <LayoutContext.Provider value={{ headerScrolled, currentHeading }}>
        <Helmet titleTemplate="%s / Processing.org" />
        <Header
          siteTitle={data.site.siteMetadata.title}
          scrolled={headerScrolled}
        />
        <main
          className={classnames({
            [css.headerScrolled]: headerScrolled,
            [css.homepage]: isHomepage,
            [css.withSidebar]: withSidebar
          })}
          ref={mainRef}>
          <MDXProvider components={shortcodes}>{children}</MDXProvider>
        </main>
        <Footer
          siteTitle={data.site.siteMetadata.title}
          withSidebar={withSidebar}
        />
      </LayoutContext.Provider>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
