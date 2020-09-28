import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import css from './SubcategoryList.module.css';
import grid from '../styles/grid.module.css';

const SubcategoryList = (props) => {
  const { subcategory, subcategoryRefs, link } = props;

  return (
    <div className={css.root}>
      <div className={grid.col1andhalf}>
        <h3>{subcategory && subcategory.replace(/_/g, ' ')}</h3>
      </div>
      <ul className={classnames(grid.col6andhalf, grid.nest)}>
        {subcategoryRefs.map((node, key) => {
          return (
            <li key={key} className={css.subgrid}>
              <Link
                className={classnames(grid.col1andhalf, css.functionName)}
                to={link + node.name.split('.')[0] + '.html'}>
                <span>{node.childJson.name}</span>
              </Link>
              <div className={grid.col5}>
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
