import React, { useState, useMemo } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Tabs from '../components/Tabs';

import { filterItems, organizeExampleItems } from '../utils/data';

import css from '../styles/pages/example.module.css';
import grid from '../styles/grid.module.css';

const ExampleTemplate = ({ data, pageContext }) => {
  const { json, pdes, examples } = data;
  const [show, setShow] = useState(false);

  const mainPde = pdes.nodes.find((pde) => pde.name === pageContext.name);

  const orderedPdes = pdes.nodes.filter((pde) => pde.name !== pageContext.name);

  orderedPdes.unshift(mainPde);

  const subcategory = json.relativeDirectory.split('/')[1];

  const related = examples.nodes.filter(
    (item) => item.relativeDirectory.split('/')[1] === subcategory
  );

  const toggleSidebar = (show) => {
    setShow(show);
  };

  return (
    <Layout>
      <Sidebar
        items={examples}
        onChange={toggleSidebar}
        show={show}
        type={'examples'}
      />
      {json !== null ? (
        <div
          className={classnames(
            css.root,
            {
              [grid.push2]: show,
            },
            {
              [grid.push1]: !show,
            },
            grid.grid
          )}>
          <div className={classnames(css.section, grid.nest, grid.push1)}>
            <h1 className={grid.col4}>{json.childJson.title}</h1>
            {json.childJson.author && (
              <h3 className={grid.col4}>by {json.childJson.author}</h3>
            )}
            <div className={grid.col4}>{json.childJson.description}</div>
            <div className={grid.col2}>
              <h3>Featured functions</h3>
              <ul>
                {json.childJson.featured.map((feature, key) => (
                  <li key={key + 'f'}>
                    <Link to={feature}>{feature}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <Tabs pdes={orderedPdes} />
            <div className={grid.col4}>
              <h3>Relate examples</h3>
              <ul className={css.related}>
                {related.map((rel, key) => {
                  return (
                    rel.relativeDirectory !== pageContext.relDir && (
                      <li key={key + 'rel'}>
                        <Link to={'../' + rel.name.toLowerCase() + '.html'}>
                          {rel.name}
                        </Link>
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
            <p className={grid.col6}>
              This example is for Processing 3+. If you have a previous version,
              use the examples included with your software. If you see any
              errors or have suggestions, please{' '}
              <a
                href={
                  'https://github.com/processing/processing-docs/issues?state=open'
                }>
                let us know
              </a>
              .
            </p>
          </div>
        </div>
      ) : (
        <div style={{ marginLeft: show ? '350px' : '50px' }}>
          This page is not translated, please refer to the
          <Link to={pageContext.slug}> english page</Link>
        </div>
      )}
    </Layout>
  );
};

export default ExampleTemplate;

export const query = graphql`
  query($locale: String!, $name: String!, $relDir: String!) {
    json: file(fields: { name: { eq: $name }, lang: { eq: $locale } }) {
      relativeDirectory
      childJson {
        name
        title
        author
        description
        featured
      }
    }
    pdes: allFile(
      filter: {
        relativeDirectory: { eq: $relDir }
        extension: { regex: "/(pde)/" }
      }
    ) {
      nodes {
        name
        internal {
          content
        }
      }
    }
    examples: allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        fields: { lang: { eq: "en" } }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          name
          title
        }
      }
    }
  }
`;
