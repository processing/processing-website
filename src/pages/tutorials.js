import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';
import classnames from 'classnames';

import HeadMatter from '../components/HeadMatter';
import Layout from '../components/Layout';

import { usePreparedTutorials } from '../hooks/tutorials';

import * as css from '../styles/pages/tutorials.module.css';
import * as grid from '../styles/grid.module.css';

const Tutorials = ({ data }) => {
  const intl = useIntl();
  const videos = usePreparedTutorials(data.video.nodes);
  const texts = usePreparedTutorials(data.text.nodes);

  //console.log(`data`);
  return (
    <Layout>
      <HeadMatter
        title={intl.formatMessage({ id: 'tutorials' })}
        description={intl.formatMessage({ id: 'videoTutorialsIntro' })}
      />

      <div className={classnames(grid.container, grid.grid)}>
        <div className={classnames(grid.col, css.text)}>
          <h1>{intl.formatMessage({ id: 'tutorials' })}</h1>
          <h2>{intl.formatMessage({ id: 'videoTutorials' })}</h2>
          <h3>{intl.formatMessage({ id: 'videoTutorialsIntro' })}</h3>
        </div>
        <ul className={classnames(grid.col, grid.grid, css.list)}>
          {videos.map((tutorial, k) => {
            return (
              <li key={k} className={classnames(grid.col, css.card)}>
                <a href={tutorial.link} target="_blank" rel="noreferrer">
                  {tutorial.image && <Image tutorial={tutorial} />}
                  <h4>{tutorial.title}</h4>
                  <div>
                    <span className={css.author}>
                      {intl.formatMessage({ id: 'by' })}{' '}
                    </span>
                    <span className={css.authorName}>{tutorial.author}</span>
                  </div>
                </a>
                <span className={css.brief}>{tutorial.intro}</span>
              </li>
            );
          })}
        </ul>
        <div className={classnames(grid.col, css.text)} id="text-tutorials">
          <h2>{intl.formatMessage({ id: 'textTutorials' })}</h2>
          <h3>{intl.formatMessage({ id: 'textTutorialsIntro' })}</h3>
        </div>
        <ul className={classnames(grid.col, grid.grid, css.list)}>
          {texts.map((tutorial, k) => {
            return (
              <li key={k} className={classnames(grid.col, css.card)}>
                <Link to={tutorial.slug}>
                  {tutorial.image && <Image tutorial={tutorial} />}
                  <h4>{tutorial.title}</h4>
                  <div>
                    <span className={css.author}>
                      {intl.formatMessage({ id: 'by' })}{' '}
                    </span>
                    <span className={css.authorName}>{tutorial.author}</span>
                  </div>
                  <span className={css.brief}>{tutorial.intro}</span>
                  <span className={css.level}>
                    {intl.formatMessage({ id: 'level' })}: {tutorial.level}
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

const Image = ({ tutorial }) => {
  return (
    <div className={css.cover}>
      <GatsbyImage
        className={css.image}
        alt={`Image for the ${tutorial.title} tutorial`}
        image={tutorial.image}
        objectFit="cover"
      />
    </div>
  );
};

export default Tutorials;
export const query = graphql`
  query ($locale: String!) {
    video: allFile(
      filter: {
        sourceInstanceName: { eq: "tutorials" }
        childMdx: { fields: { locale: { eq: $locale } } }
        relativeDirectory: { glob: "video/*" }
      }
      sort: { order: ASC, fields: childrenMdx___frontmatter___order }
    ) {
      nodes {
        name
        childMdx {
          frontmatter {
            order
            link
            title
            author
            intro
            coverImage {
              childImageSharp {
                gatsbyImageData(width: 600)
              }
            }
          }
        }
      }
    }
    text: allFile(
      filter: {
        sourceInstanceName: { eq: "tutorials" }
        childMdx: { fields: { locale: { eq: $locale  } } }
        relativeDirectory: { glob: "text/*" }
      }
      sort: { order: ASC, fields: childrenMdx___frontmatter___order }
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
                gatsbyImageData(width: 600)
              }
            }
          }
        }
      }
    }
  }
`;
