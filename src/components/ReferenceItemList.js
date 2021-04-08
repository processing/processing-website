import React, { memo } from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import grid from '../styles/grid.module.css';
import css from './ReferenceItemList.module.css';

const ReferenceItemList = ({
  items,
  nameIsHtml,
  variant,
  descriptionIsHtml,
}) => {
  return (
    <ul className={classnames(css.root, css[variant])}>
      {items.map((item) => {
        const name = nameIsHtml ? (
          <code dangerouslySetInnerHTML={{ __html: item.name }} />
        ) : (
          <code>{item.name}</code>
        );
        const nameLinkMaybe = item.anchor ? (
          <Link to={item.anchor}>{name}</Link>
        ) : (
          name
        );
        const description = descriptionIsHtml ? (
          <span dangerouslySetInnerHTML={{ __html: item.description }} />
        ) : (
          <span>{item.description}</span>
        );

        return (
          <li key={`ril-${item.name}`} className={css.item}>
            {nameLinkMaybe}
            {description}
          </li>
        );
      })}
    </ul>
  );
};

export default memo(ReferenceItemList);
