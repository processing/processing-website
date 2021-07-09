import React, { memo } from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { GatsbyImage } from 'gatsby-plugin-image';
import classnames from 'classnames';
import { widont } from '../../utils/index.js';

import CopyButton from './../CopyButton';

import * as css from './ContentList.module.css';
import * as grid from '../../styles/grid.module.css';

export const CodeList = memo(
  ({ items, variant, nameIsHtml, descriptionIsHtml }) => {
    return (
      <ul className={classnames(css.codeList, css[variant])}>
        {items.map((item, i) => {
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
            <span
              dangerouslySetInnerHTML={{ __html: widont(item.description) }}
            />
          ) : (
            <span>{widont(item.description)}</span>
          );

          return (
            <li key={`ril-${item.name}-${i}`} className={css.item}>
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
                <GatsbyImage
                  image={example.image.childImageSharp.gatsbyImageData}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
});
