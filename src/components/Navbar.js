import React, { useMemo, useState, useEffect } from 'react';
import classnames from 'classnames';
import { useLocation } from '@reach/router';
import { LocalizedLink as Link, useLocalization } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';

import SearchBar from './SearchBar';

import css from './Navbar.module.css';
import grid from '../styles/grid.module.css';

import LogoProcessing from '../images/logo-processing.svg';
import CloseIcon from '../images/close-icon.svg';
import MenuIcon from '../images/menu-icon.svg';

//the name values are used to get the value from the intl files
//it is not the name that is displayed
export const items = [
  {
    name: 'home',
    href: '/'
  },
  {
    name: 'download',
    href: '/download'
  },
  {
    name: 'documentation',
    children: [
      { name: 'reference', href: '/reference' },
      { name: 'environment', href: '/environment' },
      { name: 'libraries', href: '/reference/libraries' },
      { name: 'tools', href: '/reference/tools' }
    ]
  },
  {
    name: 'learn',
    children: [
      { name: 'tutorials', href: '/tutorials' },
      { name: 'examples', href: '/examples' },
      { name: 'books', href: '/books' }
    ]
  },
  {
    name: 'teach',
    href: 'https://processingfoundation.org/education'
  },
  {
    name: 'about',
    children: [
      { name: 'overview', href: '/overview' },
      { name: 'people', href: '/people' }
    ]
  },
  {
    name: 'donate',
    href: '/donate'
  }
];

const Navbar = ({ siteTitle, scrolled }) => {
  const location = useLocation();
  const intl = useIntl();
  const [showSubmenu, setShowSubmenu] = useState(null);
  const { locale } = useLocalization();
  const [expanded, setExpanded] = useState(false);

  const current = useMemo(() => {
    const removeIndex = location.pathname.indexOf('/', 1);
    const currentLocation =
      locale === 'en'
        ? location.pathname
        : location.pathname.slice(removeIndex);
    for (var i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.href === currentLocation) {
        return item.name;
      } else if (
        item.children &&
        item.children.some((child) => child.href === currentLocation)
      ) {
        return item.name;
      }
    }
  }, [location, locale]);

  const onClick = (name) => {
    setShowSubmenu(name);
  };

  useEffect(() => {
    const onMouseDown = (e) => {
      if (e.target.nodeName.toLowerCase() !== 'button') {
        setShowSubmenu(null);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, []);

  return (
    <div
      className={classnames(
        css.root,
        { [css.scrolled]: scrolled },
        { [css.expanded]: expanded }
      )}>
      <div className={classnames(css.container, grid.container, grid.grid)}>
        <h1 className={classnames(grid.col, css.logo)}>
          <Link to="/">
            <LogoProcessing />
            {siteTitle}
          </Link>
        </h1>
        <div className={classnames(grid.col, css.menuWrapper)}>
          <button
            className={css.menuToggle}
            aria-label="Main menu"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}>
            {expanded ? <CloseIcon /> : <MenuIcon />}
          </button>
          <ul
            className={classnames(css.menu, {
              [css.expanded]: expanded
            })}>
            {items.map((item, key) => (
              <li
                key={key}
                className={classnames(css.item, {
                  [css.hasSubmenu]: item.children,
                  [css.active]: item.name === current
                })}>
                {item.href ? (
                  item.href.startsWith('https') ? (
                    <a target="_blank" rel="noreferrer" href={item.href}>
                      {intl.formatMessage({ id: item.name })}
                    </a>
                  ) : (
                    <Link to={item.href}>
                      {intl.formatMessage({ id: item.name })}
                    </Link>
                  )
                ) : (
                  <button onClick={() => onClick(item.name)}>
                    {intl.formatMessage({ id: item.name })}
                  </button>
                )}
                {item.children && (
                  <ul
                    className={classnames(css.submenu, {
                      [css.subMenuActive]: item.name === showSubmenu
                    })}>
                    {item.children.map((subitem, j) => (
                      <li className={css.subitem} key={key + j}>
                        {subitem.href ? (
                          subitem.href.startsWith('https') ? (
                            <a
                              href={subitem.href}
                              target="_blank"
                              rel="noreferrer"
                              tabIndex={item.name === showSubmenu ? 0 : -1}>
                              {intl.formatMessage({ id: subitem.name })}
                            </a>
                          ) : (
                            <Link
                              to={subitem.href}
                              language={locale}
                              tabIndex={item.name === showSubmenu ? 0 : -1}>
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
        </div>
        <div className={css.spacer} />
        <SearchBar className={css.searchBar} />
      </div>
    </div>
  );
};

export default Navbar;
