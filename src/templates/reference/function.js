import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import Img from 'gatsby-image';

import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import Section from '../../components/ReferenceItemSection';
import { CodeList, ExampleList } from '../../components/ReferenceItemList';

import { useTree, useHighlight, useWindowSize } from '../../hooks';
import { usePreparedItems, usePreparedExamples } from '../../hooks/reference';
import { referencePath } from '../../utils/paths';

import css from '../../styles/templates/ref-template.module.css';
import grid from '../../styles/grid.module.css';

const RefTemplate = ({ data, pageContext, ...props }) => {
  const { width } = useWindowSize();
  const [show, setShow] = useState(width > 960 ? true : false);
  const ref = useHighlight();
  const intl = useIntl();

  const items = usePreparedItems(data.items.nodes);
  const examples = usePreparedExamples(data.pdes.edges, data.images.edges);
  const tree = useTree(items);

  const isProcessing = pageContext.libraryName === 'processing';
  const entry = data?.json?.childJson;

  return (
    <Layout withSidebar>
      <Helmet>
        <title>
          {entry?.name ?? ''}
          {' / '}
          {isProcessing ? 'Reference' : 'Libraries'}
        </title>
      </Helmet>
      <div className={classnames(css.root, grid.nest, grid.rightBleed)}>
        {isProcessing && (
          <Sidebar tree={tree} setShow={setShow} show={show} type="reference" />
        )}
        {entry ? (
          <div
            className={classnames(css.wrapper, { [css.collapsed]: !show })}
            ref={ref}>
            <div
              className={classnames(
                css.content,
                { [css.collapsed]: !show },
                grid.nest
              )}>
              <Section
                title={intl.formatMessage({ id: 'name' })}
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
                  columns={false}
                  title={intl.formatMessage({ id: 'examples' })}
                  collapsed={!show}>
                  <ExampleList examples={examples} />
                </Section>
              )}
              <Section
                title={intl.formatMessage({ id: 'syntax' })}
                collapsed={!show}>
                <CodeList items={entry.syntax} />
              </Section>
              {entry.parameters &&
                entry.parameters.length > 0 &&
                entry.parameters[0] != null && (
                  <Section
                    title={intl.formatMessage({ id: 'parameters' })}
                    collapsed={!show}>
                    <CodeList variant="parameters" items={entry.parameters} />
                  </Section>
                )}
              {entry.returns && (
                <Section
                  title={intl.formatMessage({ id: 'return' })}
                  collapsed={!show}>
                  <CodeList items={[entry.returns]} />
                </Section>
              )}
              {entry.inUse && (
                <Section
                  title={intl.formatMessage({ id: 'inUse' })}
                  collapsed={!show}>
                  <CodeList
                    nameIsPath
                    items={entry.inUse.map((name) => ({
                      name: name,
                      anchor: referencePath(name, pageContext.libraryName),
                    }))}
                  />
                </Section>
              )}
              {entry.related && entry.related.length > 0 && (
                <Section
                  title={intl.formatMessage({ id: 'related' })}
                  collapsed={!show}>
                  <CodeList
                    nameIsPath
                    items={entry.related.map((name) => ({
                      name: name,
                      anchor: referencePath(name, pageContext.libraryName),
                    }))}
                  />
                </Section>
              )}
              <div className={css.license}>
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
              <Link
                to={referencePath(pageContext.name, pageContext.libraryName)}>
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

export default RefTemplate;

export const query = graphql`
  query($name: String!, $relDir: String!, $locale: String!) {
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
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid
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
