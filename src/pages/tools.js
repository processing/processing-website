import React from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import { useIntl } from 'react-intl';

import { useLocalization } from 'gatsby-theme-i18n';

import Layout from '../components/Layout';

import css from '../styles/pages/libraries.module.css';
import grid from '../styles/grid.module.css';

const Tools = ({ data }) => {
  const { locale } = useLocalization();
  const { tools, currentLang, english } = data;
  const intl = useIntl();

  let contributions = [];

  english.nodes.forEach((en) => {
    currentLang.nodes.forEach((con) => {
      if (en.name === con.name.split('.')[0]) {
        contributions.push({ ...en.childJson, ...con.childJson });
      } else if (locale !== 'en') {
        contributions.push(en.childJson);
      }
    });
  });

  return (
    <Layout>
      <div className={grid.grid}>
        <h1 className={grid.col8}>{intl.formatMessage({ id: 'tools' })}</h1>
        <h4 className={classnames(grid.col6)}>
          {intl.formatMessage({ id: 'toolsIntro' })}
        </h4>
        <ul
          className={classnames(
            css.list,
            grid.col5andhalf,
            grid.push1andhalf,
            grid.nest
          )}>
          {tools.nodes.map((node, key) => {
            return (
              <li key={key} className={css.subgrid}>
                <h3 className={grid.col1andhalf}>{node.childJson.name}</h3>
                <p className={grid.col4}>{node.childJson.description}</p>
              </li>
            );
          })}
        </ul>
        <h1 className={grid.col8}>
          {intl.formatMessage({ id: 'contributions' })}
        </h1>
        <h4
          className={grid.col6}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'contributedTools' }),
          }}></h4>
        <ul className={css.contributionsList}>
          {contributions.map((node, key) => {
            return (
              <li
                key={key + 'c'}
                className={classnames(css.subgrid, grid.col5andhalf)}>
                <div
                  className={classnames(
                    grid.col2andhalf,
                    css.contributionData
                  )}>
                  <h3>
                    <a href={node.url} target="_blank" rel="noreferrer">
                      {node.name}
                    </a>
                  </h3>
                  {node.authors.map((author, key) => (
                    <a
                      key={key + 'a'}
                      href={author.link}
                      target="_blank"
                      rel="noreferrer">
                      {author.name}
                    </a>
                  ))}
                </div>
                <div className={grid.col4}>
                  <p>{node.sentence}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Tools;

export const query = graphql`
  query($locale: String!) {
    tools: allFile(filter: { sourceInstanceName: { eq: "tools" } }) {
      nodes {
        childJson {
          name
          description
        }
      }
    }
    currentLang: allFile(
      filter: {
        sourceInstanceName: { eq: "contributions" }
        fields: { lang: { eq: $locale } }
        childJson: { type: { eq: "tool" } }
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
        childJson: { type: { eq: "tool" } }
      }
    ) {
      nodes {
        name
        childJson {
          name
          url
          authors {
            name
            link
          }
          sentence
          categories
        }
      }
    }
  }
`;
