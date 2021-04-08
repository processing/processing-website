import React, { memo } from 'react';
import classnames from 'classnames';
import grid from '../styles/grid.module.css';
import css from './ReferenceItemSection.module.css';

const ReferenceItemSection = ({ title, children, collapsed }) => {
  return (
    <div
      className={classnames(grid.nest, css.root, {
        [css.collapsed]: collapsed,
      })}>
      <h4 className={classnames(grid.col, css.title)}>{title}</h4>
      <div className={classnames(grid.col, css.content)}>{children}</div>
    </div>
  );
};

export default memo(ReferenceItemSection);
