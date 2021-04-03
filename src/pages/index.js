import React, { memo, useMemo } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import { LocalizedLink as Link, useLocalization } from 'gatsby-theme-i18n';
import Img from 'gatsby-image';

import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import Sketch from '../components/sketch/Sketch';

import { useRandomArray } from '../hooks';
import { usePreparedExamples } from '../hooks/examples';

import css from '../styles/pages/index.module.css';
import grid from '../styles/grid.module.css';

//the name values are used to get the value from the intl files
//it is not the name that is displayed
export const items = [
  {
    name: 'forum',
    link: 'https://discourse.processing.org/',
  },
  {
    name: 'github',
    link: 'https://github.com/processing',
  },
  {
    name: 'issues',
    link: 'https://github.com/processing/processing/issues?state=open',
  },
  {
    name: 'wiki',
    link: 'https://github.com/processing/processing/wiki/',
  },
  {
    name: 'faq',
    link: 'https://github.com/processing/processing/wiki/FAQ',
  },
  {
    name: 'medium',
    link: 'https://medium.com/@ProcessingOrg',
  },
];

const IndexPage = ({ data }) => {
  const intl = useIntl();
  const { locale } = useLocalization();

  const featuredExamples = usePreparedExamples(
    data.examples.nodes,
    data.exampleImages.nodes
  );
  const randomExamples = useRandomArray(featuredExamples, 4);

  return (
    <Layout isHomepage>
      <Helmet>
        <title>Welcome to Processing!</title>
      </Helmet>
      <div className={classnames(css.hero, grid.grid, grid.rightBleed)}>
        <div className={classnames(grid.col, css.intro)}>
          <h1>{intl.formatMessage({ id: 'introTitle' })}</h1>
          <p>{intl.formatMessage({ id: 'introText' })}</p>
          <div className={css.buttons}>
            <Button to={'/download'} size="large" className={css.button}>
              {intl.formatMessage({ id: 'download' })}
            </Button>
            <Button to={'/reference'} size="large" className={css.button}>
              {intl.formatMessage({ id: 'reference' })}
            </Button>
            <Button
              href={'https://processingfoundation.org/donate'}
              size="large"
              className={css.button}>
              {intl.formatMessage({ id: 'donate' })}
            </Button>
          </div>
        </div>
        <Sketch />
      </div>
      <FeaturedExamples
        examples={randomExamples}
        heading={intl.formatMessage({ id: 'examples' })}
        locale={locale}
      />
      <div className={css.sectionDivider} />
      <div className={classnames(grid.grid, css.section)}>
        <div className={classnames(grid.col, css.half)}>
          <h2>{intl.formatMessage({ id: 'gettingStarted' })}</h2>
          <div>
            <p
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: 'gettingStartedP1' }),
              }}></p>
          </div>
        </div>
        <div className={classnames(css.half, grid.nest, css.cardGrid)}>
          <div className={classnames(grid.col, css.cardCol)}>
            <Card
              to={'/tutorials/gettingstarted'}
              description={intl.formatMessage({
                id: 'cardGettingStartedDescription',
              })}
              className={css.card}>
              {intl.formatMessage({ id: 'cardGettingStarted' })}
            </Card>
            <Card to={'/reference'} className={css.card}>
              <h4>{intl.formatMessage({ id: 'cardReference' })}</h4>
              <p>
                {intl.formatMessage({
                  id: 'cardReferenceDescription',
                })}
              </p>
            </Card>
          </div>
          <div className={classnames(grid.col, css.cardCol)}>
            <Card
              to={'/download'}
              description={intl.formatMessage({
                id: 'cardDownloadDescription',
              })}
              className={css.card}>
              {intl.formatMessage({ id: 'cardDownload' })}
            </Card>
            <Card
              href={'https://discourse.processing.org/'}
              className={css.card}>
              <h4>{intl.formatMessage({ id: 'cardForum' })}</h4>
              <p>
                {intl.formatMessage({
                  id: 'cardForumDescription',
                })}
              </p>
            </Card>
          </div>
        </div>
      </div>
      <div className={css.sectionDivider} />
      <div className={classnames(grid.grid, css.section)}>
        <div className={classnames(grid.col, css.half)}>
          <h2>{intl.formatMessage({ id: 'contribute' })}</h2>
          <div>
            <p>{intl.formatMessage({ id: 'contributeP1' })}</p>
            <p>
              {intl.formatMessage({ id: 'contributeP2' })}
              <a href="https://github.com/processing/processing/wiki/Build-Instructions">
                {intl.formatMessage({ id: 'building' })}
              </a>
              ,{' '}
              <a href="https://github.com/processing/processing/wiki/Report-Bugs">
                {intl.formatMessage({ id: 'reporting' })}
              </a>
              , {intl.formatMessage({ id: 'reporting' })}{' '}
              <a href="https://github.com/processing/processing/wiki">
                {intl.formatMessage({ id: 'creating' })}
              </a>
              .
            </p>
          </div>
          <div className={css.contributeButtton}>
            <Button
              href={'https://github.com/processing'}
              size="large"
              className={css.gettingStartedButton}>
              {intl.formatMessage({ id: 'buttonContribute' })}
            </Button>
          </div>
        </div>
        <div className={classnames(grid.col, css.half, css.partnersContainer)}>
          <h2>{intl.formatMessage({ id: 'partners' })}</h2>
          <ul className={css.partners}>
            <li>
              <div>
                <img src={data.fathom.childImageSharp.fluid.src} alt="" />
              </div>
              <p>Fathom</p>
            </li>
            <li>
              <div>
                <img src={data.itp.childImageSharp.fluid.src} alt="" />
              </div>
              <p>ITP NYU</p>
            </li>
            <li>
              <div>
                <img src={data.ucla.childImageSharp.fluid.src} alt="" />
              </div>
              <p>UCLA Design Media Arts</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={css.sectionDivider} />
      <div
        className={classnames(
          grid.grid,
          css.section,
          grid.rightBleed,
          grid.bleedMedium,
          css.announcementSection
        )}>
        <div className={classnames(css.half, grid.col, css.announcement)}>
          <h2>{intl.formatMessage({ id: 'announcement' })}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: intl.formatMessage({ id: 'announcementText' }),
            }}
          />
        </div>
        <div
          className={classnames(
            css.half,
            grid.col,
            grid.rightBleed,
            css.announcementCover
          )}>
          <img
            src={data.news.childImageSharp.fluid.src}
            alt=""
            className={css.announcementImg}
          />
        </div>
      </div>
      <div className={css.sectionDivider} />
    </Layout>
  );
};

