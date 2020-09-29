import React, { useState, useMemo } from 'react';
import { graphql } from 'gatsby';
import unique from 'array-unique';

import Layout from '../components/Layout';
import CategoryNav from '../components/CategoryNav';
import ReferenceList from '../components/ReferenceList';
import Searchbar from '../components/Searchbar';

import { filterItems } from '../utils/data';

import grid from '../styles/grid.module.css';

const Reference = ({ data }) => {
  let items = data.allFile;
  const [searchTerm, setSearchTerm] = useState('');

  let categories = unique(
    items.nodes.map((item) => {
      return item.childJson.category;
    })
  );

  let filteredItems = items;

  filteredItems = useMemo(() => filterItems(filteredItems, searchTerm), [
    searchTerm,
  ]);

  return (
    <Layout>
      <div className={grid.grid}>
        <h1 className={grid.col8}>References</h1>
        <Searchbar
          placeholder={'Search in the Reference...'}
          onChange={(e) => setSearchTerm(e.target.value)}
          searchTerm={searchTerm}
          className={grid.push1}
          large
        />
        <CategoryNav categories={categories} />
        <ReferenceList data={filteredItems} library={'processing'} />
      </div>
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
