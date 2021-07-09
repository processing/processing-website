import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import * as css from './Card.module.css';

export const Card = ({ className, children }) => {
  return <div className={classnames(css.root, className)}>{children}</div>;
};

export default Card;

Card.defaultProps = {
  onClick: () => {}
};

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['gray'])
};
