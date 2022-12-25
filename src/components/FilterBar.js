import React, { memo } from 'react';
import classnames from 'classnames';

import * as css from './FilterBar.module.css';

const FilterBar = ({
  large,
  placeholder,
  searchTerm,
  className,
  onChange,
  onClick
}) => {
  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };
  return (
    <div
      className={classnames(css.root, className, {
        [css.large]: large
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
          spellcheck="false"
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
