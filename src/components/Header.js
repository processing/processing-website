import React from 'react';
import PropTypes from 'prop-types';

import Topbar from './Topbar';
import Navbar from './Navbar';

import css from './Header.module.css';

const Header = ({ siteTitle, scrolled, size }) => {
  return (
    <header className={css.root}>
      <Topbar show={!scrolled} size={size} />
      <Navbar siteTitle={siteTitle} show={!scrolled} size={size} />
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
