import React, { useRef } from 'react';
import classnames from 'classnames';

import SearchBarSmall from './SearchBarSmall';
import { Location } from '@reach/router';

import { LocalizedLink as Link, useLocalization } from 'gatsby-theme-i18n';

import css from './Navbar.module.css';
import grid from '../styles/grid.module.css';

export const items = [
  {
    name: 'Download',
    link: '/download',
  },
  {
    name: 'Documentation',
    children: [
      { name: 'Reference', link: '/reference' },
      { name: 'Environment', link: '/environment' },
      { name: 'Libraries', link: '/reference/libraries' },
      { name: 'Tools', link: '/tools' },
    ],
  },
  {
    name: 'Learn',
    children: [
      { name: 'Tutorials', link: '/tutorials' },
      { name: 'Examples', link: '/examples' },
      { name: 'Books', link: '/books' },
    ],
  },
  {
    name: 'Teach',
    link: '/education',
  },
  {
    name: 'About',
    link: '/about',
  },
  {
    name: 'Donate',
    link: '/donate',
  },
];

const Navbar = ({ siteTitle, ref, show, menuItem}) => {
  const navRef = useRef(null);
  const { locale } = useLocalization();

  return (
    <div
      className={classnames(
        css.root,
        grid.grid,
        { [css.show]: show },
        { [css.noshow]: !show }
      )}
      ref={ref}>
      <h1 className={classnames(grid.col2, css.logo)}>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <ul className={classnames(css.menu, grid.col4)}>
        {items.map((item, key) => (
          <li
            key={key}
            className={classnames(css.item, {
              [css.hasSubmenu]: item.children,
              [css.active]: item.name === menuItem,
            })}>
            {item.link ? <Link to={item.link}>{item.name}</Link> : item.name}
            {item.children && (
              <ul className={css.submenu}>
                {item.children.map((subitem, j) => (
                  <li className={css.subitem} key={key + j}>
                    {subitem.link ? (
                      <Link to={subitem.link} language={locale}>
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
