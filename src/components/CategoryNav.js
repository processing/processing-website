import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';

import css from './CategoryNav.module.css';
import grid from '../styles/grid.module.css';

const CategoryNav = ({ categories }) => {
  return (
    <div className={classnames(css.root, grid.grid)}>
      <ul className={grid.col6}>
        {categories.map((category, key) => (
          <li key={`category-navitem-${key}`}>
            <Link to={`#${category}`}>
              <h3>{category.replace(/_/g, ' ')}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryNav;
