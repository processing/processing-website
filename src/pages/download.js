import React from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';

import css from '../styles/pages/download.module.css';
import grid from '../styles/grid.module.css';

const Download = ({ data }) => {
  const { mdx } = data;
  const { frontmatter, body } = mdx;
  return (
    <Layout menuItem={'Download'}>
      <div className={grid.grid}>
        <h1 className={classnames(grid.col5, grid.pull3)}>
          {frontmatter.title}
        </h1>
        <h3 className={grid.col3}>
          A short introduction to the Processing software and projects from the
          community.
        </h3>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($locale: String!) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: "/download" } }
    ) {
      body
      frontmatter {
        slug
        title
      }
    }
  }
`;

export default Download;
