import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { useIntl } from 'react-intl';

import Layout from '../../components/Layout';
import ReferenceList from '../../components/ReferenceList';

import { organizeReferenceItems } from '../../utils/data';
import css from '../../styles/templates/index-lib-template.module.css';
import grid from '../../styles/grid.module.css';

const IndexLibraryTemplate = ({ data, pageContext: { libraryName } }) => {
  const link = `/reference/libraries/${libraryName}/index.html`;
  const intl = useIntl();
  const items = data.allFile.nodes;

  const tree = useMemo(() => organizeReferenceItems(items), [items]);

  return (
    <Layout>
      <Helmet>
        <title>{intl.formatMessage({ id: libraryName })}</title>
      </Helmet>
      {data.mdx !== null ? (
        <div className={classnames(grid.grid, css.root)}>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
          {tree && <ReferenceList data={tree} library={libraryName} />}
        </div>
      ) : (
        <div>
          {intl.formatMessage({ id: 'notTranslated' })}
          <Link to={link}>{intl.formatMessage({ id: 'englishPage' })}</Link>
        </div>
      )}
    </Layout>
  );
};

export default IndexLibraryTemplate;

export const query = graphql`
  query($libraryName: String!, $locale: String!) {
    allFile(
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
