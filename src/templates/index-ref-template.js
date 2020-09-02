import React from 'react';
import { graphql } from 'gatsby';

import { Link } from 'gatsby';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import ReferenceList from '../components/ReferenceList';

const IndexRefTemplate = ({ data, pageContext: { libraryName } }) => {

  return (
    <Layout>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
      <ReferenceList data={data} library={libraryName} />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
};

export default IndexRefTemplate;

export const query = graphql`
  query($libraryName: String!, $locale: String!) {
    allFile(
      filter: { fields: { lib: { eq: $libraryName }, lang: { eq: $locale } } }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          name
          category
          subcategory
        }
      }
    }
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { title: { eq: $libraryName } }
    ) {
      body
    }
  }
`;
