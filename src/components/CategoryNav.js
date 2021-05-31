import React from 'react';
import { Link } from 'gatsby';

import css from './CategoryNav.module.css';

const CategoryNav = ({ categories }) => {
  return (
    <div className={css.root}>
      <h4 className={css.heading}>Shortcuts</h4>
      <ul className={css.list}>
        {categories.map((category, key) => (
          <li className={css.item} key={`category-navitem-${key}`}>
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
