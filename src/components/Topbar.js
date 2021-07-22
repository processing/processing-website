import React, { memo } from 'react';
import classnames from 'classnames';

import * as grid from '../styles/grid.module.css';
import * as css from './Topbar.module.css';

import LanguageSelector from './LanguageSelector';

import LogoProcessing from '../images/logo-processing.svg';
import LogoProcessingFoundation from '../images/logo-processing-foundation.svg';
import LogoProcessingAndroid from '../images/logo-processing-android.svg';
import LogoProcessingPython from '../images/logo-processing-python.svg';

import LogoP5js from '../images/logo-p5js-original.svg';

export const items = [
  {
    className: css.foundation,
    name: (
      <>
        Processing
        <br /> Foundation
      </>
    ),
    link: 'https://processingfoundation.org',
    logo: <LogoProcessingFoundation className={css.logo} />,
    color: '#9c4bff'
  },
  {
    name: 'Processing',
    className: css.processing,
    link: 'https://processing.org',
    logo: <LogoProcessing className={css.logo} />,
    color: '#0564ff'
  },
  {
    className: css.p5,
    name: 'p5.js',
    link: 'https://p5js.org/',
    logo: <LogoP5js className={css.logo} />,
    color: '#ED225D'
  },
  {
    name: (
      <>
        Processing
        <br /> Android
      </>
    ),
    link: 'https://android.processing.org/',
    logo: <LogoProcessingAndroid className={css.logo} />,
    color: '#98C800'
  },
  {
    name: (
      <>
        Processing
        <br /> Python
      </>
    ),
    link: 'https://py.processing.org/',
    logo: <LogoProcessingPython className={css.logo} />,
    color: '#2D9E97'
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
                <span className={css.name} style={{ color: item.color }}>
                  {item.name}
                </span>
              </a>
              <span
                className={css.itemBar}
                style={{ borderBottomColor: item.color }}
              />
            </li>
          ))}
        </ul>
        {/* disabled until we have a second language */}
        {false && (
          <LanguageSelector
            className={classnames(css.languageSelector, grid.col)}
          />
        )}
      </div>
    </div>
  );
};

export default memo(Topbar);
