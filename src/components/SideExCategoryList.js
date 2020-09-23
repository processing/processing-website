import React, { useState } from 'react';
import classnames from 'classnames';

import SideExSubcategoryList from './SideExSubcategoryList';

import css from './SideExCategoryList.module.css';

const SideExCategoryList = (props) => {
  const { category, categoryRefs, subcategories } = props;
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div className={css.root}>
      <h2 onClick={toggleExpand}>{category}</h2>
      {expand ? (
        <ul>
          {subcategories.map((p, key) => {
            let subcategoryRefs = categoryRefs.filter((ref) => {
              return ref.relativeDirectory.split('/')[1] === p;
            });
            return (
              <SideExSubcategoryList
                key={key + 's'}
                subcategory={p}
                subcategoryRefs={subcategoryRefs}
              />
            );
          })}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default SideExCategoryList;
