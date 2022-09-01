import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useLocation } from '@reach/router';
import { useLocalization, LocalizedLink as Link } from 'gatsby-theme-i18n';

import { Button } from './Button';

import * as css from './LanguageSelector.module.css';

const LanguageSelector = ({ className }) => {
  const { config, locale } = useLocalization();
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  // Node and the browser differs in the pathname as node has a trailing slash
  // This streamlines the pathname to not have a trailing slash.
  const realPath =
    pathname[pathname.length - 1] === '/' ? pathname.slice(0, -1) : pathname;

  const path = locale === 'en' ? realPath : realPath.replace(`${locale}/`, '');

  const onToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const listener = (e) => {
      setOpen(false);
    };
    if (open) {
      document.addEventListener('click', listener);
    }
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [open]);

  if (config.length === 1) {
    return null;
  }

  return (
    <div className={classnames(css.root, className)}>
      <Button
        onClick={onToggle}
        variant="transparent"
        className={css.languageButton}>
        {config.filter((item) => item.code === locale)[0].localName}
      </Button>
      <ul
        className={classnames(css.languagePicker, {
          [css.show]: open
        })}>
        {config.map((conf, key) => (
          <li key={key}>
            <Link to={path} language={conf.code} tabIndex={open ? 0 : -1}>
              {conf.localName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;
