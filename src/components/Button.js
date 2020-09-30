import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'gatsby';

import css from './Button.css';

export const Button = ({ className, to, onClick, children }) => {
  const classes = classnames(css.root, {
    [className]: className,
  });
  return (
    <Link className={classes} to={to}>
      {children}
    </Link>
  );
};

export default Button;

Button.defaultProps = {
  onClick: () => {},
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
};
