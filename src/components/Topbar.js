import React, { memo } from 'react';
import classnames from 'classnames';

import grid from '../styles/grid.module.css';
import css from './Topbar.module.css';

import LanguageSelector from './LanguageSelector';

import LogoProcessing from '../images/logo-processing.svg';
import LogoP5js from '../images/logo-p5js.svg';
import LogoFoundation from '../images/logo-processingfoundation.svg';

export const items = [
  {
    className: css.foundation,
    name: 'Processing Foundation',
    link: 'https://processingfoundation.org',
    logo: <LogoFoundation className={css.logo} />
  },
  {
    name: 'Processing',
    className: css.processing,
    link: 'https://processing.org',
    logo: <LogoProcessing className={css.logo} />
  },
  {
    className: css.p5,
    name: 'p5.js',
    link: 'https://p5js.org/',
    logo: <LogoP5js className={css.logo} />
  }
];

const Topbar = ({ show }) => {
  return (
    <div
      className={classnames(
        css.root,
        { [css.show]: show },
        { [css.noshow]: !show }
      )}>
      <div className={classnames(css.container, grid.container, grid.grid)}>
        <ul className={classnames(css.menu, grid.col)}>
          {items.map((item, key) => (
            <li key={key} className={classnames(css.item, item.className)}>
              <a className={css.itemLink} href={item.link}>
                {item.logo}
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
        {/* <LanguageSelector
          className={classnames(css.languageSelector, grid.col)}
        />*/}
      </div>
    </div>
  );
};

export default memo(Topbar);
