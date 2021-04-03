import React, { memo } from 'react';
import classnames from 'classnames';
import { LocalizedLink as Link, useLocalization } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';
import Img from 'gatsby-image';

import css from './ExamplesList.module.css';
import grid from '../styles/grid.module.css';

const ExamplesList = ({ tree }) => {
  const { locale } = useLocalization();
  const intl = useIntl();

  const categoryEls = [];
  for (const category in tree) {
    const subCategoryEls = [];
    for (const subCategory in tree[category]) {
      const nodes = tree[category][subCategory];
      const els = [];
      for (let k = 0; k < nodes.length; k++) {
        els.push(
          <ExampleItem
            node={nodes[k]}
            locale={locale}
            key={`item-${nodes[k].name}`}
          />
        );
      }
      subCategoryEls.push(
        <div key={`subcategory-${subCategory}`} className={css.subcategory}>
          <h3 className={grid.col}>{subCategory}</h3>
          <ul className={classnames(grid.col, grid.nest)}>{els}</ul>
        </div>
      );
    }
    categoryEls.push(
      <div
        className={classnames(grid.nest, css.category)}
        key={`category-${category}`}>
        <h2 className={grid.col}>{category}</h2>
        <p className={classnames(grid.col, css.intro)}>
          {category === 'topic'
            ? intl.formatMessage({ id: 'topicExamples' })
            : intl.formatMessage({ id: 'basicExamples' })}
        </p>
        <ul className={classnames(grid.col, grid.nest)}>{subCategoryEls}</ul>
      </div>
    );
  }

  return <div className={classnames(css.root)}>{categoryEls}</div>;
};

const ExampleItem = memo(({ node, locale }) => {
  return (
    <li className={grid.col}>
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
