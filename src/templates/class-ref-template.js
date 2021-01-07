import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import { useLocalization } from 'gatsby-theme-i18n';

import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';

import css from '../styles/templates/ref-template.module.css';
import grid from '../styles/grid.module.css';
import { useHighlight } from '../utils/hooks';

const ClassRefTemplate = ({ data, pageContext }) => {
  let entry;
  const [show, setShow] = useState(false);
  const images = data.images.edges;
  const examples = data.pdes.edges;
  const ref = useHighlight();
  const intl = useIntl();
  const { locale } = useLocalization();

  console.log(locale);

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
            <h4 className={classnames(grid.col1, grid.push1)}>
              {intl.formatMessage({ id: 'className' })}
            </h4>
            <h3 className={classnames(grid.col4, grid.pull1)}>{entry.name}</h3>
          </div>
          <div className={classnames(grid.grid, css.section)}>
            <h4 className={classnames(grid.col1, grid.push1)}>
              {intl.formatMessage({ id: 'description' })}
            </h4>
            <p
              className={classnames(grid.col4, grid.pull1, css.description)}
              dangerouslySetInnerHTML={{ __html: entry.description }}
            />
          </div>
          {examples.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={classnames(grid.col1, grid.push1)}>
                {intl.formatMessage({ id: 'examples' })}
              </h4>
              <ul
                className={classnames(
                  grid.col6,
                  grid.push1,
                  grid.nest,
                  css.list
                )}>
                {examples.map((ex, key) => {
                  const img = images.filter(
                    (img) => img.node.name === ex.node.name
                  );
                  return (
                    <li key={'ex' + key} className={css.example}>
                      <div className={grid.col4}>
                        <pre className={css.codeBlock}>
                          {ex.node.internal.content
                            .split(/\r?\n/)
                            .map((line, i) => (
                              <code key={`line-${i}`}>{line}</code>
                            ))}
                        </pre>
                      </div>
                      {img.length > 0 && (
                        <div className={grid.col2}>
                          <Img fixed={img[0].node.childImageSharp.fixed} />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {entry.constructors && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={classnames(grid.col1, grid.push1)}>
                {intl.formatMessage({ id: 'constructors' })}
              </h4>
              <ul className={classnames(grid.col4, grid.pull1, css.list)}>
                {entry.constructors &&
                  entry.constructors.map((cons, key) => {
                    return (
                      <li key={'f' + key}>
                        <code>{cons}</code>
                      </li>
                    );
                  })}
              </ul>
            </div>
          )}
          {entry.classFields.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={classnames(grid.col1, grid.push1)}>
                {intl.formatMessage({ id: 'fields' })}
              </h4>
              <ul className={classnames(grid.col5, grid.nest, css.list)}>
                {entry.classFields.map((field, key) => {
                  return (
                    <li key={'f' + key}>
                      <a href={field.anchor + '.html'} className={grid.col2}>
                        <code>{field.name}</code>{' '}
                      </a>
                      <span className={grid.col3}>{field.desc}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {entry.methods.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={classnames(grid.col1, grid.push1)}>
                {intl.formatMessage({ id: 'methods' })}
              </h4>
              <ul className={classnames(grid.col5, grid.nest, css.list)}>
                {entry.methods.map((method, key) => {
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
          {entry.related.length > 0 && (
            <div className={classnames(grid.grid, css.section)}>
              <h4 className={classnames(grid.col1, grid.push1)}>
                {intl.formatMessage({ id: 'related' })}
              </h4>
              <ul
                className={classnames(
                  grid.col4,
                  grid.pull1,
                  grid.nest,
                  css.list
                )}>
                {entry.related.map((rel, key) => (
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
