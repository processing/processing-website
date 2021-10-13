import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';
import classnames from 'classnames';

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

import * as css from './Layout.module.css';

export const LayoutContext = React.createContext();

const Layout = ({ children, withSidebar, withBreadcrumbs, mainClassName }) => {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [currentHeading, setCurrentHeading] = useState('');

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
      h2: ({ children, id }) => (
        <H2 setCurrent={setCurrentHeading} id={id}>
          {children}
        </H2>
      ),
      img: (props) => <img {...props} alt=""></img>,
      // Render escaped characters as code
      code: ({ children }) => (
        <code dangerouslySetInnerHTML={{ __html: children }} />
      ),
      // Render escaped characters as code
      inlineCode: ({ children }) => (
        <code dangerouslySetInnerHTML={{ __html: children }} />
      )
    }),
    [setCurrentHeading]
  );

  return (
    <div className={css.root}>
      <LayoutContext.Provider value={{ headerScrolled, currentHeading }}>
        <Helmet titleTemplate="%s / Processing.org" />
        <Header siteTitle="Processing" scrolled={headerScrolled} />
        <main
          className={classnames(css.main, mainClassName, {
            [css.withBreadcrumbs]: withBreadcrumbs
          })}>
          <MDXProvider components={shortcodes}>{children}</MDXProvider>
        </main>
        <Footer siteTitle="Processing" withSidebar={withSidebar} />
      </LayoutContext.Provider>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
