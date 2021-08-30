import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import SidebarGroup from './SidebarGroup';

import * as css from './SidebarTreeList.module.css';

const SidebarTreeList = ({ tree, useSerif }) => {
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
                        className={classnames({
                          [css.serif]: useSerif
                        })}
                        to={item.path}>
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
