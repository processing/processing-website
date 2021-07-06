import React, { memo } from 'react';
import classnames from 'classnames';

import css from './ContentWithSidebar.module.css';
import grid from '../styles/grid.module.css';

/**
  This class simply handles the collapsing / expansion of the
  content when the sidebar opens and closes
**/

const Content = ({ children, sidebarOpen, className }) => {
  if (sidebarOpen === null) {
    return <div key="placeholder" className={css.root} />;
  }
  return (
    <div
      key="root"
      className={classnames(grid.col, css.root, className, {
        [css.sidebarOpen]: sidebarOpen
      })}>
      {children}
    </div>
  );
};

export default memo(Content);
