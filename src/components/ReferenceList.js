import React from 'react';
import unique from 'array-unique';

import CategoryList from './CategoryList';
import SideCategoryList from './SideCategoryList';

import css from './ReferenceList.module.css';

const ReferenceList = (props) => {
  const { data, library, sidebar } = props;

  let refs = data.nodes;
  let link;

  let categories = unique(
    refs.map((ref) => {
      return ref.childJson.category;
    })
  );

  let subcategories = {};
  categories.map((c) => {
    subcategories[c] = unique(
      refs.map((r) => {
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
        let categoryRefs = refs.filter((ref) => {
          return ref.childJson.category === c;
        });
        return sidebar ? (
          <SideCategoryList
            key={key + 'c'}
            category={c}
            categoryRefs={categoryRefs}
            subcategory={subcategories[c]}
            link={link}
          />
        ) : (
          <CategoryList
            key={key + 'c'}
            category={c}
            categoryRefs={categoryRefs}
            subcategory={subcategories[c]}
            link={link}
          />
        );
      })}
    </div>
  );
};

export default ReferenceList;
