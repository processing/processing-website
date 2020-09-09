import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';

const TutorialTemplate = ({ data, pageContext }) => {
  const { mdx } = data;

  return (
    <Layout>
      {mdx !== null ? (
        <div>
          <h1>{mdx.frontmatter.title}</h1>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      ) : (
        <div>
          This page is not translated, please refer to the
          <Link to={pageContext.slug}> english page</Link>
        </div>
      )}
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
  }
`;
