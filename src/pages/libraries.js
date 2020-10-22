import React, { useState, useMemo } from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import unique from 'array-unique';

import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { useLocalization } from 'gatsby-theme-i18n';

import Layout from '../components/Layout';
import CategoryNav from '../components/CategoryNav';
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

  const filtered = useMemo(
    () => filterItems(contributions, searchTerm),
    [contributions, searchTerm]
  );

  let categories = unique(filtered.flatMap((con) => con.categories));

  return (
    <Layout>
      <div className={grid.grid}>
        <h1 className={grid.col8}>Libraries</h1>
        <h3 className={classnames(grid.col3, grid.pull5)}>
          Extend Processing beyond graphics and images into audio, video, and
          communication with other devices.
        </h3>
        <ul
          className={classnames(
            css.list,
            grid.col5andhalf,
            grid.push1andhalf,
            grid.nest
          )}>
          {libraries.nodes.map((node, key) => {
            return (
              <li key={key} className={css.subgrid}>
                <Link
                  className={grid.col1andhalf}
                  to={'/reference/libraries/' + node.name + '/index.html'}
                  language={locale}>
                  <h3>{node.name}</h3>
                </Link>
                <p className={grid.col4}>Description</p>
              </li>
            );
          })}
        </ul>
        <h1 className={grid.col8}>Contributions</h1>
        <Searchbar
        placeholder={'Search in the Libraries...'}
          onChange={(e) => setSearchTerm(e.target.value)}
          searchTerm={searchTerm}
          className={grid.push1}
          large/>
        <CategoryNav categories={categories} />
        <ul className={css.contributionsList}>
          {categories.map((cat) => {
            let contribs = filtered.filter((c) =>
              c.categories.includes(cat)
            );
            return (
              <li key={cat} className={grid.nest}>
                <h2 className={grid.col1andhalf}>{cat}</h2>
                <ul className={classnames(grid.col5andhalf, grid.nest)}>
                  {contribs.map((node, key) => {
                    return (
                      <li
                        key={key + 'c'}
                        className={classnames(css.subgrid, grid.col5andhalf)}>
                        <div
                          className={classnames(
                            grid.col2andhalf,
                            css.contributionData
                          )}>
                          <h3>{node.name}</h3>
                          <span>{node.authors}</span>
                        </div>
                        <div className={grid.col4}>
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
      }
    ) {
      nodes {
        name
        childJson {
          name
          authors
          sentence
          categories
        }
      }
    }
  }
`;
