import React, { memo, useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { useIntl } from 'react-intl';
import classnames from 'classnames';
import { LocalizedLink as Link, useLocalization } from 'gatsby-theme-i18n';
import { GatsbyImage } from 'gatsby-plugin-image';

import HeadMatter from '../components/HeadMatter';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import Sketch from '../components/sketch/Sketch';

import { shuffleArray } from '../utils';
import { usePreparedExamples } from '../hooks/examples';

import * as css from '../styles/pages/index.module.css';
import * as grid from '../styles/grid.module.css';

import DSILogo from '../images/partners/designsystemsinternational.svg';
import DMALogo from '../images/partners/ucla-dma.svg';
import FathomLogo from '../images/partners/fathom.svg';

const partners = [
  {
    name: 'Fathom',
    url: 'https://fathom.info/',
    width: '29%',
    Logo: FathomLogo
  },
  {
    name: 'UCLA Design Media Arts',
    url: 'http://dma.ucla.edu/',
    width: '18%',
    Logo: DMALogo
  },
  {
    name: 'NYU ITP',
    url: 'https://tisch.nyu.edu/',
    width: '20%',
    Logo: 'itp'
  },
  {
    name: 'Design Systems International',
    url: 'https://designsystems.international/',
    width: '33%',
    Logo: DSILogo
  }
];

const IndexPage = ({ data }) => {
  const intl = useIntl();
  const { locale } = useLocalization();
  const featuredExamples = usePreparedExamples(
    data.examples.nodes,
    data.exampleImages.nodes
  );

  // We only show the randomized example once the site is rendered on the
  // client since otherwise the images will always be the ones picked by SSR
  const [randomExamples, setRandomExamples] = useState([]);
  useEffect(() => {
    const shuffled = shuffleArray(featuredExamples.slice());
    setRandomExamples(shuffled.length > 4 ? shuffled.slice(0, 4) : shuffled);
  }, [featuredExamples]);

  return (
    <Layout mainClassName={css.main}>
      <HeadMatter
        title={intl.formatMessage({ id: 'introTitle' })}
        description={intl.formatMessage({ id: 'introText' })}
      />
      <Sketch>
        <div className={css.hero}>
          <h1>{intl.formatMessage({ id: 'introTitle' })}</h1>
          <p>{intl.formatMessage({ id: 'introText' })}</p>
          <div className={css.buttons}>
            <Button
              to="/download"
              variant="animate1"
              size="large"
              className={css.button}>
              {intl.formatMessage({ id: 'download' })}
            </Button>
            <Button
              to="/reference"
              variant="animate1"
              size="large"
              className={css.button}>
              {intl.formatMessage({ id: 'reference' })}
            </Button>
            <Button
              to="/donate"
              variant="animate1"
              size="large"
              className={css.button}>
              {intl.formatMessage({ id: 'donate' })}
            </Button>
          </div>
        </div>
      </Sketch>
      <Examples
        examples={randomExamples}
        heading={intl.formatMessage({ id: 'examples' })}
      />
      <div className={css.gettingStarted}>
        <div className={classnames(grid.grid, grid.container)}>
          <div className={classnames(grid.col, css.gettingStartedMessage)}>
            <h2>{intl.formatMessage({ id: 'gettingStarted' })}</h2>
            <div>
              <p
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage({ id: 'gettingStartedP1' })
                }}></p>
            </div>
          </div>
          <div className={classnames(grid.col, css.cards)}>
            <div className={css.cardsWrapper}>
              <Card className={css.card}>
                <h4>{intl.formatMessage({ id: 'cardGettingStarted' })}</h4>
                <p>
                  {intl.formatMessage({ id: 'cardGettingStartedDescription' })}
                </p>
                <Button to={'/tutorials/gettingstarted'} variant="animate1">
                  {intl.formatMessage({ id: 'cardGettingStartedButton' })}
                </Button>
              </Card>
              <Card className={css.card}>
                <h4>{intl.formatMessage({ id: 'cardReference' })}</h4>
                <p>{intl.formatMessage({ id: 'cardReferenceDescription' })}</p>
                <Button to={'/reference'} variant="animate1">
                  {intl.formatMessage({ id: 'cardReferenceButton' })}
                </Button>
              </Card>
              <Card className={css.card}>
                <h4>{intl.formatMessage({ id: 'cardDownload' })}</h4>
                <p>{intl.formatMessage({ id: 'cardDownloadDescription' })}</p>
                <Button to={'/download'} variant="animate1">
                  {intl.formatMessage({ id: 'cardDownloadButton' })}
                </Button>
              </Card>
              <Card className={css.card}>
                <h4>{intl.formatMessage({ id: 'cardForum' })}</h4>
                <p>{intl.formatMessage({ id: 'cardForumDescription' })}</p>
                <Button
                  target="_blank"
                  rel="noreferrer"
                  href="https://discourse.processing.org/"
                  variant="animate1">
                  {intl.formatMessage({ id: 'cardForumButton' })}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className={css.takePart}>
        <div className={classnames(grid.grid, grid.container)}>
          <div className={classnames(grid.col, css.participate)}>
            <h2>{intl.formatMessage({ id: 'participate' })}</h2>
            <div>
              <p>{intl.formatMessage({ id: 'participateP1' })}</p>
            </div>
            <div className={css.participateButton}>
              <Button
                href={
                  'https://processingfoundation.org/advocacy/pcd-2021'
                }
                variant="animate1"
                size="large">
                {intl.formatMessage({ id: 'buttonParticipate' })}
              </Button>
            </div>
          </div>
          <div className={classnames(grid.col, css.contribute)}>
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
            <div className={css.contributeButton}>
              <Button
                href={'https://github.com/processing'}
                variant="animate1"
                size="large">
                {intl.formatMessage({ id: 'buttonContribute' })}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={css.external}>
        <div className={classnames(grid.grid, grid.container)}>
          <div className={classnames(grid.col, css.externalLinks)}>
            <h2>{intl.formatMessage({ id: 'externalLinks' })}</h2>
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://openprocessing.org/">
                  OpenProcessing
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://fyprocessing.tumblr.com/">
                  For your Processing
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.creativeapplications.net/category/processing/">
                  Creative Applications
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.reddit.com/r/processing/">
                  Processing Subreddit
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://vimeo.com/groups/processing">
                  Vimeo
                </a>
              </li>
              <li>
                <a target="_blank" rel="noreferrer" href="http://sketchpad.cc/">
                  Studio Sketchpad
                </a>
              </li>
            </ul>
          </div>
          <div className={classnames(grid.col, css.partners)}>
            <h2>{intl.formatMessage({ id: 'partners' })}</h2>
            <ul className={css.partnersList}>
              {partners.map(({ name, url, width, Logo }, i) => {
                return (
                  <li
                    key={`partner-${i}`}
                    className={css.partner}
                    style={{ flexBasis: width }}>
                    <a
                      className={css.logo}
                      href={url}
                      target="_blank"
                      rel="noreferrer">
                      {typeof Logo === 'string' ? (
                        <GatsbyImage
                          image={data[Logo].childImageSharp.gatsbyImageData}
                          alt={name}
                        />
                      ) : (
                        <Logo />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Examples = memo(({ heading, examples, locale }) => {
  const intl = useIntl();
  return (
    <div className={classnames(grid.grid, css.examples)}>
      <h3 className={classnames(grid.col, css.examplesHeading)}>{heading}</h3>
      {examples.map((example) => (
        <div className={classnames(grid.col, css.example)} key={example.path}>
          <Link to={example.path}>
            <div className={css.imgContainer}>
              {example.image && (
                <GatsbyImage
                  image={example.image.childImageSharp.gatsbyImageData}
                  alt={`Code output of the ${example.name} code example`}
                  loading="eager"
                />
              )}
            </div>
            <h4>{example.name}</h4>
            <p>in {example.subcategory} examples</p>
          </Link>
        </div>
      ))}
      <div className={classnames(grid.col, css.moreExamples)}>
        <Button to={'/examples'} variant="animate1">
          {intl.formatMessage({ id: 'moreExamples' })}
        </Button>
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
        dir: { regex: "/^((?!data).)*$/" }
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
        dir: { regex: "/^((?!data).)*$/" }
      }
    ) {
      nodes {
        id
        name
        relativeDirectory
        childImageSharp {
          gatsbyImageData(width: 800)
        }
      }
    }
    itp: file(relativePath: { eq: "partners/nyu-itp.png" }) {
      childImageSharp {
        gatsbyImageData(width: 150)
      }
    }
  }
`;
