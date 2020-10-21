import React from 'react';
import classnames from 'classnames';

import css from './FixedImage.module.css';

const FixedImage = ({
  children,
  center,
  inline,
  height,
  width,
  marginLeft,
  marginRight,
  style,
}) => {
  const _style = {
    width,
    height,
    marginLeft: center ? 'auto' : marginLeft,
    marginRight: center ? 'auto' : marginRight,
    ...style,
  };

  return (
    <div
      className={classnames(css.root, { [css.inline]: inline })}
      style={_style}>
      {children}
    </div>
  );
};

export default FixedImage;
