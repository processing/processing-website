import React, { Fragment, useState, useMemo } from 'react';
import classnames from 'classnames';

import Searchbar from '../components/Searchbar';
import SidebarExampleList from '../components/SidebarExampleList';
import SidebarReferenceList from '../components/SidebarReferenceList';

import {
  filterItems,
  organizeExampleItems,
  organizeReferenceItems,
} from '../utils/data';

import css from './Sidebar.module.css';

const Sidebar = (props) => {
  const { items, show, type, onChange } = props;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => filterItems(items.nodes, searchTerm), [
    searchTerm,
    items.nodes,
  ]);

  const tree = useMemo(
    () =>
      type === 'reference'
        ? organizeReferenceItems(filteredItems)
        : organizeExampleItems(filteredItems),
    [filteredItems, type]
  );
  return (
    <div className={classnames(css.root, { [css.show]: show })}>
      <div
        className={css.toggleButton}
        onClick={(e) => onChange(!show)}
        role={'button'}>
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
          <div className={css.listWrapper}>
            {type === 'reference' ? (
              <SidebarReferenceList data={tree} />
            ) : (
              <SidebarExampleList data={tree} />
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Sidebar;
