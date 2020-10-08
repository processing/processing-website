import React from 'react';
import { Link } from 'gatsby';

import css from './TableOfContents.module.css';

export default ({ items }) => (
  <div className={css.root}>
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
