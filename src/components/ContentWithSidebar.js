import React, { memo } from 'react';
import classnames from 'classnames';

import css from './ContentWithSidebar.module.css';
import grid from '../styles/grid.module.css';

/**
  This class simply handles the collapsing / expansion of the
  content when the sidebar opens and closes
**/

const Content = ({ children, collapsed, className }) => {
  return (
    <div
      className={classnames(grid.col, css.root, className, {
        [css.collapsed]: collapsed,
      })}>
      {children}
    </div>
  );
};

export default memo(Content);
