import React, { useState } from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import SearchBar from './SearchBar';
import { NavbarItems } from './NavbarItems';

import * as css from './Navbar.module.css';
import * as grid from '../styles/grid.module.css';

import LogoProcessing from '../images/logo-processing.svg';
import CloseIcon from '../images/close-icon.svg';
import MenuIcon from '../images/menu-icon.svg';

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
