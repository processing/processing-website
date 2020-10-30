import React from 'react';

import css from './TopbarItem.module.css';

const TopbarItem = (props) => {
  const { item } = props;
  return (
    <div className={css.root}>
      {item.logo}
      <a href={item.link}>
        <h4>{item.name}</h4>
      </a>
    </div>
  );
};

export default TopbarItem;
