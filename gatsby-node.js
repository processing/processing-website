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

		createPage({
			path: "references/" + refPage.node.name,
			component: refTemplate,
			context: {
				name: refPage.node.name,
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
		createNodeField({
			name: `name`,
			node,
			value: node.name,
		});
	} else if (node.internal.mediaType === `text/x-processing`) {
		createNodeField({
			name: `name`,
			node,
			content: loadNodeContent(node)
		});
	}
};
