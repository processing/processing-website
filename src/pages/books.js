import React from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useIntl } from 'react-intl';

import HeadMatter from '../components/HeadMatter';
import Layout from '../components/Layout';

import { usePreparedBooks } from '../hooks/books';

import * as css from '../styles/pages/books.module.css';
import * as grid from '../styles/grid.module.css';

const Books = ({ data }) => {
  const intl = useIntl();
  const books = usePreparedBooks(data.books.nodes, data.images.nodes);

  return (
    <Layout>
      <HeadMatter
        title={intl.formatMessage({ id: 'books' })}
        description={intl.formatMessage({ id: 'booksIntro' })}
      />
      <div className={classnames(grid.grid, grid.container, css.root)}>
        <h1 className={grid.col}>{intl.formatMessage({ id: 'books' })}</h1>
        <h3 className={grid.col}>{intl.formatMessage({ id: 'booksIntro' })}</h3>
        <ul className={classnames(grid.col, grid.grid, css.booksList)}>
          {books.map((book, i) => {
            var langBook;
            if (book.language) {
              langBook = intl.formatMessage({ id: book.language });
            }
            return (
              <li key={`${book.title}-${i}`} className={css.listItem}>
                <div className={classnames(grid.col, css.cover)}>
                  {book.image && (
                    <GatsbyImage
                      image={book.image.childImageSharp.gatsbyImageData}
                      alt={`Book cover for the book ${book.title}`}
                    />
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
                    { langBook &&  intl.formatMessage({ id: 'textIn' })}  {langBook}
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
  query  ($locale: String!){
      books: allFile(
      filter: {
        sourceInstanceName: { eq: "books" }
        extension: { eq: "mdx" }
        childMdx: { fields: { locale: { eq: $locale } } }
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
          gatsbyImageData(width: 1200)
        }
      }
    }
  }
`;
