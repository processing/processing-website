const readline = require('readline');
const { graphql } = require('@octokit/graphql');
const fs = require('fs');
const path = require('path');

const fetchReleases = async (githubToken) => {
  const { processing, processing4 } = await graphql(
    `
      query {
        processing: repository(name: "processing", owner: "processing") {
          releases(first: 100, orderBy: { field: NAME, direction: DESC }) {
            edges {
              node {
                name
                tagName
                publishedAt
                releaseAssets(first: 10) {
                  edges {
                    node {
                      name
                      downloadUrl
                      size
                    }
                  }
                }
              }
            }
          }
        }
        processing4: repository(name: "processing4", owner: "processing") {
          releases(first: 100, orderBy: { field: NAME, direction: DESC }) {
            edges {
              node {
                name
                tagName
                publishedAt
                releaseAssets(first: 10) {
                  edges {
                    node {
                      name
                      downloadUrl
                      size
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      headers: {
        authorization: `token ${githubToken}`
      }
    }
  );

  const releases = processing.releases.edges.concat(processing4.releases.edges);

  // Write releases to folder
  releases.forEach((release) => {
    fs.writeFileSync(
      path.join(
        __dirname,
        '..',
        'content',
        'download',
        'releases',
        `${release.node.tagName}.json`
      ),
      JSON.stringify(release.node, null, 2)
    );
  });
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter your GitHub token: ', (token) => {
  rl.close();

  console.log('Fetching releases from github.com');
  fetchReleases(token);
});
