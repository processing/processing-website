import React, { memo, useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import Img from 'gatsby-image';

import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';

import { organizeExampleItems } from '../../utils/data';
import { useWindowSize } from '../../utils/hooks';

import css from '../../styles/templates/example-template.module.css';
import grid from '../../styles/grid.module.css';

const ExampleTemplate = ({ data, pageContext }) => {
  const { width } = useWindowSize();
  const [showSidebar, setShowSidebar] = useState(width > 960 ? true : false);
  const intl = useIntl();

  const { json } = data;
  const { name, subCategory } = pageContext;

  const mainPde = data.pdes.nodes.find((pde) => pde.name === name);
  const orderedPdes = data.pdes.nodes.filter((pde) => pde.name !== name);
  orderedPdes.unshift(mainPde);

  const related = data.examples.nodes.filter(
    (item) => item.relativeDirectory.split('/')[1] === subCategory
  );

  console.log(related, data.images.nodes);

  const relatedExamples = useMemo(() => {
    const items = organizeExampleItems(related, data.images.nodes)[0];
    return items && items.length > 0 ? items.children[0].children : [];
  }, [related, data.images.nodes]);

  const toggleSidebar = (e, show) => {
    if (e.type === 'click') {
      setShowSidebar(show);
    } else if (e.keyCode === 13) {
      setShowSidebar(show);
    }
  };

  // Run live sketch
  useEffect(() => {
    if (data.liveSketch) {
      setTimeout(() => {
        if (window.runSketch) {
          window.runSketch();
        }
      }, 1000);
    }
  }, [data.liveSketch]);

  return (
    <Layout hasSidebar>
      <Helmet>
        {json && <title>{json.childJson.title}</title>}
        {data.liveSketch && (
          <script>{`${data.liveSketch.childRawCode.content}`}</script>
        )}
      </Helmet>
      <div className={classnames(css.root, grid.grid, grid.rightBleed)}>
        <Sidebar
          items={data.examples}
          onChange={toggleSidebar}
          show={showSidebar}
          type={'examples'}
        />
        <div
          className={classnames(grid.nest, css.wrapper, {
            [css.collapsed]: !showSidebar,
          })}>
          {json !== null ? (
            <div
              className={classnames(
                css.content,
                { [css.collapsed]: !showSidebar },
                grid.nest
              )}>
              <h1 className={grid.col}>{json.childJson.title}</h1>
              {json.childJson.author && (
                <h3 className={grid.col}>
                  {' '}
                  {intl.formatMessage({ id: 'by' })} {json.childJson.author}
                </h3>
              )}
              <div className={classnames(grid.col, css.description)}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: json.childJson.description,
                  }}></p>
              </div>
              {json.childJson.featured.length > 0 && (
                <div className={classnames(grid.col, css.featured)}>
                  <h3>{intl.formatMessage({ id: 'featured' })}</h3>
                  <ul>
                    {json.childJson.featured.map((feature, key) => (
                      <li key={key + 'f'}>
                        <Link to={feature}>{feature}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className={classnames(css.cover, grid.col)}>
                {data.image.nodes[0] && (
                  <Img fluid={data.image.nodes[0].childImageSharp.fluid} />
                )}
              </div>
              <Tabs pdes={orderedPdes} className={css.tabs} />
              {relatedExamples.length > 0 && (
                <div className={classnames(css.relatedWrapper, grid.nest)}>
                  <h3 className={grid.col}>
                    {intl.formatMessage({ id: 'relatedExamples' })}
                  </h3>
                  <ul className={classnames(css.related, grid.col)}>
                    {relatedExamples.slice(0, 6).map((rel, key) => {
                      return (
                        rel.dir !== pageContext.relDir && (
                          <li key={key + 'rel'} className={css.relatedItem}>
                            <Link to={'../' + rel.name.toLowerCase() + '.html'}>
                              {rel.img && (
                                <Img
                                  className={css.img}
                                  fluid={rel.img.childImageSharp.fluid}
                                  objectFit={'cover'}
                                  objectPosition={'50% 50%'}
                                />
                              )}
                              <span className={css.relatedName}>
                                {rel.name}
                              </span>
                            </Link>
                          </li>
                        )
                      );
                    })}
                  </ul>
                </div>
              )}
              <p className={classnames(grid.col, css.note)}>
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
          ) : (
            <div
              className={classnames(
                grid.grid,
                { [css.collapsed]: !showSidebar },
                { [css.expanded]: showSidebar }
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
          {width > 960 && <Footer />}
        </div>
      </div>
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
    images: allFile(
      filter: {
        sourceInstanceName: { eq: "examples" }
        extension: { regex: "/(jpg)|(jpeg)|(png)|(gif)/" }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    image: allFile(
      filter: {
        relativeDirectory: { eq: $relDir }
        extension: { regex: "/(png)/" }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    liveSketch: file(
      relativeDirectory: { eq: $relDir }
      name: { eq: "liveSketch" }
      extension: { regex: "/(js$)/" }
    ) {
      name
      childRawCode {
        content
      }
    }
  }
`;
