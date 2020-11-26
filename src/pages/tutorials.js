import React from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import Layout from '../components/Layout';

import css from '../styles/pages/tutorials.module.css';
import grid from '../styles/grid.module.css';

const Tutorials = ({ data }) => {
  const { locale } = useLocalization();

  return (
    <Layout>
      <div className={grid.grid}>
        <h1 className={grid.col8}>Tutorials</h1>
        <div className={classnames(grid.nest, css.section)}>
          <h2 className={grid.col8}>Video Tutorials</h2>
          <h3 className={classnames(grid.col3, grid.pull5)}>
            Links to videos that cover the Processing basics.
          </h3>
          <span className={classnames(grid.col4, grid.pull4, css.sectionIntro)}>
            {`Large collections of instructional Processing videos are online from `}
            <a href="https://www.youtube.com/user/shiffman/playlists">
              Daniel Shiffman
            </a>
            {`, `}
            <a href="https://imaginary-institute.com/scheduleenroll.php">
              Andrew Glassner
            </a>
            {`, `}
            <a href="https://www.plethora-project.com/education/2011/09/12/processing-tutorials/">
              Jose Sanchez
            </a>
            {`, and `}
            <a href="https://funprogramming.org/">Abe Pazos</a>.
          </span>
          <ul className={css.tutorialList}>
            {data.video.nodes.map((node, k) => {
              const {
                link,
                title,
                author,
                intro,
                coverImage,
              } = node.childMdx.frontmatter;
              return (
                <li key={k} className={grid.col2}>
                  <a href={link} language={locale}>
                    {coverImage && (
                      <div className={css.cover}>
                        <Img
                          fluid={coverImage.childImageSharp.fluid}
                          style={{ height: 100 }}
                          objectFit="contain"
                        />
                      </div>
                    )}
                    <h4>{title}</h4>
                    <span className={css.author}>by </span>
                    <span className={css.authorName}>{author}</span>
                  </a>
                  <span className={css.brief}>{intro}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={classnames(grid.nest, css.section)}>
          <h2 className={grid.col8}>Text Tutorials</h2>
          <h3 className={classnames(grid.col3, grid.pull5)}>
            A collection of step-by-step lessons covering beginner,
            intermediate, and advanced topics.
          </h3>
          <ul className={css.tutorialList}>
            {data.text.nodes.map((node, k) => {
              const {
                slug,
                title,
                author,
                intro,
                level,
                coverImage,
              } = node.childMdx.frontmatter;
              return (
                <li key={k} className={grid.col2}>
                  <Link to={slug} language={locale}>
                    {coverImage && (
                      <div className={css.cover}>
                        <Img
                          fluid={coverImage.childImageSharp.fluid}
                          style={{ height: 100 }}
                          objectFit="contain"
                        />
                      </div>
                    )}
                    <h4>{title}</h4>
                    <span className={css.author}>by </span>
                    <span className={css.authorName}>{author}</span>
                  </Link>
                  <span className={css.brief}>{intro}</span>
                  <span className={css.level}>Level: {level}</span>
                </li>
              );
            })}
          </ul>
        </div>
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
            link
            title
            author
            intro
            coverImage {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
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
            coverImage {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
