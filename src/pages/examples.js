import React from 'react';
import { graphql } from 'gatsby';

import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import Layout from '../components/Layout';

import { useLocalization } from 'gatsby-theme-i18n';

const Examples = ({ data }) => {
  const { locale } = useLocalization();
  return (
    <Layout>
      <h1>Examples</h1>
      <ul>
        {data.allFile.nodes.map((node, key) => {
          return (
            <li key={key}>
              <Link to={node.childMdx.frontmatter.slug} language={locale}>
                {node.childMdx.frontmatter.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Examples;

export const query = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        childMdx: { fields: { locale: { eq: "en" } } }
      }
    ) {
      nodes {
        name
        childMdx {
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`;
