import React from 'react';
import { useIntl } from 'react-intl';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import classnames from 'classnames';

import HeadMatter from '../components/HeadMatter';
import Donate from '../components/character/Donate';
import Layout from '../components/Layout';
import Content from '../components/ContentWithSidebar';
import { SidebarTableOfContents } from '../components/Sidebar';

import { useHighlight, useSidebar } from '../hooks';

import * as css from '../styles/pages/page.module.css';

import * as grid from '../styles/grid.module.css';

const Environment = ({ data }) => {
  const [showSidebar, setShowSidebar] = useSidebar('environment');
  const intl = useIntl();
  useHighlight();

  const { mdx } = data;

  return (
    <Layout>
      <HeadMatter
        title={intl.formatMessage({ id: 'environment' })}
        description={mdx.frontmatter.description}
      />

      <div className={classnames(grid.grid, css.root)}>
        <Donate />
        <SidebarTableOfContents
          items={mdx.tableOfContents.items}
          title={intl.formatMessage({ id: 'tableOfContents' })}
          setShow={setShowSidebar}
          show={showSidebar}
        />
        {mdx !== null ? (
          <Content sidebarOpen={showSidebar} className={css.contentWrapper}>
            <h1>{mdx.frontmatter.title}</h1>
            <div className={css.content}>
            </div>
            <div className={css.environmentBody}><MDXRenderer>{mdx.body}</MDXRenderer></div>
          </Content>
        ) : (
          <Content sidebarOpen={showSidebar}>
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
        description
      }
      tableOfContents
    }
  }
`;

export default Environment;
