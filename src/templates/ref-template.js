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

  return (
    <Layout>
      {data.json !== null ? (
        <div className={css.root}>
          <div className={classnames(css.section, grid.grid)}>
            <h4 className={classnames(grid.col1, grid.push1)}>Name</h4>
            <h3 className={classnames(grid.col4, grid.pull1)}>{ref.name}</h3>
          </div>
          <div className={classnames(css.section, grid.grid)}>
            <h4 className={classnames(grid.col1, grid.push1)}>Description</h4>
            <p className={classnames(grid.col4, grid.pull1)}>
              {ref.description}
            </p>
          </div>
          {data.allFile.edges == '' ? (
            ''
          ) : (
            <div className={classnames(css.section, grid.grid)}>
              <h4 className={classnames(grid.col1, grid.push1)}>Examples</h4>
              <ul
                className={classnames(
                  grid.col1,
                  grid.col6,
                  grid.internal,
                  css.list
                )}>
                {examples.map((ex, key) => {
                  let img = images.filter(
                    (img) => img.node.name === ex.node.name
                  );
                  return (
                    <li key={'ex' + key}>
                      <div className={grid.col4}>
                        <pre className={css.codeBlock}>
                          {ex.node.internal.content
                            .split(/\r?\n/)
                            .map((line, i) => (
                              <code key={`line-${i}`}>{line}</code>
                            ))}
                        </pre>
                      </div>
                      {img ? (
                        <div className={grid.col2}>
                          <Img fixed={img[0].node.childImageSharp.fixed} />
                        </div>
                      ) : (
                        ''
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className={classnames(css.section, grid.grid)}>
            <h4 className={classnames(grid.col1, grid.push1)}>Syntax</h4>
            <ul className={classnames(grid.col4, grid.pull1, css.list)}>
              {ref.syntax.map((syn, key) => {
                return (
                  <li key={'s' + key}>
                    <code>{syn}</code>
                  </li>
                );
              })}
            </ul>
          </div>
          {ref.parameters == '' ? (
            ''
          ) : (
            <div className={classnames(css.section, grid.grid)}>
              <h4 className={classnames(grid.col1, grid.push1)}>Parameters</h4>
              <ul
                className={classnames(
                  grid.col4,
                  grid.internal,
                  grid.pull1,
                  css.list
                )}>
                {ref.parameters.map((param, key) => {
                  return (
                    <li key={'param' + key} className={css.param}>
                      <span className={classnames(grid.col1, css.paramName)}>
                        {param.name}
                      </span>
                      <span className={grid.col4}>
                        {param.type + ': ' + param.description}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className={classnames(css.section, grid.grid)}>
            <h4 className={classnames(grid.col1, grid.push1)}>Return</h4>
            <p className={classnames(grid.col4, grid.pull1)}>
              <code>{ref.returns}</code>
            </p>
          </div>
          {ref.inUse ? (
            <div className={classnames(css.section, grid.grid)}>
              <h4 className={classnames(grid.col1, grid.push1)}>In use</h4>
              <ul
                className={classnames(
                  grid.col4,
                  grid.internal,
                  css.list,
                  grid.pull1
                )}>
                {ref.inUse.map((inUse, key) => (
                  <li key={key + 'rel'}>
                    <a href={inUse + '.html'} className={grid.col4}>
                      {inUse.replace(/_/g, '()')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ''
          )}
          {ref.related == '' ? (
            ''
          ) : (
            <div className={classnames(css.section, grid.grid)}>
              <h4 className={classnames(grid.col1, grid.push1)}>Related</h4>
              <ul
                className={classnames(
                  grid.col4,
                  grid.internal,
                  css.list,
                  grid.pull1
                )}>
                {ref.related.map((rel, key) => (
                  <li key={key + 'rel'}>
                    <a href={rel + '.html'} className={grid.col4}>
                      {rel.replace(/_/g, '()')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={classnames(css.section, grid.grid)}>
            <div className={classnames(grid.col6, grid.push1, css.license)}>
              <a
                rel="license"
                href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                <img
                  alt="Creative Commons License"
                  style={{ borderWidth: 0 }}
                  src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"
                />
              </a>
              <p>
                {`This work is licensed under a `}
                <a
                  rel="license"
                  href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                  Creative Commons Attribution-NonCommercial-ShareAlike 4.0
                  International License
                </a>
                .
              </p>
            </div>
          </div>
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
