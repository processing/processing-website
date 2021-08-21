import React, { Fragment, memo } from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';
import classnames from 'classnames';

import { slugify } from '../../utils';

import * as css from './ReferenceList.module.css';
import * as grid from '../../styles/grid.module.css';

const ReferenceList = ({ tree, library }) => {
  const intl = useIntl();
  return (
    <>
      {Object.keys(tree).map((category) => (
        <Fragment key={`category-${category}`}>
          <h2
            className={classnames(grid.col, css.category)}
            id={slugify(category)}>
            {intl.formatMessage({
              id: `refCat${category.replace(/ /g, '')}`
            })}
          </h2>
          {Object.keys(tree[category]).map((subcategory) => {
            return (
              subcategory !== null && (
                <div
                  className={classnames(grid.col, grid.grid, css.subcategory)}
                  key={`subcategory-${subcategory}`}>
                  <div className={classnames(grid.col, css.subcategoryTitle)}>
                    {subcategory && <div className={css.line} />}
                    {subcategory && (
                      <h3 id={slugify(category, subcategory)}>
                        {intl.formatMessage({
                          id: `refSubcat${subcategory.replace(/ /g, '')}`
                        })}
                      </h3>
                    )}
                  </div>
                  <ul className={classnames(grid.col, css.subcategoryList)}>
                    {tree[category][subcategory].map((item) => (
                      <ReferenceItem item={item} key={`item-${item.slug}`} />
                    ))}
                  </ul>
                </div>
              )
            );
          })}
        </Fragment>
      ))}
    </>
  );
};

const ReferenceItem = memo(({ item }) => {
  return (
    <li className={classnames(grid.grid, css.item)}>
      <Link className={classnames(grid.col, css.itemName)} to={item.path}>
        {item.name}
      </Link>
      <div className={classnames(grid.col, css.itemBrief)}>
        <p
          dangerouslySetInnerHTML={{
            __html: item.brief
          }}
        />
      </div>
    </li>
  );
});

export default memo(ReferenceList);
