import React from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';

import css from '../styles/pages/donate.module.css';
import grid from '../styles/grid.module.css';

const Donate = () => {
  const intl = useIntl();
  return (
    <Layout>
      <Helmet>
        <title>{intl.formatMessage({ id: 'donate' })}</title>
      </Helmet>
      <div className={classnames(css.root, grid.grid)}>
        <h1 className={grid.col}>{intl.formatMessage({ id: 'donate' })}</h1>
        <h3 className={grid.col}>
          {intl.formatMessage({ id: 'donateIntro' })}
        </h3>
        <div className={classnames(grid.col, css.donateWrapper)}>
          <script
            src="https://donorbox.org/widget.js"
            paypalExpress="true"></script>
          <iframe
            className={css.donate}
            allowpaymentrequest=""
            src="https://donorbox.org/embed/support-the-processing-foundation?hide_donation_meter=true"></iframe>
        </div>
        <div
          className={classnames(grid.col, css.content)}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'donateOutro' })
          }}></div>
      </div>
    </Layout>
  );
};

export default Donate;
