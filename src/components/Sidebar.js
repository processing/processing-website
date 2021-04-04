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

import { useWindowSize } from '../hooks';

import css from './Sidebar.module.css';

const Sidebar = (props) => {
  const { tree, show, type = 'reference', onChange } = props;
  const { width: windowWidth } = useWindowSize();
  const [searchTerm, setSearchTerm] = useState('');
  const sidebarRef = useRef();
  const [width, setWidth] = useState(0);
  const layout = useContext(LayoutContext);
  const intl = useIntl();

  // const filteredItems = useMemo(() => filterItems(items.nodes, searchTerm), [
  //   searchTerm,
  //   items.nodes,
  // ]);

  // const tree =
  //   type === 'reference'
  //     ? useMemo(() => organizeReferenceItems(filteredItems), [filteredItems])
  //     : useOrganizedExamples(items, searchTerm);

  useEffect(() => {
    if (sidebarRef.current.clientWidth > width)
      setWidth((width) => sidebarRef.current.clientWidth);
  }, [sidebarRef, width]);

  const widthStyle =
    windowWidth <= 960 && show
      ? `100%`
      : windowWidth <= 960 && !show
      ? `var(--margin-double)`
      : show
      ? `${width}px`
      : `var(--margin)`;

  return (
    <div
      className={classnames(css.root, { [css.show]: show })}
      ref={sidebarRef}>
      <div
        className={classnames(css.sidebarWrapper, {
          [css.headerScrolled]: layout.headerScrolled,
        })}
        style={{
          width: widthStyle,
        }}>
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
            <FilterBar
              placeholder={'Filter'}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => setSearchTerm('')}
              searchTerm={searchTerm}
            />
            <div className={css.listWrapper}>
              <SidebarList tree={tree} type={type} />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
