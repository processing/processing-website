import React from 'react';
import classnames from 'classnames';

import ExSubcategoryList from './ExSubcategoryList';

import css from './ExCategoryList.module.css';

const ExCategoryList = (props) => {
  const { category, categoryRefs, subcategories } = props;

  return (
    <div className={classnames(css.root)}>
      <h2>{category}</h2>
      <p>Lorem ipsum</p>
      <ul>
        {subcategories.map((p, key) => {
          let subcategoryRefs = categoryRefs.filter((ref) => {
            return ref.relativeDirectory.split('/')[1] === p;
          });
          return (
            <ExSubcategoryList
              key={key + 's'}
              subcategory={p}
              subcategoryRefs={subcategoryRefs}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ExCategoryList;
