/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const refTemplate = path.resolve(`./src/templates/ref-template.js`);
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

	if (result.errors) {
		throw result.errors;
	}

	// Create blog posts pages.
	const refPages = result.data.allFile.edges;

	refPages.forEach((refPage, index) => {
		const previous =
			index === refPages.length - 1 ? null : refPages[index + 1].node;
		const next = index === 0 ? null : refPages[index - 1].node;
		let assetsName = refPage.node.name.split(".")[0];

		createPage({
			path: "/references/" + refPage.node.name,
			component: refTemplate,
			context: {
				name: refPage.node.name,
				assetsName: assetsName,
				previous,
				next,
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
	} else if (node.internal.mediaType === `text/x-processing`) {
		createNodeField({
			name: `name`,
			node,
			content: loadNodeContent(node)
		});
	}
};
