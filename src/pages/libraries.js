import React from 'react';
import { graphql } from 'gatsby';
import unique from 'array-unique';
import flatMap from 'array-flat-polyfill';

import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import Layout from '../components/Layout';
import { useLocalization } from 'gatsby-theme-i18n';

const Libraries = ({ data }) => {
  const { locale } = useLocalization();
  const { libraries, currentLang, english } = data;

  let contributions = [];

  english.nodes.map((en) => {
    currentLang.nodes.map((con) => {
      if (en.name === con.name.split('.')[0]) {
        contributions.push({ ...en.childJson, ...con.childJson });
      } else if (locale !== 'en') {
        contributions.push(en.childJson);
      }
    });
  });

  let categories = unique(contributions.flatMap((con) => con.categories));

  return (
    <Layout>
      <h1>Libraries</h1>
      <ul>
        {libraries.nodes.map((node, key) => {
          return (
            <li key={key}>
              <Link
                to={'/reference/libraries/' + node.name + '/index.html'}
                language={locale}>
                {node.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <h1>Contributions</h1>
      <ul>
        {categories.map((cat) => {
          let contribs = contributions.filter((c) =>
            c.categories.includes(cat)
          );
          return (
            <div key={cat}>
              <h3>{cat}</h3>
              {contribs.map((node, key) => {
                return (
                  <li key={key + 'c'}>
                    {node.name}
                    {node.authors}
                    {node.sentence}
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
      filter: { relativeDirectory: { eq: "en" }, name: { ne: "processing" } }
    ) {
      nodes {
        name
      }
    }
    currentLang: allFile(
      filter: {
        sourceInstanceName: { eq: "contributions" }
        fields: { lang: { eq: $locale } }
      }
    ) {
      nodes {
        name
        childJson {
          sentence
        }
      }
    }
    english: allFile(
      filter: {
        sourceInstanceName: { eq: "contributions" }
        fields: { lang: { eq: "en" } }
      }
    ) {
      nodes {
        name
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
