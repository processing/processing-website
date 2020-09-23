import React from 'react';
import classnames from 'classnames';

import SubcategoryList from './SubcategoryList';

import css from './CategoryList.module.css';
import grid from '../styles/grid.module.css';

const CategoryList = (props) => {
  const { category, categoryRefs, subcategory, link } = props;
  return (
    <div className={classnames(grid.grid, css.root)}>
      <h2 className={classnames(grid.col8)}>
        {category && category.replace(/_/g, ' ')}
      </h2>
      <ul className={classnames(grid.col8, grid.internal)}>
        {subcategory.map((p, key) => {
          let subcategoryRefs = categoryRefs.filter((ref) => {
            return ref.childJson.subcategory === p;
          });

          return (
            p !== null && (
              <SubcategoryList
                key={key + 's'}
                subcategory={p}
                subcategoryRefs={subcategoryRefs}
                link={link}
              />
            )
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
