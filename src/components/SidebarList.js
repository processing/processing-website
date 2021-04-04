import React, { memo } from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import SidebarLabel from './SidebarLabel';

import grid from '../styles/grid.module.css';
import css from './SidebarList.module.css';

const SidebarList = ({ tree, type, show }) => {
  const { locale } = useLocalization();

  const categoryEls = [];
  for (const category in tree) {
    const subCategoryEls = [];
    for (const subCategory in tree[category]) {
      const nodes = tree[category][subCategory];
      const els = [];
      for (let k = 0; k < nodes.length; k++) {
        els.push(
          <SidebarItem
            item={nodes[k]}
            type={type}
            locale={locale}
            key={`item-${nodes[k].name}`}
          />
        );
      }
      subCategoryEls.push(
        <SidebarLabel
          label={subCategory}
          key={`label-subcategory-${subCategory}`}
          secondary>
          <ul>{els}</ul>
        </SidebarLabel>
      );
    }
    categoryEls.push(
      <SidebarLabel label={category} key={`label-category-${category}`}>
        <ul>{subCategoryEls}</ul>
      </SidebarLabel>
    );
  }

  return <div className={css.root}>{categoryEls}</div>;
};

const SidebarItem = memo(({ item, type, locale }) => {
  return (
    <li>
      <Link
        className={classnames(grid.col1andhalf, {
          [css.examples]: type === 'examples',
        })}
        to={item.path}
        language={locale}>
        <span>{item.name}</span>
      </Link>
    </li>
  );
});

export default memo(SidebarList);
