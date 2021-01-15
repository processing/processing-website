import React, { Fragment, useContext, useState, useMemo } from 'react';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

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
  const intl = useIntl();

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
        onClick={(e) => onChange(e, !show)}
        onKeyDown={(e) => onChange(e, !show)}
        role={'button'}
        tabIndex={'0'}>
        {show ? '×' : '+'}
      </div>
      {show && (
        <Fragment>
          <h2>
            {type === 'reference'
              ? intl.formatMessage({ id: 'reference' })
              : intl.formatMessage({ id: 'examples' })}
          </h2>
          <Searchbar
            placeholder={'Search'}
            onChange={(e) => setSearchTerm(e.target.value)}
            searchTerm={searchTerm}
          />
          <div className={css.listWrapper}>
            <SidebarList data={tree} type={type} show={show} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Sidebar;
