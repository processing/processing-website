import React from 'react';
import { Link } from 'gatsby';
import unique from 'array-unique';

import css from './CategoryNav.module.css';

const CategoryNav = (props) => {
  const { data } = props;
  console.log(data);

  let refs = data.allFile.nodes;

  let categories = unique(
    refs.map((ref) => {
      return ref.childJson.category;
    })
  );

  return (
    <div className={css.root}>
      <ul>
        {categories.map((category, key) => (
          <li>
            <Link to={`#${category}`}>
              <h3>{category}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryNav;
