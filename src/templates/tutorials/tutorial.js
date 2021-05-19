import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../../components/Layout';
import Content from '../../components/ContentWithSidebar';
import { SidebarTableOfContents } from '../../components/Sidebar';

import { useHighlight } from '../../hooks';

import css from '../../styles/pages/page.module.css';
import grid from '../../styles/grid.module.css';

const TutorialTemplate = ({ data, pageContext }) => {
  const { mdx } = data;
  const [showSidebar, setShowSidebar] = useState(!!mdx.tableOfContents.items);
  const intl = useIntl();
  useHighlight();

  return (
    <Layout>
      <Helmet>
        <title>{mdx && mdx.frontmatter.title} / Tutorial</title>
      </Helmet>
      <div className={classnames(grid.grid, css.root)}>
        {mdx.tableOfContents.items && (
          <SidebarTableOfContents
            items={mdx.tableOfContents.items}
            title={intl.formatMessage({ id: 'tableOfContents' })}
            setShow={setShowSidebar}
            show={showSidebar}
          />
        )}
        {mdx !== null ? (
          <Content collapsed={!showSidebar}>
            <h1>{mdx.frontmatter.title}</h1>
            <p className={css.author}>{`${intl.formatMessage({ id: 'by' })} ${
              mdx.frontmatter.author
            }`}</p>
            <div className={css.content}>
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
