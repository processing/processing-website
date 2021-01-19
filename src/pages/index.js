import React from 'react';
import classnames from 'classnames';

import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';
import Button from '../components/Button';
import Sketch from '../components/sketch/Sketch';

import { useWindowSize } from '../utils/hooks';

import css from '../styles/pages/index.module.css';
import grid from '../styles/grid.module.css';

export const items = [
  {
    name: 'Forum',
    link: 'https://discourse.processing.org/',
  },
  {
    name: 'Github',
    link: 'https://github.com/processing',
  },
  {
    name: 'Issues',
    link: 'https://github.com/processing/processing/issues?state=open',
  },
  {
    name: 'Wiki',
    link: 'https://github.com/processing/processing/wiki/',
  },
  {
    name: 'FAQ',
    link: 'https://github.com/processing/processing/wiki/FAQ',
  },
  {
    name: 'Medium',
    link: 'https://medium.com/@ProcessingOrg',
  },
];

const IndexPage = ({ data }) => {
  //localization - will be needed
  const intl = useIntl();
  const { locale } = useLocalization();
  const winSize = useWindowSize();
  return (
    <Layout>
      <div className={css.hero}>
        <div className={classnames(grid.grid)}>
          <div className={classnames(grid.col, css.intro)}>
            <h1> Welcome to Processing! </h1>
            <p>
              Processing is a flexible software sketchbook and a language for
              learning how to code within the context of the visual arts. Since
              2001, Processing has promoted software literacy within the visual
              arts and visual literacy within technology. There are tens of
              thousands of students, artists, designers, researchers, and
              hobbyists who use Processing for learning and prototyping.
            </p>
            <div className={css.buttons}>
              <Button to={'/download'} className={css.button}>
                Download
              </Button>
              <Button to={'/reference'} className={css.button}>
                Reference
              </Button>
              <Button to={'/donate'} className={css.button}>
                Donate
              </Button>
            </div>
          </div>
          {winSize.width > 1080 && <Sketch />}
        </div>
      </div>
      <div className={classnames(grid.grid)}>
        <div className={classnames(grid.col, grid.nest, css.sidebar)}>
          <ul className={classnames(grid.col, css.list)}>
            {items.map((item, key) => (
              <li key={key}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
          <div className={classnames(grid.col, css.contact)}>
            <h4>Contact</h4>
            <span>Feel free to write us</span>
            <a href="mailto: foundation@processing.org">
              foundation@processing.org
            </a>
          </div>
        </div>
        <div className={classnames(grid.col, grid.nest, css.examples)}>
          <h3 className={grid.col}>Examples</h3>
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
          </ul>
          <h4 className={grid.col}>
            <Link to="/examples">More Examples</Link>
          </h4>
        </div>
      </div>
      <div className={classnames(grid.grid, css.bottom)}>
        <div className={classnames(grid.col, css.half)}>
          <h3>Getting started</h3>
          <div>
            <p>
              Download and open the ‘Processing' application. Select something
              from the Examples. Hit the Run button. Lather, rinse, repeat as
              necessary. More information on using Processing itself is can be
              found in the <Link to="/environment">environment</Link> section of
              the reference.
            </p>
            <p>
              To learn the Processing language, we recommend you try a few of
              the built-in examples, and check out the{' '}
              <Link to="/environment">reference</Link>. A group of diverse{' '}
              <Link to="/books">books</Link> have been written to help people
              with different goals and skill levels. If you're stuck or want to
              talk about your work, head over to the forum section of the site
              to find open minds and helpful peers.
            </p>
            <p>
              For a more detailed overview, check the{' '}
              <Link to="/tutorials/gettingstarted">Getting Started</Link>{' '}
              tutorial.
            </p>
          </div>
          <h3>Contribute</h3>
          <div>
            <p>
              The core Processing software is augmented by libraries and tools
              contributed through the community. These inventive extensions are
              a bright future for the project. We have a list of Contributed
              Libraries and Contributed Tools posted online. These contributions
              can't be underestimated.
            </p>
            <p>
              To contribute to Processing development, please visit Processing
              on GitHub to read instructions for downloading the code,{' '}
              <a href="https://github.com/processing/processing/wiki/Build-Instructions">
                building from the source
              </a>
              ,{' '}
              <a href="https://github.com/processing/processing/wiki/Report-Bugs">
                reporting and tracking bugs
              </a>
              , and{' '}
              <a href="https://github.com/processing/processing/wiki">
                creating libraries and tools
              </a>
              .
            </p>
          </div>
        </div>
        <div className={classnames(grid.col, css.half)}>
          <h3>News</h3>
          <img src={data.news.childImageSharp.fluid.src} alt="" />
          <p>
            The Processing Community Day (PCD) initiative is evolving. For 2020,
            we will offer a mentorship program for PCD Worldwide Organizers who
            are interested in learning from past community organizers and
            mentors. The goal is to help a diverse group of organizers launch a
            PCD in their local communities. Check out the PCD @ Worldwide site
            to learn more about starting or attending an event in 2020!
          </p>
          <h3>Partners</h3>
          <ul className={css.logos}>
            <li>
              <img src={data.fathom.childImageSharp.fluid.src} alt="" />
              <p>Fathom</p>
            </li>
            <li>
              <img src={data.itp.childImageSharp.fluid.src} alt="" />
              <p>ITP NYU</p>
            </li>
            <li>
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
