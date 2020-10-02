import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import grid from '../styles/grid.module.css';
import css from './Footer.module.css';

const Footer = ({ siteTitle }) => (
  <footer className={css.root}>
    <span className={classnames(grid.grid, css.span)}>
      Processing is an open project intiated by {''}
      <a href="https://benfry.com/">Ben Fry</a> and {''}
      <a href="http://reas.com/">Casey Reas</a>. It is developed by a team of
      volunteers.
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
