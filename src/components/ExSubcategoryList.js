import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import Image from './Image';

import css from './ExSubcategoryList.module.css';
import grid from '../styles/grid.module.css';

const ExSubcategoryList = (props) => {
  const { subcategory, subcategoryRefs } = props;
  const { locale } = useLocalization();

  return (
    <div className={css.root}>
      <h3 className={grid.col1}>{subcategory}</h3>
      <ul className={classnames(grid.col6, grid.nest)}>
        {subcategoryRefs.map((node, key) => {
          return (
            <li key={key} className={grid.col1}>
              <Link to={node.childMdx.frontmatter.slug} language={locale}>
                {node.childMdx.frontmatter.img && <Image />}
                <h4>{node.childMdx.frontmatter.title}</h4>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExSubcategoryList;
