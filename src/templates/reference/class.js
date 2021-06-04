import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import { useIntl } from 'react-intl';
import { widont } from '../../utils/index.js';

import Layout from '../../components/Layout';
import Content from '../../components/ContentWithSidebar';
import { SidebarTree } from '../../components/Sidebar';
import Section from '../../components/ReferenceItemSection';
import License from '../../components/ReferenceLicense';
import { CodeList, ExampleList } from '../../components/ReferenceItemList';
import { ExampleItem } from '../../components/ExamplesList';

import { useHighlight, useTree, useSidebar } from '../../hooks';
import {
  usePreparedItems,
  usePreparedExamples,
  usePreparedList,
  useInUseExamples
} from '../../hooks/reference';
import { referencePath } from '../../utils/paths';

import grid from '../../styles/grid.module.css';

const ClassRefTemplate = ({ data, pageContext }) => {
  const { name, libraryName } = pageContext;
  const entry = data?.json?.childJson;
  const isProcessing = libraryName === 'processing';
  const [showSidebar, setShowSidebar] = useSidebar();
  const intl = useIntl();
  useHighlight();

  const items = usePreparedItems(data.items.nodes);
  const examples = usePreparedExamples(data.pdes.edges, data.images.edges);
  const tree = useTree(items);

  const constructors = usePreparedList(entry?.constructors, libraryName);
  const fields = usePreparedList(entry?.classFields, libraryName, false, true);
  const parameters = usePreparedList(entry?.parameters, libraryName);
  const methods = usePreparedList(entry?.methods, libraryName, false, true);
  const related = usePreparedList(entry?.related, libraryName, true, true);
  const inUseExamples = useInUseExamples(
    pageContext.inUseExamples,
    data.inUseImages
  );

  return (
    <Layout withSidebar>
      <Helmet>
        <title>
          {name} / {isProcessing ? 'Reference' : 'Libraries'}
        </title>
      </Helmet>
      <div className={grid.grid}>
        {isProcessing && (
          <SidebarTree
            title={intl.formatMessage({ id: 'reference' })}
            tree={tree}
            setShow={setShowSidebar}
            show={showSidebar}
          />
        )}
        {entry ? (
          <Content collapsed={!showSidebar}>
            <Section title={intl.formatMessage({ id: 'className' })}>
              <h3>{entry.name}</h3>
            </Section>
            <Section title={intl.formatMessage({ id: 'description' })}>
              <p
                dangerouslySetInnerHTML={{ __html: widont(entry.description) }}
              />
            </Section>
            {examples && (
              <Section
                columns={false}
                title={intl.formatMessage({ id: 'examples' })}>
                <ExampleList examples={examples} />
              </Section>
            )}
            {constructors && (
              <Section title={intl.formatMessage({ id: 'constructors' })}>
                <CodeList nameIsHtml items={constructors} />
              </Section>
            )}
            {fields && (
              <Section title={intl.formatMessage({ id: 'fields' })}>
                <CodeList nameIsHtml items={fields} />
              </Section>
            )}
            {parameters && (
              <Section title={intl.formatMessage({ id: 'parameters' })}>
                <CodeList variant="parameters" items={parameters} />
              </Section>
            )}
            {methods && (
              <Section title={intl.formatMessage({ id: 'methods' })}>
                <CodeList descriptionIsHtml items={methods} />
              </Section>
            )}
            {related && (
              <Section title={intl.formatMessage({ id: 'related' })}>
                <CodeList items={related} />
              </Section>
            )}
            {inUseExamples && (
              <Section title={intl.formatMessage({ id: 'inUse' })}>
                <ul className={grid.grid}>
                  {inUseExamples.slice(0, 6).map((e, key) => (
                    <ExampleItem
                      node={e}
                      key={`e-${e.name}`}
                      variant="related"
                    />
                  ))}
                </ul>
              </Section>
            )}
            <License />
          </Content>
        ) : (
          <Content collapsed={!showSidebar}>
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
  query(
    $name: String!
    $relDir: String!
    $locale: String!
    $inUseExamples: [String!]!
  ) {
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
    inUseImages: allFile(
      filter: {
        name: { in: $inUseExamples }
        sourceInstanceName: { eq: "examples" }
        extension: { regex: "/(jpg)|(jpeg)|(png)|(gif)/" }
        relativeDirectory: { regex: "/^((?!data).)*$/" }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
