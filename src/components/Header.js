import PropTypes from 'prop-types';
import React from 'react';

import Topbar from './Topbar';
import Navbar from './Navbar';

import css from './Header.module.css';

const Header = ({ siteTitle }) => (
  <header className={css.root}>
    <div>
      <Topbar />
      <Navbar siteTitle={siteTitle} />
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
