import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import TableOfContents from '../components/TableOfContents';

import css from '../styles/pages/page.module.css';
import grid from '../styles/grid.module.css';

const TutorialTemplate = ({ data, pageContext }) => {
  const { mdx } = data;
  const { frontmatter, body, tableOfContents } = mdx;
  console.log(mdx);

  return (
    <Layout>
      <div className={grid.grid}>
        {mdx !== null ? (
          <Fragment>
            <TableOfContents items={tableOfContents.items} />
            <h1
              className={classnames(
                grid.push2,
                grid.col5,
                grid.pull1,
                css.title
              )}>
              {frontmatter.title}
            </h1>
            <span
              className={classnames(
                grid.push2,
                grid.col5,
                grid.pull1,
                css.author
              )}>{`By ${frontmatter.author}`}</span>
            <div className={classnames(grid.col5, grid.push2, css.content)}>
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
