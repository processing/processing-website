import React from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import { useIntl } from 'react-intl';
import { useLocalization } from 'gatsby-theme-i18n';

import HeadMatter from '../components/HeadMatter';
import Donate from '../components/character/Donate';
import Layout from '../components/Layout';

import * as css from '../styles/pages/libraries.module.css';
import * as grid from '../styles/grid.module.css';

const Tools = ({ data }) => {
  const { locale } = useLocalization();
  const { tools, currentLang, english } = data;
  const intl = useIntl();

  let contributions = [];


  english.nodes.forEach((en) => {
    currentLang.nodes.forEach((con) => {

      if (locale === 'en') {
        if (en.name === con.name.split('.')[0]) {

          contributions.push({ ...en.childJson });
        }
      }else{
        if (en.name === con.name.split('.')[0]) {
          contributions.push({ ...en.childJson, ...con.childJson });
        }
      }


    });
  });

  return (
    <Layout>
      <HeadMatter
        title={intl.formatMessage({ id: 'tools' })}
        description={intl.formatMessage({ id: 'toolsIntro' })}
      />

      <div className={classnames(grid.container, grid.grid)}>
        <Donate />
        <div className={classnames(grid.col, css.text)}>
          <h1>{intl.formatMessage({ id: 'tools' })}</h1>
          <h3>{intl.formatMessage({ id: 'toolsIntro' })}</h3>
        </div>
        <ul className={classnames(grid.col, css.list)}>
          {tools.nodes.map((node, key) => {
            return (
              <li key={key} className={classnames(grid.grid, css.item)}>
                <div className={classnames(grid.col, css.itemName)}>
                  <h3>{node.childJson.name}</h3>
                </div>
                <p className={classnames(grid.col, css.itemDescription)}>
                  {node.childJson.description}
                </p>
              </li>
            );
          })}
        </ul>
        <div className={classnames(grid.col, css.text, css.pushDown)}>
          <h1>{intl.formatMessage({ id: 'contributions' })}</h1>
          <h3
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: 'contributedTools' })
            }}
          />
        </div>
        <ul className={classnames(grid.col, css.list)}>
          {contributions.map((node, key) => {
            return (
              <li key={key + 'c'} className={classnames(grid.grid, css.item)}>
                <div className={classnames(grid.col, css.itemName)}>
                  <a href={node.url} target="_blank" rel="noreferrer">
                    <h3>{node.name}</h3>
                  </a>
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
                <div className={classnames(grid.col, css.itemDescription)}>
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
    tools: allFile(filter: { sourceInstanceName: { eq: "tools" }
        fields: { lang: { eq: $locale } }}) {
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
