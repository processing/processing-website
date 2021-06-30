import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import { useLocalization } from 'gatsby-theme-i18n';
import { useIntl } from 'react-intl';
import classnames from 'classnames';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../../components/Layout';
import Content from '../../components/ContentWithSidebar';
import { SidebarTableOfContents } from '../../components/Sidebar';
import Breadcrumbs from '../../components/Breadcrumbs';

import { useHighlight, useSidebar } from '../../hooks';

import css from '../../styles/pages/page.module.css';
import grid from '../../styles/grid.module.css';

const TutorialTemplate = ({ data, pageContext }) => {
  const { mdx } = data;
  const [showSidebar, setShowSidebar] = useSidebar(
    !!mdx?.tableOfContents?.items ? undefined : true
  );
  const { locale } = useLocalization();
  const intl = useIntl();
  useHighlight();

  return (
    <Layout>
      <Helmet>
        {mdx?.frontmatter?.title && (
          <title>{mdx.frontmatter.title} / Tutorial</title>
        )}
      </Helmet>
      <div className={classnames(grid.grid, css.root)}>
        {mdx?.tableOfContents?.items && (
          <SidebarTableOfContents
            items={mdx.tableOfContents.items}
            title={intl.formatMessage({ id: 'tableOfContents' })}
            setShow={setShowSidebar}
            show={showSidebar}
          />
        )}
        {mdx !== null ? (
          <Content collapsed={!showSidebar}>
            <Breadcrumbs
              locale={locale}
              trail={[
                'Learn',
                {
                  slug: '/tutorials',
                  label: intl.formatMessage({ id: 'tutorials' })
                },
                mdx.frontmatter.title
              ]}
            />
            <h1>{mdx.frontmatter.title}</h1>
            <p className={css.author}>{`${intl.formatMessage({ id: 'by' })} ${
              mdx.frontmatter.author
            }`}</p>
            <div className={css.content}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </div>
          </Content>
        ) : (
          <Content collapsed={!showSidebar}>
            {intl.formatMessage({ id: 'notTranslated' })}
            <Link to={pageContext.slug}>
              {' '}
              {intl.formatMessage({ id: 'englishPage' })}
            </Link>
          </Content>
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
