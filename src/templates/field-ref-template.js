import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import Img from 'gatsby-image';

import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';

import { useHighlight } from '../utils/hooks';

import css from '../styles/templates/ref-template.module.css';
import grid from '../styles/grid.module.css';

const FieldRefTemplate = ({ data, pageContext }) => {
  let entry;
  const [show, setShow] = useState(true);
  const examples = data.pdes.edges;
  const images = data.images.edges;
  const ref = useHighlight();
  const intl = useIntl();

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
    <Layout hasSidebar>
      <div className={classnames(css.root, grid.grid, grid.rightBleed)}>
        {pageContext.libraryName === 'processing' && (
          <Sidebar
            items={data.items}
            onChange={toggleSidebar}
            show={show}
            type={'reference'}
          />
        )}
        {entry !== null ? (
          <div
            className={classnames(
              css.wrapper,
              { [css.collapsed]: !show },
              grid.nest
            )}
            ref={ref}>
            <div
              className={classnames(
                css.content,
                {
                  [css.collapsed]: !show,
                },
                grid.nest
              )}>
              <div className={classnames(css.section, grid.nest)}>
                <h4 className={grid.col}>
                  {intl.formatMessage({ id: 'name' })}
                </h4>
                <h3 className={grid.col}>{entry.name}</h3>
              </div>
              <div className={classnames(css.section, grid.nest)}>
                <h4 className={grid.col}>
                  {intl.formatMessage({ id: 'description' })}
                </h4>
                <p className={classnames(grid.col, css.description)}>
                  {entry.description}
                </p>
              </div>
              {examples.length > 0 && (
                <div className={classnames(grid.nest, css.section)}>
                  <h4 className={grid.col}>
                    {intl.formatMessage({ id: 'examples' })}
                  </h4>
                  <ul className={classnames(grid.col, grid.nest, css.list)}>
                    {examples.map((ex, key) => {
                      const img = images.filter(
                        (img) => img.node.name === ex.node.name
                      );
                      return (
                        <li className={css.example} key={'ex' + key}>
                          <div
                            className={classnames(grid.col, css.exampleCode)}>
                            <pre className={css.codeBlock}>
                              {ex.node.internal.content
                                .split(/\r?\n/)
                                .map((line, i) => (
                                  <code key={`line-${i}`}>{line}</code>
                                ))}
                            </pre>
                          </div>
                          {img.length > 0 && (
                            <div
                              className={classnames(
                                grid.col,
                                css.exampleImage
                              )}>
                              <Img fixed={img[0].node.childImageSharp.fixed} />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {entry.related.length > 0 && (
                <div className={classnames(css.section, grid.nest)}>
                  <h4 className={grid.col}>
                    {intl.formatMessage({ id: 'related' })}
                  </h4>
                  <ul className={classnames(grid.col, grid.nest, css.list)}>
                    {entry.related.map((rel, key) => (
                      <li key={key + 'rel'}>
                        <a href={rel + '.html'} className={grid.col}>
                          <code>{rel.replace(/_/g, '()')}</code>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Footer />
          </div>
        ) : (
          <div
            className={classnames(
              grid.grid,
              { [css.collapsed]: !show },
              { [css.expanded]: show }
            )}>
            <div className={classnames(grid.push1)}>
              {intl.formatMessage({ id: 'notTranslated' })}
              <Link to={link}>
                {' '}
                {intl.formatMessage({ id: 'englishPage' })}
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FieldRefTemplate;

export const query = graphql`
  query($name: String!, $assetsName: String!) {
    json: file(fields: { name: { eq: $name } }) {
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
