import { Link } from 'gatsby';
import React from 'react';
import classnames from 'classnames';

import SearchBar from './SearchBar';

import grid from '../styles/grid.module.css';
import css from './Navbar.module.css';

export const items = [
  {
    name: 'Download',
    link: '',
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
    link: '',
  },
  {
    name: 'About',
    link: '',
  },
  {
    name: 'Donate',
    link: '',
  },
];

const Navbar = ({ siteTitle }) => {
  return (
    <div className={classnames(css.root, grid.grid)}>
      <h1 className={grid.col2}>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <ul className={(css.menu, grid.col4)}>
        {items.map((item, key) => (
          <li key={key} className={classnames(css.item, {[css.hasSubmenu]: item.children,})}>
            {item.link ? <Link to={item.link}>{item.name}</Link> : item.name}
            {item.children && (
              <ul className={css.submenu}>
                {item.children.map((subitem, j) => (
                  <li className={css.item} key={key + j}>
                    {subitem.link ? <Link to={subitem.link}>{subitem.name}</Link> : subitem.name}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <SearchBar />
    </div>
  );
};

export default Navbar;
