import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import FilterBar from '../components/FilterBar';
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
  const sidebarRef = useRef();
  const [width, setWidth] = useState(0);
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

  useEffect(() => {
    console.log(sidebarRef.current.clientWidth);
    if (sidebarRef.current.clientWidth > width)
      setWidth((width) => sidebarRef.current.clientWidth);
  }, [sidebarRef, width]);

  return (
    <div
      className={classnames(css.root, { [css.show]: show })}
      ref={sidebarRef}>
      <div
        className={classnames(css.sidebarWrapper, {
          [css.headerScrolled]: layout.headerScrolled,
        })}
        style={{
          width: show ? `${width}px` : `var(--margin)`,
        }}>
        <div
          className={css.toggleButton}
          onClick={(e) => onChange(!show)}
          onKeyDown={(e) => onChange(!show)}
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
              <SidebarList data={tree} type={type} />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
