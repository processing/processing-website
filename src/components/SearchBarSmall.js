import React, { useState } from 'react';
import classnames from 'classnames';

import grid from '../styles/grid.module.css';
import css from './SearchBarSmall.module.css';

const SearchBarSmall = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState();

  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const onKeyEnter = (e) => {
    if (e.key === 'Enter') {
      window.open(
        'https://www.google.com/search?as_sitesearch=processing.org&as_q=' +
          e.target.value,
        '_blank'
      );
    }
  };

  return (
    <div
      className={classnames(
        { [className]: className },
        grid.col1andhalf,
        css.root
      )}>
      <input
        className={css.input}
        type="text"
        value={searchTerm || ''}
        onChange={onChangeHandler}
        onKeyDown={onKeyEnter}
      />
    </div>
  );
};

export default SearchBarSmall;
