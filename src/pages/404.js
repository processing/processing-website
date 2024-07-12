import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';
import * as css from '../styles/pages/404.module.css';

const NotFoundPage = () => {
  const intl = useIntl();

  return (
    <Layout>
      <Helmet>
        <title>{intl.formatMessage({ id: 'pageNotFound' })}</title>
      </Helmet>
      <div className={css.notfound}>
        <h1>{intl.formatMessage({ id: 'notFound' })}</h1>
        <p>{intl.formatMessage({ id: 'notFoundText' })}</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
