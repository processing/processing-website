import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import grid from '../styles/grid.module.css';
import css from './SearchBar.module.css';

import { useWindowSize } from '../hooks';

import SearchIcon from '../images/search-icon.svg';

const SearchBar = ({ className, size }) => {
  const intl = useIntl();
  const [searchTerm, setSearchTerm] = useState();
  const { width } = useWindowSize();
  const [showSearchBar, setShowSearchBar] = useState();
  const [showHint, setShowHint] = useState(false);

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
        grid.col,
        { [css.large]: size === 'large' },
        css.root
      )}>
      {width >= 960 ? (
        <div className={css.searchBarBig}>
          <input
            className={css.input}
            type="text"
            value={searchTerm || ''}
            onChange={onChangeHandler}
            onFocus={() => setShowHint(true)}
            onBlur={() => setShowHint(false)}
            onKeyDown={onKeyEnter}
            placeholder={intl.formatMessage({ id: 'search' })}
          />
          {showHint ? (
            <span className={css.hint}>{'Goes through Google'}</span>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div className={css.searchBar}>
          <input
            className={classnames(css.input, {
              [css.inputShow]: showSearchBar
            })}
            type="text"
            value={searchTerm || ''}
            onChange={onChangeHandler}
            onFocus={() => setShowHint(true)}
            onBlur={() => setShowHint(false)}
            onKeyDown={onKeyEnter}
            placeholder={intl.formatMessage({ id: 'search' })}
          />
          <SearchIcon
            className={css.searchIcon}
            onClick={() => setShowSearchBar(!showSearchBar)}
          />
          {showHint ? (
            <span className={css.hint}>{'Goes through Google'}</span>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
