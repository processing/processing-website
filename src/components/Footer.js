import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import grid from '../styles/grid.module.css';
import css from './Footer.module.css';

const Footer = ({ siteTitle }) => {
  const intl = useIntl();
  return (
    <footer className={css.root}>
      <span
        className={classnames(grid.grid, css.span)}
        dangerouslySetInnerHTML={{
          __html: intl.formatMessage({ id: 'footer' }),
        }}></span>
    </footer>
  );
};

Footer.propTypes = {
  siteTitle: PropTypes.string,
};

Footer.defaultProps = {
  siteTitle: ``,
};

export default Footer;
