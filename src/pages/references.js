import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import ReferenceList from '../components/ReferenceList';

const References = ({ data }) => {
  return (
    <Layout>
      <h1>References</h1>
      <ReferenceList data={data} library={'processing'} />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
};

export default References;

export const query = graphql`
  query {
    allFile(
      filter: { fields: { lang: { eq: "en" }, lib: { eq: "processing" } } }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          category
          subcategory
          name
        }
      }
    }
  }
`;
