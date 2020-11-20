import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef, useContext } from 'react';

import Topbar from './Topbar';
import Navbar from './Navbar';

import css from './Header.module.css';

const Header = ({ siteTitle, scrolled }) => {
  return (
    <header className={css.root}>
      <Topbar show={!scrolled} />
      <Navbar siteTitle={siteTitle} show={!scrolled} />
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
