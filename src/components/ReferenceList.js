import React from 'react';
import unique from 'array-unique';

import CategoryList from './CategoryList';
import SideCategoryList from './SideCategoryList';

import css from './ReferenceList.module.css';

const ReferenceList = (props) => {
  const { data, library, sidebar } = props;

  let items = data.nodes;
  let link;

  let categories = unique(
    items.map((item) => {
      return item.childJson.category;
    })
  );

  let subcategories = {};
  categories.forEach((c) => {
    subcategories[c] = unique(
      items.map((r) => {
        if (r.childJson.category === c) return r.childJson.subcategory;
        else return null;
      })
    );
  });

  if (library === 'processing') {
    link = '/reference/';
  } else {
    link = '/reference/libraries/' + library + '/';
  }

  return (
    <div className={css.root}>
      {categories.map((c, key) => {
        let categoryItems = items.filter((item) => {
          return item.childJson.category === c;
        });
        return sidebar ? (
          <SideCategoryList
            key={key + 'c'}
            category={c}
            categoryItems={categoryItems}
            subcategories={subcategories[c]}
            link={link}
          />
        ) : (
          <CategoryList
            key={key + 'c'}
            category={c}
            categoryItems={categoryItems}
            subcategories={subcategories[c]}
            link={link}
          />
        );
      })}
    </div>
  );
};

export default ReferenceList;
