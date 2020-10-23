import React from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import TableOfContents from '../components/TableOfContents';

import css from '../styles/pages/page.module.css';
import grid from '../styles/grid.module.css';

const Environment = ({ data }) => {
  const { mdx } = data;
  const { frontmatter, body, tableOfContents } = mdx;
  return (
    <Layout>
      <div className={grid.grid}>
        <TableOfContents items={tableOfContents.items} />
        <h1 className={classnames(grid.push2, grid.col5, grid.pull1)}>
          {frontmatter.title}
        </h1>
        <div className={classnames(grid.col5, grid.push2, css.content)}>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($locale: String!) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: "/environment" } }
    ) {
      body
      frontmatter {
        slug
        title
      }
      tableOfContents
    }
  }
`;

export default Environment;
