/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql, reporter }) => {
  await Promise.all([
    createReference(actions, graphql),
    createExamples(actions, graphql),
    createTutorials(actions, graphql),
  ]);
};

exports.onCreateNode = ({ node, actions, getNode, loadNodeContent }) => {
  const { createNodeField } = actions;

  if (node.internal.mediaType === `application/json`) {
    const value = createFilePath({ node, getNode });
    let dir = node.relativeDirectory.split('/');
    let library = dir[1];
    let name = dir[dir.length];

    let nodename = node.name.split('.');
    let lang = nodename[1] ? nodename[1] : 'en';

    createNodeField({
      name: `name`,
      node,
      value: node.name,
    });
    createNodeField({
      name: `lang`,
      node,
      value: lang,
    });
    createNodeField({
      name: `lib`,
      node,
      value: library,
    });
  } else if (node.internal.mediaType === `text/x-processing`) {
    createNodeField({
      name: `name`,
      node,
      content: loadNodeContent(node),
    });
  }
};

async function createReference(actions, graphql) {
  const refTemplate = path.resolve(`./src/templates/reference/function.js`);
  const classRefTemplate = path.resolve(`./src/templates/reference/class.js`);
  const fieldRefTemplate = path.resolve(`./src/templates/reference/field.js`);
  const indexLibTemplate = path.resolve(`./src/templates/library/index.js`);

  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allFile(filter: { sourceInstanceName: { eq: "json" } }) {
          edges {
            node {
              name
              relativeDirectory
              childJson {
                type
              }
            }
          }
        }
      }
    `
  );

  const dirResult = await graphql(
    `
      {
        allMdx(filter: { frontmatter: { library: { eq: "true" } } }) {
          nodes {
            frontmatter {
              name
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  if (dirResult.errors) {
    throw dirResult.errors;
  }

  // Create reference pages.
  const refPages = result.data.allFile.edges;

  // Create library index pages
  const dirPages = dirResult.data.allMdx.nodes;

  refPages.forEach((refPage, index) => {
    const previous =
      index === refPages.length - 1 ? null : refPages[index + 1].node;
    const next = index === 0 ? null : refPages[index - 1].node;
    let assetsName = refPage.node.name.split('.')[0];
    let libraryName = refPage.node.relativeDirectory.split('/')[1];
    let lang = refPage.node.relativeDirectory.split('/')[0];
    loc = lang === 'en' ? '' : lang;
    let refPath;
    if (libraryName === 'processing')
      refPath = loc + '/reference/' + refPage.node.name.split('.')[0] + '.html';
    else
      refPath =
        loc +
        '/reference/libraries/' +
        libraryName +
        '/' +
        refPage.node.name.split('.')[0] +
        '.html';

    if (
      refPage.node.childJson.type === 'function' ||
      refPage.node.childJson.type === 'method'
    ) {
      createPage({
        path: refPath,
        component: refTemplate,
        context: {
          name: refPage.node.name,
          assetsName: libraryName + '/' + assetsName,
          libraryName: libraryName,
          previous,
          next,
        },
      });
    } else if (refPage.node.childJson.type === 'class') {
      createPage({
        path: refPath,
        component: classRefTemplate,
        context: {
          name: refPage.node.name,
          assetsName: libraryName + '/' + assetsName,
          libraryName: libraryName,
          previous,
          next,
        },
      });
    } else if (refPage.node.childJson.type === 'field') {
      createPage({
        path: refPath,
        component: fieldRefTemplate,
        context: {
          name: refPage.node.name,
          assetsName: libraryName + '/' + assetsName,
          libraryName: libraryName,
          previous,
          next,
        },
      });
    }
  });

  dirPages.forEach((dirPage, index) => {
    createPage({
      path: '/reference/libraries/' + dirPage.frontmatter.name + '/index.html',
      component: indexLibTemplate,
      context: {
        libraryName: dirPage.frontmatter.name,
      },
    });
  });

  createPage({
    path: '/reference/libraries/',
    component: path.resolve(`./src/pages/libraries.js`),
  });

  createPage({
    path: '/reference/tools/',
    component: path.resolve(`./src/pages/tools.js`),
  });
}

async function createTutorials(actions, graphql) {
  const tutorialTemplate = path.resolve(`./src/templates/tutorial/tutorial.js`);

  const { createPage } = actions;

  const tutorialResult = await graphql(
    `
      {
        allFile(filter: { sourceInstanceName: { eq: "tutorials" } }) {
          nodes {
            childMdx {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `
  );

  if (tutorialResult.errors) {
    throw tutorialResult.errors;
  }

  const tutorialPages = tutorialResult.data.allFile.nodes;

  tutorialPages.forEach((tutorialPage, index) => {
    tutorialPage.childMdx &&
      createPage({
        path: tutorialPage.childMdx.frontmatter.slug,
        component: tutorialTemplate,
        context: {
          slug: tutorialPage.childMdx.frontmatter.slug,
        },
      });
  });
}

async function createExamples(actions, graphql) {
  const exampleTemplate = path.resolve(`./src/templates/example/example.js`);

  const { createPage } = actions;

  // Load all JSON files within the examples folder
  const exampleResult = await graphql(
    `
      {
        allFile(
          filter: {
            sourceInstanceName: { eq: "examples" }
            extension: { regex: "/(json)/" }
          }
        ) {
          edges {
            node {
              name
              relativeDirectory
              childJson {
                type
              }
            }
          }
        }
      }
    `
  );

  if (exampleResult.errors) {
    throw exampleResult.errors;
  }

  const examplePages = exampleResult.data.allFile.edges;

  examplePages.forEach((examplePage, index) => {
    const splitName = examplePage.node.name.split('.');
    const langCode = splitName.length > 1 ? splitName[1] + '/' : '';
    // We lowercase the folder name to match the URL's on old processing.org site
    const name = splitName[0];
    const slug = langCode + '/examples/' + name.toLowerCase() + '.html';
    const subCategory = examplePage.node.relativeDirectory.split('/')[1];

    createPage({
      path: slug,
      component: exampleTemplate,
      context: {
        slug,
        name,
        subCategory,
        relDir: examplePage.node.relativeDirectory,
      },
    });
  });
}
