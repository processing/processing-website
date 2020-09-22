import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import classnames from 'classnames';

import Layout from '../components/Layout';

import css from '../styles/tutorials/ref-template.module.css';
import grid from '../styles/grid.module.css';

const ClassRefTemplate = ({ data, pageContext }) => {
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
        <div className={css.root}>
          <div className={classnames(grid.grid, css.section)}>
            <h4 className={classnames(grid.col1, grid.push1)}>Class name</h4>
            <h3 className={classnames(grid.col4, grid.pull1)}>{ref.name}</h3>
          </div>
          <div className={classnames(grid.grid, css.section)}>
            <h4 className={classnames(grid.col1, grid.push1)}>Description</h4>
            <p
              className={classnames(grid.col4, grid.pull1, css.description)}
              dangerouslySetInnerHTML={{ __html: ref.description }}
            />
          </div>
          {data.allFile.edges == '' ? (
            ''
          ) : (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={classnames(grid.col1, grid.push1)}>Examples</h4>
              <ul className={classnames(grid.col4, grid.pull1, css.list)}>
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
            </div>
          )}
          <div className={classnames(grid.grid, css.section)}>
            <h4 className={classnames(grid.col1, grid.push1)}>Constructors</h4>
            <ul className={classnames(grid.col4, grid.pull1, css.list)}>
              {ref.constructors.map((cons, key) => {
                return (
                  <li key={'f' + key}>
                    <code>{cons}</code>
                  </li>
                );
              })}
            </ul>
          </div>
          {ref.classFields == '' ? (
            ''
          ) : (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={classnames(grid.col1, grid.push1)}>Fields</h4>
              <ul className={classnames(grid.col4, grid.pull1, css.list)}>
                {ref.classFields.map((field, key) => {
                  return (
                    <li key={'f' + key}>
                      <a href={field.anchor + '.html'}>{field.name} </a>
                      {field.desc}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className={classnames(grid.grid, css.section)}>
            <h4 className={classnames(grid.col1, grid.push1)}>Methods</h4>
            <ul className={classnames(grid.col5, grid.internal, css.list)}>
              {ref.methods.map((method, key) => {
                return (
                  <li key={'m' + key}>
                    <a href={method.anchor + '.html'} className={grid.col2}>
                      <code>{method.name}</code>
                    </a>
                    <span
                      className={grid.col3}
                      dangerouslySetInnerHTML={{ __html: method.desc }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          {ref.related == '' ? (
            ''
          ) : (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={classnames(grid.col1, grid.push1)}>Related</h4>
              <ul
                className={classnames(
                  grid.col4,
                  grid.pull1,
                  grid.internal,
                  css.list
                )}>
                {ref.related.map((rel, key) => (
                  <li key={key + 'rel'}>
                    <a href={rel + '.html'} className={grid.col1}>
                      {rel.replace(/_/g, '()')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
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

export default ClassRefTemplate;

export const query = graphql`
  query($name: String!, $assetsName: String!, $locale: String!) {
    json: file(fields: { name: { eq: $name }, lang: { eq: $locale } }) {
      childJson {
        name
        description
        constructors
        classFields {
          anchor
          name
          desc
        }
        methods {
          anchor
          name
          desc
        }
        related
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
