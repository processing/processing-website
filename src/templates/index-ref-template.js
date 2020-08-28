import React from 'react';
import { graphql } from 'gatsby';

import { Link } from 'gatsby';

import Layout from '../components/layout';
import ReferenceList from '../components/referenceList';

const IndexRefTemplate = ({ data, pageContext: { libraryName } }) => {
  return (
    <Layout>
      <h1>References</h1>
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
      edges {
        node {
          name
          relativeDirectory
        }
      }
    }
  }
`;
