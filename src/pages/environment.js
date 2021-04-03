import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Donate from '../components/character/Donate';
import Layout from '../components/Layout';
import TableOfContents from '../components/TableOfContents';

import { useHighlight } from '../hooks';

import css from '../styles/pages/page.module.css';
import grid from '../styles/grid.module.css';

const Environment = ({ data }) => {
  const { mdx } = data;
  const { frontmatter, body, tableOfContents } = mdx;
  const intl = useIntl();
  const ref = useHighlight();

  return (
    <Layout>
      <Helmet>
        <title>Environment</title>
      </Helmet>
      <div className={classnames(grid.grid, css.root)} ref={ref}>
        <Donate />
        {mdx !== null ? (
          <Fragment>
            <h1 className={grid.col}>{frontmatter.title}</h1>
            <TableOfContents items={tableOfContents.items} />
            <div className={classnames(grid.col, css.content)}>
              <MDXRenderer>{body}</MDXRenderer>
            </div>
          </Fragment>
        ) : (
          <div>
            {intl.formatMessage({ id: 'notTranslated' })}
            {intl.formatMessage({ id: 'englishPage' })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($locale: String!) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: "/environment" } }
    ) {
      body
      frontmatter {
        slug
        title
      }
      tableOfContents
    }
  }
`;

export default Environment;
