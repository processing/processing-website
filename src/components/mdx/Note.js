import React from 'react';

import css from './Note.module.css';

const Intro = ({ children }) => (
  <div className={css.root}>
    <span>{children}</span>
  </div>
);

export default Intro;
