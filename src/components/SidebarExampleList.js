import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import SidebarLabel from './SidebarLabel';

import css from './SidebarExampleList.module.css';

const SidebarExampleList = ({ data }) => {
  const { locale } = useLocalization();
  return (
    <div className={css.root}>
      {data.map((category, key) => (
        <SidebarLabel
          label={category.name}
          key={`example-label-category-${key}`}>
          <ul>
            {category.children.map((subcategory, key) => (
              <SidebarLabel
                label={subcategory.name}
                secondary
                key={`example-label-subcategory-${key}`}>
                <ul>
                  {subcategory.children.map((node, key) => {
                    return (
                      <li key={key}>
                        <Link
                          to={`/examples/${node.slug}.html`}
                          language={locale}>
                          <span>{node.name}</span>
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

export default SidebarExampleList;
