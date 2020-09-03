import React from 'react';
import { graphql } from 'gatsby';
import unique from 'array-unique';
import flatMap from 'array-flat-polyfill';

import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import Layout from '../components/Layout';
import { useLocalization } from 'gatsby-theme-i18n';

const Libraries = ({ data }) => {
  const { locale } = useLocalization();
  const { libraries, contributions } = data;

  let categories = unique(
    contributions.nodes.flatMap((con) => con.childJson.categories)
  );

  return (
    <Layout>
      <h1>Libraries</h1>
      <ul>
        {libraries.nodes.map((node, key) => {
          return (
            <li key={key}>
              <Link to={'/libraries/' + node.name} language={locale}>
                {node.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <h1>Contributions</h1>
      <ul>
        {categories.map((cat) => {
          let contribs = contributions.nodes.filter((c) =>
            c.childJson.categories.includes(cat)
          );
          return (
            <div key={cat}>
              <h3>{cat}</h3>
              {contribs.map((node, key) => {
                return (
                  <li key={key + 'c'}>
                    {node.childJson.name}
                    {node.childJson.authors}
                    {node.childJson.sentence}
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

export default Libraries;

export const query = graphql`
  query($locale: String!) {
    libraries: allDirectory(
      filter: { relativeDirectory: { eq: $locale }, name: { ne: "processing" } }
    ) {
      nodes {
        name
      }
    }
    contributions: allFile(
      filter: {
        sourceInstanceName: { eq: "contributions" }
        fields: { lang: { eq: $locale } }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          name
          authors
          sentence
          categories
        }
      }
    }
  }
`;
