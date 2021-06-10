import React from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useIntl } from 'react-intl';

import Donate from '../components/character/Donate';
import Layout from '../components/Layout';

import css from '../styles/pages/about.module.css';
import grid from '../styles/grid.module.css';

const Overview = ({ data, pageContext }) => {
  const { mdx } = data;
  const intl = useIntl();
  return (
    <Layout>
      <Helmet>
        <title>{intl.formatMessage({ id: 'overview' })}</title>
      </Helmet>
      <div className={classnames(grid.grid, grid.container, css.root)}>
        {mdx ? (
          <>
            <Donate />
            <h1 className={grid.col}>{mdx.frontmatter.title}</h1>
            <h3 className={grid.col}>
              {intl.formatMessage({ id: 'overviewIntro' })}
            </h3>
            <div className={classnames(grid.col, css.content)}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </div>
          </>
        ) : (
          <>
            {intl.formatMessage({ id: 'notTranslated' })}&nbsp;
            <Link to={pageContext.originalPath}>
              {intl.formatMessage({ id: 'englishPage' })}
            </Link>
          </>
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($locale: String!) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: "/overview" } }
    ) {
      body
      frontmatter {
        slug
        title
      }
    }
  }
`;

export default Overview;
