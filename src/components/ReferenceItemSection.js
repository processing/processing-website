import React, { memo } from 'react';
import classnames from 'classnames';

import css from './ReferenceItemSection.module.css';
import grid from '../styles/grid.module.css';

const Section = ({ title, children, columns = true }) => {
  return (
    <div
      className={classnames(grid.grid, css.root, {
        [css.columns]: columns
      })}>
      <h4 className={classnames(grid.col, css.title)}>{title}</h4>
      <div className={classnames(grid.col, css.content)}>{children}</div>
    </div>
  );
};

export default memo(Section);
