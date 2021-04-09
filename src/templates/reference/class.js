import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import CopyButton from '../../components/CopyButton';
import Layout from '../../components/Layout';
import Content from '../../components/ReferenceItemContent';
import Sidebar from '../../components/Sidebar';
import Section from '../../components/ReferenceItemSection';
import License from '../../components/ReferenceLicense';
import { CodeList, ExampleList } from '../../components/ReferenceItemList';

import { useHighlight, useWindowSize, useTree } from '../../hooks';
import { usePreparedItems, usePreparedExamples } from '../../hooks/reference';
import { referencePath, pathToName } from '../../utils/paths';

import grid from '../../styles/grid.module.css';

const ClassRefTemplate = ({ data, pageContext }) => {
  const { name, libraryName } = pageContext;
  const entry = data?.json?.childJson;
  const isProcessing = libraryName === 'processing';

  const { width } = useWindowSize();
  const [show, setShow] = useState(width > 960 && isProcessing ? true : false);
  const ref = useHighlight();
  const intl = useIntl();

  const items = usePreparedItems(data.items.nodes);
  const examples = usePreparedExamples(data.pdes.edges, data.images.edges);
  const tree = useTree(items);

  return (
    <Layout withSidebar>
      <Helmet>
        <title>
          {name} / {isProcessing ? 'Reference' : 'Libraries'}
        </title>
      </Helmet>
      <div className={grid.grid}>
        {isProcessing && (
          <Sidebar
            tree={tree}
            setShow={setShow}
            show={show}
            type={'reference'}
          />
        )}
        {entry ? (
          <Content collapsed={!show}>
            <Section title={intl.formatMessage({ id: 'className' })}>
              <h3>{entry.name}</h3>
            </Section>
            <Section title={intl.formatMessage({ id: 'description' })}>
              <p dangerouslySetInnerHTML={{ __html: entry.description }} />
            </Section>
            {examples.length > 0 && (
              <Section
                columns={false}
                title={intl.formatMessage({ id: 'examples' })}>
                <ExampleList examples={examples} />
              </Section>
            )}
            {entry.constructors && entry.constructors.length > 0 && (
              <Section title={intl.formatMessage({ id: 'constructors' })}>
                <CodeList nameIsHtml nameIsPath items={entry.constructors} />
              </Section>
            )}
            {entry.classFields && entry.classFields.length > 0 && (
              <Section title={intl.formatMessage({ id: 'fields' })}>
                <CodeList
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
              <Section title={intl.formatMessage({ id: 'parameters' })}>
                <CodeList variant="parameters" items={entry.parameters} />
              </Section>
            )}
            {entry.methods && entry.methods.length > 0 && (
              <Section title={intl.formatMessage({ id: 'methods' })}>
                <CodeList
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
              <Section title={intl.formatMessage({ id: 'related' })}>
                <CodeList
                  items={entry.related.map((rel) => ({
                    name: pathToName(rel),
                    anchor: referencePath(rel, libraryName),
                  }))}
                />
              </Section>
            )}
            <License />
          </Content>
        ) : (
          <Content collapsed={!show}>
            {intl.formatMessage({ id: 'notTranslated' })}
            <Link to={referencePath(name, libraryName)}>
              {' '}
              {intl.formatMessage({ id: 'englishPage' })}
            </Link>
          </Content>
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
          category
          subcategory
          name
        }
      }
    }
  }
`;
