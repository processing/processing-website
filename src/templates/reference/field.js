import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import Img from 'gatsby-image';

import Layout from '../../components/Layout';
import Content from '../../components/ReferenceItemContent';
import Sidebar from '../../components/Sidebar';
import Section from '../../components/ReferenceItemSection';
import License from '../../components/ReferenceLicense';
import { CodeList, ExampleList } from '../../components/ReferenceItemList';

import { useTree, useHighlight, useWindowSize } from '../../hooks';
import { usePreparedItems, usePreparedExamples } from '../../hooks/reference';
import { referencePath, pathToName } from '../../utils/paths';

import grid from '../../styles/grid.module.css';

const FieldRefTemplate = ({ data, pageContext }) => {
  const { width } = useWindowSize();
  const [show, setShow] = useState(width > 960 ? true : false);
  const ref = useHighlight();
  const intl = useIntl();

  const items = usePreparedItems(data.items.nodes);
  const examples = usePreparedExamples(data.pdes.edges, data.images.edges);
  const tree = useTree(items);

  const entry = data?.json?.childJson;
  const { name, libraryName } = pageContext;
  const isProcessing = libraryName === 'processing';

  return (
    <Layout withSidebar>
      <Helmet>
        <title>
          {name} / {isProcessing ? 'Reference' : 'Libraries'}
        </title>
      </Helmet>
      <div className={grid.grid}>
        {isProcessing && (
          <Sidebar tree={tree} setShow={setShow} show={show} type="reference" />
        )}
        {entry ? (
          <Content collapsed={!show}>
            <Section
              title={intl.formatMessage({ id: 'name' })}
              collapsed={!show}>
              <h3>{entry.name}</h3>
            </Section>
            <Section
              title={intl.formatMessage({ id: 'description' })}
              collapsed={!show}>
              <p dangerouslySetInnerHTML={{ __html: entry.description }} />
            </Section>
            {examples.length > 0 && (
              <Section
                columns={false}
                title={intl.formatMessage({ id: 'examples' })}
                collapsed={!show}>
                <ExampleList examples={examples} />
              </Section>
            )}
            {entry.related.length > 0 && (
              <Section
                title={intl.formatMessage({ id: 'related' })}
                collapsed={!show}>
                <CodeList
                  nameIsPath
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

export default FieldRefTemplate;

export const query = graphql`
  query($name: String!, $relDir: String!) {
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
