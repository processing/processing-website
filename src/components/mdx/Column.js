import React from 'react';
import classnames from 'classnames';

import css from './Column.module.css';

const Column = ({ children, float, style }) => {
  const padding =
    float === 'left'
      ? '0 var(--gutter-double) 0 0'
      : '0 0 0 var(--gutter-double)';
  const _style = {
    float,
    padding,
    ...style,
  };

  return (
    <div className={css.root} style={_style}>
      {children}
    </div>
  );
};

export default Column;
