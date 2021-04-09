import React, { memo } from 'react';
import classnames from 'classnames';
import grid from '../styles/grid.module.css';

import css from './ReferenceItemContent.module.css';
import css from './ReferenceItemList.module.css';

/**
  This class simply handles the collapsing / expansion of the
  content when the sidebar opens and closes
**/

const Content = ({ children, collapsed }) => {
  return (
    <div
      className={classnames(grid.col, css.root, {
        [css.collapsed]: collapsed,
      })}>
      {children}
    </div>
  );
};

export default memo(Content);
