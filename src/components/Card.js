import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'gatsby';

import css from './Card.module.css';

export const Card = ({
  className,
  to,
  href,
  color,
  target,
  onClick,
  children,
}) => {
  const classNames = classnames(css.root, className, {
    [css[color]]: color,
  });

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

export default Card;

Card.defaultProps = {
  onClick: () => {},
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['gray']),
};
