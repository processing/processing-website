import React from 'react';
import classnames from 'classnames';

import css from './Searchbar.module.css';
import grid from '../styles/grid.module.css';

const Searchbar = (props) => {
  const [large, placeholder, searchTerm] = props;

  return large ? (
    <div className={classnames(css.root, grid.grid, css.large)}>
      <form action="" className={classnames(grid.col6, grid.internal)}>
        <input
          className={grid.col6}
          type="text"
          id="search"
          name="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={props.onChange}
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
          value={searchTerm}
          onChange={props.onChange}
        />
      </form>
    </div>
  );
};

export default Searchbar;
