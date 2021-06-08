import React, { Fragment, useContext, useState, memo } from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';

import FilterBar from '../components/FilterBar';
import SidebarTreeList from '../components/SidebarTreeList';
import { LayoutContext } from '../components/Layout';

import { useFilteredTree } from '../hooks';

import css from './Sidebar.module.css';

export const Sidebar = memo(({ children, title, show, setShow }) => {
  const { headerScrolled } = useContext(LayoutContext);

  return (
    <div
      className={classnames(css.root, {
        [css.show]: show,
        [css.headerScrolled]: headerScrolled
      })}>
      <div
        className={css.toggleButton}
        onClick={() => {
          if (setShow) setShow((s) => !s);
        }}
        onKeyDown={(e) => e.keyCode === 13 && setShow((s) => !s)}
        role={'button'}
        tabIndex={'0'}>
        {title ? <span className={css.toggleLabel}>{title}</span> : null}
        {show ? '×' : '+'}
      </div>
      {show && (
        <Fragment>
          {title && <h2 className={css.title}>{title}</h2>}
          {children}
        </Fragment>
      )}
    </div>
  );
});

export const SidebarTree = memo(({ tree, title, show, useSerif, setShow }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = useFilteredTree(tree, searchTerm);
  return (
    <Sidebar title={title} show={show} setShow={setShow}>
      <FilterBar
        placeholder={'Filter'}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={(e) => setSearchTerm('')}
        searchTerm={searchTerm}
      />
      <div className={css.listWrapper}>
        <SidebarTreeList tree={filtered} useSerif={useSerif} />
      </div>
    </Sidebar>
  );
});

export const SidebarTableOfContents = memo(
  ({ items = [], title, show, useSerif, setShow }) => {
    const { currentHeading } = useContext(LayoutContext);
    return (
      <Sidebar title={title} show={show} setShow={setShow}>
        <div className={css.listWrapper}>
          <ul>
            {items.map((item, index) => {
              const isCurrent = currentHeading === item.url.replace('#', '');
              return (
                <li
                  key={`item-${index}`}
                  className={classnames(css.tocItem, {
                    [css.active]: isCurrent
                  })}>
                  <Link to={item.url}>
                    <h4>{item.title}</h4>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Sidebar>
    );
  }
);
