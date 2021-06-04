import React from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useIntl } from 'react-intl';

import Layout from '../../components/Layout';
import ReferenceList from '../../components/ReferenceList';

import { referencePath } from '../../utils/paths';
import { useTree, useHighlight } from '../../hooks';
import { usePreparedItems } from '../../hooks/reference';

import css from '../../styles/templates/libraries/library.module.css';
import grid from '../../styles/grid.module.css';

const IndexLibraryTemplate = ({ data, pageContext: { libraryName } }) => {
  const intl = useIntl();
  const items = usePreparedItems(data.items.nodes, libraryName);
  const tree = useTree(items);
  useHighlight();

  return (
    <Layout>
      <Helmet>
        <title>{intl.formatMessage({ id: libraryName })} / Libraries</title>
      </Helmet>
      {data.mdx !== null ? (
        <div className={classnames(grid.grid, css.root)}>
          <div className={classnames(grid.col, css.content)}>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </div>
          {tree && <ReferenceList tree={tree} library={libraryName} />}
        </div>
      ) : (
        <div>
          {intl.formatMessage({ id: 'notTranslated' })}
          <Link to={referencePath('index', libraryName)}>
            {intl.formatMessage({ id: 'englishPage' })}
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default IndexLibraryTemplate;

export const query = graphql`
  query($libraryName: String!, $locale: String!) {
    items: allFile(
      filter: { fields: { lib: { eq: $libraryName }, lang: { eq: "en" } } }
      sort: { fields: childJson___name }
    ) {
      nodes {
        name
        childJson {
          name
          brief
          category
          subcategory
        }
      }
    }
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { name: { eq: $libraryName } }
    ) {
      body
    }
  }
`;
