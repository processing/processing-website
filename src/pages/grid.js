import React from 'react';
import Layout from '../components/Layout';
import classnames from 'classnames';
import css from './grid.module.css';
import grid from '../styles/grid.module.css';

const Grid = () => {
  return (
    <Layout>
      <p>Example grid:</p>
      <div className={grid.grid}>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, css.col)}>
          <div className={css.red} />
        </div>
        <div className={classnames(grid.col, grid.nest, css.nest)}>
          <div className={classnames(grid.col, css.child)}>
            <div className={css.red}>4 nested!</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Grid;
