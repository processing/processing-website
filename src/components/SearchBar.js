import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Topbar from './Topbar';
import Navbar from './Navbar';

import grid from '../styles/grid.module.css';
import css from './SearchBar.module.css';

const SearchBar = () => (
  <div className={classnames(grid.col2, css.root)}>
    <input className={css.input} type="text" />
  </div>
);

export default SearchBar;
