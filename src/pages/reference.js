import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import Layout from '../components/Layout';
import CategoryNav from '../components/CategoryNav';
import ReferenceList from '../components/ReferenceList';

const Reference = ({ data }) => {
  return (
    <Layout>
      <h1>References</h1>
      <CategoryNav data={data} />
      <ReferenceList data={data} library={'processing'} />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
};

export default Reference;

export const query = graphql`
  query {
    allFile(
      filter: {
        fields: { lang: { eq: "en" }, lib: { eq: "processing" } }
        childJson: { type: { ne: "method" } }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          category
          subcategory
          name
          brief
        }
      }
    }
  }
`;
