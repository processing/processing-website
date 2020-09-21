import React from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';

import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import Layout from '../components/Layout';
import { useLocalization } from 'gatsby-theme-i18n';

import css from '../styles/pages/tutorials.module.css';
import grid from '../styles/grid.module.css';

const Tutorials = ({ data }) => {
  const { locale } = useLocalization();

  return (
    <Layout>
      <h1>Tutorials</h1>
      <div className={grid.grid}>
        <h2 className={grid.col8}>Video Tutorials</h2>
        <h3 className={grid.col3}>
          Links to videos that cover the Processing basics.
        </h3>
        <ul className={css.list}>
          {data.video.nodes.map((node, k) => {
            return (
              <li key={k}>
                <Link to={node.childMdx.frontmatter.slug} language={locale}>
                  {node.childMdx.frontmatter.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={grid.grid}>
        <h2 className={grid.col8}>Text Tutorials</h2>
        <h3 className={grid.col3}>
          A collection of step-by-step lessons covering beginner, intermediate,
          and advanced topics.
        </h3>
        <ul className={css.list}>
          {data.text.nodes.map((node, k) => {
            return (
              <li key={k} className={grid.col2}>
                <Link to={node.childMdx.frontmatter.slug} language={locale}>
                  {node.childMdx.frontmatter.title}
                </Link>
                <span>{node.childMdx.frontmatter.intro}</span>
                <span>by {node.childMdx.frontmatter.author}</span>
                <span>level: {node.childMdx.frontmatter.level}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Tutorials;

export const query = graphql`
  query {
    video: allFile(
      filter: {
        sourceInstanceName: { eq: "tutorials" }
        childMdx: { fields: { locale: { eq: "en" } } }
        relativeDirectory: { glob: "video/*" }
      }
    ) {
      nodes {
        name
        childMdx {
          frontmatter {
            slug
            title
            author
            intro
            level
          }
        }
      }
    }
    text: allFile(
      filter: {
        sourceInstanceName: { eq: "tutorials" }
        childMdx: { fields: { locale: { eq: "en" } } }
        relativeDirectory: { glob: "text/*" }
      }
    ) {
      nodes {
        name
        childMdx {
          frontmatter {
            slug
            title
            author
            intro
            level
          }
        }
      }
    }
  }
`;
