import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';

import Img from 'gatsby-image';

import Layout from '../components/Layout';

import css from '../styles/tutorials/ref-template.module.css';
import grid from '../styles/grid.module.css';

const RefTemplate = ({ data, pageContext }) => {
  let ref, link;

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
        <div className={classnames(grid.grid, css.root)}>
          <h4 className={grid.col1}>Name</h4>
          <h3 className={grid.col6}>{ref.name}</h3>
          <h4 className={grid.col1}>Description</h4>
          <p className={grid.col6}>{ref.description}</p>
          {!data.allFile.edges.length ? (
            ''
          ) : (
            <>
              <h4 className={grid.col1}>Examples</h4>
              <ul className={classnames(grid.col6, css.list)}>
                {data.allFile.edges.map((edge, key) => {
                  return (
                    <li key={'ex' + key} className={grid.col4}>
                      {edge.node.extension === 'pde' && (
                        <p>
                          {edge.node.name}
                          {edge.node.internal.content}
                        </p>
                      )}
                      {edge.node.extension === 'png' && (
                        <Img fixed={edge.node.childImageSharp.fixed} />
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {!ref.related.length ? (
            ''
          ) : (
            <>
              <h4 className={grid.col1}>Related</h4>
              <ul className={classnames(grid.col6, css.list)}>
                {ref.related.map((rel, key) => (
                  <li key={key + 'rel'} className={grid.col2}>
                    <a href={rel + '.html'} className={grid.col2}>
                      {rel.replace(/_/g, '()')}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
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
