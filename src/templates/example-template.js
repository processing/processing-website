import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';

const ExampleTemplate = ({ data, pageContext }) => {
  const { mdx, examples } = data;
  const [show, setShow] = useState(false);

  const toggleSidebar = (show) => {
    setShow(show);
  };

  return (
    <Layout>
      <Sidebar refs={examples} onChange={toggleSidebar} show={show} examples />
      {mdx !== null ? (
        <div style={{ marginLeft: show ? '350px' : '50px' }}>
          <h1>{mdx.frontmatter.title}</h1>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      ) : (
        <div style={{ marginLeft: show ? '350px' : '50px' }}>
          This page is not translated, please refer to the
          <Link to={pageContext.slug}> english page</Link>
        </div>
      )}
    </Layout>
  );
};

export default ExampleTemplate;

export const query = graphql`
  query($locale: String!, $slug: String!) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $slug } }
    ) {
      body
      frontmatter {
        slug
        title
      }
    }
    examples: allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        childMdx: { fields: { locale: { eq: "en" } } }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childMdx {
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`;
