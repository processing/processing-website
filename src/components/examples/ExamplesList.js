import React, { Fragment, memo, useState } from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';
import { GatsbyImage } from 'gatsby-plugin-image';

import ToggleButton from '../ToggleButton';

import { slugify } from '../../utils';
import { useTreeSort } from '../../hooks';

import * as css from './ExamplesList.module.css';
import * as grid from '../../styles/grid.module.css';

const ExamplesList = ({ tree }) => {
  const intl = useIntl();
  const [curated, setCurated] = useState(false);

  const handleToggle = (toggle) => {
    setCurated((curated) => !curated);
  };

  const sortedTree = useTreeSort(tree, `order`, curated);

  return (

    <div className={classnames(grid.col, css.root)}>
      {Object.keys(sortedTree).map((category) =>
        <Fragment key={`category-${category}`}>
          <div className={css.categoryName}>
            <h2 id={slugify(category)}>{intl.formatMessage({id:category})}</h2>
            <div className={css.toggleButton}>
              <ToggleButton
                defaultLabel="A-Z"
                pressedLabel={intl.formatMessage({id:"PressedSortByLevel"})}
                ariaLabel="Sort by level"
                toggle={curated}
                onToggle={handleToggle}
              />
            </div>
          </div>
          <p className={css.categoryDescription}>
            {category === 'Topics'
              ? intl.formatMessage({ id: 'topicExamples' })
              : intl.formatMessage({ id: 'basicExamples' })}
          </p>
          <div className={classnames(grid.grid, css.category)}>
            {Object.keys(sortedTree[category]).map((subcategory) => (
              <Fragment key={`subcategory-${subcategory}`}>
                <h3
                  id={slugify(category, subcategory)}
                  className={classnames(grid.col, css.subcategoryName)}>
                  {intl.formatMessage({id:subcategory})}
                </h3>
                <ul className={classnames(grid.col, grid.grid, css.examples)}>
                  {sortedTree[category][subcategory].map((item, key) => (
                    <ExampleItem node={item} key={`item-${item.name}`} />
                  ))}
                </ul>
              </Fragment>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export const ExampleItem = memo(({ node, variant }) => {
   console.log (`node ${ node.name } path ${ node.path}`);

  return (
    <li className={classnames(grid.col, css.item, { [css[variant]]: variant })}>
      <Link to={node.path}>
        {node.image && (
          <GatsbyImage
            className={css.cover}
            image={node.image.childImageSharp.gatsbyImageData}
            alt={node.name}
          />
        )}
        <h4>{node.name}</h4>
      </Link>
    </li>
  );
});

export default memo(ExamplesList);