const FeaturedExamples = memo(({ heading, examples, locale }) => {
  return (
    <div className={classnames(grid.grid, css.section)}>
      <div className={classnames(grid.col, grid.nest, css.examples)}>
        <h3 className={grid.col}>{heading}</h3>
        <ul>
          {examples.map((example, i) => (
            <li
              className={classnames(css.example, grid.col)}
              key={example.path}>
              <Link to={example.path} language={locale}>
                <div className={css.imgContainer}>
                  {example.image && (
                    <Img fluid={example.image.childImageSharp.fluid} />
                  )}
                </div>
                <h4>{example.name}</h4>
                <p>in {example.subCategory} examples</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className={classnames(grid.col, css.moreButton)}>
          <Button to={'/examples'}>More Examples</Button>
        </div>
      </div>
    </div>
  );
});

export default IndexPage;

export const query = graphql`
  query(
    $featuredExamples: [String] = [
      "KeyboardFunctions"
      "RadialGradient"
      "Saturation"
      "GameOfLife"
      "LoadingImages"
      "RotatePushPop"
      "Spot"
      "LinearGradient"
      "PenroseSnowflake"
      "MultipleParticleSystems"
    ]
  ) {
    examples: allFile(
      filter: {
        name: { in: $featuredExamples }
        extension: { eq: "json" }
        sourceInstanceName: { eq: "examples" }
        fields: { lang: { eq: "en" } }
        dir: { regex: "/.*[^data]$/" }
      }
      sort: { order: ASC, fields: relativeDirectory }
    ) {
      nodes {
        id
        name
        relativeDirectory
        childJson {
          name
          title
        }
      }
    }
    exampleImages: allFile(
      filter: {
        name: { in: $featuredExamples }
        sourceInstanceName: { eq: "examples" }
        extension: { regex: "/(jpg)|(jpeg)|(png)|(gif)/" }
        dir: { regex: "/.*[^data]$/" }
      }
    ) {
      nodes {
        id
        name
        relativeDirectory
        childImageSharp {
          fluid(maxWidth: 800) {
            base64
            srcWebp
            srcSetWebp
            originalImg
            originalName
          }
        }
      }
    }
    news: file(relativePath: { eq: "news.png" }) {
      childImageSharp {
        fluid(maxWidth: 1280, maxHeight: 508) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    conway: file(relativePath: { eq: "conway.png" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    radial: file(relativePath: { eq: "radial.png" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    flocking: file(relativePath: { eq: "flocking.png" }) {
      childImageSharp {
        fluid(maxWidth: 400, maxHeight: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    fathom: file(relativePath: { eq: "fathom.png" }) {
      childImageSharp {
        fluid(maxWidth: 120, maxHeight: 120) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    itp: file(relativePath: { eq: "itp.png" }) {
      childImageSharp {
        fluid(maxWidth: 150, maxHeight: 120) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    ucla: file(relativePath: { eq: "ucla.png" }) {
      childImageSharp {
        fluid(maxWidth: 120, maxHeight: 120) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
