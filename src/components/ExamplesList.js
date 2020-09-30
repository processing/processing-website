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
          className={classnames(grid.col8, grid.nest)}
          key={`category-${key}`}>
          <h2>{category.name}</h2>
          <p>Lorem ipsum</p>
          <ul>
            {category.children.map((subcategory, key) => (
              <div key={`subcategory-${key}`} className={css.sub}>
                <h3 className={grid.col1}>{subcategory.name}</h3>
                <ul className={classnames(grid.col6, grid.nest)}>
                  {subcategory.children.map((node, key) => (
                    <li key={`item-${key}`} className={grid.col1}>
                      <Link to={node.slug} language={locale}>
                        {node.img && <Image />}
                        <h4>{node.title}</h4>
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
