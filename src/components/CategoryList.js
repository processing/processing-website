import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import SubcategoryList from './SubcategoryList';

const CategoryList = (props) => {
  const { library, category, categoryRefs, subcategory, link } = props;
  const { locale } = useLocalization();

  return (
    <div>
      <h2>{category}</h2>
      <ul>
        {
          subcategory.map((p, key) => {
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
