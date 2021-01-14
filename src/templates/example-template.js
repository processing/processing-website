import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Tabs from '../components/Tabs';

import css from '../styles/pages/example.module.css';
import grid from '../styles/grid.module.css';

const ExampleTemplate = ({ data, pageContext }) => {
  const [show, setShow] = useState(false);
  const intl = useIntl();

  let json, subcategory;

  if (data.json !== null) {
    json = data.json;
    subcategory = data.json.relativeDirectory.split('/')[1];
  }

  const mainPde = data.pdes.nodes.find(
    (pde) => pde.name === pageContext.name.split('.')[0]
  );

  const orderedPdes = data.pdes.nodes.filter(
    (pde) => pde.name !== pageContext.name.split('.')[0]
  );

  orderedPdes.unshift(mainPde);

  const related = data.examples.nodes.filter(
    (item) => item.relativeDirectory.split('/')[1] === subcategory
  );

  const toggleSidebar = (show) => {
    setShow(show);
  };

  return (
    <Layout>
      <Helmet>
        <title>{data.json && json.childJson.title}</title>
      </Helmet>
      <Sidebar
        items={data.examples}
        onChange={toggleSidebar}
        show={show}
        type={'examples'}
      />
      {data.json !== null ? (
        <div
          className={classnames(
            css.root,
            { [css.collapsed]: !show },
            { [css.expanded]: show }
          )}>
          <div className={classnames(css.section, grid.grid, grid.push1)}>
            <h1 className={classnames(grid.col4, grid.push1)}>
              {json.childJson.title}
            </h1>
            {json.childJson.author && (
              <h3 className={classnames(grid.col4, grid.push1)}>
                {intl.formatMessage({ id: 'by' })} {json.childJson.author}
              </h3>
            )}
            <div className={classnames(grid.col4, grid.push1)}>
              {json.childJson.description}
            </div>
            <div className={grid.col2}>
              <h3>{intl.formatMessage({ id: 'featured' })}</h3>
              <ul>
                {json.childJson.featured &&
                  json.childJson.featured.map((feature, key) => (
                    <li key={key + 'f'}>
                      <Link to={feature}>{feature}</Link>
                    </li>
                  ))}
              </ul>
            </div>
            <Tabs pdes={orderedPdes} />
            <div className={classnames(grid.col4, grid.push1)}>
              <h3>{intl.formatMessage({ id: 'relatedExamples' })}</h3>
              <ul className={css.related}>
                {related.map((rel, key) => {
                  return (
                    rel.relativeDirectory !== pageContext.relDir && (
                      <li
                        key={key + 'rel'}
                        className={classnames(grid.col1, grid.nest)}>
                        <div className={css.placeholder}></div>
                        <Link to={'../' + rel.name.toLowerCase() + '.html'}>
                          {rel.name}
                        </Link>
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
            <p className={classnames(grid.col6, grid.push1)}>
              {intl.formatMessage({ id: 'exampleInfo' })}
              <a
                href={
                  'https://github.com/processing/processing-docs/issues?state=open'
                }>
                {intl.formatMessage({ id: 'letUsKnow' })}
              </a>
              .
            </p>
          </div>
        </div>
      ) : (
        <div
          className={classnames(
            grid.grid,
            { [css.collapsed]: !show },
            { [css.expanded]: show }
          )}>
          <div className={classnames(grid.push1)}>
            {intl.formatMessage({ id: 'notTranslated' })}
            <Link to={pageContext.slug}>
              {' '}
              {intl.formatMessage({ id: 'englishPage' })}
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ExampleTemplate;

export const query = graphql`
  query($name: String!, $relDir: String!, $locale: String!) {
    json: file(
      fields: { name: { eq: $name }, lang: { eq: $locale } }
      sourceInstanceName: { eq: "examples" }
    ) {
      relativeDirectory
      childJson {
        name
        title
        author
        description
        featured
      }
    }
    pdes: allFile(
      filter: {
        relativeDirectory: { eq: $relDir }
        extension: { regex: "/(pde)/" }
      }
    ) {
      nodes {
        name
        internal {
          content
        }
      }
    }
    examples: allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        fields: { lang: { eq: "en" } }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childJson {
          name
          title
        }
      }
    }
  }
`;
