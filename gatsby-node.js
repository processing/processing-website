/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const { examplePath, referencePath } = require('./src/utils/paths');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /p5\.min\.js/,
            use: loaders.null()
          }
        ]
      }
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  await Promise.all([
    createReference(actions, graphql),
    createExamples(actions, graphql),
    createTutorials(actions, graphql),
    createDownload(actions, graphql)
  ]);
};

exports.onCreateNode = ({ node, actions, getNode, loadNodeContent }) => {
  const { createNodeField } = actions;

  if (node.internal.mediaType === `application/json`) {
    const value = createFilePath({ node, getNode });
    const dir = node.relativeDirectory.split('/');
    const library = dir[1];
    const nameSplit = node.name.split('.');
    const name = nameSplit[0];
    const lang = nameSplit[1] ? nameSplit[1] : 'en';

    createNodeField({
      name: `name`,
      value: name,
      node
    });

    createNodeField({
      name: `lang`,
      value: lang,
      node
    });

    createNodeField({
      name: `lib`,
      value: library,
      node
    });
  } else if (node.internal.mediaType === `text/x-processing`) {
    createNodeField({
      name: `name`,
      node,
      content: loadNodeContent(node)
    });
  }
};

async function createReference(actions, graphql) {
  const refTemplate = path.resolve(`./src/templates/reference/function.js`);
  const classRefTemplate = path.resolve(`./src/templates/reference/class.js`);
  const fieldRefTemplate = path.resolve(`./src/templates/reference/field.js`);
  const indexLibTemplate = path.resolve(`./src/templates/libraries/library.js`);

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

  const inUse = await graphql(
    `
      {
        allFile(
          filter: {
            sourceInstanceName: { eq: "examples" }
            fields: { lang: { eq: "en" } }
          }
        ) {
          edges {
            node {
              name
              childJson {
                featured
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  if (inUse.errors) {
    throw inUse.errors;
  }

  // Create reference pages.
  const refPages = result.data.allFile.edges;

  refPages.forEach((refPage, index) => {
    const [name] = refPage.node.name.split('.');
    const [lang, libraryName] = refPage.node.relativeDirectory.split('/');
    const refPath = referencePath(name, libraryName, lang);
    const relDir = libraryName + '/' + name;

    const inUseExamples = inUse.data.allFile.edges
      .filter((n) => {
        if (
          n.node.childJson !== undefined &&
          n.node.childJson !== null &&
          n.node.childJson.featured !== null &&
          n.node.childJson.featured.includes(refPage.node.name)
        )
          return n.node.name;
      })
      .map((e) => e.node.name);

    const context = {
      name,
      relDir,
      libraryName,
      inUseExamples: inUseExamples
    };

    if (
      refPage.node.childJson.type === 'function' ||
      refPage.node.childJson.type === 'method'
    ) {
      createPage({
        path: refPath,
        component: refTemplate,
        context
      });
    } else if (refPage.node.childJson.type === 'class') {
      createPage({
        path: refPath,
        component: classRefTemplate,
        context
      });
    } else if (
      refPage.node.childJson.type === 'field' ||
      refPage.node.childJson.type === 'other'
    ) {
      createPage({
        path: refPath,
        component: fieldRefTemplate,
        context
      });
    }
  });

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

  if (dirResult.errors) {
    throw dirResult.errors;
  }

  // Create library index pages
  const dirPages = dirResult.data.allMdx.nodes;

  dirPages.forEach((dirPage, index) => {
    createPage({
      path: '/reference/libraries/' + dirPage.frontmatter.name + '/index.html',
      component: indexLibTemplate,
      context: {
        libraryName: dirPage.frontmatter.name
      }
    });
  });

  createPage({
    path: '/reference/libraries/',
    component: path.resolve(`./src/pages/libraries.js`)
  });

  createPage({
    path: '/reference/tools/',
    component: path.resolve(`./src/pages/tools.js`)
  });
}

async function createTutorials(actions, graphql) {
  const tutorialTemplate = path.resolve(
    `./src/templates/tutorials/tutorial.js`
  );

  const { createPage } = actions;

  const tutorialResult = await graphql(
    `
      {
        allFile(filter: { sourceInstanceName: { eq: "tutorials" } }) {
          nodes {
            relativeDirectory
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

  const tutorials = tutorialResult.data.allFile.nodes;

  tutorials.forEach((tutorial, index) => {
    const [tutorialType] = tutorial.relativeDirectory.split('/');

    if (tutorial.childMdx && tutorialType === 'text') {
      createPage({
        path: tutorial.childMdx.frontmatter.slug,
        component: tutorialTemplate,
        context: {
          slug: tutorial.childMdx.frontmatter.slug
        }
      });
    }
  });
}

/**
  Generate /examples pages
**/

const parseExampleFileInfo = (node) => {
  // Split name into needed info.
  // Slug is lowercased to match old processing.org URL's
  const splitName = node.name.split('.');
  const langCode = splitName.length > 1 ? '/' + splitName[1] : '';
  const name = splitName[0];
  const slug = langCode + '/examples/' + name.toLowerCase() + '.html';

  // Split relative dir into needed info
  const relDir = node.relativeDirectory;
  const splitDir = relDir.split('/');
  const category = splitDir[0];
  const subcategory = splitDir[1];

  return {
    name,
    slug,
    langCode,
    category,
    subcategory,
    relDir
  };
};

async function createExamples(actions, graphql) {
  const exampleTemplate = path.resolve(`./src/templates/examples/example.js`);

  const { createPage } = actions;

  // Load all JSON files within the examples folder
  const result = await graphql(
    `
      {
        json: allFile(
          filter: {
            sourceInstanceName: { eq: "examples" }
            extension: { eq: "json" }
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

  if (result.errors) {
    throw result.errors;
  }

  const examples = result.data.json.edges;
  const parsedExamples = examples.map((example) =>
    parseExampleFileInfo(example.node)
  );

  parsedExamples.forEach((example, index) => {
    const { name, slug, langCode, category, subcategory, relDir } = example;

    // Find related examples in the same sub category
    // We use the empty langCode to not generate duplicates
    // We pass the names of these to the template, so we don't need
    // to load and filter all images on the frontend.
    const related = parsedExamples
      .filter((info) => {
        return (
          info.subcategory === subcategory &&
          info.name !== name &&
          info.langCode === ''
        );
      })
      .map((info) => info.name);

    createPage({
      path: slug,
      component: exampleTemplate,
      context: {
        slug,
        name,
        subcategory,
        related,
        relDir
      }
    });
  });
}

/**
  Create the download page programmatically since we need access to the selected
  releases in the pageQuery, thus we need to pass through pageContext.
**/
async function createDownload(actions, graphql) {
  const downloadTemplate = path.resolve(`./src/templates/download.js`);
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        json: file(
          sourceInstanceName: { eq: "download" }
          relativePath: { eq: "selected.json" }
        ) {
          childJson {
            selectedReleases
            selectedPreReleases
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const { selectedReleases, selectedPreReleases } = result.data.json.childJson;

  createPage({
    path: '/download',
    component: downloadTemplate,
    context: {
      selectedReleases,
      selectedPreReleases
    }
  });
}
