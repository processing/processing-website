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
      <div className={classnames(grid.grid, css.hero)}>
        <div className={classnames(grid.col4)}>
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
            <Button to={"/download"} className={classnames(css.button)}>Download</Button>
            <Button to={"/reference"} className={classnames(css.button)}>Reference</Button>
            <Button to={"/donate"} className={classnames(css.button)}>Donate</Button>
          </div>
        </div>
        <div className={grid.col4}></div>
      </div>
      <div className={grid.grid}>
        <div className={grid.col1andhalf}>
          <ul className={classnames(grid.col1andhalf, css.list)}>
            {items.map((item, key) => (
              <li key={key}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
          <p className={classnames(grid.col1andhalf, css.contact)}>
            <h4>Contact</h4>
            <span>Feel free to write us</span>
            <a href = "mailto: foundation@processing.org">foundation@processing.org</a>
          </p>
        </div>
        <div className={grid.col6}>
          <h3 className={grid.col6}> Examples</h3>
        </div>
      </div>
      <div className={grid.grid}>
        <div className={grid.col4}>
          <h3>Getting started</h3>
          <h3>Contribute</h3>
        </div>
        <div className={grid.col4}>
          <h3>News</h3>
          <h3>Partners</h3>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
