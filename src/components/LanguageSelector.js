import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useLocalization, LocalizedLink as Link } from 'gatsby-theme-i18n';

import { Button } from './Button';

import css from './LanguageSelector.module.css';

const LanguageSelector = () => {
  const { config, locale } = useLocalization();
  const [showLanguage, setShowLanguage] = useState(false);

  let path = typeof window !== 'undefined' ? window.location.pathname : '';
  config.forEach((item) => (path = path.replace(`${item.code}/`, '')));

  const onClick = () => {
    setShowLanguage(!showLanguage);
  };
  useEffect(() => {
    const listener = (e) => {
      setShowLanguage(false);
    };
    if (showLanguage) {
      document.addEventListener('click', listener);
    }
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [showLanguage]);
  return (
    <div className={css.root}>
      <Button onClick={onClick} className={css.languageButton}>
        {config.filter((item) => item.code === locale)[0].localName}
      </Button>
      <ul
        className={classnames(css.languagePicker, {
          [css.show]: showLanguage
        })}>
        {config.map((conf, key) => (
          <li key={key}>
            <Link
              to={path}
              language={conf.code}
              tabIndex={showLanguage ? 0 : -1}>
              {conf.localName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;
