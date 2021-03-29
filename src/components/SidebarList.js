import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import SidebarGroup from './SidebarGroup';

import grid from '../styles/grid.module.css';
import css from './SidebarList.module.css';

const SidebarList = ({ data, type, filtered }) => {
  const { locale } = useLocalization();

  return (
    <div className={css.root}>
      {data.map((category, key) => (
        <SidebarGroup
          label={category.name}
          key={`label-category-${key}`}
          filtered={filtered}>
          <ul>
            {category.children.map((subcategory, key) => (
              <SidebarGroup
                filtered={filtered}
                label={subcategory.name}
                key={`label-subcategory-${key}`}
                secondary>
                <ul>
                  {subcategory.children.map((item, key) => {
                    return (
                      <li key={key}>
                        <Link
                          className={classnames(grid.col1andhalf, {
                            [css.examples]: type === 'examples',
                          })}
                          to={`/${type}/${item.slug}.html`}
                          language={locale}>
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </SidebarGroup>
            ))}
          </ul>
        </SidebarGroup>
      ))}
    </div>
  );
};

export default SidebarList;
