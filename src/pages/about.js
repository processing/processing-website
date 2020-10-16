import React from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';

import css from '../styles/pages/page.module.css';
import grid from '../styles/grid.module.css';

const About = ({ data }) => {
  const { mdx } = data;
  const { frontmatter, body } = mdx;
  return (
    <Layout menuItem={'About'}>
      <div className={grid.grid}>
        <h1 className={classnames(grid.col5, grid.pull3)}>
          {frontmatter.title}
        </h1>
        <h3 className={grid.col3}>
          A short introduction to the Processing software and projects from the
          community.
        </h3>
        <div className={classnames(grid.col5, grid.push1, css.content)}>
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
      frontmatter: { slug: { eq: "/about" } }
    ) {
      body
      frontmatter {
        slug
        title
      }
    }
  }
`;

export default About;
