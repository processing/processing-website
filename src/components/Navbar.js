import React, { useMemo } from 'react';
import classnames from 'classnames';

import SearchBarSmall from './SearchBarSmall';
import { useLocation } from '@reach/router';

import { LocalizedLink as Link, useLocalization } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';

import css from './Navbar.module.css';
import grid from '../styles/grid.module.css';

import LogoProcessing from '../images/logo-processing.svg';

//the name values are used to get the value from the intl files
//it is not the name that is displayed
export const items = [
  {
    name: 'download',
    href: '/download',
  },
  {
    name: 'documentation',
    children: [
      { name: 'reference', href: '/reference' },
      { name: 'environment', href: '/environment' },
      { name: 'libraries', href: '/reference/libraries' },
      { name: 'tools', href: '/reference/tools' },
    ],
  },
  {
    name: 'learn',
    children: [
      { name: 'tutorials', href: '/tutorials' },
      { name: 'examples', href: '/examples' },
      { name: 'books', href: '/books' },
    ],
  },
  {
    name: 'teach',
    href: 'https://processingfoundation.org/education',
  },
  {
    name: 'about',
    href: '/about',
  },
  {
    name: 'donate',
    href: 'https://processingfoundation.org/donate',
  },
];

const Navbar = ({ siteTitle, show }) => {
  const location = useLocation();
  const intl = useIntl();

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
        <Link to="/">
          <LogoProcessing />
          {siteTitle}
        </Link>
      </h1>
      <ul className={classnames(css.menu, grid.col4)}>
        {items.map((item, key) => (
          <li
            key={key}
            className={classnames(css.item, {
              [css.hasSubmenu]: item.children,
              [css.active]: item.name === current,
            })}>
            {item.href ? (
              item.href.startsWith('https') ? (
                <a href={item.href}>{intl.formatMessage({ id: item.name })}</a>
              ) : (
                <Link to={item.href}>
                  {intl.formatMessage({ id: item.name })}
                </Link>
              )
            ) : (
              intl.formatMessage({ id: item.name })
            )}
            {item.children && (
              <ul className={css.submenu}>
                {item.children.map((subitem, j) => (
                  <li className={css.subitem} key={key + j}>
                    {subitem.href ? (
                      subitem.href.startsWith('https') ? (
                        <a href={subitem.href} target="_blank" rel="noreferrer">
                          {intl.formatMessage({ id: subitem.name })}
                        </a>
                      ) : (
                        <Link to={subitem.href} language={locale}>
                          {intl.formatMessage({ id: subitem.name })}
                        </Link>
                      )
                    ) : (
                      intl.formatMessage({ id: subitem.name })
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
