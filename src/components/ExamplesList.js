import React from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link, useLocalization } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';
import { examplePath } from '../utils/paths';
import Img from 'gatsby-image';

import css from './ExamplesList.module.css';
import grid from '../styles/grid.module.css';

const ExamplesList = ({ data }) => {
  const { locale } = useLocalization();
  const intl = useIntl();

  return (
    <div className={classnames(css.root)}>
      {data.map((category, key) => (
        <div
          className={classnames(grid.nest, css.category)}
          key={`category-${key}`}>
          <h2 className={grid.col}>{category.name}</h2>
          <p className={classnames(grid.col, css.intro)}>
            {category === 'topic'
              ? intl.formatMessage({ id: 'topicExamples' })
              : intl.formatMessage({ id: 'basicExamples' })}
          </p>
          <ul className={classnames(grid.col, grid.nest)}>
            {category.children.map((subcategory, key) => (
              <div key={`subcategory-${key}`} className={css.subcategory}>
                <h3 className={grid.col}>{subcategory.name}</h3>
                <ul className={classnames(grid.col, grid.nest)}>
                  {subcategory.children.map((node, key) => (
                    <li key={`item-${key}`} className={grid.col}>
                      <Link to={examplePath(node.slug)} language={locale}>
                        {node.image && (
                          <Img
                            className={css.cover}
                            fluid={node.image.childImageSharp.fluid}
                          />
                        )}
                        <h4>{node.name}</h4>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExamplesList;
