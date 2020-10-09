import React from 'react';

import css from './Intro.module.css';

const Intro = ({ children }) => (
  <div className={css.root}>
    <span>{children}</span>
  </div>
);

export default Intro;
