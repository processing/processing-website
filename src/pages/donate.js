import React from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';
import Character from '../components/character/Character';

import css from '../styles/pages/donate.module.css';
import grid from '../styles/grid.module.css';

const Donate = () => {
  const intl = useIntl();

  return (
    <Layout>
      <Helmet>
        <title>{intl.formatMessage({ id: 'donate' })}</title>
      </Helmet>
      <div className={classnames(grid.grid, grid.container, css.root)}>
        <div className={classnames(grid.col, css.left)}>
          <h1>{intl.formatMessage({ id: 'donate' })}</h1>
          <h3>{intl.formatMessage({ id: 'donateIntro' })}</h3>
          <div className={classnames(css.donateWrapper)}>
            <script
              src="https://donorbox.org/widget.js"
              paypalexpress="true"></script>
            <iframe
              title={intl.formatMessage({ id: 'donatePaymentTitle' })}
              className={css.donate}
              allowpaymentrequest=""
              src="https://donorbox.org/embed/support-the-processing-foundation?hide_donation_meter=true"></iframe>
          </div>
          <div
            className={classnames(css.content)}
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: 'donateOutro' })
            }}></div>
        </div>
        <div className={classnames(grid.col, css.right)}>
          <Character className={css.character} />
        </div>
      </div>
    </Layout>
  );
};

export default Donate;
