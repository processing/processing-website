import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { useIntl } from 'react-intl';
import classnames from 'classnames';

import HeadMatter from '../components/HeadMatter';
import Layout from '../components/Layout';
import Donate from '../components/character/Donate';
import FilterBar from '../components/FilterBar';
import ExamplesList from '../components/examples/ExamplesList';

import { useTree, useFilteredTree } from '../hooks';
import { usePreparedExamples } from '../hooks/examples';

import * as css from '../styles/pages/examples.module.css';
import * as grid from '../styles/grid.module.css';

const Examples = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const intl = useIntl();

  const examples = usePreparedExamples(data.examples.nodes, data.images.nodes);
  const tree = useTree(examples);
  const filtered = useFilteredTree(tree, searchTerm);

  return (
    <Layout>
      <HeadMatter
        title={intl.formatMessage({ id: 'examples' })}
        description={intl.formatMessage({ id: 'examplesIntro' })}
      />
      <div className={classnames(grid.container, grid.grid)}>
        <Donate />
        <div className={classnames(grid.col, css.text)}>
          <h1>Examples</h1>
          <h3>{intl.formatMessage({ id: 'examplesIntro' })}</h3>
        </div>
        <div className={classnames(grid.col, css.filter)}>
          <FilterBar
            placeholder={intl.formatMessage({ id: 'examplesFilter' })}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => setSearchTerm('')}
            searchTerm={searchTerm}
            large
          />
        </div>
        <ExamplesList tree={filtered} />
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
        relativeDirectory: { regex: "/^((?!data).)*$/" }
      }
      sort: { order: ASC, fields: relativeDirectory }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          name
          title
          order
          level
        }
      }
    }
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        extension: { regex: "/(jpg)|(jpeg)|(png)|(gif)/" }
        relativeDirectory: { regex: "/^((?!data).)*$/" }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
