import React, { memo, useState, useEffect } from 'react';
import classnames from 'classnames';

import css from './ContentWithSidebar.module.css';
import grid from '../styles/grid.module.css';

/**
  This class simply handles the collapsing / expansion of the
  content when the sidebar opens and closes
**/

const Content = ({ children, sidebarOpen, className }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={classnames(grid.col, css.root, className, {
        [css.animate]: animate,
        [css.sidebarOpen]: sidebarOpen
      })}>
      {children}
    </div>
  );
};

export default memo(Content);
