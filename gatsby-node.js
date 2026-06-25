const path = require(`path`);
const fs = require('fs');
const { createFilePath } = require(`gatsby-source-filesystem`);
const { examplePath, referencePath } = require('./src/utils/paths');
const semver = require('semver');

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

exports.onCreateNode = ({ node, actions, getNode, loadNodeContent }) => {
  const { createNodeField } = actions;

  // Handle locale naming convention in .json and .pde files
  if (
    node.internal.type === 'File' &&
    (node.internal.mediaType === `application/json` ||
      node.internal.mediaType === `text/x-processing`)
  ) {
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
  }

  // Assign library to reference nodes
  if (node.sourceInstanceName === 'reference') {
    createNodeField({
      name: `lib`,
      value: node.relativeDirectory.split('/')[1],
      node
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  await Promise.all([
    createReference(actions, graphql),
    createExamples(actions, graphql),
    createTutorials(actions, graphql),
    createPlatformDownloadPages(actions, graphql),
    createDownloadAndReleases(actions, graphql)
  ]);
};

async function createReference(actions, graphql) {
  const functionTemplate = path.resolve(
    `./src/templates/reference/function.js`
  );
  const classRefTemplate = path.resolve(`./src/templates/reference/class.js`);
  const fieldRefTemplate = path.resolve(`./src/templates/reference/field.js`);
  const indexLibTemplate = path.resolve(
    `./src/templates/reference/libraries/library.js`
  );

  const refTemplates = {
    function: functionTemplate,
    method: functionTemplate,
    class: classRefTemplate,
    field: fieldRefTemplate,
    other: fieldRefTemplate
  };

  const { createPage } = actions;

  // Load reference .json files
  // Since the gatsby-theme-i18n automatically creates pages for each locale,
  // we only load the english pages here. The template takes care of the rest.
  const result = await graphql(
    `
      {
        json: allFile(
          filter: {
            sourceInstanceName: { eq: "reference" }
            extension: { eq: "json" }
            fields: { lang: { eq: "en" } }
          }
        ) {
          nodes {
            name
            relativeDirectory
            childJson {
              type
              classanchor
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
  const refPages = result.data.json.nodes;

  refPages.forEach((refPage, index) => {
    const [name] = refPage.name.split('.');
    const [lang, libraryName] = refPage.relativeDirectory.split('/');
    const refPath = referencePath(name, libraryName);
    const relDir = libraryName + '/' + name;
    const { type, classanchor } = refPage.childJson;

    const inUseExamples = inUse.data.allFile.edges
      .filter((n) => {
        if (
          n.childJson !== undefined &&
          n.childJson !== null &&
          n.childJson.featured !== null &&
          n.childJson.featured.includes(refPage.name)
        )
          return n.name;
      })
      .map((e) => e.name);

    const context = {
      name,
      relDir,
      libraryName,
      inUseExamples: inUseExamples,
      hasClassanchor: false
    };

    // Used to load category and subcategory from class parent for breadcrumbs
    if (type === 'method' || type === 'field') {
      context.hasClassanchor = true;
      context.classanchor = classanchor;
    }

    if (refTemplates[type]) {
      createPage({
        path: refPath,
        component: refTemplates[type],
        context
      });
    } else {
      console.error('No template for reference type', type);
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
    component: path.resolve(`./src/templates/reference/libraries/index.js`)
  });

  createPage({
    path: '/reference/tools/',
    component: path.resolve(`./src/templates/reference/tools.js`)
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
async function createExamples(actions, graphql) {
  const exampleTemplate = path.resolve(`./src/templates/examples/example.js`);

  const { createPage } = actions;

  // Load example .json files
  // Since the gatsby-theme-i18n automatically creates pages for each locale,
  // we only load the english pages here. The template takes care of the rest.
  const result = await graphql(
    `
      {
        json: allFile(
          filter: {
            sourceInstanceName: { eq: "examples" }
            fields: { lang: { eq: "en" } }
            extension: { eq: "json" }
            relativeDirectory: { regex: "/^((?!data).)*$/" }
          }
        ) {
          nodes {
            name
            relativeDirectory
            childJson {
              type
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const examples = result.data.json.nodes;

  // Extract the data needed to create the page
  const parsedExamples = examples.map((node) => {
    const splitDir = node.relativeDirectory.split('/');
    return {
      name: node.name,
      slug: examplePath(node.name),
      relDir: node.relativeDirectory,
      category: splitDir[0],
      subcategory: splitDir[1]
    };
  });

  parsedExamples.forEach((example, index) => {
    // Find related examples in the same sub category
    // We pass the names of these to the template, so we don't need
    // to load and filter all images on the frontend.
    const related = parsedExamples
      .filter((info) => {
        return (
          info.subcategory === example.subcategory && info.name !== example.name
        );
      })
      .map((info) => info.name);

    // Create the page. Again, this is only for the english pages, since
    // the i18n theme will take care of generating the others.
    createPage({
      path: example.slug,
      component: exampleTemplate,
      context: {
        slug: example.slug,
        name: example.name,
        subcategory: example.subcategory,
        relDir: example.relDir,
        related
      }
    });
  });
}

async function createPlatformDownloadPages(actions, graphql) {
  const platformTemplate = path.resolve(`./src/templates/download/platform.js`);

  const { createPage } = actions;

  const platformQuery = await graphql(
    `query FindPlatforms {
        allFile(
          filter: {sourceInstanceName: {eq: "download"}, relativeDirectory: {eq: "platforms"}}
        ) {
          edges {
            node {
              name
              childJson {
                title
                userAgent
                sort
              }
            }
          }
        }
      }`
  );

  if (platformQuery.errors) {
    throw platformQuery.errors;
  }
  const platforms = platformQuery.data.allFile.edges.map(e => {
    const { childJson, ...rest } = e.node;
    return { ...childJson, ...rest };
  });

  const versionsQuery = await graphql(
    `query FindReleases {
        allFile(
          filter: {sourceInstanceName: {eq: "download"}, relativeDirectory: {eq: "releases"}}
        ) {
          edges {
            node {
              childJson {
                tagName
              }
            }
          }
        }
      }
`);

  if (versionsQuery.errors) {
    throw versionsQuery.errors;
  }

  const versions = versionsQuery.data.allFile.edges
    .map(e => e.node.childJson.tagName.replace(/^processing-(\d+-)?/, ''))
    .map(e => semver.coerce(e, { includePrerelease: true, raw: e }))
    .reverse()
    .sort((a, b) => semver.compare(b, a))
    ;

  platforms.forEach((platform) => {
    createPage({
      path: `/download/${platform.name}`,
      component: platformTemplate,
      context: {
        platform: platform.name
      }
    });
    versions.forEach(version => {
      createPage({
        path: `/download/${platform.name}/${version.options.raw}`,
        component: platformTemplate,
        context: {
          platform: platform.name,
          version: version.options.raw
        }
      });
    });
  });
}
/**
  Create the download page programmatically since we need access to the selected
  releases in the pageQuery, thus we need to pass through pageContext.
**/
async function createDownloadAndReleases(actions, graphql) {
  const downloadTemplate = path.resolve(`./src/templates/download.js`);
  const releasesTemplate = path.resolve(`./src/templates/releases.js`);

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
    path: '/download/legacy',
    component: downloadTemplate,
    context: {
      selectedReleases,
      selectedPreReleases
    }
  });
  createPage({
    path: '/releases',
    component: releasesTemplate,
    context: {
      selectedReleases,
      selectedPreReleases
    }
  });
}

/**
  Create the latest.txt file when the site builds.
  This only happens on build, not on dev.
**/
exports.onPostBuild = () => {
  const releases = require('./content/download/selected.json');
  const latest = releases.selectedReleases[0];
  const [name, number, version] = latest.split('-');
  fs.writeFileSync(
    path.join(__dirname, 'public', 'download', 'latest.txt'),
    number
  );
};
