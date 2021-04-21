import React, { memo } from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import grid from '../styles/grid.module.css';
import css from './ReferenceList.module.css';

const ReferenceList = ({ tree, library }) => {
  return (
    <div className={css.root}>
      {Object.keys(tree).map((category) => (
        <div
          className={classnames(grid.nest, css.category)}
          key={`category-${category}`}>
          <h2 className={classnames(css.categoryName, grid.col)} id={category}>
            {category}
          </h2>
          <div className={classnames(grid.col, grid.nest)}>
            {Object.keys(tree[category]).map((subcategory) => {
              return (
                subcategory !== null && (
                  <div
                    className={css.subcategory}
                    key={`subcategory-${subcategory}`}>
                    <div className={classnames(css.subcategoryTitle, grid.col)}>
                      {subcategory && <div className={css.line} />}
                      {subcategory && <h3>{subcategory}</h3>}
                    </div>
                    <div className={classnames(css.subcategoryList, grid.col)}>
                      <div className={css.line} />
                      <ul className={classnames(grid.col, grid.nest)}>
                        {tree[category][subcategory].map((item) => (
                          <ReferenceItem
                            item={item}
                            key={`item-${item.slug}`}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const ReferenceItem = memo(({ item }) => {
  return (
    <li className={css.item}>
      <Link className={classnames(grid.col, css.itemName)} to={item.path}>
        {item.name}
      </Link>
      <div className={classnames(grid.col, css.itemBrief)}>
        <p
          dangerouslySetInnerHTML={{
            __html: item.brief,
          }}
        />
      </div>
    </li>
  );
});

export default memo(ReferenceList);
