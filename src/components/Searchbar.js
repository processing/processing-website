import React from 'react';
import classnames from 'classnames';

import css from './Searchbar.module.css';
import grid from '../styles/grid.module.css';

const Searchbar = ({
  large,
  placeholder,
  searchTerm,
  className,
  onChange,
  onClick,
}) => {
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  return large ? (
    <div
      className={classnames(css.root, grid.col, css.large, {
        [className]: className,
      })}>
      <form action="" role="search">
        <input
          type="text"
          id="search"
          name="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {searchTerm && (
          <button className={css.clearButton} onClick={onClick} type="button">
            &times;
          </button>
        )}
      </form>
    </div>
  ) : (
    <div className={classnames(css.root, { [className]: className })}>
      <form action="" role="search">
        <input
          type="text"
          id="search"
          name="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={onChange}
        />
        <button className={css.clearButton} onClick={onClick} type="button">
          x
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
