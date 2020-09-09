import React from 'react';
import { graphql } from 'gatsby';
import unique from 'array-unique';

import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import Layout from '../components/Layout';
import { useLocalization } from 'gatsby-theme-i18n';

const Tutorials = ({ data }) => {
  const { locale } = useLocalization();

  let categories = unique(
    data.allFile.nodes.map((file) => {
      return file.relativeDirectory.split('/')[0];
    })
  );

  return (
    <Layout>
      <h1>Tutorials</h1>
      <ul>
        {categories.map((c, key) => {
          let categoryRefs = data.allFile.nodes.filter((ref) => {
            return ref.relativeDirectory.split('/')[0] === c;
          });
          return (
            <div key={key}>
              <h2>{c}</h2>
              {categoryRefs.map((node, k) => {
                return (
                  <li key={k}>
                    <Link to={node.childMdx.frontmatter.slug} language={locale}>
                      {node.childMdx.frontmatter.title}
                    </Link>
                  </li>
                );
              })}
            </div>
          );
        })}
      </ul>
    </Layout>
  );
};

export default Tutorials;

export const query = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "tutorials" }
        childMdx: { fields: { locale: { eq: "en" } } }
      }
    ) {
      nodes {
        name
        relativeDirectory
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
