import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import css from './SubcategoryList.module.css';
import grid from '../styles/grid.module.css';

const SubcategoryList = (props) => {
  const { subcategory, subcategoryRefs, link } = props;
  const { locale } = useLocalization();

  return (
    <div className={css.root}>
      <h3 className={grid.col1}>{subcategory}</h3>
      <ul>
        {subcategoryRefs.map((node, key) => {
          return (
            <li key={key}>
              <Link to={link + node.name.split('.')[0] + '.html'}>
                <span className={grid.col1andhalf}>{node.childJson.name}</span>
              </Link>
              <p className={grid.col5}>Description</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SubcategoryList;
