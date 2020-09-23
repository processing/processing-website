import React from 'react';

import ReferenceList from '../components/ReferenceList';
import Searchbar from '../components/Searchbar';

import css from './SidebarList.module.css';

const SidebarList = (props) => {
  const { refs } = props;

  return (
    <div className={css.root}>
      <h3>Reference</h3>
      <Searchbar placeholder={'Search'} />
      <ReferenceList data={refs} library={'processing'} sidebar />
    </div>
  );
};

export default SidebarList;
