import React from 'react';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import HeadMatter from '../components/HeadMatter';
import Layout from '../components/Layout';
import Character from '../components/character/Character';

import * as css from '../styles/pages/donate.module.css';
import * as grid from '../styles/grid.module.css';

const Donate = () => {
  const intl = useIntl();

  return (
    <Layout>
      <HeadMatter
        title={intl.formatMessage({ id: 'donate' })}
        description={intl.formatMessage({ id: 'donateIntro' })}
      />
      <div className={classnames(grid.grid, grid.container, css.root)}>
        <div className={classnames(grid.col, css.left)}>
          <h1>{intl.formatMessage({ id: 'donate' })}</h1>
          <h3>{intl.formatMessage({ id: 'donateIntro' })}</h3>
          <div>
            <script
              src="https://donorbox.org/widget.js"
              paypalexpress="true"></script>
            <iframe
              title="Donate to Processing"
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
