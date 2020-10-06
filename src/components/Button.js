import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'gatsby';

import css from './Button.module.css';

export const Button = ({ className, variant, to, onClick, children }) => {
  const classes = classnames(css.root, {
    [className]: className,
    [css[variant]]: css[variant],
  });

  console.log(to);

  return (
    <>
      {to ? (
        <Link className={classes} to={to}>
          {children}
        </Link>
      ) : (
        <button className={classes} onClick={onClick}>
          {children}
        </button>
      )}
    </>
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
