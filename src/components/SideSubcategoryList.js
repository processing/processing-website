import React, { useState } from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import css from './SideSubcategoryList.module.css';
import grid from '../styles/grid.module.css';

const SideSubcategoryList = (props) => {
  const { subcategory, subcategoryRefs, link } = props;
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand(!expand);
  };

  return (
    <div
      className={classnames(css.root, { [css.notSubcategory]: !subcategory })}>
      {subcategory && (
        <div className={css.subcategoryLabel} onClick={toggleExpand}>
          <div className={css.expand}>
            <span>{expand ? '−' : '+'}</span>
          </div>
          <h4>{subcategory.replace(/_/g, ' ')}</h4>
        </div>
      )}
      {expand || subcategory === '' ? (
        <ul>
          {subcategoryRefs.map((node, key) => {
            return (
              <li key={key}>
                <Link
                  className={classnames(grid.col1andhalf, css.functionName)}
                  to={link + node.name.split('.')[0] + '.html'}>
                  <span>{node.childJson.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
};

export default SideSubcategoryList;
