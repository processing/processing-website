import React from 'react';
import { Link } from 'gatsby';

import css from './Contentbar.module.css';

const Contentbar = (props) => {
  const { content } = props;

  return (
    <div className={css.root}>
      <h3>Table of contents</h3>
      <ul>
        {content.map((item, key) => (
          <li id={item.url} key={key + 'tb'}>
            <Link to={item.url}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contentbar;
