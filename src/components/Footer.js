import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import grid from '../styles/grid.module.css';
import css from './Footer.module.css';

const Footer = ({ siteTitle }) => (
  <footer className={css.root}>
    <span className={grid.grid}>
      Processing is an open project intiated by {' '}
      <Link to="https://benfry.com/"> Ben Fry </Link> and {' '}
      <Link to="http://reas.com/"> Casey Reas </Link>. It is developed by a team
      of volunteers.
    </span>
  </footer>
);

Footer.propTypes = {
  siteTitle: PropTypes.string,
};

Footer.defaultProps = {
  siteTitle: ``,
};

export default Footer;
