import React from 'react';

import ExSubcategoryList from './ExSubcategoryList';

const ExCategoryList = (props) => {
  const { category, categoryRefs, subcategories } = props;

  return (
    <div>
      <h2>{category}</h2>
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
