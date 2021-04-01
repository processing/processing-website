import React, { memo, useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import Img from 'gatsby-image';
import p5 from 'p5';

import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';

import { organizeExampleItems } from '../../utils/data';
import { useWindowSize } from '../../hooks';
import { useOrderedPdes, useRelatedExamples } from '../../hooks/examples';

import css from '../../styles/templates/example-template.module.css';
import grid from '../../styles/grid.module.css';

const ExampleTemplate = ({ data, pageContext }) => {
  const { width } = useWindowSize();
  const [showSidebar, setShowSidebar] = useState(width > 960 ? true : false);
  const intl = useIntl();

  const { example, image, allExamples, relatedImages, liveSketch } = data;
  const { name, subCategory, related } = pageContext;

  const pdes = useOrderedPdes(name, data.pdes.nodes);
  const relatedExamples = useRelatedExamples(
    related,
    allExamples.nodes,
    relatedImages.nodes
  );

  const toggleSidebar = (e, show) => {
    if (e.type === 'click') {
      setShowSidebar(show);
    } else if (e.keyCode === 13) {
      setShowSidebar(show);
    }
  };

  // Run live sketch
  useEffect(() => {
    if (liveSketch) {
      const tryToRunSketch = () => {
        if (window.runLiveSketch) {
          console.log('Live sketch: running');
          const myp5 = new p5(window.runLiveSketch, 'example-cover');
        } else {
          console.log('Live sketch: Not ready');
          setTimeout(tryToRunSketch, 50);
        }
      };
      tryToRunSketch();
    }
  }, [liveSketch]);

  return (
    <Layout hasSidebar>
      <Helmet>
        {example && <title>{example.childJson.title}</title>}
        {liveSketch && <script>{`${liveSketch.childRawCode.content}`}</script>}
      </Helmet>
      <div className={classnames(css.root, grid.grid, grid.rightBleed)}>
        <Sidebar
          items={allExamples}
          onChange={toggleSidebar}
          show={showSidebar}
          type={'examples'}
        />
        <div
          className={classnames(grid.nest, css.wrapper, {
            [css.collapsed]: !showSidebar,
          })}>
          {example !== null ? (
            <div
              className={classnames(
                css.content,
                { [css.collapsed]: !showSidebar },
                grid.nest
              )}>
              <h1 className={grid.col}>{example.childJson.title}</h1>
              {example.childJson.author && (
                <h3 className={grid.col}>
                  {' '}
                  {intl.formatMessage({ id: 'by' })} {example.childJson.author}
                </h3>
              )}
              <div className={classnames(grid.col, css.description)}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: example.childJson.description,
                  }}></p>
              </div>
              {example.childJson.featured.length > 0 && (
                <div className={classnames(grid.col, css.featured)}>
                  <h3>{intl.formatMessage({ id: 'featured' })}</h3>
                  <ul>
                    {example.childJson.featured.map((feature, key) => (
                      <li key={key + 'f'}>
                        <Link to={feature}>{feature}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div
                className={classnames(css.cover, grid.col)}
                id="example-cover">
                {!liveSketch && image && (
                  <Img fluid={image.childImageSharp.fluid} />
                )}
              </div>
              <Tabs pdes={pdes} className={css.tabs} />
              <RelatedExamples
                examples={relatedExamples}
                heading={intl.formatMessage({ id: 'relatedExamples' })}
              />
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

const RelatedExamples = memo(({ heading, examples }) => {
  return (
    <div className={classnames(css.relatedWrapper, grid.nest)}>
      <h3 className={grid.col}>{heading}</h3>
      <ul className={classnames(css.related, grid.col)}>
        {examples.slice(0, 6).map((example, key) => {
          return (
            <li key={key + 'rel'} className={css.relatedItem}>
              <Link to={example.slug}>
                {example.image && (
                  <Img
                    className={css.img}
                    fluid={example.image.childImageSharp.fluid}
                    objectFit={'cover'}
                    objectPosition={'50% 50%'}
                  />
                )}
                <span className={css.relatedName}>{example.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default ExampleTemplate;

export const query = graphql`
  query(
    $name: String!
    $relDir: String!
    $locale: String!
    $related: [String!]!
  ) {
    example: file(
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
        sourceInstanceName: { eq: "examples" }
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
    image: file(
      relativeDirectory: { eq: $relDir }
      extension: { regex: "/(png)/" }
    ) {
      name
      relativeDirectory
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
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
    allExamples: allFile(
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
    relatedImages: allFile(
      filter: {
        name: { in: $related }
        sourceInstanceName: { eq: "examples" }
        extension: { regex: "/(jpg)|(jpeg)|(png)|(gif)/" }
        dir: { regex: "/.*[^data]$/" }
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
  }
`;
