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
        <ul
          className={classnames(grid.nest, css.category)}
          key={`category-${key}`}>
          <h2
            className={classnames(css.categoryName, grid.col)}
            id={category.name}>
            {category.name}
          </h2>
          <ul className={classnames(grid.col, grid.nest)}>
            {category.children.map((subcategory, key) => {
              return (
                subcategory !== null && (
                  <div className={css.subcategory} key={`subcategory-${key}`}>
                    <div className={classnames(css.subcategoryTitle, grid.col)}>
                      {subcategory.name && <div className={css.line} />}
                      {subcategory.name && <h3>{subcategory.name}</h3>}
                    </div>
                    <div className={classnames(css.subcategoryList, grid.col)}>
                      <div className={css.line} />
                      <ul className={classnames(grid.col, grid.nest)}>
                        {subcategory.children.map((item, key) => {
                          return (
                            <li key={key} className={css.item}>
                              <Link
                                className={classnames(grid.col, css.itemName)}
                                to={`${link + item.slug}.html`}>
                                {item.name}
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
