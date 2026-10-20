import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import { useLocalization } from 'gatsby-theme-i18n';

import { referenceSourceUrl } from '../../utils/paths';

import * as css from './GoToSource.module.css';

const GoToSource = ({ name, libraryName }) => {
  const intl = useIntl();
  const { locale } = useLocalization();
  const url = referenceSourceUrl(name, libraryName, locale || 'en');

  return (
    <p className={css.root}>
      {intl.formatMessage({ id: 'referenceSourceInfo' })}
      <a href={url} target="_blank" rel="noreferrer">
        {intl.formatMessage({ id: 'goToSource' })}
      </a>
      .
    </p>
  );
};

export default memo(GoToSource);
