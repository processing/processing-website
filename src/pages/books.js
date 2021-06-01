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
                  <p className={css.details}>{book.details}</p>
                  <p className={css.author}>
                    {intl.formatMessage({ id: 'by' })} {book.author}
                  </p>
                  {book.language && <p>{book.language}</p>}
                  {book.orderList && (
                    <ul>
                      {book.orderList.map((order) => (
                        <li key={order.link}>
                          <a href={order.link} target="_blank" rel="noreferrer">
                            {order.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  <details className={css.read}>
                    <summary>{intl.formatMessage({ id: 'readMore' })}</summary>
                    <div>
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
    ) {
      nodes {
        name
        relativeDirectory
        childMdx {
          frontmatter {
            title
            author
            details
            order
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
