import React from 'react';

import CategoryList from './CategoryList';

import { categories } from '../utils/categories';

const ReferenceList = (props) => {
  const { data, library } = props;

  let refs = data.allFile.nodes;
  let link, libCategories;

  if (library === 'processing') {
    link = '/references/';
    libCategories = Object.keys(categories[library]);
  } else {
    link = '/libraries/' + library + '/';
    libCategories = categories[library];
  }

  return (
    <div>
      {libCategories.map((p, key) => {
        let categoryRefs = refs.filter((ref) => {
          return ref.childJson.category === p;
        });
        return (
          <CategoryList
            key={key + 'p'}
            library={library}
            category={p}
            categoryRefs={categoryRefs}
            link={link}
          />
        );
      })}
    </div>
  );
};

export default ReferenceList;
