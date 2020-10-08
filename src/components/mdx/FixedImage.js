import React from 'react';

const FixedImage = ({ children, minWidth, float, marginLeft, marginRight }) => {
  let style = {};
  style['float'] = float ? float : '';
  style['minWidth'] = minWidth ? minWidth : '';
  style['marginLeft'] = marginLeft ? marginLeft : '';
  style['marginRight'] = marginRight ? marginRight : '';

  return <div style={style}>{children}</div>;
};

export default FixedImage;
