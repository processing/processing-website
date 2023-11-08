import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import * as grid from '../styles/grid.module.css';
import * as css from './SearchBar.module.css';

import SearchIcon from '../images/search-icon.svg';

const SearchBar = ({ className }) => {
  const intl = useIntl();
  const [searchTerm, setSearchTerm] = useState();
  const [focused, setFocused] = useState(false);

  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') search();
  };

  const search = () => {
    if (searchTerm) {
      window.open(
        'https://www.google.com/search?as_sitesearch=processing.org&as_q=' +
        searchTerm,
        '_blank'
      );
    }
  };
  return (
    <div className={classnames({ [className]: className }, grid.col, css.root)}>
      <div className={css.searchBar}>
        <input
          className={classnames(css.input)}
          type="text"
          value={searchTerm || ''}
          onChange={onChangeHandler}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          placeholder={intl.formatMessage({
            id: focused ? 'searchWithGoogle' : 'search'
          })}
        />
        <button
          className={css.submit}
          onClick={search}
          aria-label={`Submit search`}>
          <SearchIcon height={30} width={30} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
