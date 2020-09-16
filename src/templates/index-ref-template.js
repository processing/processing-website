import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import ReferenceList from '../components/ReferenceList';

const IndexRefTemplate = ({ data, pageContext: { libraryName } }) => {
  let link;

  if (libraryName === 'processing') {
    link = '/reference/';
  } else {
    link = '/reference/libraries/' + libraryName + '/index.html';
  }

  return (
    <Layout>
      {data.mdx !== null ? (
        <div>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
          <ReferenceList data={data} library={libraryName} />
        </div>
      ) : (
        <div>
          This page is not translated, please refer to the
          <Link to={link}> english page</Link>
        </div>
      )}

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
