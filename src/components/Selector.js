import React from 'react';
import classnames from 'classnames';

import {useLocalization } from 'gatsby-theme-i18n';

import css from './Selector.module.css';

const Selector = ({ className }) => {
  const { config } = useLocalization();
  return (
    <div className={classnames({ [className]: className }, css.root)}>
      <select className={css.select}>
        {config.map((conf, key) => (
          <option key={key} className={css.option} value={conf.localName}>
            {conf.localName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
