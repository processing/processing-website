import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import { useIntl } from 'react-intl';

import Layout from '../../components/Layout';
import Content from '../../components/ContentWithSidebar';
import Sidebar from '../../components/Sidebar';
import Section from '../../components/ReferenceItemSection';
import License from '../../components/ReferenceLicense';
import { CodeList, ExampleList } from '../../components/ReferenceItemList';

import { useTree, useHighlight, useWindowSize } from '../../hooks';
import {
  usePreparedItems,
  usePreparedExamples,
  usePreparedList,
} from '../../hooks/reference';
import { referencePath } from '../../utils/paths';

import grid from '../../styles/grid.module.css';

const RefTemplate = ({ data, pageContext, ...props }) => {
  const { name, libraryName } = pageContext;
  const isProcessing = libraryName === 'processing';

  const { width } = useWindowSize();
  const [show, setShow] = useState(width > 960 ? true : false);
  const intl = useIntl();
  useHighlight();

  const items = usePreparedItems(data.items.nodes);
  const examples = usePreparedExamples(data.pdes.edges, data.images.edges);
  const tree = useTree(items);

  const entry = data?.json?.childJson;

  const inUse = usePreparedList(entry?.inUse, libraryName, true, true);
  const parameters = usePreparedList(entry?.parameters, libraryName);
  const syntax = usePreparedList(entry?.syntax, libraryName);
  const related = usePreparedList(entry?.related, libraryName, true, true);
  const returns = usePreparedList(entry?.returns, libraryName);

  return (
    <Layout withSidebar>
      <Helmet>
        <title>
          {entry?.name ?? ''}
          {' / '}
          {isProcessing ? 'Reference' : 'Libraries'}
        </title>
      </Helmet>
      <div className={grid.grid}>
        {isProcessing && (
          <Sidebar tree={tree} setShow={setShow} show={show} type="reference" />
        )}
        {entry ? (
          <Content collapsed={!show}>
            <Section title={intl.formatMessage({ id: 'name' })}>
              <h3>{entry.name}</h3>
            </Section>
            {entry?.classanchor && (
              <Section title={intl.formatMessage({ id: 'class' })}>
                <h3>{entry.classanchor}</h3>
              </Section>
            )}
            <Section title={intl.formatMessage({ id: 'description' })}>
              <p dangerouslySetInnerHTML={{ __html: entry.description }} />
            </Section>
            {examples && (
              <Section
                columns={false}
                title={intl.formatMessage({ id: 'examples' })}>
                <ExampleList examples={examples} />
              </Section>
            )}
            {syntax && (
              <Section title={intl.formatMessage({ id: 'syntax' })}>
                <CodeList items={syntax} />
              </Section>
            )}
            {parameters && (
              <Section title={intl.formatMessage({ id: 'parameters' })}>
                <CodeList variant="parameters" items={parameters} />
              </Section>
            )}
            {returns && (
              <Section title={intl.formatMessage({ id: 'return' })}>
                <CodeList items={returns} />
              </Section>
            )}
            {inUse && (
              <Section title={intl.formatMessage({ id: 'inUse' })}>
                <CodeList items={inUse} />
              </Section>
            )}
            {related && (
              <Section title={intl.formatMessage({ id: 'related' })}>
                <CodeList items={related} />
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
        classanchor
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
