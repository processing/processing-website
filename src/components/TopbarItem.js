import React from 'react';

import css from './TopbarItem.module.css';

const TopbarItem = (props) => {
  const { item } = props;
  return (
    <div className={css.root}>
      <a href={item.link}>{item.name}</a>
      <img src={item.logo} />
    </div>
  );
};

export default TopbarItem;
