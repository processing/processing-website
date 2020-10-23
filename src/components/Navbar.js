import React, { useMemo } from 'react';
import classnames from 'classnames';

import SearchBarSmall from './SearchBarSmall';
import { useLocation } from '@reach/router';

import { LocalizedLink as Link, useLocalization } from 'gatsby-theme-i18n';

import css from './Navbar.module.css';
import grid from '../styles/grid.module.css';

export const items = [
  {
    name: 'Download',
    href: '/download',
  },
  {
    name: 'Documentation',
    children: [
      { name: 'Reference', href: '/reference' },
      { name: 'Environment', href: '/environment' },
      { name: 'Libraries', href: '/reference/libraries' },
      { name: 'Tools', href: '/tools' },
    ],
  },
  {
    name: 'Learn',
    children: [
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Examples', href: '/examples' },
      { name: 'Books', href: '/books' },
    ],
  },
  {
    name: 'Teach',
    href: '/education',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Donate',
    href: '/donate',
  },
];

const Navbar = ({ siteTitle, show }) => {
  const location = useLocation();

  const { locale } = useLocalization();
  const current = useMemo(() => {
    for (var i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.href === location.pathname) {
        return item.name;
      } else if (
        item.children &&
        item.children.some((child) => child.href === location.pathname)
      ) {
        return item.name;
      }
    }
  }, [location]);

  return (
    <div
      className={classnames(
        css.root,
        grid.grid,
        { [css.show]: show },
        { [css.noshow]: !show }
      )}>
      <h1 className={classnames(grid.col2, css.logo)}>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <ul className={classnames(css.menu, grid.col4)}>
        {items.map((item, key) => (
          <li
            key={key}
            className={classnames(css.item, {
              [css.hasSubmenu]: item.children,
              [css.active]: item.name === current,
            })}>
            {item.href ? <Link to={item.href}>{item.name}</Link> : item.name}
            {item.children && (
              <ul className={css.submenu}>
                {item.children.map((subitem, j) => (
                  <li className={css.subitem} key={key + j}>
                    {subitem.href ? (
                      <Link to={subitem.href} language={locale}>
                        {subitem.name}
                      </Link>
                    ) : (
                      subitem.name
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <SearchBarSmall />
    </div>
  );
};

export default Navbar;
