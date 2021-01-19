import React, { useState, useMemo } from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import unique from 'array-unique';

import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import CategoryNav from '../components/CategoryNav';
import Donate from '../components/character/Donate';
import Layout from '../components/Layout';
import Searchbar from '../components/Searchbar';

import { filterItems } from '../utils/data';

import css from '../styles/pages/libraries.module.css';
import grid from '../styles/grid.module.css';

const Libraries = ({ data }) => {
  const { locale } = useLocalization();
  const { libraries, currentLang, english } = data;
  const [searchTerm, setSearchTerm] = useState('');

  let contributions = [];

  english.nodes.forEach((en) => {
    currentLang.nodes.forEach((con) => {
      if (en.name === con.name.split('.')[0]) {
        contributions.push({ ...en.childJson, ...con.childJson });
      } else if (locale !== 'en') {
        contributions.push(en.childJson);
      }
    });
  });

  const filtered = useMemo(() => filterItems(contributions, searchTerm), [
    contributions,
    searchTerm,
  ]);

  let categories = unique(filtered.flatMap((con) => con.categories));

  return (
    <Layout>
      <div className={classnames(grid.grid, css.root)}>
        <Donate />
        <h1 className={grid.col}>Libraries</h1>
        <h3 className={grid.col}>
          Extend Processing beyond graphics and images into audio, video, and
          communication with other devices.
        </h3>
        <div className={css.listWrapper}>
          <ul className={css.list}>
            {libraries.nodes.map((node, key) => {
              return (
                <li key={key} className={css.subgrid}>
                  <Link
                    className={classnames(css.librarieName, grid.col)}
                    to={'/reference/libraries/' + node.name + '/index.html'}
                    language={locale}>
                    <h3>{node.name}</h3>
                  </Link>
                  <p className={grid.col}>Description</p>
                </li>
              );
            })}
          </ul>
        </div>
        <h1 className={grid.col}>Contributions</h1>
        <Searchbar
          placeholder={'Search in the Contributions...'}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={(e) => setSearchTerm('')}
          searchTerm={searchTerm}
          className={css.searchbar}
          large
        />
        <CategoryNav categories={categories} />
        <ul className={classnames(grid.col, grid.nest, css.contributionsList)}>
          {categories.map((cat) => {
            let contribs = filtered.filter((c) => c.categories.includes(cat));
            return (
              <li key={cat} className={grid.nest}>
                <h2 className={grid.col}>{cat}</h2>
                <ul className={classnames(grid.col, grid.nest)}>
                  {contribs.map((node, key) => {
                    return (
                      <li key={key + 'c'} className={classnames(css.subgrid)}>
                        <div
                          className={classnames(
                            grid.col,
                            css.contributionData
                          )}>
                          <h3>
                            <a href={node.url} target="_blank" rel="noreferrer">
                              {node.name}
                            </a>
                          </h3>
                          {node.authors.map((author, key) => (
                            <a
                              key={key + 'a'}
                              href={author.link}
                              target="_blank"
                              rel="noreferrer"
                              className={css.contributionAuthor}>
                              {author.name}
                            </a>
                          ))}
                        </div>
                        <div
                          className={classnames(
                            grid.col,
                            css.contributionBrief
                          )}>
                          <p>{node.sentence}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Libraries;

export const query = graphql`
  query($locale: String!) {
    libraries: allDirectory(
      filter: { relativeDirectory: { eq: "en" }, name: { ne: "processing" } }
    ) {
      nodes {
        name
      }
    }
    currentLang: allFile(
      filter: {
        sourceInstanceName: { eq: "contributions" }
        fields: { lang: { eq: $locale } }
        childJson: { type: { eq: "library" } }
      }
    ) {
      nodes {
        name
        childJson {
          sentence
        }
      }
    }
    english: allFile(
      filter: {
        sourceInstanceName: { eq: "contributions" }
        fields: { lang: { eq: "en" } }
        childJson: { type: { eq: "library" } }
      }
    ) {
      nodes {
        name
        childJson {
          name
          url
          authors {
            name
            link
          }
          sentence
          categories
        }
      }
    }
  }
`;
