import React from 'react';

import ReferenceList from '../components/ReferenceList';
import ExampleList from '../components/ExampleList';
import Searchbar from '../components/Searchbar';

import css from './SidebarList.module.css';

const SidebarList = (props) => {
  const { refs, examples } = props;

  return (
    <div className={css.root}>
      <h3>{examples ? 'Examples' : 'Reference'}</h3>
      <Searchbar placeholder={'Search'} />
      {examples ? (
        <ExampleList data={refs} />
      ) : (
        <ReferenceList data={refs} library={'processing'} sidebar />
      )}
    </div>
  );
};

export default SidebarList;
