import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import css from './SubcategoryList.module.css';
import grid from '../styles/grid.module.css';

const SubcategoryList = (props) => {
  const { subcategory, subcategoryRefs, link } = props;

  return (
    <div className={css.root}>
      <h3 className={grid.col1}>
        {subcategory && subcategory.replace(/_/g, ' ')}
      </h3>
      <ul className={classnames(grid.col7, grid.internal)}>
        {subcategoryRefs.map((node, key) => {
          return (
            <li key={key} className={css.subgrid}>
              <Link
                className={classnames(grid.col1andhalf, css.functionName)}
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
  );
};

export default SubcategoryList;
