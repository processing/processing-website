import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import Layout from './Layout';
import * as css from '../styles/pages/error.module.css';

const ErrorPage = ({ titleId, headingId, textId }) => {
  const intl = useIntl();

  return (
    <Layout>
      <Helmet>
        <title>{intl.formatMessage({ id: titleId })}</title>
      </Helmet>
      <div className={css.error}>
        <h1>{intl.formatMessage({ id: headingId })}</h1>
        <p>{intl.formatMessage({ id: textId })}</p>
      </div>
    </Layout>
  );
};

export default ErrorPage;
