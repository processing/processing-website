import React from 'react';
import { graphql } from 'gatsby';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';

const TutorialTemplate = ({ data, pageContext }) => {
  const { mdx, english } = data;

  let title = mdx === null ? english.frontmatter.title : mdx.frontmatter.title;
  let body = mdx === null ? english.body : mdx.body;

  return (
    <Layout>
      <h1>{title}</h1>
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
        title
      }
    }
    english: mdx(
      fields: { locale: { eq: "en" } }
      frontmatter: { slug: { eq: $slug } }
    ) {
      body
      frontmatter {
        title
      }
    }
  }
`;
