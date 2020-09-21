import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';

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

  let examples = data.allFile.edges.filter(
    (edge) => edge.node.extension === 'pde'
  );

  let images = data.allFile.edges.filter(
    (edge) => edge.node.extension === 'png'
  );

  console.log(images);

  return (
    <Layout>
      {data.json !== null ? (
        <div className={classnames(grid.grid, css.root)}>
          <h4 className={grid.col1}>Name</h4>
          <h3 className={grid.col6}>{ref.name}</h3>
          <h4 className={grid.col1}>Description</h4>
          <p className={grid.col6}>{ref.description}</p>
          {data.allFile.edges == '' ? (
            ''
          ) : (
            <>
              <h4 className={grid.col1}>Examples</h4>
              <ul className={classnames(grid.col6, css.list)}>
                {examples.map((ex, key) => {
                  let img = images.filter(
                    (img) => img.node.name === ex.node.name
                  );
                  return (
                    <li key={'ex' + key} className={grid.col6}>
                      <pre className={grid.col4}>
                        {ex.node.internal.content}
                      </pre>
                      {img ? (
                        <Img fixed={img[0].node.childImageSharp.fixed} />
                      ) : (
                        ''
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          <h4 className={grid.col1}>Syntax</h4>
          <ul className={classnames(grid.col6, css.list)}>
            {ref.syntax.map((syn, key) => {
              return (
                <li key={'s' + key} className={grid.col6}>
                  {syn}
                </li>
              );
            })}
          </ul>
          {ref.parameters == '' ? (
            ''
          ) : (
            <>
              <h4 className={grid.col1}>Parameters</h4>
              <ul className={classnames(grid.col6, css.list)}>
                {ref.parameters.map((param, key) => {
                  return (
                    <li key={'param' + key} className={grid.col6}>
                      <span className={grid.col1}>{param.name}</span>
                      <span className={grid.col6}>
                        {param.type + ': ' + param.description}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          <h4 className={grid.col1}>Return</h4>
          <p className={grid.col6}>{ref.returns}</p>
          {ref.related == '' ? (
            ''
          ) : (
            <>
              <h4 className={grid.col1}>Related</h4>
              <ul className={classnames(grid.col6, css.list)}>
                {ref.related.map((rel, key) => (
                  <li key={key + 'rel'} className={grid.col6}>
                    <a href={rel + '.html'} className={grid.col1}>
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
