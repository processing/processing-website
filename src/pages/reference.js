import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import unique from 'array-unique';

import Layout from '../components/Layout';
import CategoryNav from '../components/CategoryNav';
import ReferenceList from '../components/ReferenceList';
import Searchbar from '../components/Searchbar';

const Reference = ({ data }) => {
  let refs = data.allFile.nodes;

  let categories = unique(
    refs.map((ref) => {
      return ref.childJson.category;
    })
  );
  return (
    <Layout>
      <h1>References</h1>
      <Searchbar placeholder={'Search in the Reference...'} large />
      <CategoryNav categories={categories} />
      <ReferenceList data={data.allFile} library={'processing'} />
    </Layout>
  );
};

export default Reference;

export const query = graphql`
  query {
    allFile(
      filter: {
        fields: { lang: { eq: "en" }, lib: { eq: "processing" } }
        childJson: { type: { nin: ["method", "field"] } }
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
