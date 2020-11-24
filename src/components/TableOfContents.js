import React, { useContext } from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';

import { LayoutContext } from '../components/Layout';

import css from './TableOfContents.module.css';

export default ({ items }) => {
  const layout = useContext(LayoutContext);

  return (
    <div
      className={classnames(css.root, {
        [css.headerScrolled]: layout.headerScrolled,
      })}>
      <h3>Table of contents</h3>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <Link to={item.url}>
              <h4>{item.title}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
