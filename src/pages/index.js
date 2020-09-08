import React from 'react';

import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';

import { useLocalization } from 'gatsby-theme-i18n';

const IndexPage = () => {
  const intl = useIntl();
  const { locale } = useLocalization();
  return (
    <Layout>
      <Link to="/reference/">{intl.formatMessage({ id: 'references' })}</Link>
      <br />
      <Link to="/reference/libraries/">
        {intl.formatMessage({ id: 'libraries' })}
      </Link>
      <br />
      <Link to="/examples/" language={locale}>
        {intl.formatMessage({ id: 'examples' })}
      </Link>
      <br />
      <Link to="/tutorials/">{intl.formatMessage({ id: 'tutorials' })}</Link>
    </Layout>
  );
};

export default IndexPage;
