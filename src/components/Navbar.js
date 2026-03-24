import React, { useMemo, useState, useEffect } from 'react';
import classnames from 'classnames';
import { useLocation } from '@reach/router';
import { LocalizedLink as Link, useLocalization } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';

import SearchBar from './SearchBar';

import * as css from './Navbar.module.css';
import * as grid from '../styles/grid.module.css';

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
      { name: 'tools', href: '/reference/tools' },
      { name: 'wiki', href: 'https://wiki.processing.org' }
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
    name: 'forum',
    href: 'https://discourse.processing.org'
  },
  {
    name: 'about',
    children: [
      { name: 'overview', href: '/overview' },
      { name: 'people', href: '/people' },
      { name: 'privacy', href: '/privacy' }
    ]
  },
  {
    name: 'donate',
    href: '/donate',
    class: css.donate,
    icon() {
      return (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.56836 7.45131C1.56838 6.57849 1.83315 5.72621 2.32771 5.00703C2.82227 4.28786 3.52335 3.73561 4.33835 3.42324C5.15335 3.11087 6.04394 3.05307 6.89249 3.25746C7.74103 3.46186 8.50761 3.91885 9.09099 4.56807C9.13208 4.612 9.18175 4.64703 9.23694 4.67097C9.29212 4.69492 9.35163 4.70727 9.41178 4.70727C9.47194 4.70727 9.53145 4.69492 9.58663 4.67097C9.64182 4.64703 9.69149 4.612 9.73258 4.56807C10.3141 3.91463 11.0809 3.4538 11.9308 3.24692C12.7807 3.04004 13.6735 3.09691 14.4903 3.40997C15.3071 3.72303 16.0092 4.27743 16.5031 4.99938C16.997 5.72133 17.2594 6.57658 17.2552 7.45131C17.2552 9.24745 16.0787 10.5887 14.9022 11.7652L10.5946 15.9324C10.4484 16.1003 10.2682 16.2351 10.066 16.328C9.86369 16.4208 9.64398 16.4696 9.42142 16.471C9.19886 16.4724 8.97855 16.4264 8.77512 16.3361C8.57169 16.2458 8.38981 16.1133 8.24155 15.9473L3.92139 11.7652C2.74487 10.5887 1.56836 9.2553 1.56836 7.45131Z" stroke="white" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      )
    }
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
              <a
                key={key}
                className={classnames(css.item, {
                  [css.hasSubmenu]: item.children,
                  [css.active]: item.name === current
                }, item.class)}
                href={item.href}
              >
                {item.icon && item.icon()}
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
                  <ul className={css.submenu}>
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
              </a>
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
