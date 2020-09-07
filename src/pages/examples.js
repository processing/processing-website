import React from 'react';
import { graphql } from 'gatsby';
import unique from 'array-unique';

import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import Layout from '../components/Layout';

import { useLocalization } from 'gatsby-theme-i18n';

const Examples = ({ data }) => {
  const { locale } = useLocalization();

  let examples = data.allFile.nodes;

  let categories = unique(
    examples.map((file) => {
      return file.relativeDirectory.split('/')[0];
    })
  );

  let subcategories = {};
  categories.map((c) => {
    subcategories[c] = unique(
      examples.map((r) => {
        if (r.relativeDirectory.split('/')[0] === c)
          return r.relativeDirectory.split('/')[1];
        else return null;
      })
    );
  });

  return (
    <Layout>
      <h1>Examples</h1>
      <ul>
        {categories.map((c, key) => {
          let categoryRefs = examples.filter((ref) => {
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
