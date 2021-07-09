const crypto = require('crypto');

// Taken from https://github.com/nihgwu/gatsby-transformer-code/blob/master/gatsby-node.js
// The transformer was not updated to work for Gatsby V3
exports.onCreateNode = ({ node, actions, loadNodeContent }, pluginOptions) => {
  if (!pluginOptions.name || pluginOptions.name !== node.sourceInstanceName) {
    return;
  }

  if (!pluginOptions.test) {
    const extensions = pluginOptions.extensions || ['js', 'jsx'];
    if (extensions.indexOf(node.extension) === -1) return;
  } else {
    if (!pluginOptions.test.test(node.relativePath)) return;
  }

  return loadNodeContent(node).then((content) => {
    const { createNode, createParentChildLink } = actions;

    const contentDigest = crypto
      .createHash('md5')
      .update(content)
      .digest('hex');

    const codeNode = {
      id: `${node.id} >>> RawCode`,
      parent: node.id,
      children: [],
      name: node.name,
      extension: node.extension,
      instanceName: node.sourceInstanceName,
      content,
      internal: {
        contentDigest,
        type: 'RawCode'
      }
    };
    createNode(codeNode);
    createParentChildLink({ parent: node, child: codeNode });
  });
};
