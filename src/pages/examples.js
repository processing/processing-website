import React, { useMemo, useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import ExamplesList from '../components/ExamplesList';
import Searchbar from '../components/Searchbar';

import { filterItems, organizeExampleItems } from '../utils/data';

import grid from '../styles/grid.module.css';

const Examples = ({ data, location }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const items = data.allFile.nodes;

  const tree = useMemo(
    () => organizeExampleItems(filterItems(items, searchTerm)),
    [items, searchTerm]
  );

  return (
    <Layout>
      <div className={grid.grid}>
        <h1 className={grid.col8}>Examples</h1>
        <h3 className={grid.col3}>
          Short, prototypical programs exploring the basics of programming with
          Processing.
        </h3>
        <Searchbar
          placeholder={'Search in the Examples...'}
          onChange={(e) => setSearchTerm(e.target.value)}
          searchTerm={searchTerm}
          className={grid.push1}
          large
        />
        <ExamplesList data={tree} />
      </div>
    </Layout>
  );
};

export default Examples;

export const query = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        childMdx: { fields: { locale: { eq: "en" } } }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childMdx {
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`;
