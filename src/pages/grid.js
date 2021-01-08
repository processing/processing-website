import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import classnames from 'classnames';
import css from './grid.module.css';
import grid from '../styles/grid.module.css';
import text from '../styles/text.module.css';

const Grid = () => {
  return (
    <Layout>
      <SEO title="Home" />
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
      <h1 className={text.mega}>Mega</h1>
      <h2 className={text.xlarge}>Extra Large</h2>
      <h3 className={text.large}>Large</h3>
      <h4 className={text.medium}>Medium</h4>
      <h5 className={text.small}>Small</h5>
    </Layout>
  );
};

export default Grid;
