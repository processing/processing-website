import React from 'react';

import css from './CodeBlock.module.css';

const CodeBlock = ({ children }) => (
  <pre className={css.root}>
    <code>{children}</code>
  </pre>
);

export default CodeBlock;
