import React from 'react';
import unique from 'array-unique';

import SideExCategoryList from '../components/SideExCategoryList';

import css from './SidebarExampleList.module.css';

const SidebarExampleList = (props) => {
  const { data } = props;

  let examples = data.nodes;

  let categories = unique(
    examples.map((file) => {
      return file.relativeDirectory.split('/')[0];
    })
  );

  let subcategories = {};
  categories.map((category) => {
    subcategories[category] = unique(
      examples.map((example) => {
        if (example.relativeDirectory.split('/')[0] === category)
          return example.relativeDirectory.split('/')[1];
        else return null;
      })
    );
  });

  return (
    <div className={css.root}>
      <ul>
        {categories.map((category, key) => {
          let categoryItems = examples.filter((example) => {
            return example.relativeDirectory.split('/')[0] === category;
          });
          return (
            <SideExCategoryList
              key={key + 'c'}
              category={category}
              categoryItems={categoryItems}
              subcategories={subcategories[category]}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarExampleList;
