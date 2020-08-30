import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import css from './Footer.module.css';

const Footer = ({ siteTitle }) => (
  <footer className={css.root}>
    <Link to="/">{siteTitle}</Link>
  </footer>
);

Footer.propTypes = {
  siteTitle: PropTypes.string,
};

Footer.defaultProps = {
  siteTitle: ``,
};

export default Footer;
