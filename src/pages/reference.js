import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { useIntl } from 'react-intl';

import CategoryNav from '../components/CategoryNav';
import Donate from '../components/character/Donate';
import Layout from '../components/Layout';
import ReferenceList from '../components/ReferenceList';
import FilterBar from '../components/FilterBar';

import { useTree, useFilteredTree } from '../hooks';
import { usePreparedReferenceItems } from '../hooks/reference';

import grid from '../styles/grid.module.css';

const Reference = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const intl = useIntl();

  const items = usePreparedReferenceItems(data.items.nodes);
  const tree = useTree(items);
  const filtered = useFilteredTree(tree, searchTerm);
  const categories = Object.keys(tree);

  return (
    <Layout>
      <Helmet>
        <title>Reference</title>
      </Helmet>
      <div className={grid.grid}>
        <h1 className={grid.col} style={{ flexBasis: '100%' }}>
          {intl.formatMessage({ id: 'references' })}
        </h1>
        <Donate />
        <FilterBar
          placeholder={intl.formatMessage({ id: 'referencesFilter' })}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={(e) => setSearchTerm('')}
          searchTerm={searchTerm}
          large
        />
        {!searchTerm && <CategoryNav categories={categories} />}
        <ReferenceList tree={filtered} />
      </div>
    </Layout>
  );
};

export default Reference;

export const query = graphql`
  query {
    items: allFile(
      filter: {
        fields: { lang: { eq: "en" }, lib: { eq: "processing" } }
        childJson: { type: { nin: ["method", "field"] } }
      }
    ) {
      nodes {
        name
        childJson {
          name
          brief
          category
          subcategory
        }
      }
    }
  }
`;
