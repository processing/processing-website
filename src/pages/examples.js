import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';
import ExamplesList from '../components/ExamplesList';
import Searchbar from '../components/Searchbar';

import { filterItems, organizeExampleItems } from '../utils/data';

import grid from '../styles/grid.module.css';

const Examples = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const intl = useIntl();

  const items = data.examples.nodes;
  const images = data.images.nodes;

  const tree = useMemo(
    () => organizeExampleItems(filterItems(items, searchTerm), images),
    [items, searchTerm, images]
  );

  return (
    <Layout>
      <Helmet>
        <title>{'Examples'}</title>
      </Helmet>
      <div className={grid.grid}>
        <h1 className={grid.col8}>Examples</h1>
        <h3 className={grid.col3}>
          {intl.formatMessage({ id: 'examplesIntro' })}
        </h3>
        <Searchbar
          placeholder={intl.formatMessage({ id: 'examplesSearch' })}
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
