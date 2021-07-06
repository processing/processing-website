import React from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';

import { usePreparedBooks } from '../hooks/books';

import css from '../styles/pages/books.module.css';
import grid from '../styles/grid.module.css';

const Books = ({ data }) => {
  const intl = useIntl();
  const books = usePreparedBooks(data.books.nodes, data.images.nodes);

  return (
    <Layout>
      <Helmet>
        <title>Books</title>
      </Helmet>
      <div className={classnames(grid.grid, grid.container, css.root)}>
        <h1 className={grid.col}>Books</h1>
        <h3 className={grid.col}>{intl.formatMessage({ id: 'booksIntro' })}</h3>
        <ul className={classnames(grid.col, grid.grid, css.booksList)}>
          {books.map((book, i) => {
            return (
              <li
                key={`${book.title}-${i}`}
                className={classnames(grid.nest, css.listItem)}>
                <div className={classnames(grid.col, css.cover)}>
                  {book.image && (
                    <Img fluid={book.image.childImageSharp.fluid} />
                  )}
                </div>
                <div className={classnames(grid.col, css.book)}>
                  <h3>{book.title}</h3>
                  {book.author && (
                    <p className={css.author}>
                      {intl.formatMessage({ id: 'by' })} {book.author}
                    </p>
                  )}
                  <p className={css.details}>
                    {intl.formatMessage({ id: 'published' })} {book.published}.{' '}
                    {book.details}{' '}
                    {book.language && `Text in ${book.language}.`}
                  </p>

                  {book.buyList && (
                    <ul className={css.buyList}>
                      {book.buyList.map((buy) => (
                        <li key={buy.link}>
                          <a href={buy.link} target="_blank" rel="noreferrer">
                            {buy.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  <details className={css.read}>
                    <summary>{intl.formatMessage({ id: 'readMore' })}</summary>
                    <div className={css.more}>
                      <MDXRenderer>{book.body}</MDXRenderer>
                    </div>
                  </details>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Books;

export const query = graphql`
  query {
    books: allFile(
      filter: {
        sourceInstanceName: { eq: "books" }
        extension: { eq: "mdx" }
        childMdx: { fields: { locale: { eq: "en" } } }
      }
      sort: { order: DESC, fields: childrenMdx___frontmatter___published }
    ) {
      nodes {
        name
        relativeDirectory
        childMdx {
          frontmatter {
            title
            author
            details
            published
            buy
            language
          }
          body
        }
      }
    }
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "books" }
        extension: { regex: "/(jpg)|(jpeg)|(png)|(gif)/" }
      }
    ) {
      nodes {
        name
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
