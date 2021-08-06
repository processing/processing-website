const { graphql } = require('@octokit/graphql');
const fs = require('fs');
const path = require('path');

const fetchReleases = async () => {
  // TODO: This is going to need to change once they have all releases in a single repo
  const { releases, preReleases } = await graphql(
    `
      query {
        releases: repository(name: "processing", owner: "processing") {
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
                    }
                  }
                }
              }
            }
          }
        }
        preReleases: repository(name: "processing4", owner: "processing") {
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

  // Write releases to folder
  releases.releases.edges.forEach((release) => {
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

  // Write prereleases to folder
  preReleases.releases.edges.forEach((release) => {
    fs.writeFileSync(
      path.join(
        __dirname,
        '..',
        'content',
        'download',
        'prereleases',
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
