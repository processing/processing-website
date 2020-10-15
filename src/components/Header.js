import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Topbar from './Topbar';
import Navbar from './Navbar';

import css from './Header.module.css';

const Header = ({ siteTitle }) => {
  const [scrolled, setScrolled] = useState(false);

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
  });

  return (
    <header className={css.root}>
      <div>
        <Topbar show={!scrolled} />
        <Navbar siteTitle={siteTitle} show={!scrolled} />
      </div>
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
