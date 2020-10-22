import React from 'react';
import classnames from 'classnames';

import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';
import Button from '../components/Button';

import { useLocalization } from 'gatsby-theme-i18n';

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

const IndexPage = () => {
  const intl = useIntl();
  const { locale } = useLocalization();
  return (
    <Layout>
      <div className={css.hero}>
        <div className={classnames(grid.grid, grid.nest)}>
          <div className={classnames(grid.col4, css.intro)}>
            <h1 className={classnames(grid.col2, grid.pull1)}>
              {' '}
              Welcome to Processing!{' '}
            </h1>
            <div className={grid.col4}>
              Processing is a flexible software sketchbook and a language for
              learning how to code within the context of the visual arts. Since
              2001, Processing has promoted software literacy within the visual
              arts and visual literacy within technology. There are tens of
              thousands of students, artists, designers, researchers, and
              hobbyists who use Processing for learning and prototyping.
            </div>
            <div className={classnames(grid.col4, css.buttons)}>
              <Button to={'/download'} className={classnames(css.button)}>
                Download
              </Button>
              <Button to={'/reference'} className={classnames(css.button)}>
                Reference
              </Button>
              <Button to={'/donate'} className={classnames(css.button)}>
                Donate
              </Button>
            </div>
          </div>
          <div className={grid.col4}></div>
        </div>
      </div>
      <div className={grid.grid}>
        <div className={classnames(grid.col2, grid.nest)}>
          <ul className={classnames(grid.col2, css.list)}>
            {items.map((item, key) => (
              <li key={key}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
          <div className={classnames(grid.col2, css.contact)}>
            <h4>Contact</h4>
            <span>Feel free to write us</span>
            <a href="mailto: foundation@processing.org">
              foundation@processing.org
            </a>
          </div>
        </div>
        <div className={classnames(grid.col6, grid.nest)}>
          <h3 className={classnames(grid.col6, grid.nest)}> Examples</h3>
        </div>
      </div>
      <div className={grid.grid}>
        <div className={classnames(grid.col4, grid.nest)}>
          <h3 className={grid.col4}>Getting started</h3>
          <div className={grid.col4}>
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
          <h3 className={grid.col4}>Contribute</h3>
          <div className={grid.col4}>
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
        <div className={classnames(grid.col4, grid.nest)}>
          <h3 className={grid.col4}>News</h3>
          <p>
            The Processing Community Day (PCD) initiative is evolving. For 2020,
            we will offer a mentorship program for PCD Worldwide Organizers who
            are interested in learning from past community organizers and
            mentors. The goal is to help a diverse group of organizers launch a
            PCD in their local communities. Check out the PCD @ Worldwide site
            to learn more about starting or attending an event in 2020!
          </p>
          <h3 className={grid.col4}>Partners</h3>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
