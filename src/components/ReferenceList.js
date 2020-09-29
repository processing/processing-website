import React from 'react';

import unique from 'array-unique';

import CategoryList from './CategoryList';
import SideCategoryList from './SideCategoryList';

import css from './ReferenceList.module.css';

const ReferenceList = (props) => {
  const { data, library, sidebar } = props;
  let link;
  if (library === 'processing') {
    link = '/reference/';
  } else {
    link = '/reference/libraries/' + library + '/';
  }

  return (
    <div className={css.root}>
      {data.map((cat, key) => {
        return <CategoryList key={key + 'c'} category={cat} link={link} />;
      })}
    </div>
  );
};

export default ReferenceList;
