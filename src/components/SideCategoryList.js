import React, { useState } from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import css from './SideCategoryList.module.css';
import grid from '../styles/grid.module.css';

const SideCategoryList = (props) => {
  const { category, categoryItems, subcategories, link } = props;
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div className={css.root}>
      <h3
        onClick={toggleExpand}
        className={classnames({ [css.expanded]: expand })}>
        {category && category.replace(/_/g, ' ')}
      </h3>
      {expand ? (
        <ul>
          {subcategories.map((subcategory, key) => {
            let subcategoryItems = categoryItems.filter((item) => {
              return item.childJson.subcategory === subcategory;
            });

            return (
              subcategory !== null && (
                <div
                  key={key + 'sub'}
                  className={classnames(css.sub, {
                    [css.notSubcategory]: !subcategory,
                  })}>
                  {subcategory && (
                    <div
                      className={css.subcategoryLabel}
                      onClick={toggleExpand}>
                      <div className={css.expand}>
                        <span>{expand ? '−' : '+'}</span>
                      </div>
                      <h4>{subcategory.replace(/_/g, ' ')}</h4>
                    </div>
                  )}
                  {expand || subcategory === '' ? (
                    <ul>
                      {subcategoryItems.map((node, key) => {
                        return (
                          <li key={key}>
                            <Link
                              className={classnames(
                                grid.col1andhalf,
                                css.functionName
                              )}
                              to={link + node.name.split('.')[0] + '.html'}>
                              <span>{node.childJson.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    ''
                  )}
                </div>
              )
            );
          })}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default SideCategoryList;
