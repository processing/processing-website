import React, { memo } from 'react';
import classnames from 'classnames';

import css from './FilterBar.module.css';
import grid from '../styles/grid.module.css';

const FilterBar = ({
  large,
  placeholder,
  searchTerm,
  className,
  onChange,
  onClick,
}) => {
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  return (
    <div
      className={classnames(css.root, {
        [grid.col]: large,
        [css.large]: large,
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
          onKeyPress={onKeyPress}
        />
        {searchTerm && (
          <button className={css.clearButton} onClick={onClick} type="button">
            &times;
          </button>
        )}
      </form>
    </div>
  );
};

export default memo(FilterBar);
