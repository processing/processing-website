import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import CopyButton from '../../components/CopyButton';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import Section from '../../components/ReferenceItemSection';
import List from '../../components/ReferenceItemList';

import { useHighlight, useWindowSize, useTree } from '../../hooks';
import { usePreparedReferenceItems } from '../../hooks/reference';
import { referencePath, pathToName } from '../../utils/paths';

import css from '../../styles/templates/ref-template.module.css';
import grid from '../../styles/grid.module.css';

const ClassRefTemplate = ({ data, pageContext }) => {
  const { width } = useWindowSize();
  const [show, setShow] = useState(width > 960 ? true : false);
  const images = data.images.edges;
  const examples = data.pdes.edges;
  const ref = useHighlight();
  const intl = useIntl();

  const items = usePreparedReferenceItems(data.items.nodes);
  const tree = useTree(items);

  const { name, libraryName } = pageContext;
  const entry = data?.json?.childJson;
  const isProcessing = libraryName === 'processing';

  return (
    <Layout withSidebar>
      <Helmet>
        <title>
          {name} / {isProcessing ? 'Reference' : 'Libraries'}
        </title>
      </Helmet>
      <div className={classnames(css.root, grid.grid, grid.rightBleed)}>
        {isProcessing && (
          <Sidebar
            tree={tree}
            setShow={setShow}
            show={show}
            type={'reference'}
          />
        )}
        {entry ? (
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
                { [css.collapsed]: !show },
                grid.nest
              )}>
              <Section
                title={intl.formatMessage({ id: 'className' })}
                collapsed={!show}>
                <h3>{entry.name}</h3>
              </Section>
              <Section
                title={intl.formatMessage({ id: 'description' })}
                collapsed={!show}>
                <p
                  className={css.description}
                  dangerouslySetInnerHTML={{ __html: entry.description }}
                />
              </Section>
              {examples.length > 0 && (
                <Section
                  title={intl.formatMessage({ id: 'examples' })}
                  collapsed={!show}>
                  <ul className={css.list}>
                    {examples.map((ex, key) => {
                      const img = images.find(
                        (img) => img.node.name === ex.node.name
                      );
                      return (
                        <li key={'ex' + key} className={css.example}>
                          <div
                            className={classnames(grid.col, css.exampleCode)}>
                            <CopyButton text={ex.node.internal.content} />
                            <pre className={css.codeBlock}>
                              {ex.node.internal.content
                                .split(/\r?\n/)
                                .map((line, i) => (
                                  <code key={`line-${i}`}>{line}</code>
                                ))}
                            </pre>
                          </div>
                          {img && (
                            <div
                              className={classnames(
                                grid.col,
                                css.exampleImage
                              )}>
                              <Img fixed={img.node.childImageSharp.fixed} />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </Section>
              )}
              {entry.constructors && entry.constructors.length > 0 && (
                <Section
                  title={intl.formatMessage({ id: 'constructors' })}
                  collapsed={!show}>
                  <List nameIsHtml nameIsPath items={entry.constructors} />
                </Section>
              )}
              {entry.classFields && entry.classFields.length > 0 && (
                <Section
                  title={intl.formatMessage({ id: 'fields' })}
                  collapsed={!show}>
                  <List
                    nameIsHtml
                    items={entry.classFields.map((field) => ({
                      name: field.name,
                      description: field.desc,
                      anchor: referencePath(field.anchor, libraryName),
                    }))}
                  />
                </Section>
              )}
              {entry.parameters && entry.parameters.length > 0 && (
                <Section
                  title={intl.formatMessage({ id: 'parameters' })}
                  collapsed={!show}>
                  <List variant="parameters" items={entry.parameters} />
                </Section>
              )}
              {entry.methods && entry.methods.length > 0 && (
                <Section
                  title={intl.formatMessage({ id: 'methods' })}
                  collapsed={!show}>
                  <List
                    descriptionIsHtml
                    items={entry.methods.map((method) => ({
                      name: method.name,
                      description: method.desc,
                      anchor: referencePath(method.anchor, libraryName),
                    }))}
                  />
                </Section>
              )}
              {entry.related && entry.related.length > 0 && (
                <Section
                  title={intl.formatMessage({ id: 'related' })}
                  collapsed={!show}>
                  <List
                    items={entry.related.map((rel) => ({
                      name: pathToName(rel),
                      anchor: referencePath(rel, libraryName),
                    }))}
                  />
                </Section>
              )}
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
              <Link to={referencePath(name, libraryName)}>
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

export default ClassRefTemplate;

export const query = graphql`
  query($name: String!, $relDir: String!, $locale: String!) {
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
        relativeDirectory: { eq: $relDir }
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
        relativeDirectory: { eq: $relDir }
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
