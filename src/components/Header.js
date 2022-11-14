import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Topbar from './Topbar';
import Navbar from './Navbar';
import Banner from './Banner';

import * as css from './Header.module.css';

const Header = ({ siteTitle, scrolled }) => {
  const data = useStaticQuery(graphql`
    query {
      banner: file(
        name: { eq: "banner" }
        sourceInstanceName: { eq: "sitewide" }
      ) {
        name
        childJson {
          visible
          url
          text
        }
      }
    }
  `);
  const bannerData = data.banner.childJson;

  return (
    <header className={css.root}>
      <Topbar show={!scrolled} />
      {bannerData && bannerData.visible && <Banner {...bannerData} />}
      <Navbar siteTitle={siteTitle} scrolled={scrolled} />
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
