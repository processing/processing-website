import React from 'react';
import unique from 'array-unique';

import SideExCategoryList from '../components/SideExCategoryList';

import css from './ExampleList.module.css';

const ExampleList = (props) => {
  const { data } = props;

  let examples = data.nodes;

  let categories = unique(
    examples.map((file) => {
      return file.relativeDirectory.split('/')[0];
    })
  );

  let subcategories = {};
  categories.map((c) => {
    subcategories[c] = unique(
      examples.map((r) => {
        if (r.relativeDirectory.split('/')[0] === c)
          return r.relativeDirectory.split('/')[1];
        else return null;
      })
    );
  });

  return (
    <div className={css.root}>
      <ul>
        {categories.map((c, key) => {
          let categoryRefs = examples.filter((ref) => {
            return ref.relativeDirectory.split('/')[0] === c;
          });
          return (
            <SideExCategoryList
              key={key + 'c'}
              category={c}
              categoryRefs={categoryRefs}
              subcategories={subcategories[c]}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ExampleList;
