import React, { useMemo, useState } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import Img from 'gatsby-image';

import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Tabs from '../components/Tabs';

import { organizeExampleItems } from '../utils/data';
import { useWindowSize } from '../utils/hooks';

import css from '../styles/templates/example-template.module.css';
import grid from '../styles/grid.module.css';

const ExampleTemplate = ({ data, pageContext }) => {
  const { width } = useWindowSize();
  const [show, setShow] = useState(width > 960 ? true : false);
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

  const images = data.images.nodes;

  const relatedExamples = useMemo(() => {
    const items = organizeExampleItems(related, images)[0];
    return items && items.length > 0 ? items.children[0].children : [];
  }, [related, images]);

  const toggleSidebar = (show) => {
    setShow(show);
  };

  return (
    <Layout hasSidebar>
      <div className={classnames(css.root, grid.grid, grid.rightBleed)}>
        <Sidebar
          items={data.examples}
          onChange={toggleSidebar}
          show={show}
          type={'examples'}
        />
        <div
          className={classnames(grid.nest, css.wrapper, {
            [css.collapsed]: !show,
          })}>
          {data.json !== null ? (
            <div
              className={classnames(
                css.content,
                { [css.collapsed]: !show },
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
                <Img fluid={data.image.nodes[0].childImageSharp.fluid} />
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
                              <Img
                                className={css.img}
                                fluid={rel.img.childImageSharp.fluid}
                                objectFit={'cover'}
                                objectPosition={'50% 50%'}
                              />
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
  }
`;
