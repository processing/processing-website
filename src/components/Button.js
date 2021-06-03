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
  color,
  target,
  onClick,
  children,
  tabIndex,
  animate
}) => {
  const classNames = classnames(css.root, className, {
    [css[size]]: size,
    [css[color]]: color,
    [css.animate]: animate
  });

  return (
    <>
      {to ? (
        <Link className={classNames} to={to} tabIndex={tabIndex ? tabIndex : 0}>
          {children}
        </Link>
      ) : href ? (
        <a
          className={classNames}
          href={href}
          target={target}
          tabIndex={tabIndex ? tabIndex : 0}>
          {children}
        </a>
      ) : (
        <button
          className={classNames}
          onClick={onClick}
          tabIndex={tabIndex ? tabIndex : 0}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;

Button.defaultProps = {
  onClick: () => {}
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['gray']),
  size: PropTypes.oneOf(['large', 'small'])
};
