import React from 'react';

import SubcategoryList from './SubcategoryList';

const CategoryList = (props) => {
  const { category, categoryRefs, subcategory, link } = props;

  return (
    <div>
      <h2>{category}</h2>
      <ul>
        {subcategory.map((p, key) => {
          let subcategoryRefs = categoryRefs.filter((ref) => {
            return ref.childJson.subcategory === p;
          });
          return (
            <SubcategoryList
              key={key + 's'}
              subcategory={p}
              subcategoryRefs={subcategoryRefs}
              link={link}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
