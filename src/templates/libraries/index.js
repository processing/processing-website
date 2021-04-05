import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useIntl } from 'react-intl';

import Layout from '../../components/Layout';
import ReferenceList from '../../components/ReferenceList';

import { referencePath } from '../../utils/paths';
import { useTree } from '../../hooks';
import { usePreparedReferenceItems } from '../../hooks/reference';

import css from '../../styles/templates/index-lib-template.module.css';
import grid from '../../styles/grid.module.css';

const IndexLibraryTemplate = ({ data, pageContext: { libraryName } }) => {
  const intl = useIntl();
  const items = usePreparedReferenceItems(data.items.nodes, libraryName);
  const tree = useTree(items);

  return (
    <Layout>
      <Helmet>
        <title>{intl.formatMessage({ id: libraryName })} / Libraries</title>
      </Helmet>
      {data.mdx !== null ? (
        <div className={classnames(grid.grid, css.root)}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
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
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          name
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
