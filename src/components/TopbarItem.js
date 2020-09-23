import React from 'react';

import css from './TopbarItem.module.css';

const TopbarItem = (props) => {
  const { item } = props;
  return (
    <div className={css.root}>
      <img src={item.logo} alt={`${item.name}-logo`} />
      <a href={item.link}>
        <h4>{item.name}</h4>
      </a>
    </div>
  );
};

export default TopbarItem;
