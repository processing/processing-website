import React from 'react';
import PropTypes from 'prop-types';

import Topbar from './Topbar';
import Navbar from './Navbar';

import * as css from './Header.module.css';

const Header = ({ siteTitle, scrolled }) => {
  return (
    <header className={css.root}>
      <Topbar show={!scrolled} />
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
