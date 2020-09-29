import React, { useState } from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import css from './SideExCategoryList.module.css';
import grid from '../styles/grid.module.css';

const SideExCategoryList = (props) => {
  const { category, categoryItems, subcategories } = props;
  const [expand, setExpand] = useState(false);
  const { locale } = useLocalization();

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div className={css.root}>
      <h3 onClick={toggleExpand}>{category}</h3>
      {expand ? (
        <ul>
          {subcategories.map((subcategory, key) => {
            let subcategoryItems = categoryItems.filter((item) => {
              return item.relativeDirectory.split('/')[1] === subcategory;
            });
            return (
              <div key={key + 'sub'} className={css.sub}>
                {subcategory ? (
                  <span onClick={toggleExpand} className={css.expand}>
                    {expand ? '-' : '+'}
                  </span>
                ) : (
                  ''
                )}
                <h4>{subcategory}</h4>
                {subcategory === '' ? (
                  <ul>
                    {subcategoryItems.map((node, key) => {
                      return (
                        <li key={key}>
                          <Link
                            to={node.childMdx.frontmatter.slug}
                            language={locale}>
                            <span>{node.childMdx.frontmatter.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  ''
                )}
              </div>
            );
          })}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default SideExCategoryList;
