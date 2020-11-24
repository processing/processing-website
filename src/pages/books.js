import React from 'react';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { useLocalization } from 'gatsby-theme-i18n';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';

import css from '../styles/pages/books.module.css';
import grid from '../styles/grid.module.css';

const Books = ({ data }) => {
  const { locale } = useLocalization();

  const images = data.images.nodes;

  return (
    <Layout>
      <div className={grid.grid}>
        <h1 className={grid.col8}>Books</h1>
        <h3 className={grid.col3}>
          Processing books cover topics from programming basics to
          visualization. Browse this page to find the right books for you.
        </h3>
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
                <li key={k} className={classnames(grid.col4, css.listItem)}>
                  <div className={grid.col1}>
                    <Img
                      className={classnames(grid.col1, css.cover)}
                      fixed={img[0].childImageSharp.fixed}
                    />
                  </div>
                  <div className={grid.col3}>
                    <h3>{title}</h3>
                    <p className={css.details}>{details}</p>
                    <p className={css.author}>by {author}</p>
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
                      <summary>Read more</summary>
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
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`;
