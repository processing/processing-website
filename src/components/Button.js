import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'gatsby';

import css from './Button.module.css';

export const Button = ({
  className,
  to,
  href,
  size,
  target,
  onClick,
  children,
}) => {
  const classNames = classnames(css.root, className, [css[size]]);

  return (
    <>
      {to ? (
        <Link className={classNames} to={to}>
          {children}
        </Link>
      ) : href ? (
        <a className={classNames} href={href} target={target}>
          {children}
        </a>
      ) : (
        <button className={classNames} onClick={onClick}>
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
  size: PropTypes.oneOf(['large']),
};
