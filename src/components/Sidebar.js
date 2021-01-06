import React, { Fragment, useContext, useState, useMemo } from 'react';
import classnames from 'classnames';

import Searchbar from '../components/Searchbar';
import SidebarList from '../components/SidebarList';

import { LayoutContext } from '../components/Layout';

import {
  filterItems,
  organizeExampleItems,
  organizeReferenceItems,
} from '../utils/data';

import css from './Sidebar.module.css';

const Sidebar = (props) => {
  const { items, show, type = 'reference', onChange } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const layout = useContext(LayoutContext);

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
    <div
      className={classnames(
        css.root,
        { [css.show]: show },
        { [css.headerScrolled]: layout.headerScrolled }
      )}
      style={{}}>
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
            onClick={(e) => setSearchTerm('')}
            searchTerm={searchTerm}
          />
          <div className={css.listWrapper}>
            <SidebarList data={tree} type={type} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Sidebar;
