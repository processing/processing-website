import React from 'react';

import { useLocalization } from 'gatsby-theme-i18n';

import css from './Selector.module.css';

const Selector = () => {
  const { config, locale } = useLocalization();

  return (
    <div className={css.root}>
      <select
        className={css.select}
        value={locale}
        onChange={(e) => {
          console.log('change');
        }}>
        {config.map((conf, key) => (
          <option key={key} className={css.option} value={conf.code}>
            {conf.localName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
