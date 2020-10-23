import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import SidebarLabel from './SidebarLabel';

import grid from '../styles/grid.module.css';
import css from './SidebarList.module.css';

const SidebarList = ({ data, type }) => {
  const { locale } = useLocalization();

  return (
    <div className={css.root}>
      {data.map((category, key) => (
        <SidebarLabel label={category.name} key={`label-category-${key}`}>
          <ul>
            {category.children.map((subcategory, key) => (
              <SidebarLabel
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
              </SidebarLabel>
            ))}
          </ul>
        </SidebarLabel>
      ))}
    </div>
  );
};

export default SidebarList;
