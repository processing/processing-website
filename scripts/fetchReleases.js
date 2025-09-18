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
                description
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
                description
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

  // sort releases by major version eg : {"1": [], "2": [], "3": [], "4": []}
  const sortedReleases = releases.reduce((acc, release) => {
    const majorVersion = release.node.tagName.replace(/processing(-\d+)?-/, '').split('.')[0];
    if (!acc[majorVersion]) {
      acc[majorVersion] = [];
    }
    acc[majorVersion].push(release.node);
    return acc;
  }, {});

  // sort releases by date within each major version
  Object.keys(sortedReleases).forEach((key) => {
    sortedReleases[key].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  });

  // genereate the content/download/selected.json e.g.
  // {
  //   "selectedReleases": [
  //     "processing-1310-4.4.10",
  //     "processing-0270-3.5.4",
  //     "processing-0227-2.2.1"
  //   ],
  //     "selectedPreReleases": [
  //       ""
  //     ]
  // }
  // select the latest release for each major version
  const selectedReleases = Object.values(sortedReleases).map(
    (releases) => releases[0].tagName
  );
  const latestStableRelease = releases.toSorted((a, b) => new Date(b.node.publishedAt) - new Date(a.node.publishedAt))[0].node;

  // select the latest pre-release from processing4 if it is newer than the latest stable release
  const preReleases = processing4.releases.edges.filter(
    (release) => release.node.isPrerelease && new Date(release.node.publishedAt) > new Date(latestStableRelease.publishedAt)
  );
  const selectedPreReleases = preReleases.length
    ? [preReleases[0].node.tagName]
    : [""];
  fs.writeFileSync(
    path.join(__dirname, '..', 'content', 'download', 'selected.json'),
    JSON.stringify(
      {
        selectedReleases,
        selectedPreReleases
      },
      null,
      2
    )
  );


  // Write release notes to md
  releases.forEach((release) => {
    fs.writeFileSync(
      path.join(
        __dirname,
        '..',
        'content',
        'download',
        'release-notes',
        `${release.node.tagName}.mdx`
      ),
      `---
title: ${release.node.name}
date: ${release.node.publishedAt}
prerelease: ${release.node.isPrerelease}
tagName: ${release.node.tagName}
release: true
---
${release.node.description || ''}
      `
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
