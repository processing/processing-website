import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';

import { toIntlId } from '../utils';
import SidebarGroup from './SidebarGroup';

import * as css from './SidebarTreeList.module.css';

const SidebarTreeList = ({ tree, useSerif }) => {
  const intl = useIntl();
  return (
    <div className={css.root}>
      {Object.keys(tree).map((category) => (
        <SidebarGroup
          label={intl.formatMessage({
            id: `refCat${toIntlId(category)}`,
            defaultMessage: category
          })}
          key={`label-category-${category}`}>
          {Object.keys(tree[category]).map((subcategory) => (
            <SidebarGroup
              label={
                subcategory
                  ? intl.formatMessage({
                      id: `refSubcat${toIntlId(subcategory)}`,
                      defaultMessage: subcategory
                    })
                  : ''
              }
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
