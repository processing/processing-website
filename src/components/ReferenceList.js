import React from 'react';
import unique from 'array-unique';

import CategoryList from './CategoryList';

const ReferenceList = (props) => {
  const { data, library } = props;

  let refs = data.allFile.nodes;
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
    <div>
      {categories.map((c, key) => {
        let categoryRefs = refs.filter((ref) => {
          return ref.childJson.category === c;
        });
        return (
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
