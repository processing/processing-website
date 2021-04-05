import React, { Fragment, useContext, useState, useMemo } from 'react';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import FilterBar from '../components/FilterBar';
import SidebarList from '../components/SidebarList';
import { LayoutContext } from '../components/Layout';

import { useFilteredTree } from '../hooks';

import css from './Sidebar.module.css';

const Sidebar = ({ tree, show, type = 'reference', setShow = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const layout = useContext(LayoutContext);
  const intl = useIntl();
  const filtered = useFilteredTree(tree, searchTerm);

  return (
    <div className={classnames(css.root, { [css.show]: show })}>
      <div
        className={classnames(css.sidebarWrapper, {
          [css.headerScrolled]: layout.headerScrolled,
        })}>
        <div
          className={css.toggleButton}
          onClick={() => setShow((s) => !s)}
          onKeyDown={(e) => e.keyCode === 13 && setShow((s) => !s)}
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
            <FilterBar
              placeholder={'Filter'}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => setSearchTerm('')}
              searchTerm={searchTerm}
            />
            <div className={css.listWrapper}>
              <SidebarList tree={filtered} type={type} />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
