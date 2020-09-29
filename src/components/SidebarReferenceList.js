import React, { useState } from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import SidebarLabel from './SidebarLabel';

import grid from '../styles/grid.module.css';
import css from './SidebarReferenceList.module.css';

const SidebarReferenceList = (props) => {
  const { data, library, sidebar } = props;
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div className={css.root}>
      {data.map((category, key) => (
        <SidebarLabel label={category.name} key={`label-cat-${key}`}>
          <ul>
            {category.children.map((subcategory, key) => (
              <SidebarLabel
                label={subcategory.name}
                key={`label-subcat-${key}`}
                secondary>
                <ul>
                  {subcategory.children.map((item, key) => {
                    return (
                      <li key={key}>
                        <Link
                          className={classnames(
                            grid.col1andhalf,
                            css.functionName
                          )}
                          to={`/reference/${item.slug}.html`}>
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

export default SidebarReferenceList;
