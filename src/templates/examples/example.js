import React, { memo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { LocalizedLink as Link, useLocalization } from 'gatsby-theme-i18n';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import Img from 'gatsby-image';
import p5 from 'p5';

import Layout from '../../components/Layout';
import Content from '../../components/ContentWithSidebar';
import { SidebarTree } from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import { ExampleItem }from '../../components/ExamplesList';

import { referencePath } from '../../utils/paths';
import { useWindowSize, useTree } from '../../hooks';
import {
  useOrderedPdes,
  usePreparedExamples,
  useRelatedExamples
} from '../../hooks/examples';

import css from '../../styles/templates/examples/example.module.css';
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
  const tree = useTree(examples);
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
      <div className={grid.grid}>
        <SidebarTree
          title={intl.formatMessage({ id: 'examples' })}
          tree={tree}
          setShow={setShowSidebar}
          show={showSidebar}
          useSerif
        />
        {example.childJson ? (
          <Content collapsed={!showSidebar}>
            <h1>{title}</h1>
            {author && (
              <h3>
                {intl.formatMessage({ id: 'by' })} {author}
              </h3>
            )}
            <div className={grid.grid}>
              <div className={classnames(grid.col, css.description)}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: description
                  }}></p>
              </div>
              {featured.length > 0 && (
                <FeaturedFunctions
                  featured={featured}
                  heading={intl.formatMessage({ id: 'featured' })}
                />
              )}
            </div>
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

const FeaturedFunctions = memo(({ heading, featured }) => {
  return (
    <div className={classnames(grid.col, grid.rightBleed, css.featured)}>
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
  const { locale } = useLocalization();
  return (
    <div>
      <h3>{heading}</h3>
      <ul className={classnames(grid.grid, grid.col, css.related)}>
        {examples.slice(0, 6).map((example, key) => (
            <ExampleItem node={example} locale={locale} key={`example-${example.name}`}/>
        ))}
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
