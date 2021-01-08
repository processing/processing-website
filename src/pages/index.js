import React from 'react';
import classnames from 'classnames';

import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';
import Button from '../components/Button';
import Sketch from '../components/sketch/Sketch';

import { useLocalization } from 'gatsby-theme-i18n';

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
  //localization - will be needed
  const intl = useIntl();
  const { locale } = useLocalization();
  return (
    <Layout>
      <div className={css.hero}>
        <div className={classnames(grid.grid, grid.nest)}>
          <div className={classnames(grid.col4, css.intro, grid.nest)}>
            <h1 className={classnames(grid.col2, grid.pull1)}>
              {' '}
              {intl.formatMessage({ id: 'introTitle' })}{' '}
            </h1>
            <p className={grid.col4}>
              {intl.formatMessage({ id: 'introText' })}
            </p>
            <div className={classnames(grid.col4, css.buttons)}>
              <Button to={'/download'} className={css.button}>
                {intl.formatMessage({ id: 'download' })}
              </Button>
              <Button to={'/reference'} className={css.button}>
                {intl.formatMessage({ id: 'reference' })}
              </Button>
              <Button to={'/donate'} className={css.button}>
                {intl.formatMessage({ id: 'donate' })}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Sketch />
      <div className={classnames(grid.grid, css.bottom)}>
        <div className={classnames(grid.col2, grid.nest)}>
          <ul className={classnames(grid.col2, css.list)}>
            {items.map((item, key) => (
              <li key={key}>
                <a href={item.link}>{intl.formatMessage({ id: item.name })}</a>
              </li>
            ))}
          </ul>
          <div className={classnames(grid.col2, css.contact)}>
            <h4>{intl.formatMessage({ id: 'contact' })}</h4>
            <span>{intl.formatMessage({ id: 'contactText' })}</span>
            <a href="mailto: foundation@processing.org">
              {intl.formatMessage({ id: 'contactEmail' })}
            </a>
          </div>
        </div>
        <div className={classnames(grid.col6, grid.nest)}>
          <h3 className={classnames(grid.col6, grid.nest)}>
            {intl.formatMessage({ id: 'examples' })}
          </h3>
          <ul className={classnames(grid.col6, grid.nest, css.examples)}>
            <li className={classnames(grid.col2, grid.nest)}>
              <img src={data.conway.childImageSharp.fluid.src} alt="" />
              <a href="#">Conway's game of life</a>
              <p className={classnames(grid.col2, grid.nest)}>
                in Topic examples
              </p>
            </li>
            <li className={classnames(grid.col2, grid.nest)}>
              <img src={data.flocking.childImageSharp.fluid.src} alt="" />
              <a href="#">Flocking</a>
              <p className={classnames(grid.col2, grid.nest)}>
                in Topic examples
              </p>
            </li>
            <li className={classnames(grid.col2, grid.nest)}>
              <img src={data.radial.childImageSharp.fluid.src} alt="" />
              <a href="#">Radial gradient</a>
              <p className={classnames(grid.col2, grid.nest)}>
                in Basic examples
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className={classnames(grid.grid, css.bottom)}>
        <div className={classnames(grid.col4, grid.nest)}>
          <h3 className={grid.col4}>
            {intl.formatMessage({ id: 'gettingStarted' })}
          </h3>
          <div className={grid.col4}>
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
          <h3 className={grid.col4}>
            {intl.formatMessage({ id: 'contribute' })}
          </h3>
          <div className={grid.col4}>
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
        <div className={classnames(grid.col4, grid.nest)}>
          <h3 className={grid.col4}>{intl.formatMessage({ id: 'news' })}</h3>
          <div className={grid.col4}>
            <img src={data.news.childImageSharp.fluid.src} alt="" />
          </div>
          <p className={classnames(grid.col4, css.news)}>
            {intl.formatMessage({ id: 'newsText' })}
          </p>
          <h3 className={grid.col4}>
            {intl.formatMessage({ id: 'partners' })}
          </h3>
          <ul className={classnames(grid.col6, grid.nest, css.logos)}>
            <li className={grid.col1}>
              <img src={data.fathom.childImageSharp.fluid.src} alt="" />
              <p>Fathom</p>
            </li>
            <li className={grid.col1}>
              <img src={data.itp.childImageSharp.fluid.src} alt="" />
              <p>ITP NYU</p>
            </li>
            <li className={grid.col1}>
              <img src={data.ucla.childImageSharp.fluid.src} alt="" />
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
