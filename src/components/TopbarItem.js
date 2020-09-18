import { Link } from 'gatsby';
import React from 'react';

import css from './TopbarItem.module.css';

const TopbarItem = (props) => {
  const { item } = props;
  return (
    <div className={css.root}>
      <Link to={item.link}>{item.name}</Link>
      <img src={item.logo} />
    </div>
  );
};

export default TopbarItem;
