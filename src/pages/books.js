import React from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';

import css from '../styles/pages/books.module.css';
import grid from '../styles/grid.module.css';

const Books = ({ data }) => {
  const intl = useIntl();

  const images = data.images.nodes;

  return (
    <Layout>
      <Helmet>
        <title>Books</title>
      </Helmet>
      <div className={classnames(grid.grid, css.root)}>
        <h1 className={grid.col}>Books</h1>
        <h3 className={grid.col}>{intl.formatMessage({ id: 'booksIntro' })}</h3>
        <div className={classnames(grid.nest, css.section)}>
          <ul className={css.booksList}>
            {data.books.nodes.map((node, k) => {
              const {
                title,
                author,
                details,
                order,
                language,
              } = node.childMdx.frontmatter;
              const img = images.filter(
                (img) => img.name === node.relativeDirectory
              );
              const orderList = order.split(',').map((ord) => ({
                label: ord.split('-')[0],
                link: ord.split('-')[1],
              }));
              return (
                <li key={k} className={classnames(grid.nest, css.listItem)}>
                  <div className={classnames(grid.col, css.cover)}>
                    <Img fluid={img[0].childImageSharp.fluid} />
                  </div>
                  <div className={classnames(grid.col, css.book)}>
                    <h3>{title}</h3>
                    <p className={css.details}>{details}</p>
                    <p className={css.author}>
                      {intl.formatMessage({ id: 'by' })} {author}
                    </p>
                    {language && <p>{language}</p>}
                    <ul>
                      {orderList.map((order, key) => (
                        <li key={key + 'l'}>
                          <a href={order.link} target="_blank" rel="noreferrer">
                            {order.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <details className={css.read}>
                      <summary>
                        {intl.formatMessage({ id: 'readMore' })}
                      </summary>
                      <div>
                        <MDXRenderer>{node.childMdx.body}</MDXRenderer>
                      </div>
                    </details>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
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
