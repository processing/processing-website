import React, { useMemo, useState, useEffect, createContext, useContext } from 'react';
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

const NavbarItemContext = createContext();

function NavbarItems() {

  return items.map((item, key) => (
    <NavbarItemContext.Provider value={item} key={key}>
      <NavbarItem item={item} />
    </NavbarItemContext.Provider>
  ))
}

function NavbarItem() {
  const { children, icon, name, ...item } = useContext(NavbarItemContext);

  const className = classnames({
    [css.item]: true,
    [css.hasSubmenu]: children,
    [item.class]: true
  })


  return (
    <li className={className}>
      <NavbarElement>
        {icon && icon()}
      </NavbarElement>
      <NavbarItemChildren />
    </li>
  )
}

function NavbarElement({ children: content }) {
  const intl = useIntl();
  const { href, name, children } = useContext(NavbarItemContext);
  const location = useLocation();
  const isCurrent = location.pathname.startsWith(href);
  const isCurrentCategory = children?.some(child => location.pathname.startsWith(child.href));

  const classes = classnames({
    [css.link]: true,
    [css.active]: isCurrent || isCurrentCategory
  })

  return (
    <Link to={href} className={classes}>
      {content}
      {intl.formatMessage({ id: name })}
    </Link>
  )
}

function NavbarItemChildren() {
  const { children } = useContext(NavbarItemContext);

  if (!children) {
    return null;
  }

  return (
    <ul className={css.submenu}>
      {children.map((subitem, j) => (
        <li className={css.subitem} key={j}>
          <NavbarItemContext.Provider value={subitem}>
            <NavbarElement />
          </NavbarItemContext.Provider>
        </li>
      ))}
    </ul>
  )
}

const Navbar = ({ siteTitle, scrolled }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={classnames(
        {
          [css.root]: true,
          [css.scrolled]: scrolled,
          [css.expanded]: expanded
        }
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
            className={classnames({
              [css.menu]: true,
              [css.expanded]: expanded
            })}>
            <NavbarItems />
          </ul>
        </div>
        <div className={css.spacer} />
        <SearchBar className={css.searchBar} />
      </div>
    </div>
  );
};

export default Navbar;
