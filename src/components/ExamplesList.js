import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import Image from './Image';

import css from './ExamplesList.module.css';
import grid from '../styles/grid.module.css';

const ExamplesList = ({ data }) => {
  const { locale } = useLocalization();

  return (
    <div className={classnames(css.root)}>
      {data.map((category, key) => (
        <ul
          className={classnames(grid.nest, css.category)}
          key={`category-${key}`}>
          <h2 className={grid.col8}>{category.name}</h2>
          <p className={classnames(grid.col4, grid.pull4)}>Lorem ipsum</p>
          <ul className={classnames(grid.col8, grid.nest)}>
            {category.children.map((subcategory, key) => (
              <div key={`subcategory-${key}`} className={css.subcategory}>
                <h3 className={grid.col1}>{subcategory.name}</h3>
                <ul className={classnames(grid.col6, grid.nest)}>
                  {subcategory.children.map((node, key) => (
                    <li key={`item-${key}`} className={grid.col1}>
                      <Link to={`${node.slug}.html`} language={locale}>
                        {node.img && <Image />}
                        <h4>{node.name}</h4>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </ul>
      ))}
    </div>
  );
};

export default ExamplesList;
