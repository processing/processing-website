const readline = require('readline');
const { graphql } = require('@octokit/graphql');
const fs = require('fs');
const path = require('path');

const owner = process.env.GITHUB_OWNER || 'processing';
const repo = process.env.GITHUB_REPO || 'processing';
const repo4 = process.env.GITHUB_REPO4 || 'processing4';

const fetchReleases = async (githubToken) => {
  const { processing, processing4 } = await graphql(
    `
      query {
        processing: repository(name: "${repo}", owner: "${owner}") {
          releases(first: 100, orderBy: { field: NAME, direction: DESC }) {
            edges {
              node {
                name
                tagName
                publishedAt
                releaseAssets(first: 20) {
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
        processing4: repository(name: "${repo4}", owner: "${owner}") {
          releases(first: 100, orderBy: { field: NAME, direction: DESC }) {
            edges {
              node {
                name
                tagName
                isPrerelease
                publishedAt
                releaseAssets(first: 20) {
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

if (process.env.GITHUB_TOKEN) {
  console.log('Fetching releases from github.com');
  fetchReleases(process.env.GITHUB_TOKEN);
  return;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question(
  'Please enter your GitHub token (get it from https://github.com/settings/tokens): ',
  (token) => {
    rl.close();

    console.log('Fetching releases from github.com');
    fetchReleases(token);
  }
);
