import React from 'react';
import classnames from 'classnames';

import css from './Searchbar.module.css';
import grid from '../styles/grid.module.css';

const Searchbar = ({ large, placeholder }) =>
  large ? (
    <div className={classnames(css.root, grid.grid, css.large)}>
      <form action="" className={classnames(grid.col6, grid.internal)}>
        <input
          className={grid.col6}
          type="text"
          id="search"
          name="search"
          placeholder={placeholder}
        />
      </form>
    </div>
  ) : (
    <div className={classnames(css.root, grid.grid)}>
      <form action="" className={classnames(grid.col2, grid.internal)}>
        <input
          type="text"
          id="search"
          name="search"
          placeholder={placeholder}
        />
      </form>
    </div>
  );

export default Searchbar;
