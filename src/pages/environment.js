import React, { Fragment, useState } from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Donate from '../components/character/Donate';
import Layout from '../components/Layout';
import Content from '../components/ContentWithSidebar';
import { SidebarTableOfContents } from '../components/Sidebar';

import { useHighlight } from '../hooks';

import css from '../styles/pages/page.module.css';
import grid from '../styles/grid.module.css';

const Environment = ({ data }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const intl = useIntl();
  useHighlight();

  const { mdx } = data;

  return (
    <Layout>
      <Helmet>
        <title>Environment</title>
      </Helmet>
      <div className={classnames(grid.grid, css.root)}>
        <Donate />
        <SidebarTableOfContents
          items={mdx.tableOfContents.items}
          title={intl.formatMessage({ id: 'tableOfContents' })}
          setShow={setShowSidebar}
          show={showSidebar}
        />
        {mdx !== null ? (
          <Content collapsed={!showSidebar}>
            <h1>{mdx.frontmatter.title}</h1>
            <div className={css.content}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </div>
          </Content>
        ) : (
          <Content collapsed={!showSidebar}>
            {intl.formatMessage({ id: 'notTranslated' })}
            {intl.formatMessage({ id: 'englishPage' })}
          </Content>
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($locale: String!) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: "/environment" } }
    ) {
      body
      frontmatter {
        slug
        title
      }
      tableOfContents
    }
  }
`;

export default Environment;
