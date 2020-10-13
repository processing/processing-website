import React from 'react';

import css from './FixedImage.module.css';

const FixedImage = ({
  children,
  width,
  minWidth,
  float,
  marginLeft,
  marginRight,
  block,
}) => {
  let style = {};
  style['float'] = float ? float : '';
  style['width'] = width ? width : '';
  style['minWidth'] = minWidth ? minWidth : '';
  style['marginLeft'] = marginLeft ? marginLeft : block ? 'auto' : '';
  style['marginRight'] = marginRight ? marginRight : block ? 'auto' : '';
  if (children.props && !block) children.props.style['margin'] = 0;
  return block ? (
    <div className={css.root} style={{ width: '100%' }}>
      <div style={style}>{children}</div>
    </div>
  ) : (
    <div style={style} className={css.root}>
      {children}
    </div>
  );
};

export default FixedImage;
