import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';

import css from '../styles/pages/test.module.css';

const Test = () => {
  return (
    <Layout>
      <Helmet>
        <title>Test</title>
      </Helmet>
      <div className={css.grid}>
        <div className={css.col}>
          <div />
        </div>
        <div className={css.col}>
          <div />
        </div>
        <div className={css.col}>
          <div />
        </div>
        <div className={css.col}>
          <div />
        </div>
        <div className={css.col}>
          <div />
        </div>
        <div className={css.col}>
          <div />
        </div>
        <div className={css.col}>
          <div />
        </div>
        <div className={css.col}>
          <div />
        </div>
      </div>
      <div className={css.grid}>
        <div className={css.col}>
          <div />
        </div>
        <div className={css.col}>
          <div />
        </div>
        <div className={css.col5}>
          <div className={css.nest}>
            <div className={css.nestCol}>
              <div />
            </div>
            <div className={css.nestCol}>
              <div />
            </div>
            <div className={css.nestCol}>
              <div />
            </div>
            <div className={css.nestCol}>
              <div />
            </div>
            <div className={css.nestCol}>
              <div />
            </div>
          </div>
        </div>
        <div className={css.col}>
          <div />
        </div>
      </div>
    </Layout>
  );
};

export default Test;
