import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import { categories } from '../utils/categories';

import SubcategoryList from './SubcategoryList';

const CategoryList = (props) => {
  const { library, category, categoryRefs, link } = props;
  const { locale } = useLocalization();

  let subcategories = categories['processing'][category];

  return (
    <div>
      <h2>{category}</h2>
      <ul>
        {library !== 'processing' &&
          categoryRefs.map((node, key) => {
            return (
              <li key={key}>
                <Link to={link + node.name} language={locale}>
                  {node.childJson.name}
                </Link>
              </li>
            );
          })}
        {library === 'processing' &&
          subcategories.map((p, key) => {
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
