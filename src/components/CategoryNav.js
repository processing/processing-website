import React from 'react';
import classnames from 'classnames';
import Button from './Button';
import { Link } from 'gatsby';

import css from './CategoryNav.module.css';
import grid from '../styles/grid.module.css';

const CategoryNav = ({ categories }) => {
  return (
    <div className={css.root}>
      <h4 className={grid.col}>Shortcuts</h4>
      <ul className={css.list}>
        {categories.map((category, key) => (
          <li
            className={classnames(css.item, grid.col)}
            key={`category-navitem-${key}`}>
            <div className={css.line} />
            <Link className={css.itemLink} to={`#${category}`}>
              {category.replace(/_/g, ' ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryNav;
