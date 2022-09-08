import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';

const NotFoundPage = () => {
  const intl = useIntl();

  return (
    <Layout>
      <Helmet>
        <title>{intl.formatMessage({ id: 'pageNotFound' })}</title>
      </Helmet>
      <h1>{intl.formatMessage({ id: 'notFound' })}</h1>
      <p>{intl.formatMessage({ id: 'notFoundText' })}</p>
    </Layout>
  );
};

export default NotFoundPage;
