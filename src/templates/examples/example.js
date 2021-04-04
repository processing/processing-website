import React, { memo, useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import Img from 'gatsby-image';
import p5 from 'p5';

import Layout from '../../components/Layout';
import Sidebar from '../../components/Sidebar';
import Tabs from '../../components/Tabs';

import { referencePath } from '../../utils/paths';
import { useWindowSize } from '../../hooks';
import {
  useOrderedPdes,
  usePreparedExamples,
  useOrganizedExamples,
  useRelatedExamples,
} from '../../hooks/examples';

import css from '../../styles/templates/example-template.module.css';
import grid from '../../styles/grid.module.css';

const ExampleTemplate = ({ data, pageContext }) => {
  const { width } = useWindowSize();
  const [showSidebar, setShowSidebar] = useState(width > 960);
  const intl = useIntl();

  const { example, image, allExamples, relatedImages, liveSketch } = data;
  const { title, description, author, featured } = example.childJson;
  const { name, related } = pageContext;

  const pdes = useOrderedPdes(name, data.pdes.nodes);
  const examples = usePreparedExamples(allExamples.nodes, relatedImages.nodes);
  const tree = useOrganizedExamples(examples, '');
  const relatedExamples = useRelatedExamples(examples, related);

  // Run live sketch
  useEffect(() => {
    if (liveSketch) {
      const tryToRunSketch = () => {
        if (window.runLiveSketch) {
          console.log('Live sketch: running');
          // TODO: Stop old sketch if running!
          new p5(window.runLiveSketch, 'example-cover');
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
        {title && <title>{title}</title>}
        {liveSketch && <script>{`${liveSketch.childRawCode.content}`}</script>}
      </Helmet>
      <div className={classnames(css.root, grid.grid, grid.rightBleed)}>
        <Sidebar
          tree={tree}
          setShow={setShowSidebar}
          show={showSidebar}
          type={'examples'}
        />
        <div
          className={classnames(grid.nest, css.wrapper, {
            [css.collapsed]: !showSidebar,
          })}>
          {example.childJson ? (
            <div
              className={classnames(
                css.content,
                { [css.collapsed]: !showSidebar },
                grid.nest
              )}>
              <h1>{title}</h1>
              {author && (
                <h3>
                  {intl.formatMessage({ id: 'by' })} {author}
                </h3>
              )}
              <div className={css.description}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}></p>
              </div>
              {featured.length > 0 && (
                <FeaturedFunctions
                  featured={featured}
                  heading={intl.formatMessage({ id: 'featured' })}
                />
              )}
              <div className={classnames(css.cover)} id="example-cover">
                {!liveSketch && image && (
                  <Img fluid={image.childImageSharp.fluid} />
                )}
              </div>
              <Tabs pdes={pdes} className={css.tabs} />
              <RelatedExamples
                examples={relatedExamples}
                heading={intl.formatMessage({ id: 'relatedExamples' })}
              />
              <p className={classnames(css.note)}>
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
        </div>
      </div>
    </Layout>
  );
};

const FeaturedFunctions = memo(({ heading, featured }) => {
  return (
    <div className={classnames(grid.col, css.featured)}>
      <h3>{heading}</h3>
      <ul>
        {featured.map((feature, key) => (
          <li key={`feature-${key}`}>
            <Link to={referencePath(feature)}>
              {feature.replace(/_$/, '()').replace(/_/g, ' ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});

const RelatedExamples = memo(({ heading, examples }) => {
  return (
    <div className={classnames(css.relatedWrapper, grid.nest)}>
      <h3 className={grid.col}>{heading}</h3>
      <ul className={classnames(css.related, grid.col)}>
        {examples.slice(0, 6).map((example, key) => {
          return (
            <li key={`rel-${key}`} className={css.relatedItem}>
              <Link to={example.path}>
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
        extension: { eq: "json" }
        dir: { regex: "/.*[^data]$/" }
      }
    ) {
      nodes {
        name
        relativeDirectory
        relativePath
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
