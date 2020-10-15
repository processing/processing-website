import React from 'react';
import classnames from 'classnames';

import css from './Topbar.module.css';

import TopbarItem from './TopbarItem';
import Selector from './Selector';

export const items = [
  {
    name: 'Processing Foundation',
    link: 'https://processingfoundation.org',
    logo: '',
  },
  {
    name: 'Processing',
    link: 'https://processing.org',
    logo: '',
  },
  {
    name: 'p5.js',
    link: 'https://p5js.org/',
    logo: '',
  },
];

const Topbar = ({ show }) => {
  return (
    <div
      className={classnames(
        css.root,
        { [css.show]: show },
        { [css.noshow]: !show }
      )}>
      <ul className={css.menu}>
        {items.map((item, key) => (
          <li key={key} className={css.item}>
            <TopbarItem item={item} />
          </li>
        ))}
      </ul>
      <Selector />
    </div>
  );
};

export default Topbar;
