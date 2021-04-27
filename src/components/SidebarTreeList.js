import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import SidebarGroup from './SidebarGroup';

import grid from '../styles/grid.module.css';
import css from './SidebarTreeList.module.css';

const SidebarTreeList = ({ tree, useSerif }) => {
  const { locale } = useLocalization();
  return (
    <div className={css.root}>
      {Object.keys(tree).map((category) => (
        <SidebarGroup label={category} key={`label-category-${category}`}>
          {Object.keys(tree[category]).map((subcategory) => (
            <SidebarGroup
              label={subcategory}
              key={`label-subcategory-${subcategory}`}
              secondary>
              <ul>
                {tree[category][subcategory].map((item, key) => {
                  return (
                    <li key={key}>
                      <Link
                        className={classnames(grid.col1andhalf, {
                          [css.serif]: useSerif
                        })}
                        to={item.path}
                        language={locale}>
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SidebarGroup>
          ))}
        </SidebarGroup>
      ))}
    </div>
  );
};

export default SidebarTreeList;
