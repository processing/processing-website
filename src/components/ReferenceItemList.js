import React, { memo } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import classnames from 'classnames';

import CopyButton from './CopyButton';

import css from './ReferenceItemList.module.css';
import grid from '../styles/grid.module.css';

export const CodeList = memo(
  ({ items, variant, nameIsHtml, descriptionIsHtml }) => {
    return (
      <ul className={classnames(css.codeList, css[variant])}>
        {items.map((item) => {
          // Name
          if (item.name === '' || typeof item !== 'object') {
            return null;
          }

          let name = nameIsHtml ? (
            <code dangerouslySetInnerHTML={{ __html: item.name }} />
          ) : (
            <code>{item.name}</code>
          );

          // Name as link
          if (item.anchor) {
            name = <Link to={item.anchor}>{name}</Link>;
          }

          // Type
          let type = null;
          if (item.type && Array.isArray(item.type) && item.type.length > 0) {
            type = <code className={css.type}>({item.type.join(', ')})</code>;
          }

          // Description
          const description = descriptionIsHtml ? (
            <span dangerouslySetInnerHTML={{ __html: item.description }} />
          ) : (
            <span>{item.description}</span>
          );

          return (
            <li key={`ril-${item.name}`} className={css.item}>
              {name}
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
          <li key={'ex' + i} className={classnames(grid.grid, css.item)}>
            <div className={classnames(grid.col, css.code)}>
              <CopyButton text={example.code} />
              <pre>
                <code>{example.code}</code>
              </pre>
            </div>
            {example.image && (
              <div className={classnames(grid.col, css.image)}>
                <Img fluid={example.image.childImageSharp.fluid} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
});
