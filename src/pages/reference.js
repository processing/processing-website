import React, { useState, useMemo } from 'react';
import { graphql } from 'gatsby';

import CategoryNav from '../components/CategoryNav';
import Donate from '../components/character/Donate';
import Layout from '../components/Layout';
import ReferenceList from '../components/ReferenceList';
import Searchbar from '../components/Searchbar';

import { filterItems, organizeReferenceItems } from '../utils/data';

import grid from '../styles/grid.module.css';

const Reference = ({ data, location }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const items = data.allFile.nodes;

  const tree = useMemo(
    () => organizeReferenceItems(filterItems(items, searchTerm)),
    [items, searchTerm]
  );

  const categories = tree.map((item) => item.name);

  return (
    <Layout>
      <div className={grid.grid}>
        <h1 className={grid.col}>References</h1>
        <Donate />
        <Searchbar
          placeholder={'Search in the Reference...'}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={(e) => setSearchTerm('')}
          searchTerm={searchTerm}
          large
        />
        <CategoryNav categories={categories} />
        <ReferenceList data={tree} />
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
