import React, { memo } from 'react';
import { Link } from 'gatsby';
import { pathToName } from '../utils/paths';
import classnames from 'classnames';
import grid from '../styles/grid.module.css';
import css from './ReferenceItemList.module.css';

const ReferenceItemList = ({
  items,
  nameIsHtml,
  variant,
  descriptionIsHtml,
  nameIsPath,
}) => {
  const isString = items[0] && typeof items[0] === 'string';
  return (
    <ul className={classnames(css.root, css[variant])}>
      {items.map((item) => {
        // Name
        let nameLabel = isString ? item : item.name;
        if (nameIsPath) {
          nameLabel = pathToName(nameLabel);
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
        if (!isString && item.type) {
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
};

export default memo(ReferenceItemList);
