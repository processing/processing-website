import React from 'react';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';
import Button from '../components/Button';
import Sketch from '../components/sketch/Sketch';

import { useWindowSize } from '../utils/hooks';

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
  const winSize = useWindowSize();

  return (
    <Layout>
      <div className={classnames(css.hero, css.section)}>
        <div className={grid.grid}>
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
          {winSize.width > 1080 && <Sketch />}
        </div>
      </div>
      <div className={classnames(grid.grid, css.section)}>
        <div className={classnames(grid.col, css.sidebar)}>
          <h3>{intl.formatMessage({ id: 'community' })}</h3>
          <ul className={css.list}>
            {items.map((item, key) => (
              <li key={key}>
                <a href={item.link}>{intl.formatMessage({ id: item.name })}</a>
              </li>
            ))}
          </ul>
          <div className={css.contact}>
            <h4>{intl.formatMessage({ id: 'contact' })}</h4>
            <span>{intl.formatMessage({ id: 'contactText' })}&nbsp;</span>
            <a href="mailto: foundation@processing.org">
              {intl.formatMessage({ id: 'contactEmail' })}
            </a>
          </div>
        </div>
        <div className={classnames(grid.col, grid.nest, css.examples)}>
          <h3 className={grid.col}>{intl.formatMessage({ id: 'examples' })}</h3>
          <ul>
            <li className={classnames(css.example, grid.col)}>
              <img src={data.conway.childImageSharp.fluid.src} alt="" />
              <a href="#">Conway's game of life</a>
              <br />
              <p>in Topic examples</p>
            </li>
            <li className={classnames(css.example, grid.col)}>
              <img src={data.flocking.childImageSharp.fluid.src} alt="" />
              <a href="#">Flocking</a>
              <br />
              <p>in Topic examples</p>
            </li>
            <li className={classnames(css.example, grid.col)}>
              <img src={data.radial.childImageSharp.fluid.src} alt="" />
              <a href="#">Radial gradient</a>
              <br />
              <p>in Basic examples</p>
            </li>
            <li className={classnames(css.example, grid.col)}>
              <img src={data.flocking.childImageSharp.fluid.src} alt="" />
              <a href="#">Flocking</a>
              <br />
              <p>in Topic examples</p>
            </li>
          </ul>
          <div className={grid.col}>
            <Button to={'/examples'}>More Examples</Button>
          </div>
        </div>
      </div>
      <div className={classnames(grid.grid, css.bottom)}>
        <div className={classnames(grid.col, css.half)}>
          <h3>{intl.formatMessage({ id: 'gettingStarted' })}</h3>
          <div>
            <p
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: 'gettingStartedP1' }),
              }}></p>
            <p
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: 'gettingStartedP2' }),
              }}></p>
            <p
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: 'gettingStartedP3' }),
              }}></p>
          </div>
          <h3>{intl.formatMessage({ id: 'contribute' })}</h3>
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
        </div>
        <div className={classnames(grid.col, css.half)}>
          <h3>{intl.formatMessage({ id: 'news' })}</h3>
          <img
            src={data.news.childImageSharp.fluid.src}
            alt=""
            className={css.newsCover}
          />
          <p>{intl.formatMessage({ id: 'newsText' })}</p>
          <h3>{intl.formatMessage({ id: 'partners' })}</h3>
          <ul className={css.logos}>
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
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    news: file(relativePath: { eq: "news.png" }) {
      childImageSharp {
        fluid(maxWidth: 800, maxHeight: 250) {
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
