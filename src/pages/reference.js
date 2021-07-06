import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { useIntl } from 'react-intl';
import classnames from 'classnames';

import HeadMatter from '../components/HeadMatter';

import Shortcuts from '../components/Shortcuts';
import Donate from '../components/character/Donate';
import Layout from '../components/Layout';
import ReferenceList from '../components/reference/ReferenceList';
import FilterBar from '../components/FilterBar';

import { useTree, useFilteredTree } from '../hooks';
import { usePreparedItems } from '../hooks/reference';

import css from '../styles/pages/reference.module.css';
import grid from '../styles/grid.module.css';

const sortOrder = {
  Structure: [],
  Environment: [],
  Data: [
    '',
    'Primitive',
    'Composite',
    'Conversion',
    'String Functions',
    'Array Functions'
  ],
  Control: [
    '',
    'Relational Operators',
    'Iteration',
    'Conditionals',
    'Logical Operators'
  ],
  Shape: [
    '',
    '2D Primitives',
    'Curves',
    '3D Primitives',
    'Attributes',
    'Vertex',
    'Loading & Displaying'
  ],
  Color: ['', 'Setting', 'Creating & Reading'],
  Image: ['', 'Loading & Displaying', 'Textures', 'Pixels'],
  Typography: ['', 'Loading & Displaying', 'Attributes', 'Metrics'],
  Transform: [],
  'Lights Camera': [
    '',
    'Lights',
    'Camera',
    'Coordinates',
    'Material Properties'
  ],
  Rendering: ['', 'Shaders'],
  Input: ['', 'Mouse', 'Keyboard', 'Files', 'Time & Date'],
  Output: ['', 'Text Area', 'Image', 'Files'],
  Math: [
    '',
    'Operators',
    'Bitwise Operators',
    'Calculation',
    'Trigonometry',
    'Random'
  ],
  Constants: []
};

const Reference = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const intl = useIntl();

  const items = usePreparedItems(data.items.nodes, 'processing');
  const tree = useTree(items, sortOrder);
  const filtered = useFilteredTree(tree, searchTerm);
  const categories = Object.keys(tree);

  return (
    <Layout>
      <HeadMatter
        title={intl.formatMessage({ id: 'reference' })}
        description={intl.formatMessage({ id: 'cardReferenceDescription' })}
      />

      <div className={classnames(grid.container, grid.grid)}>
        <h1 className={classnames(grid.col, css.heading)}>
          {intl.formatMessage({ id: 'reference' })}
        </h1>
        <Donate />
        <div className={classnames(grid.col, css.filter)}>
          <FilterBar
            placeholder={intl.formatMessage({ id: 'referencesFilter' })}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => setSearchTerm('')}
            searchTerm={searchTerm}
            large
          />
        </div>
        {!searchTerm && <Shortcuts categories={categories} />}
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
          type
        }
      }
    }
  }
`;
