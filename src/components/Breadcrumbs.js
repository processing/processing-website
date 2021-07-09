import React, { memo } from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import classnames from 'classnames';

import { titleCase } from '../utils';

import * as css from './Breadcrumbs.module.css';

export const Breadcrumbs = ({ className, trail }) => {
  if (!trail || trail.length === 0) {
    return null;
  }
  return (
    <div className={classnames(css.root, className)}>
      {trail.map((item, i) => {
        const isString = typeof item === 'string';
        return (
          <span key={`bc-${i}`}>
            {isString ? (
              item
            ) : (
              <Link to={item.slug}>{titleCase(item.label)}</Link>
            )}
            {i < trail.length - 1 && <span className={css.sep}>&#8594;</span>}
          </span>
        );
      })}
    </div>
  );
};

export default memo(Breadcrumbs);
