import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import { useLocalization, LocalizedLink as Link } from 'gatsby-theme-i18n';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import HeadMatter from '../../components/HeadMatter';
import Layout from '../../components/Layout';
import Content from '../../components/ContentWithSidebar';
import { SidebarTree } from '../../components/Sidebar';
import Tabs from '../../components/Tabs';
import { ExampleItem } from '../../components/examples/ExamplesList';
import Breadcrumbs from '../../components/Breadcrumbs';

import { referencePath } from '../../utils/paths';
import { useTree, useSidebar, usePdes } from '../../hooks';
import {
  usePreparedExample,
  usePreparedExamples,
  useRelatedExamples,
  useTrail
} from '../../hooks/examples';

import * as css from '../../styles/templates/examples/example.module.css';
import * as grid from '../../styles/grid.module.css';

const ExampleTemplate = ({ data, pageContext }) => {
  const [showSidebar, setShowSidebar] = useSidebar('examples');
  const intl = useIntl();
  const { locale } = useLocalization();

  const { name, related } = pageContext;
  const { image, allExamples, relatedImages, liveSketch } = data;

  const example = usePreparedExample(data.example);
  const pdes = usePdes(data.pdes.nodes, locale, name);
  const examples = usePreparedExamples(allExamples.nodes, relatedImages.nodes);
  const tree = useTree(examples);
  const relatedExamples = useRelatedExamples(examples, related);

  const trail = useTrail(example);

  // Run live sketch
  useEffect(() => {
    if (liveSketch && example) {
      let p5Instance;
      const tryToRunSketch = () => {
        if (window.runLiveSketch) {
          console.log('Live sketch: running');
          p5Instance = new window.p5(window.runLiveSketch, 'example-cover');
        } else {
          console.log('Live sketch: Not ready');
          setTimeout(tryToRunSketch, 50);
        }
      };
      setTimeout(tryToRunSketch, 500);
      return () => {
        if (p5Instance) {
          console.log('Live sketch: Removing');
          p5Instance.remove();
        }
      };
    }
  }, [liveSketch, example]);

  return (
    <Layout withSidebar withBreadcrumbs>
      <HeadMatter
        title={`${example?.title} / ${intl.formatMessage({ id: 'examples' })}`}
        description={example?.description}
        img={getImage(image)}
      />
      <Helmet>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"
          crossorigin="anonymous"></script>
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
        {example ? (
          <Content sidebarOpen={showSidebar}>
            <Breadcrumbs trail={trail} />
            <h1>{example.title}</h1>
            {example.author && (
              <h3>
                {intl.formatMessage({ id: 'by' })} {example.author}
              </h3>
            )}
            <div className={grid.grid}>
              <div className={classnames(grid.col, css.description)}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: example.description
                  }}></p>
              </div>
              {example.featured && example.featured.length > 0 && (
                <FeaturedFunctions
                  featured={example.featured}
                  heading={intl.formatMessage({ id: 'featured' })}
                />
              )}
            </div>
            <div className={css.cover} id="example-cover">
              {!liveSketch && image && (
                <GatsbyImage
                  image={getImage(image)}
                  alt={`Visual output for the code example`}
                />
              )}
            </div>
            <Tabs pdes={pdes} />
            <RelatedExamples
              examples={relatedExamples}
              heading={intl.formatMessage({ id: 'relatedExamples' })}
            />
            <p className={classnames(css.note)}>
              {intl.formatMessage({ id: 'exampleInfo' })}
              <a
                href={
                  'https://github.com/processing/processing-examples/issues'
                }>
                {intl.formatMessage({ id: 'letUsKnow' })}
              </a>
              .
            </p>
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
    <div>
      <h3>{heading}</h3>
      <ul className={grid.grid}>
        {examples.slice(0, 6).map((example, key) => (
          <ExampleItem
            node={example}
            key={`example-${example.name}`}
            variant="related"
          />
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
      extension: { eq: "json" }
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
        fields: { lang: { in: ["en", $locale] } }
        extension: { eq: "pde" }
      }
    ) {
      nodes {
        name
        fields {
          lang
          name
        }
        childRawCode {
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
        gatsbyImageData(width: 800)
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
        fields: { lang: { eq: $locale } }
        extension: { eq: "json" }
        relativeDirectory: { regex: "/^((?!data).)*$/" }
      }
      sort: { order: ASC, fields: relativeDirectory }
    ) {
      nodes {
        name
        relativeDirectory
        relativePath
        fields {
          name
        }
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
        relativeDirectory: { regex: "/^((?!data).)*$/" }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childImageSharp {
          gatsbyImageData(width: 200)
        }
      }
    }
  }
`;
