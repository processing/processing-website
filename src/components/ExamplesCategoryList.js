import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import Image from './Image';

import css from './ExamplesCategoryList.module.css';
import grid from '../styles/grid.module.css';

const ExamplesCategoryList = (props) => {
  const { category, categoryItems, subcategories } = props;
  const { locale } = useLocalization();

  return (
    <div className={classnames(css.root)}>
      <h2>{category}</h2>
      <p>Lorem ipsum</p>
      <ul>
        {subcategories.map((subcategory, key) => {
          let subcategoryItems = categoryItems.filter(
            (item) => item.relativeDirectory.split('/')[1] === subcategory
          );
          return (
            <div key={key + 'sub'} className={css.sub}>
              <h3 className={grid.col1}>{subcategory}</h3>
              <ul className={classnames(grid.col6, grid.nest)}>
                {subcategoryItems.map((node, key) => {
                  return (
                    <li key={key} className={grid.col1}>
                      <Link
                        to={node.childMdx.frontmatter.slug}
                        language={locale}>
                        {node.childMdx.frontmatter.img && <Image />}
                        <h4>{node.childMdx.frontmatter.title}</h4>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ExamplesCategoryList;
