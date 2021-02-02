import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import grid from '../styles/grid.module.css';
import css from './ReferenceList.module.css';

const ReferenceList = ({ data, library }) => {
  const link = library
    ? '/reference/libraries/' + library + '/'
    : '/reference/';

  return (
    <div className={css.root}>
      {data.map((category, key) => (
        <div
          className={classnames(grid.nest, css.category)}
          key={`category-${key}`}>
          <h2 className={grid.col} id={category.name}>
            {category.name}
          </h2>
          <ul className={classnames(grid.col, grid.nest)}>
            {category.children.map((subcategory, key) => {
              return (
                subcategory !== null && (
                  <div className={css.subcategory} key={`subcategory-${key}`}>
                    {subcategory.name !== '' && (
                      <div className={css.verticalSeparator} />
                    )}
                    <h3>{subcategory.name}</h3>
                    <ul className={classnames(grid.col, grid.nest)}>
                      {subcategory.children.map((item, key) => {
                        return (
                          <li key={key} className={css.itemLine}>
                            <Link
                              className={classnames(grid.col, css.itemName)}
                              to={`${link + item.slug}.html`}>
                              <span>{item.name}</span>
                            </Link>
                            <div
                              className={classnames(grid.col, css.itemBrief)}>
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
        </div>
      ))}
    </div>
  );
};

export default ReferenceList;
