import React, { useState } from 'react';
import { graphql } from 'gatsby';
import unique from 'array-unique';

import Layout from '../components/Layout';
import CategoryNav from '../components/CategoryNav';
import ReferenceList from '../components/ReferenceList';
import Searchbar from '../components/Searchbar';

const Reference = ({ data }) => {
  let refs = data.allFile;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRefs, setFilteredRefs] = useState(refs);

  let categories = unique(
    refs.nodes.map((ref) => {
      return ref.childJson.category;
    })
  );

  const refreshList = (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm) {
      let newList = { nodes: '' };
      newList.nodes = refs.nodes.filter((ref) =>
        JSON.stringify(ref).includes(searchTerm)
      );
      setFilteredRefs(newList);
    }
  };

  return (
    <Layout>
      <h1>References</h1>
      <Searchbar
        placeholder={'Search in the Reference...'}
        onChange={refreshList}
        searchTerm={searchTerm}
        large
      />
      <CategoryNav categories={categories} />
      <ReferenceList data={filteredRefs} library={'processing'} />
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
          name
          brief
          category
          subcategory
          syntax
          parameters {
            name
            description
          }
          related
          returns
        }
      }
    }
  }
`;
