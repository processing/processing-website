import React, { Fragment, memo } from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import css from './ReferenceList.module.css';

const ReferenceList = ({ tree, library }) => {
  return (
    <>
      {Object.keys(tree).map((category) => (
        <Fragment key={`category-${category}`}>
          <h2 className={css.category} id={category}>
            {category}
          </h2>
          {Object.keys(tree[category]).map((subcategory) => {
            return (
              subcategory !== null && (
                <div
                  className={css.subcategory}
                  key={`subcategory-${subcategory}`}>
                  <div className={css.subcategoryTitle}>
                    {subcategory && <div className={css.line} />}
                    {subcategory && <h3>{subcategory}</h3>}
                  </div>
                  <ul className={css.subcategoryList}>
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
    <li className={css.item}>
      <Link className={css.itemName} to={item.path}>
        {item.name}
      </Link>
      <div className={css.itemBrief}>
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
