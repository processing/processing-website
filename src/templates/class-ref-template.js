import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';

import css from '../styles/templates/ref-template.module.css';
import grid from '../styles/grid.module.css';
import { useHighlight } from '../utils/hooks';

const ClassRefTemplate = ({ data, pageContext }) => {
  let entry;
  const [show, setShow] = useState(true);
  const images = data.images.edges;
  const examples = data.pdes.edges;
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
    <Layout>
      {pageContext.libraryName === 'processing' && (
        <Sidebar
          items={data.items}
          onChange={toggleSidebar}
          show={show}
          type={'reference'}
        />
      )}
      {data.json ? (
        <div
          className={classnames(
            css.root,
            { [css.collapsed]: !show },
            { [css.expanded]: show }
          )}
          ref={ref}>
          <div className={classnames(grid.grid, css.section)}>
            <h4 className={grid.col}>
              {intl.formatMessage({ id: 'className' })}
            </h4>
            <h3 className={grid.col}>{entry.name}</h3>
          </div>
          <div className={classnames(grid.grid, css.section)}>
            <h4 className={grid.col}>
              {intl.formatMessage({ id: 'description' })}
            </h4>
            <p
              className={classnames(grid.col, css.description)}
              dangerouslySetInnerHTML={{ __html: entry.description }}
            />
          </div>
          {examples.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={grid.col}>
                {intl.formatMessage({ id: 'examples' })}
              </h4>
              <ul className={classnames(grid.col, grid.nest, css.list)}>
                {examples.map((ex, key) => {
                  const img = images.filter(
                    (img) => img.node.name === ex.node.name
                  );
                  return (
                    <li key={'ex' + key} className={css.example}>
                      <div className={classnames(grid.col, css.exampleCode)}>
                        <pre className={css.codeBlock}>
                          {ex.node.internal.content
                            .split(/\r?\n/)
                            .map((line, i) => (
                              <code key={`line-${i}`}>{line}</code>
                            ))}
                        </pre>
                      </div>
                      {img.length > 0 && (
                        <div className={classnames(grid.col, css.exampleImage)}>
                          <Img fixed={img[0].node.childImageSharp.fixed} />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {entry.constructors && entry.constructors.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={grid.col}>
                {' '}
                {intl.formatMessage({ id: 'constructors' })}
              </h4>
              <ul className={classnames(grid.col, css.list)}>
                {entry.constructors.map((cons, key) => {
                  return (
                    <li key={'f' + key}>
                      <code>{cons}</code>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {entry.classFields && entry.classFields.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={grid.col}>
                {intl.formatMessage({ id: 'fields' })}
              </h4>
              <ul className={classnames(grid.col, grid.nest, css.list)}>
                {entry.classFields.map((field, key) => {
                  return (
                    <li key={'f' + key}>
                      <a
                        href={field.anchor + '.html'}
                        className={classnames(grid.col, css.item)}>
                        <code>{field.name}</code>{' '}
                      </a>
                      <span
                        className={classnames(grid.col, css.itemDescription)}>
                        {field.desc}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {entry.parameters && entry.parameters.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={grid.col}>
                {intl.formatMessage({ id: 'parameters' })}
              </h4>
              <ul className={classnames(grid.col, grid.nest, css.list)}>
                {entry.parameters.map((param, key) => {
                  return (
                    <li key={'param' + key} className={css.param}>
                      <span className={classnames(grid.col, css.paramName)}>
                        {param.name}
                      </span>
                      <span className={grid.col}>{param.description}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {entry.methods && entry.methods.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={grid.col}>
                {intl.formatMessage({ id: 'methods' })}
              </h4>
              <ul className={classnames(grid.col, grid.nest, css.list)}>
                {entry.methods.map((method, key) => {
                  return (
                    <li key={'m' + key}>
                      <a
                        href={method.anchor + '.html'}
                        className={classnames(grid.col, css.item)}>
                        <code>{method.name}</code>
                      </a>
                      <span
                        className={classnames(grid.col, css.itemDescription)}
                        dangerouslySetInnerHTML={{ __html: method.desc }}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {entry.related && entry.related.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
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
      ) : (
        <div
          className={classnames(
            grid.grid,
            { [css.collapsed]: !show },
            { [css.expanded]: show }
          )}>
          <div className={classnames(grid.push1)}>
            {intl.formatMessage({ id: 'notTranslated' })}
            <Link to={link}> {intl.formatMessage({ id: 'englishPage' })}</Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ClassRefTemplate;

export const query = graphql`
  query($name: String!, $assetsName: String!, $locale: String!) {
    json: file(
      fields: { name: { eq: $name }, lang: { eq: $locale } }
      sourceInstanceName: { eq: "json" }
    ) {
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
        parameters {
          name
          description
        }
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
