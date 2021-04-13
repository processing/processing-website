import React, { memo } from 'react';
import css from './Line.module.css';

const Line = ({ num, children }) => {
  return (
    <div className={css.root}>
      <span className={css.num}>{num}</span>
      {children}
    </div>
  );
};

export default memo(Line);
