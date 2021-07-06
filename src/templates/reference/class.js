import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import { useIntl } from 'react-intl';
import { widont } from '../../utils/index.js';

import HeadMatter from '../../components/HeadMatter';

import Layout from '../../components/Layout';
import Content from '../../components/ContentWithSidebar';
import { SidebarTree } from '../../components/Sidebar';
import Section from '../../components/reference/Section';
import License from '../../components/reference/License';
import { CodeList, ExampleList } from '../../components/reference/ContentList';
import { ExampleItem } from '../../components/examples/ExamplesList';
import Breadcrumbs from '../../components/Breadcrumbs';

import { useHighlight, useTree, useSidebar } from '../../hooks';
import {
  usePreparedItems,
  usePreparedExamples,
  usePreparedList,
  useInUseExamples,
  useTrail
} from '../../hooks/reference';
import { referencePath } from '../../utils/paths';

import grid from '../../styles/grid.module.css';

const ClassRefTemplate = ({ data, pageContext }) => {
  const { name, libraryName } = pageContext;
  const entry = data?.json?.childJson;
  const isProcessing = libraryName === 'processing';
  const [showSidebar, setShowSidebar] = useSidebar('reference');

  const intl = useIntl();
  useHighlight();

  const items = usePreparedItems(data.items.nodes, libraryName);
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

  const trail = useTrail(libraryName, entry?.category, entry?.subcategory);

  return (
    <Layout withSidebar withBreadcrumbs>
      <HeadMatter
        title={
          (entry?.name ?? data.en.childJson.name) + ' / ' + isProcessing
            ? intl.formatMessage({ id: 'reference' })
            : intl.formatMessage({ id: 'libraries' })
        }
        description={entry?.description}
        img={data.images.edges[0]?.node.childImageSharp.fluid.src}
      />

      <div className={grid.grid}>
        <SidebarTree
          title={intl.formatMessage({ id: 'reference' })}
          tree={tree}
          setShow={setShowSidebar}
          show={showSidebar}
        />
        {entry ? (
          <Content sidebarOpen={showSidebar}>
            <Breadcrumbs trail={trail} />
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
          <Content sidebarOpen={showSidebar}>
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
    $libraryName: String!
  ) {
    json: file(
      fields: { name: { eq: $name }, lang: { eq: $locale } }
      sourceInstanceName: { eq: "json" }
    ) {
      childJson {
        name
        description
        constructors
        category
        subcategory
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
    en: file(
      fields: { name: { eq: $name }, lang: { eq: "en" } }
      sourceInstanceName: { eq: "json" }
    ) {
      childJson {
        name
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
      filter: { fields: { lib: { eq: $libraryName }, lang: { eq: "en" } } }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          category
          subcategory
          name
          type
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
    libName: mdx(frontmatter: { name: { eq: $libraryName } }) {
      frontmatter {
        title
      }
    }
  }
`;
