import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';

import Img from 'gatsby-image';

import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';

import css from '../styles/tutorials/ref-template.module.css';
import grid from '../styles/grid.module.css';

const RefTemplate = ({ data, pageContext }) => {
  let entry;
  const [show, setShow] = useState(false);
  const examples = data.pdes.edges;
  const images = data.images.edges;

  if (data.json !== null) {
    entry = data.json.childJson;
  }

  const link =
    pageContext.libraryName === 'processing'
      ? `/reference/${pageContext.name}.html`
      : `/reference/libraries/${pageContext.libraryName}/${pageContext.name}.html`;

  const toggleSidebar = (show) => {
    setShow(show);
  };

  return (
    <Layout>
      <Sidebar refs={data.refs} onChange={toggleSidebar} show={show} />
      {data.json !== null ? (
        <div
          className={classnames(grid.grid, css.root)}
          style={{ marginLeft: show ? '150px' : '50px' }}>
          <h4 className={grid.col1}>Name</h4>
          <h3 className={grid.col6}>{entry.name}</h3>
          <h4 className={grid.col1}>Description</h4>
          <p className={grid.col6}>{entry.description}</p>
          {examples.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={grid.col1}>Examples</h4>
              <ul className={classnames(grid.col6, css.list)}>
                {examples.map((edge, key) => {
                  const img = images.filter(
                    (img) => img.node.name === edge.node.name
                  );
                  return (
                    <li key={'ex' + key} className={grid.col4}>
                      <p>
                        {edge.node.name}
                        {edge.node.internal.content}
                      </p>
                      <Img fixed={img.node.childImageSharp.fixed} />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {!entry.related.length > 0 && (
            <>
              <h4 className={grid.col1}>Related</h4>
              <ul className={classnames(grid.col6, css.list)}>
                {entry.related.map((rel, key) => (
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
    refs: allFile(
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
