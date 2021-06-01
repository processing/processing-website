import React from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import Layout from '../components/Layout';

import css from '../styles/pages/test.module.css';
import grid from '../styles/grid.module.css';

const Test = () => {
  return (
    <Layout>
      <Helmet>
        <title>Test</title>
      </Helmet>
      <h3>Normal grid</h3>
      <div className={classnames(grid.grid, grid.container)}>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
      </div>
      <h3>Nested grid inside column</h3>
      <div className={classnames(grid.grid, grid.container)}>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, grid.grid, css.col5)}>
          <div className={classnames(grid.col, css.nestCol)}>
            <div className={css.red} />
          </div>
          <div className={classnames(grid.col, css.nestCol)}>
            <div className={css.red} />
          </div>
          <div className={classnames(grid.col, css.nestCol)}>
            <div className={css.red} />
          </div>
          <div className={classnames(grid.col, css.nestCol)}>
            <div className={css.red} />
          </div>
          <div className={classnames(grid.col, css.nestCol)}>
            <div className={css.red} />
          </div>
        </div>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
      </div>
      <h3>Nested grid inside element inside column</h3>
      <div className={classnames(grid.grid, grid.container)}>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col5)}>
          <div className={grid.grid}>
            <div className={classnames(grid.col, css.nestCol)}>
              <div className={css.red} />
            </div>
            <div className={classnames(grid.col, css.nestCol)}>
              <div className={css.red} />
            </div>
            <div className={classnames(grid.col, css.nestCol)}>
              <div className={css.red} />
            </div>
            <div className={classnames(grid.col, css.nestCol)}>
              <div className={css.red} />
            </div>
            <div className={classnames(grid.col, css.nestCol)}>
              <div className={css.red} />
            </div>
          </div>
        </div>
        <div className={classnames(grid.col, css.col1)}>
          <div className={css.red} />
        </div>
      </div>
    </Layout>
  );
};

export default Test;
