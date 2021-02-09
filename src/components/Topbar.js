import React, { memo } from 'react';
import classnames from 'classnames';

import css from './Topbar.module.css';

import TopbarItem from './TopbarItem';
import Selector from './Selector';

import LogoProcessing from '../images/logo-processing-dark.svg';
import LogoP5js from '../images/logo-p5js-dark.svg';
import LogoFoundation from '../images/logo-processingfoundation-dark.svg';

export const items = [
  {
    className: css.foundation,
    name: 'Processing Foundation',
    link: 'https://processingfoundation.org',
    logo: <LogoFoundation className={css.logo} />,
  },
  {
    name: 'Processing',
    link: 'https://processing.org',
    logo: <LogoProcessing className={css.logo} />,
  },
  {
    className: css.p5,
    name: 'p5.js',
    link: 'https://p5js.org/',
    logo: <LogoP5js className={css.logo} />,
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
          <li key={key} className={classnames(css.item, item.className)}>
            <TopbarItem item={item} />
          </li>
        ))}
      </ul>
      <Selector />
    </div>
  );
};

export default memo(Topbar);
