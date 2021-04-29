import React, { useState, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../../components/Layout';
import Content from '../../components/ContentWithSidebar';
import { SidebarTableOfContents } from '../../components/Sidebar';
// import TableOfContents from '../../components/TableOfContents';

import { useHighlight } from '../../hooks';

import css from '../../styles/pages/page.module.css';
import grid from '../../styles/grid.module.css';

const TutorialTemplate = ({ data, pageContext }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const intl = useIntl();
  useHighlight();

  const { mdx } = data;

  return (
    <Layout>
      <Helmet>
        <title>{mdx && mdx.frontmatter.title} / Tutorial</title>
      </Helmet>
      <div className={classnames(grid.grid, css.root)}>
        <SidebarTableOfContents
          items={mdx.tableOfContents.items}
          title={intl.formatMessage({ id: 'tableOfContents' })}
          setShow={setShowSidebar}
          show={showSidebar}
        />
        {mdx !== null ? (
          <Content collapsed={!showSidebar}>
            <h1 className={grid.col}>{mdx.frontmatter.title}</h1>
            <p
              className={classnames(
                grid.col,
                css.author
              )}>{`${intl.formatMessage({ id: 'by' })} ${
              mdx.frontmatter.author
            }`}</p>
            <div className={classnames(grid.col, css.content)}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </div>
          </Content>
        ) : (
          <div>
            {intl.formatMessage({ id: 'notTranslated' })}
            <Link to={pageContext.slug}>
              {' '}
              {intl.formatMessage({ id: 'englishPage' })}
            </Link>
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
