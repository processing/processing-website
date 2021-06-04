import React from 'react';

import css from './CodeImageDiv.module.css';

const CodeImageDiv = ({ children }) => (
  <div className={css.root}>{children}</div>
);

export default CodeImageDiv;
