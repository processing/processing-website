import React from 'react';
import { graphql } from 'gatsby';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';

const TutorialTemplate = ({ data, pageContext }) => {
  const { mdx } = data;
  const { frontmatter, body } = mdx;

  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  );
};

export default TutorialTemplate;

export const query = graphql`
  query($locale: String!, $slug: String!) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $slug } }
    ) {
      body
      frontmatter {
        slug
        title
      }
    }
  }
`;
