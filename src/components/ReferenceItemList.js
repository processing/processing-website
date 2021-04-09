import React, { memo } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import CopyButton from './CopyButton';

import { pathToName } from '../utils/paths';
import classnames from 'classnames';

import grid from '../styles/grid.module.css';
import css from './ReferenceItemList.module.css';

export const CodeList = memo(
  ({ items, nameIsHtml, variant, descriptionIsHtml, nameIsPath }) => {
    const isString = items[0] && typeof items[0] === 'string';
    return (
      <ul className={classnames(css.codeList, css[variant])}>
        {items.map((item) => {
          // Name
          let nameLabel = isString ? item : item.name;
          if (nameIsPath) {
            nameLabel = pathToName(nameLabel);
          }

          if (nameLabel === '') {
            return null;
          }

          const name = nameIsHtml ? (
            <code dangerouslySetInnerHTML={{ __html: nameLabel }} />
          ) : (
            <code>{nameLabel}</code>
          );

          // Name as link
          const nameLinkMaybe =
            !isString && item.anchor ? (
              <Link to={item.anchor}>{name}</Link>
            ) : (
              name
            );

          // Type
          let type = null;
          if (
            !isString &&
            item.type &&
            item.type !== '' &&
            !Array.isArray(item.type || item.type.length > 0)
          ) {
            type = <code className={css.type}>({item.type})</code>;
          }

          // Description
          const description = isString ? null : descriptionIsHtml ? (
            <span dangerouslySetInnerHTML={{ __html: item.description }} />
          ) : (
            <span>{item.description}</span>
          );

          return (
            <li key={`ril-${nameLabel}`} className={css.item}>
              {nameLinkMaybe}
              {type}
              {description}
            </li>
          );
        })}
      </ul>
    );
  }
);

export const ExampleList = memo(({ examples }) => {
  return (
    <ul className={css.exampleList}>
      {examples.map((example, i) => {
        return (
          <li key={'ex' + i} className={classnames(grid.nest, css.item)}>
            <div className={classnames(grid.col, grid.leftBleed, css.code)}>
              <CopyButton text={example.code} />
              <pre>
                <code>{example.code}</code>
              </pre>
            </div>
            {example.image && (
              <div className={classnames(grid.col, grid.rightBleed, css.image)}>
                <Img fluid={example.image.childImageSharp.fluid} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
});
