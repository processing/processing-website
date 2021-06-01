import React from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';

import css from './CategoryNav.module.css';
import grid from '../styles/grid.module.css';

const CategoryNav = ({ categories }) => {
  return (
    <div className={classnames(grid.col, grid.grid, css.root)}>
      <h4 className={classnames(grid.col, css.heading)}>Shortcuts</h4>
      <ul className={classnames(grid.col, grid.grid, css.list)}>
        {categories.map((category, key) => (
          <li
            className={classnames(grid.col, css.item)}
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
