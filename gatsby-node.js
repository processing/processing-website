/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ actions, graphql, reporter }) => {
	const { createPage } = actions;

	// Templates
	const refTemplate = path.resolve(`./src/templates/ref-template.js`);
	const classRefTemplate = path.resolve(`./src/templates/class-ref-template.js`);
	const indexRefTemplate = path.resolve(`./src/templates/index-ref-template.js`);
	const tutorialTemplate = path.resolve(`./src/templates/tutorial-template.js`);
	const exampleTemplate = path.resolve(`./src/templates/example-template.js`);

	const result = await graphql(
		`
			{
				allFile(filter: { sourceInstanceName: { eq: "json" } }) {
					edges {
						node {
							name
							relativeDirectory
						}
					}
				}
			}
		`
	);

	const dirResult = await graphql(
		`
		{
		  	allDirectory(filter: {relativeDirectory: {eq: "en"}}) {
    			nodes {
      				name
    			}
  			}
  		}
  		`
	);

	const tutorialResult = await graphql(
		`
		{
		  	allFile(filter: {sourceInstanceName: {eq: "tutorials"}}) {
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

	const exampleResult = await graphql(
		`
		{
		  	allFile(filter: {sourceInstanceName: {eq: "examples"}}) {
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

	if (result.errors) {
		throw result.errors;
	}

	if (exampleResult.errors) {
		throw result.errors;
	}

	// Create reference pages.
	const refPages = result.data.allFile.edges;

	// Create library index pages
	const dirPages = dirResult.data.allDirectory.nodes;

    const tutorialPages = tutorialResult.data.allFile.nodes;

    const examplePages = exampleResult.data.allFile.nodes;

	refPages.forEach((refPage, index) => {
		const previous =
			index === refPages.length - 1 ? null : refPages[index + 1].node;
		const next = index === 0 ? null : refPages[index - 1].node;
		let assetsName = refPage.node.name.split(".")[0];
		let libraryName = refPage.node.relativeDirectory.split("/")[1];
		let path;
		if (libraryName === "processing") path = "references/" + refPage.node.name;
		else path = "/libraries/" + libraryName + "/" + refPage.node.name;

		if (refPage.node.name.endsWith(")")) {
			createPage({
				path: path,
				component: refTemplate,
				context: {
					name: refPage.node.name,
					assetsName: libraryName + "/" + assetsName,
					libraryName: libraryName,
					previous,
					next,
				},
			});
		} else {
			createPage({
				path: path,
				component: classRefTemplate,
				context: {
					name: refPage.node.name,
					assetsName: libraryName + "/" + assetsName,
					libraryName: libraryName,
					previous,
					next,
				},
			});
		}
	});


	dirPages.forEach((dirPage, index) => {
		createPage({
				path: "/libraries/" + dirPage.name,
				component: indexRefTemplate,
				context: {
					libraryName: dirPage.name,
				},
			});
	});

	tutorialPages.forEach((tutorialPage, index) => {
		createPage({
				path: tutorialPage.childMdx.frontmatter.slug,
				component: tutorialTemplate,
				context: {
					slug: tutorialPage.childMdx.frontmatter.slug,
				}
			});
	});

	examplePages.forEach((examplePage, index) => {
		createPage({
				path: examplePage.childMdx.frontmatter.slug,
				component: exampleTemplate,
				context: {
					slug: examplePage.childMdx.frontmatter.slug,
				}
			});
	});
};

exports.onCreateNode = ({ node, actions, getNode, loadNodeContent }) => {
	const { createNodeField } = actions;

	if (node.internal.mediaType === `application/json`) {
		const value = createFilePath({ node, getNode });
		let dir = node.relativeDirectory.split("/");
		let lang = dir[0];
		let library = dir[1];
		let name = dir[dir.length];
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
			content: loadNodeContent(node)
		});
	}

};
