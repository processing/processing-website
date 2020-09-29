import React, { Fragment, useState, useMemo } from 'react';
import classnames from 'classnames';

import Searchbar from '../components/Searchbar';
import SidebarExampleList from '../components/SidebarExampleList';
import SidebarReferenceList from '../components/SidebarReferenceList';

import { filterItems, organizeReferenceItems } from '../utils/data';

import css from './Sidebar.module.css';

const Sidebar = (props) => {
  const { items, show, type, onChange } = props;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => filterItems(items.nodes, searchTerm), [
    searchTerm,
  ]);

  const tree = useMemo(() => organizeReferenceItems(filteredItems), [
    filteredItems,
  ]);
  return (
    <div className={classnames(css.root, { [css.show]: show })}>
      <div className={css.toggleButton} onClick={(e) => onChange(!show)}>
        {show ? '×' : '+'}
      </div>
      {show && (
        <Fragment>
          <h2>{type === 'reference' ? 'Reference' : 'Examples'}</h2>
          <Searchbar
            placeholder={'Search'}
            onChange={(e) => setSearchTerm(e.target.value)}
            searchTerm={searchTerm}
          />
          {type === 'reference' ? (
            <SidebarReferenceList data={tree} />
          ) : (
            <SidebarExampleList data={items} />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Sidebar;
