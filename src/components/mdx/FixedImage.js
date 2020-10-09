import React from 'react';

import css from './FixedImage.module.css';

const FixedImage = ({ children, minWidth, float, marginLeft, marginRight }) => {
  let style = {};
  style['float'] = float ? float : '';
  style['minWidth'] = minWidth ? minWidth : '';
  style['marginLeft'] = marginLeft ? marginLeft : '';
  style['marginRight'] = marginRight ? marginRight : '';
  if (children.props) children.props.style['margin'] = 0;
  return (
    <div style={style} className={css.root}>
      {children}
    </div>
  );
};

export default FixedImage;
