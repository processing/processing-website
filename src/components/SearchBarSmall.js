import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import grid from '../styles/grid.module.css';
import css from './SearchBarSmall.module.css';

const SearchBarSmall = ({ className }) => {
  console.log(className);
  return (
    <div
      className={classnames(
        { [className]: className },
        grid.col1andhalf,
        css.root
      )}>
      <input className={css.input} type="text" />
    </div>
  );
};

export default SearchBarSmall;
