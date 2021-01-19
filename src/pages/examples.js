import React, { useMemo, useState } from 'react';
import { graphql } from 'gatsby';
import classnames from 'classnames';

import Donate from '../components/character/Donate';
import ExamplesList from '../components/ExamplesList';
import Layout from '../components/Layout';
import Searchbar from '../components/Searchbar';

import { filterItems, organizeExampleItems } from '../utils/data';

import grid from '../styles/grid.module.css';
import css from '../styles/pages/examples.module.css';

const Examples = ({ data, location }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const items = data.examples.nodes;
  const images = data.images.nodes;

  console.log(data);

  const tree = useMemo(
    () => organizeExampleItems(filterItems(items, searchTerm), images),
    [items, searchTerm]
  );

  return (
    <Layout>
      <div className={classnames(grid.grid, css.root)}>
        <Donate />
        <h1 className={grid.col}>Examples</h1>
        <h3 className={grid.col}>
          Short, prototypical programs exploring the basics of programming with
          Processing.
        </h3>
        <Searchbar
          placeholder={'Search in the Examples...'}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={(e) => setSearchTerm('')}
          searchTerm={searchTerm}
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
    examples: allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        fields: { lang: { eq: "en" } }
      }
      sort: { order: ASC, fields: relativeDirectory }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          name
          title
        }
      }
    }
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        extension: { regex: "/(jpg)|(jpeg)|(png)|(gif)/" }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childImageSharp {
          fluid(maxWidth: 162) {
            base64
            srcWebp
            srcSetWebp
            originalImg
            originalName
          }
        }
      }
    }
  }
`;
