import React, { Fragment, memo, useState } from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link, useLocalization } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';
import Img from 'gatsby-image';

import ToggleButton from './ToggleButton';

import { useTreeSort } from '../hooks';

import css from './ExamplesList.module.css';
import grid from '../styles/grid.module.css';

const ExamplesList = ({ tree }) => {
  const { locale } = useLocalization();
  const intl = useIntl();
  const [curated, setCurated] = useState(false);

  const handleToggle = (toggle) => {
    setCurated((curated) => !curated);
  };

  const sortedTree = useTreeSort(tree, `order`, curated);

  return (
    <div className={classnames(grid.col, css.root)}>
      {Object.keys(sortedTree).map((category) => (
        <div
          className={classnames(grid.grid, css.category)}
          key={`category-${category}`}>
          <h2 className={classnames(grid.col, css.categoryName)}>{category}</h2>
          <div className={css.toggleButton}>
            <ToggleButton
              defaultLabel="A-Z"
              pressedLabel="By level"
              ariaLabel="Sort by level"
              toggle={curated}
              onToggle={handleToggle}
            />
          </div>
          <p className={classnames(grid.col, css.categoryDescription)}>
            {category === 'topic'
              ? intl.formatMessage({ id: 'topicExamples' })
              : intl.formatMessage({ id: 'basicExamples' })}
          </p>
          {Object.keys(sortedTree[category]).map((subcategory) => (
            <Fragment key={`subcategory-${subcategory}`}>
              <h3 className={classnames(grid.col, css.subcategoryName)}>
                {subcategory}
              </h3>
              <ul className={classnames(grid.col, grid.grid, css.examples)}>
                {sortedTree[category][subcategory].map((item, key) => (
                  <ExampleItem
                    node={item}
                    locale={locale}
                    key={`item-${item.name}`}
                  />
                ))}
              </ul>
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export const ExampleItem = memo(({ node, locale }) => {
  return (
    <li className={classnames(grid.col, css.item)}>
      <Link to={node.path} language={locale}>
        {node.image && (
          <Img className={css.cover} fluid={node.image.childImageSharp.fluid} />
        )}
        <h4>{node.name}</h4>
      </Link>
    </li>
  );
});

export default memo(ExamplesList);
