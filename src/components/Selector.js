import React, { useState } from 'react';
import classnames from 'classnames';

import { useLocalization } from 'gatsby-theme-i18n';
import { changeLocale } from 'gatsby-plugin-intl';

import css from './Selector.module.css';

const Selector = () => {
  const { config, defaultLang, locale } = useLocalization();

  return (
    <div className={css.root}>
      <select
        className={css.select}
        value={locale}
        onChange={(e) => {
          changeLocale(e.target.value, '/');
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
