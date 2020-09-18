import { Link } from 'gatsby';
import React from 'react';

import { LocalesList, useLocalization } from 'gatsby-theme-i18n';

import css from './Selector.module.css';

const Selector = () => {
  const { config } = useLocalization();
  return (
    <div className={css.root}>
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
