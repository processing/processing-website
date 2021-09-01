import React from 'react';
import { Link } from 'gatsby';
import { useIntl } from 'react-intl';
import classnames from 'classnames';

import { slugify, toIntlId } from '../utils';

import * as css from './Shortcuts.module.css';
import * as grid from '../styles/grid.module.css';

const Shortcuts = ({ categories }) => {
  const intl = useIntl();
  return (
    <div className={classnames(grid.col, grid.grid, css.root)}>
      <h4 className={classnames(grid.col, css.heading)}>Shortcuts</h4>
      <ul className={classnames(grid.col, grid.grid, css.list)}>
        {categories.map((category, key) => (
          <li
            className={classnames(grid.col, css.item)}
            key={`category-navitem-${key}`}>
            <div className={css.line} />
            <Link className={css.itemLink} to={`#${slugify(category)}`}>
              {intl.formatMessage({
                id: `refCat${toIntlId(category)}`,
                defaultMessage: category
              })}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shortcuts;
