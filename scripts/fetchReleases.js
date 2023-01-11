const { graphql } = require('@octokit/graphql');
const fs = require('fs');
const path = require('path');

const fetchReleases = async () => {
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
        authorization: `token ${process.env.GITHUB_TOKEN}`
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

// only fetch if ENV has GITHUB_TOKEN
if (process.env.GITHUB_TOKEN) {
  console.log('Fetching releases from github.com');
  fetchReleases();
} else {
  console.log('No GitHub token found. Bypassing fetch of releases');
}
