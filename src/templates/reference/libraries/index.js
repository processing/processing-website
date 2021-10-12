import React, { Fragment, useState, memo } from 'react';

import { graphql } from 'gatsby';
import unique from 'array-unique';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import { useLocalization, LocalizedLink as Link } from 'gatsby-theme-i18n';

import HeadMatter from '../../../components/HeadMatter';
import Shortcuts from '../../../components/Shortcuts';
import Donate from '../../../components/character/Donate';
import Layout from '../../../components/Layout';
import FilterBar from '../../../components/FilterBar';

import { useFilteredArray } from '../../../hooks';
import { usePreparedContributions } from '../../../hooks/libraries';
import { slugify, widont, linkParsing } from '../../../utils';
import { referencePath } from '../../../utils/paths';

import * as css from '../../../styles/pages/libraries.module.css';
import * as grid from '../../../styles/grid.module.css';

const Libraries = ({ data, pageContext }) => {
  const { locale } = useLocalization();
  const intl = useIntl();
  const { coreLibraries, currentLang, english } = data;
  const [searchTerm, setSearchTerm] = useState('');

  const contributions = usePreparedContributions(
    english.nodes,
    currentLang.nodes,
    locale
  );

  console.log(english.nodes);
  console.log(currentLang.nodes);

  const filtered = useFilteredArray(contributions, searchTerm);
  const categories = unique(filtered.flatMap((con) => con.categories));

  return (
    <Layout>
      <HeadMatter
        title={intl.formatMessage({ id: 'libraries' })}
        description={intl.formatMessage({ id: 'librariesIntro' })}
      />
      <div className={classnames(grid.container, grid.grid)}>
        <Donate />
        <div className={classnames(grid.col, css.text)}>
          <h1>{intl.formatMessage({ id: 'libraries' })}</h1>
          <h3>{intl.formatMessage({ id: 'librariesIntro' })}</h3>
        </div>
        <CoreList libraries={coreLibraries} intl={intl} />
        <div className={classnames(grid.col, css.text, css.pushDown)}>
          <h1>{intl.formatMessage({ id: 'contributions' })}</h1>
          <h3>{intl.formatMessage({ id: 'contributionsIntro' })}</h3>
        </div>
        <div className={classnames(grid.col, css.filter)}>
          <FilterBar
            placeholder={intl.formatMessage({ id: 'librariesFilter' })}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => setSearchTerm('')}
            searchTerm={searchTerm}
            large
          />
        </div>
        <Shortcuts categories={categories} />
        <ContributionsList libraries={filtered} categories={categories} />
      </div>
    </Layout>
  );
};

const CoreList = memo(({ libraries, intl }) => {
  return (
    <>
      <h2 className={classnames(grid.col, css.category)} id="core">
        {intl.formatMessage({ id: 'core' })}
      </h2>
      <ul className={classnames(grid.col, css.list)}>
        {libraries.nodes.map((node, key) => {
          return (
            <li key={key} className={classnames(grid.grid, css.item)}>
              <div className={classnames(grid.col, css.itemName)}>
                <Link to={referencePath('index', node.frontmatter.name)}>
                  <h3>{node.frontmatter.title}</h3>
                </Link>
              </div>
              <p className={classnames(grid.col, css.itemDescription)}>
                {node.frontmatter.description}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
});

const ContributionsList = memo(({ categories, libraries }) => {
  const intl = useIntl();

  return categories.map((cat) => {
    const filtered = libraries.filter((c) => c.categories.includes(cat));
    return (
      <Fragment key={cat}>
        <h2 className={classnames(grid.col, css.category)} id={slugify(cat)}>
          {intl.formatMessage({
            id: `${cat}`
          })}
        </h2>
        <ul className={classnames(grid.col, css.list)}>
          {filtered.map((node, key) => {
            return (
              <li key={key + 'c'} className={classnames(grid.grid, css.item)}>
                <div className={classnames(grid.col, css.itemName)}>
                  <a href={node.url} target="_blank" rel="noreferrer">
                    <h3>{node.name}</h3>
                  </a>
                  {node.authors.map((author, key) => {
                    return author.indexOf('(') !== -1 ? (
                      <a
                        key={key + 'a'}
                        href={author.slice(
                          author.indexOf('(') + 1,
                          author.indexOf(')')
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className={css.contributionAuthor}>
                        {author.slice(
                          author.indexOf('[') + 1,
                          author.indexOf(']')
                        )}
                      </a>
                    ) : (
                      <span key={key + 'span'}>{author}</span>
                    );
                  })}
                </div>
                <p
                  className={classnames(grid.col, css.itemDescription)}
                  dangerouslySetInnerHTML={{
                    __html: linkParsing(widont(node.sentence))
                  }}
                />
              </li>
            );
          })}
        </ul>
      </Fragment>
    );
  });
});

export default Libraries;

export const query = graphql`
  query($locale: String!) {
    coreLibraries: allMdx(
      filter: {
        frontmatter: { library: { eq: "true" } }
        fields: { locale: { eq: $locale } }
      }
    ) {
      nodes {
        frontmatter {
          name
          title
          description
        }
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
          authors
          sentence
          categories
        }
      }
    }
  }
`;
