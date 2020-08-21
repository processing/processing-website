/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	// Templates
	const refTemplate = path.resolve(`./src/templates/ref-template.js`);
	const classRefTemplate = path.resolve(`./src/templates/class-ref-template.js`);
	const indexRefTemplate = path.resolve(`./src/templates/index-ref-template.js`);


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

	if (result.errors) {
		throw result.errors;
	}

	// Create reference pages.
	const refPages = result.data.allFile.edges;

	// Create library index pages
	const dirPages = dirResult.data.allDirectory.nodes;

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
					assetsName: assetsName,
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
					assetsName: assetsName,
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
