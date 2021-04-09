import React, { useContext } from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import { useIntl } from 'react-intl';

import { LayoutContext } from '../components/Layout';

import css from './TableOfContents.module.css';

export default ({ items = [] }) => {
  const layout = useContext(LayoutContext);
  const intl = useIntl();

  return (
    <div
      className={classnames(css.root, {
        [css.headerScrolled]: layout.headerScrolled,
      })}>
      <h3>{intl.formatMessage({ id: 'tableOfContents' })}</h3>
      <ul>
        {items.map((item) => {
          const isCurrent = layout.currentHeading === item.url.replace('#', '');
          return (
            <li
              key={item.title}
              className={classnames({ [css.active]: isCurrent })}>
              <Link to={item.url}>
                <h4>{item.title}</h4>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
