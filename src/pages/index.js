import React, { useMemo } from 'react';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import { LocalizedLink as Link, useLocalization } from 'gatsby-theme-i18n';

import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import Sketch from '../components/sketch/Sketch';

import { subcategoryFromDirectory } from '../utils/data';

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

  const items = data.examples.nodes;
  const images = data.images.nodes;

  const examples = useMemo(
    () =>
      items.map((item, i) => {
        const image = images
          ? images.find(
              (img) => img.relativeDirectory === item.relativeDirectory
            )
          : '';
        const [cat, subcat, slug] = item.relativeDirectory.split('/');
        return {
          slug: slug,
          subcat: subcat,
          cat: cat,
          name: item.name,
          dir: item.relativeDirectory,
          img: image,
        };
      }),
    [items, images]
  );

  const selectedExamples = useMemo(() => {
    return examples ? examples.slice(0, 4) : [];
  }, [examples]);

  return (
    <Layout isHomepage>
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
      <div className={classnames(grid.grid, css.section)}>
        <div className={classnames(grid.col, grid.nest, css.examples)}>
          <h3 className={grid.col}>{intl.formatMessage({ id: 'examples' })}</h3>
          <ul>
            {selectedExamples.map((example, i) => (
              <li
                className={classnames(css.example, grid.col)}
                key={`example-${i}`}>
                <Link
                  to={`/examples/${example.slug.toLowerCase()}.html`}
                  language={locale}>
                  <div className={css.imgContainer}>
                    <img
                      src={example.img.childImageSharp.fluid.srcWebp}
                      srcSet={example.img.childImageSharp.fluid.srcSetWebp}
                      alt=""
                    />
                  </div>
                  <h4>{example.name}</h4>
                  <p>{`in ${subcategoryFromDirectory(
                    example.dir
                  )} examples`}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className={classnames(grid.col, css.moreButton)}>
            <Button to={'/examples'}>More Examples</Button>
          </div>
        </div>
      </div>
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
            <Card
              to={'/reference'}
              description={intl.formatMessage({
                id: 'cardReferenceDescription',
              })}
              className={css.card}>
              {intl.formatMessage({ id: 'cardReference' })}
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
              description={intl.formatMessage({
                id: 'cardForumDescription',
              })}
              className={css.card}>
              {intl.formatMessage({ id: 'cardForum' })}
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

export default IndexPage;

export const query = graphql`
  query {
    examples: allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        fields: { lang: { eq: "en" } }
      }
      sort: { order: ASC, fields: relativeDirectory }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          name
          title
        }
      }
    }
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        extension: { regex: "/(jpg)|(jpeg)|(png)|(gif)/" }
      }
    ) {
      nodes {
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
