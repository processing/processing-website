import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import Img from 'gatsby-image';

import Layout from '../components/Layout';
import { useLocalization } from 'gatsby-theme-i18n';

import css from '../styles/tutorials/ref-template.module.css';
import grid from '../styles/grid.module.css';

const RefTemplate = ({ data, pageContext }) => {
  let ref, link;
  const { locale } = useLocalization();

  if (data.json !== null) {
    ref = data.json.childJson;
  }

  if (pageContext.libraryName === 'processing') {
    link = '/reference/' + pageContext.name + '.html';
  } else {
    link =
      '/reference/libraries/' +
      pageContext.libraryName +
      '/' +
      pageContext.name +
      '.html';
  }

  return (
    <Layout>
      {data.json !== null ? (
        <div className={grid.grid}>
          <h4 className={grid.col1}>Name</h4>
          <h3 className={grid.col6}>{ref.name}</h3>
          <h4 className={grid.col1}>Description</h4>
          <p className={grid.col6}>{ref.description}</p>
          <h4 className={grid.col1}>Examples</h4>
          <div className={grid.col6}>
            <ul className={css.list}>
              {data.allFile.edges.map((edge, key) => {
                return (
                  <li key={'ex' + key} className={grid.col4}>
                    {edge.node.extension === 'pde' && (
                      <p>{edge.node.internal.content}</p>
                    )}
                    {edge.node.extension === 'png' && (
                      <Img fixed={edge.node.childImageSharp.fixed} />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <h4 className={grid.col1}>Syntax</h4>
          <p className={grid.col6}>
            {ref.syntax.map((syn, key) => {
              return (
                <span key={'s' + key} className={grid.col6}>
                  {syn}
                </span>
              );
            })}
          </p>
          <h4 className={grid.col1}>Parameters</h4>
          <div className={grid.col6}>
            {ref.parameters.map((param, key) => {
              return (
                <p key={'param' + key}>
                  <span className={grid.col1}>{param.name}</span>
                  <span className={grid.col1}>{param.type}</span>
                  <span className={grid.col4}>{param.description}</span>
                </p>
              );
            })}
          </div>
          <h4 className={grid.col1}>Return</h4>
          <p className={grid.col6}>{ref.returns}</p>
          <h4 className={grid.col1}>Related</h4>
          <p className={grid.col6}>
            {ref.related.map((rel) => (
              <span className={grid.col6}>{rel.replace(/_/g, '()')}</span>
            ))}
          </p>
        </div>
      ) : (
        <div>
          This page is not translated, please refer to the
          <Link to={link}> english page</Link>
        </div>
      )}
    </Layout>
  );
};

export default RefTemplate;

export const query = graphql`
  query($name: String!, $assetsName: String!, $locale: String!) {
    json: file(fields: { name: { eq: $name }, lang: { eq: $locale } }) {
      childJson {
        name
        description
        syntax
        parameters {
          name
          description
          type
        }
        related
        returns
      }
    }
    allFile(filter: { relativeDirectory: { eq: $assetsName } }) {
      edges {
        node {
          name
          internal {
            content
          }
          extension
          childImageSharp {
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
