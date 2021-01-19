import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import Img from 'gatsby-image';

import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';

import { useHighlight } from '../utils/hooks';

import css from '../styles/templates/ref-template.module.css';
import grid from '../styles/grid.module.css';

const RefTemplate = ({ data, pageContext, ...props }) => {
  let entry;
  const [show, setShow] = useState(false);
  const ref = useHighlight();
  const intl = useIntl();

  if (data.json !== null) {
    entry = data.json.childJson;
  }

  const link =
    pageContext.libraryName === 'processing'
      ? `/reference/${pageContext.name}.html`
      : `/reference/libraries/${pageContext.libraryName}/${pageContext.name}.html`;

  const examples = data.pdes.edges;
  const images = data.images.edges;

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
      {data.json !== null ? (
        <div
          className={classnames(
            css.root,
            { [css.collapsed]: !show },
            { [css.expanded]: show }
          )}
          ref={ref}>
          <div className={classnames(css.section, grid.grid)}>
            <h4 className={grid.col}>{intl.formatMessage({ id: 'name' })}</h4>
            <h3 className={grid.col}>{entry.name}</h3>
          </div>
          <div className={classnames(css.section, grid.grid)}>
            <h4 className={grid.col}>
              {intl.formatMessage({ id: 'description' })}
            </h4>
            <p
              className={classnames(grid.col, css.description)}
              dangerouslySetInnerHTML={{ __html: entry.description }}></p>
          </div>
          {examples.length > 0 && (
            <div className={classnames(css.section, grid.grid)}>
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
          <div className={classnames(css.section, grid.grid)}>
            <h4 className={grid.col}>{intl.formatMessage({ id: 'syntax' })}</h4>
            <ul className={classnames(grid.col, css.list)}>
              {entry.syntax.map((syn, key) => {
                return (
                  <li key={'s' + key}>
                    <code>{syn}</code>
                  </li>
                );
              })}
            </ul>
          </div>
          {entry.parameters.length > 0 && (
            <div className={classnames(css.section, grid.grid)}>
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
                      <span className={grid.col}>
                        {param.type + ': ' + param.description}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {entry.returns && (
            <div className={classnames(css.section, grid.grid)}>
              <h4 className={grid.col}>
                {intl.formatMessage({ id: 'return' })}
              </h4>
              <p className={grid.col}>
                <code>{entry.returns}</code>
              </p>
            </div>
          )}
          {entry.inUse && (
            <div className={classnames(css.section, grid.grid)}>
              <h4 className={grid.col}>
                {intl.formatMessage({ id: 'inUse' })}
              </h4>
              <ul className={classnames(grid.col, grid.nest, css.list)}>
                {entry.inUse.map((inUse, key) => (
                  <li key={key + 'rel'}>
                    <a href={inUse + '.html'} className={grid.col}>
                      {inUse.replace(/_/g, '()')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {entry.related.length > 0 && (
            <div className={classnames(css.section, grid.grid)}>
              <h4 className={grid.col}>
                {intl.formatMessage({ id: 'related' })}
              </h4>
              <ul className={classnames(grid.col, grid.nest, css.list)}>
                {entry.related.map((rel, key) => (
                  <li key={key + 'rel'}>
                    <a href={rel + '.html'} className={grid.col}>
                      {rel.replace(/_/g, '()')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={classnames(css.section, grid.grid)}>
            <div className={classnames(grid.col, css.license)}>
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
          name
          brief
          category
          subcategory
          syntax
          parameters {
            name
            description
          }
          related
          returns
        }
      }
    }
  }
`;
