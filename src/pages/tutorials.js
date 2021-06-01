import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';
import classnames from 'classnames';

import Layout from '../components/Layout';

import css from '../styles/pages/tutorials.module.css';
import grid from '../styles/grid.module.css';

const Tutorials = ({ data }) => {
  const { locale } = useLocalization();
  const intl = useIntl();

  return (
    <Layout>
      <Helmet>
        <title>Tutorials</title>
      </Helmet>
      <div className={classnames(grid.container, grid.grid, css.root)}>
        <div className={classnames(grid.col, css.text)}>
          <h1>{intl.formatMessage({ id: 'tutorials' })}</h1>
          <h2>{intl.formatMessage({ id: 'videoTutorials' })}</h2>
          <h3>{intl.formatMessage({ id: 'videoTutorialsIntro' })}</h3>
          <p className={css.sectionIntro}>
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
          </p>
        </div>
        <ul className={classnames(grid.col, grid.grid, css.list)}>
          {data.video.nodes.map((node, k) => {
            const {
              link,
              title,
              author,
              intro,
              coverImage
            } = node.childMdx.frontmatter;
            return (
              <li key={k} className={classnames(grid.col, css.card)}>
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
                  <div>
                    <span className={css.author}>
                      {intl.formatMessage({ id: 'by' })}{' '}
                    </span>
                    <span className={css.authorName}>{author}</span>
                  </div>
                </a>
                <span className={css.brief}>{intro}</span>
              </li>
            );
          })}
        </ul>
        <div className={classnames(grid.col, css.text)}>
          <h2>{intl.formatMessage({ id: 'textTutorials' })}</h2>
          <h3>{intl.formatMessage({ id: 'textTutorialsIntro' })}</h3>
        </div>
        <ul className={classnames(grid.col, grid.grid, css.list)}>
          {data.text.nodes.map((node, k) => {
            const {
              slug,
              title,
              author,
              intro,
              level,
              coverImage
            } = node.childMdx.frontmatter;
            return (
              <li key={k} className={classnames(grid.col, css.card)}>
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
                  <div>
                    <span className={css.author}>
                      {intl.formatMessage({ id: 'by' })}{' '}
                    </span>
                    <span className={css.authorName}>{author}</span>
                  </div>
                  <span className={css.brief}>{intro}</span>
                  <span className={css.level}>
                    {intl.formatMessage({ id: 'level' })}: {level}
                  </span>
                </Link>
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
