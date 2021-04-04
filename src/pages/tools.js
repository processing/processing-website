import React from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import { useIntl } from 'react-intl';

import { useLocalization } from 'gatsby-theme-i18n';

import Donate from '../components/character/Donate';
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
      <Helmet>
        <title>Tools</title>
      </Helmet>
      <div className={classnames(grid.grid, css.root)}>
        <Donate />
        <h1 className={grid.col}>{intl.formatMessage({ id: 'tools' })}</h1>
        <h3 className={grid.col}>{intl.formatMessage({ id: 'toolsIntro' })}</h3>
        <div className={classnames(grid.nest, css.listWrapper)}>
          <ul className={css.list}>
            {tools.nodes.map((node, key) => {
              return (
                <li key={key} className={css.subgrid}>
                  <h3 className={classnames(grid.col, css.librarieName)}>
                    {node.childJson.name}
                  </h3>
                  <p className={grid.col}>{node.childJson.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <h1 className={grid.col}>
          {intl.formatMessage({ id: 'contributions' })}
        </h1>
        <h3
          className={grid.col}
          dangerouslySetInnerHTML={{
            __html: intl.formatMessage({ id: 'contributedTools' }),
          }}
        />
        <ul className={classnames(grid.nest, css.contributionsList)}>
          {contributions.map((node, key) => {
            return (
              <li key={key + 'c'} className={css.subgrid}>
                <div className={classnames(grid.col, css.contributionData)}>
                  <h3>
                    <a href={node.url} target="_blank" rel="noreferrer">
                      {node.name}
                    </a>
                  </h3>
                  {node.authors.map((author, key) => (
                    <a
                      key={key + 'a'}
                      href={author.slice(
                        author.indexOf('(') + 1,
                        author.indexOf(')')
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className={css.contributionAuthor}>
                      {author.slice(
                        author.indexOf('[') + 1,
                        author.indexOf(']')
                      )}
                    </a>
                  ))}
                </div>
                <div className={classnames(grid.col, css.contributionBrief)}>
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
          authors
          sentence
          categories
        }
      }
    }
  }
`;
