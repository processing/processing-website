import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';

import grid from '../styles/grid.module.css';

const About = ({ data }) => {
  const { mdx } = data;
  const { frontmatter, body } = mdx;
  return (
    <Layout>
      <h2> {frontmatter.title}</h2>
      <MDXRenderer>{body}</MDXRenderer>
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
