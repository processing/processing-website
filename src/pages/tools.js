import React from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';

import { useLocalization } from 'gatsby-theme-i18n';

import Donate from '../components/character/Donate';
import Layout from '../components/Layout';

import css from '../styles/pages/libraries.module.css';
import grid from '../styles/grid.module.css';

const Tools = ({ data }) => {
  const { locale } = useLocalization();
  const { tools, currentLang, english } = data;

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
      <div className={classnames(grid.grid, css.root)}>
        <Donate />
        <h1 className={grid.col}>Tools</h1>
        <h3 className={grid.col}>
          The following tools are included with the Processing software. Select
          the tool you want to use from the Tools menu of the Processing
          Environment. These tools are open source; the code is distributed with
          Processing.
        </h3>
        <div className={css.listWrapper}>
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
        <h1 className={grid.col}>Contributions</h1>
        <h3 className={grid.col}>
          Contributed tools must be downloaded individually. Select{' '}
          <em>"Add Tool..."</em> from the Tools menu to select a Tool to
          download. Contributed tools are developed, documented, and maintained
          by members of the Processing community. For feedback and support,
          please post to the
          <a href="http://forum.processing.org/">Forum</a>. For development
          discussions post to the{' '}
          <a href="http://forum.processing.org/library-and-tool-development">
            {' '}
            Libraries and Tool Development
          </a>{' '}
          topic. Instructions for creating your own tool are on the
          <a href="https://github.com/processing/processing/wiki">
            Processing GitHub
          </a>{' '}
          site.
        </h3>
        <ul className={css.contributionsList}>
          {contributions.map((node, key) => {
            return (
              <li key={key + 'c'} className={classnames(css.subgrid, grid.col)}>
                <div className={classnames(grid.col, css.contributionData)}>
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
                      rel="noreferrer"
                      className={css.contributionAuthor}>
                      {author.name}
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
