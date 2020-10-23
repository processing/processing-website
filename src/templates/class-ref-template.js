import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import classnames from 'classnames';

import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';

import css from '../styles/tutorials/ref-template.module.css';
import grid from '../styles/grid.module.css';

const ClassRefTemplate = ({ data, pageContext }) => {
  let entry;
  const [show, setShow] = useState(false);
  const images = data.images.edges;
  const examples = data.pdes.edges;

  if (data.json !== null) {
    entry = data.json.childJson;
  }

  const { constructors, classFields, methods, related } = entry;
  const link =
    pageContext.libraryName === 'processing'
      ? `/reference/${pageContext.name}.html`
      : `/reference/libraries/${pageContext.libraryName}/${pageContext.name}.html`;

  const toggleSidebar = (show) => {
    setShow(show);
  };

  return (
    <Layout>
      {pageContext.libraryName === 'processing' && (
        <Sidebar
          items={data.items}
          onChange={toggleSidebar}
          show={show}
          type={'reference'}
        />
      )}
      {entry ? (
        <div className={css.root}>
          <div
            className={classnames(grid.grid, css.section)}
            style={{ marginLeft: show ? '150px' : '50px' }}>
            <h4 className={classnames(grid.col1, grid.push1)}>Class name</h4>
            <h3 className={classnames(grid.col4, grid.pull1)}>{entry.name}</h3>
          </div>
          <div className={classnames(grid.grid, css.section)}>
            <h4 className={classnames(grid.col1, grid.push1)}>Description</h4>
            <p
              className={classnames(grid.col4, grid.pull1, css.description)}
              dangerouslySetInnerHTML={{ __html: entry.description }}
            />
          </div>
          {examples.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={classnames(grid.col1, grid.push1)}>Examples</h4>
              <ul className={classnames(grid.col4, grid.pull1, css.list)}>
                {examples.map((ex, key) => {
                  const img = images.filter(
                    (img) => img.node.name === ex.node.name
                  );
                  return (
                    <li key={'ex' + key} className={grid.col4}>
                      <p>
                        {ex.node.name}
                        {ex.node.internal.content}
                      </p>
                      <Img fixed={img.node.childImageSharp.fixed} />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {constructors.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={classnames(grid.col1, grid.push1)}>
                Constructors
              </h4>
              <ul className={classnames(grid.col4, grid.pull1, css.list)}>
                {constructors.map((cons, key) => {
                  return (
                    <li key={'f' + key}>
                      <code>{cons}</code>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {classFields.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={classnames(grid.col1, grid.push1)}>Fields</h4>
              <ul className={classnames(grid.col4, grid.pull1, css.list)}>
                {classFields.map((field, key) => {
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
          {methods.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={classnames(grid.col1, grid.push1)}>Methods</h4>
              <ul className={classnames(grid.col5, grid.nest, css.list)}>
                {methods.map((method, key) => {
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
          )}
          {related && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={classnames(grid.col1, grid.push1)}>Related</h4>
              <ul
                className={classnames(
                  grid.col4,
                  grid.pull1,
                  grid.nest,
                  css.list
                )}>
                {related.map((rel, key) => (
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
    images: allFile(
      filter: {
        relativeDirectory: { eq: $assetsName }
        extension: { regex: "/(jpg)|(jpeg)|(png)|(gif)/" }
      }
    ) {
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
    pdes: allFile(
      filter: {
        relativeDirectory: { eq: $assetsName }
        extension: { regex: "/(pde)/" }
      }
    ) {
      edges {
        node {
          name
          internal {
            content
          }
          extension
        }
      }
    }
    items: allFile(
      filter: {
        fields: { lang: { eq: "en" }, lib: { eq: "processing" } }
        childJson: { type: { nin: ["method", "field"] } }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          category
          subcategory
          name
        }
      }
    }
  }
`;
