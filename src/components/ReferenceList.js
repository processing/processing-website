import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import grid from '../styles/grid.module.css';
import css from './ReferenceList.module.css';

const ReferenceList = ({ data, library }) => {
  const link = library ? '../' : '/reference/';

  return (
    <div className={css.root}>
      {data.map((category, key) => (
        <ul
          className={classnames(grid.nest, css.category)}
          key={`category-${key}`}>
          <h2 className={classnames(grid.col8)}>{category.name}</h2>
          <ul className={classnames(grid.col8, grid.nest)}>
            {category.children.map((subcategory, key) => {
              return (
                subcategory !== null && (
                  <div className={css.subcategory} key={`subcategory-${key}`}>
                    {subcategory.name !== '' && (
                      <div className={css.verticalSeparator} />
                    )}
                    <div className={grid.col1andhalf}>
                      <h3>{subcategory.name}</h3>
                    </div>
                    <ul className={classnames(grid.col6andhalf, grid.nest)}>
                      {subcategory.children.map((item, key) => {
                        return (
                          <li key={key} className={css.itemLine}>
                            <Link
                              className={classnames(
                                grid.col1andhalf,
                                css.itemName
                              )}
                              to={`${link + item.slug}.html`}>
                              <span>{item.name}</span>
                            </Link>
                            <div className={grid.col5}>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: item.brief,
                                }}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )
              );
            })}
          </ul>
        </ul>
      ))}
    </div>
  );
};

export default ReferenceList;
