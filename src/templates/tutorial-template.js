import React, { Fragment, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import TableOfContents from '../components/TableOfContents';

import { useHighlight } from '../utils/hooks';

import css from '../styles/pages/page.module.css';
import grid from '../styles/grid.module.css';

const TutorialTemplate = ({ data, pageContext }) => {
  const { mdx } = data;
  const { frontmatter, body, tableOfContents } = mdx;
  const ref = useHighlight();

  return (
    <Layout>
      <div className={classnames(grid.grid, css.root)} ref={ref}>
        {mdx !== null ? (
          <Fragment>
            <TableOfContents items={tableOfContents.items} />
            <h1 className={grid.col}>{frontmatter.title}</h1>
            <span
              className={classnames(
                grid.col,
                css.author
              )}>{`By ${frontmatter.author}`}</span>
            <div className={classnames(grid.col, css.content)}>
              <MDXRenderer>{body}</MDXRenderer>
            </div>
          </Fragment>
        ) : (
          <div>
            This page is not translated, please refer to the
            <Link to={pageContext.slug}> english page</Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TutorialTemplate;

export const query = graphql`
  query($locale: String!, $slug: String!) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $slug } }
    ) {
      body
      frontmatter {
        title
        slug
        author
        level
      }
      tableOfContents
    }
  }
`;
