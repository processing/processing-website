import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { useIntl } from 'react-intl';
import classnames from 'classnames';

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


const sortOrderIntl = {
  Structure: [],
  Environment: [],
  Data: [
    '',
    'String Functions',
    'Array Functions'
  ],
  Control: [
    '',
    'Relational Operators',
  ],
  Shape: [
    '',
    '2D Primitives',
    'Curves'
  ],
  Color: ['', 'Setting', 'Creating & Reading'],
  Math: [
    '',
    'Operators',
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
  console.log("omar imprimiendo locale");
  console.log(intl.locale);
  console.log(categories.toString());
  console.log("search term" + searchTerm.toString());
  console.log("data " );
  console.log( Object.keys(sortOrder));

  return (
    <Layout>
      <Helmet>
        <title>{intl.formatMessage({ id: 'referenceTitle' })}</title>
      </Helmet>
      <div className={classnames(grid.container, grid.grid)}>
        <h1 className={classnames(grid.col, css.heading)}>
          {intl.formatMessage({ id: 'references' })}
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
  query ($locale: String!){
    items: allFile(
      filter: {
        fields: { lang: { eq: $locale  }, lib: { eq: "processing" } }
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
