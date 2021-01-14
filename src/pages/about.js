import React from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';

import css from '../styles/pages/page.module.css';
import grid from '../styles/grid.module.css';

const About = ({ data }) => {
  const { mdx } = data;
  const { frontmatter, body } = mdx;
  const intl = useIntl();
  return (
    <Layout>
      <Helmet>
        <title>{'About'}</title>
      </Helmet>
      <div className={grid.grid}>
        <h1 className={classnames(grid.col5, grid.pull3)}>
          {frontmatter.title}
        </h1>
        <h3 className={grid.col3}>
          {intl.formatMessage({ id: 'aboutIntro' })}
        </h3>
        <div className={classnames(grid.col5, grid.push1, css.content)}>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($locale: String!) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: "/about" } }
    ) {
      body
      frontmatter {
        slug
        title
      }
    }
  }
`;

export default About;
