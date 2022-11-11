import React, { memo } from 'react';
import * as css from './Banner.module.css';

export const Banner = ({ text, url }) => {
  return (
    <a href={url} target="_blank" className={css.root}>
      {text}
    </a>
  );
};

export default memo(Banner);
