import React from 'react';

import * as css from './HighlightBlock.module.css';

const HighlightBlock = ({ children }) => (
  <div className={css.root}>{children}</div>
);

export default HighlightBlock;
