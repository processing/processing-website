import React, { Fragment, useState, useMemo } from 'react';
import classnames from 'classnames';

import Searchbar from '../components/Searchbar';
import ExampleList from '../components/ExampleList';
import ReferenceList from '../components/ReferenceList';

import { filterItems, organizeReferenceItems } from '../utils/data';

import css from './Sidebar.module.css';

const Sidebar = (props) => {
  const { items, show, examples } = props;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => filterItems(items.nodes, searchTerm), [
    searchTerm,
  ]);

  const tree = useMemo(() => organizeReferenceItems(filteredItems), [
    filteredItems,
  ]);
  return (
    <div className={classnames(css.root, { [css.show]: show })}>
      <div className={css.toggleButton} onClick={(e) => props.onChange(!show)}>
        {show ? '×' : '+'}
      </div>
      {show && (
        <Fragment>
          <h2>{examples ? 'Examples' : 'Reference'}</h2>
          <Searchbar
            placeholder={'Search'}
            onChange={(e) => setSearchTerm(e.target.value)}
            searchTerm={searchTerm}
          />
          {examples ? (
            <ExampleList data={items} />
          ) : (
            <ReferenceList data={tree} library={'processing'} sidebar />
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Sidebar;
