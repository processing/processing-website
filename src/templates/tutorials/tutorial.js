import React from 'react';
import { graphql, Link } from 'gatsby';
import { useIntl } from 'react-intl';
import { getImage } from 'gatsby-plugin-image';
import classnames from 'classnames';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import HeadMatter from '../../components/HeadMatter';
import Layout from '../../components/Layout';
import Content from '../../components/ContentWithSidebar';
import { SidebarTableOfContents } from '../../components/Sidebar';
import Breadcrumbs from '../../components/Breadcrumbs';

import { useHighlight, useSidebar } from '../../hooks';
import { useTrail } from '../../hooks/tutorials';

import * as css from '../../styles/pages/page.module.css';
import * as grid from '../../styles/grid.module.css';

const TutorialTemplate = ({ data, pageContext }) => {
  const { mdx } = data;
  const [showSidebar, setShowSidebar] = useSidebar('tutorials');
  const intl = useIntl();
  useHighlight();

  const trail = useTrail();

  return (
    <Layout withSidebar withBreadcrumbs>
      <HeadMatter
        title={mdx?.frontmatter.title}
        description={mdx?.frontmatter.intro}
        img={getImage(mdx?.frontmatter.coverImage)}
      />

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
          <Content sidebarOpen={showSidebar}>
            <Breadcrumbs trail={trail} />
            <h1>{mdx.frontmatter.title}</h1>
            <p className={css.author}>{`${intl.formatMessage({ id: 'by' })} ${
              mdx.frontmatter.author
            }`}</p>
            <div className={css.content}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </div>
          </Content>
        ) : (
          <Content sidebarOpen={showSidebar}>
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
        intro
        coverImage {
          childImageSharp {
            gatsbyImageData(width: 600)
          }
        }
      }
      tableOfContents
    }
  }
`;
