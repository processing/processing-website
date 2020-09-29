import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import CategoryList from './CategoryList';
import SideCategoryList from './SideCategoryList';

import grid from '../styles/grid.module.css';
import css from './ReferenceList.module.css';

const ReferenceList = (props) => {
  const { data, library, sidebar } = props;
  let link;
  if (library === 'processing') {
    link = '/reference/';
  } else {
    link = '/reference/libraries/' + library + '/';
  }

  return (
    <div className={css.root}>
      {data.map((category, key) => (
        <div className={classnames(grid.nest, css.category)}>
          <h2 className={classnames(grid.col8)}>{category.name}</h2>
          <ul className={classnames(grid.col8, grid.nest)}>
            <div className={css.verticalSeparator} />
            {category.children.map((subcategory, key) => {
              return (
                subcategory !== null && (
                  <div className={css.subcategory} key={`subcategory-${key}`}>
                    <div className={grid.col1andhalf}>
                      <h3>{subcategory.name}</h3>
                    </div>
                    <ul className={classnames(grid.col6andhalf, grid.nest)}>
                      {subcategory.children.map((item, key) => {
                        return (
                          <li key={key} className={css.subgrid}>
                            <Link
                              className={classnames(
                                grid.col1,
                                css.functionName
                              )}
                              to={link + item.slug + '.html'}>
                              <span>{item.name}</span>
                            </Link>
                            <div className={grid.col5andhalf}>
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
