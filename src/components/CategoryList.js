import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import css from './CategoryList.module.css';
import grid from '../styles/grid.module.css';

const CategoryList = (props) => {
  const { category, categoryItems, subcategories, link } = props;
  return (
    <div className={classnames(grid.nest, css.root)}>
      <h2 className={classnames(grid.col8)}>
        {category && category.replace(/_/g, ' ')}
      </h2>
      <ul className={classnames(grid.col8, grid.nest)}>
        <div className={css.verticalSeparator} />
        {subcategories.map((subcategory, key) => {
          let subcategoryItems = categoryItems.filter(
            (item) => item.childJson.subcategory === subcategory
          );

          return (
            subcategory !== null && (
              <div className={css.subcategory} key={key + 'sub'}>
                <div className={grid.col1andhalf}>
                  <h3>{subcategory && subcategory.replace(/_/g, ' ')}</h3>
                </div>
                <ul className={classnames(grid.col6andhalf, grid.nest)}>
                  {subcategoryItems.map((node, key) => {
                    return (
                      <li key={key} className={css.subgrid}>
                        <Link
                          className={classnames(grid.col1, css.functionName)}
                          to={link + node.name.split('.')[0] + '.html'}>
                          <span>{node.childJson.name}</span>
                        </Link>
                        <div className={grid.col5andhalf}>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: node.childJson.brief,
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
  );
};

export default CategoryList;
